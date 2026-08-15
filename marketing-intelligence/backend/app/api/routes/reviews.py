"""
backend/app/api/routes/reviews.py

Endpoints for ingesting, listing, and filtering Reviews.
Includes a manual ingest endpoint and a bulk-process trigger.
"""

import uuid
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models import Review, SentimentLabel
from app.schemas import Page, ReviewCreate, ReviewOut
from app.services.sentiment import SentimentService

router = APIRouter()
_sentiment = SentimentService()


@router.get("/", response_model=Page)
async def list_reviews(
    brand_id:  uuid.UUID | None          = Query(None),
    source:    str | None                = Query(None),
    sentiment: SentimentLabel | None     = Query(None),
    page:      int                       = Query(1, ge=1),
    size:      int                       = Query(20, ge=1, le=100),
    db:        AsyncSession              = Depends(get_db),
):
    stmt = select(Review)
    if brand_id:
        stmt = stmt.where(Review.brand_id == brand_id)
    if source:
        stmt = stmt.where(Review.source == source)
    if sentiment:
        stmt = stmt.where(Review.sentiment == sentiment)

    total  = (await db.execute(select(func.count()).select_from(stmt.subquery()))).scalar_one()
    offset = (page - 1) * size
    rows   = (await db.execute(stmt.offset(offset).limit(size).order_by(Review.reviewed_at.desc()))).scalars().all()
    return Page(total=total, page=page, size=size, items=[ReviewOut.model_validate(r) for r in rows])


@router.post("/", response_model=ReviewOut, status_code=status.HTTP_201_CREATED)
async def ingest_review(payload: ReviewCreate, db: AsyncSession = Depends(get_db)):
    """Manually ingest a single review and run sentiment analysis immediately."""
    result = _sentiment.analyze(payload.body)
    review = Review(
        **payload.model_dump(),
        sentiment=result["label"],
        sentiment_score=result["score"],
    )
    db.add(review)
    await db.flush()
    await db.refresh(review)
    return ReviewOut.model_validate(review)


@router.get("/{review_id}", response_model=ReviewOut)
async def get_review(review_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    review = await db.get(Review, review_id)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return ReviewOut.model_validate(review)


@router.post("/bulk-process", status_code=status.HTTP_202_ACCEPTED)
async def bulk_process_reviews(
    brand_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
):
    """
    Trigger async sentiment + topic tagging for all unprocessed reviews
    for a given brand. Returns count of enqueued reviews.
    """
    stmt  = select(Review).where(Review.brand_id == brand_id, Review.is_processed == False)
    rows  = (await db.execute(stmt)).scalars().all()
    count = 0
    for review in rows:
        result              = _sentiment.analyze(review.body)
        review.sentiment    = result["label"]
        review.sentiment_score = result["score"]
        review.is_processed = True
        count += 1
    await db.flush()
    return {"enqueued": count, "brand_id": str(brand_id)}

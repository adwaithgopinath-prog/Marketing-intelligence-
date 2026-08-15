"""
backend/app/api/routes/pipeline.py

HTTP endpoints to trigger, monitor, and list pipeline runs.
Actual processing is delegated to services and can be offloaded to Celery
in production (the structure is already wired for that).
"""

import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models import Brand, Insight, PipelineRun, PipelineStatus, Review
from app.schemas import Page, PipelineRunOut, PipelineTriggerRequest
from app.services.insights import InsightService
from app.services.sentiment import SentimentService

router    = APIRouter()
_sentiment = SentimentService()
_insights  = InsightService()


@router.post("/trigger", response_model=PipelineRunOut, status_code=status.HTTP_202_ACCEPTED)
async def trigger_pipeline(payload: PipelineTriggerRequest, db: AsyncSession = Depends(get_db)):
    """
    Orchestrates the full processing pipeline for a brand:
    1. Sentiment analysis on unprocessed reviews
    2. Topic extraction
    3. LLM insight generation
    Returns a PipelineRun audit record immediately; processing happens in-process
    (swap for Celery `.delay()` for async production behaviour).
    """
    brand = await db.get(Brand, payload.brand_id)
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")

    run = PipelineRun(
        pipeline_name=f"full_pipeline:brand:{payload.brand_id}",
        status=PipelineStatus.RUNNING,
        started_at=datetime.now(timezone.utc),
        meta={"brand_id": str(payload.brand_id), "sources": payload.sources},
    )
    db.add(run)
    await db.flush()

    try:
        # ── 1. Sentiment pass ─────────────────────────────────────
        unprocessed_q = await db.execute(
            select(Review).where(Review.brand_id == payload.brand_id, Review.is_processed == False)
        )
        unprocessed = unprocessed_q.scalars().all()
        records_in  = len(unprocessed)

        if payload.run_sentiment:
            for review in unprocessed:
                result                 = _sentiment.analyze(review.body)
                review.sentiment       = result["label"]
                review.sentiment_score = result["score"]
                review.is_processed    = True

        # ── 2. Insight generation ─────────────────────────────────
        records_out = 0
        if payload.run_insights and unprocessed:
            texts    = [r.body for r in unprocessed[:50]]   # cap context window
            new_insights = await _insights.generate(brand_id=payload.brand_id, texts=texts)
            for ins_data in new_insights:
                ins = Insight(**ins_data, brand_id=payload.brand_id)
                db.add(ins)
                records_out += 1

        run.status      = PipelineStatus.COMPLETED
        run.records_in  = records_in
        run.records_out = records_out
        run.finished_at = datetime.now(timezone.utc)

    except Exception as exc:
        run.status    = PipelineStatus.FAILED
        run.error_log = str(exc)
        run.finished_at = datetime.now(timezone.utc)

    await db.flush()
    await db.refresh(run)
    return PipelineRunOut.model_validate(run)


@router.get("/runs", response_model=Page)
async def list_pipeline_runs(
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    db:   AsyncSession = Depends(get_db),
):
    from sqlalchemy import func
    total  = (await db.execute(select(func.count()).select_from(PipelineRun))).scalar_one()
    offset = (page - 1) * size
    rows   = (await db.execute(select(PipelineRun).offset(offset).limit(size).order_by(PipelineRun.created_at.desc()))).scalars().all()
    return Page(total=total, page=page, size=size, items=[PipelineRunOut.model_validate(r) for r in rows])


@router.get("/runs/{run_id}", response_model=PipelineRunOut)
async def get_run(run_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    run = await db.get(PipelineRun, run_id)
    if not run:
        raise HTTPException(status_code=404, detail="Pipeline run not found")
    return PipelineRunOut.model_validate(run)

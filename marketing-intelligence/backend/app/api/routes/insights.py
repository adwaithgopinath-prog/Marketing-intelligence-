"""
backend/app/api/routes/insights.py

Endpoints for reading AI-generated insights and marking them as actioned.
Generation is triggered by the pipeline route, not here directly.
"""

import uuid

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models import Insight
from app.schemas import InsightOut, Page

router = APIRouter()


@router.get("/", response_model=Page)
async def list_insights(
    brand_id:  uuid.UUID | None = Query(None),
    category:  str | None       = Query(None),
    priority:  int | None       = Query(None, ge=1, le=5),
    actioned:  bool | None      = Query(None),
    page:      int              = Query(1, ge=1),
    size:      int              = Query(20, ge=1, le=100),
    db:        AsyncSession     = Depends(get_db),
):
    stmt = select(Insight)
    if brand_id:  stmt = stmt.where(Insight.brand_id == brand_id)
    if category:  stmt = stmt.where(Insight.category == category)
    if priority:  stmt = stmt.where(Insight.priority == priority)
    if actioned is not None: stmt = stmt.where(Insight.is_actioned == actioned)

    total  = (await db.execute(select(func.count()).select_from(stmt.subquery()))).scalar_one()
    offset = (page - 1) * size
    rows   = (await db.execute(stmt.offset(offset).limit(size).order_by(Insight.priority.asc()))).scalars().all()
    return Page(total=total, page=page, size=size, items=[InsightOut.model_validate(r) for r in rows])


@router.get("/{insight_id}", response_model=InsightOut)
async def get_insight(insight_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    insight = await db.get(Insight, insight_id)
    if not insight:
        raise HTTPException(status_code=404, detail="Insight not found")
    return InsightOut.model_validate(insight)


@router.patch("/{insight_id}/action", response_model=InsightOut)
async def mark_actioned(insight_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    """Mark an insight as actioned (implemented / dismissed)."""
    insight = await db.get(Insight, insight_id)
    if not insight:
        raise HTTPException(status_code=404, detail="Insight not found")
    insight.is_actioned = True
    await db.flush()
    await db.refresh(insight)
    return InsightOut.model_validate(insight)

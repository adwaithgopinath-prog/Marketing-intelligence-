"""
backend/app/api/routes/competitors.py

CRUD endpoints for Competitors.
"""

import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models import Competitor
from app.schemas import CompetitorCreate, CompetitorOut, Page

router = APIRouter()


@router.get("/", response_model=Page)
async def list_competitors(
    brand_id: uuid.UUID | None = Query(None),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Competitor)
    if brand_id:
        stmt = stmt.where(Competitor.brand_id == brand_id)
    total  = (await db.execute(select(func.count()).select_from(stmt.subquery()))).scalar_one()
    offset = (page - 1) * size
    rows   = (await db.execute(stmt.offset(offset).limit(size))).scalars().all()
    return Page(total=total, page=page, size=size, items=[CompetitorOut.model_validate(r) for r in rows])


@router.post("/", response_model=CompetitorOut, status_code=status.HTTP_201_CREATED)
async def create_competitor(payload: CompetitorCreate, db: AsyncSession = Depends(get_db)):
    comp = Competitor(**payload.model_dump())
    db.add(comp)
    await db.flush()
    await db.refresh(comp)
    return CompetitorOut.model_validate(comp)


@router.get("/{competitor_id}", response_model=CompetitorOut)
async def get_competitor(competitor_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    comp = await db.get(Competitor, competitor_id)
    if not comp:
        raise HTTPException(status_code=404, detail="Competitor not found")
    return CompetitorOut.model_validate(comp)


@router.delete("/{competitor_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_competitor(competitor_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    comp = await db.get(Competitor, competitor_id)
    if not comp:
        raise HTTPException(status_code=404, detail="Competitor not found")
    await db.delete(comp)

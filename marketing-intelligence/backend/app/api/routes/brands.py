"""
backend/app/api/routes/brands.py

CRUD endpoints for Brands.
"""

import uuid
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models import Brand
from app.schemas import BrandCreate, BrandOut, BrandUpdate, Page

router = APIRouter()


@router.get("/", response_model=Page)
async def list_brands(
    project_id: uuid.UUID | None = Query(None),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Brand)
    if project_id:
        stmt = stmt.where(Brand.project_id == project_id)

    total   = (await db.execute(select(func.count()).select_from(stmt.subquery()))).scalar_one()
    offset  = (page - 1) * size
    rows    = (await db.execute(stmt.offset(offset).limit(size).order_by(Brand.created_at.desc()))).scalars().all()
    return Page(total=total, page=page, size=size, items=[BrandOut.model_validate(r) for r in rows])


@router.post("/", response_model=BrandOut, status_code=status.HTTP_201_CREATED)
async def create_brand(payload: BrandCreate, db: AsyncSession = Depends(get_db)):
    brand = Brand(**payload.model_dump())
    db.add(brand)
    await db.flush()
    await db.refresh(brand)
    return BrandOut.model_validate(brand)


@router.get("/{brand_id}", response_model=BrandOut)
async def get_brand(brand_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    brand = await db.get(Brand, brand_id)
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    return BrandOut.model_validate(brand)


@router.patch("/{brand_id}", response_model=BrandOut)
async def update_brand(brand_id: uuid.UUID, payload: BrandUpdate, db: AsyncSession = Depends(get_db)):
    brand = await db.get(Brand, brand_id)
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    for f, v in payload.model_dump(exclude_unset=True).items():
        setattr(brand, f, v)
    await db.flush()
    await db.refresh(brand)
    return BrandOut.model_validate(brand)


@router.delete("/{brand_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_brand(brand_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    brand = await db.get(Brand, brand_id)
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    await db.delete(brand)

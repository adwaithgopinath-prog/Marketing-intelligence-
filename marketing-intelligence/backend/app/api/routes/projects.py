"""
backend/app/api/routes/projects.py

CRUD endpoints for Projects.
All DB I/O goes through the async session dependency (get_db).
"""

import uuid
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.database.models import Project
from app.schemas import Page, ProjectCreate, ProjectOut, ProjectUpdate

router = APIRouter()


# ── List ─────────────────────────────────────────────────────────────────────
@router.get("/", response_model=Page)
async def list_projects(
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    offset = (page - 1) * size
    total_q = await db.execute(select(func.count()).select_from(Project))
    total   = total_q.scalar_one()
    rows_q  = await db.execute(select(Project).offset(offset).limit(size).order_by(Project.created_at.desc()))
    items   = rows_q.scalars().all()
    return Page(total=total, page=page, size=size, items=[ProjectOut.model_validate(i) for i in items])


# ── Create ────────────────────────────────────────────────────────────────────
@router.post("/", response_model=ProjectOut, status_code=status.HTTP_201_CREATED)
async def create_project(payload: ProjectCreate, db: AsyncSession = Depends(get_db)):
    project = Project(
        name=payload.name,
        description=payload.description,
        metadata_=payload.metadata_,
    )
    db.add(project)
    await db.flush()
    await db.refresh(project)
    return ProjectOut.model_validate(project)


# ── Read ──────────────────────────────────────────────────────────────────────
@router.get("/{project_id}", response_model=ProjectOut)
async def get_project(project_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    project = await db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return ProjectOut.model_validate(project)


# ── Update ────────────────────────────────────────────────────────────────────
@router.patch("/{project_id}", response_model=ProjectOut)
async def update_project(project_id: uuid.UUID, payload: ProjectUpdate, db: AsyncSession = Depends(get_db)):
    project = await db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(project, field, value)
    await db.flush()
    await db.refresh(project)
    return ProjectOut.model_validate(project)


# ── Delete ────────────────────────────────────────────────────────────────────
@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    project = await db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    await db.delete(project)

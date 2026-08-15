"""
backend/app/schemas/__init__.py  (and inline schema definitions)

Pydantic v2 schemas used for request validation and response serialisation.
Organised per domain: Project, Brand, Competitor, Review, Insight, Pipeline.
"""

import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, ConfigDict, Field


# ── Shared ────────────────────────────────────────────────────────────────────
class OrmBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)


# ── Project ───────────────────────────────────────────────────────────────────
class ProjectCreate(BaseModel):
    name:        str            = Field(..., min_length=2, max_length=200)
    description: Optional[str] = None
    metadata_:   Dict[str, Any] = Field(default_factory=dict, alias="metadata")


class ProjectUpdate(BaseModel):
    name:        Optional[str]  = None
    description: Optional[str]  = None
    is_active:   Optional[bool] = None


class ProjectOut(OrmBase):
    id:          uuid.UUID
    name:        str
    description: Optional[str]
    is_active:   bool
    created_at:  datetime
    updated_at:  datetime


# ── Brand ─────────────────────────────────────────────────────────────────────
class BrandCreate(BaseModel):
    project_id: uuid.UUID
    name:       str             = Field(..., min_length=2, max_length=200)
    domain:     Optional[str]   = None
    category:   Optional[str]   = None
    logo_url:   Optional[str]   = None


class BrandUpdate(BaseModel):
    name:     Optional[str] = None
    domain:   Optional[str] = None
    category: Optional[str] = None
    logo_url: Optional[str] = None


class BrandOut(OrmBase):
    id:         uuid.UUID
    project_id: uuid.UUID
    name:       str
    domain:     Optional[str]
    category:   Optional[str]
    logo_url:   Optional[str]
    created_at: datetime


# ── Competitor ────────────────────────────────────────────────────────────────
class CompetitorCreate(BaseModel):
    brand_id:    uuid.UUID
    name:        str           = Field(..., min_length=1)
    domain:      Optional[str] = None
    share_score: Optional[float] = Field(None, ge=0, le=100)


class CompetitorOut(OrmBase):
    id:          uuid.UUID
    brand_id:    uuid.UUID
    name:        str
    domain:      Optional[str]
    share_score: Optional[float]
    created_at:  datetime


# ── Review ────────────────────────────────────────────────────────────────────
class ReviewCreate(BaseModel):
    brand_id:    uuid.UUID
    source:      str
    external_id: Optional[str]   = None
    author:      Optional[str]   = None
    rating:      Optional[float] = Field(None, ge=1, le=5)
    title:       Optional[str]   = None
    body:        str             = Field(..., min_length=5)
    language:    str             = "en"
    reviewed_at: Optional[datetime] = None


class ReviewOut(OrmBase):
    id:              uuid.UUID
    brand_id:        uuid.UUID
    source:          str
    author:          Optional[str]
    rating:          Optional[float]
    title:           Optional[str]
    body:            str
    sentiment:       Optional[str]
    sentiment_score: Optional[float]
    topics:          List[str]
    reviewed_at:     Optional[datetime]
    is_processed:    bool
    created_at:      datetime


# ── Insight ───────────────────────────────────────────────────────────────────
class InsightOut(OrmBase):
    id:          uuid.UUID
    brand_id:    uuid.UUID
    category:    str
    title:       str
    summary:     str
    evidence:    Dict[str, Any]
    priority:    int
    is_actioned: bool
    llm_model:   Optional[str]
    created_at:  datetime


# ── Pipeline ──────────────────────────────────────────────────────────────────
class PipelineTriggerRequest(BaseModel):
    brand_id:      uuid.UUID
    sources:       List[str] = Field(default_factory=list)
    run_sentiment: bool = True
    run_topics:    bool = True
    run_insights:  bool = True


class PipelineRunOut(OrmBase):
    id:            uuid.UUID
    pipeline_name: str
    status:        str
    records_in:    int
    records_out:   int
    error_log:     Optional[str]
    started_at:    Optional[datetime]
    finished_at:   Optional[datetime]
    created_at:    datetime


# ── Generic paginated envelope ────────────────────────────────────────────────
class Page(BaseModel):
    total:   int
    page:    int
    size:    int
    items:   List[Any]

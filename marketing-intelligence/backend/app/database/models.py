"""
backend/app/database/models.py

All SQLAlchemy ORM models for the marketing intelligence platform.

Model hierarchy:
  Project → Brand → [Competitor, Review, Insight]
  PipelineRun (standalone audit log)

Every model inherits from Base (declared in connection.py).
Timestamps are handled via server_default so the DB owns them.
"""

import enum
import uuid
from datetime import datetime

from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.connection import Base


# ── Enums ─────────────────────────────────────────────────────────────────────
class SentimentLabel(str, enum.Enum):
    POSITIVE = "positive"
    NEUTRAL  = "neutral"
    NEGATIVE = "negative"


class PipelineStatus(str, enum.Enum):
    PENDING   = "pending"
    RUNNING   = "running"
    COMPLETED = "completed"
    FAILED    = "failed"


class ReviewSource(str, enum.Enum):
    GOOGLE    = "google"
    YELP      = "yelp"
    AMAZON    = "amazon"
    TRUSTPILOT = "trustpilot"
    REDDIT    = "reddit"
    TWITTER   = "twitter"
    MANUAL    = "manual"


# ── Helper mixin ──────────────────────────────────────────────────────────────
class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


# ── Models ────────────────────────────────────────────────────────────────────

class Project(TimestampMixin, Base):
    """Top-level container. A team owns one or more Projects."""
    __tablename__ = "projects"

    id:          Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name:        Mapped[str]       = mapped_column(String(200), nullable=False)
    description: Mapped[str]       = mapped_column(Text, nullable=True)
    is_active:   Mapped[bool]      = mapped_column(Boolean, default=True)
    metadata_:   Mapped[dict]      = mapped_column("metadata", JSONB, default=dict)

    brands: Mapped[list["Brand"]] = relationship("Brand", back_populates="project", cascade="all, delete-orphan")


class Brand(TimestampMixin, Base):
    """A tracked brand belonging to a Project."""
    __tablename__ = "brands"

    id:         Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    name:       Mapped[str]       = mapped_column(String(200), nullable=False)
    domain:     Mapped[str]       = mapped_column(String(255), nullable=True)
    category:   Mapped[str]       = mapped_column(String(100), nullable=True)
    logo_url:   Mapped[str]       = mapped_column(String(500), nullable=True)
    metadata_:  Mapped[dict]      = mapped_column("metadata", JSONB, default=dict)

    project:     Mapped["Project"]           = relationship("Project", back_populates="brands")
    competitors: Mapped[list["Competitor"]]  = relationship("Competitor", back_populates="brand", cascade="all, delete-orphan")
    reviews:     Mapped[list["Review"]]      = relationship("Review", back_populates="brand", cascade="all, delete-orphan")
    insights:    Mapped[list["Insight"]]     = relationship("Insight", back_populates="brand", cascade="all, delete-orphan")

    __table_args__ = (UniqueConstraint("project_id", "name", name="uq_brand_project_name"),)


class Competitor(TimestampMixin, Base):
    """A competitor brand associated with a tracked Brand."""
    __tablename__ = "competitors"

    id:          Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    brand_id:    Mapped[uuid.UUID] = mapped_column(ForeignKey("brands.id", ondelete="CASCADE"), nullable=False)
    name:        Mapped[str]       = mapped_column(String(200), nullable=False)
    domain:      Mapped[str]       = mapped_column(String(255), nullable=True)
    share_score: Mapped[float]     = mapped_column(Float, nullable=True)   # estimated market share 0–100
    metadata_:   Mapped[dict]      = mapped_column("metadata", JSONB, default=dict)

    brand: Mapped["Brand"] = relationship("Brand", back_populates="competitors")


class Review(TimestampMixin, Base):
    """A single consumer review scraped from any source."""
    __tablename__ = "reviews"

    id:              Mapped[uuid.UUID]      = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    brand_id:        Mapped[uuid.UUID]      = mapped_column(ForeignKey("brands.id", ondelete="CASCADE"), nullable=False)
    source:          Mapped[ReviewSource]   = mapped_column(Enum(ReviewSource), nullable=False)
    external_id:     Mapped[str]            = mapped_column(String(255), nullable=True)  # platform-native ID
    author:          Mapped[str]            = mapped_column(String(200), nullable=True)
    rating:          Mapped[float]          = mapped_column(Float, nullable=True)        # 1–5
    title:           Mapped[str]            = mapped_column(String(500), nullable=True)
    body:            Mapped[str]            = mapped_column(Text, nullable=False)
    language:        Mapped[str]            = mapped_column(String(10), default="en")
    sentiment:       Mapped[SentimentLabel] = mapped_column(Enum(SentimentLabel), nullable=True)
    sentiment_score: Mapped[float]          = mapped_column(Float, nullable=True)        # –1 to +1
    topics:          Mapped[list]           = mapped_column(JSONB, default=list)         # ["price","quality"]
    reviewed_at:     Mapped[datetime]       = mapped_column(DateTime(timezone=True), nullable=True)
    is_processed:    Mapped[bool]           = mapped_column(Boolean, default=False)

    brand: Mapped["Brand"] = relationship("Brand", back_populates="reviews")

    __table_args__ = (UniqueConstraint("brand_id", "source", "external_id", name="uq_review_source_external"),)


class Insight(TimestampMixin, Base):
    """An AI-generated strategic insight derived from processed reviews."""
    __tablename__ = "insights"

    id:         Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    brand_id:   Mapped[uuid.UUID] = mapped_column(ForeignKey("brands.id", ondelete="CASCADE"), nullable=False)
    category:   Mapped[str]       = mapped_column(String(100), nullable=False)  # "market_gap" | "trend" | "threat"
    title:      Mapped[str]       = mapped_column(String(500), nullable=False)
    summary:    Mapped[str]       = mapped_column(Text, nullable=False)
    evidence:   Mapped[dict]      = mapped_column(JSONB, default=dict)          # supporting quotes / stats
    priority:   Mapped[int]       = mapped_column(Integer, default=3)           # 1=critical … 5=low
    is_actioned:Mapped[bool]      = mapped_column(Boolean, default=False)
    llm_model:  Mapped[str]       = mapped_column(String(100), nullable=True)   # model that generated this

    brand: Mapped["Brand"] = relationship("Brand", back_populates="insights")


class PipelineRun(TimestampMixin, Base):
    """Audit log for every pipeline execution."""
    __tablename__ = "pipeline_runs"

    id:           Mapped[uuid.UUID]      = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    pipeline_name:Mapped[str]            = mapped_column(String(200), nullable=False)
    status:       Mapped[PipelineStatus] = mapped_column(Enum(PipelineStatus), default=PipelineStatus.PENDING)
    records_in:   Mapped[int]            = mapped_column(BigInteger, default=0)
    records_out:  Mapped[int]            = mapped_column(BigInteger, default=0)
    error_log:    Mapped[str]            = mapped_column(Text, nullable=True)
    meta:         Mapped[dict]           = mapped_column(JSONB, default=dict)
    started_at:   Mapped[datetime]       = mapped_column(DateTime(timezone=True), nullable=True)
    finished_at:  Mapped[datetime]       = mapped_column(DateTime(timezone=True), nullable=True)

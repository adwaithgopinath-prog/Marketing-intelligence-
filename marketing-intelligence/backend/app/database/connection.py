"""
backend/app/database/connection.py

Async SQLAlchemy engine + session factory.
Exposes:
  - engine       → AsyncEngine (used in main.py lifespan)
  - AsyncSessionLocal → session factory
  - get_db       → FastAPI dependency that yields a session per request
  - Base         → declarative base shared by all models
"""

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings


class Base(DeclarativeBase):
    """Shared declarative base for all ORM models."""
    pass


# ── Engine ───────────────────────────────────────────────────────────────────
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,          # SQL logging in dev
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,           # drop stale connections automatically
)

# ── Session factory ───────────────────────────────────────────────────────────
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,       # objects stay usable after commit
)


# ── FastAPI dependency ────────────────────────────────────────────────────────
async def get_db() -> AsyncSession:
    """
    Yields a database session for the duration of one HTTP request.
    The session is automatically closed (and rolled back on error) on exit.

    Usage in a route:
        async def my_route(db: AsyncSession = Depends(get_db)): ...
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise

"""
backend/migrations/env.py

Alembic migration environment.

Supports two modes:
  - `alembic upgrade head`   → online (connects to DB, applies migrations)
  - `alembic revision --autogenerate` → offline (inspects metadata, writes SQL)

The async SQLAlchemy engine from app.database.connection is re-used so that
`SYNC_DATABASE_URL` (psycopg2) is used for Alembic while the app uses asyncpg.
"""

import asyncio
import sys
from logging.config import fileConfig
from pathlib import Path

from alembic import context
from sqlalchemy import pool, engine_from_config
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config

# ── Make sure the `app` package is importable ──────────────────────────────
# Alembic runs from backend/; add backend/ to sys.path so `app.*` resolves.
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

# ── Import Base + all models so Alembic sees the full metadata ─────────────
from app.database.connection import Base  # noqa: E402  (must be after sys.path fix)
from app.database import models  # noqa: F401  (side-effect: registers all ORM classes)

# ── Alembic Config ──────────────────────────────────────────────────────────
config = context.config

# Interpret the config file for Python logging.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# The metadata Alembic will diff against.
target_metadata = Base.metadata


# ── Helpers ─────────────────────────────────────────────────────────────────

def get_url() -> str:
    """
    Prefer the env var DATABASE_URL (injected by docker-compose / .env).
    Fall back to the value baked into alembic.ini.
    We always use the *sync* URL (psycopg2) for Alembic.
    """
    from app.core.config import settings  # imported here to avoid circular deps at module level
    return settings.SYNC_DATABASE_URL


# ── Offline mode (generates SQL without DB connection) ──────────────────────

def run_migrations_offline() -> None:
    url = get_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
        compare_server_default=True,
    )
    with context.begin_transaction():
        context.run_migrations()


# ── Online mode (async) ──────────────────────────────────────────────────────

def do_run_migrations(connection: Connection) -> None:
    context.configure(
        connection=connection,
        target_metadata=target_metadata,
        compare_type=True,
        compare_server_default=True,
    )
    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    """Use an async engine so we don't need a separate sync config."""
    configuration = config.get_section(config.config_ini_section, {})
    configuration["sqlalchemy.url"] = get_url()

    # Use sync pool for Alembic (async pool not needed here).
    connectable = async_engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def run_migrations_online() -> None:
    asyncio.run(run_async_migrations())


# ── Entry point ──────────────────────────────────────────────────────────────
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()

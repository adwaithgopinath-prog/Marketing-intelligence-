"""
marketing-intelligence/backend/app/main.py

Application entry-point.  Bootstraps FastAPI, mounts all routers,
registers middleware, and wires up startup/shutdown lifecycle hooks.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from loguru import logger
from prometheus_fastapi_instrumentator import Instrumentator

from app.api.routes import brands, competitors, insights, pipeline, projects, reviews
from app.core.config import settings
from app.database.connection import engine, Base


# ── Lifespan (replaces deprecated on_event) ─────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup → yield → Shutdown."""
    logger.info("🚀  Starting {name} [{env}]", name=settings.APP_NAME, env=settings.APP_ENV)

    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("✅  Database tables verified")
    except Exception as e:
        logger.warning("⚠️  Could not connect to database: {err}", err=e)

    yield  # ← application runs here

    logger.info("🛑  Shutting down …")
    await engine.dispose()


# ── Application factory ──────────────────────────────────────────────────────
def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version="1.0.0",
        description=(
            "AI-powered marketing intelligence platform. "
            "Ingest reviews, track competitors, surface actionable insights."
        ),
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan,
    )

    # ── Middleware ────────────────────────────────────────────────
    app.add_middleware(GZipMiddleware, minimum_size=1000)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Prometheus metrics (/metrics endpoint) ────────────────────
    Instrumentator().instrument(app).expose(app)

    # ── Routers ──────────────────────────────────────────────────
    PREFIX = "/api/v1"
    app.include_router(projects.router,    prefix=f"{PREFIX}/projects",    tags=["Projects"])
    app.include_router(brands.router,      prefix=f"{PREFIX}/brands",      tags=["Brands"])
    app.include_router(competitors.router, prefix=f"{PREFIX}/competitors", tags=["Competitors"])
    app.include_router(reviews.router,     prefix=f"{PREFIX}/reviews",     tags=["Reviews"])
    app.include_router(insights.router,    prefix=f"{PREFIX}/insights",    tags=["Insights"])
    app.include_router(pipeline.router,    prefix=f"{PREFIX}/pipeline",    tags=["Pipeline"])

    @app.get("/health", tags=["Health"])
    async def health_check():
        return {"status": "ok", "env": settings.APP_ENV}

    return app


app = create_app()

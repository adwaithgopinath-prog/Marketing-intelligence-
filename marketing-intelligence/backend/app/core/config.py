"""
backend/app/core/config.py

Centralised settings loaded from .env via pydantic-settings.
All other modules import `settings` from here — never read os.environ directly.
"""

from functools import lru_cache
from typing import List

from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ── App ──────────────────────────────────────────────────────
    APP_NAME: str = "Marketing Intelligence"
    APP_ENV: str = "development"
    APP_SECRET_KEY: str = "CHANGE_ME"
    DEBUG: bool = True
    LOG_LEVEL: str = "DEBUG"

    # ── Server ───────────────────────────────────────────────────
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    API_RELOAD: bool = True

    # ── Database ─────────────────────────────────────────────────
    DATABASE_URL: str = "postgresql+asyncpg://mi_user:mi_pass@localhost:5432/marketing_intel"
    SYNC_DATABASE_URL: str = "postgresql://mi_user:mi_pass@localhost:5432/marketing_intel"

    # ── Redis / Celery ───────────────────────────────────────────
    REDIS_URL: str = "redis://localhost:6379/0"
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/2"

    # ── LLM ──────────────────────────────────────────────────────
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    LLM_PROVIDER: str = "openai"
    LLM_MODEL: str = "gpt-4o"

    # ── Auth ─────────────────────────────────────────────────────
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 10080

    # ── External APIs ─────────────────────────────────────────────
    GOOGLE_PLACES_API_KEY: str = ""
    YELP_API_KEY: str = ""
    SERPAPI_KEY: str = ""
    TRUSTPILOT_API_KEY: str = ""

    # ── CORS ─────────────────────────────────────────────────────
    # Override via env: CORS_ORIGINS="https://your-app.vercel.app,http://localhost:5173"
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://*.vercel.app",          # all Vercel preview deployments
    ]

    # ── Pipeline ─────────────────────────────────────────────────
    PIPELINE_BATCH_SIZE: int = 100
    PIPELINE_MAX_WORKERS: int = 4
    RAW_DATA_DIR: str = "./data/raw"
    PROCESSED_DATA_DIR: str = "./data/processed"
    EXPORTS_DIR: str = "./data/exports"

    # ── Sentry ───────────────────────────────────────────────────
    SENTRY_DSN: str = ""

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors(cls, v):
        if isinstance(v, str):
            v = v.strip()
            # Handle JSON array string: '["http://...", "http://..."]'
            if v.startswith("["):
                import json
                try:
                    return json.loads(v)
                except json.JSONDecodeError:
                    pass
            # Handle comma-separated string: "http://...,http://..."
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings: Settings = get_settings()

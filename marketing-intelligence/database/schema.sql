-- ============================================================
-- marketing-intelligence/database/schema.sql
-- PostgreSQL 15+ schema definition
-- Run: psql -U mi_user -d marketing_intel -f schema.sql
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- trigram index for full-text search on reviews

-- ── Enums ────────────────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE sentiment_label  AS ENUM ('positive', 'neutral', 'negative');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE pipeline_status  AS ENUM ('pending', 'running', 'completed', 'failed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE review_source AS ENUM (
    'google', 'yelp', 'amazon', 'trustpilot', 'reddit', 'twitter', 'manual'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── projects ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(200) NOT NULL,
  description TEXT,
  is_active   BOOLEAN     NOT NULL DEFAULT TRUE,
  metadata    JSONB       NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── brands ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS brands (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID        NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name       VARCHAR(200) NOT NULL,
  domain     VARCHAR(255),
  category   VARCHAR(100),
  logo_url   VARCHAR(500),
  metadata   JSONB       NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(project_id, name)
);

CREATE INDEX IF NOT EXISTS idx_brands_project ON brands(project_id);

-- ── competitors ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS competitors (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id    UUID        NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  name        VARCHAR(200) NOT NULL,
  domain      VARCHAR(255),
  share_score FLOAT,
  metadata    JSONB       NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_competitors_brand ON competitors(brand_id);

-- ── reviews ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id              UUID           PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id        UUID           NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  source          review_source  NOT NULL,
  external_id     VARCHAR(255),
  author          VARCHAR(200),
  rating          FLOAT          CHECK(rating BETWEEN 1 AND 5),
  title           VARCHAR(500),
  body            TEXT           NOT NULL,
  language        VARCHAR(10)    NOT NULL DEFAULT 'en',
  sentiment       sentiment_label,
  sentiment_score FLOAT          CHECK(sentiment_score BETWEEN -1 AND 1),
  topics          JSONB          NOT NULL DEFAULT '[]',
  reviewed_at     TIMESTAMPTZ,
  is_processed    BOOLEAN        NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  UNIQUE(brand_id, source, external_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_brand     ON reviews(brand_id);
CREATE INDEX IF NOT EXISTS idx_reviews_sentiment ON reviews(sentiment);
CREATE INDEX IF NOT EXISTS idx_reviews_source    ON reviews(source);
CREATE INDEX IF NOT EXISTS idx_reviews_body_trgm ON reviews USING GIN (body gin_trgm_ops);

-- ── insights ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS insights (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id    UUID        NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  category    VARCHAR(100) NOT NULL,
  title       VARCHAR(500) NOT NULL,
  summary     TEXT        NOT NULL,
  evidence    JSONB       NOT NULL DEFAULT '{}',
  priority    INTEGER     NOT NULL DEFAULT 3 CHECK(priority BETWEEN 1 AND 5),
  is_actioned BOOLEAN     NOT NULL DEFAULT FALSE,
  llm_model   VARCHAR(100),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_insights_brand    ON insights(brand_id);
CREATE INDEX IF NOT EXISTS idx_insights_priority ON insights(priority);

-- ── pipeline_runs ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pipeline_runs (
  id            UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
  pipeline_name VARCHAR(200)    NOT NULL,
  status        pipeline_status NOT NULL DEFAULT 'pending',
  records_in    BIGINT          NOT NULL DEFAULT 0,
  records_out   BIGINT          NOT NULL DEFAULT 0,
  error_log     TEXT,
  meta          JSONB           NOT NULL DEFAULT '{}',
  started_at    TIMESTAMPTZ,
  finished_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- ── Auto-update updated_at ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['projects','brands','competitors','reviews','insights','pipeline_runs']
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS trg_updated_at ON %I;
       CREATE TRIGGER trg_updated_at
       BEFORE UPDATE ON %I
       FOR EACH ROW EXECUTE FUNCTION set_updated_at();', tbl, tbl
    );
  END LOOP;
END $$;

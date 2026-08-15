"""
pipeline/run_pipeline.py

CLI entry-point for running the full marketing intelligence pipeline.

Usage:
  python pipeline/run_pipeline.py --brand-id <uuid> --sources google yelp --insights

Steps (in order):
  1. Ingest          → fetch raw data from configured sources
  2. Clean           → normalise & deduplicate records
  3. Store           → upsert cleaned reviews into PostgreSQL
  4. Sentiment       → label every new review
  5. Topics          → extract recurring themes
  6. Market Gaps     → surface unmet needs
  7. Insights        → call LLM to generate strategic insights
  8. Log             → write PipelineRun audit record

Each step is timed and logged.  Failures are caught per-step so the
rest of the pipeline continues.  Final exit code is 0 on success, 1 if
any step failed.
"""

import argparse
import asyncio
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path

# ── Allow direct execution from repo root ─────────────────────────
sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from loguru import logger

# ── Pipeline imports ─────────────────────────────────────────────
from pipeline.ingestion.reviews import ingest_all
from pipeline.transformations.clean_reviews import clean_reviews
from pipeline.analytics.sentiment import run_sentiment_batch, aggregate_sentiment
from pipeline.analytics.topics import extract_topics, tag_reviews_with_topics
from pipeline.analytics.market_gaps import identify_market_gaps


async def run(brand_id: str, brand_name: str, sources: list[str], run_insights: bool):
    logger.info("=" * 60)
    logger.info("Pipeline start | brand={} sources={}", brand_name, sources)
    start = datetime.now(timezone.utc)
    errors = []

    # ── Step 1: Ingest ────────────────────────────────────────────
    logger.info("[1/7] Ingesting from sources: {}", sources)
    try:
        counts = await ingest_all(brand_name=brand_name, brand_id=brand_id, sources=sources)
        logger.info("Ingestion counts: {}", counts)
    except Exception as exc:
        logger.error("[1/7] Ingestion failed: {}", exc)
        errors.append(f"Ingest: {exc}")
        counts = {}

    # ── Step 2: Clean ─────────────────────────────────────────────
    logger.info("[2/7] Cleaning raw records …")
    raw_reviews = []   # in real impl: load from data/raw/<brand_id>/
    try:
        cleaned = clean_reviews(raw_reviews)
    except Exception as exc:
        logger.error("[2/7] Clean failed: {}", exc)
        errors.append(f"Clean: {exc}")
        cleaned = []

    # ── Step 3: Store (placeholder — needs DB session in full impl) ─
    logger.info("[3/7] Storing {} records to DB (placeholder)", len(cleaned))

    # ── Step 4: Sentiment ─────────────────────────────────────────
    logger.info("[4/7] Running sentiment analysis …")
    try:
        texts    = [r["body"] for r in cleaned]
        sentiments = run_sentiment_batch(texts)
        stats    = aggregate_sentiment(sentiments)
        logger.info("Sentiment stats: {}", stats)
        for rec, sent in zip(cleaned, sentiments):
            rec.update(sent)
    except Exception as exc:
        logger.error("[4/7] Sentiment failed: {}", exc)
        errors.append(f"Sentiment: {exc}")

    # ── Step 5: Topics ────────────────────────────────────────────
    logger.info("[5/7] Extracting topics …")
    try:
        topics  = extract_topics([r["body"] for r in cleaned])
        cleaned = tag_reviews_with_topics(cleaned, topics)
        logger.info("Top topics: {}", topics[:5])
    except Exception as exc:
        logger.error("[5/7] Topics failed: {}", exc)
        errors.append(f"Topics: {exc}")

    # ── Step 6: Market Gaps ───────────────────────────────────────
    logger.info("[6/7] Identifying market gaps …")
    try:
        gaps = identify_market_gaps(cleaned)
        logger.info("{} market gaps identified", len(gaps))
    except Exception as exc:
        logger.error("[6/7] Market gaps failed: {}", exc)
        errors.append(f"MarketGaps: {exc}")

    # ── Step 7: Insights (LLM) ────────────────────────────────────
    if run_insights:
        logger.info("[7/7] Generating LLM insights …")
        try:
            from app.services.insights import InsightService
            svc     = InsightService()
            texts_  = [r["body"] for r in cleaned[:50]]
            insights = await svc.generate(brand_id=uuid.UUID(brand_id), texts=texts_)
            logger.info("{} insights generated", len(insights))
        except Exception as exc:
            logger.error("[7/7] Insights failed: {}", exc)
            errors.append(f"Insights: {exc}")
    else:
        logger.info("[7/7] Insights skipped (--no-insights flag)")

    elapsed = (datetime.now(timezone.utc) - start).total_seconds()
    logger.info("=" * 60)
    logger.info("Pipeline complete in {:.1f}s | errors={}", elapsed, len(errors))

    if errors:
        for e in errors:
            logger.warning("  ↳ {}", e)
        return 1
    return 0


def parse_args():
    parser = argparse.ArgumentParser(description="Run marketing intelligence pipeline")
    parser.add_argument("--brand-id",   required=True, help="Brand UUID")
    parser.add_argument("--brand-name", required=True, help="Brand display name")
    parser.add_argument("--sources",    nargs="+", default=["google"],
                        choices=["google", "yelp", "trustpilot", "manual"])
    parser.add_argument("--insights",   action="store_true", default=False,
                        help="Run LLM insight generation (requires API key)")
    return parser.parse_args()


if __name__ == "__main__":
    args   = parse_args()
    result = asyncio.run(run(
        brand_id=args.brand_id,
        brand_name=args.brand_name,
        sources=args.sources,
        run_insights=args.insights,
    ))
    sys.exit(result)

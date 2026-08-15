"""
pipeline/analytics/sentiment.py

Batch sentiment analysis for a list of review texts.
Wraps the same SentimentService used in the backend so there is
ONE implementation, not two.

Why not just call the backend API?  The pipeline runs as a standalone
process and should not depend on the HTTP server being up.  Shared
service code lives in backend/app/services/ and is imported directly.
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../backend"))

from typing import Any, Dict, List

from app.services.sentiment import SentimentService
from loguru import logger

_service = SentimentService()


def run_sentiment_batch(texts: List[str]) -> List[Dict[str, Any]]:
    """
    Returns list of {label, score} dicts, one per input text.
    Preserves input order.
    """
    results = []
    for i, text in enumerate(texts):
        try:
            results.append(_service.analyze(text))
        except Exception as exc:
            logger.error("Sentiment failed for record {}: {}", i, exc)
            results.append({"label": "neutral", "score": 0.0})
    logger.info("Sentiment analysis: {} records processed", len(results))
    return results


def aggregate_sentiment(results: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Compute aggregate statistics over a batch of sentiment results."""
    if not results:
        return {"positive": 0, "neutral": 0, "negative": 0, "avg_score": 0.0}
    counts = {"positive": 0, "neutral": 0, "negative": 0}
    for r in results:
        counts[r["label"]] = counts.get(r["label"], 0) + 1
    avg_score = sum(r["score"] for r in results) / len(results)
    return {**counts, "total": len(results), "avg_score": round(avg_score, 4)}

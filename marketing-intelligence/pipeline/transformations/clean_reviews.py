"""
pipeline/transformations/clean_reviews.py

Transforms raw review dicts into clean, normalised dicts ready for DB insert.

Steps performed:
  1. Strip HTML / excessive whitespace from body
  2. Detect and validate language (langdetect)
  3. Deduplicate by (source, external_id)
  4. Enforce schema (fill missing fields with None / defaults)
"""

import hashlib
import re
from typing import Any, Dict, List, Set

from loguru import logger


def _strip_html(text: str) -> str:
    return re.sub(r"<[^>]+>", " ", text).strip()


def _normalise_whitespace(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def _detect_language(text: str) -> str:
    try:
        from langdetect import detect
        return detect(text)
    except Exception:
        return "en"


def _fingerprint(record: Dict) -> str:
    key = f"{record.get('source','')}-{record.get('external_id','')}-{record.get('body','')[:80]}"
    return hashlib.md5(key.encode()).hexdigest()


def clean_reviews(raw_records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Accepts raw review dicts from any ingester and returns cleaned dicts.
    Duplicate records (same fingerprint) within the batch are dropped.
    """
    seen: Set[str] = set()
    cleaned: List[Dict] = []

    for rec in raw_records:
        body = _normalise_whitespace(_strip_html(rec.get("body", "")))
        if len(body) < 10:
            logger.debug("Dropping short review: {!r}", body[:50])
            continue

        fp = _fingerprint({**rec, "body": body})
        if fp in seen:
            continue
        seen.add(fp)

        cleaned.append(
            {
                "source":      rec.get("source", "manual"),
                "external_id": rec.get("external_id"),
                "author":      rec.get("author"),
                "rating":      _safe_float(rec.get("rating")),
                "title":       _normalise_whitespace(rec.get("title", "") or ""),
                "body":        body,
                "language":    rec.get("language") or _detect_language(body),
                "reviewed_at": rec.get("reviewed_at"),
            }
        )

    logger.info("clean_reviews: {} → {} records after cleaning", len(raw_records), len(cleaned))
    return cleaned


def _safe_float(value) -> float | None:
    try:
        return float(value) if value is not None else None
    except (ValueError, TypeError):
        return None

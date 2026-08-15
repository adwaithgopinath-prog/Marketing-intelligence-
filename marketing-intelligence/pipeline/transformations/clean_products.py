"""
pipeline/transformations/clean_products.py

Normalises raw product dicts from various ingesters into a canonical schema.
"""

import re
from typing import Any, Dict, List, Optional

from loguru import logger


def _parse_price(raw: str | None) -> Optional[float]:
    """Extract first numeric price value from a string like '$29.99' or 'USD 30'."""
    if not raw:
        return None
    match = re.search(r"[\d,]+\.?\d*", raw.replace(",", ""))
    if match:
        try:
            return float(match.group())
        except ValueError:
            return None
    return None


def clean_products(raw_records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    cleaned = []
    for rec in raw_records:
        name = (rec.get("name") or rec.get("title") or "").strip()
        if not name:
            continue
        cleaned.append(
            {
                "name":       name,
                "price":      _parse_price(str(rec.get("price") or "")),
                "rating":     rec.get("rating"),
                "url":        rec.get("url"),
                "source":     rec.get("source", "unknown"),
                "asin":       rec.get("asin"),
                "raw":        rec,  # keep original for audit
            }
        )
    logger.info("clean_products: {} → {} records", len(raw_records), len(cleaned))
    return cleaned

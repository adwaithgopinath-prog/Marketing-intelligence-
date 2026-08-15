"""
pipeline/transformations/normalize_brands.py

Resolves brand name aliases and merges duplicate variants.

Example: ["Nike", "NIKE", "nike inc"] → "Nike"

Uses fuzzy matching (rapidfuzz) to catch near-duplicates.
The canonical name is always the most frequently occurring variant.
"""

from collections import Counter
from typing import Dict, List

from loguru import logger

try:
    from rapidfuzz import fuzz, process
    RAPIDFUZZ_AVAILABLE = True
except ImportError:
    RAPIDFUZZ_AVAILABLE = False
    logger.warning("rapidfuzz not installed — brand normalisation will use exact matching only")


def build_alias_map(brand_names: List[str], threshold: int = 85) -> Dict[str, str]:
    """
    Given a list of raw brand name strings, return a dict mapping
    each variant → canonical name.

    canonical = most common form in the input list.
    Variants within `threshold` similarity are grouped together.
    """
    if not RAPIDFUZZ_AVAILABLE:
        # Fallback: case-normalise only
        return {name: name.strip().title() for name in brand_names}

    counts    = Counter(brand_names)
    canonical = {}   # variant → canonical

    for name in sorted(counts.keys(), key=lambda n: -counts[n]):
        # If already mapped, skip
        if name in canonical:
            continue
        canonical[name] = name
        # Find all near-duplicates
        matches = process.extract(name, brand_names, scorer=fuzz.token_sort_ratio, limit=None)
        for match_name, score, _ in matches:
            if score >= threshold and match_name not in canonical:
                canonical[match_name] = name

    return canonical


def normalize_brand_names(records: List[Dict], alias_map: Dict[str, str]) -> List[Dict]:
    """Apply alias map to a list of records that have a 'brand_name' key."""
    for rec in records:
        raw = rec.get("brand_name", "")
        rec["brand_name"] = alias_map.get(raw, raw)
    return records

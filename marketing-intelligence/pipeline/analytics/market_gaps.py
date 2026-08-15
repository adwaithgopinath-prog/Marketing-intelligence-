"""
pipeline/analytics/market_gaps.py

Identifies unmet customer needs (market gaps) from review texts.

Approach:
  1. Filter negative / neutral reviews
  2. Extract noun phrases (pain points)
  3. Score by frequency → high-frequency unmet needs = market gaps
  4. Optionally validate with LLM for higher-quality narrative
"""

from collections import Counter
from typing import Any, Dict, List

from loguru import logger


def identify_market_gaps(
    reviews: List[Dict[str, Any]],
    min_frequency: int = 2,
    top_n: int = 10,
) -> List[Dict[str, Any]]:
    """
    Analyse negative/neutral reviews to surface recurring pain points.

    Returns list of gap dicts:
      {"topic": str, "frequency": int, "example_quotes": [str]}
    """
    negative_reviews = [
        r for r in reviews
        if r.get("sentiment") in ("negative", "neutral")
    ]

    if not negative_reviews:
        logger.info("No negative/neutral reviews to analyse for market gaps")
        return []

    # Extract noun phrases via simple pattern matching (upgrade to spaCy for production)
    import re
    STOP = {"the","a","an","is","was","it","this","that","and","or","but","in","on","of","to","for","with","they","i","we","you","my"}
    phrase_counter: Counter = Counter()
    phrase_examples: Dict[str, List[str]] = {}

    for review in negative_reviews:
        body  = review.get("body", "")
        words = re.findall(r"[a-z]{4,}", body.lower())
        for w in words:
            if w not in STOP:
                phrase_counter[w] += 1
                phrase_examples.setdefault(w, [])
                if len(phrase_examples[w]) < 3:
                    phrase_examples[w].append(body[:120])

    gaps = []
    for phrase, freq in phrase_counter.most_common(top_n * 3):
        if freq >= min_frequency:
            gaps.append({
                "topic":          phrase,
                "frequency":      freq,
                "example_quotes": phrase_examples.get(phrase, []),
            })
        if len(gaps) >= top_n:
            break

    logger.info("market_gaps: found {} gaps from {} negative reviews", len(gaps), len(negative_reviews))
    return gaps

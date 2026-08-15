"""
pipeline/analytics/competitors.py

Competitor analysis module.
Computes share-of-voice, sentiment comparison, and topic overlap
between a target brand and its competitors.
"""

from collections import defaultdict
from typing import Any, Dict, List


def share_of_voice(reviews_by_brand: Dict[str, List[Dict]]) -> Dict[str, float]:
    """
    Compute share-of-voice as percentage of total review volume per brand.

    Args:
        reviews_by_brand: {"BrandA": [review, ...], "BrandB": [...]}

    Returns:
        {"BrandA": 60.5, "BrandB": 39.5}
    """
    totals = {brand: len(reviews) for brand, reviews in reviews_by_brand.items()}
    grand  = sum(totals.values()) or 1
    return {brand: round(count / grand * 100, 2) for brand, count in totals.items()}


def sentiment_comparison(reviews_by_brand: Dict[str, List[Dict]]) -> Dict[str, Dict]:
    """
    For each brand, compute positive / neutral / negative ratios and avg score.

    Expects review dicts to have 'sentiment' and 'sentiment_score' keys.
    """
    result = {}
    for brand, reviews in reviews_by_brand.items():
        counts: Dict[str, int] = defaultdict(int)
        scores = []
        for r in reviews:
            label = r.get("sentiment", "neutral")
            counts[label] += 1
            score = r.get("sentiment_score")
            if score is not None:
                scores.append(score)

        total = len(reviews) or 1
        result[brand] = {
            "positive_pct": round(counts["positive"] / total * 100, 1),
            "neutral_pct":  round(counts["neutral"]  / total * 100, 1),
            "negative_pct": round(counts["negative"] / total * 100, 1),
            "avg_score":    round(sum(scores) / len(scores), 4) if scores else 0.0,
            "total_reviews": len(reviews),
        }
    return result


def topic_overlap(
    target_topics: List[str],
    competitor_topics: Dict[str, List[str]],
) -> Dict[str, Dict]:
    """
    Identify which topics are shared vs exclusive to each brand.

    Returns per-competitor:
      - shared:     topics in both target and competitor
      - exclusive:  topics only in the competitor (gaps for target)
    """
    target_set = set(target_topics)
    result     = {}
    for brand, topics in competitor_topics.items():
        comp_set = set(topics)
        result[brand] = {
            "shared":    list(target_set & comp_set),
            "exclusive": list(comp_set - target_set),   # competitor has, target doesn't
            "missing":   list(target_set - comp_set),   # target has, competitor doesn't
        }
    return result

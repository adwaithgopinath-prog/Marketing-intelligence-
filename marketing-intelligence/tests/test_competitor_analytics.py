"""
tests/test_competitor_analytics.py

Unit tests for competitor analysis functions.
"""

from pipeline.analytics.competitors import sentiment_comparison, share_of_voice, topic_overlap


def _make_reviews(label: str, n: int):
    return [{"sentiment": label, "sentiment_score": 0.5 if label == "positive" else -0.5} for _ in range(n)]


def test_share_of_voice():
    data = {
        "BrandA": _make_reviews("positive", 60),
        "BrandB": _make_reviews("negative", 40),
    }
    sov = share_of_voice(data)
    assert sov["BrandA"] == 60.0
    assert sov["BrandB"] == 40.0


def test_sentiment_comparison():
    data = {
        "BrandA": _make_reviews("positive", 8) + _make_reviews("negative", 2),
    }
    result = sentiment_comparison(data)
    assert result["BrandA"]["positive_pct"] == 80.0
    assert result["BrandA"]["negative_pct"] == 20.0


def test_topic_overlap():
    target = ["price", "quality", "shipping"]
    competitors = {
        "CompA": ["price", "design", "returns"],
    }
    result = topic_overlap(target, competitors)
    assert "price" in result["CompA"]["shared"]
    assert "design" in result["CompA"]["exclusive"]
    assert "quality" in result["CompA"]["missing"]

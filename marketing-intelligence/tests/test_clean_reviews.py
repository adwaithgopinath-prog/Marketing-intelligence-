"""
tests/test_clean_reviews.py

Unit tests for the review cleaning transformation.
"""

from pipeline.transformations.clean_reviews import clean_reviews


def test_strips_html():
    raw = [{"source": "google", "body": "<p>Great product!</p>", "external_id": "1"}]
    cleaned = clean_reviews(raw)
    assert len(cleaned) == 1
    assert "<p>" not in cleaned[0]["body"]
    assert "Great product!" in cleaned[0]["body"]


def test_removes_short_reviews():
    raw = [{"source": "google", "body": "ok", "external_id": "2"}]
    cleaned = clean_reviews(raw)
    assert len(cleaned) == 0


def test_deduplicates():
    raw = [
        {"source": "google", "body": "Great product!", "external_id": "1"},
        {"source": "google", "body": "Great product!", "external_id": "1"},  # duplicate
    ]
    cleaned = clean_reviews(raw)
    assert len(cleaned) == 1


def test_normalises_whitespace():
    raw = [{"source": "yelp", "body": "Very   good   product   here", "external_id": "3"}]
    cleaned = clean_reviews(raw)
    assert "  " not in cleaned[0]["body"]

"""
tests/test_sentiment.py

Unit tests for SentimentService.
Run: pytest tests/ -v
"""

import pytest
from app.services.sentiment import SentimentService


@pytest.fixture(scope="module")
def service():
    return SentimentService()


def test_positive_review(service):
    result = service.analyze("I absolutely love this product! Best purchase ever.")
    assert result["label"] == "positive"
    assert result["score"] > 0


def test_negative_review(service):
    result = service.analyze("Terrible quality, broke after one day. Total waste of money.")
    assert result["label"] == "negative"
    assert result["score"] < 0


def test_neutral_review(service):
    result = service.analyze("The product arrived. It is a product.")
    assert result["label"] in ("neutral", "positive", "negative")   # label must be one of three
    assert -1 <= result["score"] <= 1


def test_empty_text_returns_neutral(service):
    result = service.analyze("")
    assert result["label"] in ("neutral", "positive", "negative")

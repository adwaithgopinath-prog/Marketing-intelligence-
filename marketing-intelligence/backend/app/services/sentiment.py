"""
backend/app/services/sentiment.py

Sentiment analysis service.

DECISION: We use a two-tier approach —
  Tier 1  →  VADER (rule-based, zero latency, no GPU needed)
  Tier 2  →  HuggingFace `cardiffnlp/twitter-roberta-base-sentiment-latest`
             (transformer, ~5× more accurate but requires model download)

The active tier is controlled by the SENTIMENT_BACKEND env var (default: vader).
This lets us ship fast in development and upgrade to the transformer in production
without changing any call sites.
"""

import os
from functools import lru_cache
from typing import Dict

from loguru import logger


class SentimentService:
    """
    Thin facade over sentiment backends.
    Call `.analyze(text)` → {"label": "positive"|"neutral"|"negative", "score": float}
    """

    def __init__(self):
        self._backend = os.getenv("SENTIMENT_BACKEND", "vader").lower()
        if self._backend == "transformer":
            self._load_transformer()
        else:
            self._load_vader()
        logger.info("SentimentService initialised | backend={}", self._backend)

    # ── Loaders ──────────────────────────────────────────────────────────────
    def _load_vader(self):
        from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
        self._vader = SentimentIntensityAnalyzer()

    def _load_transformer(self):
        from transformers import pipeline as hf_pipeline
        model = os.getenv("SENTIMENT_MODEL", "cardiffnlp/twitter-roberta-base-sentiment-latest")
        self._pipe = hf_pipeline("sentiment-analysis", model=model, truncation=True, max_length=512)

    # ── Public API ────────────────────────────────────────────────────────────
    def analyze(self, text: str) -> Dict[str, object]:
        if self._backend == "transformer":
            return self._transformer_analyze(text)
        return self._vader_analyze(text)

    # ── Private ───────────────────────────────────────────────────────────────
    def _vader_analyze(self, text: str) -> Dict[str, object]:
        scores = self._vader.polarity_scores(text)
        compound = scores["compound"]   # –1 to +1
        if compound >= 0.05:
            label = "positive"
        elif compound <= -0.05:
            label = "negative"
        else:
            label = "neutral"
        return {"label": label, "score": round(compound, 4)}

    def _transformer_analyze(self, text: str) -> Dict[str, object]:
        result = self._pipe(text[:512])[0]
        raw_label = result["label"].lower()   # e.g. "label_2" or "positive"
        # Normalise cardiffnlp label format
        label_map = {"label_0": "negative", "label_1": "neutral", "label_2": "positive"}
        label = label_map.get(raw_label, raw_label)
        # Score: map 0-1 confidence to –1…+1
        score = result["score"]
        if label == "negative": score = -score
        elif label == "neutral": score = 0.0
        return {"label": label, "score": round(score, 4)}

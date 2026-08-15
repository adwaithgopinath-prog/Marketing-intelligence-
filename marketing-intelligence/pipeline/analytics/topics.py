"""
pipeline/analytics/topics.py

Extracts recurring topics / themes from a list of review texts.

Two strategies:
  1. KeyBERT (embedding-based keyword extraction)  — set TOPIC_BACKEND=keybert
  2. spaCy NER + noun-chunk frequency              — default, no GPU needed

DECISION: Default to spaCy noun-chunk approach because:
  - Zero cold-start download (if spaCy model pre-installed)
  - Deterministic output (good for test assertions)
  - KeyBERT requires sentence-transformers model (~400 MB download)
  KeyBERT is wired in for production via env var.
"""

import os
from collections import Counter
from typing import Any, Dict, List

from loguru import logger

TOPIC_BACKEND = os.getenv("TOPIC_BACKEND", "spacy")


def extract_topics(texts: List[str], top_n: int = 10) -> List[str]:
    """Return a list of the top_n most frequent topics across all texts."""
    if TOPIC_BACKEND == "keybert":
        return _keybert_topics(texts, top_n)
    return _spacy_topics(texts, top_n)


def _spacy_topics(texts: List[str], top_n: int) -> List[str]:
    try:
        import spacy
        try:
            nlp = spacy.load("en_core_web_sm")
        except OSError:
            logger.warning("spaCy model en_core_web_sm not found. Run: python -m spacy download en_core_web_sm")
            return _fallback_topics(texts, top_n)

        counter: Counter = Counter()
        for doc in nlp.pipe(texts, batch_size=32):
            for chunk in doc.noun_chunks:
                lemma = chunk.root.lemma_.lower()
                if len(lemma) > 3 and lemma.isalpha():
                    counter[lemma] += 1
        topics = [t for t, _ in counter.most_common(top_n)]
        logger.info("spaCy extracted {} topics", len(topics))
        return topics
    except Exception as exc:
        logger.error("_spacy_topics failed: {}", exc)
        return _fallback_topics(texts, top_n)


def _keybert_topics(texts: List[str], top_n: int) -> List[str]:
    from keybert import KeyBERT
    kw_model = KeyBERT()
    combined = " ".join(texts[:30])    # cap to avoid OOM
    keywords = kw_model.extract_keywords(combined, top_n=top_n)
    return [kw for kw, _ in keywords]


def _fallback_topics(texts: List[str], top_n: int) -> List[str]:
    """Simple word-frequency fallback — no NLP library required."""
    import re
    STOP = {"the","a","an","is","was","it","this","that","and","or","but","in","on","of","to","for","with","at"}
    counter: Counter = Counter()
    for text in texts:
        words = re.findall(r"[a-z]{4,}", text.lower())
        for w in words:
            if w not in STOP:
                counter[w] += 1
    return [w for w, _ in counter.most_common(top_n)]


def tag_reviews_with_topics(reviews: List[Dict], topic_list: List[str]) -> List[Dict]:
    """
    For each review dict, set its 'topics' key to the subset of topic_list
    that appear in its body text.
    """
    for review in reviews:
        body   = review.get("body", "").lower()
        review["topics"] = [t for t in topic_list if t in body]
    return reviews

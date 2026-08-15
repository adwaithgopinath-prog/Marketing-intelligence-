"""
pipeline/ingestion/reviews.py

Scrapes / fetches reviews from multiple external sources and writes
raw JSON files to data/raw/<brand_id>/<source>/<date>.jsonl.

Supported sources  →  adapter classes:
  GoogleReviewIngester
  YelpReviewIngester
  TrustpilotReviewIngester
  ManualFileIngester        (load from a local JSONL file)

Each ingester exposes:
  .fetch(brand_name, **kwargs) → List[dict]
"""

import asyncio
import json
import os
from abc import ABC, abstractmethod
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List

import httpx
from loguru import logger


RAW_DATA_DIR = Path(os.getenv("RAW_DATA_DIR", "./data/raw"))


class BaseIngester(ABC):
    source: str = "unknown"

    @abstractmethod
    async def fetch(self, brand_name: str, **kwargs) -> List[Dict[str, Any]]:
        ...

    def save_raw(self, brand_id: str, records: List[Dict]) -> Path:
        date_str  = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
        out_dir   = RAW_DATA_DIR / brand_id / self.source
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file  = out_dir / f"{date_str}.jsonl"
        with open(out_file, "w", encoding="utf-8") as f:
            for rec in records:
                f.write(json.dumps(rec, ensure_ascii=False) + "\n")
        logger.info("Saved {} raw records → {}", len(records), out_file)
        return out_file


class GoogleReviewIngester(BaseIngester):
    source = "google"

    async def fetch(self, brand_name: str, api_key: str = "", **kwargs) -> List[Dict]:
        """
        Uses Google Places API to get place reviews.
        Returns empty list if api_key is blank (dev mode).
        """
        if not api_key:
            logger.warning("Google Places API key not set, returning mock data")
            return self._mock_reviews(brand_name)

        async with httpx.AsyncClient(timeout=15) as client:
            # Step 1: Find place
            search_r = await client.get(
                "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
                params={"input": brand_name, "inputtype": "textquery", "key": api_key},
            )
            search_r.raise_for_status()
            places = search_r.json().get("candidates", [])
            if not places:
                return []

            place_id = places[0]["place_id"]

            # Step 2: Get details (includes reviews)
            detail_r = await client.get(
                "https://maps.googleapis.com/maps/api/place/details/json",
                params={"place_id": place_id, "fields": "reviews,rating,name", "key": api_key},
            )
            detail_r.raise_for_status()
            detail = detail_r.json().get("result", {})
            reviews = detail.get("reviews", [])

            return [
                {
                    "source":      "google",
                    "external_id": r.get("author_url", ""),
                    "author":      r.get("author_name"),
                    "rating":      float(r.get("rating", 0)),
                    "body":        r.get("text", ""),
                    "reviewed_at": datetime.fromtimestamp(r.get("time", 0), tz=timezone.utc).isoformat(),
                }
                for r in reviews
            ]

    @staticmethod
    def _mock_reviews(brand_name: str) -> List[Dict]:
        return [
            {"source": "google", "author": "Alice M.", "rating": 4.0,
             "body": f"Great experience with {brand_name}. Delivery was fast.", "external_id": "mock_g_1"},
            {"source": "google", "author": "Bob K.",   "rating": 2.0,
             "body": f"{brand_name} customer service was slow and unhelpful.",  "external_id": "mock_g_2"},
            {"source": "google", "author": "Carol T.", "rating": 5.0,
             "body": f"Absolutely love {brand_name}! Best product in the market.", "external_id": "mock_g_3"},
        ]


class YelpReviewIngester(BaseIngester):
    source = "yelp"

    async def fetch(self, brand_name: str, api_key: str = "", **kwargs) -> List[Dict]:
        if not api_key:
            logger.warning("Yelp API key not set, returning mock data")
            return [
                {"source": "yelp", "author": "Dave R.", "rating": 3.0,
                 "body": f"Decent. {brand_name} needs to improve packaging.", "external_id": "mock_y_1"},
            ]
        # Real Yelp Fusion API call would go here
        return []


class TrustpilotReviewIngester(BaseIngester):
    source = "trustpilot"

    async def fetch(self, brand_name: str, domain: str = "", **kwargs) -> List[Dict]:
        """Scrapes public Trustpilot page (no API key required for public data)."""
        if not domain:
            logger.warning("No domain provided for Trustpilot ingester")
            return []
        url = f"https://www.trustpilot.com/review/{domain}"
        async with httpx.AsyncClient(timeout=20, follow_redirects=True) as client:
            try:
                r = await client.get(url, headers={"User-Agent": "Mozilla/5.0"})
                r.raise_for_status()
                from bs4 import BeautifulSoup
                soup      = BeautifulSoup(r.text, "html.parser")
                cards     = soup.select("[data-service-review-card-paper]")
                reviews   = []
                for card in cards[:20]:
                    body_el = card.select_one("[data-service-review-text-typography]")
                    if body_el:
                        reviews.append({
                            "source":  "trustpilot",
                            "body":    body_el.get_text(strip=True),
                            "external_id": None,
                        })
                return reviews
            except Exception as exc:
                logger.error("Trustpilot scrape failed: {}", exc)
                return []


class ManualFileIngester(BaseIngester):
    source = "manual"

    async def fetch(self, brand_name: str, file_path: str = "", **kwargs) -> List[Dict]:
        """Load reviews from a local JSONL file."""
        if not file_path or not Path(file_path).exists():
            logger.error("ManualFileIngester: file not found: {}", file_path)
            return []
        records = []
        with open(file_path, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    records.append(json.loads(line))
        return records


# ── Registry ──────────────────────────────────────────────────────
INGESTERS: Dict[str, BaseIngester] = {
    "google":      GoogleReviewIngester(),
    "yelp":        YelpReviewIngester(),
    "trustpilot":  TrustpilotReviewIngester(),
    "manual":      ManualFileIngester(),
}


async def ingest_all(brand_name: str, brand_id: str, sources: List[str], **kwargs) -> Dict[str, int]:
    """Run all requested ingesters in parallel and return per-source counts."""
    tasks   = {src: INGESTERS[src].fetch(brand_name, **kwargs) for src in sources if src in INGESTERS}
    results = await asyncio.gather(*tasks.values(), return_exceptions=True)
    counts  = {}
    for src, result in zip(tasks.keys(), results):
        if isinstance(result, Exception):
            logger.error("Ingester [{}] failed: {}", src, result)
            counts[src] = 0
        else:
            INGESTERS[src].save_raw(brand_id, result)
            counts[src] = len(result)
    return counts

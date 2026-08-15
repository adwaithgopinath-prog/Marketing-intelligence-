"""
pipeline/ingestion/advertisements.py

Ingests advertisement data from public sources and ad-transparency libraries.
Covers: Google Ads Transparency Centre, Meta Ad Library, TikTok Creative Center.

Note: These are public transparency APIs that require no authentication.
"""

import asyncio
from typing import Any, Dict, List

import httpx
from loguru import logger


class MetaAdLibraryIngester:
    """Fetch ads from Meta Ad Library (requires access token for full detail)."""

    BASE_URL = "https://graph.facebook.com/v19.0/ads_archive"

    async def fetch(self, search_terms: str, access_token: str = "", limit: int = 50) -> List[Dict]:
        if not access_token:
            logger.warning("META_ACCESS_TOKEN not set — returning empty ads list")
            return []

        params = {
            "search_terms":  search_terms,
            "ad_type":       "ALL",
            "limit":         limit,
            "fields":        "id,ad_creative_bodies,ad_snapshot_url,spend,impressions,ad_delivery_start_time",
            "access_token":  access_token,
        }
        async with httpx.AsyncClient(timeout=20) as client:
            try:
                r = await client.get(self.BASE_URL, params=params)
                r.raise_for_status()
                return r.json().get("data", [])
            except Exception as exc:
                logger.error("MetaAdLibraryIngester error: {}", exc)
                return []


class TikTokCreativeCenterIngester:
    """
    Scrapes TikTok Creative Center top ads for a given industry keyword.
    No authentication needed; rate-limited to 1 req/sec.
    """

    async def fetch(self, keyword: str, region: str = "US", limit: int = 20) -> List[Dict]:
        url = "https://ads.tiktok.com/creative_radar_api/v1/top_ads/v2/list"
        params = {
            "period":     7,
            "region":     region,
            "keyword":    keyword,
            "page":       1,
            "limit":      limit,
            "ad_language": "en",
        }
        async with httpx.AsyncClient(timeout=20, headers={"User-Agent": "Mozilla/5.0"}) as client:
            try:
                r = await client.get(url, params=params)
                r.raise_for_status()
                data = r.json()
                return data.get("data", {}).get("materials", [])
            except Exception as exc:
                logger.error("TikTokCreativeCenterIngester error: {}", exc)
                return []

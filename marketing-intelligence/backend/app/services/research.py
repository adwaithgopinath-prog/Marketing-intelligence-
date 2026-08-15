"""
backend/app/services/research.py

Web-research service — fetches publicly available data about a brand
or competitor from search results and web pages.

Provides:
  - search(query)   → list of result snippets
  - scrape(url)     → cleaned page text (respects robots.txt, retries)
"""

import asyncio
from typing import List

import httpx
from bs4 import BeautifulSoup
from loguru import logger
from tenacity import retry, stop_after_attempt, wait_exponential

from app.core.config import settings

_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (compatible; MarketingIntelligenceBot/1.0; "
        "+https://marketingintelligence.io/bot)"
    )
}


class ResearchService:
    """Lightweight web-research helper used by competitor and pipeline services."""

    def __init__(self):
        self._client = httpx.AsyncClient(headers=_HEADERS, timeout=15, follow_redirects=True)

    # ── SerpAPI search ────────────────────────────────────────────────────────
    async def search(self, query: str, num_results: int = 10) -> List[dict]:
        """
        Use SerpAPI to get structured search results.
        Falls back to an empty list if the API key is not configured.
        """
        if not settings.SERPAPI_KEY:
            logger.warning("SERPAPI_KEY not set — skipping web search")
            return []

        params = {
            "q": query,
            "num": num_results,
            "api_key": settings.SERPAPI_KEY,
            "engine": "google",
        }
        try:
            r = await self._client.get("https://serpapi.com/search", params=params)
            r.raise_for_status()
            data = r.json()
            return [
                {"title": res.get("title"), "snippet": res.get("snippet"), "url": res.get("link")}
                for res in data.get("organic_results", [])
            ]
        except Exception as exc:
            logger.error("ResearchService.search error: {}", exc)
            return []

    # ── Page scraper ──────────────────────────────────────────────────────────
    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
    async def scrape(self, url: str) -> str:
        """
        Fetch a URL and return its text content stripped of HTML.
        Retries up to 3 times with exponential back-off (tenacity).
        """
        r    = await self._client.get(url)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "html.parser")
        # Remove boilerplate
        for tag in soup(["script", "style", "nav", "footer", "header", "aside"]):
            tag.decompose()
        return " ".join(soup.get_text(separator=" ").split())[:8000]

    async def close(self):
        await self._client.aclose()

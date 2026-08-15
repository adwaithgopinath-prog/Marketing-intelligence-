"""
pipeline/ingestion/products.py

Ingest product listing data from e-commerce sources.
Used to track product catalogue, pricing, and availability changes.
"""

import asyncio
from typing import Any, Dict, List

import httpx
from loguru import logger


class AmazonProductIngester:
    """
    Fetches product data via Amazon Product Advertising API or scraping.
    Requires AMAZON_ASSOCIATE_TAG and AWS credentials in .env.
    """

    async def fetch(self, asin_list: List[str], **kwargs) -> List[Dict[str, Any]]:
        """Return product details for a list of Amazon ASINs."""
        # Full implementation would call the PA-API v5 endpoint.
        # Skeleton returns mock data so the pipeline doesn't fail without credentials.
        logger.info("AmazonProductIngester: fetching {} ASINs", len(asin_list))
        return [
            {
                "asin":   asin,
                "title":  f"Product {asin}",
                "price":  None,
                "rating": None,
                "source": "amazon",
            }
            for asin in asin_list
        ]


class GenericProductScraper:
    """
    Scrapes product information from a brand's own website.
    Handles pagination automatically (up to max_pages).
    """

    async def fetch(self, base_url: str, max_pages: int = 5) -> List[Dict[str, Any]]:
        products = []
        async with httpx.AsyncClient(timeout=20, follow_redirects=True) as client:
            for page in range(1, max_pages + 1):
                url = f"{base_url}?page={page}"
                try:
                    r = await client.get(url)
                    if r.status_code == 404:
                        break
                    r.raise_for_status()
                    from bs4 import BeautifulSoup
                    soup  = BeautifulSoup(r.text, "html.parser")
                    cards = soup.select(".product, [data-product], .item-card")
                    if not cards:
                        break
                    for card in cards:
                        name_el  = card.select_one("h2, h3, .product-name, .title")
                        price_el = card.select_one(".price, [data-price]")
                        products.append({
                            "name":   name_el.get_text(strip=True)  if name_el  else None,
                            "price":  price_el.get_text(strip=True) if price_el else None,
                            "url":    url,
                            "source": "web_scrape",
                        })
                    await asyncio.sleep(1)   # polite crawling
                except Exception as exc:
                    logger.error("GenericProductScraper error on {}: {}", url, exc)
                    break
        return products

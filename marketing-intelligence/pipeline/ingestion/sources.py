"""
pipeline/ingestion/sources.py

Registry of all ingestion sources and a unified fetch interface.
Used by run_pipeline.py as the single entry-point for all data collection.
"""

from enum import Enum
from typing import Dict, List, Type

from pipeline.ingestion.advertisements import MetaAdLibraryIngester, TikTokCreativeCenterIngester
from pipeline.ingestion.products import AmazonProductIngester, GenericProductScraper
from pipeline.ingestion.reviews import (
    GoogleReviewIngester,
    ManualFileIngester,
    TrustpilotReviewIngester,
    YelpReviewIngester,
)


class DataSource(str, Enum):
    GOOGLE_REVIEWS     = "google"
    YELP_REVIEWS       = "yelp"
    TRUSTPILOT_REVIEWS = "trustpilot"
    MANUAL_REVIEWS     = "manual"
    AMAZON_PRODUCTS    = "amazon_products"
    WEB_PRODUCTS       = "web_products"
    META_ADS           = "meta_ads"
    TIKTOK_ADS         = "tiktok_ads"


SOURCE_REGISTRY = {
    DataSource.GOOGLE_REVIEWS:     GoogleReviewIngester,
    DataSource.YELP_REVIEWS:       YelpReviewIngester,
    DataSource.TRUSTPILOT_REVIEWS: TrustpilotReviewIngester,
    DataSource.MANUAL_REVIEWS:     ManualFileIngester,
    DataSource.AMAZON_PRODUCTS:    AmazonProductIngester,
    DataSource.WEB_PRODUCTS:       GenericProductScraper,
    DataSource.META_ADS:           MetaAdLibraryIngester,
    DataSource.TIKTOK_ADS:         TikTokCreativeCenterIngester,
}


def get_ingester(source: DataSource):
    """Instantiate and return the correct ingester for a given source."""
    cls = SOURCE_REGISTRY.get(source)
    if not cls:
        raise ValueError(f"Unknown data source: {source}")
    return cls()

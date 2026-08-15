"""
backend/app/services/competitor.py

Competitor intelligence service.
Orchestrates:
  1. Web research to gather public data about a competitor
  2. Market share estimation heuristic (based on review volume)
  3. Persists enriched data to the Competitor model
"""

import uuid
from typing import Any, Dict, List

from loguru import logger
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.models import Competitor, Review
from app.services.research import ResearchService
from sqlalchemy import func, select


class CompetitorService:
    def __init__(self):
        self._research = ResearchService()

    async def enrich(self, competitor: Competitor, db: AsyncSession) -> Dict[str, Any]:
        """
        Pull public data for a competitor and update its metadata field.
        Returns enrichment summary dict.
        """
        logger.info("Enriching competitor: {}", competitor.name)
        query   = f"{competitor.name} brand reviews market share 2024"
        results = await self._research.search(query, num_results=5)

        snippets = [r.get("snippet", "") for r in results if r.get("snippet")]
        competitor.metadata_ = {
            **competitor.metadata_,
            "snippets":    snippets[:3],
            "search_urls": [r.get("url") for r in results[:3]],
        }
        await db.flush()
        return {"competitor_id": str(competitor.id), "snippets_found": len(snippets)}

    async def estimate_share(self, brand_id: uuid.UUID, competitor_ids: List[uuid.UUID], db: AsyncSession) -> Dict[str, float]:
        """
        Naïve market-share proxy: share ∝ review count per entity.
        Real implementation would pull external panel data.
        """
        from app.database.models import Brand
        # Count reviews per brand
        stmt  = select(Review.brand_id, func.count().label("cnt")).group_by(Review.brand_id)
        rows  = (await db.execute(stmt)).all()
        totals = {str(row.brand_id): row.cnt for row in rows}
        grand_total = sum(totals.values()) or 1
        return {bid: round(totals.get(str(bid), 0) / grand_total * 100, 2) for bid in [brand_id] + competitor_ids}

    async def close(self):
        await self._research.close()

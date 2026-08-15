"""
backend/app/services/insights.py

AI-powered insight generation service.
Takes a list of review texts for a brand and calls an LLM to surface:
  - Market gaps
  - Emerging trends
  - Competitive threats

DECISION: We use LangChain as an abstraction layer over OpenAI/Anthropic.
This means swapping LLM providers is a one-line config change (LLM_PROVIDER env var)
without touching any business logic.  The trade-off is a heavier dependency tree;
acceptable because this service is not on the hot path (only triggered by pipeline).
"""

import json
import uuid
from typing import Any, Dict, List

from langchain_core.messages import HumanMessage, SystemMessage
from loguru import logger

from app.core.config import settings


SYSTEM_PROMPT = """
You are a senior marketing intelligence analyst.
You will receive a batch of consumer reviews for a brand.
Your task is to identify 3–5 actionable strategic insights across these categories:
  - market_gap      : unmet needs the brand could fill
  - trend           : emerging customer preferences
  - threat          : competitive or reputational risks

Respond ONLY with a valid JSON array. Each object must have:
  - category   (string: market_gap | trend | threat)
  - title      (string, ≤80 chars)
  - summary    (string, 2–4 sentences)
  - priority   (integer 1–5 where 1 = most critical)
  - evidence   (object: {"quotes": [str, ...], "frequency": int})
""".strip()


class InsightService:
    def __init__(self):
        self._llm = self._build_llm()
        logger.info("InsightService ready | provider={} model={}", settings.LLM_PROVIDER, settings.LLM_MODEL)

    def _build_llm(self):
        if settings.LLM_PROVIDER == "anthropic":
            from langchain_anthropic import ChatAnthropic
            return ChatAnthropic(
                model=settings.LLM_MODEL,
                api_key=settings.ANTHROPIC_API_KEY,
                max_tokens=2048,
            )
        # default: openai
        from langchain_openai import ChatOpenAI
        return ChatOpenAI(
            model=settings.LLM_MODEL,
            api_key=settings.OPENAI_API_KEY,
            temperature=0.3,
            max_tokens=2048,
        )

    async def generate(self, brand_id: uuid.UUID, texts: List[str]) -> List[Dict[str, Any]]:
        """
        Generate insights from review texts.
        Returns a list of dicts ready to be inserted as Insight model rows.
        Falls back to empty list on LLM error so the pipeline doesn't crash.
        """
        if not texts:
            return []

        review_block = "\n---\n".join(texts[:50])
        messages = [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=f"REVIEWS:\n{review_block}"),
        ]

        try:
            response  = await self._llm.ainvoke(messages)
            raw_text  = response.content.strip()
            # Strip markdown fences if present
            if raw_text.startswith("```"):
                raw_text = raw_text.split("\n", 1)[1].rsplit("```", 1)[0]
            insights  = json.loads(raw_text)
            # Attach LLM metadata
            for ins in insights:
                ins["llm_model"] = settings.LLM_MODEL
            return insights
        except Exception as exc:
            logger.error("InsightService.generate failed: {}", exc)
            return []

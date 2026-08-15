# Execution Flow — Marketing Intelligence Platform

> **Purpose**: Documents exactly how execution travels between files, functions, and modules.
> What calls what. In what order. Which path you're looking at right now.
> This file is the map. Keep it updated whenever a new path is added.

---

## System Architecture Overview

```
HTTP Request
     │
     ▼
[FastAPI: main.py]
     │
     ├── Middleware (CORS, GZip, Prometheus)
     │
     ▼
[API Router: api/routes/*.py]
     │
     ├── FastAPI Depends(get_db) → connection.py → AsyncSession
     │
     ▼
[Service Layer: services/*.py]       [Database: models.py via SQLAlchemy]
     │                                        │
     ├── SentimentService                     ├── Project, Brand, Competitor
     ├── InsightService (LLM)                 ├── Review, Insight
     └── ResearchService (HTTP)               └── PipelineRun

CLI (run_pipeline.py)
     │
     ├── ingestion/*.py  → raw JSONL files
     ├── transformations/*.py → cleaned dicts
     └── analytics/*.py  → labelled + enriched dicts
```

---

## Flow 1: Application Startup

**Entry**: `uvicorn app.main:app`
**Path**: `main.py` → `lifespan()` → `connection.py` → `models.py`

```
uvicorn starts
  └── imports app.main
        └── create_app()
              ├── FastAPI(lifespan=lifespan)
              ├── add_middleware(GZipMiddleware)
              ├── add_middleware(CORSMiddleware)           ← settings.CORS_ORIGINS
              ├── Instrumentator().instrument(app)         ← Prometheus
              └── app.include_router(projects.router)      ← /api/v1/projects
              └── app.include_router(brands.router)        ← /api/v1/brands
              └── app.include_router(competitors.router)   ← /api/v1/competitors
              └── app.include_router(reviews.router)       ← /api/v1/reviews
              └── app.include_router(insights.router)      ← /api/v1/insights
              └── app.include_router(pipeline.router)      ← /api/v1/pipeline

lifespan() startup block:
  └── engine.begin()
        └── conn.run_sync(Base.metadata.create_all)
              └── models.py: all Table objects → CREATE TABLE IF NOT EXISTS
```

**Config read order**:
```
.env file on disk
  └── pydantic-settings BaseSettings.__init__()
        └── config.py: Settings()
              └── @lru_cache → get_settings() → settings singleton
                    └── used in main.py (CORS_ORIGINS)
                    └── used in connection.py (DATABASE_URL)
                    └── used in services/*.py (LLM keys, API keys)
```

---

## Flow 2: HTTP Request — Create a Project

**Endpoint**: `POST /api/v1/projects/`
**Entry file**: `backend/app/api/routes/projects.py`

```
HTTP POST /api/v1/projects/ + JSON body
  │
  └── FastAPI routes request to:
        projects.router → create_project(payload, db)
          │
          ├── Pydantic validates body → ProjectCreate schema (schemas/__init__.py)
          │     ├── name: str (min_length=2)
          │     └── description: Optional[str]
          │
          ├── FastAPI calls Depends(get_db)
          │     └── connection.py: get_db()
          │           └── AsyncSessionLocal() → yields AsyncSession
          │
          ├── Project(**payload.model_dump()) → models.py: Project ORM object
          │
          ├── db.add(project)
          ├── await db.flush()           ← writes to DB, not yet committed
          ├── await db.refresh(project)  ← re-reads from DB to get DB defaults (id, timestamps)
          │
          └── return ProjectOut.model_validate(project)
                └── schemas/__init__.py: ProjectOut(OrmBase)
                      └── serialises to JSON → HTTP 201 response

After response:
  └── get_db() generator resumes
        └── await session.commit()  ← final commit
            (or rollback on exception)
```

---

## Flow 3: HTTP Request — Ingest + Analyse a Review

**Endpoint**: `POST /api/v1/reviews/`
**Entry file**: `backend/app/api/routes/reviews.py`

```
HTTP POST /api/v1/reviews/ + JSON body
  │
  └── FastAPI → reviews.router → ingest_review(payload, db)
        │
        ├── Pydantic validates → ReviewCreate (schemas/__init__.py)
        │
        ├── _sentiment.analyze(payload.body)
        │     └── services/sentiment.py: SentimentService.analyze()
        │           ├── [if SENTIMENT_BACKEND=vader]
        │           │     └── _vader_analyze(text)
        │           │           └── vaderSentiment: SentimentIntensityAnalyzer.polarity_scores()
        │           │                 └── returns compound score → map to label
        │           └── [if SENTIMENT_BACKEND=transformer]
        │                 └── _transformer_analyze(text)
        │                       └── HuggingFace pipeline("sentiment-analysis")
        │                             └── returns {"label": "positive", "score": 0.95}
        │
        ├── Review(
        │     **payload.model_dump(),
        │     sentiment=result["label"],
        │     sentiment_score=result["score"]
        │   )  →  models.py: Review ORM object
        │
        ├── db.add(review) → db.flush() → db.refresh(review)
        └── return ReviewOut.model_validate(review) → HTTP 201
```

---

## Flow 4: HTTP Request — Trigger Full Pipeline

**Endpoint**: `POST /api/v1/pipeline/trigger`
**Entry file**: `backend/app/api/routes/pipeline.py`

```
HTTP POST /api/v1/pipeline/trigger + JSON body
  │
  └── FastAPI → pipeline.router → trigger_pipeline(payload, db)
        │
        ├── Pydantic validates → PipelineTriggerRequest
        │
        ├── db.get(Brand, payload.brand_id)  ← 404 if not found
        │
        ├── Creates PipelineRun(status=RUNNING, started_at=now)
        │     └── models.py: PipelineRun → db.add() → db.flush()
        │
        ├── STEP 1: Query unprocessed reviews
        │     └── select(Review).where(brand_id=..., is_processed=False)
        │           └── models.py: Review table
        │
        ├── STEP 2 (if run_sentiment=True):
        │     └── for each review:
        │           └── _sentiment.analyze(review.body)
        │                 └── services/sentiment.py: SentimentService  ← same as Flow 3
        │                       └── review.sentiment = result["label"]
        │                       └── review.is_processed = True
        │
        ├── STEP 3 (if run_insights=True):
        │     └── _insights.generate(brand_id, texts=[r.body for r in unprocessed])
        │           └── services/insights.py: InsightService.generate()
        │                 ├── _build_llm()
        │                 │     ├── [LLM_PROVIDER=openai]  → langchain_openai.ChatOpenAI
        │                 │     └── [LLM_PROVIDER=anthropic] → langchain_anthropic.ChatAnthropic
        │                 │
        │                 ├── messages = [SystemMessage(SYSTEM_PROMPT), HumanMessage(review_block)]
        │                 │
        │                 ├── await self._llm.ainvoke(messages)
        │                 │     └── HTTP POST → OpenAI / Anthropic API
        │                 │           └── returns JSON array of insight objects
        │                 │
        │                 └── json.loads(response.content)
        │                       └── returns List[Dict] ready for DB insert
        │
        ├── for ins_data in new_insights:
        │     └── Insight(**ins_data, brand_id=...) → db.add()
        │
        ├── run.status = COMPLETED, run.records_in = N, run.records_out = M
        ├── db.flush()
        └── return PipelineRunOut.model_validate(run) → HTTP 202
```

---

## Flow 5: CLI Pipeline Execution

**Entry**: `python pipeline/run_pipeline.py --brand-id <uuid> --brand-name Nike --sources google yelp --insights`

```
run_pipeline.py: __main__
  │
  └── parse_args() → args
        └── asyncio.run(run(brand_id, brand_name, sources, run_insights))
              │
              ├── STEP 1: ingest_all(brand_name, brand_id, sources)
              │     └── ingestion/reviews.py: ingest_all()
              │           └── asyncio.gather(
              │                 GoogleReviewIngester.fetch(brand_name),
              │                 YelpReviewIngester.fetch(brand_name),
              │               )
              │                 ├── GoogleReviewIngester.fetch()
              │                 │     ├── [if api_key] → httpx.AsyncClient.get(Google Places API)
              │                 │     └── [if no key]  → _mock_reviews() → static list
              │                 │
              │                 └── YelpReviewIngester.fetch()
              │                       └── similar pattern
              │
              │           └── INGESTERS[src].save_raw(brand_id, records)
              │                 └── writes data/raw/<brand_id>/<source>/<timestamp>.jsonl
              │
              ├── STEP 2: clean_reviews(raw_reviews)
              │     └── transformations/clean_reviews.py: clean_reviews()
              │           ├── _strip_html(body)
              │           ├── _normalise_whitespace(body)
              │           ├── _detect_language(body)  → langdetect.detect()
              │           └── _fingerprint(record)    → md5 hash → dedup set
              │
              ├── STEP 3: [DB store placeholder — needs session in full impl]
              │
              ├── STEP 4: run_sentiment_batch(texts)
              │     └── analytics/sentiment.py: run_sentiment_batch()
              │           └── for each text:
              │                 └── services/sentiment.py: SentimentService.analyze()
              │                       └── [VADER / Transformer — same as Flow 3]
              │
              ├── STEP 5: extract_topics(texts) + tag_reviews_with_topics()
              │     └── analytics/topics.py: extract_topics()
              │           ├── [TOPIC_BACKEND=keybert] → _keybert_topics()  → KeyBERT model
              │           ├── [TOPIC_BACKEND=spacy]   → _spacy_topics()
              │           │     └── spacy.load("en_core_web_sm")
              │           │           └── nlp.pipe(texts) → doc.noun_chunks → Counter
              │           └── [fallback]              → _fallback_topics() → word freq Counter
              │
              ├── STEP 6: identify_market_gaps(cleaned)
              │     └── analytics/market_gaps.py: identify_market_gaps()
              │           └── filter sentiment in (negative, neutral)
              │                 └── regex word extraction → Counter → top_n gaps
              │
              └── STEP 7 (if --insights): InsightService.generate()
                    └── services/insights.py  ← same as Flow 4, STEP 3
```

---

## Flow 6: Competitor Enrichment

**Triggered by**: Manual call (no dedicated route yet — add to competitors.router in next iteration)
**Entry**: `services/competitor.py: CompetitorService.enrich()`

```
CompetitorService.enrich(competitor, db)
  │
  ├── ResearchService.search(f"{competitor.name} brand reviews market share 2024")
  │     └── services/research.py: ResearchService.search()
  │           ├── [if SERPAPI_KEY set]
  │           │     └── httpx.AsyncClient.get("https://serpapi.com/search", params)
  │           │           └── r.json()["organic_results"] → list of {title, snippet, url}
  │           └── [if no key] → returns []
  │
  ├── competitor.metadata_ = {snippets: [...], search_urls: [...]}
  └── await db.flush()

CompetitorService.estimate_share(brand_id, competitor_ids, db)
  └── select(Review.brand_id, func.count()).group_by(Review.brand_id)
        └── models.py: Review table
              └── totals dict → share % per brand_id
```

---

## Flow 7: Database Session Lifecycle (per request)

```
HTTP request arrives
  │
  └── FastAPI calls Depends(get_db)
        └── connection.py: get_db()  (async generator)
              └── async with AsyncSessionLocal() as session:
                    └── yield session  ← route handler runs here
                          │
                          ├── db.add(obj)        ← stages in memory
                          ├── await db.flush()   ← sends SQL, no commit
                          └── await db.refresh() ← re-reads server defaults

HTTP response sent
  │
  └── get_db() generator resumes after yield
        ├── [success] await session.commit()   ← atomic commit
        └── [exception] await session.rollback() + re-raise
```

---

## Flow 8: Configuration Loading (one-time at startup)

```
Any module imports: from app.core.config import settings
  │
  └── config.py: module-level  settings = get_settings()
        └── @lru_cache: get_settings()
              └── Settings()  ← pydantic-settings BaseSettings
                    ├── reads .env file
                    ├── validates all field types
                    ├── field_validator("CORS_ORIGINS") splits comma-separated string
                    └── returns frozen Settings instance

All subsequent imports of `settings` return the same cached object.
No disk I/O after first call.
```

---

## Module Dependency Graph

```
main.py
  ├── core/config.py          (settings)
  ├── database/connection.py  (engine, Base, get_db)
  │     └── core/config.py
  ├── database/models.py      (ORM classes)
  │     └── database/connection.py (Base)
  ├── schemas/__init__.py     (Pydantic schemas)
  └── api/routes/*.py
        ├── database/connection.py (get_db)
        ├── database/models.py     (ORM classes)
        ├── schemas/__init__.py    (request/response models)
        └── services/*.py

services/sentiment.py
  └── core/config.py (SENTIMENT_BACKEND env var)

services/insights.py
  ├── core/config.py (LLM_PROVIDER, OPENAI_API_KEY, LLM_MODEL)
  └── langchain_openai / langchain_anthropic

services/research.py
  ├── core/config.py (SERPAPI_KEY)
  └── httpx, beautifulsoup4, tenacity

services/competitor.py
  ├── services/research.py
  └── database/models.py

pipeline/run_pipeline.py
  ├── pipeline/ingestion/reviews.py
  ├── pipeline/transformations/clean_reviews.py
  ├── pipeline/analytics/sentiment.py
  │     └── backend/app/services/sentiment.py  (shared)
  ├── pipeline/analytics/topics.py
  ├── pipeline/analytics/market_gaps.py
  └── backend/app/services/insights.py         (shared)

pipeline/ingestion/reviews.py
  └── pipeline/ingestion/sources.py (registry)

pipeline/ingestion/sources.py
  ├── pipeline/ingestion/reviews.py
  ├── pipeline/ingestion/products.py
  └── pipeline/ingestion/advertisements.py
```

---

## Key Design Rules to Keep This Map Accurate

1. **Services never import routers** — data flows routes → services, never the reverse.
2. **Pipeline never imports from routes** — it imports shared services directly.
3. **`get_db` is the only DB entry point** — no raw engine calls in routes.
4. **`settings` singleton is the only config entry point** — no `os.getenv()` in business logic.
5. **Ingesters are stateless** — `fetch()` returns data, callers decide where it goes.

---

*Last updated: 2026-08-11 by AI (initial build)*

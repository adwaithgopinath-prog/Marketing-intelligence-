# Decision Log — Marketing Intelligence Platform

> **Purpose**: Every meaningful architectural, library, or pattern decision made while building this codebase is recorded here with full reasoning.
> **Format**: Each entry has a decision title, the context (why the question arose), the options considered, the chosen approach, and the trade-offs accepted.
> **Files currently modified**: All files created in the initial build — see index below.

---

## Index of Files Modified in This Session

| File | Role |
|---|---|
| `backend/app/main.py` | FastAPI app factory + middleware + lifespan |
| `backend/app/core/config.py` | Centralised settings |
| `backend/app/database/connection.py` | Async DB engine + session |
| `backend/app/database/models.py` | All ORM models |
| `backend/app/schemas/__init__.py` | All Pydantic schemas |
| `backend/app/api/routes/*.py` | Per-domain HTTP routers |
| `backend/app/services/sentiment.py` | Sentiment analysis |
| `backend/app/services/insights.py` | LLM insight generation |
| `backend/app/services/research.py` | Web research / scraping |
| `backend/app/services/competitor.py` | Competitor enrichment |
| `pipeline/ingestion/reviews.py` | Multi-source review scraping |
| `pipeline/ingestion/products.py` | Product data ingestion |
| `pipeline/ingestion/advertisements.py` | Ad library ingestion |
| `pipeline/ingestion/sources.py` | Source registry |
| `pipeline/transformations/clean_reviews.py` | Review normalisation |
| `pipeline/transformations/clean_products.py` | Product normalisation |
| `pipeline/transformations/normalize_brands.py` | Brand alias merging |
| `pipeline/analytics/sentiment.py` | Batch sentiment |
| `pipeline/analytics/topics.py` | Topic extraction |
| `pipeline/analytics/competitors.py` | Competitor analytics |
| `pipeline/analytics/market_gaps.py` | Market gap detection |
| `pipeline/run_pipeline.py` | CLI pipeline orchestrator |
| `database/schema.sql` | PostgreSQL DDL |
| `docker-compose.yml` | Full container stack |
| `backend/requirements.txt` | Python dependencies |

---

## Decision 001 — FastAPI over Django REST Framework

**Context**: Choosing the web framework for the backend API.

**Options considered**:
| Option | Pros | Cons |
|---|---|---|
| **FastAPI** | Native async, auto-generated OpenAPI docs, Pydantic v2 integration, ASGI | Smaller ecosystem than Django, no built-in admin |
| Django REST Framework | Mature, ORM, admin UI, large ecosystem | Synchronous by default (ASGI is bolted on), heavier boilerplate |
| Flask + extensions | Minimal, flexible | No async story, OpenAPI requires plugins |

**Decision**: **FastAPI**

**Reasoning**: This platform is I/O-bound — it scrapes external APIs, calls LLMs, and queries PostgreSQL concurrently. Async-native from day one is critical for throughput. FastAPI's automatic Swagger UI at `/docs` and ReDoc at `/redoc` are production-grade without extra work. Pydantic v2 is already the validation layer of choice, and FastAPI integrates it natively. The "no admin" trade-off is acceptable because we're building a custom React frontend.

---

## Decision 002 — PostgreSQL + SQLAlchemy 2 (async) over MongoDB or SQLite

**Context**: Choosing a persistence layer.

**Options considered**:
| Option | Pros | Cons |
|---|---|---|
| **PostgreSQL + SQLAlchemy async** | ACID, JSONB for flexible metadata, full-text search via pg_trgm, battle-tested | Requires a running Postgres instance |
| MongoDB | Flexible schema, easy to start | Weaker joins, no native full-text ranking |
| SQLite | Zero setup | No async driver, not production-grade |

**Decision**: **PostgreSQL + SQLAlchemy 2 (async)**

**Reasoning**: Reviews need full-text search (we use `gin_trgm_ops` index on the `body` column). Insights and metadata are semi-structured — JSONB gives us schema flexibility without abandoning relational joins. SQLAlchemy 2's `async_sessionmaker` + `AsyncSession` integrates cleanly with FastAPI's `Depends()` pattern. The `pool_pre_ping=True` option automatically drops stale connections which matters for long-lived services.

**Trade-off accepted**: Requires Docker or a local Postgres installation. Mitigated by the included `docker-compose.yml`.

---

## Decision 003 — Pydantic v2 `model_config = ConfigDict(from_attributes=True)` for ORM schemas

**Context**: Bridging SQLAlchemy ORM objects to JSON API responses without manual mapping.

**Options considered**:
- Pydantic v1 `orm_mode = True` (deprecated in v2)
- Manual `to_dict()` methods on models
- dataclasses

**Decision**: **Pydantic v2 `ConfigDict(from_attributes=True)`** via the `OrmBase` mixin in `schemas/__init__.py`

**Reasoning**: This is the v2-idiomatic approach. Every `*Out` schema inherits `OrmBase`, which means `.model_validate(orm_instance)` works out-of-the-box without any mapping code. All schemas live in one file (`schemas/__init__.py`) during early development — easy to split by domain later.

---

## Decision 004 — Two-tier Sentiment: VADER default, HuggingFace transformer optional

**File**: `backend/app/services/sentiment.py`

**Context**: Choosing the sentiment analysis approach.

**Options considered**:
| Option | Accuracy | Latency | Requires GPU | Cold-start |
|---|---|---|---|---|
| **VADER** (rule-based) | ~75% on reviews | <1ms | No | None |
| `cardiffnlp/twitter-roberta-base-sentiment-latest` | ~90% | ~50ms CPU | Optional | ~400 MB download |
| OpenAI API (`gpt-4o-mini` with prompt) | ~95% | 200–800ms | No | API key |

**Decision**: **VADER by default, transformer selectable via `SENTIMENT_BACKEND=transformer` env var**

**Reasoning**: VADER runs instantly with no model download, which is critical for development and CI. Accuracy is good enough for initial labelling. The `SentimentService` class hides the backend behind a uniform `.analyze(text)` interface, so switching to the transformer in production is a single env var change — no call-site changes. We deliberately did NOT default to the OpenAI API for sentiment because (a) cost at scale could be significant, (b) network latency adds up in bulk processing, and (c) VADER is deterministic (good for test reproducibility).

---

## Decision 005 — LangChain as LLM abstraction layer for insight generation

**File**: `backend/app/services/insights.py`

**Context**: How to call OpenAI and/or Anthropic without tight coupling.

**Options considered**:
- Call `openai` SDK directly
- Call `anthropic` SDK directly
- Use LangChain as abstraction

**Decision**: **LangChain** (`langchain`, `langchain-openai`, `langchain-anthropic`)

**Reasoning**: Provider switching is a one-line env var change (`LLM_PROVIDER=anthropic`). LangChain's `ChatOpenAI` and `ChatAnthropic` both implement the same `ainvoke()` interface. The trade-off is a heavier dependency tree (~50+ packages). This is acceptable because `InsightService` is only instantiated once (at pipeline trigger time) and is not on the hot path.

**Alternative rejected**: Rolling our own thin wrapper would duplicate the same logic LangChain already handles (rate limiting, token counting, streaming, retries). Given this is a business-logic project — not a framework — LangChain is the right call.

---

## Decision 006 — Celery + Redis for async task queue (not a pure async approach)

**File**: `docker-compose.yml`, `backend/requirements.txt`

**Context**: How to offload long-running pipeline jobs from the HTTP request/response cycle.

**Options considered**:
- **FastAPI `BackgroundTasks`**: Runs in the same process, blocks if the server restarts, no persistence.
- **Celery + Redis**: Dedicated worker processes, task persistence, retries, Flower UI for monitoring.
- **Dramatiq**: Lighter than Celery, same Redis backend.
- **RQ (Redis Queue)**: Even simpler, but less feature-rich.

**Decision**: **Celery + Redis**

**Reasoning**: Celery is the industry standard for Python task queues. Flower gives us a real-time dashboard for monitoring pipeline runs without building one ourselves. Redis as the broker is already required for caching, so no extra infrastructure is added. The current implementation runs the pipeline synchronously inside the request (acceptable for dev), with the Celery call being a one-line `.delay()` swap for production — the architecture is already wired for it.

---

## Decision 007 — Adapter pattern for ingestion sources

**File**: `pipeline/ingestion/reviews.py`, `pipeline/ingestion/sources.py`

**Context**: Multiple review sources (Google, Yelp, Trustpilot, manual) with different APIs.

**Options considered**:
- One giant `if source == "google": ... elif source == "yelp": ...` function
- A class per source inheriting from `BaseIngester`, registered in a dict

**Decision**: **Adapter pattern** — `BaseIngester` ABC + per-source concrete classes + `INGESTERS` registry dict

**Reasoning**: Adding a new source (e.g., Reddit) is a self-contained change — create a new class, add it to the registry, done. No existing code changes. The `ingest_all()` function runs all ingesters in parallel via `asyncio.gather()`, so adding more sources doesn't slow anything down. The `save_raw()` method on the base class ensures every ingester persists raw data to `data/raw/` in the same JSONL format — consistent audit trail regardless of source.

---

## Decision 008 — spaCy noun-chunks as default topic extractor, KeyBERT optional

**File**: `pipeline/analytics/topics.py`

**Context**: Extracting recurring topics from review text.

**Options considered**:
| Option | Quality | Setup cost | Deterministic |
|---|---|---|---|
| Word frequency (fallback) | Low | None | Yes |
| **spaCy noun-chunks** | Medium-High | `python -m spacy download en_core_web_sm` (~12 MB) | Yes |
| KeyBERT | High | ~400 MB sentence-transformer model | No |
| LDA (topic modelling) | Medium | sklearn only | Depends on seed |

**Decision**: **spaCy default** with graceful fallback to word-frequency if the model isn't installed, and KeyBERT opt-in via `TOPIC_BACKEND=keybert` env var.

**Reasoning**: spaCy's noun-chunk extraction (`en_core_web_sm`) produces linguistically meaningful phrases rather than just high-frequency words. The model is small (12 MB) and fast on CPU. KeyBERT is opt-in because it requires a 400 MB transformer model which is inappropriate for development environments. The three-level fallback (KeyBERT -> spaCy -> word-frequency) ensures the pipeline never crashes due to a missing NLP model.

---

## Decision 009 — rapidfuzz for brand name normalisation (not fuzzywuzzy)

**File**: `pipeline/transformations/normalize_brands.py`

**Context**: Merging brand name variants like "Nike", "NIKE", "nike inc".

**Options considered**:
- `fuzzywuzzy` (older, uses `python-Levenshtein` C extension)
- **`rapidfuzz`** (drop-in replacement, 10-100x faster, pure Python fallback, actively maintained)
- Custom Levenshtein implementation

**Decision**: **rapidfuzz**

**Reasoning**: `rapidfuzz` is the direct successor to `fuzzywuzzy` — same API, dramatically faster, no deprecated dependencies. The `token_sort_ratio` scorer is ideal for brand names because it normalises word order ("nike inc" vs "inc nike" would score 100%). Graceful degradation to case-normalisation only if `rapidfuzz` isn't installed — the pipeline never hard-crashes.

---

## Decision 010 — UUID primary keys over auto-increment integers

**File**: `backend/app/database/models.py`, `database/schema.sql`

**Context**: Choosing primary key strategy for all tables.

**Options considered**:
- Auto-increment `BIGINT` (SERIAL)
- **UUID v4**
- ULID (sortable UUIDs)

**Decision**: **UUID v4** via `uuid_generate_v4()` in PostgreSQL and `uuid.uuid4()` in Python

**Reasoning**: UUIDs are safe to generate in the application layer without a round-trip to the DB. They won't collide when merging data from multiple sources (critical for ingestion). They don't leak record counts to clients. The slight index bloat vs integer PKs is acceptable at this scale. ULID was considered for its sortability but adds a non-standard dependency — the `reviewed_at` timestamp column already handles time-ordering of reviews.

---

## Decision 011 — Pydantic-settings for configuration (not raw os.environ)

**File**: `backend/app/core/config.py`

**Context**: Managing application configuration across environments.

**Options considered**:
- `os.getenv()` scattered across files
- `python-decouple`
- **`pydantic-settings` (BaseSettings)**

**Decision**: **`pydantic-settings`** with a `@lru_cache()` singleton `get_settings()`

**Reasoning**: `BaseSettings` validates types at startup (e.g., `API_PORT: int` will fail loudly if set to `"abc"`). All configuration is documented in one file — new developers can see every env var in one place. The `@lru_cache()` wrapper ensures settings are read from disk exactly once. The `field_validator("CORS_ORIGINS")` shows how to handle comma-separated list env vars cleanly — a common real-world need.

---

## Decision 012 — JSONB for metadata and topics columns over separate tables

**File**: `backend/app/database/models.py`

**Context**: Storing flexible metadata (e.g., scraper snippets, evidence quotes) and topic arrays.

**Options considered**:
- Separate `review_topics` join table
- Array column (`TEXT[]`)
- **JSONB column**

**Decision**: **JSONB** for both `metadata_` (models) and `topics` (reviews)

**Reasoning**: PostgreSQL JSONB is indexed, queryable, and schema-flexible. For `topics` which is a simple list of strings, an array column would also work, but JSONB is more forward-compatible if we later want to store `{"topic": "price", "confidence": 0.95}` objects instead of bare strings. For `metadata_`, JSONB is the only sensible choice given we store source-specific fields (Trustpilot scrape URLs, Amazon ASINs, etc.) that vary per ingester.

---

## Decision 013 — lifespan context manager over `@app.on_event` (deprecated)

**File**: `backend/app/main.py`

**Context**: Running startup/shutdown logic in FastAPI.

**Options considered**:
- `@app.on_event("startup")` / `@app.on_event("shutdown")` — deprecated since FastAPI 0.93
- **`@asynccontextmanager` lifespan function** — current standard

**Decision**: **`@asynccontextmanager` lifespan**

**Reasoning**: The `on_event` decorators are deprecated and will be removed. The lifespan pattern clearly shows what runs before yield (startup) and after yield (shutdown) in a single function, making the execution flow obvious. It also works correctly with pytest's `TestClient` context manager.

---

## Decision 014 — tenacity for HTTP retry logic (not manual try/except loops)

**File**: `backend/app/services/research.py`

**Context**: Scrapers and API calls fail transiently due to rate limits and network issues.

**Options considered**:
- Manual `for attempt in range(3): try ... except ... sleep`
- **`tenacity` decorators**

**Decision**: **`tenacity`** with `@retry(stop=stop_after_attempt(3), wait=wait_exponential(...))`

**Reasoning**: tenacity handles exponential back-off, jitter, specific exception types, and logging without boilerplate. The decorator form keeps the scraping logic clean and readable. The retry logic is configurable per function by changing the decorator arguments — no changes to function internals required.

---

## Decision 015 — Paginated `Page` response envelope for all list endpoints

**File**: `backend/app/schemas/__init__.py`, all route files

**Context**: API consumers need to know total counts for pagination UI.

**Options considered**:
- Return plain `List[SomeOut]`
- Return `{"items": [...], "total": N, "page": N, "size": N}` (custom envelope)
- Link headers (HTTP standard)

**Decision**: **Custom `Page` envelope** with `total`, `page`, `size`, `items`

**Reasoning**: Frontend pagination components universally need `total` to calculate page count. Link headers are harder to consume from JavaScript. The `Page` schema is generic (`items: List[Any]`) and reused across all domains — no duplication. The consistent shape means the frontend can use a single `usePagination()` hook for every table.

---

*Last updated: 2026-08-11 by AI (initial build)*

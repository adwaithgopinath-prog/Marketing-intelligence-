<<<<<<< HEAD
# Marketing-
=======
# Marketing Intelligence Platform

> AI-powered platform to ingest consumer reviews, track competitors, and surface actionable marketing insights.

## Quick Start

```bash
# 1. Clone and configure
cp .env .env.local   # then fill in your API keys

# 2. Start infrastructure
docker-compose up -d db redis

# 3. Install backend dependencies
cd backend
pip install -r requirements.txt

# 4. Run migrations (or let lifespan auto-create tables in dev)
psql -U mi_user -d marketing_intel -f ../database/schema.sql

# 5. Start the API server
uvicorn app.main:app --reload --port 8000

# 6. Open docs
open http://localhost:8000/docs
```

## Run the Full Stack

```bash
docker-compose up --build
```

Services:
| Service | URL |
|---|---|
| API (FastAPI) | http://localhost:8000 |
| Swagger UI | http://localhost:8000/docs |
| Flower (Celery) | http://localhost:5555 |
| Frontend | http://localhost:3000 |
| Prometheus | http://localhost:8000/metrics |

## Run the Pipeline (CLI)

```bash
python pipeline/run_pipeline.py \
  --brand-id "your-uuid" \
  --brand-name "Nike" \
  --sources google yelp \
  --insights
```

## Project Structure

```
marketing-intelligence/
├── backend/app/
│   ├── main.py              ← FastAPI app factory
│   ├── core/config.py       ← All settings (pydantic-settings)
│   ├── database/
│   │   ├── connection.py    ← Async engine + get_db dependency
│   │   └── models.py        ← All ORM models
│   ├── schemas/__init__.py  ← All Pydantic schemas
│   ├── api/routes/          ← One file per domain
│   └── services/            ← Business logic (sentiment, insights, research)
│
├── pipeline/
│   ├── ingestion/           ← Source adapters (Google, Yelp, Trustpilot…)
│   ├── transformations/     ← Data cleaning and normalisation
│   ├── analytics/           ← Sentiment, topics, gaps, competitor analysis
│   └── run_pipeline.py      ← CLI orchestrator
│
├── database/schema.sql      ← PostgreSQL DDL
├── docker-compose.yml
├── decision.md              ← WHY every library/pattern was chosen
└── flow.md                  ← HOW execution travels between files
```

## Key Decisions

See [`decision.md`](./decision.md) for full reasoning. TL;DR:
- **FastAPI** — async-native, auto-OpenAPI docs
- **PostgreSQL + SQLAlchemy 2** — JSONB, full-text search, ACID
- **VADER** sentiment (default) → **HuggingFace** (opt-in via env var)
- **LangChain** for LLM provider abstraction (OpenAI / Anthropic)
- **Celery + Redis** for background task queue
- **Adapter pattern** for pluggable ingestion sources

## Environment Variables

See [`.env`](.env) for the full list. Required for production:
- `DATABASE_URL` — PostgreSQL async URL
- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` — for insight generation
- `SERPAPI_KEY` — for web research
- `APP_SECRET_KEY` — JWT signing key

## Tests

```bash
cd backend
pytest tests/ -v
```

## Contributing

1. Add a new ingestion source → create a class in `pipeline/ingestion/reviews.py`, add to `sources.py` registry
2. Add a new route → create `backend/app/api/routes/yourroute.py`, mount in `main.py`
3. Log every architectural decision in `decision.md`
4. Update `flow.md` if any new call chain is added
>>>>>>> 275088c (Initial commit: Complete Marketing Intelligence platform with FastAPI backend and React frontend)

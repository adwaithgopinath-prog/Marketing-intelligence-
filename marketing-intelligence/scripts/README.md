# Marketing Intelligence — Scripts

Utility scripts for setup and operations.

## setup_db.sh
```bash
#!/usr/bin/env bash
set -e
psql -U mi_user -d marketing_intel -f ../database/schema.sql
echo "Schema applied."
```

## seed_data.py
Run to populate the database with sample data for development:
```bash
python scripts/seed_data.py
```

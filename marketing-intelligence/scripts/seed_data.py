"""
scripts/seed_data.py

Populates the database with sample data for local development.
Run: python scripts/seed_data.py
"""

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from app.database.connection import AsyncSessionLocal
from app.database.models import Brand, Competitor, Project, Review


async def seed():
    async with AsyncSessionLocal() as db:
        # Create a project
        project = Project(name="Demo Project", description="Sample data for development")
        db.add(project)
        await db.flush()

        # Create a brand
        brand = Brand(
            project_id=project.id,
            name="AcmeCorp",
            domain="acmecorp.com",
            category="Consumer Electronics",
        )
        db.add(brand)
        await db.flush()

        # Add competitors
        for comp_name, comp_domain in [("RivalCo", "rivalco.com"), ("MegaBrand", "megabrand.io")]:
            db.add(Competitor(brand_id=brand.id, name=comp_name, domain=comp_domain))

        # Add sample reviews
        sample_reviews = [
            ("google", "5", "Love this product! Quality is amazing.", 5.0),
            ("google", "6", "Fast delivery and great packaging.", 4.0),
            ("yelp",   "7", "Customer service was rude and unhelpful.", 1.0),
            ("yelp",   "8", "Price is too high for what you get.", 2.0),
            ("manual", "9", "Solid product but the app crashes sometimes.", 3.0),
        ]

        for source, ext_id, body, rating in sample_reviews:
            db.add(Review(
                brand_id=brand.id,
                source=source,
                external_id=ext_id,
                body=body,
                rating=rating,
            ))

        await db.commit()
        print(f"✅  Seeded: project={project.id}, brand={brand.id}")


if __name__ == "__main__":
    asyncio.run(seed())

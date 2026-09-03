import json
from pathlib import Path

from sqlalchemy.orm import Session

from app.models.ngo import NGO

NGOS_JSON_PATH = Path(__file__).resolve().parent.parent / "data" / "ngos.json"


def seed_ngos(db: Session) -> None:
    with open(NGOS_JSON_PATH, encoding="utf-8") as f:
        ngo_records = json.load(f)

    # The NGO catalog is demo data meant to stay in sync with ngos.json, so
    # every startup replaces the table contents with the current file
    # instead of only seeding an empty table.
    db.query(NGO).delete()

    for data in ngo_records:
        db.add(NGO(**data))

    db.commit()

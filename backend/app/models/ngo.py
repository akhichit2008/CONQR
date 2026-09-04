from sqlalchemy import JSON, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class NGO(Base):
    __tablename__ = "ngos"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String)
    expertise: Mapped[list[str]] = mapped_column(JSON, default=list)
    regions: Mapped[list[str]] = mapped_column(JSON, default=list)
    beneficiaries: Mapped[list[str]] = mapped_column(JSON, default=list)
    capabilities: Mapped[list[str]] = mapped_column(JSON, default=list)
    past_projects: Mapped[list[str]] = mapped_column(JSON, default=list)
    email: Mapped[str] = mapped_column(String, default="")
    phone: Mapped[str] = mapped_column(String, default="")
    address: Mapped[str] = mapped_column(String, default="")
    founded_year: Mapped[int] = mapped_column(Integer, default=0)
    # Per-claim evidence backing this profile, keyed by claim category
    # ("identity", "expertise", "geography", "beneficiaries", "impact").
    # Each source is {"type", "org", "date", value?} - see
    # app.services.evidence for how this is scored. Demo data only, not
    # scraped from real sources.
    evidence: Mapped[dict] = mapped_column(JSON, default=dict)

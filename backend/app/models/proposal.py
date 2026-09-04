from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, JSON, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Proposal(Base):
    __tablename__ = "proposals"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)

    ngo_name: Mapped[str] = mapped_column(String)
    ngo_expertise: Mapped[list[str]] = mapped_column(JSON)
    ngo_regions: Mapped[list[str]] = mapped_column(JSON)
    ngo_beneficiaries: Mapped[list[str]] = mapped_column(JSON)

    fund_allocated: Mapped[str] = mapped_column(String)
    focus_area: Mapped[str] = mapped_column(String)
    timeline: Mapped[str] = mapped_column(String)
    expected_outcomes: Mapped[str] = mapped_column(String)

    status: Mapped[str] = mapped_column(String, default="active")
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

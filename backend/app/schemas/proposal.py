from datetime import datetime

from pydantic import BaseModel


class CreateProposalRequest(BaseModel):
    ngo_name: str
    ngo_expertise: list[str]
    ngo_regions: list[str]
    ngo_beneficiaries: list[str]
    fund_allocated: str
    focus_area: str
    timeline: str
    expected_outcomes: str


class ProposalResponse(BaseModel):
    id: int
    ngo_name: str
    ngo_expertise: list[str]
    ngo_regions: list[str]
    ngo_beneficiaries: list[str]
    fund_allocated: str
    focus_area: str
    timeline: str
    expected_outcomes: str
    status: str
    created_at: datetime

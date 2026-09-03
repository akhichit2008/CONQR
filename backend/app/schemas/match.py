from pydantic import BaseModel


class MatchRequest(BaseModel):
    focus_area: str
    location: str
    budget: str
    timeline: str
    expected_outcomes: str


class ComparisonField(BaseModel):
    label: str
    matched: bool


class NGOMatch(BaseModel):
    name: str
    match_score: float
    expertise: list[str]
    regions: list[str]
    beneficiaries: list[str]
    capabilities: list[str]
    past_projects: list[str]
    email: str
    phone: str
    address: str
    comparison: list[ComparisonField]


class MatchResponse(BaseModel):
    matches: list[NGOMatch]


class SuggestionsRequest(BaseModel):
    requirement: MatchRequest
    ngo_name: str
    ngo_expertise: list[str]
    ngo_regions: list[str]
    ngo_beneficiaries: list[str]
    ngo_capabilities: list[str]
    ngo_past_projects: list[str]


class SuggestionsResponse(BaseModel):
    suggestions: list[str]

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.ngo import NGO
from app.schemas.match import (
    ComparisonField,
    MatchRequest,
    MatchResponse,
    NGOMatch,
    SuggestionsRequest,
    SuggestionsResponse,
)
from app.services.matching.filter import filter_by_criteria, matches
from app.services.matching.matchmaking import get_top_matches
from app.services.matching.preprocessing import preprocess_requirement
from app.services.suggestions import generate_ngo_suggestions

router = APIRouter(prefix="/match", tags=["match"])

# Progressively looser filter tiers, tried in order until one keeps at least
# one NGO. A requirement's expertise/geography/beneficiary extraction only
# recognizes a narrow keyword vocabulary, so requiring all three to match at
# once often empties the pool even when a real signal (e.g. the location)
# was extracted. Falling straight to the full unfiltered catalog in that
# case would silently drop geography/expertise relevance entirely, so each
# tier below drops one criterion at a time instead of all of them - whatever
# signal WAS extracted keeps being enforced for as long as possible.
FILTER_TIERS = [
    ("expertise", "geography", "beneficiaries"),
    ("geography", "expertise"),
    ("geography",),
    ("expertise",),
]


def select_candidate_pool(ngos: list[dict], requirement: dict) -> list[dict]:
    for criteria in FILTER_TIERS:
        pool = filter_by_criteria(ngos, requirement, criteria)
        if pool:
            return pool

    return ngos


def build_comparison(requirement: dict, ngo: dict) -> list[ComparisonField]:
    return [
        ComparisonField(
            label="Expertise",
            matched=matches(requirement.get("expertise"), ngo.get("expertise")),
        ),
        ComparisonField(
            label="Geography",
            matched=matches(requirement.get("geography"), ngo.get("regions")),
        ),
        ComparisonField(
            label="Beneficiaries",
            matched=matches(requirement.get("beneficiaries"), ngo.get("beneficiaries")),
        ),
    ]


@router.post("", response_model=MatchResponse)
def match_ngos(body: MatchRequest, db: Session = Depends(get_db)) -> MatchResponse:
    combined_text = (
        f"{body.focus_area}. {body.location}. {body.expected_outcomes}. "
        f"Budget {body.budget}. Timeline {body.timeline}."
    )
    requirement = preprocess_requirement(combined_text)

    ngos = [
        {
            "name": row.name,
            "expertise": row.expertise,
            "regions": row.regions,
            "beneficiaries": row.beneficiaries,
            "capabilities": row.capabilities,
            "past_projects": row.past_projects,
            "email": row.email,
            "phone": row.phone,
            "address": row.address,
        }
        for row in db.query(NGO).all()
    ]

    pool = select_candidate_pool(ngos, requirement)

    top_matches = get_top_matches(requirement, pool, top_k=5)

    return MatchResponse(
        matches=[
            NGOMatch(
                name=match["name"],
                match_score=match["match_score"],
                expertise=match["expertise"],
                regions=match["regions"],
                beneficiaries=match["beneficiaries"],
                capabilities=match["capabilities"],
                past_projects=match["past_projects"],
                email=match["email"],
                phone=match["phone"],
                address=match["address"],
                comparison=build_comparison(requirement, match),
            )
            for match in top_matches
        ]
    )


@router.post("/suggestions", response_model=SuggestionsResponse)
def get_ngo_suggestions(body: SuggestionsRequest) -> SuggestionsResponse:
    requirement = body.requirement.model_dump()
    ngo = {
        "name": body.ngo_name,
        "expertise": body.ngo_expertise,
        "regions": body.ngo_regions,
        "beneficiaries": body.ngo_beneficiaries,
        "capabilities": body.ngo_capabilities,
        "past_projects": body.ngo_past_projects,
    }

    try:
        suggestions = generate_ngo_suggestions(requirement, ngo)
    except Exception as error:
        raise HTTPException(status_code=502, detail="Could not generate suggestions.") from error

    return SuggestionsResponse(suggestions=suggestions)

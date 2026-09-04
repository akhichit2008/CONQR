"""
CONQR Evidence DNA scoring.

This does NOT verify an NGO. It scores how well-evidenced each of an NGO's
claims is, given the sources attached to that claim in its profile data -
who published the source, how independent it is from the NGO's other
sources, how old it is, and whether it agrees with the NGO's other sources.
The result (Evidence Confidence) is reported separately from CONQR's fit
score: a high fit score with low evidence confidence means "potentially
excellent match, but worth double-checking" rather than "bad match".

The whole pipeline is deterministic arithmetic, no ML, so it can be
explained claim-by-claim: source reliability -> freshness decay ->
independence dedup -> corroboration -> contradiction penalty.
"""

import math
from datetime import date

from app.services.evidence.config import (
    CATEGORY_WEIGHTS,
    CLAIM_LABELS,
    CONTRADICTION_PENALTY,
    DECAY_LAMBDA,
    SOURCE_RELIABILITY,
    confidence_label,
)


def _age_years(source_date: str, today: date) -> float:
    try:
        year, month, day = (int(part) for part in source_date.split("-"))
        published = date(year, month, day)
    except (ValueError, AttributeError):
        return 50.0

    return max((today - published).days / 365.25, 0.0)


def source_strength(source: dict, today: date) -> float:
    reliability = SOURCE_RELIABILITY.get(source.get("type", ""), 0.0)
    age = _age_years(source.get("date", ""), today)
    return reliability * math.exp(-DECAY_LAMBDA * age)


def _independence_key(source: dict) -> str:
    # Sources published by the same organization (the NGO's own site and its
    # own annual report both count as "the NGO talking about itself") are
    # treated as one data point, not two independent confirmations.
    return (source.get("org") or source.get("type") or "").strip().lower()


def _dedupe_by_independence(sources: list[dict], today: date) -> list[float]:
    strongest_per_org: dict[str, float] = {}

    for source in sources:
        key = _independence_key(source)
        strength = source_strength(source, today)
        if key not in strongest_per_org or strength > strongest_per_org[key]:
            strongest_per_org[key] = strength

    return list(strongest_per_org.values())


def _combine_independent(strengths: list[float]) -> float:
    # Noisy-OR: each independent source is a separate chance of confirming
    # the claim, so the combined confidence is 1 minus the chance that every
    # single one of them was wrong. More independent sources -> higher
    # confidence, with diminishing returns - never a plain sum or average.
    if not strengths:
        return 0.0

    product_of_misses = 1.0
    for strength in strengths:
        product_of_misses *= (1 - strength)

    return 1 - product_of_misses


def _detect_contradiction(category: str, sources: list[dict], ngo: dict) -> str | None:
    if category == "geography":
        canonical = {region.lower() for region in ngo.get("regions", [])}
        asserted = {
            source["region"].lower()
            for source in sources
            if source.get("region")
        }
        conflicting = asserted - canonical
        if conflicting:
            return "Geographic information conflict detected"

    if category == "identity":
        canonical_year = ngo.get("founded_year")
        asserted_years = {
            source["founded_year"]
            for source in sources
            if source.get("founded_year")
        }
        if canonical_year:
            asserted_years.add(canonical_year)
        if len(asserted_years) > 1:
            return "Founding year could not be consistently corroborated"

    if category == "impact":
        asserted_figures = {
            source["impact_figure"]
            for source in sources
            if source.get("impact_figure")
        }
        if len(asserted_figures) > 1:
            return "Impact figures could not be consistently corroborated"

    return None


def score_claim(category: str, sources: list[dict], ngo: dict, today: date) -> dict:
    independent_strengths = _dedupe_by_independence(sources, today)
    combined = _combine_independent(independent_strengths)

    warning = _detect_contradiction(category, sources, ngo)
    if warning:
        combined *= CONTRADICTION_PENALTY

    confidence = round(combined * 100, 1)

    return {
        "category": category,
        "label": CLAIM_LABELS.get(category, category.title()),
        "confidence": confidence,
        "source_count": len(sources),
        "independent_source_count": len(independent_strengths),
        "warning": warning,
    }


def score_ngo_evidence(ngo: dict, today: date | None = None) -> dict:
    today = today or date.today()
    evidence = ngo.get("evidence") or {}

    claims = [
        score_claim(category, evidence.get(category, []), ngo, today)
        for category in CATEGORY_WEIGHTS
    ]

    total_weight = sum(CATEGORY_WEIGHTS[claim["category"]] for claim in claims)
    weighted_sum = sum(
        claim["confidence"] * CATEGORY_WEIGHTS[claim["category"]] for claim in claims
    )
    overall = round(weighted_sum / total_weight, 1) if total_weight else 0.0

    warnings = [claim["warning"] for claim in claims if claim["warning"]]

    return {
        "confidence": overall,
        "label": confidence_label(overall),
        "claims": claims,
        "warnings": warnings,
    }

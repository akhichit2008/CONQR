"""
Multi-Dimensional Scoring Engine

Computes an OVERALL SCORE from weighted sub-scores:

    Cause Match       35%
    Geography         15%
    Beneficiary       15%
    Budget            10%
    Impact            15%
    Evidence          10%
    ----------------------
    Total            100%

Each individual dimension score is expected on a 0-100 scale.
The overall score is a weighted sum, also on a 0-100 scale.
"""

from dataclasses import dataclass, field
from typing import Dict


WEIGHTS: Dict[str, float] = {
    "cause_match": 0.35,
    "geography": 0.15,
    "beneficiary": 0.15,
    "budget": 0.10,
    "impact": 0.15,
    "evidence": 0.10,
}


def _validate_weights(weights: Dict[str, float]) -> None:
    total = sum(weights.values())
    if not (0.999 <= total <= 1.001):
        raise ValueError(f"Weights must sum to 1.0, got {total:.4f}")


_validate_weights(WEIGHTS)


@dataclass
class DimensionScores:
    """Raw scores for each dimension, expected in range [0, 100]."""
    cause_match: float
    geography: float
    beneficiary: float
    budget: float
    impact: float
    evidence: float

    def as_dict(self) -> Dict[str, float]:
        return {
            "cause_match": self.cause_match,
            "geography": self.geography,
            "beneficiary": self.beneficiary,
            "budget": self.budget,
            "impact": self.impact,
            "evidence": self.evidence,
        }


@dataclass
class ScoreBreakdown:
    """Full breakdown of how the overall score was computed."""
    raw_scores: Dict[str, float]
    weighted_scores: Dict[str, float] = field(default_factory=dict)
    overall_score: float = 0.0

    def pretty_print(self) -> str:
        lines = ["MULTI-DIMENSIONAL SCORING", "-" * 40]
        for dim, weight in WEIGHTS.items():
            raw = self.raw_scores[dim]
            weighted = self.weighted_scores[dim]
            label = dim.replace("_", " ").title()
            lines.append(
                f"{label:<15} raw={raw:6.2f}  weight={weight*100:4.1f}%  "
                f"contrib={weighted:6.2f}"
            )
        lines.append("-" * 40)
        lines.append(f"{'OVERALL SCORE':<15} {self.overall_score:6.2f}")
        return "\n".join(lines)


def clamp(value: float, low: float = 0.0, high: float = 100.0) -> float:
    """Keep a score within the valid [low, high] range."""
    return max(low, min(high, value))


def compute_overall_score(
    scores: DimensionScores,
    weights: Dict[str, float] = None,
) -> ScoreBreakdown:
    """
    Compute the weighted overall score from individual dimension scores.

    Args:
        scores: DimensionScores object with raw 0-100 values per dimension.
        weights: Optional custom weights dict (defaults to WEIGHTS).

    Returns:
        ScoreBreakdown with raw scores, weighted contributions, and the
        final overall score (0-100).
    """
    weights = weights or WEIGHTS
    _validate_weights(weights)

    raw = scores.as_dict()
    weighted = {}
    overall = 0.0

    for dim, weight in weights.items():
        if dim not in raw:
            raise KeyError(f"Missing score for required dimension: {dim}")
        clamped = clamp(raw[dim])
        contribution = clamped * weight
        weighted[dim] = round(contribution, 4)
        overall += contribution

    return ScoreBreakdown(
        raw_scores=raw,
        weighted_scores=weighted,
        overall_score=round(overall, 2),
    )


def score_from_dict(data: Dict[str, float]) -> ScoreBreakdown:
    """
    Compute overall score from a plain dict, e.g.:

        {
            "cause_match": 90,
            "geography": 70,
            "beneficiary": 85,
            "budget": 60,
            "impact": 75,
            "evidence": 50,
        }
    """
    scores = DimensionScores(
        cause_match=data.get("cause_match", 0),
        geography=data.get("geography", 0),
        beneficiary=data.get("beneficiary", 0),
        budget=data.get("budget", 0),
        impact=data.get("impact", 0),
        evidence=data.get("evidence", 0),
    )
    return compute_overall_score(scores)


def rank_candidates(
    candidates: Dict[str, Dict[str, float]],
) -> list:
    """
    Score and rank multiple candidates.

    Args:
        candidates: dict mapping candidate name/id -> dimension score dict.

    Returns:
        List of (candidate_name, ScoreBreakdown) tuples sorted by
        overall_score descending.
    """
    results = []
    for name, data in candidates.items():
        breakdown = score_from_dict(data)
        results.append((name, breakdown))

    results.sort(key=lambda pair: pair[1].overall_score, reverse=True)
    return results

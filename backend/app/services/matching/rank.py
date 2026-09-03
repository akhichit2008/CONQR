from typing import Dict, List, Any

from app.services.matching.multi_scoring import score_from_dict


def rank_ngos(
    candidates: Dict[str, Dict[str, float]],
    top_k: int = 10
) -> List[Dict[str, Any]]:
    ranked = []

    for name, scores in candidates.items():
        breakdown = score_from_dict(scores)

        ranked.append({
            "rank": 0,
            "name": name,
            "overall_score": breakdown.overall_score,
            "raw_scores": breakdown.raw_scores,
            "weighted_scores": breakdown.weighted_scores
        })

    ranked.sort(
        key=lambda x: x["overall_score"],
        reverse=True
    )

    ranked = ranked[:top_k]

    for i, candidate in enumerate(ranked, start=1):
        candidate["rank"] = i

    return ranked

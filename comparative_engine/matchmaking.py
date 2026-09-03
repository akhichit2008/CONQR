import math

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

EXPERTISE_WEIGHT = 3
GEOGRAPHY_WEIGHT = 3
BENEFICIARY_WEIGHT = 2

# Raw TF-IDF cosine similarity between two short documents is small in
# absolute terms even for a strong match, so it reads as a misleadingly low
# percentage. This maps it through an exponential kernel so a genuinely
# strong overlap lands in a legible 70-90% range while still preserving the
# relative ranking (it's a monotonic function of the raw cosine score).
KERNEL_STEEPNESS = 8.0


def ngo_to_text(ngo):
    fields = [
        ngo.get("name", ""),
        *ngo.get("expertise", []) * EXPERTISE_WEIGHT,
        *ngo.get("regions", []) * GEOGRAPHY_WEIGHT,
        *ngo.get("beneficiaries", []) * BENEFICIARY_WEIGHT,
        *ngo.get("capabilities", []),
        *ngo.get("past_projects", [])
    ]
    return " ".join(map(str, fields))


def requirement_to_text(requirement):
    fields = [
        *requirement.get("expertise", []) * EXPERTISE_WEIGHT,
        *requirement.get("geography", []) * GEOGRAPHY_WEIGHT,
        *requirement.get("beneficiaries", []) * BENEFICIARY_WEIGHT,
        *requirement.get("terms", [])
    ]
    return " ".join(map(str, fields))


def apply_kernel(raw_similarity):
    return (1 - math.exp(-KERNEL_STEEPNESS * raw_similarity)) * 100


def calculate_matches(requirement, ngos):
    if not ngos:
        return []

    query = requirement_to_text(requirement)
    documents = [ngo_to_text(ngo) for ngo in ngos]

    vectorizer = TfidfVectorizer(
        ngram_range=(1, 2),
        sublinear_tf=True
    )

    vectors = vectorizer.fit_transform([query] + documents)
    scores = cosine_similarity(vectors[0:1], vectors[1:]).flatten()

    results = []

    for ngo, score in zip(ngos, scores):
        results.append({
            **ngo,
            "match_score": round(apply_kernel(float(score)), 2)
        })

    return sorted(
        results,
        key=lambda x: x["match_score"],
        reverse=True
    )


def get_top_matches(requirement, ngos, top_k=5):
    return calculate_matches(requirement, ngos)[:top_k]

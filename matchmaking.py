from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def ngo_to_text(ngo):
    fields = [
        ngo.get("name", ""),
        *ngo.get("expertise", []),
        *ngo.get("regions", []),
        *ngo.get("beneficiaries", []),
        *ngo.get("capabilities", []),
        *ngo.get("past_projects", [])
    ]
    return " ".join(map(str, fields))


def requirement_to_text(requirement):
    fields = [
        *requirement.get("expertise", []),
        *requirement.get("geography", []),
        *requirement.get("beneficiaries", []),
        *requirement.get("terms", [])
    ]
    return " ".join(map(str, fields))


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
            "match_score": round(float(score) * 100, 2)
        })

    return sorted(
        results,
        key=lambda x: x["match_score"],
        reverse=True
    )


def get_top_matches(requirement, ngos, top_k=5):
    return calculate_matches(requirement, ngos)[:top_k]
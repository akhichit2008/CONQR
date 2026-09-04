from rank import rank_ngos

candidates = {
    "Rural Digital Foundation": {
        "cause_match": 95,
        "geography": 100,
        "beneficiary": 95,
        "budget": 80,
        "impact": 90,
        "evidence": 85
    },

    "Women Empowerment Network": {
        "cause_match": 80,
        "geography": 100,
        "beneficiary": 100,
        "budget": 75,
        "impact": 85,
        "evidence": 80
    },

    "Health First Foundation": {
        "cause_match": 50,
        "geography": 60,
        "beneficiary": 70,
        "budget": 90,
        "impact": 80,
        "evidence": 90
    }
}

results = rank_ngos(candidates, top_k=3)

for ngo in results:
    print(
        f"{ngo['rank']}. "
        f"{ngo['name']} - "
        f"{ngo['overall_score']}%"
    )
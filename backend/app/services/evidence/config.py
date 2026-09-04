# CONQR's evidence policy - not a legal or regulatory standard, just our own
# configurable view of which kinds of sources tend to be more trustworthy.
# Centralized here so the policy can be tuned without touching the scoring
# logic in scoring.py.

SOURCE_RELIABILITY = {
    "government_registry": 1.00,
    "audited_filing": 0.95,
    "annual_report": 0.90,
    "official_website": 0.80,
    "partner_report": 0.75,
    "third_party_database": 0.70,
    "news_article": 0.55,
    "self_reported": 0.45,
}

# How fast evidence strength decays with age. strength = reliability *
# e^(-DECAY_LAMBDA * age_years), so at DECAY_LAMBDA=0.15 a 5-year-old source
# retains ~47% of its original reliability and a 10-year-old source ~22%.
DECAY_LAMBDA = 0.15

# How much a detected contradiction multiplies a claim's confidence by.
CONTRADICTION_PENALTY = 0.6

# Claim categories and how much each contributes to the overall NGO Evidence
# Confidence score. Kept separate from CONQR's fit-score weighting entirely -
# this measures how well-evidenced the profile is, not how good a match it
# is for a given requirement.
CATEGORY_WEIGHTS = {
    "identity": 0.15,
    "expertise": 0.25,
    "geography": 0.20,
    "beneficiaries": 0.15,
    "impact": 0.25,
}

CLAIM_LABELS = {
    "identity": "Identity",
    "expertise": "Expertise",
    "geography": "Geography",
    "beneficiaries": "Beneficiaries",
    "impact": "Impact",
}

# Thresholds (as a 0-100 score) for the plain-language summary shown next to
# the number. These are CONQR's own reading of the score, not a
# verification status - deliberately avoids the word "verified".
CONFIDENCE_LABELS = [
    (80, "Evidence-backed"),
    (55, "Additional due diligence recommended"),
    (0, "Limited evidence"),
]


def confidence_label(score: float) -> str:
    for threshold, label in CONFIDENCE_LABELS:
        if score >= threshold:
            return label
    return CONFIDENCE_LABELS[-1][1]

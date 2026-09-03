import re

from app.services.matching.utils import PATTERNS, STOPWORDS, SYNONYMS


def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^\w\s₹]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def normalize_keywords(text):
    text = clean_text(text)

    for canonical, synonyms in SYNONYMS.items():
        for synonym in synonyms:
            text = re.sub(
                rf"\b{re.escape(synonym)}\b",
                canonical,
                text
            )

    return text


def extract_terms(text):
    text = normalize_keywords(text)
    words = text.split()

    terms = []
    for word in words:
        if word not in STOPWORDS and len(word) > 2:
            terms.append(word)

    return list(dict.fromkeys(terms))


def extract_budget(text):
    text = text.lower()
    for pattern in PATTERNS:
        match = re.search(pattern, text)

        if match:
            value = float(match.group(1))
            unit = match.group(2)

            if unit in ["crore", "cr"]:
                return int(value * 10_000_000)

            if unit in ["lakh", "lakhs", "l"]:
                return int(value * 100_000)

    return None


def extract_duration(text):
    text = text.lower()

    match = re.search(
        r"(\d+)\s*(month|months|year|years)",
        text
    )

    if not match:
        return None

    value = int(match.group(1))
    unit = match.group(2)

    return value * 12 if "year" in unit else value


def extract_categories(normalized_text):
    categories = {
        "expertise": [],
        "geography": [],
        "beneficiaries": []
    }

    expertise = {
        "education", "healthcare", "livelihood",
        "digital literacy", "agriculture", "environment",
        "sanitation"
    }

    geography = {
        "tamil nadu", "karnataka", "kerala",
        "maharashtra", "andhra pradesh", "telangana",
        "delhi", "rajasthan", "gujarat",
        "kenya", "uganda", "tanzania", "east africa"
    }

    beneficiaries = {
        "women", "children", "youth", "rural"
    }

    # Match each canonical phrase against the full normalized text rather
    # than against individually split words - a naive word-by-word check
    # would never recognize multi-word phrases like "tamil nadu" or
    # "digital literacy", since splitting on whitespace breaks them into
    # tokens ("tamil", "nadu") that don't match the phrase on their own.
    for category_name, vocabulary in (
        ("expertise", expertise),
        ("geography", geography),
        ("beneficiaries", beneficiaries),
    ):
        for phrase in vocabulary:
            if re.search(rf"\b{re.escape(phrase)}\b", normalized_text):
                categories[category_name].append(phrase)

    return categories


def preprocess_requirement(text):
    normalized = normalize_keywords(text)
    terms = extract_terms(normalized)
    categories = extract_categories(normalized)

    return {
        "raw_text": text,
        "normalized_text": normalized,
        "terms": terms,
        "expertise": categories["expertise"],
        "geography": categories["geography"],
        "beneficiaries": categories["beneficiaries"],
        "budget": extract_budget(text),
        "duration_months": extract_duration(text)
    }

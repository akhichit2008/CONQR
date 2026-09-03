SYNONYMS = {
    "ngo": ["non profit", "nonprofit", "charity", "voluntary organization"],
    "education": ["schooling", "learning", "academic", "literacy"],
    "healthcare": ["health", "medical", "medicine", "wellness"],
    "women": ["female", "women empowerment", "gender equality"],
    "children": ["kids", "child", "youth"],
    "rural": ["village", "villages", "rural community"],
    "livelihood": ["employment", "income generation", "skill development"],
    "digital literacy": ["digital education", "computer literacy", "technology training"],
    "agriculture": ["farming", "farmer", "agri"],
    "environment": ["sustainability", "ecology", "conservation"],
    "sanitation": ["hygiene", "clean water", "waste management"],
    "tamil nadu": ["tn"],
    "karnataka": ["ka"],
    "kerala": ["kl"],
    "maharashtra": ["mh"],
    "andhra pradesh": ["ap"],
    "telangana": ["ts"]
}

STOPWORDS = {
    "the", "a", "an", "and", "or", "for", "to", "of", "in", "on",
    "with", "we", "want", "need", "our", "this", "that", "is", "are",
    "be", "implement", "project", "program", "initiative"
}

PATTERNS = [ r"₹\s?(\d+(?:\.\d+)?)\s*(crore|cr|lakh|lakhs|l)",
             r"(\d+(?:\.\d+)?)\s*(crore|cr|lakh|lakhs|l)"]
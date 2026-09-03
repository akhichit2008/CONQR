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
    "tamil nadu": [
        "tn", "chennai", "coimbatore", "madurai", "tiruchirapalli", "trichy",
        "salem", "tirunelveli", "erode", "vellore", "thanjavur", "tuticorin"
    ],
    "karnataka": [
        "ka", "bangalore", "bengaluru", "mysore", "mysuru", "mangalore",
        "hubli", "belgaum", "gulbarga", "davangere"
    ],
    "kerala": [
        "kl", "kochi", "cochin", "thiruvananthapuram", "trivandrum",
        "kozhikode", "calicut", "wayanad", "kottayam", "thrissur",
        "kollam", "alappuzha", "palakkad", "idukki", "kannur"
    ],
    "maharashtra": [
        "mh", "mumbai", "pune", "nagpur", "nashik", "aurangabad",
        "thane", "solapur", "kolhapur", "ahmednagar"
    ],
    "andhra pradesh": [
        "ap", "visakhapatnam", "vizag", "vijayawada", "guntur",
        "tirupati", "nellore", "kurnool", "kadapa"
    ],
    "telangana": [
        "ts", "hyderabad", "warangal", "nizamabad", "karimnagar", "khammam"
    ],
    "delhi": ["new delhi", "ncr", "delhi ncr"],
    "rajasthan": ["jaipur", "udaipur", "jodhpur", "tilonia", "ajmer"],
    "gujarat": ["ahmedabad", "surat", "vadodara", "rajkot", "gandhinagar"],
    "kenya": ["nairobi", "mombasa", "kisumu"],
    "uganda": ["kampala", "entebbe"],
    "tanzania": ["dar es salaam", "arusha", "dodoma", "zanzibar"],
    "east africa": ["eastern africa"]
}

STOPWORDS = {
    "the", "a", "an", "and", "or", "for", "to", "of", "in", "on",
    "with", "we", "want", "need", "our", "this", "that", "is", "are",
    "be", "implement", "project", "program", "initiative"
}

PATTERNS = [ r"₹\s?(\d+(?:\.\d+)?)\s*(crore|cr|lakh|lakhs|l)",
             r"(\d+(?:\.\d+)?)\s*(crore|cr|lakh|lakhs|l)"]
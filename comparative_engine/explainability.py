import os
import json

from dotenv import load_dotenv
from google import genai


# =========================================================
# GEMINI SETUP
# =========================================================

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


# =========================================================
# EXPLAINABILITY UTILITY FUNCTION
# =========================================================

def generate_explanation(project, recommended_ngo, other_ngos):

    prompt = f"""
You are an explainability engine for a CSR NGO
recommendation system.

The recommendation has already been made by
our machine learning system.

Your job is ONLY to explain WHY the selected NGO
was recommended.

DO NOT change the recommendation.

================================
CSR PROJECT
================================

{json.dumps(project, indent=2)}


================================
RECOMMENDED NGO
================================

{json.dumps(recommended_ngo, indent=2)}


================================
OTHER NGOs
================================

{json.dumps(other_ngos, indent=2)}


================================
1. WHY THIS NGO?
================================

Explain the selected NGO based on:

- Cause alignment
- Geographic presence
- Beneficiary match
- Budget fit
- Impact evidence


================================
2. WHY NOT OTHER NGO?
================================

For each alternative NGO, explain why it
was less suitable.

Possible reasons:

- Weak geography
- Missing evidence
- Budget mismatch
- Weak cause alignment
- Weak beneficiary match


================================
3. GAPS & RISKS
================================

Identify:

- Missing information
- Unverified claims
- Budget uncertainty
- Geographic uncertainty
- Beneficiary uncertainty
- Any other important risk


================================
IMPORTANT RULES
================================

- DO NOT invent facts.
- Use ONLY the information provided.
- If information is missing, say "Insufficient evidence".
- Clearly mention uncertainty.
- Do not claim an NGO is trustworthy without evidence.

Return ONLY valid JSON.

Use EXACTLY this structure:

{{
    "why_this_ngo": {{
        "cause_alignment": "",
        "geographic_presence": "",
        "beneficiary_match": "",
        "budget_fit": "",
        "impact_evidence": ""
    }},

    "why_not_other_ngo": [
        {{
            "ngo": "",
            "reason": ""
        }}
    ],

    "gaps_and_risks": [
        ""
    ]
}}
"""

    # Send request to Gemini
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text.strip()

    # Remove markdown code fences if Gemini adds them
    if text.startswith("```json"):
        text = text[7:]

    elif text.startswith("```"):
        text = text[3:]

    if text.endswith("```"):
        text = text[:-3]

    text = text.strip()

    # Convert Gemini's response into Python dictionary
    try:
        explanation = json.loads(text)

    except json.JSONDecodeError:
        explanation = {
            "error": "Gemini returned invalid JSON",
            "raw_response": text
        }

    return explanation
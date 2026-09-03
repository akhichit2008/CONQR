import json

from google.genai import types

from app.services.gemini import get_gemini_client

MODEL = "gemini-3.5-flash-lite"

PROMPT_TEMPLATE = """You are advising a corporate CSR team that is considering partnering with a specific NGO for a campaign.

Corporate campaign:
- Focus area: {focus_area}
- Location: {location}
- Budget: {budget}
- Timeline: {timeline}
- Expected outcomes: {expected_outcomes}

NGO under consideration: {ngo_name}
- Expertise: {expertise}
- Regions: {regions}
- Beneficiaries: {beneficiaries}
- Capabilities: {capabilities}
- Past projects: {past_projects}

Give 3 short, concrete suggestions for the corporate team about this specific
pairing. Each suggestion should be one sentence, actionable, and specific to
this campaign and this NGO (what to verify, how to structure the partnership,
what to ask about, or a gap worth checking). Do not restate the NGO's profile.

Respond with a JSON array of 3 strings, nothing else."""


def generate_ngo_suggestions(requirement: dict, ngo: dict) -> list[str]:
    prompt = PROMPT_TEMPLATE.format(
        focus_area=requirement["focus_area"],
        location=requirement["location"],
        budget=requirement["budget"],
        timeline=requirement["timeline"],
        expected_outcomes=requirement["expected_outcomes"],
        ngo_name=ngo["name"],
        expertise=", ".join(ngo["expertise"]),
        regions=", ".join(ngo["regions"]),
        beneficiaries=", ".join(ngo["beneficiaries"]),
        capabilities=", ".join(ngo["capabilities"]),
        past_projects=", ".join(ngo["past_projects"]),
    )

    client = get_gemini_client()
    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=list[str],
            temperature=0.4,
        ),
    )

    return json.loads(response.text)

from preprocessing import preprocess_requirement
from matchmaking import get_top_matches

ngos = [
    {
        "name": "Rural Digital Foundation",
        "expertise": ["digital literacy", "education"],
        "regions": ["tamil nadu"],
        "beneficiaries": ["women", "rural communities"],
        "capabilities": ["digital training", "community outreach"],
        "past_projects": ["digital literacy for rural women"]
    },
    {
        "name": "Health First Foundation",
        "expertise": ["healthcare", "sanitation"],
        "regions": ["kerala"],
        "beneficiaries": ["children", "rural communities"],
        "capabilities": ["medical camps"],
        "past_projects": ["rural healthcare program"]
    },
    {
        "name": "Urban Education Trust",
        "expertise": ["education", "schooling"],
        "regions": ["mumbai"],
        "beneficiaries": ["children"],
        "capabilities": ["school education"],
        "past_projects": ["urban education program"]
    },
    {
        "name": "Women Empowerment Network",
        "expertise": ["women empowerment", "livelihood"],
        "regions": ["tamil nadu"],
        "beneficiaries": ["women", "rural communities"],
        "capabilities": ["skill development", "employment"],
        "past_projects": ["women livelihood program"]
    }
]

query = """
We need an NGO for a rural digital literacy program
for women in Tamil Nadu with a budget of ₹50 lakh
for 12 months.
"""

requirement = preprocess_requirement(query)

print("\nREQUIREMENT:")
print(requirement)

print("\nMATCHES:")

results = get_top_matches(requirement, ngos)

for i, ngo in enumerate(results, 1):
    print(f"{i}. {ngo['name']} - {ngo['match_score']}%")
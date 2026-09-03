from preprocessing import preprocess_requirement

requirement = preprocess_requirement(
    "We need an NGO for a rural digital literacy program "
    "for women in Tamil Nadu with a budget of ₹50 lakh for 12 months."
)

print(requirement)
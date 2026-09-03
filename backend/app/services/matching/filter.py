def normalize(value):
    if isinstance(value, list):
        return {str(v).lower().strip() for v in value}
    if value is None:
        return set()
    return {str(value).lower().strip()}


def matches(required, available):
    required = normalize(required)
    available = normalize(available)

    if not required:
        return True

    return bool(required & available)


CRITERIA_FIELDS = {
    "expertise": ("expertise", "expertise"),
    "geography": ("geography", "regions"),
    "beneficiaries": ("beneficiaries", "beneficiaries"),
}


def is_eligible_on(ngo, requirement, criteria):
    for criterion in criteria:
        requirement_key, ngo_key = CRITERIA_FIELDS[criterion]
        if not matches(requirement.get(requirement_key), ngo.get(ngo_key)):
            return False

    return True


def is_eligible(ngo, requirement):
    return is_eligible_on(ngo, requirement, CRITERIA_FIELDS.keys())


def filter_eligible_ngos(ngos, requirement):
    return [
        ngo for ngo in ngos
        if is_eligible(ngo, requirement)
    ]


def filter_by_criteria(ngos, requirement, criteria):
    return [
        ngo for ngo in ngos
        if is_eligible_on(ngo, requirement, criteria)
    ]

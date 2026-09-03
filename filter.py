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


def is_eligible(ngo, requirement):
    if not matches(
        requirement.get("expertise"),
        ngo.get("expertise")
    ):
        return False

    if not matches(
        requirement.get("geography"),
        ngo.get("regions")
    ):
        return False

    if not matches(
        requirement.get("beneficiaries"),
        ngo.get("beneficiaries")
    ):
        return False

    return True


def filter_eligible_ngos(ngos, requirement):
    return [
        ngo for ngo in ngos
        if is_eligible(ngo, requirement)
    ]
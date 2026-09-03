"""
Legal, permission-gated NGO website scraper.

Every fetch is preceded by a robots.txt check for the target site. If the
site's robots.txt disallows our user agent (or disallows everyone) for that
path, we do not fetch the page at all - scrape_ngo_profile returns a result
that says so instead. This is a hard gate, not a warning: there is no way to
call this module and have it fetch a page robots.txt disallows.

Extracted category tags (expertise/geography/beneficiaries) reuse the exact
same phrase-matching vocabulary the query side uses in
app.services.matching.preprocessing, so a scraped NGO is tagged consistently
with how a corporate requirement gets tagged.
"""

import time
import urllib.robotparser
from dataclasses import dataclass, field
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

from app.services.matching.preprocessing import extract_categories, normalize_keywords

USER_AGENT = "ConqrNGOBot/1.0 (NGO directory research)"
REQUEST_TIMEOUT_SECONDS = 10
MAX_PAGE_TEXT_CHARS = 5000


@dataclass
class ScrapeResult:
    url: str
    allowed: bool
    reason: str
    name: str | None = None
    expertise: list[str] = field(default_factory=list)
    regions: list[str] = field(default_factory=list)
    beneficiaries: list[str] = field(default_factory=list)


def is_scraping_allowed(url: str) -> tuple[bool, str]:
    parsed = urlparse(url)
    robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"

    parser = urllib.robotparser.RobotFileParser()
    parser.set_url(robots_url)

    try:
        parser.read()
    except Exception as error:
        # No readable robots.txt is treated as "not confirmed allowed", not
        # as an automatic yes - we only scrape sites that explicitly permit
        # it, so an unreachable robots.txt is a refusal, not a free pass.
        return False, f"could not read {robots_url}: {error}"

    if parser.can_fetch(USER_AGENT, url):
        return True, "permitted by robots.txt"

    return False, f"disallowed by {robots_url} for user-agent '{USER_AGENT}'"


def _extract_page_text(html: str) -> tuple[str, str]:
    soup = BeautifulSoup(html, "html.parser")

    title = soup.title.get_text(strip=True) if soup.title else ""

    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    body_text = soup.get_text(separator=" ", strip=True)
    return title, body_text[:MAX_PAGE_TEXT_CHARS]


def scrape_ngo_profile(url: str) -> ScrapeResult:
    allowed, reason = is_scraping_allowed(url)
    if not allowed:
        return ScrapeResult(url=url, allowed=False, reason=reason)

    try:
        response = requests.get(
            url,
            headers={"User-Agent": USER_AGENT},
            timeout=REQUEST_TIMEOUT_SECONDS,
        )
        response.raise_for_status()
    except requests.RequestException as error:
        return ScrapeResult(url=url, allowed=True, reason=f"fetch failed: {error}")

    title, body_text = _extract_page_text(response.text)
    normalized = normalize_keywords(f"{title} {body_text}")
    categories = extract_categories(normalized)

    return ScrapeResult(
        url=url,
        allowed=True,
        reason="scraped successfully",
        name=title or None,
        expertise=categories["expertise"],
        regions=categories["geography"],
        beneficiaries=categories["beneficiaries"],
    )


def scrape_many(urls: list[str], delay_seconds: float = 2.0) -> list[ScrapeResult]:
    """Scrape a batch of NGO URLs, pausing between requests so we don't
    hammer any site - a courtesy delay on top of the per-site robots.txt
    gate, independent of whether a site's robots.txt sets its own
    crawl-delay."""
    results = []

    for index, url in enumerate(urls):
        if index > 0:
            time.sleep(delay_seconds)
        results.append(scrape_ngo_profile(url))

    return results

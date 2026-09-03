"""
Scrape a list of NGO websites and print what was found, for a human to
review before adding anything to app/data/ngos.json by hand.

This deliberately does not write to ngos.json automatically. Auto-tagging a
real website's text is much noisier than tagging a short, focused user
query - things like nav menus, footers, and unrelated blog links can
produce false-positive category matches (a global charity's page can pick
up a stray "tamil nadu" hit from an unrelated mention somewhere on the
page). A person should look at each result before it becomes part of the
live matching pool.

Usage:
    .venv/Scripts/python.exe scripts/scrape_ngos.py https://example-ngo.org https://another-ngo.org
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.services.scraping.ngo_scraper import scrape_many  # noqa: E402


def main(urls: list[str]) -> None:
    if not urls:
        print("Usage: scrape_ngos.py <url> [<url> ...]")
        return

    results = scrape_many(urls)

    for result in results:
        print(f"\n{result.url}")
        if not result.allowed:
            print(f"  SKIPPED - {result.reason}")
            continue

        print(f"  name:          {result.name}")
        print(f"  expertise:     {result.expertise}")
        print(f"  regions:       {result.regions}")
        print(f"  beneficiaries: {result.beneficiaries}")
        print("  (review before adding to app/data/ngos.json - auto-tagging real")
        print("   website text is noisier than tagging a short user query)")


if __name__ == "__main__":
    main(sys.argv[1:])

#!/usr/bin/env python3
"""
Regenerate or update location enrichment data in lib/locations-enrichment.ts
using the Anthropic API.

Usage:
  python scripts/enrich-locations.py --slug mountain-view
  python scripts/enrich-locations.py --all
  python scripts/enrich-locations.py --all --dry-run
"""

import argparse
import json
import os
import re
import sys
import textwrap

import anthropic

ENRICHMENT_FILE = os.path.join(
    os.path.dirname(__file__), "..", "lib", "locations-enrichment.ts"
)

ALL_SLUGS = [
    "san-jose",
    "mountain-view",
    "palo-alto",
    "san-francisco",
    "oakland",
    "sunnyvale",
    "campbell",
    "los-gatos",
    "redwood-city",
    "fremont",
    "san-mateo",
    "walnut-creek",
    "marin",
    "los-altos",
    "atherton",
    "menlo-park",
    "cupertino",
    "santa-clara",
    "saratoga",
    "los-altos-hills",
    "burlingame",
    "hillsborough",
    "milpitas",
    "east-palo-alto",
]

SYSTEM_PROMPT = textwrap.dedent("""\
    You are a factual research assistant helping populate location enrichment data
    for a senior in-home meal prep service in the San Francisco Bay Area called
    Well Prepped Life (wellpreppedlife.com), run by Justine Sanidad.

    For each city you are given, return ONLY a JSON object with these four keys:
      "hospitals": list of real, named hospitals near that city
      "seniorCenters": list of real, named senior centers or senior-serving
                       organizations in or directly adjacent to that city
      "landmarks": list of 3-5 well-known local landmarks that anchor the city
                   geographically for a Bay Area reader
      "localParagraph": ~80-word paragraph written for a worried adult child
                        searching "[city] senior meal prep". It must:
                        - Mention at least one hospital by name in a post-discharge
                          or chronic-care context
                        - Mention at least one senior center by name
                        - Be direct, warm, and specific — no marketing fluff,
                          no phrases like "nestled among"
                        - Explain why Well Prepped Life fills a gap that the
                          senior center cannot

    Return ONLY the JSON object. No markdown, no explanation, no code fences.
""")


def slugify_city(slug: str) -> str:
    return slug.replace("-", " ").title()


def fetch_enrichment(client: anthropic.Anthropic, slug: str) -> dict:
    city = slugify_city(slug)
    user_message = (
        f"Generate enrichment data for the city: {city}, CA (San Francisco Bay Area)."
    )

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_message}],
    )

    raw = message.content[0].text.strip()
    # Strip any accidental markdown code fences
    raw = re.sub(r"^```[a-z]*\n?", "", raw)
    raw = re.sub(r"\n?```$", "", raw)

    return json.loads(raw)


def read_ts_file() -> str:
    with open(ENRICHMENT_FILE, encoding="utf-8") as f:
        return f.read()


def build_entry_ts(slug: str, data: dict) -> str:
    def ts_str_list(items: list) -> str:
        lines = [f'      "{item}",' for item in items]
        return "[\n" + "\n".join(lines) + "\n    ]"

    paragraph = data["localParagraph"].replace('"', '\\"')

    return textwrap.dedent(f"""\
  "{slug}": {{
    hospitals: {ts_str_list(data["hospitals"])},
    seniorCenters: {ts_str_list(data["seniorCenters"])},
    landmarks: {ts_str_list(data["landmarks"])},
    localParagraph:
      "{paragraph}",
  }},""")


def replace_or_insert_entry(ts_source: str, slug: str, entry_ts: str) -> str:
    # Match the existing block for this slug, including trailing comma
    pattern = re.compile(
        r'"' + re.escape(slug) + r'":\s*\{[^}]*(?:\{[^}]*\}[^}]*)?\},?\n?',
        re.DOTALL,
    )
    replacement = entry_ts + "\n\n"

    if pattern.search(ts_source):
        return pattern.sub(replacement, ts_source)

    # Not found — insert before the closing `} satisfies ...` line
    insert_before = re.compile(r"\}\s*satisfies\s+Record<")
    return insert_before.sub(entry_ts + "\n} satisfies Record<", ts_source)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Regenerate location enrichment data using Claude"
    )
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--slug", metavar="SLUG", help="Regenerate a single city slug")
    group.add_argument("--all", action="store_true", help="Regenerate all 24 cities")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print generated data without writing to disk",
    )
    args = parser.parse_args()

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        sys.exit("ANTHROPIC_API_KEY environment variable is not set.")

    client = anthropic.Anthropic(api_key=api_key)

    slugs_to_process = ALL_SLUGS if args.all else [args.slug]

    if args.slug and args.slug not in ALL_SLUGS:
        sys.exit(
            f"Unknown slug '{args.slug}'. Valid slugs:\n  " + "\n  ".join(ALL_SLUGS)
        )

    ts_source = read_ts_file()

    for slug in slugs_to_process:
        print(f"Fetching enrichment for: {slug} ...", flush=True)
        try:
            data = fetch_enrichment(client, slug)
        except (json.JSONDecodeError, KeyError) as e:
            print(f"  ERROR parsing response for {slug}: {e}", file=sys.stderr)
            continue

        entry_ts = build_entry_ts(slug, data)

        if args.dry_run:
            print(f"\n--- {slug} ---")
            print(entry_ts)
        else:
            ts_source = replace_or_insert_entry(ts_source, slug, entry_ts)
            print(f"  Updated {slug}.")

    if not args.dry_run:
        with open(ENRICHMENT_FILE, "w", encoding="utf-8") as f:
            f.write(ts_source)
        print(f"\nWrote updated enrichment to {ENRICHMENT_FILE}")


if __name__ == "__main__":
    main()

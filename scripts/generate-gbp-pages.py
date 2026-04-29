#!/usr/bin/env python3
"""
generate-gbp-pages.py — Generate new service page content using Atlas (qwen3:32b).

Reads the 8 new service slugs from gbp-categories-data.ts, calls Ollama with
qwen3:32b to produce a ServiceDetail object for each, then writes the output to
lib/services-data-batch4.ts.

Usage:
    python3 scripts/generate-gbp-pages.py
    python3 scripts/generate-gbp-pages.py --dry-run        # print output only
    python3 scripts/generate-gbp-pages.py --slug personal-chef-dietary-restrictions

Environment:
    OLLAMA_BASE_URL   defaults to http://localhost:11434
    GENERATE_MODEL    defaults to qwen3:32b  (Atlas)
"""

import argparse
import json
import sys
import urllib.request
import urllib.error
from pathlib import Path

# ── Config ────────────────────────────────────────────────────────────────────

REPO_ROOT = Path(__file__).resolve().parent.parent
BATCH4_PATH = REPO_ROOT / "lib" / "services-data-batch4.ts"
MAIN_DATA_PATH = REPO_ROOT / "lib" / "services-data.ts"

import os
OLLAMA_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
GENERATE_MODEL = os.getenv("GENERATE_MODEL", "qwen3:32b")

# All 8 new service slugs + their context
NEW_SERVICES = [
    {
        "slug": "personal-chef-dietary-restrictions",
        "gbp_name": "Personal chef for dietary restrictions",
        "category": "Personal chef service",
        "description": "A personal chef who specializes in cooking for clients with multiple or complex dietary restrictions including allergies, intolerances, and medically required exclusions.",
        "related_services": ["custom-menu-planning", "gluten-free-meal-prep", "allergen-free-cooking", "vegetarian-meal-prep"],
        "related_locations": ["san-jose", "palo-alto", "mountain-view", "san-francisco", "oakland"],
    },
    {
        "slug": "biweekly-meal-prep",
        "gbp_name": "Bi-weekly meal prep service",
        "category": "Meal preparation delivery service",
        "description": "Meal prep sessions scheduled every two weeks — ideal for clients who want professional meal preparation but prefer a bi-weekly cadence rather than weekly.",
        "related_services": ["weekly-meal-prep", "batch-cooking-freezer-meals", "meal-prep-for-seniors"],
        "related_locations": ["san-jose", "palo-alto", "sunnyvale", "san-francisco", "campbell"],
    },
    {
        "slug": "fresh-meal-delivery-seniors",
        "gbp_name": "Fresh meal delivery for seniors at home",
        "category": "Meal preparation delivery service",
        "description": "Chef-prepared fresh (not frozen) meals delivered directly to seniors at home on a regular schedule. Customized to medical diets and personal preferences.",
        "related_services": ["meal-prep-for-seniors", "weekly-meal-prep", "single-serving-meal-prep", "post-hospital-meal-transition"],
        "related_locations": ["san-jose", "palo-alto", "mountain-view", "sunnyvale", "san-francisco"],
    },
    {
        "slug": "chef-prepared-meal-delivery",
        "gbp_name": "Chef-prepared meal delivery for aging adults",
        "category": "Meal preparation delivery service",
        "description": "Restaurant-quality meals prepared by a ServSafe-certified personal chef and delivered fresh to aging adults — not from a meal kit company, a real chef cooking real food.",
        "related_services": ["fresh-meal-delivery-seniors", "meal-prep-for-seniors", "personal-chef-for-seniors"],
        "related_locations": ["san-jose", "palo-alto", "mountain-view", "san-francisco", "oakland"],
    },
    {
        "slug": "medically-tailored-meal-prep",
        "gbp_name": "Medically tailored meal preparation at home",
        "category": "Home health care service",
        "description": "In-home meal preparation precisely calibrated to a client's medical conditions and physician-prescribed dietary requirements — diabetic, renal, cardiac, oncology, and more.",
        "related_services": ["diabetic-meal-prep", "renal-diet-meal-prep", "heart-healthy-meal-prep", "cancer-nutrition-meals"],
        "related_locations": ["san-jose", "palo-alto", "mountain-view", "san-francisco", "sunnyvale"],
    },
    {
        "slug": "adaptive-kitchen-tools",
        "gbp_name": "Adaptive kitchen tool recommendations",
        "category": "Disability services & support organisation",
        "description": "Expert guidance on selecting adaptive kitchen tools and equipment for adults with limited mobility, arthritis, tremors, or one-handed use.",
        "related_services": ["adaptive-cooking", "arthritis-friendly-cooking", "wheelchair-accessible-kitchen", "kitchen-accessibility-consulting"],
        "related_locations": ["san-jose", "palo-alto", "mountain-view", "san-francisco", "oakland"],
    },
    {
        "slug": "seated-cooking-instruction",
        "gbp_name": "Seated cooking instruction for mobility-limited adults",
        "category": "Disability services & support organisation",
        "description": "1-on-1 cooking instruction specifically designed for adults who cook seated — due to wheelchair use, chronic pain, fatigue, or limited standing endurance.",
        "related_services": ["adaptive-cooking", "wheelchair-accessible-kitchen", "in-home-cooking-lessons"],
        "related_locations": ["san-jose", "palo-alto", "mountain-view", "san-francisco", "oakland"],
    },
    {
        "slug": "tremor-adapted-cooking",
        "gbp_name": "Tremor-adapted cooking techniques coaching",
        "category": "Disability services & support organisation",
        "description": "Specialized cooking instruction for adults living with essential tremor, Parkinson's disease tremors, or other conditions causing hand tremors — techniques, tools, and kitchen modifications.",
        "related_services": ["parkinsons-meal-prep", "adaptive-cooking", "arthritis-friendly-cooking", "adaptive-kitchen-tools"],
        "related_locations": ["san-jose", "palo-alto", "mountain-view", "san-francisco", "sunnyvale"],
    },
]

# ── Prompt template ───────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are a content writer for Well Prepped Life, an in-home meal prep and adaptive cooking service for seniors and disabled adults in the San Francisco Bay Area. The founder is Justine Sanidad, a ServSafe-certified chef. Phone: (415) 971-3464. Website: wellpreppedlife.com.

Your tone is warm, specific, and authoritative. You write for adult children ages 35-60 who are managing an aging parent's nutrition — buyers in a crisis who need practical, credentialed help. You name specific conditions, use real medical language, and make the service feel bookable today.

Write service page content that:
- Uses searcher language, not clinical jargon
- Addresses the emotional weight of the caregiver/senior situation
- Names specific conditions and dietary needs
- Makes the service feel concrete and available this week
- Mentions the Bay Area and relevant cities naturally
- Is 100% original, not generic marketing copy"""

def make_user_prompt(svc: dict) -> str:
    related_slugs_str = json.dumps(svc["related_services"])
    related_locs_str = json.dumps(svc["related_locations"])
    return f"""Generate a ServiceDetail object for the following Well Prepped Life service page.

Service:
- GBP name: {svc["gbp_name"]}
- URL slug: {svc["slug"]}
- GBP category: {svc["category"]}
- What it is: {svc["description"]}

Return ONLY valid JSON matching this exact TypeScript interface:
{{
  "slug": "{svc["slug"]}",
  "title": "string (page <title> tag, 50-60 chars, include Bay Area)",
  "metaDescription": "string (155-160 chars, includes slug keywords and Bay Area)",
  "h1": "string (heading shown on page, include 'in the Bay Area')",
  "intro": "string (2-3 sentences, 80-120 words, emotionally resonant, specific)",
  "sections": [
    {{"heading": "string", "content": "string (120-180 words, specific and credible)"}},
    {{"heading": "string", "content": "string"}},
    {{"heading": "string", "content": "string"}},
    {{"heading": "string", "content": "string"}},
    {{"heading": "string", "content": "string"}}
  ],
  "relatedServices": {related_slugs_str},
  "relatedLocations": {related_locs_str}
}}

Section headings should include at least 2 questions (starting with What, How, Who, Why, Can, Is, Are) for FAQ schema.
Return ONLY the JSON object, no markdown, no explanation."""


# ── Ollama call ───────────────────────────────────────────────────────────────

def ollama_chat(system: str, user: str, model: str = GENERATE_MODEL) -> str:
    payload = json.dumps({
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "stream": False,
        "options": {
            "temperature": 0.7,
            "num_predict": 4000,
        },
    }).encode()

    req = urllib.request.Request(
        f"{OLLAMA_URL}/api/chat",
        data=payload,
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as res:
            return json.loads(res.read())["message"]["content"]
    except urllib.error.URLError as e:
        print(f"[ERROR] Cannot reach Ollama at {OLLAMA_URL}: {e}", file=sys.stderr)
        sys.exit(1)


def _repair_json_strings(text: str) -> str:
    """Escape literal newlines/tabs that appear inside JSON string values.

    LLMs occasionally emit real newline characters inside a JSON string instead
    of the escape sequence \\n, which makes json.loads() fail.  Walk the text
    character-by-character and replace bare control characters while inside a
    string literal.
    """
    result = []
    in_string = False
    escape_next = False
    for ch in text:
        if escape_next:
            result.append(ch)
            escape_next = False
        elif ch == "\\":
            result.append(ch)
            escape_next = True
        elif ch == '"':
            result.append(ch)
            in_string = not in_string
        elif in_string and ch == "\n":
            result.append("\\n")
        elif in_string and ch == "\r":
            result.append("\\r")
        elif in_string and ch == "\t":
            result.append("\\t")
        else:
            result.append(ch)
    return "".join(result)


def extract_json(raw: str) -> dict:
    """Strip wrapper text and parse JSON from a model response.

    Handles:
    - qwen3 <think>...</think> reasoning blocks
    - Markdown code fences (```json ... ```)
    - Literal newlines/tabs inside string values
    """
    import re

    # Strip <think>...</think> blocks emitted by qwen3 thinking mode
    text = re.sub(r"<think>.*?</think>", "", raw, flags=re.DOTALL).strip()

    # Strip markdown fences
    if text.startswith("```"):
        lines = text.splitlines()
        inner = "\n".join(lines[1:-1] if lines[-1].strip() == "```" else lines[1:])
        text = inner.strip()

    # Isolate the first { ... } block
    start = text.find("{")
    end = text.rfind("}") + 1
    if start == -1 or end == 0:
        raise ValueError("No JSON object found in response")
    text = text[start:end]

    # First attempt: parse as-is
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # Second attempt: repair bare control characters inside strings
    try:
        return json.loads(_repair_json_strings(text))
    except json.JSONDecodeError as e:
        raise ValueError(f"JSON parse failed after repair attempt: {e}") from e


# ── TypeScript serialiser ─────────────────────────────────────────────────────

def ts_string(s: str) -> str:
    """Wrap a string in double-quotes, escaping quotes and backslashes."""
    escaped = s.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def service_to_ts(svc: dict) -> str:
    """Render a ServiceDetail dict as a TypeScript object literal."""
    sections_ts = ",\n      ".join(
        f'{{"heading": {ts_string(sec["heading"])}, "content": {ts_string(sec["content"])}}}'
        for sec in svc["sections"]
    )
    related_svcs_ts = ", ".join(ts_string(s) for s in svc["relatedServices"])
    related_locs_ts = ", ".join(ts_string(s) for s in svc["relatedLocations"])

    return f"""  {{
    slug: {ts_string(svc["slug"])},
    title: {ts_string(svc["title"])},
    metaDescription: {ts_string(svc["metaDescription"])},
    h1: {ts_string(svc["h1"])},
    intro: {ts_string(svc["intro"])},
    sections: [
      {sections_ts}
    ],
    relatedServices: [{related_svcs_ts}],
    relatedLocations: [{related_locs_ts}],
  }}"""


# ── Batch file writer ─────────────────────────────────────────────────────────

def write_batch4(entries: list[dict]) -> None:
    header = '''/**
 * ============================================================
 *  WELL PREPPED LIFE — Service Detail Page Data (Batch 4)
 *  Generated by scripts/generate-gbp-pages.py using Atlas (qwen3:32b).
 *  These entries correspond to new GBP services that did not
 *  previously have their own service pages.
 *
 *  Well Prepped Life is an in-home meal prep and adaptive
 *  cooking service for seniors and disabled adults in the
 *  San Francisco Bay Area. Founded by Justine Sanidad.
 *  Phone: (415) 971-3464 | wellpreppedlife.com
 * ============================================================
 */

import type { ServiceDetail } from "./services-data";

export const servicesBatch4: ServiceDetail[] = [
'''
    body = ",\n".join(service_to_ts(e) for e in entries)
    footer = "\n];\n"

    BATCH4_PATH.write_text(header + body + footer, encoding="utf-8")
    print(f"[OK] Wrote {len(entries)} services to {BATCH4_PATH}")


def patch_main_data() -> None:
    """Add batch4 import + merge into services-data.ts if not already present."""
    text = MAIN_DATA_PATH.read_text(encoding="utf-8")

    if "servicesBatch4" in text:
        print("[SKIP] services-data.ts already imports servicesBatch4")
        return

    # Add import after batch3 import
    text = text.replace(
        "import { servicesBatch3 } from './services-data-batch3';",
        "import { servicesBatch3 } from './services-data-batch3';\nimport { servicesBatch4 } from './services-data-batch4';",
    )
    # Add to getAllServices() spread
    text = text.replace(
        "return [...serviceDetails, ...servicesBatch2, ...servicesBatch3];",
        "return [...serviceDetails, ...servicesBatch2, ...servicesBatch3, ...servicesBatch4];",
    )
    MAIN_DATA_PATH.write_text(text, encoding="utf-8")
    print(f"[OK] Patched {MAIN_DATA_PATH} to include servicesBatch4")


# ── Main ──────────────────────────────────────────────────────────────────────

def load_keyword_tier_priority() -> tuple[set, set]:
    """Query customer.keyword_tiers for this client's tier data.

    Returns:
        priority_slugs: set of slugs whose keyword is recommended_action='target_now'
                        (G/F tier with high opportunity) — generate these FIRST.
        skip_slugs:     set of slugs whose keyword is recommended_action='skip'/'reframe'
                        — DO NOT generate these (waste of Ollama tokens).

    Returns (set(), set()) if psycopg2 unavailable, DB unreachable, or no tier data
    exists yet — caller should fall back to the existing NEW_SERVICES order.

    Project ID is inferred from the current working directory (the repo name).
    """
    try:
        import os as _os
        import re as _re
        try:
            import psycopg2
        except ImportError:
            return set(), set()

        project = Path(_os.getcwd()).name
        conn = psycopg2.connect(_os.getenv("DATABASE_URL", "postgresql://atlas@localhost/pipeline"))
        cur = conn.cursor()
        cur.execute(
            """
            SELECT keyword, recommended_action FROM customer.keyword_tiers
            WHERE project = %s
              AND scored_date = (SELECT MAX(scored_date) FROM customer.keyword_tiers WHERE project = %s)
            """,
            (project, project),
        )
        rows = cur.fetchall()
        cur.close(); conn.close()

        def _slug(kw: str) -> str:
            s = kw.lower()
            s = _re.sub(r"\b(near me|oklahoma|oklahoma city|ok|ca|tx|ny|us|usa)\b", "", s)
            s = _re.sub(r"[^a-z0-9\s-]", "", s)
            s = _re.sub(r"\s+", "-", s).strip("-")
            s = _re.sub(r"-+", "-", s)
            return s[:80]

        priority = {_slug(kw) for kw, action in rows if action == "target_now"}
        skip     = {_slug(kw) for kw, action in rows if action in ("skip", "reframe")}
        return priority, skip
    except Exception as e:
        print(f"[warn] could not load keyword tiers — {e}; falling back to default order")
        return set(), set()


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate GBP service pages with Atlas (qwen3:32b)")
    parser.add_argument("--dry-run", action="store_true", help="Print generated TS without writing files")
    parser.add_argument("--slug", help="Generate only one service by slug")
    parser.add_argument("--model", default=GENERATE_MODEL, help=f"Ollama model (default: {GENERATE_MODEL})")
    parser.add_argument("--ignore-tiers", action="store_true",
                        help="Skip the keyword_tiers prioritisation/skip step (generate all isNew in original order)")
    args = parser.parse_args()

    target_services = NEW_SERVICES
    if args.slug:
        target_services = [s for s in NEW_SERVICES if s["slug"] == args.slug]
        if not target_services:
            print(f"[ERROR] Unknown slug: {args.slug}. Valid slugs: {[s['slug'] for s in NEW_SERVICES]}")
            sys.exit(1)

    # Apply keyword-tier prioritisation: target_now first, skip/reframe excluded.
    # See /Users/atlas/repo/important/KEYWORD-LADDER.md for the methodology.
    if not args.slug and not args.ignore_tiers:
        priority_slugs, skip_slugs = load_keyword_tier_priority()
        if skip_slugs:
            before = len(target_services)
            target_services = [s for s in target_services if s["slug"] not in skip_slugs]
            removed = before - len(target_services)
            if removed:
                print(f"[tiers] removed {removed} slug(s) marked skip/reframe — won't generate")
        if priority_slugs:
            target_services.sort(key=lambda s: 0 if s["slug"] in priority_slugs else 1)
            n_priority = sum(1 for s in target_services if s["slug"] in priority_slugs)
            print(f"[tiers] {n_priority}/{len(target_services)} slug(s) flagged target_now — generating those first")

    print(f"[Atlas] Generating {len(target_services)} service page(s) using {args.model}...")

    generated: list[dict] = []
    failed: list[str] = []
    for svc in target_services:
        print(f"  → {svc['slug']} ...", end=" ", flush=True)
        prompt = make_user_prompt(svc)
        data = None
        for attempt in range(1, 3):          # up to 2 attempts
            raw = ollama_chat(SYSTEM_PROMPT, prompt, model=args.model)
            try:
                data = extract_json(raw)
                data["slug"] = svc["slug"]
                break
            except (ValueError, json.JSONDecodeError) as e:
                if attempt == 1:
                    print(f"retry ...", end=" ", flush=True)
                else:
                    print(f"FAILED — {e}")
                    print(f"  Raw response (first 300 chars): {raw[:300]}")
                    data = None
        if data is None:
            failed.append(svc["slug"])
            if not args.dry_run:
                continue          # skip this one; keep going with the rest
        else:
            generated.append(data)
            print("done")

    if failed:
        print(f"\n[WARN] {len(failed)} service(s) failed after 2 attempts:")
        for slug in failed:
            print(f"  python3 scripts/generate-gbp-pages.py --slug {slug}")

    if args.dry_run:
        for entry in generated:
            print("\n" + service_to_ts(entry))
        return

    if not generated:
        print("[ERROR] No services were generated successfully.")
        sys.exit(1)

    # If --slug, merge with any existing batch4 entries
    if args.slug and BATCH4_PATH.exists():
        existing_text = BATCH4_PATH.read_text(encoding="utf-8")
        # Parse existing slugs to avoid duplicates — simple approach: just append
        for entry in generated:
            if entry["slug"] in existing_text:
                print(f"[SKIP] {entry['slug']} already in batch4")
            else:
                # Append before the closing ];
                append_ts = ",\n" + service_to_ts(entry)
                new_text = existing_text.rstrip().rstrip("]").rstrip(";").rstrip() + append_ts + "\n];\n"
                BATCH4_PATH.write_text(new_text, encoding="utf-8")
                print(f"[OK] Appended {entry['slug']} to {BATCH4_PATH}")
    else:
        write_batch4(generated)
        patch_main_data()

    print(f"\n[Done] {len(generated)} service page(s) generated.")
    print("Next steps:")
    print("  1. Review lib/services-data-batch4.ts for quality")
    print("  2. Run: npm run build")
    print("  3. Run: npm run deploy")


if __name__ == "__main__":
    main()

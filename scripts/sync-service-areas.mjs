#!/usr/bin/env node
/**
 * sync-service-areas.mjs
 *
 * Reads `public.nap_profiles.service_areas` for the configured client (default
 * 'assurgit') from the pipeline Postgres database, then generates
 * `lib/locations-data.generated.ts` with stub LocationDetail entries for every
 * service area not already hand-tuned in `lib/locations-data.ts`.
 *
 * Run before build (or whenever service areas change in mission-control):
 *   node scripts/sync-service-areas.mjs
 *   node scripts/sync-service-areas.mjs --client wellpreppedlife
 *   node scripts/sync-service-areas.mjs --dry-run
 *
 * The generated file is committed so the Cloudflare Worker can import it as a
 * static module at build time — no DB access at request time.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postgres from 'postgres';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const HAND_TUNED_FILE = path.join(ROOT, 'lib', 'locations-data.ts');
const OUTPUT_FILE = path.join(ROOT, 'lib', 'locations-data.generated.ts');
const DATABASE_URL =
  process.env.PIPELINE_DATABASE_URL ??
  process.env.DATABASE_URL ??
  'postgres://atlas@localhost:5432/pipeline';

// ── Args ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const clientArg = args.indexOf('--client');
const CLIENT = clientArg >= 0 ? args[clientArg + 1] : 'assurgit';

// ── Bay Area regional metadata ──────────────────────────────────────────────
// Used to enrich stubs with sensible region/county defaults. Falls back to
// generic "Bay Area" if a city isn't in this table.
const REGIONS = {
  'south bay':  ['San Jose', 'Santa Clara', 'Sunnyvale', 'Cupertino', 'Mountain View', 'Palo Alto', 'Los Altos', 'Los Altos Hills', 'Saratoga', 'Los Gatos', 'Campbell', 'Milpitas', 'Morgan Hill', 'Gilroy'],
  'peninsula':  ['Redwood City', 'San Mateo', 'Foster City', 'Burlingame', 'Belmont', 'San Carlos', 'San Bruno', 'South San Francisco', 'Millbrae', 'Half Moon Bay', 'Hillsborough', 'Atherton', 'Menlo Park', 'East Palo Alto', 'Daly City', 'Pacifica'],
  'east bay':   ['Oakland', 'Berkeley', 'Fremont', 'Hayward', 'Alameda', 'San Leandro', 'Castro Valley', 'Union City', 'Newark', 'Dublin', 'Pleasanton', 'Livermore', 'Walnut Creek', 'Concord', 'Richmond', 'Albany', 'Emeryville', 'Piedmont', 'Lafayette', 'Orinda', 'Moraga', 'San Ramon', 'Danville'],
  'sf':         ['San Francisco'],
  'north bay':  ['San Rafael', 'Novato', 'Mill Valley', 'Sausalito', 'Tiburon', 'San Anselmo', 'Petaluma', 'Marin County', 'Larkspur', 'Corte Madera', 'Fairfax', 'Napa', 'Sonoma', 'Santa Rosa'],
};
const COUNTY_BY_REGION = {
  'south bay': 'Santa Clara County',
  'peninsula': 'San Mateo County',
  'east bay':  'Alameda County',
  'sf':        'San Francisco County',
  'north bay': 'Marin County',
};

function lookupRegion(city) {
  const normalized = city.trim();
  for (const [region, cities] of Object.entries(REGIONS)) {
    if (cities.some((c) => c.toLowerCase() === normalized.toLowerCase())) {
      return { region, county: COUNTY_BY_REGION[region] };
    }
  }
  return { region: 'bay area', county: 'Bay Area' };
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ── Read existing hand-tuned slugs ──────────────────────────────────────────
function readHandTunedSlugs() {
  if (!fs.existsSync(HAND_TUNED_FILE)) return new Set();
  const src = fs.readFileSync(HAND_TUNED_FILE, 'utf8');
  const slugs = new Set();
  const re = /slug:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) slugs.add(m[1]);
  return slugs;
}

// ── Stub generator ──────────────────────────────────────────────────────────
function generateStub(city) {
  const slug = slugify(city);
  const { region, county } = lookupRegion(city);
  const regionTitle = region.replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    slug,
    city,
    state: 'CA',
    title: `Local SEO & Website Design in ${city}, CA — Assurgit`,
    metaDescription: `Custom websites, Google Business Profile management, and ongoing local SEO for ${city} service businesses. From $189/month. Page 1 in 90 days or your fourth month is free.`,
    h1: `Local SEO & Website Design for ${city} Service Businesses`,
    intro: `Assurgit serves ${city} service businesses — plumbers, salons, contractors, attorneys, dentists, therapists, real estate agents, and more — with done-for-you websites, Google Business Profile management, and ongoing local SEO. We build custom-coded websites, optimize your GBP, run citations across 25+ directories, automate review requests, and publish monthly content. Three monthly tiers from $189 to $649. You own everything we build — site, domain, content, GBP, citations.`,
    sections: [
      {
        heading: `Why ${city} Service Businesses Choose Assurgit`,
        content: `${city} is part of the ${regionTitle} (${county}), one of the most competitive service-business markets in the country. Generic Wix or Squarespace sites and unmanaged Google Business Profiles don't compete here. We build custom-coded websites that load in under one second, ship hand-tuned schema markup that earns rich-results eligibility, run active GBP optimization weekly, build citations across the directories that matter for your industry, and automate review requests wired to your booking platform. We're based in the Bay Area and we know how local search works in ${city}.`,
      },
      {
        heading: `What's Included for ${city} Clients`,
        content: `Custom website built and hosted (you own the code). Google Business Profile setup, optimization, and weekly posts. Citations across BBB, Yelp, Bing, Apple Maps, Nextdoor, and the right vertical directories for your industry. Schema markup (LocalBusiness + your service vertical). Review request automation. Monthly content publishing. Ranking dashboard you can check anytime — no fake PDF reports. All on three monthly tiers from $189 to $649. Page 1 in 90 days or your fourth month is free.`,
      },
      {
        heading: `Onboarding Timeline for ${city}`,
        content: `Most ${city} clients are live with a new Assurgit-built website within 14 to 21 days of signup. Week one: audit and 30-day local SEO action plan. Week two: website ship plus GBP optimization. Week three: citations, review automation, analytics. From month two onward we operate the system: weekly GBP posts, monthly content, ongoing citations, monthly reporting.`,
      },
      {
        heading: `Getting Started in ${city}`,
        content: `Run a free SEO audit at /tools/seo-audit, book a 15-minute call at /book, or call (256) 777-6287. We'll review your current presence, identify the biggest gaps, and recommend a tier. Three-month initial term, month-to-month after. You own the website, domain, GBP, content, and data — day one.`,
      },
    ],
    neighborhoods: [],
    nearbyLocations: [],
    latitude: 0,
    longitude: 0,
  };
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const handTuned = readHandTunedSlugs();
  console.log(`[sync-locations] hand-tuned slugs: ${handTuned.size}`);

  const sql = postgres(DATABASE_URL, { max: 1, idle_timeout: 5 });
  const rows = await sql`
    SELECT service_areas FROM public.nap_profiles
    WHERE client_id = ${CLIENT}
      AND (location_id IS NULL OR location_id = 'primary')
    ORDER BY id LIMIT 1
  `;
  await sql.end();

  if (rows.length === 0) {
    console.error(`[sync-locations] no nap_profiles row for client=${CLIENT}`);
    process.exit(1);
  }
  const cities = rows[0].service_areas ?? [];
  console.log(`[sync-locations] service_areas in nap_profiles: ${cities.length}`);

  const stubs = [];
  for (const city of cities) {
    const slug = slugify(city);
    if (handTuned.has(slug)) continue;
    stubs.push(generateStub(city));
  }
  console.log(`[sync-locations] generating ${stubs.length} stubs (skipping ${cities.length - stubs.length} hand-tuned)`);

  const banner = `/**
 * AUTO-GENERATED — DO NOT EDIT BY HAND.
 * Regenerate via: node scripts/sync-service-areas.mjs
 *
 * Source: public.nap_profiles.service_areas (client=${CLIENT})
 * Generated: ${new Date().toISOString()}
 *
 * Hand-tuned entries live in lib/locations-data.ts. Stubs here are auto-emitted
 * for every service area not yet hand-tuned. Hand-tuned entries override stubs.
 */

import type { LocationDetail } from "./locations-data";

export const generatedLocationDetails: LocationDetail[] = ${JSON.stringify(stubs, null, 2)};
`;

  if (dryRun) {
    console.log(`[sync-locations] DRY RUN — would write ${OUTPUT_FILE}:\n${banner.slice(0, 500)}…`);
    return;
  }

  fs.writeFileSync(OUTPUT_FILE, banner, 'utf8');
  console.log(`[sync-locations] wrote ${OUTPUT_FILE} with ${stubs.length} stubs`);
}

main().catch((err) => {
  console.error('[sync-locations] failed:', err);
  process.exit(1);
});

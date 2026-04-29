#!/usr/bin/env node
/**
 * find-fallback-locations.mjs
 *
 * Lists every location page whose hero SVG is still the generic fallback
 * (`public/images/locations/_default.svg`, marked with the `wpl:fallback`
 * comment + `data-wpl-fallback="true"` attribute).
 *
 * Use this to feed the image-generation pipeline — these are the slugs
 * that still need a real, city-specific hero SVG made.
 *
 * Usage:
 *   node scripts/find-fallback-locations.mjs                   # print list
 *   node scripts/find-fallback-locations.mjs --json            # JSON
 *   node scripts/find-fallback-locations.mjs --queue           # push each
 *                                                              # slug into
 *                                                              # Sage's
 *                                                              # page-brief
 *                                                              # pipeline
 *
 * A slug is considered "fallback" if ANY of:
 *   - its SVG file is missing entirely
 *   - its SVG contains the string "wpl:fallback" or `data-wpl-fallback`
 *   - its SVG is byte-identical to _default.svg
 */

import fs              from 'fs';
import path            from 'path';
import crypto          from 'crypto';
import { fileURLToPath } from 'url';
import { execSync }    from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');

const LOC_DIR        = path.join(ROOT, 'public/images/locations');
const DEFAULT_SVG    = path.join(LOC_DIR, '_default.svg');
const LOCATIONS_DATA = path.join(ROOT, 'lib/locations-data.ts');
const SAGE_BRIEF     = '/Users/atlas/repo/agents/Sage/workspace/tasks/page-brief/brief.py';
const PYTHON         = '/opt/homebrew/bin/python3';

const argv     = process.argv.slice(2);
const AS_JSON  = argv.includes('--json');
const QUEUE    = argv.includes('--queue');
const VERBOSE  = argv.includes('-v') || argv.includes('--verbose');

function md5(s)      { return crypto.createHash('md5').update(s).digest('hex'); }

function readOrNull(p) {
  try   { return fs.readFileSync(p, 'utf8'); }
  catch { return null; }
}

function extractSlugs(tsSource) {
  // Match `slug: "foo-bar"` entries in lib/locations-data.ts
  const out = [];
  const rx  = /slug:\s*["']([a-z0-9-]+)["']/g;
  let m;
  while ((m = rx.exec(tsSource)) !== null) out.push(m[1]);
  return [...new Set(out)];
}

function classify(slug, defaultHash, defaultContent) {
  const p  = path.join(LOC_DIR, `${slug}.svg`);
  const raw = readOrNull(p);
  if (raw === null)                                 return { slug, status: 'missing', file: p };
  if (raw.includes('wpl:fallback'))                 return { slug, status: 'fallback', reason: 'wpl:fallback comment', file: p };
  if (raw.includes('data-wpl-fallback'))            return { slug, status: 'fallback', reason: 'data-wpl-fallback attr', file: p };
  if (md5(raw) === defaultHash)                     return { slug, status: 'fallback', reason: 'md5 match _default.svg', file: p };
  return { slug, status: 'real', file: p };
}

function main() {
  const tsSrc = readOrNull(LOCATIONS_DATA);
  if (!tsSrc) {
    console.error(`[fallback-locations] cannot read ${LOCATIONS_DATA}`);
    process.exit(1);
  }
  const slugs = extractSlugs(tsSrc);

  const defaultContent = readOrNull(DEFAULT_SVG);
  if (!defaultContent) {
    console.error(`[fallback-locations] ${DEFAULT_SVG} missing — nothing to compare`);
    process.exit(1);
  }
  const defaultHash = md5(defaultContent);

  const results    = slugs.map(s => classify(s, defaultHash, defaultContent));
  const fallbacks  = results.filter(r => r.status === 'fallback' || r.status === 'missing');
  const real       = results.filter(r => r.status === 'real');

  if (AS_JSON) {
    console.log(JSON.stringify({
      total:         slugs.length,
      real_count:    real.length,
      fallback_count: fallbacks.length,
      fallback:      fallbacks.map(r => r.slug),
      real:          real.map(r => r.slug),
    }, null, 2));
    return;
  }

  console.log(`[fallback-locations] scanned ${slugs.length} slugs from lib/locations-data.ts`);
  console.log(`[fallback-locations] ${real.length} real, ${fallbacks.length} fallback/missing\n`);

  if (fallbacks.length === 0) {
    console.log('✅ All location pages have real, city-specific SVGs.');
    return;
  }

  console.log('⚠️  Slugs still using the generic fallback hero:');
  for (const r of fallbacks) {
    console.log(`    ${r.slug.padEnd(22)}  (${r.reason || r.status})`);
  }

  if (QUEUE) {
    console.log(`\n[fallback-locations] queuing ${fallbacks.length} URLs to Sage's brief.py…`);
    for (const r of fallbacks) {
      const url = `https://wellpreppedlife.com/locations/${r.slug}`;
      console.log(`  → ${url}`);
      try {
        execSync(`${PYTHON} ${SAGE_BRIEF} --url "${url}"`, {
          stdio: VERBOSE ? 'inherit' : 'ignore',
        });
      } catch (e) {
        console.error(`    ✗ failed for ${r.slug}: ${e.message.split('\n')[0]}`);
      }
    }
  } else {
    console.log(`\nNext step (queue all for image generation):`);
    console.log(`  node scripts/find-fallback-locations.mjs --queue`);
  }
}

main();

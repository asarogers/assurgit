#!/usr/bin/env node
/**
 * deploy.mjs — Build → patch → deploy to Cloudflare Workers → Health Check
 *
 * GBP queue sync runs automatically as postdeploy via sync-gbp-queue.mjs.
 * After deploy, runs Arnold's check-page healthcheck against the live sitemap.
 *
 * Usage:
 *   npm run deploy                          # build + deploy + healthcheck + autofix + redeploy if needed
 *   node scripts/deploy.mjs --skip-build    # deploy only
 *   node scripts/deploy.mjs --skip-deploy   # build only
 *   node scripts/deploy.mjs --skip-check    # skip post-deploy healthcheck + autofix
 *   node scripts/deploy.mjs --skip-autofix  # skip SEO autofix (still runs healthcheck)
 *   node scripts/deploy.mjs --dry-run       # print every step, touch nothing
 */

import { execSync }      from 'child_process';
import path              from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');

const argv        = process.argv.slice(2);
const SKIP_BUILD   = argv.includes('--skip-build');
const SKIP_DEPLOY  = argv.includes('--skip-deploy');
const SKIP_CHECK   = argv.includes('--skip-check');
const SKIP_AUTOFIX = argv.includes('--skip-autofix');
const DRY_RUN      = argv.includes('--dry-run');

const PYTHON      = '/opt/homebrew/bin/python3';
const HEALTHCHECK = '/Users/atlas/repo/agents/arnold/workspace/tasks/check-page/check_all.py';
const SITEMAP     = 'https://assurgit.com/sitemap.xml';
const AUDIT_JSON  = `/tmp/audit-${path.basename(ROOT)}.json`;
const ATLAS_ROUTE = '/Users/atlas/repo/agents/Atlas/workspace/tasks/audit-route/route.py';
const SEO_AUTOFIX = '/Users/atlas/repo/scripts/seo-autofix.py';

const log = (msg) => console.log(`\n✦ ${msg}`);

function run(cmd) {
  log(`$ ${cmd}`);
  if (DRY_RUN) { console.log('  (dry-run — skipped)'); return; }
  execSync(cmd, { stdio: 'inherit', cwd: ROOT });
}

async function main() {
  if (DRY_RUN) log('DRY-RUN mode — no real changes will be made');

  if (!SKIP_BUILD) {
    log('Building with @opennextjs/cloudflare…');
    run('npx opennextjs-cloudflare build');
    log('Patching worker…');
    run('node scripts/patch-worker.mjs');
  } else {
    log('Skipping build (--skip-build)');
  }

  if (!SKIP_DEPLOY) {
    log('Deploying to Cloudflare Workers…');
    run('npx wrangler deploy');
  } else {
    log('Skipping deploy (--skip-deploy)');
  }

  log('Done. GBP queue sync will run via postdeploy (npm run sync).');

  if (!SKIP_DEPLOY && !SKIP_CHECK) {
    log('Waiting 10s for Cloudflare edge to propagate…');
    if (!DRY_RUN) await new Promise((r) => setTimeout(r, 10_000));

    log('Running post-deploy healthcheck (Arnold check_all)…');
    try {
      run(`${PYTHON} ${HEALTHCHECK} --assurgit --save-json "${AUDIT_JSON}"`);
      log('Healthcheck passed.');
    } catch {
      log('Healthcheck found issues — review output above.');
    }
    // Always route results to Atlas (even if healthcheck found issues)
    try {
      run(`${PYTHON} ${ATLAS_ROUTE} --results "${AUDIT_JSON}" --site "${SITEMAP.split('/')[2]}" --sitemap "${SITEMAP}"`);
    } catch {
      log('Atlas routing failed — review output above.');
    }

    if (!SKIP_AUTOFIX) {
      log('Running SEO autofix…');
      let autofixApplied = false;
      try {
        // seo-autofix.py exits 0 = nothing to fix, 2 = fixes applied, 1 = error
        if (DRY_RUN) {
          console.log('  (dry-run — skipping autofix)');
        } else {
          execSync(`${PYTHON} ${SEO_AUTOFIX} --audit "${AUDIT_JSON}" --project "${ROOT}"`, { stdio: 'inherit', cwd: ROOT });
          log('No SEO fixes needed.');
        }
      } catch (err) {
        if (err.status === 2) {
          autofixApplied = true;
          log('SEO fixes applied — rebuilding and redeploying…');
        } else {
          log('SEO autofix failed — review output above.');
        }
      }

      if (autofixApplied) {
        log('Rebuilding with @opennextjs/cloudflare…');
        run('npx opennextjs-cloudflare build');
        log('Patching worker…');
        run('node scripts/patch-worker.mjs');
        log('Redeploying to Cloudflare Workers…');
        run('npx wrangler deploy');
        log('Auto-redeploy complete. Skipping second audit run.');
      }
    } else {
      log('Skipping SEO autofix (--skip-autofix)');
    }
  } else if (SKIP_CHECK) {
    log('Skipping healthcheck (--skip-check)');
  }
}

main().catch((e) => { console.error(e); process.exit(1); });

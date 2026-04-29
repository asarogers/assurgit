/**
 * request-indexing.ts — Post-deploy Google indexing automation
 *
 * What it does:
 *   1. Pings Bing with the sitemap URL
 *   2. Fetches the live sitemap.xml from wellpreppedlife.com
 *   3. Compares against a local cache of previously submitted URLs
 *   4. Submits NEW urls to Google Indexing API (needs service account)
 *   5. Saves the updated cache
 *
 * Setup (one-time):
 *   1. Go to https://console.cloud.google.com
 *   2. Create a project (or use existing)
 *   3. Enable "Web Search Indexing API" (aka Indexing API)
 *   4. Create a Service Account → download JSON key
 *   5. Save the key as google-indexing-key.json in the project root
 *   6. Go to Google Search Console → Settings → Users and permissions
 *   7. Add the service account email (from the JSON) as an Owner
 *
 * Usage:
 *   npx ts-node scripts/request-indexing.ts          # submit new URLs
 *   npx ts-node scripts/request-indexing.ts --all    # re-submit ALL URLs
 *   npx ts-node scripts/request-indexing.ts --dry    # preview without submitting
 *   npx ts-node scripts/request-indexing.ts --ping   # only ping sitemap, skip URL submission
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://wellpreppedlife.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXING_API = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
const CACHE_FILE = path.join(__dirname, '..', '.indexing-cache.json');
const KEY_FILE = path.join(__dirname, '..', 'google-indexing-key.json');

// Google Indexing API quota: 200 requests/day for new sites, can increase
const MAX_SUBMISSIONS_PER_RUN = 100;

interface CacheData {
  lastRun: string;
  submittedUrls: Record<string, string>; // url -> last submitted ISO date
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function loadCache(): CacheData {
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  } catch {
    return { lastRun: '', submittedUrls: {} };
  }
}

function saveCache(cache: CacheData): void {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

async function fetchSitemapUrls(): Promise<string[]> {
  const resp = await fetch(SITEMAP_URL);
  if (!resp.ok) throw new Error(`Failed to fetch sitemap: ${resp.status}`);
  const xml = await resp.text();

  // Extract <loc> tags — simple regex, no XML parser needed
  const urls: string[] = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

async function pingSitemap(): Promise<void> {
  // Bing/IndexNow still supports sitemap ping
  const bingPing = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
  try {
    const resp = await fetch(bingPing);
    if (resp.ok) {
      console.log(`[OK] Pinged Bing with sitemap`);
    } else {
      console.log(`[INFO] Bing sitemap ping returned ${resp.status}`);
    }
  } catch (e: any) {
    console.log(`[INFO] Bing sitemap ping failed: ${e.message}`);
  }
  // Note: Google deprecated /ping in 2023. Use the Indexing API instead.
  console.log(`[INFO] Google no longer supports sitemap ping — using Indexing API for URL submission`);
}

function base64url(data: Buffer | string): string {
  const buf = typeof data === 'string' ? Buffer.from(data) : data;
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function getGoogleServerTime(): Promise<number> {
  // Fetch Google's server time to compensate for local clock skew
  try {
    const resp = await fetch('https://oauth2.googleapis.com/token', { method: 'POST' });
    const dateHeader = resp.headers.get('date');
    if (dateHeader) {
      const serverTime = Math.floor(new Date(dateHeader).getTime() / 1000);
      const localTime = Math.floor(Date.now() / 1000);
      const skew = localTime - serverTime;
      if (Math.abs(skew) > 30) {
        console.log(`[INFO] Clock skew detected: local is ${skew > 0 ? '+' : ''}${skew}s vs Google. Compensating.`);
      }
      return serverTime;
    }
  } catch {}
  return Math.floor(Date.now() / 1000);
}

async function getAccessToken(): Promise<string | null> {
  const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf-8'));
  const now = await getGoogleServerTime();

  // Build JWT header + claims
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(JSON.stringify({
    iss: keyData.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));

  // Sign with the service account private key
  const signInput = `${header}.${claims}`;
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signInput);
  const signature = base64url(sign.sign(keyData.private_key));
  const jwt = `${signInput}.${signature}`;

  // Exchange JWT for access token
  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!resp.ok) {
    const body = await resp.text();
    console.error(`[ERROR] Token exchange failed: ${body.slice(0, 300)}`);
    return null;
  }

  const data = await resp.json() as { access_token?: string };
  return data.access_token || null;
}

async function submitUrl(
  accessToken: string,
  url: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const resp = await fetch(INDEXING_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        type: 'URL_UPDATED',
      }),
    });

    if (resp.ok) {
      return { ok: true };
    } else {
      const body = await resp.text();
      return { ok: false, error: `${resp.status}: ${body.slice(0, 200)}` };
    }
  } catch (e: any) {
    return { ok: false, error: e.message };
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry');
  const submitAll = args.includes('--all');
  const pingOnly = args.includes('--ping');

  console.log('');
  console.log('=== Google Indexing — Post-Deploy ===');
  console.log(`Site: ${SITE_URL}`);
  console.log(`Mode: ${dryRun ? 'DRY RUN' : pingOnly ? 'PING ONLY' : submitAll ? 'ALL URLs' : 'NEW URLs only'}`);
  console.log('');

  // Step 1: Always ping Bing with sitemap
  await pingSitemap();

  if (pingOnly) {
    console.log('\nDone (ping only mode).');
    return;
  }

  // Step 2: Check for service account key
  if (!fs.existsSync(KEY_FILE)) {
    console.log('');
    console.log('[SKIP] Google Indexing API — no service account key found.');
    console.log('       To enable per-URL indexing requests:');
    console.log(`       1. Create a service account at https://console.cloud.google.com`);
    console.log(`       2. Enable the "Web Search Indexing API"`);
    console.log(`       3. Save the JSON key as: ${KEY_FILE}`);
    console.log(`       4. Add the service account email as Owner in Google Search Console`);
    console.log('');
    console.log('Sitemap ping was still sent. Google will discover new URLs on its own (usually 2-7 days).');
    return;
  }

  // Step 3: Fetch current sitemap URLs
  console.log('\nFetching sitemap...');
  const sitemapUrls = await fetchSitemapUrls();
  console.log(`Found ${sitemapUrls.length} URLs in sitemap.`);

  // Step 4: Determine which URLs are new
  const cache = loadCache();
  let urlsToSubmit: string[];

  if (submitAll) {
    urlsToSubmit = sitemapUrls;
  } else {
    urlsToSubmit = sitemapUrls.filter((url) => !cache.submittedUrls[url]);
  }

  if (urlsToSubmit.length === 0) {
    console.log('No new URLs to submit. All sitemap URLs already indexed.');
    console.log(`(Use --all to re-submit everything, or delete ${CACHE_FILE} to reset)`);
    cache.lastRun = new Date().toISOString();
    saveCache(cache);
    return;
  }

  // Cap to daily quota
  if (urlsToSubmit.length > MAX_SUBMISSIONS_PER_RUN) {
    console.log(`Capping to ${MAX_SUBMISSIONS_PER_RUN} URLs (${urlsToSubmit.length} total). Run again for the rest.`);
    urlsToSubmit = urlsToSubmit.slice(0, MAX_SUBMISSIONS_PER_RUN);
  }

  console.log(`\nSubmitting ${urlsToSubmit.length} URL(s) to Google Indexing API...`);

  if (dryRun) {
    urlsToSubmit.forEach((url) => console.log(`  [DRY] ${url}`));
    console.log(`\nDry run complete. ${urlsToSubmit.length} URLs would be submitted.`);
    return;
  }

  // Step 5: Authenticate and submit
  console.log('Authenticating with Google...');
  const accessToken = await getAccessToken();
  if (!accessToken) {
    console.error('[ERROR] Failed to get access token from Google.');
    return;
  }
  console.log(`[OK] Got access token (${accessToken.slice(0, 20)}...)\n`);

  let success = 0;
  let failed = 0;
  const now = new Date().toISOString();

  for (const url of urlsToSubmit) {
    const result = await submitUrl(accessToken, url);
    if (result.ok) {
      console.log(`  [OK] ${url}`);
      cache.submittedUrls[url] = now;
      success++;
    } else {
      console.log(`  [FAIL] ${url} — ${result.error}`);
      failed++;
    }

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 100));
  }

  // Step 6: Save cache
  cache.lastRun = now;
  saveCache(cache);

  console.log('');
  console.log(`=== Results ===`);
  console.log(`Submitted: ${success}  |  Failed: ${failed}  |  Total in cache: ${Object.keys(cache.submittedUrls).length}`);
  console.log('');
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});

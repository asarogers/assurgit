#!/usr/bin/env node
/**
 * request-indexing.mjs — Post-deploy Google indexing automation
 *
 * What it does:
 *   1. Pings Bing with the sitemap (Google's ping was deprecated in 2023)
 *   2. Fetches the LIVE sitemap.xml from wellpreppedlife.com
 *   3. Compares against a local cache of previously submitted URLs
 *   4. Submits NEW urls to Google Indexing API (needs service account key)
 *   5. Saves the updated cache
 *
 * Setup (one-time):
 *   1. Go to https://console.cloud.google.com
 *   2. Create a project → Enable "Web Search Indexing API"
 *   3. Create a Service Account → download JSON key
 *   4. Save the key as google-indexing-key.json in the project root
 *   5. Go to Google Search Console → Settings → Users and permissions
 *   6. Add the service account email (from the JSON) as an Owner
 *
 * Usage:
 *   node scripts/request-indexing.mjs           # submit new URLs only
 *   node scripts/request-indexing.mjs --all     # re-submit ALL URLs
 *   node scripts/request-indexing.mjs --dry     # preview without submitting
 *   node scripts/request-indexing.mjs --ping    # only ping Bing, skip submission
 */

import fs     from 'fs';
import path   from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL    = 'https://wellpreppedlife.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const API_URL     = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
const CACHE_FILE  = path.join(__dirname, '..', 'deploy-state', 'indexing-cache.json');
const KEY_FILE    = path.join(__dirname, '..', 'google-indexing-key.json');

// Google Indexing API quota: 200 requests/day
const MAX_PER_RUN = 200;

// ── CLI flags ─────────────────────────────────────────────────────────────────
const args     = process.argv.slice(2);
const DRY      = args.includes('--dry');
const ALL      = args.includes('--all');
const PING     = args.includes('--ping');

// ── Cache ─────────────────────────────────────────────────────────────────────
function loadCache() {
  try { return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8')); }
  catch { return { lastRun: '', submittedUrls: {} }; }
}

function saveCache(cache) {
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2) + '\n');
}

// ── Sitemap ───────────────────────────────────────────────────────────────────
async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status} — is the site live?`);
  const xml   = await res.text();
  const urls  = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let m;
  while ((m = regex.exec(xml)) !== null) urls.push(m[1]);
  return urls;
}

// ── Bing ping ─────────────────────────────────────────────────────────────────
async function pingSitemap() {
  // Bing/IndexNow still supports sitemap ping; Google removed theirs in 2023
  const url = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
  try {
    const res = await fetch(url);
    console.log(res.ok ? `[OK]   Pinged Bing with sitemap` : `[INFO] Bing ping → HTTP ${res.status}`);
  } catch (e) {
    console.log(`[INFO] Bing ping failed: ${e.message}`);
  }
  console.log(`[INFO] Google ping deprecated (2023) — using Indexing API for URL submission`);
}

// ── Google OAuth2 via service account JWT ─────────────────────────────────────
function b64url(data) {
  const buf = typeof data === 'string' ? Buffer.from(data) : data;
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function getGoogleServerTime() {
  // Compensate for local clock skew — prevents JWT auth failures
  try {
    const res = await fetch('https://oauth2.googleapis.com/token', { method: 'POST' });
    const dateHeader = res.headers.get('date');
    if (dateHeader) {
      const serverTime = Math.floor(new Date(dateHeader).getTime() / 1000);
      const skew = Math.floor(Date.now() / 1000) - serverTime;
      if (Math.abs(skew) > 30)
        console.log(`[INFO] Clock skew ${skew > 0 ? '+' : ''}${skew}s vs Google — compensating`);
      return serverTime;
    }
  } catch {}
  return Math.floor(Date.now() / 1000);
}

async function getAccessToken(keyData) {
  const now    = await getGoogleServerTime();
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({
    iss  : keyData.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud  : 'https://oauth2.googleapis.com/token',
    iat  : now,
    exp  : now + 3600,
  }));

  const unsigned = `${header}.${claims}`;
  const sign     = crypto.createSign('RSA-SHA256');
  sign.update(unsigned);
  const jwt = `${unsigned}.${b64url(sign.sign(keyData.private_key))}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method : 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body   : `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`[ERROR] Token exchange failed: ${body.slice(0, 300)}`);
    return null;
  }

  const data = await res.json();
  return data.access_token || null;
}

async function submitUrl(token, url) {
  try {
    const res = await fetch(API_URL, {
      method : 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body   : JSON.stringify({ url, type: 'URL_UPDATED' }),
    });
    if (res.ok) return { ok: true };
    const body = await res.text();
    return { ok: false, error: `${res.status}: ${body.slice(0, 200)}` };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('');
  console.log('=== Google Indexing — Post-Deploy ===');
  console.log(`Site: ${SITE_URL}`);
  console.log(`Mode: ${DRY ? 'DRY RUN' : PING ? 'PING ONLY' : ALL ? 'ALL URLs' : 'NEW URLs only'}`);
  console.log('');

  await pingSitemap();
  if (PING) { console.log('\nDone (ping only).'); return; }

  // No key file — print setup guide and exit gracefully
  if (!fs.existsSync(KEY_FILE)) {
    console.log('');
    console.log('[SKIP] No google-indexing-key.json found — skipping Indexing API.');
    console.log('       To enable automatic per-URL indexing:');
    console.log('       1. https://console.cloud.google.com → enable "Web Search Indexing API"');
    console.log('       2. Create a Service Account → download JSON key');
    console.log(`       3. Save it as: ${KEY_FILE}  (already in .gitignore)`);
    console.log('       4. Add the service account email as Owner in Google Search Console');
    console.log('');
    console.log('Sitemap URLs to submit manually via Search Console:');
    console.log(`  → https://search.google.com/search-console → Sitemaps → sitemap.xml`);
    return;
  }

  const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf-8'));

  console.log('\nFetching live sitemap...');
  let sitemapUrls;
  try {
    sitemapUrls = await fetchSitemapUrls();
  } catch (e) {
    console.error(`[ERROR] ${e.message}`);
    process.exit(1);
  }
  console.log(`Found ${sitemapUrls.length} URLs in sitemap.`);

  const cache = loadCache();
  let toSubmit = ALL
    ? sitemapUrls
    : sitemapUrls.filter((url) => !cache.submittedUrls[url]);

  if (toSubmit.length === 0) {
    console.log('\nNo new URLs — all sitemap URLs already submitted.');
    console.log(`(Use --all to resubmit, or delete ${CACHE_FILE} to reset)`);
    cache.lastRun = new Date().toISOString();
    saveCache(cache);
    return;
  }

  if (toSubmit.length > MAX_PER_RUN) {
    console.log(`Capping to ${MAX_PER_RUN} URLs (${toSubmit.length} total). Run again for the rest.`);
    toSubmit = toSubmit.slice(0, MAX_PER_RUN);
  }

  console.log(`\nSubmitting ${toSubmit.length} URL(s) to Google Indexing API...`);

  if (DRY) {
    toSubmit.forEach((url) => console.log(`  [DRY] ${url}`));
    console.log(`\nDry run — ${toSubmit.length} URLs would be submitted.`);
    return;
  }

  console.log('Authenticating with Google...');
  const token = await getAccessToken(keyData);
  if (!token) { console.error('[ERROR] Could not get access token.'); process.exit(1); }
  console.log(`[OK]   Authenticated\n`);

  const now = new Date().toISOString();
  let ok = 0, fail = 0;

  for (const url of toSubmit) {
    const result = await submitUrl(token, url);
    if (result.ok) {
      console.log(`  [OK]   ${url}`);
      cache.submittedUrls[url] = now;
      ok++;
    } else {
      console.log(`  [FAIL] ${url} — ${result.error}`);
      fail++;
    }
    await new Promise((r) => setTimeout(r, 100));
  }

  cache.lastRun = now;
  saveCache(cache);

  console.log('');
  console.log(`=== Results: ${ok} submitted  ${fail} failed  ${Object.keys(cache.submittedUrls).length} total in cache ===`);
  console.log('');
}

main().catch((e) => { console.error('Fatal:', e.message); process.exit(1); });

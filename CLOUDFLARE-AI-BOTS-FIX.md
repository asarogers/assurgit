# Cloudflare Dashboard — AI Crawler Unblock (MANUAL ACTION REQUIRED)

## Problem

`app/robots.ts` explicitly allows all major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.), but the **live robots.txt at https://wellpreppedlife.com/robots.txt** shows Cloudflare's "Managed Content" is injecting `Disallow: /` for these bots *before* our own rules.

Visible in production (`curl https://wellpreppedlife.com/robots.txt`):

```
# BEGIN Cloudflare Managed content
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /
...
# END Cloudflare Managed Content
```

Most crawler parsers stop at the first matching block, so our own "Allow: /" rules below never get reached.

**Impact:** Invisible to ChatGPT, Claude, Perplexity, and Google's AI Overview — which MASTER-SETUP flags as a GEO (Generative Engine Optimization) requirement.

---

## Fix (5 min, Cloudflare dashboard only)

1. Go to **dash.cloudflare.com** → select `wellpreppedlife.com`
2. In the left sidebar: **Security → Settings** (or **Bots → Configure**)
3. Find **"Block AI bots"** / **"AI Scrapers & Crawlers"** / **"Block AI training crawlers"** toggle
4. Turn it **OFF** (or set to "Allow")
5. Save / Deploy

Alternative location (if you use the new Security dashboard):
- **Security → AI Audit → Block AI Bots** → toggle OFF
- OR **Security → Bots → AI Crawlers & Scrapers** → set all to **Allow**

---

## Verify after the change

```bash
curl -s https://wellpreppedlife.com/robots.txt | head -60
```

Expected: the `# BEGIN Cloudflare Managed content` block should be gone (or show `Allow: /` instead of `Disallow: /` for GPTBot/ClaudeBot/Google-Extended).

Then re-run the audit:

```bash
cd /Users/atlas/repo/agents/arnold/workspace
python3 tasks/check-page/check.py --url "https://wellpreppedlife.com"
```

The "AI crawlers blocked in robots.txt" warning should be gone.

---

## Why this matters (from MASTER-SETUP.md + wellpreppedlife/MASTER.md)

Per `important/MASTER-SETUP.md` §Step 5 Technical SEO:

> `robots.txt` — allow all crawlers, add sitemap URL
> AI crawlers: allow GPTBot, ClaudeBot, PerplexityBot, Googlebot-Extended

And from the client synthesis (`important/business/wellpreppedlife/strategy/seo.md`): Reddit + YouTube own ALL featured snippets in this niche because no service business appears. Allowing AI crawlers lets Well Prepped Life be cited in the answer engines those buyers are starting to use instead of Google.

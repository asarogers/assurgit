# assurgit

AI-powered content and SEO platform for local service businesses. Built on Next.js + Cloudflare Workers + D1.

## Stack

- **Frontend:** Next.js 16 (App Router), Tailwind CSS, shadcn/ui
- **Runtime:** Cloudflare Workers via OpenNext (`opennextjs-cloudflare`)
- **Database:** Cloudflare D1 (SQLite) via Drizzle ORM
- **Auth:** Cookie-based owner session (`OWNER_PASSWORD` env var)
- **Email:** Resend
- **SEO Audit Tool:** Separate FastAPI server on Hetzner VPS at `audit.assurgit.com`

## Local development

```bash
npm install
npm run dev          # Next.js dev server on :3000
```

## Deploy

```bash
npm run deploy -- --skip-check
```

This runs `npx opennextjs-cloudflare build` then `wrangler deploy`. Never run `wrangler deploy` alone — it skips the OpenNext build step.

## Database migrations

Run against remote D1 (auth issue with `--file`, use `--command` per statement):

```bash
npx wrangler d1 execute assurgit-db --remote --command="<SQL>"
```

Migration files live in `/migrations/`. Latest: `0013_referral_links.sql`.

## Environment variables

Set in `wrangler.toml` (non-secret) or via `wrangler secret put` (secrets):

| Variable | Where | Purpose |
|----------|-------|---------|
| `OWNER_PASSWORD` | `.env.local` | Admin login |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `wrangler.toml` | GA4 (`G-YNWT2XH3EG`) |
| `RESEND_API_KEY` | Worker secret | Email sending |
| `INSTAGRAM_APP_ID/SECRET` | `.env.local` | Instagram OAuth |
| `SESSION_SECRET` | `.env.local` | Session signing |

## Project structure

```
app/
  (admin)/terminal/     — Content control panel (owner only)
  tools/seo-audit/      — SEO audit tool page (iframes audit.assurgit.com)
  tools/ai-video-tools/ — AI tool rankings
  for/, compare/, best/ — SEO landing pages
  local-seo/            — Local SEO landing page
  blog/                 — Blog posts
  pricing/, book/       — Core conversion pages

business/
  samedayhandyman/      — Client content files + transcripts
  wellpreppedlife/      — Client content files + transcripts
  referral-links.json   — Referral link definitions (all platforms)
  referral-guide.md     — How referral tracking works

components/
  terminal/             — Content control UI (WeekSidebar, TerminalClient)
  marketing/            — Navbar, Footer, shared marketing components

lib/
  db/schema.ts          — Drizzle schema (clients, projects, cards, referral_links)

migrations/
  0012_clients.sql      — Client/project two-level hierarchy
  0013_referral_links.sql — Referral links table

agents/
  arnold/workspace/tasks/create-content/ — Content generation scripts
```

## Content control

Admin panel at `/terminal`. Two-level hierarchy:
- **Clients** (e.g. Same Day Handyman OKC)
  - **Batches** (e.g. Week 2) → 10 cards each
  - Cards have: transcript, Instagram caption, TikTok caption, YouTube title/description

Generate new content batches:
```bash
python3 /Users/atlas/repo/agents/arnold/workspace/tasks/create-content/create_content.py \
  --client samedayhandyman --dry-run
```

## SEO Audit Tool

Separate server at `audit.assurgit.com` (Hetzner VPS `204.168.210.174`).

```bash
# SSH
ssh root@204.168.210.174

# Service management
systemctl status seo-audit
systemctl restart seo-audit

# Files
/home/deploy/seo-audit/server.py          — FastAPI app
/home/deploy/seo-audit/check.py           — Audit logic
/home/deploy/seo-audit/static/index.html  — Frontend
/home/deploy/seo-audit/referral-links.json — Referral link definitions
/home/deploy/seo-audit/visits.jsonl       — Raw click/visit log
```

See `business/referral-guide.md` for how referral tracking and UTM links work.

## Referral links

All referral links are defined in `business/referral-links.json` and stored in the `referral_links` D1 table. Short links follow the pattern `audit.assurgit.com/r/SLUG` and redirect with full UTM parameters for GA4 attribution.

Platforms covered: Reddit (4 subreddits), TikTok, YouTube, Instagram, Facebook, Skool, WhatsApp.

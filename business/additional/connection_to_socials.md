# Social Platform Connection Strategy

## Posting Layer: Zernio API (zernio.com)
All posting routed through Zernio. One API key, one connect flow, 14 platforms.
Zernio handles Reddit API approval, TikTok business review, and platform gatekeeping.

---

## Platform Status

### Via Zernio (direct)
- **Instagram** — ready, OAuth connect via self
- **YouTube** — ready, OAuth connect via self

- **Reddit** — ready, OAuth connect via Zernio (Zernio handles API approval)
- **TikTok** — ready, OAuth connect via Zernio (replaces Late app)
- **Facebook** — ready, OAuth connect via Zernio


### Blocked by external requirements
- **LinkedIn** — requires client to have a Company Page (not personal profile)
- **Twitter/X** — requires $200/month Basic developer account per client

---

## Zernio Plans

| Plan       | Price         | Profiles | Posts/mo   | Rate limit  |
|------------|---------------|----------|------------|-------------|
| Free       | $0/mo         | 2        | 20         | 60 req/min  |
| Build      | $19/mo        | 10       | 120        | 120 req/min |
| Accelerate | $49/mo        | 50       | Unlimited  | 600 req/min |
| Unlimited  | $999/mo       | Unlimited| Unlimited  | 1,200 req/min |

Add-ons (paid plans only):
- **Analytics** — Build: +$10/mo · Accelerate: +$50/mo · Unlimited: +$1,000/mo
- **Inbox (Comments + DMs)** — Build: +$10/mo · Accelerate: +$50/mo · Unlimited: +$1,000/mo

Each client = 1 profile. At 10 clients → Build ($19/mo). At 50 clients → Accelerate ($49/mo).

---

## Architecture Notes

### Direct OAuth (built, no third-party dependency)
- **Instagram** — `/api/social/instagram/connect` + callback (live)
- **YouTube** — `/api/social/youtube/connect` + callback (built)

### Via Zernio (platform gatekeeping solved by Zernio)
- **Reddit** — `/api/social/zernio/connect?platform=reddit` + callback
- **TikTok** — `/api/social/zernio/connect?platform=tiktok` + callback


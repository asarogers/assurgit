# Online Visibility & Growth Checklist — Progress
**Last verified: 2026-03-19**

---

## ✅ COMPLETED — Implemented in the website codebase

### Analytics Infrastructure
- ✅ `lib/analytics.ts` — UTM capture, first-touch attribution, GA4 event helpers (`ctaClick`, `formStart`, `formSubmit`, `demoBooked`, `pricingClick`, `scrollDepth`)
- ✅ `components/AnalyticsProvider.tsx` — mounts on every page, captures UTM params, tracks scroll depth
- ✅ `app/layout.tsx` — GA4 script wired up via `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var, AnalyticsProvider mounted

---

## ⚠️ PARTIAL — Started but needs external action

| Item | What's needed |
|------|---------------|
| GA4 | Create property at analytics.google.com → copy Measurement ID → add to env |
| Layout metadata | Update title/description once brand voice is finalized |

---

## ❌ NOT DONE — Requires external accounts / manual action

### CRITICAL (do first)
| # | Item | Where to go | Notes |
|---|------|-------------|-------|
| 1 | **Cloudflare + Domain** | cloudflare.com | Point registrar nameservers to Cloudflare, deploy Worker |
| 2 | **Google Analytics 4** | analytics.google.com | Create property, get Measurement ID, add to env |
| 3 | **Google Search Console** | search.google.com/search-console | Verify domain, submit sitemap |
| 4 | **Build the website** | — | Homepage, pricing, how it works, case studies, FAQ, demo booking |
| 5 | **Schema markup** | In code | Organization + SoftwareApplication + FAQ JSON-LD |

### HIGH (do next)
| # | Item | Where to go | Notes |
|---|------|-------------|-------|
| 6 | **LinkedIn Company Page** | linkedin.com/company/setup | Primary B2B channel |
| 7 | **LinkedIn Personal Outreach** | Your personal LinkedIn | 20 connection requests/day to ideal clients |
| 8 | **Cold Email Infrastructure** | Instantly.ai + Apollo.io | Warm domain first (2–4 weeks), then 50–100/day |
| 9 | **Twitter/X Account** | twitter.com | @assurgit — results, client wins, AI content tips |
| 10 | **YouTube Channel** | youtube.com | Client result breakdowns, before/afters |
| 11 | **Waitlist / Early Access Page** | Build in code | Launch before full site — capture leads immediately |

### MEDIUM (within a month)
| # | Item | Where to go | Notes |
|---|------|-------------|-------|
| 12 | **ProductHunt Launch** | producthunt.com | Plan launch, line up supporters beforehand |
| 13 | **G2 / Capterra** | g2.com + capterra.com | Free software listings — get early client reviews |
| 14 | **Clutch.co** | clutch.co | B2B agency directory — strong trust signal |
| 15 | **AI Tool Directories** | See checklist.txt | There's An AI For That, Futurepedia, Toolify, AI Tool Hunt |
| 16 | **Crunchbase / Wellfound** | crunchbase.com + wellfound.com | Legitimacy for enterprise buyers + press |
| 17 | **Facebook Groups** | Facebook | Entrepreneur + marketing groups — helpful participation only |
| 18 | **Microsoft Clarity** | clarity.microsoft.com | Free heatmaps — link to GA4, no code needed |

### LOW (ongoing)
| # | Item | Notes |
|---|------|-------|
| 19 | **Reddit** | r/entrepreneur, r/socialmediamarketing, r/AItools — helpful answers only |
| 20 | **Podcast Guesting** | Podmatch / Rephonic — AI content + marketing shows |
| 21 | **Referral Program** | Discount or commission for client referrals; agency white-label partner program |
| 22 | **Newsletter** | Beehiiv or Resend — weekly AI content tips + client results |
| 23 | **Bing Webmaster Tools** | bing.com/webmasters |
| 24 | **AI Visibility Monitoring** | Monthly: ask ChatGPT/Gemini/Perplexity "best AI video content service" |
| 25 | **Quarterly refresh** | Update case studies, pricing, FAQ every 90 days |

---

## Outreach Priority Order

The first 10 clients will NOT come from Google — they come from direct outreach.
Work this order:

1. **LinkedIn DMs** — fastest feedback loop, free, high intent
2. **Cold email** — scalable once warmed up (start warm-up immediately)
3. **ProductHunt** — one-time spike, drives awareness and early adopters
4. **AI directories** — passive SEO backlinks + qualified traffic
5. **Content (YouTube / Twitter)** — compounds over 3–6 months

---

## When the site is built — update schema

Once pages exist, add to `lib/schema.ts`:

```ts
// Organization schema
{
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Assurgit",
  url: "https://assurgit.com",
  description: "AI video content system — 7 branded videos/week using your avatar and voice clone.",
  sameAs: [
    "https://www.linkedin.com/company/assurgit",
    "https://twitter.com/assurgit",
    "https://www.youtube.com/@assurgit",
  ]
}

// SoftwareApplication schema
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Assurgit",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "AI-powered video content creation system for businesses.",
  url: "https://assurgit.com",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  }
}
```

---

## Summary

| Category | Count | Status |
|----------|-------|--------|
| Code / analytics | 3 | ✅ Done |
| Site to be built | 1 | ❌ Not started |
| External platforms | 21 | ❌ Not started |
| **Total checklist items** | **25** | — |

**No GBP needed — Assurgit is online-only B2B. Primary early revenue comes from LinkedIn + cold email outreach, not inbound search.**

---

_Updated 2026-03-19 — verified against current codebase._

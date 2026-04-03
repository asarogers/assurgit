# Assurgit SEO & Growth Strategy
**Living document — update continuously as research completes and pages ship.**
Last updated: 2026-03-27

---

## 1. Business Context & Positioning

### What Assurgit Does
Done-for-you AI video content service. Builds a personal AI avatar + voice clone from one 30-min setup call, then produces research-backed scripts, renders videos, and auto-publishes to Instagram, TikTok, LinkedIn, and YouTube — every week, on autopilot.

### The Core Insight
The product sells **time** and **consistency**, not just video. Target customers are professionals who need to be visible on social but can't film constantly: coaches, consultants, loan officers, contractors, financial advisors, attorneys, healthcare practitioners — anyone who sells expertise through talking, not through visual skill display.

**Key filter for target niches:**
- ✅ Sells knowledge, trust, advice, or expertise
- ✅ Attracts clients through education/thought leadership
- ✅ Can afford $300–$500/month (CAC should be 10× that monthly fee at minimum)
- ❌ Skills showcased through visual output (barbers, tattoo artists, chefs, photographers)
- ❌ Compliance-blocked from certain content types (some finance/legal — but educational is fine)

---

## 2. Pricing Strategy (Critical — Affects All Pages)

### Decision: Add a "Launch" Entry Tier at $497/month with 5 Videos/Week Baseline

Core positioning: **5 short-form AI clone videos per week is the minimum deliverable at every tier.** This is a strong differentiator — competitors at this price point deliver 2–3. Short-form (Reels, Shorts, TikToks under 60 seconds) is the priority format.

The $300–$500 range is deliberately sticky:
- Low enough to be an easy "yes" for a professional doing $100K+/year
- Not so cheap it signals low quality
- High enough that Assurgit can deliver real value profitably
- Creates a long client lifetime — churn inflection at $250/month (Baremetrics)

### New 4-Tier Pricing Structure

| Plan | Price | Videos/Week | Platforms | Publishing | Key Features |
|------|-------|-------------|-----------|------------|--------------|
| **Launch** | **$397/mo** | 5 short-form/week | 4 platforms | MP4 via email | Avatar + voice clone, AI scripts, human QC |
| **Starter** | $997/mo | 5 short-form/week | 4 platforms | MP4 via email | Avatar + voice clone, research-backed scripts, human QC |
| **Growth** | $1,997/mo | 5 short-form/week | 4 platforms | Auto-publishing | + Weekly competitive intel, Friday strategy call, 48-hr review window |


**Rationale:**
- Video count is NOT the main differentiator between tiers — **platform reach + automation level + strategy support** is
- 5 videos/week is the baseline because it's what actually moves the needle on algorithms
- Short-form is the priority: Instagram Reels, YouTube Shorts, TikTok
- Launch at $497 = easiest "yes" for a professional; proven value before upsell
- Hormozi angle: Value stack for Launch = normally $2,000 setup + $500/mo scripts + $300/mo rendering = $2,800+. You get all of it for $497/month.

### Founder Identity
**Asa Rogers** — Founder of Assurgit
- Add to: homepage About/Trust section, blog author bylines, use case pages
- E-E-A-T signal: named founder with proven results improves LLM citation probability

### Key Case Study: WellPreparedLife — 50% Business Growth in 1 Week
Client: WellPreparedLife (Justine Sanidad — Bay Area meal prep + kitchen coaching for seniors/disabled adults)
Result: **50% business growth in one week** of Assurgit content
Status: Active Assurgit client

This is the #1 proof point across all pages. Use this on:
- Homepage trust bar / testimonials
- All use case pages
- Pricing page (social proof near CTA)
- Comparison pages (concrete result vs. DIY tools)
- Best-of pages

**Messaging:** "Our client WellPreparedLife grew their business 50% in their first week with Assurgit."

### Where Prices Must Be Updated
- [ ] `components/marketing/PricingSection.tsx` — tier array
- [ ] `app/pricing/page.tsx` — metadata description
- [ ] `app/page.tsx` — softwareSchema JSON-LD (`lowPrice`, `highPrice`)
- [ ] `setup documents/Assurgit_Complete_Offers.docx` — service tier documentation
- [ ] All blog pages that mention pricing
- [ ] `app/blog/ai-video-ads-pricing-2026/page.tsx` — comparison article
- [ ] Any new comparison/feature pages built going forward

---

## 3. Page Strategy: 4 Types of Money Pages

All pages follow these principles:
1. **H1 → H2 → H3 hierarchy** — never skip levels (AI citation depends on this)
2. **Tables** wherever comparison, feature lists, or data exists
3. **FAQ section** at bottom of every page (JSON-LD FAQPage schema)
4. **Internal link to homepage** + 2–3 related pages from every page
5. **CTA** above the fold and at the bottom
6. **Meta description** under 160 chars, keyword-first
7. **Schema markup** appropriate to page type

---

## 4. Page Type A: Feature Pages

Each core capability gets a dedicated page. URL pattern: `/features/[slug]`

| Page | URL | Primary Keyword | H1 |
|------|-----|-----------------|-----|
| AI Avatar Creation | `/features/ai-avatar` | "create AI avatar from video" | Your Face. Your Brand. Built Once, Used Forever. |
| Voice Cloning | `/features/voice-clone` | "AI voice clone for marketing" | Sound Like You — Without Recording Every Week |
| AI Script Writing | `/features/ai-scripts` | "AI video script writing service" | Scripts Written In Your Voice, Every Week |
| Auto-Publishing | `/features/auto-publish` | "automated video publishing service" | Publish to 4 Platforms Automatically |
| Human QC | `/features/human-review` | "human quality control AI video" | Every Video Reviewed By a Human Before It Goes Live |
| Competitive Intelligence | `/features/competitor-research` | "competitor content intelligence" | Know What's Working in Your Niche Before You Post |
| Research Pipeline | `/features/research-pipeline` | "AI content research pipeline" | Trends, Topics, and Scripts — Delivered Every Week |
| Strategy Calls | `/features/strategy-calls` | "video content strategy call" | Weekly Strategy Calls Included |

---

## 5. Page Type B: Use Case Pages

### Tier 1 — Owner's Known Active Niches (Build First)
| Page | URL | Primary Keyword |
|------|-----|-----------------|
| Loan Officers | `/for/loan-officers` | "video marketing for loan officers" |
| Handyman Contractors | `/for/handyman-contractors` | "video content for contractors" |
| Meal Prep & Senior Care | `/for/meal-prep-coaches` | "video content for meal prep coaches" |
| Business Coaches | `/for/business-coaches` | "AI video for business coaches" |
| Consultants | `/for/consultants` | "done for you video content for consultants" |

### Tier 2 — High-Volume "Talking Head" Professions
| Page | URL | Primary Keyword | Why Video Works for Them |
|------|-----|-----------------|--------------------------|
| Financial Advisors | `/for/financial-advisors` | "video marketing for financial advisors" | Compliance-safe education builds trust pre-meeting |
| Mortgage Brokers | `/for/mortgage-brokers` | "video content for mortgage brokers" | Rate education + home-buying tips = inbound leads |
| Insurance Agents | `/for/insurance-agents` | "social media for insurance agents" | FAQs about coverage reduce friction before calls |
| Accountants & CPAs | `/for/accountants` | "video content for accountants" | Tax tips, deduction guides attract small biz clients |
| Tax Professionals | `/for/tax-professionals` | "video marketing for tax professionals" | Seasonal content, year-round relevance |
| Attorneys & Lawyers | `/for/attorneys` | "video content for lawyers" | Educational legal content (not advice) builds authority |
| Physical Therapists | `/for/physical-therapists` | "video marketing for physical therapists" | Exercise tutorials, pain education = SEO + social |
| Chiropractors | `/for/chiropractors` | "social media for chiropractors" | Educational spinal health content |
| Nutritionists / Dietitians | `/for/nutritionists` | "video content for nutritionists" | Recipe tips + nutrition education |
| Personal Trainers | `/for/personal-trainers` | "AI video for personal trainers" | Workout education + transformation content |
| Life Coaches | `/for/life-coaches` | "video marketing for life coaches" | Mindset, productivity, motivation content |
| Career Coaches | `/for/career-coaches` | "video content for career coaches" | Job search tips, interview prep |
| HR Consultants | `/for/hr-consultants` | "social media for HR consultants" | Workplace culture, compliance education |
| Real Estate Agents | `/for/real-estate-agents` | "AI video content for real estate agents" | Market updates, home-buying education |
| IT / Cybersecurity Consultants | `/for/it-consultants` | "video marketing for IT consultants" | Security tips, tech education |
| Bookkeepers | `/for/bookkeepers` | "video content for bookkeepers" | Cash flow tips, small biz finance education |
| Executive Coaches | `/for/executive-coaches` | "video marketing for executive coaches" | Leadership content for C-suite audience |
| Sales Coaches | `/for/sales-coaches` | "social media for sales coaches" | Cold outreach tips, conversion content |
| Marketing Consultants | `/for/marketing-consultants` | "video content for marketing consultants" | Case studies, strategy content |
| Mental Health Therapists | `/for/therapists` | "video marketing for therapists" | Mental health education, destigmatization content |
| Wellness Coaches | `/for/wellness-coaches` | "AI video for wellness coaches" | Habit, stress, sleep education |
| Business Owners (general) | `/for/business-owners` | "done for you video content for business owners" | Authority + lead gen |
| Solopreneurs | `/for/solopreneurs` | "video content for solopreneurs" | Full brand presence without a team |

### Tier 3 — Platform-Specific Pages
| Page | URL | Primary Keyword |
|------|-----|-----------------|
| LinkedIn Video Content | `/for/linkedin` | "LinkedIn video content service" |
| TikTok for Business | `/for/tiktok` | "TikTok content service for business" |
| YouTube Shorts Service | `/for/youtube-shorts` | "YouTube Shorts content service" |
| Instagram Reels Service | `/for/instagram-reels` | "Instagram Reels content service" |

---

## 6. Page Type C: Comparison Pages

### Vs. Done-For-You / Agency Competitors (Priority)
These capture people mid-decision comparing services. Win on: price, authenticity (your face/voice), speed to launch.

| Page | URL | Primary Keyword | Assurgit Advantage |
|------|-----|-----------------|---------------------|
| Assurgit vs. Vidico | `/compare/assurgit-vs-vidico` | "Vidico alternative" | ~10× cheaper, monthly not project |
| Assurgit vs. Marketing Agency | `/compare/ai-video-vs-marketing-agency` | "AI video vs marketing agency" | Fraction of cost, faster output |
| Assurgit vs. AI Content Agency | `/compare/ai-video-content-agency` | "best AI content agency" | Avatar = authentic vs. generic content |
| Assurgit vs. Freelance Video Editor | `/compare/vs-freelance-video-editor` | "freelance video editor vs AI video" | Consistent, no scheduling, no briefing |
| Assurgit vs. Hiring In-House | `/compare/vs-in-house-video-team` | "in-house video team vs agency" | No salary, no benefits, immediate output |
| Done-For-You vs. DIY (Pros/Cons) | `/compare/done-for-you-vs-diy-video` | "done for you vs DIY video content" | Neutral framing, Assurgit as the answer |

### Vs. DIY Tools (Capture Tool-Shopping Traffic)
| Page | URL | Primary Keyword |
|------|-----|-----------------|
| Assurgit vs. HeyGen | `/compare/assurgit-vs-heygen` | "HeyGen alternative" |
| Assurgit vs. Synthesia | `/compare/assurgit-vs-synthesia` | "Synthesia alternative" |
| Assurgit vs. Descript | `/compare/assurgit-vs-descript` | "Descript alternative" |
| Assurgit vs. Pictory | `/compare/assurgit-vs-pictory` | "Pictory AI alternative" |
| Assurgit vs. InVideo | `/compare/assurgit-vs-invideo` | "InVideo alternative agency" |
| Assurgit vs. Lumen5 | `/compare/assurgit-vs-lumen5` | "Lumen5 alternative" |

**Comparison page format:**
1. Summary table (quick visual winner)
2. Deep-dive sections on: Price, Setup time, Authenticity, Output quality, Who does the work, Results
3. "Who should use X" section (be fair — builds trust)
4. Bottom CTA: "If you want results without doing the work, Assurgit"

---

## 7. Page Type D: Best-Of Pages (LLM Citation Strategy)

These pages are designed to appear when LLMs are asked "what's the best X." They must:
- Name and rank multiple options (not just self-promote)
- Use tables with clear criteria
- Include schema: `ItemList` or `FAQPage`
- Be genuinely useful — LLMs cite sources they trust

| Page | URL | Target LLM Query |
|------|-----|------------------|
| Best Done-For-You AI Video Service | `/best/done-for-you-ai-video-service` | "best done-for-you AI video service" |
| Best AI Avatar Service for Business | `/best/ai-avatar-service-for-business` | "best AI avatar service for business" |
| Best AI Content Agency 2025 | `/best/ai-content-agency` | "best AI content agency" |
| Best Video Content Service for Coaches | `/best/video-content-service-for-coaches` | "best video content service for coaches" |
| Best AI Video Tools (Ranked) | `/tools/ai-video-tools` | "best AI video tools" *(already exists — update)* |
| Best LinkedIn Video Service | `/best/linkedin-video-service` | "best LinkedIn video service for business" |
| Best TikTok Content Service for Business | `/best/tiktok-content-service` | "best TikTok content service" |
| Best AI Tools for Loan Officers | `/best/ai-tools-for-loan-officers` | "best marketing tools for loan officers" |
| Best Content Marketing for Financial Advisors | `/best/content-marketing-financial-advisors` | "best content marketing for financial advisors" |
| Best Social Media Service for Consultants | `/best/social-media-service-for-consultants` | "best social media service for consultants" |
| Top AI Video Agencies | `/best/top-ai-video-agencies` | "top AI video agencies" |
| Best Alternatives to Hiring a Video Team | `/best/video-team-alternatives` | "alternatives to hiring video team" |

---

## 8. AI Search (GEO — Generative Engine Optimization)

### How LLMs Decide What to Cite
1. **Topical authority** — site covers the topic comprehensively, not just one page
2. **Named entities** — product name, founder name, specific facts appear frequently across the web
3. **Structured content** — H1/H2/H3 hierarchy, numbered lists, tables (LLMs parse these easily)
4. **E-E-A-T signals** — Experience, Expertise, Authoritativeness, Trustworthiness
5. **"Best of" lists** — LLMs are trained on list articles; writing them = getting included in them
6. **FAQ schema** — directly feeds LLM question-answering patterns
7. **Clear definitions** — "What is X" sections near the top of pages get lifted as definitions

### Required Schema Markup Per Page Type
| Page Type | Schema |
|-----------|--------|
| Homepage | `SoftwareApplication`, `Organization`, `FAQPage` *(already done)* |
| Feature pages | `Service`, `FAQPage` |
| Use case pages | `Service`, `FAQPage`, optionally `HowTo` |
| Comparison pages | `FAQPage`, `Table` implied |
| Best-of pages | `ItemList`, `FAQPage` |
| Blog posts | `Article`, `FAQPage` |

### SurferSEO Action Items (for when subscription is active)
- [ ] Run Content Score audit on existing 5 blog pages
- [ ] Run Topical Authority map for "AI video content service" cluster
- [ ] Check AI visibility score for top 10 target keywords
- [ ] Use Content Editor for every new page to hit 70+ Content Score before publishing
- [ ] Run competitor gap analysis vs. top-ranking comparison pages

### Immediate Actions (No Subscription Needed)
- [x] FAQ schema on homepage
- [ ] Add `ItemList` schema to all best-of pages
- [ ] Add `Service` schema to all feature + use case pages
- [ ] Add `Article` schema to all blog posts
- [ ] Create a `/sitemap.xml` section just for SEO pages (already auto-generated — verify it includes all new routes)
- [ ] Add `<link rel="canonical">` to every page
- [ ] Add `og:type`, `og:image`, `og:description` to every page (OpenGraph)

---

## 9. Competitor Research (In Progress — Agent Running)

### Known Competitors to Document
| Category | Name | URL | Status |
|----------|------|-----|--------|
| Done-for-you AI video | Vidico | vidico.com | Research pending |
| DIY AI avatar | HeyGen | heygen.com | Already documented in blog |
| DIY AI video | Synthesia | synthesia.io | Research pending |
| DIY editing | Descript | descript.com | Research pending |
| AI content agency | Content at Scale | contentatscale.ai | Research pending |
| Full-service agency | Single Grain | singlegrain.com | Research pending |
| Social publishing | Buffer | buffer.com | Lower tier |
| Done-for-you social | Socialfly | socialfly.co | Research pending |

### How to Be Found The Same Way Competitors Are
*(Will be filled when competitor research agent completes)*
1. Google Search: track which queries return competitors → create better pages for same queries
2. Reddit: monitor /r/entrepreneur, /r/marketing, /r/smallbusiness for "video content" questions
3. "Best of" roundup articles: identify top 10 lists → pitch inclusion or create competing lists
4. G2/Capterra/Trustpilot: create profiles and collect reviews
5. LinkedIn: post case studies that match the keywords competitors rank for
6. YouTube: create tutorials that rank for competitor name + "alternative"

---

## 10. Messaging Framework

### The Core Message (Hormozi-Influenced)
**For clients who want $300–$500/month "Launch" tier:**

> "You're spending $500–$2,000/hour on your time already. You know you need video content. But you don't have time to film, edit, caption, and post 5 times a week. We do all of it for $497/month. Your face. Your voice. Done for you."

### Value Stack Breakdown (for pricing page)
What you'd pay to build this yourself:
| Component | Market Rate |
|-----------|------------|
| AI avatar creation (one-time) | $1,500–$3,000 |
| Voice cloning setup | $500–$1,000 |
| Script writing (8/month) | $800–$1,600/mo |
| Video rendering (8/month) | $400–$800/mo |
| Social media management | $500–$1,500/mo |
| **Total (DIY assembled)** | **$3,700–$7,900/mo** |
| **Assurgit Launch** | **$497/mo** |

### Pain Points by Niche
| Niche | Core Pain | Our Hook |
|-------|-----------|----------|
| Loan officers | "My realtor partners don't refer me because nobody knows who I am" | "Get referred before the call happens" |
| Handyman contractors | "I rely on word of mouth and it dried up" | "Stay top of mind for every homeowner in your area" |
| Coaches | "I have expertise but can't get visible consistently" | "Show up every day without filming every day" |
| Financial advisors | "Compliance makes marketing hard, I don't post" | "Educational content that builds trust, not risk" |
| Attorneys | "My website ranks but social is dead" | "Video that explains your expertise — published while you bill" |

---

## 11. Internal Linking Architecture

```
Homepage (/)
├── /pricing
├── /features/* (8 pages)
├── /for/* (23+ use case pages)
├── /compare/* (12+ comparison pages)
├── /best/* (12+ best-of pages)
├── /blog/* (5 existing + growing)
└── /tools/* (2 existing + growing)
```

### Hub-and-Spoke Rules
1. Every `/for/[niche]` page → links to: homepage, `/pricing`, `/book`, 2 related niches
2. Every `/compare/[slug]` page → links to: homepage, `/pricing`, `/best/done-for-you-ai-video-service`
3. Every `/best/[slug]` page → links to: homepage, `/pricing`, `/book`, 3 use case pages
4. Every `/features/[slug]` page → links to: homepage, `/pricing`, 2 use case pages
5. Every blog post → links to: homepage, `/pricing`, 1 best-of page, 1 use case page
6. Homepage → links to: `/pricing`, `/book`, `/features/*`, top 3 use case pages, `/best/done-for-you-ai-video-service`

---

## 12. Page Layout Pattern (AI + Human Optimized)

Every marketing/SEO page must follow this structure:

```
1. Metadata (title, description, OG, canonical)
2. JSON-LD schema (appropriate type)
3. Navbar
4. Hero Section
   - H1 (keyword-rich, human-readable)
   - Subheadline (expands on H1)
   - Primary CTA button → /book
   - Trust signals (5 videos/week, zero filming, etc.)
5. Problem Section (H2)
   - 3 pain points specific to this niche/topic
6. Solution Section (H2)
   - How Assurgit solves it
   - Feature list or comparison table
7. How It Works (H2)
   - Numbered steps (triggers HowTo schema)
8. Pricing Table / CTA (H2)
   - Tier comparison table
   - Link to /pricing for full detail
9. Comparison Table (if comparison page)
   - Side-by-side: Assurgit vs. competitor
10. FAQ Section (H2)
    - 5–8 Q&A pairs (FAQPage schema)
11. CTA Section
    - Book a free call
    - Secondary: See pricing
12. Footer with internal links
```

---

## 13. Build Priority Order

### Phase 1 — Revenue Impact (Build This Week)
1. **Pricing page overhaul** — new 4-tier structure, value stack, comparison table vs. DIY
2. **Homepage update** — update price range in schema + hero copy for $497 entry
3. **`/for/loan-officers`** — owner has active clients here
4. **`/for/handyman-contractors`** — owner has active clients here
5. **`/compare/assurgit-vs-heygen`** — highest search intent comparison
6. **`/best/done-for-you-ai-video-service`** — LLM citation anchor page

### Phase 2 — Use Case Breadth (Next 2 Weeks)
7–15. Top use case pages: coaches, consultants, financial advisors, mortgage brokers, real estate, attorneys, personal trainers, chiropractors, therapists

### Phase 3 — Comparison Depth (Following 2 Weeks)
16–22. Remaining comparison pages: Synthesia, Descript, vs. agency, vs. freelancer, vs. in-house, done-for-you vs. DIY

### Phase 4 — Best-Of + AI Citation (Month 2)
23–34. All best-of pages, remaining use cases, feature pages

### Phase 5 — Optimization (Ongoing)
- SurferSEO Content Score audits on all pages
- AI search visibility tracking
- Internal link audit
- Schema validation (Google Rich Results Test)
- Quarterly pricing/messaging refresh

---

## 14. Open Questions (To Resolve)

| Question | Status | Impact |
|----------|--------|--------|
| Confirm new pricing tiers ($497/$997/$1,997/$3,997) | ⏳ Awaiting owner | Blocks all price updates |
| SurferSEO subscription — when active? | ⏳ Awaiting owner | Blocks content scoring |
| Current known active client niches beyond loan officers/handyman? | ⏳ Awaiting owner | Prioritizes use case pages |
| Can the $497 tier be delivered profitably at scale? | ⏳ Needs cost modeling | Critical for sustainability |
| Founder name for E-E-A-T / author pages? | ⏳ Awaiting owner | Improves LLM citation |
| Any existing client testimonials/case studies to use? | ⏳ Awaiting owner | Trust signals on all pages |

---

## 15. Research Findings (Populated as Agents Complete)

### Competitor Research
*Pending — agent running*

### CAC/LTV & Pricing Stickiness Data
*(Completed 2026-03-27 — full source citations in agent output)*

#### The $300–$500 Stickiness Case (Data-Backed)

The Baremetrics ARPU-to-churn dataset shows a clear inflection at $250/month:

| ARPU Range | Monthly User Churn | Monthly Revenue Churn |
|------------|--------------------|-----------------------|
| Under $10 | 6.2% | 6.7% |
| $10–$100 | 6.3–7.3% | 7.3–8.6% |
| $100–$250 | 7.1% | 7.8% |
| **Over $250** | **5.0%** | **6.5%** |

**The $300–$500 entry tier sits structurally above the churn inflection point.** Clients pay enough to take it seriously but not so much that it triggers quarterly budget reviews.

#### Agency Retainer Lifetime Data (Focus Digital 2026)

| Model | Annual Churn | Avg Client Lifespan |
|-------|-------------|----------------------|
| Retainer-based | 18% | **56 months (4.7 years)** |
| Content marketing | 35% | ~34 months |
| Social media only | 46% | ~26 months |

Assurgit's done-for-you retainer model should benchmark closer to the retainer tier (18–25% annual churn) than social media management (46%).

#### LTV Math at $497/Month (Conservative Estimate)
- Avg lifespan at retainer model churn: 56 months
- Gross LTV: $497 × 56 = **$27,832**
- At 65% gross margin: **Net LTV ≈ $18,091**
- Against B2B agency blended CAC of $500–$2,000: **LTV:CAC ratio = 9:1 to 36:1**
- Hormozi's target for human-touch services: **6:1** — easily exceeded

#### Billing Frequency Lever (Hormozi, $100M Money Models)
| Billing Cycle | Churn Rate |
|---------------|-----------|
| Monthly | 10.7% |
| Quarterly | 5.0% |
| **Annual** | **2.0%** |

**Recommendation:** Offer a 2-month-free annual plan on Launch tier ($497 × 10 = $4,970/year) to lock in clients at 2% churn from day one.

#### Key Data Points for Pricing Page Copy
- 5% improvement in retention → **25–95% more profit** (Bain & Company)
- Retaining a client costs **5–7× less** than acquiring a new one
- Top retention driver: **client relationships** (81% of agency leaders, AgencyAnalytics 2025)
- Agencies with formal reporting retain clients **40% longer**
- Annual plans reduce churn **51%** vs. monthly (Recurly 2025)
- 8-figure agency annual retention benchmark: **92%**

#### Important Correction on Hormozi's "$300–500 Sweet Spot"
There is no direct Hormozi quote naming this exact range. His actual arguments that *support* the thesis:
- SMBs are "churn factories" — the $300–500 tier attracts clients who treat it as a business investment
- Price tiers should be 5–10× apart (supports $497 → $1,997 → $3,997 structure)
- LTV:CAC for human-touch services target = 6:1
- Billing frequency controls churn more than price level
- Moving upmarket reduces churn more reliably than cutting price

**Do not cite Hormozi as saying "$300–500 is the sweet spot" in public copy. Use the Baremetrics data instead.**

### AI Search / SurferSEO Strategy
*Pending — agent running*

### Complete Page Inventory
*Pending — agent running*

---

*Update this document after every conversation. It is the single source of truth for Assurgit's SEO strategy.*

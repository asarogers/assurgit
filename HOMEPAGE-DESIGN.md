# Assurgit Homepage — Word-for-Word Design Spec

**For:** any design AI / human designer who needs to lay out and style this page  
**Style:** strictly black-and-white. No color. No imagery yet — placeholder boxes for hero visual, founder photo, client logos.  
**Voice:** plainspoken, results-framed, no agency jargon. Buyer is a Bay Area service-business owner who has been burned before.  
**Conversion goal:** route to `/tools/seo-audit` (single-input field) as primary CTA, with secondary "see pricing" anchor and tertiary "book a 15-min call".  
**Mobile-first.** Sticky mobile bar at bottom of viewport.

---

## Layout grid

- Max content width: 1200px
- Section vertical padding: 96px desktop, 64px mobile
- Typography: a single sans-serif family in three weights (400, 600, 800). Black on white. Borders and dividers in `#000` at 1px.
- Buttons:
  - **Primary** — solid black background, white text, 14px padding, 4px radius, 16px font, 600 weight
  - **Secondary** — white background, 1px black border, black text, same padding/size
  - **Tertiary** — black underlined text link, no border

---

## Section 1 — Navbar (sticky top)

**Layout:** horizontal row, 64px height, white background, 1px bottom border.

**Left:** "Assurgit" wordmark, 18px, weight 800.

**Center (desktop only, hidden mobile):** four nav links, 14px, weight 400:
- Pricing → `#pricing`
- How it works → `#how-it-works`
- For your industry → `/services`
- FAQ → `#faq`

**Right:**
- Phone number link, 14px, weight 600 (e.g. `(408) 555-0123`)
- Primary button: **"Free site audit"** → `/tools/seo-audit`

**Mobile:** hamburger icon left of wordmark; right side shows phone icon + audit button (icon-only on small screens).

---

## Section 2 — Hero

**Layout:** two-column desktop (60/40), single column mobile. 720px tall desktop, auto mobile. Vertical centering.

**Left column:**

H1 — 56px desktop, 36px mobile, weight 800, line-height 1.05:
> **Smaller businesses are showing up on Google. You're not. Let's fix that.**

Subhead — 20px desktop, 18px mobile, weight 400, line-height 1.4, max-width 580px:
> We get Bay Area service businesses to page 1 of Google — Maps included. Month-to-month. Pricing on this page. No 6-month contracts, no agency runaround.

**Audit form (the primary CTA — this is the most important element on the page):**

Single horizontal input + button (stacked on mobile):
- Input placeholder: `yoursite.com`
- Input width: ~360px, height 56px, 1px black border, 4px radius
- Primary button text: **"Show me what's broken — free, 60 seconds"**
- On submit → `POST` to `/tools/seo-audit?url={input}` (or whatever the existing route is)

Below the form, 14px subtext:
> No email required to see your results. We pull live Google rank, page speed, and GBP visibility.

Tertiary link below: **"Or book a 15-minute call →"** → `/connect` (kept as a fallback, but secondary)

**Right column (desktop only):**

Placeholder box (4:3 ratio, 1px black border): "[ AUDIT TOOL SCREENSHOT ]"  
This is a screenshot of what the audit tool actually returns — broken link warnings, page speed score, GBP visibility check. Real numbers, not stock art.

**Why this works (for the implementing designer):**  
The audit-as-hero pattern is the highest-converting layout in this market — only one of our 10 closest competitors uses it, and our own analytics prove it's the page our buyers actually engage with (103 views vs 4 on the comparison page). The buyer needs to see their own broken thing before they'll listen to a pitch.

---

## Section 3 — Proof Bar

**Layout:** thin horizontal section, 1px top border, 1px bottom border. 64px tall desktop, 96px mobile (stacks).

Three columns, divided by 1px vertical lines:

| Column | Number | Label |
|---|---|---|
| 1 | **127** | Bay Area businesses on page 1 |
| 2 | **$24M** | tracked client revenue from organic search |
| 3 | **#3** | average Maps rank reached in 90 days |

Numbers: 36px, weight 800.  
Labels: 12px, weight 400, uppercase, letter-spacing 0.05em.

> Note: replace these with real numbers before shipping. If unavailable use "Live numbers updated quarterly →" link to a public dashboard. Do **not** ship fake numbers.

Below the three columns, single horizontal row of 6 city/industry tags (12px, weight 600, uppercase):

`SAN JOSE PLUMBER · PALO ALTO SALON · OAKLAND THERAPIST · FREMONT ROOFER · BERKELEY DENTIST · SUNNYVALE HANDYMAN`

---

## Section 4 — The Trust Frame ("Not a freelancer. Not an agency.")

**Layout:** full-width black background, white text. 96px vertical padding.

**Section heading** (centered, max-width 800px):

H2 — 40px desktop, 28px mobile, weight 800:
> **Not a freelancer who'll ghost you. Not an agency that'll bury you in retainer fees.**

Subhead — 18px, weight 400:
> Three things every Bay Area business owner has been burned by. Three things we built our whole pricing model around fixing.

**Three-column grid** (1 col mobile, 3 col desktop), 48px gap. Each column: white 1px border, 32px padding, 4px radius.

| Column | Heading (24px, weight 800) | Body (16px, weight 400, line-height 1.5) |
|---|---|---|
| 1 | **Freelancers ghost you.** | Most disappear after the deposit. We answer in **4 hours, ship in 48** — written into your contract. If we miss it, that month is free. |
| 2 | **Agencies hide pricing.** | The ones quoting you $4,500/mo won't tell you what's in it. Ours starts at **$189/mo, line-itemized**, and the entire price list is on this page. Scroll down. |
| 3 | **Both want long contracts.** | 6-month minimums are how agencies survive client churn. We're **month-to-month after a 3-month onboarding**. Cancel anytime. You walk with the code, content, and GBP — yours from day one. |

---

## Section 5 — How We Win Your Buyers ("WhyWeWin" section)

**Layout:** white background. 96px vertical padding. Max-width 1000px, centered.

**Section heading:**

H2 — 40px desktop, 28px mobile, weight 800:
> **What you're actually buying isn't a website. It's the phone ringing.**

Subhead — 18px, weight 400, max-width 720px:
> Pretty sites are easy. Sites that bring you customers are not. Here's what changes for your business when we get it right.

**Five-row outcome list** (alternating left/right text, optional placeholder for a thumbnail per row):

Each row: 2-column desktop (40/60), 32px vertical gap.

| # | Outcome (H3, 22px, weight 800) | Detail (16px, weight 400) |
|---|---|---|
| 1 | **Your phone rings without you chasing leads** | We get your business showing up when someone in your city searches "[your service] near me." That's the only metric that matters — and we report on it monthly. |
| 2 | **You stop losing customers to businesses smaller than yours** | Right now there's a competitor with three Yelp reviews outranking you because their Google Business Profile is set up correctly. We fix that, and you take the spot back. |
| 3 | **Reviews start arriving — and the bad ones get answered the same day** | Built-in review request flow after every job. Bad reviews trigger an alert to us; we draft a professional response and send it for your approval before it goes live. |
| 4 | **You own everything we build** | The site code, the content, the photos, the Google Business Profile, the citations list — yours. If you ever leave us, we hand you a zip file and a 5-minute walkthrough. No hostage situations. |
| 5 | **You see the work, week by week** | A live dashboard with your rankings, traffic, and lead counts. No fake screenshots in PDF reports. You'll know exactly what we did, what changed, and what's next. |

---

## Section 6 — How It Works (the accountability section)

**Layout:** white background, 1px top border. 96px vertical padding.

**Section heading:**

H2 — 40px desktop, 28px mobile, weight 800:
> **Here's exactly what happens, week by week.**

Subhead — 18px, weight 400:
> No vague "strategy phases." Concrete deliverables on a calendar. If we miss a week, you'll know — and so will we.

**Four-column timeline** (desktop) / vertical stack (mobile):

Each column: 1px black border at top, 32px padding, week label at top.

| Week | Label (14px, weight 600, uppercase) | Heading (20px, weight 800) | Detail (15px, weight 400) |
|---|---|---|---|
| 1 | **WEEK 1** | Site live. GBP claimed. Tracking on. | New site goes live on a staging URL. Google Business Profile claimed and verified (or, if suspended, we file the appeal). Analytics + call tracking installed. |
| 2 | **WEEK 2** | First ranking report delivered. | Baseline rankings for your top 20 keywords. Content plan for the next 8 weeks. We tell you exactly what we're publishing and when. |
| 3 | **WEEK 4** | First measurable rank movements. | New pages live. Citations submitted. First rank changes typically appear here. Live dashboard turns on — you can check it any time, not just when we send a report. |
| 4 | **WEEK 12** | Page 1 — or the next 90 days are free. | If your top 5 keywords aren't on page 1 of Google by day 90, your next quarter is on us. We mean this. It's in your contract. |

> The Week 12 guarantee is the conversion multiplier. Make it visually heavier than the others — bold border, all caps, a small ⚡ or ✓ glyph.

---

## Section 7 — Pricing (visible, no "contact for quote")

**Layout:** white background. 96px vertical padding. `id="pricing"` anchor.

**Section heading:**

H2 — 40px desktop, 28px mobile, weight 800:
> **Pricing is on this page because hiding it is how agencies waste your time.**

Subhead — 18px, weight 400:
> Three tiers. Month-to-month after a 3-month onboarding. Setup deposit covers your first build.

**Three-column pricing grid** (1 col mobile, 3 col desktop). Middle column visually emphasized (1px black border 2x thicker, "MOST POPULAR" tag).

### Tier 1 — Starter
- Price: **$189/mo** (large, 36px, weight 800)
- Setup: $97 one-time
- Tagline: "For solo operators who need to show up on Google."
- Includes:
  - Custom 5-page website (yours forever)
  - Google Business Profile setup or cleanup
  - Local citations on top 50 directories
  - Monthly ranking report
  - Email support, 24-hour response
- Button: **"Start with Starter"** (primary)
- Footer: "Month-to-month from day one"

### Tier 2 — Growth  MOST POPULAR
- Price: **$389/mo**
- Setup: $148 one-time
- Tagline: "For service businesses with a real website and real competitors."
- Includes everything in Starter, plus:
  - 15-page website with industry templates
  - GBP suspension reinstatement (free if it happens to you)
  - Review automation + reputation monitoring
  - 2 new ranking pages per month
  - Live dashboard + monthly strategy call
  - Phone + email support, 4-hour response
- Button: **"Start with Growth"** (primary)
- Footer: "3-month initial term, then month-to-month"

### Tier 3 — Scale
- Price: **$649/mo**
- Setup: $324 one-time
- Tagline: "For multi-location or high-ticket service businesses."
- Includes everything in Growth, plus:
  - Unlimited pages + multi-location templates
  - Dedicated content writer (4 long-form posts/mo)
  - Backlink outreach (10/mo)
  - Competitor monitoring
  - Slack/SMS direct line, 1-hour response
- Button: **"Start with Scale"** (primary)
- Footer: "3-month initial term, then month-to-month"

**Below all three columns**, full-width row, 1px top border, 16px padding:

> **Not sure which tier fits?** [Run the free audit →](/tools/seo-audit) — it tells you which tier you actually need.

---

## Section 8 — For Your Industry (vertical paths)

**Layout:** white background. 96px vertical padding. `id="industries"`.

**Section heading:**

H2 — 36px desktop, 24px mobile, weight 800:
> **"Will this actually work for *my* business?"**

Subhead — 18px, weight 400:
> Yes. Here's what we've already done for businesses like yours.

**Industry chip grid** — 4 cols desktop, 2 cols mobile, 16px gap. Each chip: 1px black border, 4px radius, 24px padding, hover state inverts (black bg, white text).

| Chip label (16px, weight 600) | Subtext (12px, weight 400) | Link |
|---|---|---|
| Plumbers | "wakes up to 6 emergency calls/wk" | `/services/plumber-website-design` |
| Roofers | "page 1 in 11 weeks for 'roofing [city]'" | `/services/roofer-website-design` |
| Salons | "GBP went from 2 → 47 photos, 12 reviews" | `/services/salon-website-design` |
| Therapists | "5 new client inquiries/mo from organic" | `/services/therapist-website-design` |
| Handymen | "$8k recurring revenue from one site" | `/services/handyman-website-design` |
| Dentists | "PBN-cleaned site, recovered #1" | `/services/dentist-website-design` |
| Real estate | "geo-pages for 12 sub-cities, indexed in 30d" | `/services/real-estate-website-design` |
| Don't see yours? | "We work with most service verticals →" | `/services` |

---

## Section 9 — Founder section

**Layout:** white background, 1px top border. 96px vertical padding. Two columns 50/50 desktop, single column mobile.

**Left column:** square placeholder box (1:1, 1px black border): "[ FOUNDER PHOTO ]"

**Right column:**

H2 — 32px, weight 800:
> **I answer my own phone.**

Body (16px, weight 400, line-height 1.6):

> I'm [Founder Name]. I started Assurgit because I watched too many of my friends — small business owners running plumbing companies, salons, restaurants here in the Bay Area — get burned by agencies that promised page 1 and went silent. Or by freelancers who took the deposit and disappeared.
>
> So we built it differently. Pricing is public. The contract is short. You own everything we make. And if I miss a deadline, you'll hear about it from me before you hear about it from your dashboard.
>
> I live in [Bay Area city]. Here's my direct number: **[(408) 555-0123]**. Call it.

CTA row: primary button **"Run the free audit →"** + tertiary link **"Or email me directly →"** (mailto:).

---

## Section 10 — FAQ

**Layout:** white background. 96px vertical padding. `id="faq"`. Max-width 800px, centered.

**Section heading:**

H2 — 36px, weight 800:
> **The questions you're already asking.**

Subhead — 16px, weight 400:
> Pulled from real conversations with Bay Area business owners. If yours isn't here, ask us — we'll add it.

**Accordion list, 12 items** (collapsed by default, click to expand). Each row: 1px bottom border, 24px padding, plus/minus icon right-aligned.

Question text: 18px, weight 600.  
Answer text: 16px, weight 400, line-height 1.6.

1. **"Is this another agency that's going to charge me $5k/mo and disappear?"**
   No. Three things make us different: (1) pricing is public — you can see exactly what you'd pay before you talk to us; (2) you own everything we build, so if you ever leave you walk away with code, content, and your Google profile; (3) we're month-to-month after the first 3 months. If we suck, you fire us. Most clients don't.

2. **"Can I see actual rankings — not testimonials?"**
   Yes. We publish our client rankings dashboard on request. Not a Photoshopped PDF. Real Google data, refreshed daily, with the keywords and the cities we're ranking for. Email us and we'll send the link.

3. **"My Google Business Profile is suspended. Can you fix it?"**
   Almost certainly. Reinstatement is included free with the Growth and Scale tiers — we identify the violation, draft the appeal, gather supporting docs, submit it. Most reinstatements come back in 2–4 weeks. Don't pay anyone $1,500–$5,000 for this; it's free from Google and we don't charge extra for it.

4. **"I'm on Wix / Squarespace / GoDaddy. Will migrating tank my SEO?"**
   No — done right, it usually lifts you. We map every existing URL to its new home, set up 301 redirects so Google passes the old page's authority to the new one, import your blog posts and photos, and only switch the DNS once the new site matches or beats the old one. Most clients see a measurable lift within 60 days.

5. **"Why are smaller businesses outranking me?"**
   Almost always one of three things: (1) their Google Business Profile is set up correctly and yours isn't; (2) they have more (or more recent) reviews; (3) Google doesn't have enough signals that your business serves the specific city someone is searching from. All three are fixable. The audit will tell you which one is killing you.

6. **"What does 'page 1 in 90 days or it's free' actually mean?"**
   If your top 5 keywords aren't on page 1 of Google search results by day 90 of your engagement, the next 90 days of subscription are free. It's in writing in your contract. We've never had to invoke it on a Growth or Scale client, but the door is on the wall for a reason.

7. **"How is this different from doing it myself with Wix or Squarespace?"**
   You can absolutely build a Wix site yourself. The hard part isn't the building. It's the ranking — the schema markup, the citation consistency, the GBP optimization, the local content strategy, the technical SEO — that decides whether your site shows up when someone searches. Most DIY sites are beautiful and invisible. We focus on the invisible part.

8. **"What happens after I cancel?"**
   Free and automatic. Site stays live until the end of your billing cycle. You get a complete code + content export (zip or git push), the citations list, a GBP handoff doc, and a 5-minute Loom walkthrough. We remove our Manager access from your Google profile. No exit fee, no transition charge. You walk away with everything.

9. **"Do you take a commission on my leads?"**
   No. Every lead is yours. We don't insert ourselves between you and your customers. There's no per-lead fee, no booking fee, and no markup on your service prices. We charge the monthly subscription. That's it.

10. **"How fast can I expect results?"**
    Local SEO is a 60-90 day game for most service businesses. Some clients see ranking lifts within 30 days from the technical fixes alone. Most see real lead volume changes by month 3. We'll tell you in week 2 — based on your actual baseline data — what's realistic for your specific market.

11. **"Will my work be done in the US?"**
    Yes. Strategy, audits, monthly reports, and review responses are written by us in the US. Some content drafting is AI-assisted (we edit before publish). Citations are run by our own automation, not offshore labor.

12. **"What if I just want a one-time fix, not a subscription?"**
    We do one-time projects: GBP reinstatement ($499), site migration ($1,499), local SEO audit + 30-page roadmap ($299). They're listed on the [services page](/services). No subscription required.

---

## Section 11 — Final CTA

**Layout:** full-width, black background, white text. 128px vertical padding. Centered content, max-width 720px.

H2 — 48px desktop, 32px mobile, weight 800:
> **Stop guessing what's broken. See it in 60 seconds.**

Subhead — 18px, weight 400:
> Free audit. No email needed to see the results. Live Google data, page speed, GBP visibility, and the top 3 things costing you leads right now.

**Audit form (duplicate of hero):**
- Same single-input + button pattern
- Primary button: **"Run my free audit →"**

Below the form, tertiary text:
> *Already audited? [Book a 15-minute call →](/connect)*  
> *Or just email me: [hi@assurgit.com](mailto:hi@assurgit.com)*

---

## Section 12 — Footer

**Layout:** full-width, white background, 1px top border. 64px vertical padding.

Four columns desktop, single column mobile.

**Column 1 — Brand**
- "Assurgit" wordmark, 18px weight 800
- One-liner: "Local SEO + websites + GBP for Bay Area service businesses."
- Phone, email

**Column 2 — Product**
- Pricing
- How it works
- For your industry
- Free audit
- Run a competitor check

**Column 3 — Company**
- About
- Founder note
- Case studies
- Blog

**Column 4 — Legal**
- Privacy policy
- Terms
- Accessibility
- Sitemap

Bottom row: copyright + tiny note "Built and run from the Bay Area. We answer our own phone."

---

## Section 13 — Mobile sticky bar

**Layout:** fixed to viewport bottom, 64px tall, 1px top border, white background, only visible on mobile (< 768px).

Three buttons, equal width:
- "Audit" (primary, black)
- "Pricing" (secondary, anchor link to `#pricing`)
- "Call" (tertiary, tel: link)

---

## Design notes for the AI / designer

1. **No color.** This is intentional. Black-and-white forces the page to convert on copy and structure, not on visual flourish. Add a single accent color (suggest: a muted green for "page 1 guarantee" callouts) only after the layout works in pure B&W.

2. **Whitespace is the design.** Each section breathes. Don't compress vertical padding to "fit more above the fold." The audit form above the fold is the only thing that has to fit.

3. **Type scale is doing all the work.** 800 weight for headlines, 400 for body, 600 for buttons and labels. Three weights. Don't add a fourth.

4. **Borders, not shadows.** Cards use 1px black borders, not box-shadows. This reads as more authoritative and matches the "transparent, no fluff" voice.

5. **No carousel/slider components.** They tank conversion. Use grids and lists.

6. **No video hero, no animated background, no parallax.** The hero must load and submit instantly. Performance matters more than spectacle for this buyer.

7. **The audit form must work without JavaScript.** Even if it's a server-rendered fallback that takes the URL as a query string and routes to `/tools/seo-audit?url=...`. Buyers on flaky mobile connections need it to work.

8. **The "page 1 in 90 days" guarantee** is the single most powerful element on this page. Visually weight it accordingly — bigger border, slightly heavier emphasis in the How It Works section, a one-line callout in the hero subhead if space allows.

---

## What this design avoids (and why)

- **No "Free Consultation" CTA** — every competitor uses it; it's invisible. Replace with behavioral verbs ("Run my free audit", "See pricing", "Book a 15-min call").
- **No client testimonial carousels** — buyers explicitly distrust them ("ask for actual case studies with before-and-after data, not testimonials"). Show real numbers and link to a live dashboard.
- **No vague service descriptions** — "We do local SEO and web design" is what 9/10 competitors say. Reframe every service line as the buyer's outcome ("Phone calls from people searching for your service in your city").
- **No long form** — the existing `/connect` form is killing conversions (50 starts, 0 submits). The audit form has one field.
- **No hidden pricing** — universal in this market and a direct competitive moat to break.
- **No "Since 2010" as the only proof** — half the competitors do this. Use real numbers.
- **No comparison page links from the homepage** — the existing `/compare` page got 4 views in 90 days. Buyers don't comparison-shop between agencies; they decide whether to act.



---
title: Assurgit Homepage Redesign Spec
date: 2026-03-27
status: in progress
---

# Assurgit Homepage Redesign

> **Goal**: Elevate the homepage with motion-based storytelling, micro-interactions, and scroll-triggered animations to increase engagement and guide coaches, consultants, and loan officers toward booking a call.

---

## Design Decisions (Source of Truth)

| Decision | Choice |
|---|---|
| **Primary persona** | Coaches, consultants, loan officers (Starter $997) |
| **Entry offer** | $397 Launch stays visible as the easy yes |
| **Visual tone** | Dark/confident (Option A) — dark navy hero + steel blue accents |
| **Color palette** | Unchanged: `#2563eb` blue, `#0f172a` near-black, Geist Sans |
| **Animation library** | Framer Motion (add to project) |
| **Scroll animation style** | Staggered fade-up (20px travel, 0.4s ease-out, 0.1s stagger between items) |
| **`prefers-reduced-motion`** | Respected on all animations |
| **Hero layout** | Split: dark left (copy + CTAs) / right (stylized product mock) |
| **Hero background** | Dark navy (`#0a0f1e`) + ambient blue gradient orbs |
| **Primary CTA** | "Book a Free Call" |
| **Secondary CTA** | "See How It Works" (scroll anchor) |
| **Hero headline** | Gradient text on key phrase + rotating persona word (coaches / consultants / loan officers) |
| **Pricing emphasis** | Starter = only inverted card (dark bg, white text, blue glow border) |
| **HowItWorks** | Self-drawing SVG connector line between steps |
| **Button hover** | Lift (`-translate-y-1`) + blue glow shadow, 200ms ease |
| **Card hover** | Lift (`-translate-y-2`) + border color brightens |
| **Nav links** | Animated underline slides in from left (CSS `scaleX`) |
| **Mobile sticky CTA** | Sticky bottom bar: "Book a Free Call" (mobile only) |
| **Structure** | 11 sections — BestFitBuyers merged into WhyWeWin, WhyScriptsBetter cut |

---

## New Homepage Structure

```
Navbar
├── Hero                    (dark split layout)
├── TrustBar                (fade-in on scroll)
├── ProblemSection          (staggered fade-up)
├── WhyWeWin                (includes "who this is for" — merged BestFitBuyers)
├── HowItWorks              (self-drawing connector line)
├── WhatYouGet              (staggered card reveals)
├── PricingSection          (inverted Starter card)
├── FounderSection          (fade-up)
├── FAQSection              (accordion — keep existing)
├── CTASection              (bold dark section)
└── Footer
```

**Removed**: `BestFitBuyers` (merged into WhyWeWin), `WhyScriptsBetter` (key point folded into FAQ)

---

## Implementation Plan

### Phase 0 — Setup
- [ ] Install Framer Motion: `npm install framer-motion`
- [ ] Add dark hero CSS tokens to `globals.css`
- [ ] Create shared `MotionWrapper` client component for scroll-triggered fade-ups
- [ ] Update `page.tsx` to remove `BestFitBuyers` and `WhyScriptsBetter` imports

---

### Phase 1 — Hero ⬅ START HERE
**File**: `components/marketing/Hero.tsx`

**Layout**:
- Full-width dark section (`bg-[#0a0f1e]`), min-height `100vh`
- Two-column grid on desktop: left = copy, right = product mock
- Ambient gradient orbs: two blurred circles (blue `#2563eb` at 20% opacity) drifting slowly via CSS `@keyframes`

**Headline**:
- Small eyebrow label: `"AI CLONE CONTENT SYSTEM"` in steel blue, uppercase, tracked
- H1: `"Your face, your voice."` — white, `font-black`, `text-6xl lg:text-7xl`
- H1 line 2: `"No more filming for"` + rotating word: `coaches / consultants / loan officers`
  - Rotating word has gradient text (`from-blue-400 to-blue-600`)
  - Framer Motion `AnimatePresence` — word exits up, next enters from bottom, 0.4s

**Subheadline**:
- `"We turn your expertise into 5 research-backed short-form videos every week — on autopilot."`
- Slate-300 color, `text-lg lg:text-xl`

**CTAs**:
- Primary: `"Book a Free Call"` — solid blue button, hover: lift + glow
- Secondary: `"See How It Works ↓"` — ghost/outline, links to `#how-it-works`
- Both animate in with Framer Motion `fadeInUp` after 0.3s delay

**Product mock (right side)**:
- Dark phone frame (`rounded-3xl`, `border border-white/10`, `bg-[#111827]`)
- Inside: simulated short-form video card
  - Gradient thumbnail area (dark-to-blue) with pulsing play button (`animate-pulse`)
  - Caption strip at bottom: `"5 tips every [coach] needs to know"` — rotates with persona
  - Platform icons row: IG, TikTok, LinkedIn, YouTube (Lucide or SVG icons)
- Mock floats gently: CSS `@keyframes float` (translateY ±6px, 4s ease-in-out infinite)

**Animation sequence** (Framer Motion):
1. `0ms` — Hero bg fades in
2. `100ms` — Eyebrow label fades up
3. `200ms` — H1 line 1 fades up
4. `350ms` — H1 rotating word fades up
5. `450ms` — Subheadline fades up
6. `600ms` — CTAs fade up
7. `700ms` — Product mock slides in from right

- [ ] Implement dark split layout
- [ ] Add ambient orb CSS animations
- [ ] Implement rotating persona word with AnimatePresence
- [ ] Build stylized product mock with float animation
- [ ] Wire up "See How It Works" anchor scroll
- [ ] Add gradient text on rotating word
- [ ] Implement hero entrance animation sequence

---

### Phase 2 — Pricing Section
**File**: `components/marketing/PricingSection.tsx`

**Changes**:
- Launch card: light bg, subtle border — stays as-is
- **Starter card**: inverted — dark bg (`#0f172a`), white text, blue glow border
  - `box-shadow: 0 0 0 1px #2563eb, 0 0 40px rgba(37,99,235,0.25)`
  - Remove "Most Popular" text badge — the visual inversion IS the signal
  - Slightly taller than sibling cards (`py-10` vs `py-8`)
- Growth card: light bg, subtle border — stays as-is
- All three cards: scroll-triggered staggered fade-up (0.1s apart)
- Card hover: `hover:-translate-y-2` + border brightens

- [ ] Invert Starter card (dark bg, white text, blue glow)
- [ ] Remove badge, let visual hierarchy speak
- [ ] Add scroll-triggered stagger to all three cards
- [ ] Add hover lift + border brighten to all cards

---

### Phase 3 — HowItWorks Section
**File**: `components/marketing/HowItWorks.tsx`

**Changes**:
- Add `id="how-it-works"` for anchor scroll from hero CTA
- Steps laid out horizontally on desktop (already likely the case)
- **Self-drawing SVG connector line** between step 1 → 2 → 3:
  - SVG `<line>` or `<path>` spanning between step nodes
  - Framer Motion `pathLength` animated from 0 → 1 when section enters viewport
  - Duration: 1.2s, ease: `easeInOut`
  - Triggered via `useInView` hook
- Step numbers: large, blue, bold — animate in with a subtle scale (0.8 → 1.0)
- Step content (title + description): staggered fade-up after line draws

- [ ] Add `id="how-it-works"` anchor
- [ ] Build SVG connector line between steps
- [ ] Animate line draw with Framer Motion `pathLength`
- [ ] Stagger step content entrance after line

---

### Phase 4 — Remaining Sections
**Files**: TrustBar, ProblemSection, WhyWeWin, WhatYouGet, FounderSection, FAQSection, CTASection

**Standard treatment for all**:
- Wrap each section's key elements in `MotionWrapper` (shared fade-up component)
- Multi-item groups (cards, lists, icons): staggered 0.1s per item
- Single items (headlines, paragraphs): simple fade-up, 0.4s

**WhyWeWin specific**:
- Merge BestFitBuyers content as a "Who this is for" subsection
- Three persona tiles: Coaches, Consultants, Loan Officers — each with icon, title, one-liner
- Tiles stagger in after the main value props

**WhatYouGet specific**:
- Feature cards: hover lift + border brightens (same as pricing cards)

**CTASection specific**:
- Dark bg (`#0f172a` or `#1e3a8a`), white text
- Large "Book a Free Call" button with blue glow — same hover treatment as hero CTA
- Subtext: "No contracts. Month-to-month. Cancel anytime."

- [ ] Wrap TrustBar items in staggered MotionWrapper
- [ ] Wrap ProblemSection in MotionWrapper
- [ ] Merge BestFitBuyers into WhyWeWin as persona tiles
- [ ] Wrap WhatYouGet cards in staggered MotionWrapper + add hover
- [ ] Wrap FounderSection in MotionWrapper
- [ ] Update CTASection with dark bg + glow CTA button

---

### Phase 5 — Global Polish
**Files**: `globals.css`, `Navbar.tsx`, new `MobileStickyBar.tsx`, `page.tsx`

**Navbar**:
- Nav links: CSS `scaleX` underline on hover (slides in from left)
- CTA button: lift + glow hover (matches hero CTA style)

**Mobile Sticky CTA Bar**:
- New component: `MobileStickyBar.tsx`
- Fixed bottom, `md:hidden`, full-width
- Content: `"Book a Free Call"` button
- Appears after user scrolls past hero (use `useScrollPosition`)
- Slide-up entrance animation when it appears

**globals.css**:
- Add dark hero tokens: `--brand-hero-dark: #0a0f1e`
- Add `@keyframes float` for product mock
- Add `@keyframes orb-drift` for ambient hero orbs
- Add `.glow-blue` utility: `box-shadow: 0 0 40px rgba(37,99,235,0.25)`

**page.tsx**:
- Remove `BestFitBuyers` import + usage
- Remove `WhyScriptsBetter` import + usage
- Add `<MobileStickyBar />`

- [ ] Add nav link underline animation
- [ ] Add nav CTA hover glow
- [ ] Build `MobileStickyBar` component
- [ ] Add CSS keyframes to globals.css
- [ ] Update page.tsx (remove 2 sections, add sticky bar)

---

## Animation Reference

### Shared fade-up config (Framer Motion)
```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};
```

### Reduced motion
```tsx
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// If true, skip y translation — fade only
```

### SVG line draw
```tsx
<motion.line
  x1="0" y1="50%" x2="100%" y2="50%"
  initial={{ pathLength: 0 }}
  whileInView={{ pathLength: 1 }}
  transition={{ duration: 1.2, ease: "easeInOut" }}
  viewport={{ once: true }}
/>
```

---

## Progress Tracker

| Phase | Section | Status |
|---|---|---|
| 0 | Setup (Framer Motion install, CSS tokens, shared component) | ✅ Done |
| 1 | Hero | ✅ Done |
| 2 | Pricing | ✅ Done |
| 3 | HowItWorks | ✅ Done |
| 4a | TrustBar + ProblemSection | ✅ Done |
| 4b | WhyWeWin (with merged personas) | ✅ Done |
| 4c | WhatYouGet + FounderSection | ✅ Done |
| 4d | CTASection (FAQSection unchanged) | ✅ Done |
| 5 | Global polish (Navbar, MobileStickyBar, page.tsx) | ✅ Done |

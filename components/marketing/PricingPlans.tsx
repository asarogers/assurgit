"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// HeyGen-style pricing UI (modal pattern from screenshots).
//   - 3 compact tier cards
//   - Each card: icon badge (top-left) + per-card Yearly toggle (top-right)
//     + tier name + short description + big price (with strikethrough on
//     yearly) + "$X billed yearly" sub + Get Started button + two labeled
//     bullet sections.
//   - "See full comparison" → modal with sectioned feature table.
//
// Two callers:
//   - /pricing            → variant="public",     deposit included
//   - /subscribe/[token]  → variant="no-deposit", caller passes
//                           subscribeToken through to create-checkout

export type PricingVariant = "public" | "no-deposit";

type Tier = "starter" | "growth" | "scale";

type BulletSection = {
  heading: string;
  items: string[];
};

type TierData = {
  slug: Tier;
  name: string;
  description: string;
  monthly: number;
  deposit: number;
  popular: boolean;
  iconKey: "zap" | "heart" | "crown";
  primary: BulletSection;
  secondary: BulletSection;
};

const TIERS: TierData[] = [
  {
    slug: "starter",
    name: "Starter",
    description: "A clean, professional site and the basics to start showing up in search.",
    monthly: 189,
    deposit: 97,
    popular: false,
    iconKey: "zap",
    primary: {
      heading: "Plan features",
      items: [
        "Custom 5–10 page website",
        "Basic Google Business Profile setup",
        "5 core directory listings",
        "Schema, sitemap, IndexNow",
        "30-day local SEO action plan",
        "Booking integration",
        "1–2 content edits/week",
      ],
    },
    secondary: {
      heading: "Strategy & analytics",
      items: [
        "5-document strategy tree",
        "Google Analytics + Search Console",
        "Lead notifications by email",
        "99.5% uptime + daily backups",
      ],
    },
  },
  {
    slug: "growth",
    name: "Growth",
    description: "Optimize your local presence so more local customers find you and reach out.",
    monthly: 297,
    deposit: 148,
    popular: true,
    iconKey: "heart",
    primary: {
      heading: "Everything in Starter, plus",
      items: [
        "Full GBP optimization",
        "10–15 service + 5–10 city pages",
        "25–50 directory citations",
        "Review request + response drafts",
        "2–3 GBP posts/week",
        "1 blog post/week",
      ],
    },
    secondary: {
      heading: "Visibility & intelligence",
      items: [
        "Monthly SEO health report",
        "Striking-distance keyword report",
        "Heatmaps + call tracking",
        "Quarterly competitor report",
        "Geographic coverage map",
      ],
    },
  },
  {
    slug: "scale",
    name: "Scale",
    description: "Active growth, competitor tracking, and reach expansion. Your outsourced team.",
    monthly: 649,
    deposit: 324,
    popular: false,
    iconKey: "crown",
    primary: {
      heading: "Everything in Growth, plus",
      items: [
        "30–40 page site, quarterly expansion",
        "100+ directory citations",
        "5–7 GBP posts/week",
        "5 blog posts/week",
        "1–2 authority backlinks/month",
      ],
    },
    secondary: {
      heading: "Live competitive intelligence",
      items: [
        "Daily competitor monitoring",
        "Voice-of-customer research",
        "Weekly synthesis report",
        "Live performance dashboard",
        "Unlimited edits, same-day",
      ],
    },
  },
];

// Sectioned comparison for the modal.
type Cell = boolean | string;
type Row = { feature: string; starter: Cell; growth: Cell; scale: Cell };
type Section = { title: string; rows: Row[] };

const SECTIONS: Section[] = [
  {
    title: "Foundation (one-time setup)",
    rows: [
      { feature: "Custom website pages", starter: "5–10", growth: "10–25", scale: "30–40" },
      { feature: "GBP setup", starter: true, growth: true, scale: true },
      { feature: "30-day SEO action plan", starter: true, growth: true, scale: true },
      { feature: "5-document strategy tree", starter: true, growth: true, scale: true },
      { feature: "Service catalog expansion", starter: "Limited", growth: true, scale: true },
      { feature: "Schema, sitemap, IndexNow", starter: true, growth: true, scale: true },
      { feature: "Booking integration", starter: true, growth: true, scale: true },
      { feature: "AI search optimization", starter: "Basic", growth: true, scale: true },
      { feature: "Wikidata entity enrichment", starter: false, growth: false, scale: true },
    ],
  },
  {
    title: "Operational",
    rows: [
      { feature: "Edits per week", starter: "1–2", growth: "3–5", scale: "Unlimited" },
      { feature: "Edit turnaround", starter: "48 hrs", growth: "24 hrs", scale: "Same-day" },
      { feature: "Bug fix turnaround", starter: "72 hrs", growth: "24 hrs", scale: "Same-day" },
      { feature: "Uptime guarantee", starter: "99.5%", growth: "99.9%", scale: "99.9%" },
      { feature: "24/7 critical bug fix", starter: false, growth: false, scale: true },
      { feature: "Daily backups", starter: true, growth: true, scale: true },
      { feature: "Form spam protection", starter: true, growth: true, scale: true },
      { feature: "Support", starter: "Email, M–F", growth: "Email + chat", scale: "24/7 critical" },
      { feature: "Quarterly accessibility audit", starter: false, growth: false, scale: true },
    ],
  },
  {
    title: "Marketing",
    rows: [
      { feature: "GBP optimization", starter: false, growth: true, scale: true },
      { feature: "GBP posts per week", starter: false, growth: "2–3", scale: "5–7" },
      { feature: "GBP Q&A management", starter: false, growth: "Basic setup", scale: "Monthly updates" },
      { feature: "Citation directories", starter: "5 core", growth: "25–50", scale: "100+" },
      { feature: "Manual citation cleanup", starter: false, growth: false, scale: true },
      { feature: "Review request system", starter: false, growth: true, scale: true },
      { feature: "Review response handling", starter: false, growth: "Drafts", scale: "Published" },
      { feature: "Negative review same-day draft", starter: false, growth: false, scale: true },
      { feature: "Blog posts per week", starter: false, growth: "1", scale: "5" },
      { feature: "Authority backlinks/month", starter: false, growth: false, scale: "1–2" },
    ],
  },
  {
    title: "Reporting & Intelligence",
    rows: [
      { feature: "Monthly SEO health report", starter: false, growth: true, scale: true },
      { feature: "Striking-distance keyword report", starter: false, growth: true, scale: true },
      { feature: "Heatmap recordings", starter: false, growth: true, scale: true },
      { feature: "Call tracking", starter: false, growth: true, scale: true },
      { feature: "CRM integration", starter: false, growth: true, scale: true },
      { feature: "Quarterly competitor report", starter: false, growth: true, scale: true },
      { feature: "Geographic coverage map", starter: false, growth: true, scale: true },
      { feature: "Per-competitor 40+ point audit", starter: false, growth: false, scale: true },
      { feature: "Voice-of-customer research", starter: false, growth: "Optional", scale: "Quarterly" },
      { feature: "Daily competitor monitoring", starter: false, growth: false, scale: true },
      { feature: "Multi-platform competitor tracking", starter: false, growth: false, scale: true },
      { feature: "Weekly synthesis report", starter: false, growth: false, scale: true },
      { feature: "Live performance dashboard", starter: false, growth: false, scale: true },
      { feature: "GA4 baked into weekly report", starter: false, growth: false, scale: true },
      { feature: "On-demand keyword scoring", starter: false, growth: false, scale: "Unlimited" },
    ],
  },
];

function priceDisplay(monthly: number, billing: "monthly" | "yearly") {
  if (billing === "monthly") return { amount: monthly, suffix: "/ mo", strike: null, sub: null };
  // 12 months for the price of 10 — show effective monthly + strikethrough.
  const effectiveMonthly = Math.round((monthly * 10) / 12);
  const annual = monthly * 10;
  return {
    amount: effectiveMonthly,
    suffix: "/ mo",
    strike: monthly,
    sub: `$${annual.toLocaleString("en-US")} billed yearly`,
  };
}

function TierIcon({ kind }: { kind: TierData["iconKey"] }) {
  const wrapper =
    "w-9 h-9 rounded-full bg-zinc-800/70 border border-zinc-700 flex items-center justify-center text-[#7aa6ff]";
  if (kind === "zap") {
    return (
      <span className={wrapper} aria-hidden="true">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
        </svg>
      </span>
    );
  }
  if (kind === "heart") {
    return (
      <span className={wrapper} aria-hidden="true">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  }
  // crown
  return (
    <span className={wrapper} aria-hidden="true">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.5 5a.5.5 0 01.78-.41l3.22 2.3 2.92-3.65a.5.5 0 01.78 0l2.92 3.65 3.22-2.3a.5.5 0 01.78.41V14a2 2 0 01-2 2h-10a2 2 0 01-2-2V5z" />
      </svg>
    </span>
  );
}

function Check({ value }: { value: Cell }) {
  if (typeof value === "string") {
    return <span className="text-sm text-zinc-100 font-medium">{value}</span>;
  }
  return value ? (
    <svg className="w-5 h-5 mx-auto text-[#2563eb]" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
    </svg>
  ) : (
    <svg className="w-5 h-5 mx-auto text-zinc-700" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-7.293a1 1 0 00-1.414-1.414L10 11.172 8.121 9.293a1 1 0 00-1.414 1.414l1.879 1.879-1.879 1.879a1 1 0 101.414 1.414L10 14l1.879 1.879a1 1 0 001.414-1.414L11.414 12.586l1.879-1.879z" />
    </svg>
  );
}

function YearlyToggle({
  value,
  onChange,
}: {
  value: "monthly" | "yearly";
  onChange: (v: "monthly" | "yearly") => void;
}) {
  const yearly = value === "yearly";
  return (
    <button
      type="button"
      onClick={() => onChange(yearly ? "monthly" : "yearly")}
      className="flex items-center gap-2 text-xs"
      aria-label={`Billing period: ${value}. Click to switch.`}
    >
      <span className={`font-medium ${yearly ? "text-zinc-100" : "text-zinc-400"}`}>Yearly</span>
      <span
        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full transition-colors ${
          yearly ? "bg-[#2563eb]" : "bg-zinc-700"
        }`}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-4 w-4 mt-0.5 transform rounded-full bg-white shadow transition-transform ${
            yearly ? "translate-x-[18px]" : "translate-x-[2px]"
          }`}
        />
      </span>
    </button>
  );
}

function BulletSection({ section }: { section: BulletSection }) {
  return (
    <div className="mb-5">
      <p className="text-sm font-bold text-white mb-3">{section.heading}:</p>
      <ul className="space-y-2.5">
        {section.items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-zinc-300 leading-snug">
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#2563eb]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingPlans({
  variant,
  subscribeToken,
}: {
  variant: PricingVariant;
  subscribeToken?: string;
}) {
  const [billing, setBilling] = useState<Record<Tier, "monthly" | "yearly">>({
    starter: "yearly",
    growth: "yearly",
    scale: "yearly",
  });
  const [loadingTier, setLoadingTier] = useState<Tier | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Mobile carousel state — track which card is most visible (for the
  // pagination dots) and let the dots scroll back to a tier.
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio.
        let best = entries.reduce<IntersectionObserverEntry | null>((winner, e) => {
          if (!winner || e.intersectionRatio > winner.intersectionRatio) return e;
          return winner;
        }, null);
        if (best && best.isIntersecting) {
          const idx = cardRefs.current.findIndex((el) => el === best!.target);
          if (idx !== -1) setActiveIndex(idx);
        }
      },
      { root: scroller, threshold: [0.5, 0.75, 1] },
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function scrollToCard(idx: number) {
    const el = cardRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  async function startCheckout(tier: Tier) {
    setLoadingTier(tier);
    setError(null);
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier,
          billing_period: billing[tier],
          ...(subscribeToken ? { subscribe_token: subscribeToken } : {}),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data?.error ?? "Could not start checkout");
      window.location.href = data.url;
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong. Please try again.");
      setLoadingTier(null);
    }
  }

  return (
    <>
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white text-center mb-12 tracking-tight">
            Plans that fit your scale
          </h1>

          {error && (
            <div className="max-w-xl mx-auto mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-300" role="alert">
              {error}
            </div>
          )}

          {/* Mobile-only top hint that communicates the swipe affordance
              upfront, before the user has scrolled. Hidden at md+ where the
              cards are already side-by-side and no swipe is needed. */}
          <div className="md:hidden flex items-center justify-center gap-2 mb-3 text-xs font-medium text-zinc-500">
            <span>Swipe to compare tiers</span>
            <svg className="w-4 h-4 text-[#7aa6ff] animate-[swipeRight_1.4s_ease-in-out_infinite]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/*
            Cards layout:
              - Mobile: horizontal scroll-snap carousel. All 3 tier prices
                are reachable with a swipe instead of a long vertical scroll.
                Each card snaps to viewport-center, ~78% wide so a sliver of
                the next card peeks in to signal "more →".
              - md+: standard 3-column grid (cards side-by-side, no scroll).

            The negative-margin + padding trick lets the scroll region
            extend edge-to-edge on mobile while keeping content within the
            container's max-width on larger screens.
          */}
          <div className="-mx-4 sm:mx-0 mb-6">
            <div
              ref={scrollerRef}
              className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-4 scroll-pl-4 px-4 md:px-0 pb-4 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
            {TIERS.map((t, idx) => {
              const period = billing[t.slug];
              const { amount, suffix, strike, sub } = priceDisplay(t.monthly, period);
              const isLoading = loadingTier === t.slug;
              return (
                <div
                  key={t.slug}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  className={`relative flex flex-col rounded-2xl p-5 sm:p-6 md:p-7 snap-center w-[78%] sm:w-[62%] md:w-auto flex-shrink-0 md:flex-shrink ${
                    t.popular
                      ? "bg-zinc-900 border border-zinc-700 ring-1 ring-[#2563eb]/40"
                      : "bg-zinc-900/60 border border-zinc-800"
                  }`}
                >
                  {/* Header: icon + yearly toggle */}
                  <div className="flex items-start justify-between mb-5">
                    <TierIcon kind={t.iconKey} />
                    <YearlyToggle
                      value={period}
                      onChange={(v) => setBilling((prev) => ({ ...prev, [t.slug]: v }))}
                    />
                  </div>

                  {/* Tier name + description */}
                  <h2 className="text-2xl font-black text-white mb-2">{t.name}</h2>
                  <p className="text-sm text-zinc-400 leading-snug mb-6 min-h-[2.5rem]">
                    {t.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-5xl font-black text-white leading-none tracking-tight">
                      ${amount}
                    </span>
                    {strike !== null && (
                      <span className="text-lg text-zinc-500 line-through mb-1">${strike}</span>
                    )}
                    <span className="text-sm text-zinc-500 mb-1.5">{suffix}</span>
                  </div>
                  <p className="text-xs text-zinc-500 min-h-[1rem]">
                    {sub ?? "Billed monthly"}
                  </p>

                  {variant === "public" && (
                    <p className="mt-1 text-xs font-medium text-[#7aa6ff]">
                      + ${t.deposit} one-time deposit
                    </p>
                  )}
                  {variant === "no-deposit" && (
                    <p className="mt-1 text-xs font-medium text-emerald-400">
                      ✓ Deposit already paid
                    </p>
                  )}

                  {/* CTA */}
                  <button
                    type="button"
                    onClick={() => startCheckout(t.slug)}
                    disabled={isLoading}
                    className={`mt-6 mb-8 w-full font-bold py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-wait disabled:translate-y-0 ${
                      t.popular
                        ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                        : "bg-zinc-100 text-zinc-900 hover:bg-white"
                    }`}
                  >
                    {isLoading ? "Redirecting…" : "Get Started"}
                  </button>

                  {/* Bullet sections */}
                  <BulletSection section={t.primary} />
                  <BulletSection section={t.secondary} />
                </div>
              );
            })}
            </div>
          </div>

          {/* Mobile-only carousel pagination dots — reflect which card
              is most-visible (set by IntersectionObserver on the scroller).
              Tapping a dot scrolls to that card. The "swipe me" affordance
              already lives above the cards, so this block is dots-only. */}
          <div className="md:hidden flex items-center justify-center gap-2 mb-8" role="tablist" aria-label="Pricing tiers">
            {TIERS.map((t, idx) => (
              <button
                key={t.slug}
                type="button"
                role="tab"
                aria-selected={activeIndex === idx}
                aria-label={`View ${t.name}`}
                onClick={() => scrollToCard(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-8 bg-[#2563eb]"
                    : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>

          {/* See full comparison link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7aa6ff] hover:text-white transition-colors"
            >
              See full comparison
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {variant === "public" && (
            <p className="text-center text-zinc-500 text-sm mt-6">
              Not sure which tier?{" "}
              <Link href="/book" className="text-[#7aa6ff] hover:underline font-medium">
                Book a 15-min call
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* ─────── Modal: full comparison ─────── */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full pricing comparison"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <button
            onClick={() => setModalOpen(false)}
            className="fixed top-5 right-5 z-10 text-zinc-400 hover:text-white transition-colors p-2"
            aria-label="Close"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-6xl mx-auto px-2 sm:px-6 py-8 md:py-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center mb-8 sm:mb-10 tracking-tight px-2">
              Plans that fit your scale
            </h2>

            {/*
              Comparison table — on mobile this becomes a horizontally-scrollable
              region with a sticky leftmost label column. We force a minimum width
              so the four columns don't crush each other on narrow screens.
              `[&>*]:min-w-[860px]` applies the minimum to the inner grid blocks.
            */}
            <div className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-x-auto overflow-y-visible [&>*]:min-w-[860px]">
              <div className="grid grid-cols-[minmax(180px,1.4fr)_repeat(3,1fr)] gap-x-4 px-4 sm:px-6 pt-7 pb-6 border-b border-zinc-800">
                {/* Brand mark fills the otherwise-empty leftmost header cell.
                    Uses logo-modal.png (175 KB) instead of the full logo.png
                    (945 KB) so mobile users opening the modal don't pay for
                    the high-res hero version. Lazy-loaded since this only
                    appears once the modal is opened. */}
                <div className="flex flex-col items-center justify-center pr-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo-modal.png"
                    alt="Assurgit"
                    loading="lazy"
                    decoding="async"
                    className="w-full max-w-[160px] h-auto opacity-95"
                  />
                  <span className="mt-3 font-mono text-sm font-black text-white tracking-tight">
                    Assurgit
                  </span>
                </div>
                {TIERS.map((t) => {
                  const period = billing[t.slug];
                  const { amount, suffix, strike, sub } = priceDisplay(t.monthly, period);
                  const isLoading = loadingTier === t.slug;
                  return (
                    <div key={t.slug} className="text-center">
                      <div className="flex justify-center mb-2"><TierIcon kind={t.iconKey} /></div>
                      <h3 className="text-xl font-black text-white">{t.name}</h3>
                      <p className="text-[11px] text-zinc-500 mt-1 mb-3 line-clamp-2 px-1">
                        {t.description}
                      </p>
                      <div className="flex items-center justify-center mb-3">
                        <YearlyToggle
                          value={period}
                          onChange={(v) =>
                            setBilling((prev) => ({ ...prev, [t.slug]: v }))
                          }
                        />
                      </div>
                      <div className="flex items-end justify-center gap-1.5 leading-none">
                        <span className="text-3xl font-black text-white">${amount}</span>
                        {strike !== null && (
                          <span className="text-sm text-zinc-500 line-through mb-0.5">
                            ${strike}
                          </span>
                        )}
                        <span className="text-xs text-zinc-500 mb-0.5">{suffix}</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-1.5 h-4">
                        {sub ?? "Billed monthly"}
                      </p>
                      <button
                        type="button"
                        onClick={() => startCheckout(t.slug)}
                        disabled={isLoading}
                        className={`mt-3 w-full font-bold py-2 rounded-lg text-xs transition-all disabled:opacity-60 disabled:cursor-wait ${
                          t.popular
                            ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                            : "bg-zinc-100 text-zinc-900 hover:bg-white"
                        }`}
                      >
                        {isLoading ? "Redirecting…" : "Get Started"}
                      </button>
                    </div>
                  );
                })}
              </div>

              {SECTIONS.map((section) => (
                <div key={section.title}>
                  <div className="bg-[#0a2746] px-4 sm:px-6 py-3 border-y border-zinc-800">
                    <h3 className="text-sm font-bold text-[#7aa6ff] tracking-wide">
                      {section.title}
                    </h3>
                  </div>
                  {section.rows.map((row, i) => (
                    <div
                      key={row.feature}
                      className={`grid grid-cols-[minmax(180px,1.4fr)_repeat(3,1fr)] gap-x-4 px-4 sm:px-6 py-3 items-center ${
                        i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900/40"
                      }`}
                    >
                      <div className="text-sm text-zinc-300 font-medium">{row.feature}</div>
                      <div className="text-center"><Check value={row.starter} /></div>
                      <div className="text-center"><Check value={row.growth} /></div>
                      <div className="text-center"><Check value={row.scale} /></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

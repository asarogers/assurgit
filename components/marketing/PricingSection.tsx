import Link from "next/link";
import { StaggerContainer, MotionItem, MotionWrapper } from "@/components/marketing/MotionWrapper";

const tiers = [
  {
    name: "Starter",
    tagline: "Get Found Online",
    price: "$189",
    period: "/month",
    deposit: "$97 deposit to start",
    term: "Month-to-month from day one (7 days notice)",
    whoFor: "New or underperforming service businesses that need a professional online presence without overpaying.",
    promise: "We get you online fast with a clean, professional site and the basic setup needed to start showing up in search.",
    popular: false,
    features: [
      "Custom 5–10 page website",
      "Basic GBP setup",
      "Listed on 5 core directories (GBP, Yelp, Apple Maps, Bing, Facebook)",
      "Schema, sitemap, IndexNow",
      "5-doc strategy tree",
      "30-day local SEO action plan",
      "Booking integration",
      "1–2 content edits/week (48-hr turnaround)",
      "99.5% uptime + daily backups",
      "Lead notifications by email",
    ],
    notPromise: [
      "No ongoing GBP optimization (that's Growth)",
      "No citations beyond the 5 core listings",
      "No review request system or blog content",
    ],
    cta: "Start Starter",
    ctaHref: "/book",
  },
  {
    name: "Growth",
    tagline: "Start Getting Consistent Leads",
    price: "$297",
    period: "/month",
    deposit: "$148 deposit to start",
    term: "3-month initial term, then month-to-month (30 days notice)",
    whoFor: "Service businesses already getting some customers who want more consistent calls and bookings.",
    promise: "We optimize your online presence so more local customers find you and reach out — a done-for-you visibility system, not just SEO services.",
    popular: true,
    features: [
      "Everything in Starter, plus:",
      "Full GBP optimization (categories, services, photos, attributes)",
      "10–15 service pages + 5–10 city/neighborhood pages",
      "Citations campaign — 25–50 directories",
      "Review request system + response drafts",
      "2–3 GBP posts per week",
      "Monthly SEO health report (real audits)",
      "Striking-distance keyword report",
      "1 blog post per week",
      "Heatmap recordings + call tracking",
      "Quarterly competitor report",
      "Geographic coverage map",
    ],
    notPromise: [
      "No #1-ranking guarantee on Google",
      "No promise of specific call/lead volume",
      "Head terms in competitive markets take 4–9 months",
    ],
    cta: "Start Growth ⭐",
    ctaHref: "/book",
  },
  {
    name: "Scale",
    tagline: "Dominate Your Local Market",
    price: "$649",
    period: "/month",
    deposit: "$324 deposit to start",
    term: "3-month initial term, then month-to-month (30 days notice)",
    whoFor: "Established service businesses that want to outperform competitors and capture more market share.",
    promise: "We actively grow your visibility, track competitors, and expand your reach so you stay ahead. Your outsourced local growth team.",
    popular: false,
    features: [
      "Everything in Growth, plus:",
      "30–40 page site with quarterly geographic expansion",
      "Citations campaign — 100+ directories + manual cleanup",
      "5–7 GBP posts per week",
      "5 blog posts per week (~250 indexed/year)",
      "Per-competitor 40+ point SEO audit",
      "Voice-of-customer research (quarterly)",
      "1–2 authority backlinks/month",
      "Daily competitor + keyword monitoring",
      "Negative review alert + same-day draft",
      "Weekly deep synthesis report (7-layer)",
      "Live performance dashboard",
      "Multi-platform competitor tracking",
      "Wikidata entity enrichment for AI search",
      "Unlimited content edits, same-day turnaround",
      "24/7 critical bug fix monitoring",
    ],
    notPromise: [
      "No #1-ranking guarantee or market-share promise",
      "Not a substitute for great service — we amplify, not paper over",
      "Paid ads management is a separate add-on",
    ],
    cta: "Start Scale",
    ctaHref: "/book",
  },
];

const valueStack = [
  { item: "Custom 5–10 page website", value: "$1,500–$3,000" },
  { item: "Full GBP optimization", value: "$97–$500" },
  { item: "Schema markup + sitemap + IndexNow", value: "$37–$100" },
  { item: "Service catalog research", value: "$100–$300" },
  { item: "30-day local SEO action plan", value: "$500–$2,000" },
  { item: "5-document strategy tree", value: "~$500" },
  { item: "Booking platform integration", value: "$50–$150" },
  { item: "Privacy + terms + accessibility", value: "$50–$200" },
];

const comparisonRows = [
  { feature: "Custom website pages", starter: "5–10", growth: "10–25", scale: "30–40" },
  { feature: "GBP setup", starter: true, growth: true, scale: true },
  { feature: "GBP active optimization", starter: false, growth: true, scale: true },
  { feature: "GBP posts per week", starter: false, growth: "2–3", scale: "5–7" },
  { feature: "Citations / directories", starter: "5 core", growth: "25–50", scale: "100+" },
  { feature: "Review request system", starter: false, growth: true, scale: true },
  { feature: "Review response handling", starter: false, growth: "Drafts", scale: "Published + 4-hr negative" },
  { feature: "Blog posts per week", starter: false, growth: "1", scale: "5" },
  { feature: "Monthly SEO health report", starter: false, growth: true, scale: true },
  { feature: "Competitor reports", starter: false, growth: "Quarterly", scale: "Daily monitoring" },
  { feature: "Voice-of-customer research", starter: false, growth: "Optional", scale: "Quarterly" },
  { feature: "Authority backlinks / month", starter: false, growth: false, scale: "1–2" },
  { feature: "Live performance dashboard", starter: false, growth: false, scale: true },
  { feature: "Edits per week / turnaround", starter: "1–2 / 48hr", growth: "3–5 / 24hr", scale: "Unlimited / same-day" },
  { feature: "Uptime guarantee", starter: "99.5%", growth: "99.9%", scale: "99.9%" },
];

function Check({ yes }: { yes: boolean | string }) {
  if (typeof yes === "string") {
    return <span className="text-sm font-semibold text-gray-900 dark:text-white">{yes}</span>;
  }
  return yes ? (
    <svg className="w-5 h-5 text-brand-accent mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-white dark:bg-gray-950 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <MotionWrapper className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 dark:text-white mb-4 tracking-tight">
            Three tiers, three real roles
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            One-time deposit + monthly subscription. Annual prepay at any tier: 12 months for the price of 10 (~17% off).
          </p>
        </MotionWrapper>

        {/* Pricing cards */}
        <StaggerContainer className="grid lg:grid-cols-3 gap-6 items-stretch mb-16" delay={0.1}>
          {tiers.map((tier) => (
            <MotionItem key={tier.name}>
              <div
                className={`relative rounded-2xl border flex flex-col h-full transition-all duration-300 hover:-translate-y-2 ${
                  tier.popular
                    ? "bg-[#0f172a] border-[#2563eb] shadow-2xl animate-starter-pulse py-10 px-6 ring-2 ring-[#2563eb]/40"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm hover:border-gray-300 dark:hover:border-gray-700 py-8 px-6"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563eb] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                    ⭐ Recommended
                  </div>
                )}

                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${tier.popular ? "text-blue-400" : "text-brand-accent"}`}>
                  {tier.name}
                </p>
                <p className={`text-sm font-semibold mb-3 ${tier.popular ? "text-white/80" : "text-gray-700 dark:text-gray-300"}`}>
                  &ldquo;{tier.tagline}&rdquo;
                </p>

                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-4xl font-black ${tier.popular ? "text-white" : "text-gray-950 dark:text-white"}`}>
                    {tier.price}
                  </span>
                  <span className={`text-sm font-medium mb-2 ${tier.popular ? "text-white/50" : "text-gray-500"}`}>
                    {tier.period}
                  </span>
                </div>
                <p className={`text-xs font-semibold mb-4 ${tier.popular ? "text-blue-300" : "text-brand-accent"}`}>
                  + {tier.deposit}
                </p>

                <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${tier.popular ? "text-white/40" : "text-gray-400 dark:text-gray-500"}`}>
                  Who it&apos;s for
                </p>
                <p className={`text-sm leading-relaxed mb-3 ${tier.popular ? "text-white/70" : "text-gray-600 dark:text-gray-400"}`}>
                  {tier.whoFor}
                </p>

                <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${tier.popular ? "text-white/40" : "text-gray-400 dark:text-gray-500"}`}>
                  Core promise
                </p>
                <p className={`text-sm italic leading-relaxed mb-5 ${tier.popular ? "text-white/80" : "text-gray-700 dark:text-gray-300"}`}>
                  {tier.promise}
                </p>

                <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${tier.popular ? "text-white/40" : "text-gray-400 dark:text-gray-500"}`}>
                  What you&apos;re really getting
                </p>
                <ul className="space-y-2 mb-5 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.popular ? "text-blue-400" : "text-brand-accent"}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${tier.popular ? "text-white/90" : "text-gray-700 dark:text-gray-300"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${tier.popular ? "text-white/40" : "text-gray-400 dark:text-gray-500"}`}>
                  What it does NOT promise
                </p>
                <ul className="space-y-1.5 mb-5">
                  {tier.notPromise.map((np) => (
                    <li key={np} className="flex items-start gap-2">
                      <svg
                        className={`w-3.5 h-3.5 flex-shrink-0 mt-1 ${tier.popular ? "text-white/30" : "text-gray-400 dark:text-gray-600"}`}
                        fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className={`text-xs ${tier.popular ? "text-white/50" : "text-gray-500 dark:text-gray-500"}`}>
                        {np}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className={`text-[11px] mb-4 ${tier.popular ? "text-white/40" : "text-gray-400 dark:text-gray-500"}`}>
                  {tier.term}
                </p>

                <Link
                  href={tier.ctaHref}
                  className={`block w-full text-center font-bold py-3 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                    tier.popular
                      ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8] glow-blue-btn"
                      : "bg-brand-accent text-white hover:bg-brand-accent-hov"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </MotionItem>
          ))}
        </StaggerContainer>

        {/* You own everything callout */}
        <MotionWrapper>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-8 mb-16">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#2563eb] rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2">
                  You own everything. We just operate it.
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                  Your domain, your website code, your Google Business Profile, your content, your data — yours from day one. We work as Manager on your GBP, never Owner. Most agencies own AND operate so you can&apos;t leave; most Fiverr sellers hand you files and disappear. We do neither.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  <span className="font-semibold">Free at cancellation:</span> code/content export (zip or git push), citations list, GBP handoff doc, 5-min Loom walkthrough. <span className="font-semibold">Optional paid migration ($200–$500)</span> if you&apos;d rather not hand the zip to a developer yourself.
                </p>
              </div>
            </div>
          </div>
        </MotionWrapper>

        {/* Value stack — Hormozi-style */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 mb-16">
          <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2 text-center">
            What setup work would cost piecemeal
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
            Going rates if you sourced each piece separately on Fiverr or from a typical local-SEO agency.
          </p>
          <div className="max-w-xl mx-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Setup component</th>
                  <th className="text-right py-2 font-semibold text-gray-700 dark:text-gray-300">Going rate</th>
                </tr>
              </thead>
              <tbody>
                {valueStack.map((row) => (
                  <tr key={row.item} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2.5 text-gray-600 dark:text-gray-400">{row.item}</td>
                    <td className="py-2.5 text-right text-gray-900 dark:text-white font-medium">{row.value}</td>
                  </tr>
                ))}
                <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                  <td className="py-3 font-bold text-gray-900 dark:text-white">Setup piecemeal total</td>
                  <td className="py-3 text-right font-bold text-gray-900 dark:text-white">$2,884–$6,747</td>
                </tr>
                <tr>
                  <td className="pt-4 pb-2 font-black text-lg text-brand-accent">Your deposit (Growth)</td>
                  <td className="pt-4 pb-2 text-right font-black text-2xl text-brand-accent">$148</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-4 italic">
              The remainder of setup work is folded into the first 6–12 months of subscription.
            </p>
          </div>
        </div>

        {/* Full comparison table */}
        <div className="mb-12">
          <h3 className="text-xl font-black text-gray-950 dark:text-white mb-8 text-center">
            Compare tiers
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-950 text-white">
                  <th className="text-left py-4 px-4 font-semibold w-2/5">Feature</th>
                  <th className="text-center py-4 px-3 font-semibold">Starter<br /><span className="font-black">$189</span></th>
                  <th className="text-center py-4 px-3 font-semibold bg-brand-accent">Growth ⭐<br /><span className="font-black">$297</span></th>
                  <th className="text-center py-4 px-3 font-semibold">Scale<br /><span className="font-black">$649</span></th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-950"}>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">{row.feature}</td>
                    <td className="py-3 px-3 text-center"><Check yes={row.starter} /></td>
                    <td className="py-3 px-3 text-center bg-blue-50 dark:bg-blue-950/30"><Check yes={row.growth} /></td>
                    <td className="py-3 px-3 text-center"><Check yes={row.scale} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pause + cancellation note */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-gray-50 dark:bg-gray-900">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-2">Pause option</p>
            <h4 className="text-gray-950 dark:text-white font-black text-lg mb-3">$49/month hosting-only hold</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Up to 90 days at any tier. Site stays live with security and backups; SEO, GBP, content, and citations work pauses. Resume at your previous tier — no new deposit, no re-onboarding. For seasonal businesses, mid-renovation, or family medical leave.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-gray-50 dark:bg-gray-900">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-2">Material-failure exception</p>
            <h4 className="text-gray-950 dark:text-white font-black text-lg mb-3">If we don&apos;t deliver, you don&apos;t pay</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              If we materially fail to deliver — site never went live, GBP never set up, no monthly report sent — you can cancel without paying the remainder of the term. We refund the unearned portion. Not a results guarantee (we don&apos;t promise rankings); a delivery guarantee.
            </p>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-400 dark:text-gray-500 text-sm mt-8">
          Not sure which tier?{" "}
          <Link href="/book" className="text-brand-accent hover:underline font-medium">
            Book a 15-min intake call
          </Link>{" "}
          — we&apos;ll tell you honestly which fits.
        </p>

      </div>
    </section>
  );
}

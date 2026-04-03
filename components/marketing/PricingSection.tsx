import Link from "next/link";
import { StaggerContainer, MotionItem, MotionWrapper } from "@/components/marketing/MotionWrapper";

const tiers = [
  {
    name: "Launch",
    price: "$397",
    period: "/month",
    description: "All 4 platforms, MP4 delivery. The right start for local service businesses and price-sensitive entry buyers.",
    popular: false,
    features: [
      "5 short-form videos/week",
      "4 platforms (IG, TT, LI, YT)",
      "MP4 delivery via email",
      "Research-backed scripts",
      "Avatar + voice clone included",
      "Human QC on every video",
      "48-hour script review window",
    ],
    cta: "Start for $397",
    ctaHref: "/book",
    badge: null,
  },
  {
    name: "Starter",
    price: "$997",
    period: "/month",
    description: "The full automation system. Auto-publishing, competitive intel, and strategy calls. Coaches, consultants, loan officers, advisors.",
    popular: true,
    features: [
      "5 short-form videos/week",
      "4 platforms (IG, TT, LI, YT)",
      "Auto-publishing — zero manual posting",
      "Weekly competitive intel briefing",
      "Friday strategy call",
      "Avatar + voice clone included",
      "Human QC on every video",
      "48-hour script review window",
    ],
    cta: "Get Started",
    ctaHref: "/book",
    badge: null,
  },
  {
    name: "Growth",
    price: "$1,997",
    period: "/month",
    description: "Double the output. White-glove service. Teams, agencies, multi-location or white-glove accounts.",
    popular: false,
    features: [
      "10+ short-form videos/week",
      "4 platforms (IG, TT, LI, YT)",
      "Auto-publishing — zero manual posting",
      "White-glove service",
      "Priority support",
      "Monthly business review call",
      "Avatar + voice clone included",
      "Human QC on every video",
    ],
    cta: "Get Started",
    ctaHref: "/book",
    badge: null,
  },
];

const valueStack = [
  { item: "AI avatar creation (one-time setup)", value: "$1,500–$3,000" },
  { item: "Voice clone setup", value: "$500–$1,000" },
  { item: "Script writing (8 scripts/month)", value: "$800–$1,600/mo" },
  { item: "Video rendering (8 videos/month)", value: "$400–$800/mo" },
  { item: "Social media management", value: "$500–$1,500/mo" },
];

const comparisonRows = [
  { feature: "Your face & voice in every video", launch: true, starter: true, growth: true },
  { feature: "Research-backed scripts", launch: true, starter: true, growth: true },
  { feature: "Human QC on every video", launch: true, starter: true, growth: true },
  { feature: "Avatar + voice clone", launch: true, starter: true, growth: true },
  { feature: "4 platforms (IG, TT, LI, YT)", launch: true, starter: true, growth: true },
  { feature: "Auto-publishing to platforms", launch: false, starter: true, growth: true },
  { feature: "Weekly competitive intel", launch: false, starter: true, growth: true },
  { feature: "Friday strategy call", launch: false, starter: true, growth: true },
  { feature: "White-glove service", launch: false, starter: false, growth: true },
  { feature: "Monthly business review", launch: false, starter: false, growth: true },
  { feature: "Priority support", launch: false, starter: false, growth: true },
  { feature: "Videos per week", launch: "5", starter: "5", growth: "10+" },
];

function Check({ yes }: { yes: boolean | string }) {
  if (typeof yes === "string") {
    return <span className="text-sm font-semibold text-gray-900">{yes}</span>;
  }
  return yes ? (
    <svg className="w-5 h-5 text-brand-accent mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <MotionWrapper className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 mb-4 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Month-to-month. No contracts. No setup fees. Cancel anytime.
          </p>
        </MotionWrapper>

        {/* Pricing cards */}
        <StaggerContainer className="grid sm:grid-cols-3 gap-5 items-stretch mb-16" delay={0.1}>
          {tiers.map((tier) => (
            <MotionItem key={tier.name}>
              <div
                className={`relative rounded-2xl border flex flex-col h-full transition-all duration-300 hover:-translate-y-2 ${
                  tier.popular
                    ? "bg-[#0f172a] border-[#2563eb] shadow-2xl animate-starter-pulse py-10 px-6"
                    : "bg-white border-gray-200 shadow-sm hover:border-gray-300 py-8 px-6"
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${tier.popular ? "text-blue-400" : "text-brand-accent"}`}>
                  {tier.name}
                </p>

                <div className="flex items-end gap-1 mb-3">
                  <span className={`text-3xl font-black ${tier.popular ? "text-white" : "text-gray-950"}`}>
                    {tier.price}
                  </span>
                  <span className={`text-sm font-medium mb-1.5 ${tier.popular ? "text-white/50" : "text-gray-500"}`}>
                    {tier.period}
                  </span>
                </div>

                <p className={`text-sm leading-relaxed mb-5 ${tier.popular ? "text-white/60" : "text-gray-500"}`}>
                  {tier.description}
                </p>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.popular ? "text-blue-400" : "text-brand-accent"}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${tier.popular ? "text-white/90" : "text-gray-700"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

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

        {/* Value stack — Hormozi-style */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 mb-16">
          <h3 className="text-xl font-black text-gray-950 mb-2 text-center">
            What you&apos;d pay to build this yourself
          </h3>
          <p className="text-sm text-gray-500 text-center mb-8">
            This is what the same result costs when you piece it together on your own.
          </p>
          <div className="max-w-xl mx-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-semibold text-gray-700">Component</th>
                  <th className="text-right py-2 font-semibold text-gray-700">Market Rate</th>
                </tr>
              </thead>
              <tbody>
                {valueStack.map((row) => (
                  <tr key={row.item} className="border-b border-gray-100">
                    <td className="py-2.5 text-gray-600">{row.item}</td>
                    <td className="py-2.5 text-right text-gray-900 font-medium">{row.value}</td>
                  </tr>
                ))}
                <tr className="border-b-2 border-gray-300">
                  <td className="py-3 font-bold text-gray-900">Total (DIY assembled)</td>
                  <td className="py-3 text-right font-bold text-gray-900">$3,700–$7,900/mo</td>
                </tr>
                <tr>
                  <td className="pt-4 pb-2 font-black text-lg text-brand-accent">Assurgit Launch</td>
                  <td className="pt-4 pb-2 text-right font-black text-2xl text-brand-accent">$397/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Full comparison table */}
        <div className="mb-12">
          <h3 className="text-xl font-black text-gray-950 mb-8 text-center">
            Compare plans
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-950 text-white">
                  <th className="text-left py-4 px-4 font-semibold w-1/2">Feature</th>
                  <th className="text-center py-4 px-3 font-semibold">Launch<br /><span className="font-black">$397</span></th>
                  <th className="text-center py-4 px-3 font-semibold bg-brand-accent">Starter<br /><span className="font-black">$997</span></th>
                  <th className="text-center py-4 px-3 font-semibold">Growth<br /><span className="font-black">$1,997</span></th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-3 px-4 text-gray-700 font-medium">{row.feature}</td>
                    <td className="py-3 px-3 text-center"><Check yes={row.launch} /></td>
                    <td className="py-3 px-3 text-center bg-blue-50"><Check yes={row.starter} /></td>
                    <td className="py-3 px-3 text-center"><Check yes={row.growth} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Non-recurring offers */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-black text-gray-950 mb-2">Need more than content?</h3>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Recurring clone content is the wedge. These two offers extend it into full visibility infrastructure.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-2">Add-on / Tier Expansion</p>
              <h4 className="text-gray-950 font-black text-lg mb-3">Presence Infrastructure</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Better discoverability and repeatable visibility systems. Includes Google Business Profile optimization, directory listings, social setup, GEO support, monitoring prompts, and automation.
              </p>
              <ul className="space-y-1.5 mb-6">
                {[
                  "GBP optimization + citation building",
                  "Directory and listing setup",
                  "Social profile setup",
                  "GEO / AI discoverability support",
                  "Monitoring prompts + automation",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/book" className="block w-full text-center bg-brand-accent text-white font-bold py-3 rounded-xl text-sm hover:bg-brand-accent-hov transition-colors">
                Ask about Presence Infrastructure →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent mb-2">Project-Based</p>
              <h4 className="text-gray-950 font-black text-lg mb-3">Website + Presence Launch</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                A stronger owned asset plus a launch-ready visibility foundation. Site build or upgrade, search setup, social and directory profiles, and a foundational content system.
              </p>
              <ul className="space-y-1.5 mb-6">
                {[
                  "Site build or upgrade",
                  "Search setup + schema",
                  "Profile and directory foundation",
                  "Foundational content system",
                  "Launch-ready from day one",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/book" className="block w-full text-center bg-brand-accent text-white font-bold py-3 rounded-xl text-sm hover:bg-brand-accent-hov transition-colors">
                Ask about Website + Presence Launch →
              </Link>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-6 max-w-2xl mx-auto text-center">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Real Client Result</p>
          <blockquote className="text-gray-800 text-base font-medium leading-relaxed mb-3">
            &ldquo;WellPreparedLife grew their business <strong>50% in the first week</strong> with Assurgit — without filming a single new video.&rdquo;
          </blockquote>
          <p className="text-gray-500 text-sm">— Asa Rogers, Founder of Assurgit</p>
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-400 text-sm mt-8">
          Not sure which plan?{" "}
          <Link href="/book" className="text-brand-accent hover:underline font-medium">
            Book a free call
          </Link>{" "}
          — we&apos;ll recommend the right fit.
        </p>

      </div>
    </section>
  );
}

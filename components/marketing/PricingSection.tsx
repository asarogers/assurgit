import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    price: "$1,997",
    period: "/month",
    description: "Get started with AI video content and prove it works for your brand.",
    popular: false,
    features: [
      "3 branded videos/week",
      "2 platforms of your choice",
      "MP4 email delivery",
      "Research-backed scripts",
      "Avatar + voice clone",
      "Human QC on every video",
    ],
    cta: "Get Started",
    ctaHref: "/book",
  },
  {
    name: "Growth",
    price: "$3,497",
    period: "/month",
    description: "The full system. Research, scripting, rendering, and auto-publishing — all done for you.",
    popular: true,
    features: [
      "7 branded videos/week",
      "4 platforms (IG, TT, LI, YT)",
      "Auto-publishing — zero manual posting",
      "Weekly competitive intel briefing",
      "Friday strategy call",
      "Avatar + voice clone",
      "Human QC on every video",
      "48-hour script review window",
    ],
    cta: "Get Started",
    ctaHref: "/book",
  },
  {
    name: "Scale",
    price: "$5,997",
    period: "/month",
    description: "Maximum output with white-glove service. Built for high-volume operators and agencies.",
    popular: false,
    features: [
      "14 branded videos/week",
      "4 platforms (IG, TT, LI, YT)",
      "Auto-publishing — zero manual posting",
      "White-glove service",
      "Priority support",
      "Monthly business review call",
      "Upsell path discussion",
      "Avatar + voice clone",
      "Human QC on every video",
    ],
    cta: "Get Started",
    ctaHref: "/book",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 mb-4 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Month-to-month. No contracts. No setup fees. Cancel anytime.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                tier.popular
                  ? "bg-brand-accent border-brand-accent shadow-xl scale-[1.02]"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-white text-brand-accent font-bold text-xs px-4 py-1.5 rounded-full shadow-md border border-brand-accent-muted">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <p
                className={`text-sm font-semibold uppercase tracking-wider mb-2 ${
                  tier.popular ? "text-white/70" : "text-brand-accent"
                }`}
              >
                {tier.name}
              </p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-3">
                <span
                  className={`text-4xl font-black ${
                    tier.popular ? "text-white" : "text-gray-950"
                  }`}
                >
                  {tier.price}
                </span>
                <span
                  className={`text-sm font-medium mb-1.5 ${
                    tier.popular ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  {tier.period}
                </span>
              </div>

              {/* Description */}
              <p
                className={`text-sm leading-relaxed mb-6 ${
                  tier.popular ? "text-white/70" : "text-gray-500"
                }`}
              >
                {tier.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <svg
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        tier.popular ? "text-white/70" : "text-brand-accent"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`text-sm ${
                        tier.popular ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={tier.ctaHref}
                className={`block w-full text-center font-bold py-3 rounded-xl text-sm transition-all ${
                  tier.popular
                    ? "bg-white text-brand-accent hover:bg-brand-accent-muted"
                    : "bg-brand-accent text-white hover:bg-brand-accent-hov"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-400 text-sm mt-10">
          Not sure which plan? Book a free call — we&apos;ll recommend the right fit.
        </p>
      </div>
    </section>
  );
}

import Link from "next/link";

const buyers = [
  {
    type: "Local service businesses",
    description:
      "Contractors, meal prep services, wellness studios, chiropractors — businesses that need booked jobs and local visibility, not global reach.",
    buying: "Booked jobs and local discoverability",
    entryPlan: "Launch or Starter",
    entryHref: "/pricing",
    why: "Need a visible presence without building a full in-house content function.",
  },
  {
    type: "Loan officers, advisors & consultants",
    description:
      "Financial professionals and B2B consultants where a single client relationship is worth thousands — and trust is the entire product.",
    buying: "Authority, top-of-mind presence, referral visibility",
    entryPlan: "Starter",
    entryHref: "/pricing",
    why: "Upside per client is high enough to support recurring content and stronger support.",
  },
  {
    type: "Coaches & founders",
    description:
      "Personal brand builders who need consistent output but can't film every week. The avatar + voice clone directly solves the inconsistency problem.",
    buying: "Consistent personal-brand output without filming",
    entryPlan: "Starter or Growth",
    entryHref: "/pricing",
    why: "The avatar + voice clone directly solves the inconsistency problem.",
  },
  {
    type: "Teams & multi-location operators",
    description:
      "Growing businesses, agencies, or multi-location brands that need higher output, coordination across stakeholders, and stronger operating infrastructure.",
    buying: "Higher output, coordination, reporting, infrastructure",
    entryPlan: "Growth or Scale",
    entryHref: "/pricing",
    why: "Benefit from managed publishing, more stakeholders, and stronger operating rules.",
  },
];

export default function BestFitBuyers() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 mb-4 tracking-tight">
            Who this is built for
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Pricing is routed by your economics and visibility needs — not one generic package for every industry.
          </p>
        </div>

        {/* Buyer cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {buyers.map((buyer) => (
            <div
              key={buyer.type}
              className="border border-gray-200 rounded-2xl p-6 bg-gray-50 flex flex-col"
            >
              <h3 className="text-gray-950 font-black text-lg mb-2">{buyer.type}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{buyer.description}</p>
              <div className="mt-auto space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-gray-400 font-medium min-w-[80px]">Buying:</span>
                  <span className="text-gray-700">{buyer.buying}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-gray-400 font-medium min-w-[80px]">Why it fits:</span>
                  <span className="text-gray-700">{buyer.why}</span>
                </div>
                <div className="flex items-center gap-2 text-sm pt-1">
                  <span className="text-gray-400 font-medium min-w-[80px]">Start at:</span>
                  <Link
                    href={buyer.entryHref}
                    className="text-brand-accent font-bold hover:underline"
                  >
                    {buyer.entryPlan} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-10">
          Not sure which fits you?{" "}
          <Link href="/book" className="text-brand-accent hover:underline font-medium">
            Book a free call
          </Link>{" "}
          and we&apos;ll recommend the right tier.
        </p>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content Service vs. Traditional Marketing Agency | Assurgit",
  description:
    "Compare Assurgit's AI video content service against a traditional marketing agency. Price, speed, output volume, authenticity, and flexibility — side by side.",
  openGraph: {
    title: "AI Video Content Service vs. Traditional Marketing Agency",
    description:
      "Honest comparison of Assurgit vs. a traditional marketing agency. Who wins on price, speed, and consistency — and when does an agency make more sense?",
    type: "article",
  },
};

// STYLE: BALANCED — Assurgit wins on price/speed/consistency; agency wins on breadth/strategy

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does Assurgit compare to a marketing agency for video content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Assurgit specializes exclusively in AI-powered short-form video content — scripting, avatar creation, rendering, and publishing. A traditional marketing agency offers broader services (ads, SEO, PR, branding) but typically charges $3,000–$15,000/month for retainers that include video as just one component. Assurgit is faster, more affordable, and more consistent for short-form social video specifically.",
      },
    },
    {
      "@type": "Question",
      name: "Can a marketing agency produce more videos than Assurgit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most agencies produce 4–8 short-form videos per month as part of a broader content package. Assurgit delivers 5 videos per week (20+ per month) starting at $397/month. For volume short-form content, Assurgit is significantly more output-efficient.",
      },
    },
    {
      "@type": "Question",
      name: "When should I choose a marketing agency over Assurgit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A marketing agency makes more sense if you need services beyond social video — paid advertising, SEO, PR, rebranding, website design, or an integrated multi-channel strategy. If short-form video content is your primary goal, Assurgit delivers more volume, more consistency, and lower cost. If you need a full marketing department, an agency is better positioned.",
      },
    },
    {
      "@type": "Question",
      name: "How fast does Assurgit produce content compared to an agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Assurgit goes live within 5 business days of onboarding and delivers weekly video batches on an ongoing schedule. Traditional agencies often have 2–4 week production cycles for video content due to revision loops, account management overhead, and production scheduling. Assurgit's AI-assisted workflow is consistently faster.",
      },
    },
    {
      "@type": "Question",
      name: "Does Assurgit do strategy like a marketing agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Assurgit's Starter plan includes a weekly strategy call and competitive intel reports. This is content-focused strategy — what topics to cover, what angles are working in your niche, what competitors are posting. It's not a full brand strategy or paid media planning service. If you need that broader strategy layer, a full-service agency or fractional CMO makes more sense alongside Assurgit.",
      },
    },
    {
      "@type": "Question",
      name: "What is Assurgit's pricing compared to a marketing agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Assurgit starts at $397/month (Launch plan: 5 videos/week, 4 platforms) up to $1,997/month (Growth plan: 10+ videos/week, white-glove). Traditional marketing agency retainers for comparable deliverables typically start at $3,000–$5,000/month and go up significantly from there. Assurgit is also month-to-month with no long-term contract.",
      },
    },
  ],
};

const comparisonRows = [
  {
    criteria: "Monthly cost",
    assurgit: "$397–$1,997/month",
    agency: "$3,000–$15,000+/month",
    winner: "assurgit",
  },
  {
    criteria: "Contract required",
    assurgit: "Month-to-month, cancel anytime",
    agency: "Typically 6–12 month minimums",
    winner: "assurgit",
  },
  {
    criteria: "Short-form video output",
    assurgit: "5–10+ videos per week",
    agency: "4–8 videos per month (typically)",
    winner: "assurgit",
  },
  {
    criteria: "Time to first published content",
    assurgit: "5 business days from onboarding",
    agency: "2–6 weeks (strategy, brief, production)",
    winner: "assurgit",
  },
  {
    criteria: "Your face & voice on content",
    assurgit: "Yes — personal AI avatar + voice clone",
    agency: "Depends on package; often stock or generic",
    winner: "assurgit",
  },
  {
    criteria: "Auto-publishing to social platforms",
    assurgit: "Yes — IG, TikTok, LinkedIn, YouTube",
    agency: "Sometimes included; often extra cost",
    winner: "assurgit",
  },
  {
    criteria: "Consistency of delivery",
    assurgit: "Guaranteed weekly cadence",
    agency: "Varies; revisions can delay timelines",
    winner: "assurgit",
  },
  {
    criteria: "Competitive content research",
    assurgit: "Weekly intel included",
    agency: "Periodic — part of broader strategy",
    winner: "tie",
  },
  {
    criteria: "Paid advertising (Google, Meta)",
    assurgit: "Not included",
    agency: "Core offering for most agencies",
    winner: "agency",
  },
  {
    criteria: "SEO, PR, branding services",
    assurgit: "Not included",
    agency: "Available as add-ons or full packages",
    winner: "agency",
  },
  {
    criteria: "Multi-channel strategy",
    assurgit: "Content strategy (Starter plan)",
    agency: "Full integrated strategy available",
    winner: "agency",
  },
  {
    criteria: "Specialist expertise in short-form video",
    assurgit: "Dedicated — it's all we do",
    agency: "Generalist team handling many channels",
    winner: "assurgit",
  },
  {
    criteria: "Authenticity of content",
    assurgit: "Your real face, voice, and positioning",
    agency: "Brand-level; not always founder-authentic",
    winner: "assurgit",
  },
  {
    criteria: "Scalability",
    assurgit: "Upgrade plan for more volume",
    agency: "Negotiate scope; costs scale with work",
    winner: "assurgit",
  },
];

export default function AssurgitVsMarketingAgencyPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-indigo-600/20 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-500/30">
              Comparison
            </span>
            <span className="text-gray-500 text-xs">
              Updated March 2026 · By Asa Rogers, Founder of Assurgit
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
            AI Video Content Service vs. Traditional Marketing Agency
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Both get content published. The differences are in what you pay, how fast you move, and whether the output actually looks and sounds like you. This is an honest breakdown — including where agencies are the better choice.
          </p>
        </div>

        {/* Core positioning cards */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">
                Traditional Marketing Agency
              </p>
              <h3 className="text-lg font-black text-white mb-4">Full-service breadth. Premium price.</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Agencies do many things: ads, SEO, PR, branding, design, video, email. Video is typically one line item in a broader retainer. Account managers coordinate multiple specialists.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Multi-channel strategy and execution</li>
                <li>• Paid media management (Google, Meta)</li>
                <li>• Brand positioning and creative direction</li>
                <li>• 4–8 short-form videos per month (typical)</li>
                <li>• 2–4 week production turnaround</li>
              </ul>
              <div className="mt-5 pt-4 border-t border-gray-800">
                <p className="text-gray-500 text-sm">
                  Cost: <strong className="text-white">$3,000–$15,000+/month</strong>
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Contract: <strong className="text-white">Usually 6–12 months</strong>
                </p>
              </div>
            </div>

            <div className="bg-indigo-600/10 border border-indigo-500/40 rounded-2xl p-6">
              <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Assurgit
              </p>
              <h3 className="text-lg font-black text-white mb-4">Deep specialist. Fraction of the cost.</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Assurgit does one thing extremely well: short-form AI video at scale, with your face and voice on it, published consistently every week.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✅ 5–10+ short-form videos per week</li>
                <li>✅ Personal AI avatar + voice clone</li>
                <li>✅ Research-backed scripts in your voice</li>
                <li>✅ Auto-published to 4 platforms</li>
                <li>✅ Live within 5 business days</li>
              </ul>
              <div className="mt-5 pt-4 border-t border-indigo-500/20">
                <p className="text-indigo-300 text-sm">
                  Cost: <strong className="text-white">$397–$1,997/month</strong>
                </p>
                <p className="text-indigo-300 text-sm mt-1">
                  Contract: <strong className="text-white">Month-to-month</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Price reality check */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-2xl font-black text-white mb-6">The Price Reality Check</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              Here&apos;s what comparable short-form video output from an agency actually costs, broken down by component:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 text-gray-500 font-medium">What you need</th>
                    <th className="text-right py-2 pr-4 text-gray-500 font-medium">Agency cost</th>
                    <th className="text-right py-2 text-gray-500 font-medium">Assurgit</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Strategy + content calendar (monthly)", "$500–$1,500", "Included"],
                    ["Script writing (20 scripts/month)", "$1,000–$3,000", "Included"],
                    ["Video production (20 videos/month)", "$2,000–$8,000", "Included"],
                    ["Social media publishing + management", "$500–$2,000", "Included (Starter+)"],
                    ["Performance reporting", "$300–$800", "Included"],
                  ].map(([item, agencyCost, assurgitCost]) => (
                    <tr key={String(item)} className="border-b border-gray-800">
                      <td className="py-2.5 text-gray-400">{item}</td>
                      <td className="py-2.5 text-right pr-4 text-gray-300">{agencyCost}</td>
                      <td className="py-2.5 text-right text-indigo-400 font-medium">{assurgitCost}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-700">
                    <td className="pt-3 font-bold text-white">Total</td>
                    <td className="pt-3 text-right pr-4 font-black text-red-400">$4,300–$15,300</td>
                    <td className="pt-3 text-right font-black text-indigo-400">$497–$1,997</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-2xl font-black text-white mb-6">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900">
                  <th className="text-left py-3 px-4 font-semibold text-gray-400 w-1/3">Criteria</th>
                  <th className="text-left py-3 px-4 font-semibold text-indigo-400">Assurgit</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-400">Marketing Agency</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-500 w-24">Edge</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.criteria}
                    className={`border-t border-gray-800 ${i % 2 === 0 ? "" : "bg-gray-900/50"}`}
                  >
                    <td className="py-3 px-4 text-gray-400 font-medium">{row.criteria}</td>
                    <td className="py-3 px-4 text-gray-200">{row.assurgit}</td>
                    <td className="py-3 px-4 text-gray-400">{row.agency}</td>
                    <td className="py-3 px-4">
                      {row.winner === "assurgit" && (
                        <span className="text-indigo-400 text-xs font-semibold">Assurgit ✓</span>
                      )}
                      {row.winner === "agency" && (
                        <span className="text-gray-400 text-xs font-semibold">Agency ✓</span>
                      )}
                      {row.winner === "tie" && (
                        <span className="text-gray-600 text-xs">Tie</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Who should choose which */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-2xl font-black text-white mb-6">Who Should Choose Which</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-white mb-4">Choose a marketing agency if:</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-0.5">→</span>
                  You need paid advertising management alongside content
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-0.5">→</span>
                  You&apos;re going through a rebrand and need integrated creative direction
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-0.5">→</span>
                  You need SEO, PR, or media placement services
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-0.5">→</span>
                  Video is one part of a broader marketing overhaul
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-0.5">→</span>
                  Your budget supports a $5,000+/month engagement
                </li>
              </ul>
            </div>

            <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-6">
              <h3 className="font-bold text-white mb-4">Choose Assurgit if:</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  Short-form video is your primary content priority
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  You want authentic content with your actual face and voice
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  You need 20+ videos per month, not 4–8
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  You want to start in days, not weeks
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  You want month-to-month flexibility — no long contracts
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-400 text-sm">
              <strong className="text-white">Note:</strong> Many clients use Assurgit alongside an agency. Assurgit handles high-volume short-form video; the agency handles paid media or brand strategy. They&apos;re not always either/or.
            </p>
          </div>
        </div>

        {/* Social proof */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Real Result
            </p>
            <p className="text-white text-lg font-bold mb-2">
              WellPreparedLife grew their business 50% in their first week with Assurgit.
            </p>
            <p className="text-gray-400 text-sm">
              Without a long agency retainer. Without a 6-month contract. Without filming anything.
            </p>
          </div>
        </div>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Get agency-level output at a fraction of the cost
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free 30-minute call. We&apos;ll walk through what your content would look like and get you live in under a week — no long-term commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
              >
                Book Your Free Call
              </Link>
              <Link
                href="/pricing"
                className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold px-10 py-4 rounded-xl transition-all"
              >
                View Pricing — From $397/mo
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-2xl font-black text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((q, i) => (
              <details key={i} className="bg-gray-900 border border-gray-800 rounded-xl group">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <span className="text-white font-medium text-sm">{q.name}</span>
                  <svg
                    className="w-4 h-4 text-gray-500 flex-shrink-0 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">
                  {q.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/compare/done-for-you-vs-diy-video" className="text-indigo-400 hover:underline">
              Done-For-You vs. DIY AI Video
            </Link>
            <Link href="/compare/assurgit-vs-in-house-video-team" className="text-indigo-400 hover:underline">
              Assurgit vs. In-House Video Team
            </Link>
            <Link href="/compare/assurgit-vs-freelance-video-editor" className="text-indigo-400 hover:underline">
              Assurgit vs. Freelance Video Editor
            </Link>
            <Link href="/pricing" className="text-indigo-400 hover:underline">
              Pricing — from $397/mo
            </Link>
            <Link href="/" className="text-indigo-400 hover:underline">
              ← Back to Assurgit
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

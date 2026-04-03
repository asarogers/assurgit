import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Financial Advisors — Done For You | Assurgit",
  description:
    "Done-for-you AI video content for financial advisors and wealth managers. Compliance-safe educational content published weekly to LinkedIn, Instagram, TikTok, and YouTube. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Financial Advisors — Done For You",
    description:
      "Stop losing prospects to advisors who educate online every week. Get compliance-safe AI video content — your face, your voice, done for you.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Financial Advisors",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content service for financial advisors and wealth managers. Includes AI avatar creation, voice cloning, compliance-safe educational scripts, and auto-publishing to social media.",
  "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD", "priceSpecification": { "@type": "RecurringChargeSpecification", "billingPeriod": "Month" } },
  "areaServed": "US",
  "serviceType": "Video Content Marketing",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is AI video content compliant for financial advisors and RIAs?",
      "acceptedAnswer": { "@type": "Answer", "text": "Our scripts stay firmly in educational territory — general financial literacy, behavioral finance concepts, planning frameworks, and market education. We do not produce specific investment recommendations, performance claims, or anything that constitutes personalized investment advice. You review every script before publishing and can request changes at any time. Many advisors also route scripts through their compliance team before approval." }
    },
    {
      "@type": "Question",
      "name": "What kind of video content works for financial advisors?",
      "acceptedAnswer": { "@type": "Answer", "text": "Educational content about financial planning concepts consistently outperforms promotional content for advisors. Videos explaining how Roth conversions work, what sequence-of-returns risk means, how to think about asset allocation at different life stages, and common behavioral mistakes investors make — these build trust with prospects long before they're ready to book a call." }
    },
    {
      "@type": "Question",
      "name": "Will my compliance officer need to review the scripts?",
      "acceptedAnswer": { "@type": "Answer", "text": "We recommend routing scripts through your compliance process on the Starter and Growth plans, which include script review time built into the workflow. On Launch, you receive scripts Monday morning and have the window before Thursday publishing to route them internally. We write for educational compliance by default — no specific tickers, no performance projections, no calls to action that could trigger FINRA rules." }
    },
    {
      "@type": "Question",
      "name": "Which platforms should financial advisors prioritize?",
      "acceptedAnswer": { "@type": "Answer", "text": "LinkedIn is the highest-ROI platform for advisors targeting high-net-worth individuals, business owners, and corporate executives. YouTube builds long-term search authority for terms like 'how to reduce taxes in retirement.' Instagram and TikTok reach younger accumulators who will need advisory services in 5–10 years — building that awareness early is a significant competitive advantage." }
    },
    {
      "@type": "Question",
      "name": "How long until I see results?",
      "acceptedAnswer": { "@type": "Answer", "text": "Most financial advisors see meaningful profile growth and inbound connection requests within 30 days. Direct inquiries from qualified prospects typically begin in the 60–90 day range as the algorithm identifies your audience. The compounding effect of consistent content means month 6 typically outperforms month 1 by 5–10x." }
    },
  ]
};

const painPoints = [
  {
    icon: "📊",
    pain: "Prospects Google their advisor before ever calling — and you have no content for them to find",
    solution: "Weekly educational videos on LinkedIn and YouTube ensure that when your ideal client searches for financial guidance, your face and voice are what they find — building trust before the first call.",
  },
  {
    icon: "⚖️",
    pain: "Compliance anxiety paralyzes you from posting anything",
    solution: "Every script stays in educational territory: financial literacy, planning concepts, behavioral psychology. No specific recommendations, no performance claims. You (and your compliance officer) review before anything goes live.",
  },
  {
    icon: "🗓️",
    pain: "You spend your days managing portfolios and client calls — content creation never makes it onto the calendar",
    solution: "Your AI avatar creates content while you manage clients. Setup takes 30 minutes. After that, five polished videos publish every week without you touching a camera or editing app.",
  },
];

const contentIdeas = [
  "What Is a Roth Conversion and Should You Do One Before 65?",
  "The Sequence-of-Returns Risk Nobody Explains Until It's Too Late",
  "3 Tax Planning Moves Most High Earners Miss Before Year-End",
  "How to Think About Asset Allocation When You're 10 Years From Retirement",
  "Why Having a Financial Advisor Is Different from Having a Financial Plan",
  "The Psychology of Market Downturns (and How to Not Make a Costly Mistake)",
  "What Social Security Optimization Actually Looks Like in Practice",
  "5 Signs Your 401(k) Is Silently Costing You Thousands in Fees",
  "How Business Owners Should Think About Exit Planning at 50",
  "The Difference Between a Fiduciary and a Non-Fiduciary Advisor",
];

const plans = [
  { name: "Launch", price: "$397/mo", videos: "5/week", platforms: "IG, TT, LI, YT", publishing: "MP4 delivery", highlight: false },
  { name: "Starter", price: "$997/mo", videos: "5/week", platforms: "IG, TT, LI, YT", publishing: "Auto-publishing", highlight: true },
  { name: "Growth", price: "$1,997/mo", videos: "10+/week", platforms: "IG, TT, LI, YT", publishing: "Auto-publishing + White-glove", highlight: false },
];

export default function FinancialAdvisorsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-indigo-600/20 text-indigo-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-500/30 mb-6">
            For Financial Advisors
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Prospects hire the advisor who{" "}
            <span className="text-indigo-400">educated them</span>
            {" "}— be that advisor every week
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, writes compliance-safe educational scripts, and publishes to LinkedIn, Instagram, TikTok, and YouTube — every week, completely hands-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book a Free Call
            </Link>
            <Link href="/pricing" className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors">
              See Pricing — from $397/mo
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ 5 short-form videos every week</span>
            <span>✓ Setup in 30 minutes</span>
            <span>✓ Compliance-safe educational content</span>
            <span>✓ Script review window before publishing</span>
            <span>✓ No filming after setup</span>
          </div>

          {/* Social proof callout */}
          <div className="mt-10 inline-block bg-gray-900 border border-gray-700 rounded-xl px-6 py-4 text-left max-w-lg">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Real Result — Week 1</p>
            <p className="text-white text-sm leading-relaxed">
              &ldquo;WellPreparedLife grew their business <strong className="text-indigo-400">50% in their first week</strong> with Assurgit — without filming a single new video.&rdquo;
            </p>
            <p className="text-gray-500 text-xs mt-2">— Asa Rogers, Founder of Assurgit</p>
          </div>
        </section>

        {/* Pain Points */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            The problem every financial advisor faces — and how we solve it
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((p, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="text-3xl mb-4">{p.icon}</div>
                <p className="text-gray-400 text-sm italic mb-3">&ldquo;{p.pain}&rdquo;</p>
                <div className="w-8 h-0.5 bg-indigo-500 mb-3" />
                <p className="text-gray-200 text-sm leading-relaxed">{p.solution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            How it works for financial advisors
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We capture your voice clone, build your avatar, and brief ourselves on your specialty, ideal client (retirees, business owners, young professionals), and any compliance parameters your firm requires." },
              { step: "2", title: "We research relevant financial topics every week", desc: "Our AI monitors what your target clients are searching — tax questions, retirement concerns, market anxieties — and builds a content calendar around real, timely demand." },
              { step: "3", title: "Compliance-safe scripts arrive Monday morning", desc: "5 educational scripts in your voice — no specific recommendations, no performance claims, no FINRA-trigger language. Review and approve, request changes, or auto-publish." },
              { step: "4", title: "Videos are rendered and human-reviewed", desc: "Every video goes through human QC before publishing. Caption accuracy, rendering quality, and platform formatting all checked." },
              { step: "5", title: "Auto-published to your platforms", desc: "LinkedIn, Instagram, TikTok, YouTube — posted at optimal engagement windows, formatted per platform. Zero manual work from you." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="text-indigo-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">{item.step}</span>
                <div>
                  <p className="text-white font-semibold mb-1">{item.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Content Ideas */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-4">
            What your content looks like
          </h2>
          <p className="text-gray-400 text-center mb-8 max-w-xl mx-auto">
            Educational, trust-building content that positions you as the expert your prospects turn to — not a pitch. Here are examples of scripts we write for financial advisors:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {contentIdeas.map((idea, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-sm">{idea}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-4">
            Plans for financial advisors
          </h2>
          <p className="text-gray-400 text-center mb-10">
            One new AUM relationship typically covers years of the service. Start with Launch to prove the system, then scale.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900">
                  <th className="text-left py-4 px-5 font-semibold text-gray-400">Plan</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Price</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Videos/Week</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Platforms</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400">Publishing</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-400"></th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.name} className={`border-t border-gray-800 ${plan.highlight ? "bg-indigo-600/10" : ""}`}>
                    <td className="py-4 px-5 font-semibold text-white">
                      {plan.name}
                      {plan.highlight && <span className="ml-2 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">Most Popular</span>}
                    </td>
                    <td className="py-4 px-4 text-center text-indigo-400 font-bold">{plan.price}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{plan.videos}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{plan.platforms}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{plan.publishing}</td>
                    <td className="py-4 px-4 text-center">
                      <Link href="/book" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                        Get Started →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            All plans include avatar + voice clone, human QC, and research-backed scripts.{" "}
            <Link href="/pricing" className="text-indigo-400 hover:underline">Full pricing details →</Link>
          </p>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((q, i) => (
              <details key={i} className="bg-gray-900 border border-gray-800 rounded-xl group">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <span className="text-white font-medium text-sm">{q.name}</span>
                  <svg className="w-4 h-4 text-gray-500 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Start educating. Start attracting your ideal clients.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free 30-minute call. We&apos;ll walk through exactly what your content would look like and how we keep it compliant for your firm.
            </p>
            <Link href="/book" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call
            </Link>
            <p className="text-gray-600 text-xs mt-4">No commitment. No credit card. Just a conversation.</p>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/loan-officers" className="text-indigo-400 hover:underline">Loan Officers</Link>
            <Link href="/for/mortgage-brokers" className="text-indigo-400 hover:underline">Mortgage Brokers</Link>
            <Link href="/for/consultants" className="text-indigo-400 hover:underline">Consultants</Link>
            <Link href="/pricing" className="text-indigo-400 hover:underline">Full Pricing</Link>
            <Link href="/best/done-for-you-ai-video-service" className="text-indigo-400 hover:underline">Best Done-For-You AI Video</Link>
            <Link href="/" className="text-indigo-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Video Content for Loan Officers — Done For You | Assurgit",
  description:
    "Done-for-you AI video content for loan officers. Your face, your voice, educational videos published weekly to Instagram, TikTok, LinkedIn, and YouTube. Starting at $397/month.",
  openGraph: {
    title: "AI Video Content for Loan Officers — Done For You",
    description:
      "Stop losing referrals to loan officers who show up online every week. Get your AI avatar, scripts, and auto-publishing — all done for you.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Video Content for Loan Officers",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you AI video content service for loan officers. Includes AI avatar creation, voice cloning, research-backed scripts, and auto-publishing to social media.",
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
      "name": "What kind of video content works for loan officers?",
      "acceptedAnswer": { "@type": "Answer", "text": "Educational content consistently outperforms promotional content for loan officers. Rate update explainers, first-time homebuyer tips, down payment myth-busting, and neighborhood market commentary all drive referral partner attention and direct client inquiries without triggering compliance issues." }
    },
    {
      "@type": "Question",
      "name": "Is AI video content compliant for loan officers?",
      "acceptedAnswer": { "@type": "Answer", "text": "Educational video content (tips, how-tos, market commentary) is generally within compliance guidelines for loan officers. We do not produce rate quotes, loan commitments, or RESPA-violating promotions. You review every script before it publishes and can request changes or skip approval entirely." }
    },
    {
      "@type": "Question",
      "name": "How long does setup take for a loan officer?",
      "acceptedAnswer": { "@type": "Answer", "text": "Avatar and voice clone are ready within 48–72 hours of your 30-minute setup call. Your first batch of videos publishes the Monday after setup completes." }
    },
    {
      "@type": "Question",
      "name": "Do I need to film anything ongoing?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. After your initial 30-minute setup call, we handle everything — scripts, rendering, QC, and publishing. You optionally review scripts Monday mornings. If you skip review, the system runs automatically." }
    },
    {
      "@type": "Question",
      "name": "What platforms do you publish loan officer content to?",
      "acceptedAnswer": { "@type": "Answer", "text": "LinkedIn, Instagram, TikTok, and YouTube. LinkedIn is typically the highest-value platform for referral partner relationships. Instagram and TikTok reach first-time homebuyer demographics. YouTube builds long-term search authority for local mortgage queries." }
    },
  ]
};

const painPoints = [
  {
    icon: "👀",
    pain: "Referral partners go to the loan officer they saw on LinkedIn last week",
    solution: "Weekly educational videos keep you top-of-mind with real estate agents and financial planners — before they ever need to make a referral call.",
  },
  {
    icon: "⏰",
    pain: "You close loans all day — you don't have time to film, edit, and post",
    solution: "Your AI avatar does the posting. You record once at setup. Every video after that runs on autopilot.",
  },
  {
    icon: "📋",
    pain: "Compliance anxiety keeps you from posting anything",
    solution: "Our scripts stay in educational territory: tips, how-tos, market commentary. You review before anything goes live. Nothing promotional, nothing that triggers RESPA concerns.",
  },
];

const contentIdeas = [
  "3 Things First-Time Homebuyers Get Wrong About Down Payments",
  "Why Your Credit Score Isn't the Only Thing That Matters on a Loan Application",
  "What Rising Rates Actually Mean for Your Home Purchase",
  "The Difference Between Pre-Qualification and Pre-Approval",
  "5 Questions to Ask Your Loan Officer Before You Sign",
  "Why Closing Costs Surprise Most Buyers (and How to Prepare)",
  "FHA vs. Conventional: Which Loan Is Right for You?",
  "What to Do If Your Loan Gets Denied",
  "How Long Does the Loan Process Actually Take?",
  "Why Real Estate Agents Prefer Working with Certain Loan Officers",
];

const plans = [
  { name: "Launch", price: "$397/mo", videos: "5/week", platforms: "IG, TT, LI, YT", publishing: "MP4 delivery", highlight: false },
  { name: "Starter", price: "$997/mo", videos: "5/week", platforms: "IG, TT, LI, YT", publishing: "Auto-publishing", highlight: true },
  { name: "Growth", price: "$1,997/mo", videos: "10+/week", platforms: "IG, TT, LI, YT", publishing: "Auto-publishing + White-glove", highlight: false },
];

export default function LoanOfficersPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-indigo-600/20 text-indigo-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-500/30 mb-6">
            For Loan Officers
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Stay top-of-mind with every{" "}
            <span className="text-indigo-400">referral partner</span>
            {" "}— without filming a single video
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Assurgit builds your AI avatar and voice clone, writes compliance-safe educational scripts, and publishes to LinkedIn, Instagram, TikTok, and YouTube — every week, on autopilot.
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
            <span>✓ First videos live within 5 days</span>
            <span>✓ No filming after setup</span>
            <span>✓ Compliance-safe educational content</span>
          </div>

          {/* Social proof callout */}
          <div className="mt-10 inline-block bg-gray-900 border border-gray-700 rounded-xl px-6 py-4 text-left max-w-lg">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Real Result — Week 1</p>
            <p className="text-white text-sm leading-relaxed">
              &ldquo;WellPreparedLife grew their business <strong className="text-indigo-400">50% in their first week</strong> with Assurgit.&rdquo;
            </p>
            <p className="text-gray-500 text-xs mt-2">— Asa Rogers, Founder of Assurgit</p>
          </div>
        </section>

        {/* Pain Points → Solutions */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
            The problem every loan officer faces — and how we solve it
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
            How it works for loan officers
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "30-minute setup call", desc: "We record your avatar, capture your voice clone, and brief ourselves on your niche, market, and target referral partners." },
              { step: "2", title: "We research your market every week", desc: "Our AI monitors what first-time homebuyers, real estate agents, and financial planners are searching and talking about — and builds your content calendar around it." },
              { step: "3", title: "Scripts arrive Monday morning", desc: "5 compliance-safe educational scripts, written in your voice. Approve them, request one round of changes, or skip review entirely — the system runs either way." },
              { step: "4", title: "Videos are rendered and reviewed by humans", desc: "Every video goes through human QC before it reaches your audience. Caption accuracy, rendering quality, platform formatting — checked before publishing." },
              { step: "5", title: "Auto-published to your platforms", desc: "LinkedIn, Instagram, TikTok, YouTube — optimally timed, formatted per platform. Zero manual posting." },
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

        {/* Content ideas */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-4">
            What your content looks like
          </h2>
          <p className="text-gray-400 text-center mb-8 max-w-xl mx-auto">
            Educational, trust-building content that positions you as the expert — not a pitch. Here are examples of the type of scripts we write for loan officers:
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

        {/* Pricing table */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-4">
            Plans for loan officers
          </h2>
          <p className="text-gray-400 text-center mb-10">
            Start with Launch to prove the system works, then scale up as you see results.
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
              Start showing up. Start getting referred.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free 30-minute call. We&apos;ll show you exactly what your content would look like and recommend the right plan for where you are now.
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
            <Link href="/for/mortgage-brokers" className="text-indigo-400 hover:underline">Mortgage Brokers</Link>
            <Link href="/for/financial-advisors" className="text-indigo-400 hover:underline">Financial Advisors</Link>
            <Link href="/for/real-estate-agents" className="text-indigo-400 hover:underline">Real Estate Agents</Link>
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

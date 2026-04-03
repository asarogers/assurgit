import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Competitive Intelligence — Know What's Working Before Your Competitors Do | Assurgit",
  description:
    "Assurgit's research pipeline monitors competitor content, trending topics, and niche keywords every week. The findings feed directly into your scripts — so your content is always one step ahead.",
  openGraph: {
    title: "Competitive Intelligence — Know What's Working Before Your Competitors Do | Assurgit",
    description: "Weekly competitor monitoring, trend tracking, and niche keyword research — all feeding into your video scripts automatically.",
    type: "article",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Competitive Intelligence",
  "provider": { "@type": "Organization", "name": "Assurgit" },
  "description": "Assurgit's competitive intelligence system monitors competitor social content, trending topics, and niche keyword movements on a weekly basis. Findings are synthesized into script briefs and delivered as part of the weekly content pipeline.",
  "offers": {
    "@type": "Offer",
    "price": "397",
    "priceCurrency": "USD",
    "priceSpecification": { "@type": "UnitPriceSpecification", "billingDuration": "P1M" }
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which competitors do you track?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "During onboarding you provide a list of direct competitors and aspirational accounts in your niche. We monitor those, plus any top-performing accounts our research identifies in your space. You can add or remove accounts at any time by messaging your account manager."
      }
    },
    {
      "@type": "Question",
      "name": "How often does the research update?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The competitive intelligence scan runs weekly, timed to feed into the script writing process for the following week. You are always working from research that is less than 7 days old. Major breaking topics in your niche can be flagged for faster inclusion when warranted."
      }
    },
    {
      "@type": "Question",
      "name": "Can I add specific topics or keywords to track?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. During onboarding and at any point during your subscription, you can add specific topics, keywords, hashtags, or competitor accounts to the monitoring list. If a topic is critical to your business — a product launch, a regulatory change, an industry event — tell us and we will prioritize it."
      }
    },
  ]
};

const callouts = [
  {
    title: "Competitor content monitoring",
    body: "We track what your named competitors and top niche accounts are publishing — which formats, which angles, which topics — and note what's getting engagement versus what's being ignored."
  },
  {
    title: "Trending topic identification",
    body: "Platform trend signals, search volume shifts, and viral content patterns in your niche are surfaced weekly. Scripts are timed to catch topics while they're rising, not after they peak."
  },
  {
    title: "Gap analysis",
    body: "We identify topics your competitors are avoiding or underserving — and use those gaps as opportunities to establish you as the authoritative voice in your space."
  },
  {
    title: "Fed directly into scripts",
    body: "The intelligence doesn't sit in a report — it drives the topic selection and angle for each week's scripts. You benefit from the research without ever reading it."
  },
];

export default function CompetitiveIntelligencePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-indigo-600/20 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-500/30">Feature Deep-Dive</span>
            <span className="text-gray-500 text-xs">Updated March 2026 · Assurgit</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
            Competitive Intelligence — Know What&apos;s Working Before Your Competitors Do
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Most content creators pick topics based on gut feel or what they personally find interesting. That approach produces inconsistent results. Assurgit&apos;s research pipeline monitors your competitors, your niche, and your market every week — so every script is grounded in data about what actually performs.
          </p>
        </div>

        {/* What gets monitored */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-4">What the Research Pipeline Monitors</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
            <div className="flex gap-4">
              <span className="text-indigo-400 flex-shrink-0 font-bold text-sm mt-0.5">01</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Competitor social content</p>
                <p className="text-gray-400 text-sm">Your named competitors are tracked across TikTok, Instagram, LinkedIn, and YouTube Shorts. We record which posts earned the most engagement, what format they used, how they framed the topic, and how frequently they are posting. Underperforming content from competitors is just as instructive as their hits.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-indigo-400 flex-shrink-0 font-bold text-sm mt-0.5">02</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Trending topics in your niche</p>
                <p className="text-gray-400 text-sm">Platform-level trend data, rising search queries, and viral content clusters in your specific category are scanned weekly. The goal is to identify topics that are growing before they saturate — not topics that peaked two weeks ago.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-indigo-400 flex-shrink-0 font-bold text-sm mt-0.5">03</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Niche keyword and hashtag movements</p>
                <p className="text-gray-400 text-sm">Search volume changes, hashtag performance shifts, and emerging terminology in your space are tracked. When a new term is gaining traction in your industry, your content should use it before it becomes the standard.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-indigo-400 flex-shrink-0 font-bold text-sm mt-0.5">04</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Content gap analysis</p>
                <p className="text-gray-400 text-sm">We identify topics your competitors are consistently avoiding or treating superficially. Those gaps are opportunities — audiences are searching for answers that no one in your space is providing well. Your scripts claim that ground.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Callout grid */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-6">How Intelligence Becomes Content</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {callouts.map((c) => (
              <div key={c.title} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-white font-bold text-sm mb-2">{c.title}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why this matters */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-4">Why Staying Ahead of Your Market Matters</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              Short-form video platforms reward recency and relevance. An account that consistently publishes content on trending topics in their niche builds algorithmic momentum — more reach, more followers, more inbound authority. An account that publishes evergreen content without monitoring trends is leaving that momentum on the table.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              More importantly, being first on a topic in your niche builds perceived expertise. When someone searches for information about a topic you covered two weeks before your competitors, they find you. When they see you covering things they haven&apos;t heard from others yet, they think of you as the ahead-of-the-curve authority.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              The competitive intelligence process is not designed to help you copy competitors — it is designed to help you identify where to be different, earlier, and better. Every week.
            </p>
          </div>
        </div>

        {/* Social proof */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">Real Result</p>
            <p className="text-white text-lg font-bold mb-2">WellPreparedLife grew their business 50% in their first week with Assurgit.</p>
            <p className="text-gray-400 text-sm">Content grounded in weekly competitive research — not gut feel — from day one.</p>
          </div>
        </div>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Stop guessing. Start publishing what your market actually wants.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. We&apos;ll show you what the competitive intelligence process looks like for your specific niche. Starting at $397/month.
            </p>
            <Link href="/book" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5">
              Book Your Free Call — Starts at $397/mo
            </Link>
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
                  <svg className="w-4 h-4 text-gray-500 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/features/research-pipeline" className="text-indigo-400 hover:underline">Research Pipeline</Link>
            <Link href="/features/ai-script-writing" className="text-indigo-400 hover:underline">AI Script Writing</Link>
            <Link href="/features/human-qc" className="text-indigo-400 hover:underline">Human QC</Link>
            <Link href="/pricing" className="text-indigo-400 hover:underline">Pricing — from $397/mo</Link>
            <Link href="/" className="text-indigo-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Script Writing — Research-Backed Scripts in Your Voice, Every Week | Assurgit",
  description:
    "Assurgit writes five research-backed scripts per week, tailored to your niche and written in your voice. You review in 48 hours or we publish. No generic ChatGPT prompts.",
  openGraph: {
    title: "AI Script Writing — Research-Backed Scripts in Your Voice, Every Week | Assurgit",
    description: "Competitive research, niche targeting, and your brand voice — in five scripts every week. Here's how it works.",
    type: "article",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Script Writing",
  "provider": { "@type": "Organization", "name": "Assurgit" },
  "description": "Assurgit's research pipeline produces five short-form video scripts per week, grounded in competitor analysis and trending topics, written in the client's brand voice and ready for the 48-hour review window.",
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
      "name": "Who actually writes the scripts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Scripts are produced by Assurgit's research pipeline — a combination of automated trend monitoring, competitor content analysis, and AI writing trained on your brand voice inputs. A human strategist reviews each batch before sending it to you. You are not getting raw ChatGPT output; you are getting researched, edited scripts with a human quality pass before they reach your inbox."
      }
    },
    {
      "@type": "Question",
      "name": "Can I request revisions to the scripts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. You have a 48-hour review window each week. If a script misses the mark — wrong angle, wrong tone, outdated information — flag it and we will revise. If we do not hear from you within 48 hours, we treat that as approval and move to rendering. Most clients request minor tweaks on 1–2 scripts per month once the pipeline has learned their voice."
      }
    },
    {
      "@type": "Question",
      "name": "What topics do you cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Topics are driven by your niche, your competitors, and what is currently trending in your space. During onboarding, you give us a list of your core topics, your main competitors, and any topics that are off-limits. The research pipeline then monitors those channels weekly and surfaces the highest-engagement angles for the coming week's scripts."
      }
    },
  ]
};

const callouts = [
  {
    title: "Competitive intelligence first",
    body: "Before writing a word, we scan what your competitors published this week — which posts performed, what angles they used, what topics they missed. Scripts are built to outperform, not duplicate."
  },
  {
    title: "Trend monitoring in your niche",
    body: "The pipeline tracks trending audio, hashtags, and topic clusters in your specific niche. Scripts stay current without you having to spend time on TikTok or LinkedIn researching manually."
  },
  {
    title: "Written in your voice",
    body: "During onboarding we collect writing samples, brand voice notes, and examples of how you naturally talk. Scripts use your vocabulary, your sentence length, your level of formality — not a generic AI tone."
  },
  {
    title: "48-hour review window",
    body: "Scripts land in your inbox early in the week. You have 48 hours to flag revisions. No revision request means approval. Most clients spend 10–15 minutes per week on this step."
  },
];

export default function AiScriptWritingPage() {
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
            AI Script Writing — Research-Backed Scripts in Your Voice, Every Week
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Producing five videos per week means writing five scripts per week. Most business owners stop here — not because they can&apos;t afford video production, but because they do not have time to research, write, and refine scripts consistently. Assurgit removes that bottleneck entirely.
          </p>
        </div>

        {/* The research pipeline */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-4">The Research Pipeline Behind Every Script</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">1</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Competitor content is scanned weekly</p>
                <p className="text-gray-400 text-sm">We track your named competitors plus the top 10–15 accounts in your niche. We note which posts earned the most engagement, which formats they used, and which angles they hit or skipped.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Trending topics are identified</p>
                <p className="text-gray-400 text-sm">Platform trend signals, search interest data, and niche-specific topic clusters are pulled and ranked. The goal is to catch topics while they are rising — not after they peak.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">3</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Topics are selected for the week</p>
                <p className="text-gray-400 text-sm">The strategist selects 5 topics that are relevant, timely, and complementary — not repetitive. If you have flagged any off-limits topics or upcoming promotions, those shape the selection.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">4</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Scripts are written in your voice</p>
                <p className="text-gray-400 text-sm">AI drafts are generated using your voice profile, then reviewed and refined by the strategist. Scripts run 60–90 seconds when spoken at a natural pace — the right length for short-form retention.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">5</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">You review for 48 hours</p>
                <p className="text-gray-400 text-sm">Scripts arrive in your inbox with suggested titles and hooks. You read, flag anything you want changed, and approve. After 48 hours without a response, the batch moves to rendering.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature callouts */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-6">What This Means in Practice</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {callouts.map((c) => (
              <div key={c.title} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-white font-bold text-sm mb-2">{c.title}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why this beats DIY */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-4">Why This Beats Writing Scripts Yourself</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Writing five scripts per week — properly, with research — takes most business owners 5–8 hours. That time almost always comes from somewhere else that matters: client work, business development, or rest. The result is either burnout or inconsistency, and inconsistency kills short-form growth.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              The Assurgit research pipeline runs whether you are busy or not. It does not take sick days, miss trends, or stare at a blank page. You get five finished scripts per week, researched and in your voice, without touching them until they land in your inbox.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              WellPreparedLife grew their business 50% in their first week with Assurgit. The content was consistent and on-topic because the research pipeline was running — not because they had time to research trends themselves.
            </p>
          </div>
        </div>

        {/* Social proof */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">Real Result</p>
            <p className="text-white text-lg font-bold mb-2">WellPreparedLife grew their business 50% in their first week with Assurgit.</p>
            <p className="text-gray-400 text-sm">Five research-backed scripts per week, every week — without spending a single hour on content research.</p>
          </div>
        </div>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Five scripts per week. Zero hours of research.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. We&apos;ll walk through the research pipeline for your specific niche and show you what a week of scripts looks like. Starting at $397/month.
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
            <Link href="/features/competitive-intelligence" className="text-indigo-400 hover:underline">Competitive Intelligence</Link>
            <Link href="/features/research-pipeline" className="text-indigo-400 hover:underline">Research Pipeline</Link>
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

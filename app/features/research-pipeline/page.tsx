import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Research Pipeline — The System Behind Every Script | Assurgit",
  description:
    "Assurgit's research pipeline runs the full cycle from trend monitoring to published video — every week, automatically. Here's the complete system and why it beats DIY content creation.",
  openGraph: {
    title: "Research Pipeline — The System Behind Every Script | Assurgit",
    description: "Trend monitoring → competitor analysis → topic selection → script writing → review → render → QC → publish. The full Assurgit pipeline explained.",
    type: "article",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Research Pipeline",
  "provider": { "@type": "Organization", "name": "Assurgit" },
  "description": "Assurgit's research pipeline is the end-to-end system that takes a client from trend monitoring through competitor analysis, topic selection, script writing, client review, video rendering, human QC, and auto-publishing — every week.",
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
      "name": "How is this different from using ChatGPT myself?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ChatGPT does not monitor your competitors, track platform trends, maintain a voice profile for your brand, render videos with your face and voice, perform quality control, or publish to social media. It writes text when you prompt it. Assurgit is an end-to-end service — research, writing, production, QC, and publishing — that runs weekly without your involvement beyond a 48-hour script review. The output is published videos, not document drafts."
      }
    },
    {
      "@type": "Question",
      "name": "Can I see what the research finds each week?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. On Starter and Growth plans, you receive a weekly brief alongside your scripts. The brief summarizes what the research pipeline found: which competitor posts performed well, which topics are trending in your niche, and why we selected the five topics for the week. You can read it in 5 minutes or skip it — the pipeline runs either way."
      }
    },
    {
      "@type": "Question",
      "name": "How does the pipeline know my niche?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "During onboarding, you provide your primary niche, your audience profile, your core topics, your main competitors, and any off-limits areas. That input shapes the initial monitoring configuration. Over time, the pipeline refines its topic selection based on which scripts you approve without changes versus which you send back for revisions — a signal of what fits your voice and your audience."
      }
    },
  ]
};

const pipelineSteps = [
  {
    step: "01",
    name: "Trend monitoring",
    detail: "Platform trend signals, rising search queries, and viral content patterns in your niche are pulled and ranked. This runs continuously throughout the week, not as a one-time scan."
  },
  {
    step: "02",
    name: "Competitor analysis",
    detail: "Your named competitors and top niche accounts are reviewed for the week's published content. What performed, what flopped, what angles they used, what they avoided."
  },
  {
    step: "03",
    name: "Topic selection",
    detail: "The strategist selects 5 topics for the coming week — chosen for relevance, timing, and complementarity. No two scripts cover the same angle. Your off-limits topics are excluded automatically."
  },
  {
    step: "04",
    name: "Script writing",
    detail: "Scripts are drafted in your brand voice, structured for short-form retention (hook → point → call to action), and run 60–90 seconds at a natural speaking pace."
  },
  {
    step: "05",
    name: "Your 48-hour review",
    detail: "Scripts land in your inbox. You have 48 hours to flag revisions. Silence is approval. Most clients spend 10–15 minutes per week at this stage."
  },
  {
    step: "06",
    name: "Video rendering",
    detail: "Approved scripts are rendered using your custom avatar and cloned voice. Captions are generated and timed. Platform-specific versions are prepared where needed."
  },
  {
    step: "07",
    name: "Human QC",
    detail: "A trained reviewer watches each video and checks against a standardized checklist: avatar quality, lip sync, caption accuracy, branding compliance, audio levels, and format specs."
  },
  {
    step: "08",
    name: "Auto-publishing",
    detail: "QC-cleared videos are published to your connected platforms on your preferred schedule. Captions and hashtags are written and attached. No manual steps required from you."
  },
];

export default function ResearchPipelinePage() {
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
            Research Pipeline — The System Behind Every Script
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Every Assurgit video starts with research and ends with a published post. Between those two points is an 8-step pipeline that runs every week, whether you are working or not. This page explains the full system.
          </p>
        </div>

        {/* Pipeline steps */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-6">The 8-Step Pipeline</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-8 bottom-8 w-px bg-gray-800 hidden sm:block" />
            <div className="space-y-4">
              {pipelineSteps.map((s) => (
                <div key={s.step} className="flex gap-5">
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gray-900 border border-indigo-500/40 text-indigo-400 text-xs font-black flex items-center justify-center z-10">
                    {s.step}
                  </div>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex-1 mb-0">
                    <p className="text-white font-bold text-sm mb-1.5">{s.name}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Your time in the pipeline */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-4">Your Time in the Pipeline: About 30 Minutes Per Week</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Without Assurgit</p>
              <ul className="space-y-2 text-sm text-gray-400 mb-4">
                <li>• 2–3 hrs: Researching competitor content and trends</li>
                <li>• 2–3 hrs: Writing and editing 5 scripts</li>
                <li>• 1–2 hrs: Rendering and formatting videos</li>
                <li>• 1–2 hrs: Writing captions and uploading to platforms</li>
                <li>• 30 min: Reviewing analytics and adjusting</li>
              </ul>
              <div className="pt-4 border-t border-gray-800">
                <p className="text-gray-500 text-sm">Weekly time: <strong className="text-white">7–11+ hours</strong></p>
              </div>
            </div>
            <div className="bg-indigo-600/10 border border-indigo-500/40 rounded-2xl p-6">
              <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">With Assurgit</p>
              <ul className="space-y-2 text-sm text-gray-300 mb-4">
                <li>✅ Research: handled by the pipeline</li>
                <li>✅ Script writing: handled by the pipeline</li>
                <li>✅ Rendering: handled by the pipeline</li>
                <li>✅ Publishing: handled by the pipeline</li>
                <li>— Script review: 10–15 minutes</li>
                <li>— Comment/DM responses: as needed</li>
              </ul>
              <div className="pt-4 border-t border-indigo-500/20">
                <p className="text-indigo-300 text-sm">Weekly time: <strong className="text-white">~30 minutes</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Why it beats DIY */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-4">Why a System Beats Individual Effort</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              The problem with doing content creation yourself is not that you are incapable. It is that the system breaks the moment you have a busy week, a sick day, a travel stretch, or a product launch that needs your attention. Inconsistency is the single biggest killer of short-form social growth.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              The Assurgit pipeline runs on a fixed cadence. It does not care whether you had a bad week. Scripts arrive in your inbox, you review them in 15 minutes, and five videos go live. Every week, without exception, as long as you are a subscriber.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              That consistency compounds over time. An account that posts five times per week for 12 months has 260 videos, a growing algorithmic presence on four platforms, and an archive of content that continues to generate inbound leads. An account that posts when the founder has time has 30 videos and a flat audience graph.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              WellPreparedLife saw what this consistency produces: 50% business growth in the first week. The research pipeline was running from day one.
            </p>
          </div>
        </div>

        {/* Social proof */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">Real Result</p>
            <p className="text-white text-lg font-bold mb-2">WellPreparedLife grew their business 50% in their first week with Assurgit.</p>
            <p className="text-gray-400 text-sm">The pipeline ran. The videos went live. The results followed. Starting at $397/month.</p>
          </div>
        </div>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              The pipeline runs. You review for 30 minutes. Five videos go live.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. We&apos;ll walk through the pipeline for your specific niche and show you what a week of research-backed content looks like. Starting at $397/month.
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
            <Link href="/features/ai-script-writing" className="text-indigo-400 hover:underline">AI Script Writing</Link>
            <Link href="/features/human-qc" className="text-indigo-400 hover:underline">Human QC</Link>
            <Link href="/features/auto-publishing" className="text-indigo-400 hover:underline">Auto-Publishing</Link>
            <Link href="/pricing" className="text-indigo-400 hover:underline">Pricing — from $397/mo</Link>
            <Link href="/" className="text-indigo-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

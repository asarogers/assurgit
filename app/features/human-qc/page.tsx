import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Human QC — Every Video Reviewed Before It Goes Live | Assurgit",
  description:
    "Every Assurgit video passes a human quality check before publishing. Rendering errors, caption issues, branding problems, and format mismatches get caught before your audience sees them.",
  openGraph: {
    title: "Human QC — Every Video Reviewed Before It Goes Live | Assurgit",
    description: "A human reviews every video before it publishes. Here's what gets checked and why it matters.",
    type: "article",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Human Quality Control",
  "provider": { "@type": "Organization", "name": "Assurgit" },
  "description": "Every video produced by Assurgit passes a human quality control review before publishing. The QC pass covers rendering quality, caption accuracy, branding compliance, and platform format specifications.",
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
      "name": "What gets caught in QC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common catches include: lip sync drift in the avatar, caption timing errors, missing or incorrect branding elements (logo placement, colors), aspect ratio issues for specific platforms, audio clipping or volume inconsistencies, and rendering artifacts in the avatar or background. The majority of videos pass QC cleanly. When something is caught, it is fixed and re-checked before publishing."
      }
    },
    {
      "@type": "Question",
      "name": "Does QC delay publishing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. QC is built into the production schedule, not added on top of it. Videos are rendered earlier in the week specifically to leave time for the QC pass before the publishing window. You will not experience delays from QC — it runs as part of the standard pipeline."
      }
    },
    {
      "@type": "Question",
      "name": "Who does the QC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "QC is performed by a trained Assurgit team member using a standardized checklist. It is not automated — a human watches each video, checks each item on the list, and signs off or flags for re-render. This is why Assurgit can guarantee that nothing embarrassing goes live."
      }
    },
  ]
};

const checklistItems = [
  { label: "Avatar rendering quality", detail: "No artifacts, glitches, or uncanny valley moments in the avatar animation." },
  { label: "Lip sync accuracy", detail: "Voice and avatar mouth movement aligned within acceptable frame tolerance." },
  { label: "Caption timing and accuracy", detail: "Captions match the spoken audio, appear and disappear at the right times, and are readable on mobile." },
  { label: "Branding compliance", detail: "Logo placement, color palette, and any branded elements match the client's specifications." },
  { label: "Audio levels and quality", detail: "No clipping, no background noise bleed, volume consistent throughout the video." },
  { label: "Platform format specs", detail: "Aspect ratio, resolution, and file format match the requirements for each target platform." },
  { label: "Hook and pacing", detail: "The first 3 seconds are strong enough to stop a scroll. Pacing is appropriate for short-form retention." },
];

export default function HumanQcPage() {
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
            Human QC — Every Video Reviewed Before It Goes Live
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Fully automated video pipelines ship errors. Avatar glitches, caption drift, audio clipping, wrong aspect ratios — these problems are common in AI-generated video, and they go live without a human in the loop. Assurgit puts a trained reviewer on every video before it publishes.
          </p>
        </div>

        {/* What QC checks */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-6">The QC Checklist</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl divide-y divide-gray-800">
            {checklistItems.map((item) => (
              <div key={item.label} className="flex gap-4 p-5">
                <span className="text-indigo-400 flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <p className="text-white font-semibold text-sm mb-0.5">{item.label}</p>
                  <p className="text-gray-400 text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why it matters */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-4">Why QC Matters More Than You Might Think</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              A glitchy AI avatar video does not just look bad — it actively damages trust. Viewers who see rendering errors assume the creator is either careless or using cheap tools. In a business context, where your content is building credibility and attracting clients, a single embarrassing video can cost more than a month of subscription fees.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Caption errors are a less obvious but equally damaging problem. A significant percentage of short-form video is watched on mute. If captions are off by even a few words, viewers notice — and they do not come back.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              The QC step also catches issues specific to individual platforms. A video formatted for Instagram Reels does not automatically work for LinkedIn — the aspect ratio, the caption style, and the hook pacing all need to be adjusted. A human reviewer who knows each platform&apos;s requirements catches these mismatches before they become published mistakes.
            </p>
          </div>
        </div>

        {/* Feature callouts */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-6">What QC Protects You From</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: "Public avatar glitches",
                body: "AI avatar rendering errors that would embarrass you or your brand in front of your audience."
              },
              {
                title: "Caption failures",
                body: "Timing errors, wrong words, or missing captions that break the experience for the 60%+ of viewers watching on mute."
              },
              {
                title: "Platform rejections",
                body: "Format mismatches that cause platforms to crop, reject, or penalize your video post — wasting the production entirely."
              },
            ].map((c) => (
              <div key={c.title} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-white font-bold text-sm mb-2">{c.title}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">Real Result</p>
            <p className="text-white text-lg font-bold mb-2">WellPreparedLife grew their business 50% in their first week with Assurgit.</p>
            <p className="text-gray-400 text-sm">Every video that went live had passed human QC. No embarrassing moments, no platform errors, no content their audience would cringe at.</p>
          </div>
        </div>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Nothing embarrassing goes live. Ever.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. We&apos;ll show you the QC process, explain how we catch issues before publishing, and walk you through what your content pipeline would look like. Starting at $397/month.
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
            <Link href="/features/auto-publishing" className="text-indigo-400 hover:underline">Auto-Publishing</Link>
            <Link href="/features/ai-avatar" className="text-indigo-400 hover:underline">AI Avatar Creation</Link>
            <Link href="/features/research-pipeline" className="text-indigo-400 hover:underline">Research Pipeline</Link>
            <Link href="/pricing" className="text-indigo-400 hover:underline">Pricing — from $397/mo</Link>
            <Link href="/" className="text-indigo-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Voice Cloning — Your Voice, Not a Robot | Assurgit",
  description:
    "Assurgit clones your real voice from a 1–2 minute audio sample. Every video sounds like you — not a generic text-to-speech engine. Here's exactly how it works.",
  openGraph: {
    title: "Voice Cloning — Your Voice, Not a Robot | Assurgit",
    description: "One short audio sample. A voice clone used in every video, every week. No robot voices.",
    type: "article",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Voice Cloning",
  "provider": { "@type": "Organization", "name": "Assurgit" },
  "description": "Assurgit trains a high-fidelity voice clone from a short audio sample. The cloned voice is used in every video produced for the client — matching their natural tone, pacing, and inflection.",
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
      "name": "How long does voice cloning take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Voice clone training typically completes within 24–48 hours of receiving your audio sample. We test it against a sample script and send you a preview before it's used in any published content. The full onboarding process — avatar and voice clone together — takes 3–5 business days."
      }
    },
    {
      "@type": "Question",
      "name": "What if my voice changes significantly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If your voice changes — due to illness, aging, or anything else — you can submit a new sample and we'll retrain the clone. There's no extra charge for a single refresh. Most clients run the same voice clone for 12+ months without any update."
      }
    },
    {
      "@type": "Question",
      "name": "Is my voice clone used without my permission?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Your voice clone is used exclusively for content produced for your account. It is not shared, licensed, or used for any other purpose. You own your voice data and can request deletion at any time by ending your subscription."
      }
    },
  ]
};

const callouts = [
  {
    title: "1–2 minutes of audio",
    body: "We send you a short script to read aloud — a mix of sentence structures, speeds, and emotional registers. Most clients record this on their phone in under 10 minutes."
  },
  {
    title: "Matched to your natural cadence",
    body: "The clone preserves your actual speaking pace, your pauses, your inflection patterns. It doesn't flatten everything into the same robotic rhythm that generic TTS engines produce."
  },
  {
    title: "Synced to your avatar",
    body: "Voice and avatar are rendered together. Lip sync is matched frame-by-frame, not approximated. The result is a video that looks and sounds like you recorded it naturally."
  },
  {
    title: "Included on all plans",
    body: "Voice cloning is not an add-on. Every Assurgit plan — Launch, Starter, and Growth — includes a custom voice clone at no extra charge. Starting at $397/month."
  },
];

export default function VoiceCloningPage() {
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
            Voice Cloning — Your Voice, Not a Robot
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Generic text-to-speech voices are identifiable in two seconds. They flatten everything into the same cadence, kill nuance, and make content feel cheap. Assurgit clones your actual voice from a short audio sample — so every video sounds like you recorded it yourself.
          </p>
        </div>

        {/* What makes a good voice clone */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-4">What Makes a Good Voice Clone</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              Voice clone quality depends almost entirely on the source audio. A clean 60–90 second recording in a quiet environment produces a noticeably better result than a 3-minute recording taken in a noisy room. We send detailed recording instructions with every onboarding.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Key factors for a high-quality clone:
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex gap-2"><span className="text-indigo-400 flex-shrink-0">—</span> Minimal background noise (a quiet room, not a coffee shop)</li>
              <li className="flex gap-2"><span className="text-indigo-400 flex-shrink-0">—</span> Natural speaking pace — don&apos;t rush or over-enunciate</li>
              <li className="flex gap-2"><span className="text-indigo-400 flex-shrink-0">—</span> Variety in sentence length and tone within the sample</li>
              <li className="flex gap-2"><span className="text-indigo-400 flex-shrink-0">—</span> A decent microphone — built-in laptop mics are acceptable, dedicated mics are better</li>
              <li className="flex gap-2"><span className="text-indigo-400 flex-shrink-0">—</span> No music or ambient audio in the background</li>
            </ul>
            <p className="text-gray-400 text-sm leading-relaxed">
              We review every source recording before training begins. If audio quality is likely to produce a poor clone, we&apos;ll tell you and ask for a re-record before wasting the training cycle.
            </p>
          </div>
        </div>

        {/* How it's used */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-6">How the Voice Clone Is Used in Every Video</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {callouts.map((c) => (
              <div key={c.title} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-white font-bold text-sm mb-2">{c.title}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison: generic TTS vs clone */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-6">Generic TTS vs. Your Cloned Voice</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Generic Text-to-Speech</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Flat, even pacing regardless of content</li>
                <li>• Sounds like a navigation system</li>
                <li>• No emotional variation</li>
                <li>• Immediately identifiable as AI</li>
                <li>• Same voice used by thousands of other accounts</li>
              </ul>
            </div>
            <div className="bg-indigo-600/10 border border-indigo-500/40 rounded-2xl p-6">
              <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">Your Cloned Voice</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✅ Matches your natural rhythm and pace</li>
                <li>✅ Preserves your inflection patterns</li>
                <li>✅ Sounds like you recorded it in your office</li>
                <li>✅ Unique to your account — no one else has it</li>
                <li>✅ Gets better as the pipeline learns your style</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">Real Result</p>
            <p className="text-white text-lg font-bold mb-2">WellPreparedLife grew their business 50% in their first week with Assurgit.</p>
            <p className="text-gray-400 text-sm">Their audience heard their real voice in every video — even though they never stepped in front of a camera.</p>
          </div>
        </div>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Sound like yourself. Every video.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call and we&apos;ll show you what your content sounds like — your voice, your avatar — before you commit. Starting at $397/month, voice cloning included on every plan.
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
            <Link href="/features/ai-avatar" className="text-indigo-400 hover:underline">AI Avatar Creation</Link>
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

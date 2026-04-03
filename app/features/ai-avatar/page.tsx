import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "AI Avatar Creation — Your Face in Every Video, Without Filming | Assurgit",
  description:
    "How Assurgit builds a custom AI avatar from a 30-minute recording session — so your face and presence appear in every video, every week, without you ever picking up a camera again.",
  openGraph: {
    title: "AI Avatar Creation — Your Face in Every Video, Without Filming | Assurgit",
    description: "One recording session. A custom avatar that shows up for you every week. Here's exactly how it works.",
    type: "article",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Avatar Creation",
  "provider": { "@type": "Organization", "name": "Assurgit" },
  "description": "A done-for-you AI avatar built from a short video recording. Assurgit trains a custom avatar on your face and likeness so every video features you — without any ongoing filming.",
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
      "name": "Can people tell it's an AI avatar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For most short-form video content — 30 to 90 seconds — the avatar is visually convincing in a natural scroll environment. Close-up scrutiny on a desktop will reveal it's AI-generated. We don't recommend pretending otherwise: our clients typically disclose in their bio or first video that they use an AI avatar, which most audiences accept because the content itself is genuine and valuable."
      }
    },
    {
      "@type": "Question",
      "name": "How realistic is the avatar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Current avatar quality is comparable to leading enterprise AI video platforms. Facial expressions, lip sync, and head movement are smooth. Eye contact, blinking, and natural micro-movements are all included. The realism improves with a higher-quality source recording — we send detailed instructions on lighting and framing before your session."
      }
    },
    {
      "@type": "Question",
      "name": "Can I update my avatar later?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. If your appearance changes significantly — new haircut, glasses, major weight change — you can request an avatar refresh. We re-record and retrain. Most clients update once every 6–12 months if at all. Minor changes like a beard trim don't require an update."
      }
    },
  ]
};

const callouts = [
  {
    title: "One 30-minute session",
    body: "You record a short source video following our guide. No studio required — a decent camera, good lighting, and a plain background is enough. Most clients do this from their home office."
  },
  {
    title: "Trained on your face",
    body: "We submit your footage to the avatar training pipeline. Within 3–5 business days, you have a custom avatar that reproduces your facial expressions, lip movements, and head gestures."
  },
  {
    title: "Used in every video",
    body: "Your avatar renders into every video we produce — five per week, every week. No repeat sessions, no scheduling around your calendar, no studio bookings."
  },
  {
    title: "Your likeness, not a template",
    body: "Stock avatars look like stock avatars. Your clients watch your content because they trust you — not a generic AI presenter. The avatar maintains that trust at scale."
  },
];

export default function AiAvatarPage() {
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
            AI Avatar Creation — Your Face in Every Video, Without Filming
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Most people assume video content means filming content. With Assurgit, you record once — about 30 minutes — and we train a custom AI avatar on your face and likeness. That avatar then appears in every video we produce for you, indefinitely.
          </p>
        </div>

        {/* How it works */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-4">How It Works</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">1</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">You book a short onboarding call</p>
                <p className="text-gray-400 text-sm">We walk through the recording instructions: what to wear, how to frame the camera, where to look, and how to speak naturally on camera. The goal is source footage that captures your real presence.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">You record and submit your footage</p>
                <p className="text-gray-400 text-sm">Most clients complete this in under an hour from their home or office. You upload the footage to a shared folder. No special equipment needed beyond a modern smartphone or webcam and decent natural light.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">3</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">We train and verify your avatar</p>
                <p className="text-gray-400 text-sm">Avatar training takes 3–5 business days. We test it against several script samples before signing off. You receive a short preview clip to approve. If something looks off, we flag it and re-train before anything goes live.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">4</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Your avatar is used in every video, every week</p>
                <p className="text-gray-400 text-sm">Once approved, your avatar renders into every video we produce — five per week on all plans. You never have to think about filming again.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why it matters */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-4">Why a Personal Avatar Outperforms Stock Avatars</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Several AI video services use generic presenter avatars — professional-looking, but not you. That distinction matters more than it sounds. Audiences on Instagram, TikTok, LinkedIn, and YouTube are following people, not faceless brands. When your face is on the content, watch time is longer, trust builds faster, and followers convert to clients at a higher rate.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            WellPreparedLife, one of Assurgit&apos;s early clients, grew their business 50% in their first week after switching to content featuring their personal avatar. The content was not more complex — it was just more recognizably them.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {callouts.map((c) => (
              <div key={c.title} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-white font-bold text-sm mb-2">{c.title}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Authenticity note */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-4">A Note on Authenticity</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              AI avatars are not a secret in 2026. Most sophisticated social media users understand that creators use tools, editors, and production assistance. What they care about is whether the content is real — whether the ideas, the expertise, and the voice behind it are genuinely yours.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              With Assurgit, the scripts are researched around your niche and written in your voice. The avatar is your face. The voice clone is your actual voice. What you are outsourcing is the production labor — not the substance.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              We recommend transparent disclosure. Most clients include a short line in their bio or a pinned post explaining they use AI video production. In our experience, this increases trust rather than reducing it — it signals that you are running a serious, modern operation.
            </p>
          </div>
        </div>

        {/* Social proof */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">Real Result</p>
            <p className="text-white text-lg font-bold mb-2">WellPreparedLife grew their business 50% in their first week with Assurgit.</p>
            <p className="text-gray-400 text-sm">Without filming a single new video. Their personal avatar did the work.</p>
          </div>
        </div>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Your face. Your voice. No filming required.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call and we&apos;ll show you a sample of what your content would look like — your avatar, your voice — before you commit to anything. Starting at $397/month.
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
            <Link href="/features/voice-cloning" className="text-indigo-400 hover:underline">Voice Cloning</Link>
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

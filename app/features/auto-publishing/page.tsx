import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Auto-Publishing — Set It and Forget It Across 4 Platforms | Assurgit",
  description:
    "Assurgit auto-publishes your videos to Instagram, TikTok, LinkedIn, and YouTube on Starter and Growth plans. Platform-specific formatting, captions, and scheduling handled automatically.",
  openGraph: {
    title: "Auto-Publishing — Set It and Forget It Across 4 Platforms | Assurgit",
    description: "Five videos per week, four platforms, zero manual uploading. Here's how auto-publishing works.",
    type: "article",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Auto-Publishing",
  "provider": { "@type": "Organization", "name": "Assurgit" },
  "description": "Assurgit's auto-publishing feature schedules and publishes videos to Instagram, TikTok, LinkedIn, and YouTube automatically on Starter and Growth plans. Includes platform-specific formatting, caption writing, and posting schedule management.",
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
      "name": "Can I control the posting schedule?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. During onboarding you specify your preferred posting days and times for each platform. We configure the schedule accordingly. If you want to shift the schedule later — for a product launch, a holiday, or any other reason — message your account manager and we will adjust it."
      }
    },
    {
      "@type": "Question",
      "name": "What if I want to pause publishing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can pause publishing at any time by contacting your account manager. Common reasons include vacations, major business changes, or promotional blackout periods. Pausing does not affect your subscription — videos continue to be produced and queued, and publishing resumes when you are ready."
      }
    },
    {
      "@type": "Question",
      "name": "Do you write the captions and hashtags?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Every published video includes a platform-appropriate caption written by the Assurgit team. Captions are not copy-pasted across platforms — LinkedIn captions are written differently than TikTok captions. Hashtags are researched for each platform based on your niche and the specific video topic."
      }
    },
  ]
};

const platforms = [
  {
    name: "Instagram Reels",
    handle: "@yourhandle",
    notes: "9:16 vertical format. Caption optimized for discovery and saves. Hashtags selected for reach in your niche.",
    color: "from-pink-600/20 to-purple-600/20",
    border: "border-pink-500/30",
    label: "text-pink-400",
  },
  {
    name: "TikTok",
    handle: "@yourhandle",
    notes: "9:16 vertical format. Hook-first structure. Trending audio consideration. Hashtag strategy tuned for For You page visibility.",
    color: "from-sky-600/20 to-teal-600/20",
    border: "border-sky-500/30",
    label: "text-sky-400",
  },
  {
    name: "LinkedIn",
    handle: "Your Name",
    notes: "1:1 or 4:5 format. Professional caption tone. Thought leadership framing. No hashtag overload — 3–5 relevant tags.",
    color: "from-blue-600/20 to-indigo-600/20",
    border: "border-blue-500/30",
    label: "text-blue-400",
  },
  {
    name: "YouTube Shorts",
    handle: "@yourchannel",
    notes: "9:16 vertical. Title optimized for search. Description with timestamps and links. Tags for discovery.",
    color: "from-red-600/20 to-orange-600/20",
    border: "border-red-500/30",
    label: "text-red-400",
  },
];

export default function AutoPublishingPage() {
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
            Auto-Publishing — Set It and Forget It Across 4 Platforms
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Producing videos is only half the job. The other half is getting them published — with the right format, the right caption, the right hashtags — on four different platforms that each have their own requirements. Assurgit handles all of it automatically on Starter and Growth plans.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 rounded-lg px-4 py-2">
            <span className="text-indigo-400 text-xs font-semibold">Available on: Starter & Growth plans — starting at $997/month</span>
          </div>
        </div>

        {/* Platform breakdown */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-6">The 4 Platforms — What Gets Published Where</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {platforms.map((p) => (
              <div key={p.name} className={`bg-gradient-to-br ${p.color} border ${p.border} rounded-xl p-5`}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${p.label}`}>{p.name}</p>
                <p className="text-gray-500 text-xs mb-3">{p.handle}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{p.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How scheduling works */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-4">How Scheduling Works</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">1</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">You set your preferences in onboarding</p>
                <p className="text-gray-400 text-sm">Choose posting days, preferred posting windows (morning, afternoon, evening), and any blackout dates. Each platform can have a different schedule if you prefer.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Videos are queued after QC sign-off</p>
                <p className="text-gray-400 text-sm">Once a video passes human QC, it is added to the publishing queue for each platform. Captions and hashtags are written and attached at this stage.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">3</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Videos publish automatically at the scheduled time</p>
                <p className="text-gray-400 text-sm">No manual login, no uploading, no copy-pasting captions. The video goes live on each platform at the right time, in the right format, with the right caption.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">4</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">You see the result in your feed</p>
                <p className="text-gray-400 text-sm">Your only job is to respond to comments and DMs when they come in. Content creation, production, and distribution are handled.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform-specific formatting */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-4">Platform-Specific Formatting — Why It Matters</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              One video does not work on four platforms without adaptation. A 9:16 Reel is cropped incorrectly on LinkedIn. A TikTok-style hook feels out of place in a LinkedIn feed. A YouTube title optimized for search is useless as a TikTok caption. Publishing the same file with the same text to all four platforms is a common mistake that results in lower reach and engagement on every platform.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Assurgit formats each video for its destination platform: correct aspect ratio, platform-native caption style, and hashtag strategy tailored to how each algorithm works. The source content is the same — the execution is platform-appropriate.
            </p>
          </div>
        </div>

        {/* Social proof */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">Real Result</p>
            <p className="text-white text-lg font-bold mb-2">WellPreparedLife grew their business 50% in their first week with Assurgit.</p>
            <p className="text-gray-400 text-sm">Across all four platforms. Without manually uploading a single video or writing a single caption.</p>
          </div>
        </div>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Five videos. Four platforms. Zero manual uploads.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. We&apos;ll show you what your publishing pipeline looks like — what posts when, on which platform, with what caption. Starting at $397/month.
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
            <Link href="/features/human-qc" className="text-indigo-400 hover:underline">Human QC</Link>
            <Link href="/features/ai-script-writing" className="text-indigo-400 hover:underline">AI Script Writing</Link>
            <Link href="/features/ai-avatar" className="text-indigo-400 hover:underline">AI Avatar Creation</Link>
            <Link href="/pricing" className="text-indigo-400 hover:underline">Pricing — from $397/mo</Link>
            <Link href="/" className="text-indigo-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Assurgit vs. Synthesia: Why Done-For-You Beats DIY Enterprise Video",
  description:
    "Synthesia is a DIY enterprise tool with stock avatars and no publishing. Assurgit is a done-for-you service with your personal avatar, voice clone, and auto-publishing. See the real difference.",
  openGraph: {
    title: "Assurgit vs. Synthesia: Done-For-You vs. DIY Enterprise Video",
    description:
      "Synthesia charges enterprise prices for a tool you still have to run yourself. Assurgit does everything for you — at a lower total cost.",
    type: "article",
  },
};

// STYLE: AGGRESSIVE — Assurgit clearly wins on personal avatar, done-for-you, price, publishing

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Assurgit better than Synthesia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For social media content creation, yes — definitively. Synthesia is an enterprise presentation tool designed for training videos and internal communications. It uses stock avatars (your personal avatar requires a paid custom avatar add-on), has no auto-publishing, no script research, and no social media integration. Assurgit is purpose-built for short-form social video: personal avatar, voice clone, research-backed scripts, and auto-publishing included.",
      },
    },
    {
      "@type": "Question",
      name: "Does Synthesia publish to social media?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Synthesia renders video files that you download as MP4s. You are responsible for writing captions, uploading to each social media platform, scheduling, and managing your accounts. Assurgit auto-publishes to Instagram, TikTok, LinkedIn, and YouTube on Starter and Growth plans.",
      },
    },
    {
      "@type": "Question",
      name: "Can Synthesia clone my voice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Synthesia offers voice clone technology on their Personal plan ($29/month), but the quality and customization are limited compared to a dedicated voice cloning workflow. More importantly, Synthesia doesn't write scripts in your voice, research your niche, or produce content designed for social media engagement. Having the voice is useless without the strategy and distribution.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Synthesia cost compared to Assurgit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Synthesia's Personal plan is $29/month (10 minutes of video/month). Their Starter plan is $89/month, and enterprise pricing starts at several hundred dollars per month. But these are tool costs — you still do all the work. When you add the time required to script, operate, and publish, Synthesia's true cost is far higher than the subscription. Assurgit starts at $397/month for everything done for you.",
      },
    },
    {
      "@type": "Question",
      name: "Does Synthesia write scripts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Synthesia has a basic AI script assistant, but it does not research your niche, analyze your competitors, or write scripts tailored to your brand voice and audience. Assurgit's research pipeline produces scripts grounded in what's actually working in your specific market every single week.",
      },
    },
    {
      "@type": "Question",
      name: "Who is Synthesia designed for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Synthesia is designed for enterprise teams creating training videos, onboarding content, and internal communications — not social media content. Its interface, templates, and avatar library are optimized for corporate presentations, not short-form social video. If you're a founder or brand trying to grow on Instagram, TikTok, or LinkedIn, Synthesia is the wrong tool for the job.",
      },
    },
  ],
};

const comparisonRows = [
  {
    feature: "Scripts written for you",
    assurgit: "✅ Research-backed, niche-specific",
    synthesia: "❌ You write them (basic AI assist only)",
    winner: "assurgit",
  },
  {
    feature: "Personal avatar (your face)",
    assurgit: "✅ Built from your video — included",
    synthesia: "⚠️ Paid custom avatar add-on required",
    winner: "assurgit",
  },
  {
    feature: "Voice clone",
    assurgit: "✅ Included on all plans",
    synthesia: "⚠️ Available but limited quality",
    winner: "assurgit",
  },
  {
    feature: "Auto-publishing to social media",
    assurgit: "✅ IG, TikTok, LinkedIn, YouTube",
    synthesia: "❌ You download MP4s and post manually",
    winner: "assurgit",
  },
  {
    feature: "Competitive research included",
    assurgit: "✅ Weekly niche intel",
    synthesia: "❌ No research capability",
    winner: "assurgit",
  },
  {
    feature: "Human QC before publishing",
    assurgit: "✅ Every video reviewed",
    synthesia: "❌ No QC layer — you check your own work",
    winner: "assurgit",
  },
  {
    feature: "Designed for social media",
    assurgit: "✅ Purpose-built for short-form social",
    synthesia: "❌ Built for enterprise training videos",
    winner: "assurgit",
  },
  {
    feature: "Time you spend per week",
    assurgit: "~30 minutes (optional review)",
    synthesia: "5–15+ hours (scripting, rendering, posting)",
    winner: "assurgit",
  },
  {
    feature: "Tool subscription cost",
    assurgit: "$397/month (all-in)",
    synthesia: "$29–$500+/month (tool only)",
    winner: "tie",
  },
  {
    feature: "True total cost (time included)",
    assurgit: "$397/month",
    synthesia: "$3,000–$6,000+/month equivalent",
    winner: "assurgit",
  },
  {
    feature: "Output guarantee",
    assurgit: "5 videos/week, delivered",
    synthesia: "Only if you put in the hours",
    winner: "assurgit",
  },
  {
    feature: "Onboarding",
    assurgit: "30-min call, live in 5 days",
    synthesia: "Self-serve (enterprise: add weeks)",
    winner: "assurgit",
  },
  {
    feature: "Cancellation",
    assurgit: "Month-to-month, cancel anytime",
    synthesia: "Annual plans required on most tiers",
    winner: "assurgit",
  },
];

export default function AssurgitVsSynthesiaPage() {
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
            <span className="bg-red-600/20 text-red-400 text-xs font-semibold px-3 py-1 rounded-full border border-red-500/30">
              Comparison
            </span>
            <span className="text-gray-500 text-xs">
              Updated March 2026 · By Asa Rogers, Founder of Assurgit
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
            Assurgit vs. Synthesia: One Does the Work. One Leaves It All to You.
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Synthesia is an enterprise video tool built for corporate training decks. Assurgit is a done-for-you short-form video service built for founders and brands who need to show up on social media every week — without doing any of the work themselves.
          </p>
          <div className="mt-6 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <p className="text-amber-300 text-sm">
              <strong>Bottom line upfront:</strong> Synthesia charges enterprise prices for a rendering tool you still have to operate entirely yourself. If your goal is consistent short-form social content, Synthesia is the wrong category of product.
            </p>
          </div>
        </div>

        {/* What Synthesia actually is */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-2xl font-black text-white mb-6">What Synthesia Actually Is (And Isn&apos;t)</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Synthesia was built for enterprise L&D teams producing training videos. Its avatar library is full of stock presenters designed for corporate onboarding. Its interface is optimized for slide-style presentations with talking-head narration. It is genuinely excellent at what it was built for.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              What it was not built for: short-form social media content. There&apos;s no social media publishing. No niche research. No competitive analysis. No script writing built around what performs on Instagram, TikTok, or LinkedIn. No auto-captioning optimized for mobile. And critically — your personal face and voice require expensive add-ons that Synthesia originally designed for enterprise custom avatar programs.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Using Synthesia to build a social media presence is like buying a dump truck to deliver flowers. The technology exists — but the tool wasn&apos;t designed for the job.
            </p>
          </div>
        </div>

        {/* Core difference cards */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Synthesia</p>
              <h3 className="text-xl font-black text-white mb-4">Enterprise tool. All work on you.</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>❌ You write every script yourself</li>
                <li>❌ Your personal avatar costs extra</li>
                <li>❌ No auto-publishing — manual MP4 downloads</li>
                <li>❌ No niche or competitor research</li>
                <li>❌ Built for training videos, not social content</li>
                <li>❌ Annual contracts on most real tiers</li>
              </ul>
              <div className="mt-5 pt-4 border-t border-gray-800">
                <p className="text-gray-500 text-sm">
                  Tool cost: <strong className="text-white">$29–$500+/month</strong>
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Your time: <strong className="text-white">5–15+ hours/week</strong>
                </p>
              </div>
            </div>

            <div className="bg-indigo-600/10 border border-indigo-500/40 rounded-2xl p-6">
              <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">Assurgit</p>
              <h3 className="text-xl font-black text-white mb-4">Purpose-built for social. Done for you.</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✅ Scripts researched and written for your niche</li>
                <li>✅ Your personal avatar — included at onboarding</li>
                <li>✅ Auto-published to IG, TikTok, LinkedIn, YouTube</li>
                <li>✅ Weekly competitive intel reports</li>
                <li>✅ Human QC on every video before it goes live</li>
                <li>✅ Month-to-month, cancel anytime</li>
              </ul>
              <div className="mt-5 pt-4 border-t border-indigo-500/20">
                <p className="text-indigo-300 text-sm">
                  All-in cost: <strong className="text-white">From $397/month</strong>
                </p>
                <p className="text-indigo-300 text-sm mt-1">
                  Your time: <strong className="text-white">~30 min/week</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-2xl font-black text-white mb-6">Feature-by-Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900">
                  <th className="text-left py-3 px-4 font-semibold text-gray-400 w-1/3">Feature</th>
                  <th className="text-left py-3 px-4 font-semibold text-indigo-400">Assurgit</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-400">Synthesia</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-t border-gray-800 ${i % 2 === 0 ? "" : "bg-gray-900/50"}`}
                  >
                    <td className="py-3 px-4 text-gray-400 font-medium">{row.feature}</td>
                    <td className="py-3 px-4 text-gray-200">{row.assurgit}</td>
                    <td className="py-3 px-4 text-gray-400">{row.synthesia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* The avatar problem */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-2xl font-black text-white mb-4">The Personal Avatar Problem</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Social media audiences don&apos;t connect with stock avatars. They follow people. When your video features a generic Synthesia presenter named &ldquo;Anna&rdquo; instead of your actual face, you forfeit the entire trust-building value of consistent video content.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Synthesia offers &ldquo;custom avatars&rdquo; — but this was originally an enterprise feature with significant add-on costs. Even when available, you still need to write scripts, operate the platform, and distribute everything yourself.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Assurgit builds your personal AI avatar from a 30-minute video recording during onboarding. Your face. Your voice. Your mannerisms. Every video looks like you filmed it. That&apos;s not a feature — it&apos;s the entire point.
            </p>
          </div>
        </div>

        {/* Who should use which */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-2xl font-black text-white mb-6">Who Should Use Which</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="font-bold text-white mb-3">Use Synthesia if:</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• You&apos;re an L&D team producing employee training videos</li>
                <li>• You need corporate onboarding content at scale</li>
                <li>• You don&apos;t need your personal face on the content</li>
                <li>• Social media publishing isn&apos;t the goal</li>
                <li>• You have a content team to handle all the operations</li>
              </ul>
            </div>
            <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-5">
              <h3 className="font-bold text-white mb-3">Use Assurgit if:</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✅ You want to grow on Instagram, TikTok, LinkedIn, or YouTube</li>
                <li>✅ You need your real face and voice on the content</li>
                <li>✅ You don&apos;t want to spend hours writing and publishing</li>
                <li>✅ You need 20+ videos per month consistently</li>
                <li>✅ You want research-backed scripts, not just rendering</li>
              </ul>
            </div>
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
              Without touching Synthesia. Without writing a single script. Without filming anything new.
            </p>
          </div>
        </div>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Stop running a tool. Start getting results.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. We&apos;ll show you a sample of your content — your real face, your real voice — and get you live within 5 business days.
            </p>
            <Link
              href="/book"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
            >
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
            <Link href="/compare/assurgit-vs-heygen" className="text-indigo-400 hover:underline">
              Assurgit vs. HeyGen
            </Link>
            <Link href="/compare/done-for-you-vs-diy-video" className="text-indigo-400 hover:underline">
              Done-For-You vs. DIY AI Video (Full Guide)
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

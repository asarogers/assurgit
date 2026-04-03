import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Assurgit vs. HeyGen: Done-For-You vs. Do-It-Yourself",
  description:
    "HeyGen gives you a tool. Assurgit does it for you. Compare pricing, output, time investment, and results to see which is right for your business.",
  openGraph: {
    title: "Assurgit vs. HeyGen: Done-For-You vs. Do-It-Yourself",
    description: "HeyGen gives you a tool. Assurgit does it for you. Real comparison of price, effort, and results.",
    type: "article",
  },
};

// STYLE: AGGRESSIVE — Assurgit clearly wins on hands-off value
// (counterpart balanced-style page to A/B test: compare/done-for-you-vs-diy-video)

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Assurgit better than HeyGen?",
      "acceptedAnswer": { "@type": "Answer", "text": "They serve different needs. HeyGen is a DIY tool — you write scripts, render videos, and post everything yourself. Assurgit is a done-for-you service — we build your avatar, write your scripts, render the videos, and auto-publish them. If you have 10+ hours a week to spend on content creation, HeyGen is cheaper. If you want results without the time investment, Assurgit is the better choice." }
    },
    {
      "@type": "Question",
      "name": "Does HeyGen publish to social media for you?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. HeyGen renders your video and downloads it as an MP4. You are responsible for writing captions, uploading to each platform, scheduling posts, and managing your social accounts. Assurgit handles all of this automatically on Starter and Growth plans." }
    },
    {
      "@type": "Question",
      "name": "Can HeyGen write scripts for you?",
      "acceptedAnswer": { "@type": "Answer", "text": "HeyGen has basic AI script generation, but it does not research your niche, monitor your competitors, or write scripts in your specific brand voice. Assurgit's research pipeline produces scripts tailored to your market, audience, and positioning every week." }
    },
    {
      "@type": "Question",
      "name": "How much does HeyGen cost compared to Assurgit?",
      "acceptedAnswer": { "@type": "Answer", "text": "HeyGen starts at $29/month for limited video credits, up to $240/month for higher volumes — but this is just the rendering tool. You still need to spend time writing scripts, operating the platform, and managing publishing. Assurgit starts at $397/month and includes everything: avatar, voice clone, scripts, rendering, QC, and publishing." }
    },
    {
      "@type": "Question",
      "name": "Who should use HeyGen instead of Assurgit?",
      "acceptedAnswer": { "@type": "Answer", "text": "HeyGen makes sense if you genuinely enjoy content creation, have 10+ hours per week available, and want maximum control over every detail of your videos. If your primary goal is consistent presence on social media without time investment, Assurgit is a better fit." }
    },
  ]
};

const rows = [
  { feature: "Writes your scripts", assurgit: "✅ Research-backed, your voice", heygen: "❌ You write them (basic AI assist)" },
  { feature: "Builds your avatar", assurgit: "✅ Personal avatar from your video", heygen: "✅ Custom avatar (paid add-on)" },
  { feature: "Clones your voice", assurgit: "✅ Included on all plans", heygen: "⚠️ Available on higher plans" },
  { feature: "Publishes to social media", assurgit: "✅ Auto-publishes (Starter+)", heygen: "❌ You download and post yourself" },
  { feature: "Monitors your competitors", assurgit: "✅ Weekly competitive intel", heygen: "❌ No research built in" },
  { feature: "Human QC on every video", assurgit: "✅ Yes — checked before posting", heygen: "❌ No QC layer" },
  { feature: "Time you spend per week", assurgit: "~30 min (optional script review)", heygen: "5–15+ hours (scripts + ops + posting)" },
  { feature: "Starting price", assurgit: "$397/month", heygen: "$29/month" },
  { feature: "What you actually get", assurgit: "Done-for-you service", heygen: "Tool access — you do the work" },
  { feature: "Output guarantee", assurgit: "5 videos/week, every week", heygen: "Only if you put in the time" },
  { feature: "Platform support", assurgit: "IG, TT, LI, YT (auto)", heygen: "You manage all platforms manually" },
  { feature: "Onboarding", assurgit: "30-minute call, live in 5 days", heygen: "Self-serve setup" },
];

export default function AssurgitVsHeygenPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-indigo-600/20 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-500/30">Comparison</span>
            <span className="text-gray-500 text-xs">Updated March 2026 · By Asa Rogers, Founder of Assurgit</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
            Assurgit vs. HeyGen: You Asked the Wrong Question
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            The question isn&apos;t which AI video tool is better. The question is whether you want a <strong className="text-white">tool</strong> or a <strong className="text-white">result</strong>. HeyGen gives you the technology. Assurgit gives you the content — published and live, every week.
          </p>
        </div>

        {/* The core difference */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">HeyGen</p>
              <h3 className="text-xl font-black text-white mb-4">A tool. You do the work.</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• You write (or prompt AI to write) every script</li>
                <li>• You log in and render each video</li>
                <li>• You download MP4s and upload to each platform</li>
                <li>• You write captions and hashtags</li>
                <li>• You schedule and post manually</li>
                <li>• You track what&apos;s working and adjust</li>
              </ul>
              <div className="mt-5 pt-4 border-t border-gray-800">
                <p className="text-gray-500 text-sm">Weekly time investment: <strong className="text-white">5–15+ hours</strong></p>
                <p className="text-gray-500 text-sm mt-1">Cost: <strong className="text-white">$29–$240/month</strong> (tool only)</p>
              </div>
            </div>

            <div className="bg-indigo-600/10 border border-indigo-500/40 rounded-2xl p-6">
              <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">Assurgit</p>
              <h3 className="text-xl font-black text-white mb-4">A service. We do the work.</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✅ We research your niche and write the scripts</li>
                <li>✅ We render your videos with your avatar and voice</li>
                <li>✅ We QC every video before it goes live</li>
                <li>✅ We auto-publish to IG, TT, LI, and YT</li>
                <li>✅ We send you weekly competitive intel</li>
                <li>✅ We show up for a Friday strategy call</li>
              </ul>
              <div className="mt-5 pt-4 border-t border-indigo-500/20">
                <p className="text-indigo-300 text-sm">Weekly time investment: <strong className="text-white">~30 min</strong> (optional review)</p>
                <p className="text-indigo-300 text-sm mt-1">Cost: <strong className="text-white">From $397/month</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-6">Feature-by-Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900">
                  <th className="text-left py-3 px-4 font-semibold text-gray-400 w-1/3">Feature</th>
                  <th className="text-left py-3 px-4 font-semibold text-indigo-400">Assurgit</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-400">HeyGen</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.feature} className={`border-t border-gray-800 ${i % 2 === 0 ? "" : "bg-gray-900/50"}`}>
                    <td className="py-3 px-4 text-gray-400 font-medium">{row.feature}</td>
                    <td className="py-3 px-4 text-gray-200">{row.assurgit}</td>
                    <td className="py-3 px-4 text-gray-400">{row.heygen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real talk section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-6">The Real Math: What HeyGen Actually Costs You</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              HeyGen at $29/month sounds cheap. But the tool is the cheap part. Here&apos;s what &ldquo;doing it yourself&rdquo; actually costs if your time is worth $100/hour:
            </p>
            <table className="w-full text-sm mb-4">
              <tbody>
                {[
                  ["Script research + writing (5 scripts/week, 30 min each)", "10 hrs/week", "$1,000/week"],
                  ["Platform operations (rendering, downloading, uploading)", "3 hrs/week", "$300/week"],
                  ["Social media management (captions, hashtags, scheduling)", "2 hrs/week", "$200/week"],
                  ["Strategy and performance review", "1 hr/week", "$100/week"],
                  ["HeyGen subscription (tool cost)", "—", "$240/month"],
                ].map(([item, time, cost]) => (
                  <tr key={String(item)} className="border-b border-gray-800">
                    <td className="py-2.5 text-gray-400">{item}</td>
                    <td className="py-2.5 text-gray-500 text-right pr-4">{time}</td>
                    <td className="py-2.5 text-right text-gray-300 font-medium">{cost}</td>
                  </tr>
                ))}
                <tr className="border-t border-gray-700">
                  <td className="pt-3 font-bold text-white">True cost of doing it yourself</td>
                  <td className="pt-3 text-gray-500 text-right pr-4">16+ hrs/week</td>
                  <td className="pt-3 text-right font-black text-red-400">~$6,640/month</td>
                </tr>
                <tr>
                  <td className="pt-2 font-bold text-indigo-400">Assurgit (all done for you)</td>
                  <td className="pt-2 text-gray-500 text-right pr-4">~30 min/week</td>
                  <td className="pt-2 text-right font-black text-indigo-400">From $397/month</td>
                </tr>
              </tbody>
            </table>
            <p className="text-gray-500 text-xs italic">*Based on $100/hour time value. Adjust to your own hourly rate.</p>
          </div>
        </div>

        {/* Who should use which */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-6">Who Should Choose What</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="font-bold text-white mb-3">Use HeyGen if:</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• You genuinely enjoy creating content</li>
                <li>• You have 10+ hours/week specifically for video production</li>
                <li>• You want to learn the tools and build in-house capability</li>
                <li>• Your budget is under $300/month total</li>
                <li>• You already have a social media team who just needs better tools</li>
              </ul>
            </div>
            <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-5">
              <h3 className="font-bold text-white mb-3">Use Assurgit if:</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✅ Your time is worth more than $50/hour</li>
                <li>✅ You need consistent content, not just occasional content</li>
                <li>✅ You want your face and voice on the content, not a generic avatar</li>
                <li>✅ You need content on 4 platforms simultaneously</li>
                <li>✅ You want someone else responsible for the results</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">Real Result</p>
            <p className="text-white text-lg font-bold mb-2">WellPreparedLife grew their business 50% in their first week with Assurgit.</p>
            <p className="text-gray-400 text-sm">Without filming a single new video. Without spending hours on HeyGen.</p>
          </div>
        </div>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Stop spending hours. Start getting results.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. We&apos;ll show you a sample of what your content would look like — your face, your voice — and get you started in under a week.
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
            <Link href="/best/done-for-you-ai-video-service" className="text-indigo-400 hover:underline">Best Done-For-You AI Video Services</Link>
            <Link href="/compare/done-for-you-vs-diy-video" className="text-indigo-400 hover:underline">Done-For-You vs. DIY (Full Guide)</Link>
            <Link href="/pricing" className="text-indigo-400 hover:underline">Pricing — from $397/mo</Link>
            <Link href="/" className="text-indigo-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

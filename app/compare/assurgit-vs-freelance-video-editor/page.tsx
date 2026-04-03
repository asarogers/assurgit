import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Assurgit vs. Freelance Video Editor: Which Is Better for Your Business?",
  description:
    "Hiring a freelance video editor vs. using Assurgit's done-for-you AI video service. Compare cost, output, consistency, and what you actually get for your money.",
  openGraph: {
    title: "Assurgit vs. Freelance Video Editor — Real Comparison",
    description:
      "A freelance editor films and edits. Assurgit researches, scripts, renders, and publishes — using your AI avatar. Here's what each actually costs.",
    type: "article",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Assurgit better than hiring a freelance video editor?",
      "acceptedAnswer": { "@type": "Answer", "text": "They solve different problems. A freelance editor takes raw footage you provide and makes it look good — you still need to film, script, and manage the process. Assurgit handles everything: research, scripting, avatar rendering, QC, and publishing. If you don't want to film or manage a creative, Assurgit delivers more consistent output with less effort from you." }
    },
    {
      "@type": "Question",
      "name": "How much does a freelance video editor cost compared to Assurgit?",
      "acceptedAnswer": { "@type": "Answer", "text": "Freelance video editors typically charge $50–$150/hour or $200–$800 per edited video. For 5 videos per week, that's $1,000–$4,000/month in editing alone — before you factor in filming time, scripting, and publishing. Assurgit starts at $397/month and includes the entire production pipeline: research, scripting, avatar rendering, QC, and MP4 delivery." }
    },
    {
      "@type": "Question",
      "name": "What does a freelance video editor not do that Assurgit does?",
      "acceptedAnswer": { "@type": "Answer", "text": "A freelance editor needs: raw footage from you, a script or direction, your time for reviews and revisions, and someone else to handle publishing. Assurgit needs only your initial 30-minute setup call. We provide the research, script, AI avatar rendering, human QC, and auto-publishing — none of which a video editor typically handles." }
    },
    {
      "@type": "Question",
      "name": "What happens when a freelancer gets sick, busy, or leaves?",
      "acceptedAnswer": { "@type": "Answer", "text": "Content stops. This is the central risk of freelancer-dependent content strategies — consistency breaks down when your freelancer is unavailable or moves on. Assurgit is a system: 5 videos every week, regardless of what's happening. Your avatar and voice clone are assets you own — no dependency on any individual's availability." }
    },
    {
      "@type": "Question",
      "name": "Can I use both a freelance editor and Assurgit?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Some clients use Assurgit for their high-volume weekly social media content (5 educational videos per week, fully automated) and a freelance editor for occasional high-production content like client testimonials or brand films. The two are complementary, not exclusive." }
    },
  ]
};

const rows = [
  { feature: "Writes your scripts", assurgit: "✅ Research-backed, weekly", freelancer: "❌ You provide scripts or direction" },
  { feature: "Builds your avatar", assurgit: "✅ Your personal AI avatar", freelancer: "❌ Requires you to film" },
  { feature: "You film footage", assurgit: "✅ Never — avatar handles it", freelancer: "❌ You film every video" },
  { feature: "Publishes to social media", assurgit: "✅ Auto-publishes (Starter+)", freelancer: "❌ You handle posting" },
  { feature: "Weekly output guarantee", assurgit: "✅ 5 videos, every week", freelancer: "❌ Depends on their availability" },
  { feature: "Human QC on every video", assurgit: "✅ Yes — before publishing", freelancer: "⚠️ Varies by editor" },
  { feature: "Time you spend per week", assurgit: "~30 min (optional review)", freelancer: "3–8+ hours (filming + reviews + posting)" },
  { feature: "Starting price", assurgit: "$397/month", freelancer: "$1,000–$4,000+/month for 5 videos" },
  { feature: "Consistency risk", assurgit: "None — system-based", freelancer: "High — stops when they're unavailable" },
  { feature: "Competitive research", assurgit: "✅ Built into the pipeline", freelancer: "❌ Not typically included" },
  { feature: "Platform optimization", assurgit: "✅ Formatted per platform", freelancer: "⚠️ Only if you specify" },
  { feature: "Voice clone / your face", assurgit: "✅ Your voice, your avatar", freelancer: "✅ If you film yourself" },
];

export default function AssurgitVsFreelancePage() {
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
            Assurgit vs. Freelance Video Editor: You&apos;re Comparing the Wrong Thing
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            A freelance video editor makes your footage look good. Assurgit eliminates the need for footage entirely. The question isn&apos;t which produces better edits — it&apos;s whether you want to be a part of the production process at all.
          </p>
        </div>

        {/* Core difference */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Freelance Video Editor</p>
              <h3 className="text-xl font-black text-white mb-4">A skilled hand. You still do most of the work.</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• You film every video yourself (or hire someone to film)</li>
                <li>• You write or brief every script</li>
                <li>• You send footage to the editor</li>
                <li>• You review cuts and request revisions</li>
                <li>• You download files and post to each platform</li>
                <li>• You start over when the editor is unavailable</li>
              </ul>
              <div className="mt-5 pt-4 border-t border-gray-800">
                <p className="text-gray-500 text-sm">Weekly time investment: <strong className="text-white">3–8+ hours</strong></p>
                <p className="text-gray-500 text-sm mt-1">Cost: <strong className="text-white">$1,000–$4,000+/month</strong> for 5 videos</p>
              </div>
            </div>

            <div className="bg-indigo-600/10 border border-indigo-500/40 rounded-2xl p-6">
              <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">Assurgit</p>
              <h3 className="text-xl font-black text-white mb-4">A system. We handle the entire pipeline.</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✅ We research your niche and write the scripts</li>
                <li>✅ We render your avatar — no filming required</li>
                <li>✅ We QC every video before it publishes</li>
                <li>✅ We auto-publish to IG, TT, LI, and YT</li>
                <li>✅ We deliver 5 videos every week, regardless</li>
                <li>✅ We track competitive intel for your market</li>
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
                  <th className="text-left py-3 px-4 font-semibold text-gray-400">Freelance Editor</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.feature} className={`border-t border-gray-800 ${i % 2 === 0 ? "" : "bg-gray-900/50"}`}>
                    <td className="py-3 px-4 text-gray-400 font-medium">{row.feature}</td>
                    <td className="py-3 px-4 text-gray-200">{row.assurgit}</td>
                    <td className="py-3 px-4 text-gray-400">{row.freelancer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* The hidden cost section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-6">The Hidden Cost: Your Time</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              When you hire a freelance editor, you pay their rate — but you also pay with your time. Here&apos;s what producing 5 videos per week actually costs if your time is worth $100/hour:
            </p>
            <table className="w-full text-sm mb-4">
              <tbody>
                {[
                  ["Script research + writing (5 scripts, 30 min each)", "2.5 hrs/week", "$250/week"],
                  ["Filming (30–60 min per video)", "2.5–5 hrs/week", "$250–500/week"],
                  ["Review + feedback rounds with editor", "1–2 hrs/week", "$100–200/week"],
                  ["Download, caption, hashtag, schedule, post", "2 hrs/week", "$200/week"],
                  ["Freelance editor fee (5 videos @ $200–400 each)", "—", "$1,000–2,000/week"],
                ].map(([item, time, cost]) => (
                  <tr key={String(item)} className="border-b border-gray-800">
                    <td className="py-2.5 text-gray-400">{item}</td>
                    <td className="py-2.5 text-gray-500 text-right pr-4">{time}</td>
                    <td className="py-2.5 text-right text-gray-300 font-medium">{cost}</td>
                  </tr>
                ))}
                <tr className="border-t border-gray-700">
                  <td className="pt-3 font-bold text-white">True cost with a freelancer</td>
                  <td className="pt-3 text-gray-500 text-right pr-4">8–10+ hrs/week</td>
                  <td className="pt-3 text-right font-black text-red-400">$5,800–8,900/month</td>
                </tr>
                <tr>
                  <td className="pt-2 font-bold text-indigo-400">Assurgit (entire pipeline)</td>
                  <td className="pt-2 text-gray-500 text-right pr-4">~30 min/week</td>
                  <td className="pt-2 text-right font-black text-indigo-400">From $397/month</td>
                </tr>
              </tbody>
            </table>
            <p className="text-gray-500 text-xs italic">*Based on $100/hour time value. Adjust to your own rate.</p>
          </div>
        </div>

        {/* Who should use which */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-6">Who Should Choose What</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="font-bold text-white mb-3">Hire a freelance editor if:</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• You have raw footage and need it made professional</li>
                <li>• You&apos;re producing long-form content (documentaries, explainers, brand films)</li>
                <li>• You have an in-house content team that handles scripting and filming</li>
                <li>• You want maximum creative control over style and format</li>
                <li>• You need custom motion graphics or complex editing</li>
              </ul>
            </div>
            <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-5">
              <h3 className="font-bold text-white mb-3">Use Assurgit if:</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✅ You don&apos;t want to film yourself every week</li>
                <li>✅ You need consistent short-form social media content at volume</li>
                <li>✅ You want the research and scripting handled for you</li>
                <li>✅ You need content publishing, not just editing</li>
                <li>✅ You want a system that runs without managing a creative</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">Real Result</p>
            <p className="text-white text-lg font-bold mb-2">WellPreparedLife grew their business 50% in their first week with Assurgit.</p>
            <p className="text-gray-400 text-sm">Without filming anything. Without working with a freelancer. Without spending hours on content.</p>
          </div>
        </div>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Stop managing the process. Start getting the results.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. We&apos;ll show you a sample of what your content would look like — your face, your voice — and have you live within a week.
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
            <Link href="/compare/assurgit-vs-heygen" className="text-indigo-400 hover:underline">Assurgit vs. HeyGen</Link>
            <Link href="/compare/assurgit-vs-marketing-agency" className="text-indigo-400 hover:underline">Assurgit vs. Marketing Agency</Link>
            <Link href="/compare/done-for-you-vs-diy-video" className="text-indigo-400 hover:underline">Done-For-You vs. DIY</Link>
            <Link href="/pricing" className="text-indigo-400 hover:underline">Pricing — from $397/mo</Link>
            <Link href="/" className="text-indigo-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

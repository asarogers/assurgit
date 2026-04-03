import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Assurgit vs. In-House Video Team: What's the Real Cost Difference?",
  description:
    "Building an in-house video team vs. using Assurgit's done-for-you AI service. A realistic comparison of cost, output, time to launch, and what each actually produces.",
  openGraph: {
    title: "Assurgit vs. In-House Video Team — Real Cost Comparison",
    description:
      "An in-house team costs $8,000–15,000/month before you produce a single video. Assurgit starts at $497. Here's what you actually get for each.",
    type: "article",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Assurgit better than building an in-house video team?",
      "acceptedAnswer": { "@type": "Answer", "text": "For most small and mid-size businesses, yes — by a significant margin. An in-house video team requires hiring, equipment, studio space, management overhead, and ongoing HR. Assurgit delivers 5 videos per week from $397/month with a 30-minute setup call. For businesses that don't have a dedicated content team already, Assurgit is a faster and more cost-effective path to consistent video output." }
    },
    {
      "@type": "Question",
      "name": "What does an in-house video team actually cost?",
      "acceptedAnswer": { "@type": "Answer", "text": "A minimal in-house setup — one content manager/scriptwriter ($4,000–7,000/month), one videographer ($4,000–7,000/month), and basic equipment ($5,000–15,000 upfront) — runs $8,000–14,000/month in salary alone, before benefits, management time, and overhead. For a larger team with editing and social media management, $15,000–25,000/month is common." }
    },
    {
      "@type": "Question",
      "name": "When does building an in-house team make more sense than Assurgit?",
      "acceptedAnswer": { "@type": "Answer", "text": "Building in-house makes sense when you need video across many functions simultaneously (product demos, HR, training, marketing, events), when you're producing content at a scale that requires a dedicated team (20+ videos per week), or when you want maximum control over production quality and creative direction. For most businesses needing consistent social media content, Assurgit is more practical." }
    },
    {
      "@type": "Question",
      "name": "Can I start with Assurgit and build in-house later?",
      "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Many clients use Assurgit to establish consistent content presence and proof-of-concept before investing in internal infrastructure. By the time you're ready to build in-house, you'll have data on what content actually works for your audience — which is invaluable for briefing an in-house team." }
    },
    {
      "@type": "Question",
      "name": "Does Assurgit work alongside an existing in-house team?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Some larger clients use Assurgit to supplement their in-house team — Assurgit handles the high-volume weekly educational content while the in-house team focuses on campaign-specific, high-production pieces. The two are complementary." }
    },
  ]
};

const rows = [
  { feature: "Time to first published video", assurgit: "5 days after setup call", inhouse: "4–12 weeks (hire + onboard + produce)" },
  { feature: "Monthly cost", assurgit: "From $397/month", inhouse: "$8,000–25,000+/month (salaries)" },
  { feature: "Upfront cost", assurgit: "$0", inhouse: "$5,000–20,000+ (equipment, setup)" },
  { feature: "Writes your scripts", assurgit: "✅ Research-backed, weekly", inhouse: "✅ If you hire a writer" },
  { feature: "Films your content", assurgit: "✅ No filming needed (AI avatar)", inhouse: "✅ Yes — but requires scheduling" },
  { feature: "Publishes to platforms", assurgit: "✅ Auto-publishes (Starter+)", inhouse: "✅ If you hire a social manager" },
  { feature: "Weekly output", assurgit: "5 videos, guaranteed", inhouse: "Depends on team capacity and priorities" },
  { feature: "Human QC", assurgit: "✅ On every video", inhouse: "✅ If team capacity allows" },
  { feature: "Consistency risk", assurgit: "None — system-based", inhouse: "Turnover, illness, competing priorities" },
  { feature: "Management overhead", assurgit: "None", inhouse: "Significant — hiring, reviews, direction" },
  { feature: "Scales down easily", assurgit: "✅ Cancel anytime", inhouse: "❌ Difficult — employment commitments" },
  { feature: "Your face and voice", assurgit: "✅ Via AI avatar and voice clone", inhouse: "✅ If you're willing to be on camera" },
];

export default function AssurgitVsInHousePage() {
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
            Assurgit vs. In-House Video Team: The Real Math Before You Hire
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Building an in-house video team feels like the &ldquo;real&rdquo; solution. But a minimal in-house setup costs $8,000–15,000/month before you publish your first video — and takes months to get there. Here&apos;s an honest look at what each option actually delivers.
          </p>
        </div>

        {/* Core difference */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">In-House Video Team</p>
              <h3 className="text-xl font-black text-white mb-4">Full control. Full cost. Long runway.</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• 4–12 weeks to hire and onboard team</li>
                <li>• $8,000–25,000/month in salary (minimal setup)</li>
                <li>• $5,000–20,000 upfront in equipment</li>
                <li>• Ongoing management, reviews, direction</li>
                <li>• Content stops when team members leave or are sick</li>
                <li>• Hard to scale down once commitments are made</li>
              </ul>
              <div className="mt-5 pt-4 border-t border-gray-800">
                <p className="text-gray-500 text-sm">Time to first video: <strong className="text-white">4–12 weeks</strong></p>
                <p className="text-gray-500 text-sm mt-1">Monthly cost: <strong className="text-white">$8,000–25,000+</strong></p>
              </div>
            </div>

            <div className="bg-indigo-600/10 border border-indigo-500/40 rounded-2xl p-6">
              <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">Assurgit</p>
              <h3 className="text-xl font-black text-white mb-4">Live in 5 days. No hiring required.</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✅ 30-minute setup call — live in 5 days</li>
                <li>✅ $497–3,997/month, all-inclusive</li>
                <li>✅ $0 equipment, setup, or overhead</li>
                <li>✅ No hiring, no management, no HR</li>
                <li>✅ 5 videos every week, regardless of season</li>
                <li>✅ Cancel anytime — no employment commitments</li>
              </ul>
              <div className="mt-5 pt-4 border-t border-indigo-500/20">
                <p className="text-indigo-300 text-sm">Time to first video: <strong className="text-white">5 days</strong></p>
                <p className="text-indigo-300 text-sm mt-1">Monthly cost: <strong className="text-white">From $497</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Real cost breakdown */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-6">The Real Cost of an In-House Team</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Here&apos;s what a minimal in-house video content operation looks like for a business publishing 5 short-form social videos per week:
            </p>
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-gray-400 font-semibold">Role / Cost</th>
                  <th className="text-right py-2 text-gray-400 font-semibold">Monthly</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Content Strategist / Scriptwriter", "$4,500–7,000"],
                  ["Videographer / Shooter", "$4,000–7,000"],
                  ["Video Editor", "$3,500–6,000"],
                  ["Social Media Manager", "$3,000–5,000"],
                  ["Equipment amortized (camera, lights, mics, studio)", "$500–1,500"],
                  ["Management time (your hours × your hourly rate)", "$1,000–3,000"],
                ].map(([role, cost]) => (
                  <tr key={String(role)} className="border-b border-gray-800">
                    <td className="py-2.5 text-gray-400">{role}</td>
                    <td className="py-2.5 text-right text-gray-300 font-medium">{cost}</td>
                  </tr>
                ))}
                <tr className="border-t border-gray-700">
                  <td className="pt-3 font-bold text-white">Total monthly (minimal team)</td>
                  <td className="pt-3 text-right font-black text-red-400">$16,500–29,500</td>
                </tr>
                <tr>
                  <td className="pt-2 font-bold text-indigo-400">Assurgit (entire pipeline)</td>
                  <td className="pt-2 text-right font-black text-indigo-400">From $397/month</td>
                </tr>
              </tbody>
            </table>
            <p className="text-gray-500 text-xs italic">*Salary ranges are estimates based on US market rates. Your market may vary.</p>
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
                  <th className="text-left py-3 px-4 font-semibold text-gray-400">In-House Team</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.feature} className={`border-t border-gray-800 ${i % 2 === 0 ? "" : "bg-gray-900/50"}`}>
                    <td className="py-3 px-4 text-gray-400 font-medium">{row.feature}</td>
                    <td className="py-3 px-4 text-gray-200">{row.assurgit}</td>
                    <td className="py-3 px-4 text-gray-400">{row.inhouse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Who should use which */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-xl font-black text-white mb-6">Who Should Choose What</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="font-bold text-white mb-3">Build in-house if:</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• You need video across many departments simultaneously</li>
                <li>• Your content volume requires 20+ videos per week</li>
                <li>• You need high-production brand films and campaign work</li>
                <li>• You have a $15,000+/month content budget</li>
                <li>• You want maximum control over every aspect of production</li>
              </ul>
            </div>
            <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-5">
              <h3 className="font-bold text-white mb-3">Use Assurgit if:</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✅ You need consistent social media content without building a team</li>
                <li>✅ You want to start publishing within a week, not a quarter</li>
                <li>✅ You don&apos;t want management overhead on top of your existing work</li>
                <li>✅ You want flexibility to scale up or cancel without employment risk</li>
                <li>✅ You want your face and voice on content without filming yourself</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social proof */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">Real Result</p>
            <p className="text-white text-lg font-bold mb-2">WellPreparedLife grew their business 50% in their first week with Assurgit.</p>
            <p className="text-gray-400 text-sm">Without hiring anyone. Without buying equipment. Without spending months building a team.</p>
          </div>
        </div>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Be live in 5 days — not 5 months.
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free call. We&apos;ll show you a sample of what your content would look like — your face, your voice — and start publishing this week.
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
            <Link href="/compare/assurgit-vs-marketing-agency" className="text-indigo-400 hover:underline">Assurgit vs. Marketing Agency</Link>
            <Link href="/compare/assurgit-vs-freelance-video-editor" className="text-indigo-400 hover:underline">Assurgit vs. Freelance Editor</Link>
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

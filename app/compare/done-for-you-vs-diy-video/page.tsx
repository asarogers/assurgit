import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Done-For-You vs. DIY AI Video Content: Which Is Right for Your Business?",
  description:
    "A definitive guide to choosing between done-for-you AI video services and DIY AI video tools. Compare cost, time, output quality, and long-term results.",
  openGraph: {
    title: "Done-For-You vs. DIY AI Video Content: Which Is Right for Your Business?",
    description:
      "Honest breakdown of DFY vs DIY AI video content — what each costs, who each is for, and how to choose.",
    type: "article",
  },
};

// STYLE: BALANCED — fair, definitive guide, acknowledges when DIY is the right choice

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is done-for-you AI video content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Done-for-you (DFY) AI video content is a fully managed service where a team handles every step of your short-form video production — research, scripting, rendering with your AI avatar and voice clone, quality control, and publishing to social media. You review and approve, but you don't produce anything yourself. Assurgit is an example of a DFY AI video service.",
      },
    },
    {
      "@type": "Question",
      name: "What is DIY AI video content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DIY AI video means using tools like HeyGen, Synthesia, or D-ID to produce videos yourself. You write scripts, log into the platform, configure your avatar, render videos, download them, and upload them to each social media platform manually. The AI handles rendering — everything else is on you.",
      },
    },
    {
      "@type": "Question",
      name: "Is done-for-you AI video worth the cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your time value. If your time is worth $75–$100/hour and content creation takes 10–15 hours per week, the opportunity cost of DIY is $3,000–$6,000/month. A done-for-you service at $497–$1,997/month is often cheaper when you account for your actual time. For founders and professionals, DFY almost always wins on ROI.",
      },
    },
    {
      "@type": "Question",
      name: "Which approach produces better quality videos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Done-for-you services typically produce higher quality output because they include professional script research, human quality control, and consistent production workflows. DIY output quality varies based on your scripting skills, how much time you invest, and your platform proficiency. That said, a motivated DIY creator with strong writing skills can produce excellent content.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to get started with each approach?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DIY tools like HeyGen or Synthesia have self-serve onboarding — you can start immediately but typically spend 2–4 weeks reaching consistent output. Done-for-you services like Assurgit take a 30-minute onboarding call and go live within 5 business days, then produce content weekly with no ramp-up time required.",
      },
    },
    {
      "@type": "Question",
      name: "Can I switch from DIY to done-for-you later?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Many clients start with DIY to understand the medium, then switch to DFY when they realize the time cost isn't sustainable. There's no technical lock-in either way. Assurgit's month-to-month pricing means you can start, pause, or cancel at any time.",
      },
    },
  ],
};

const comparisonRows = [
  {
    criteria: "Time required per week",
    dfy: "~30 min (optional review)",
    diy: "5–15+ hours (scripting, ops, publishing)",
    winner: "dfy",
  },
  {
    criteria: "Script writing",
    dfy: "Handled for you — research-backed",
    diy: "You write (or prompt AI to write)",
    winner: "dfy",
  },
  {
    criteria: "Avatar & voice setup",
    dfy: "Done during onboarding",
    diy: "You configure it yourself",
    winner: "tie",
  },
  {
    criteria: "Video rendering",
    dfy: "Handled by the service",
    diy: "You operate the platform",
    winner: "dfy",
  },
  {
    criteria: "Quality control",
    dfy: "Human QC before every publish",
    diy: "Only as good as your eye",
    winner: "dfy",
  },
  {
    criteria: "Publishing to social media",
    dfy: "Auto-published (Starter+ plans)",
    diy: "Manual upload to each platform",
    winner: "dfy",
  },
  {
    criteria: "Platform flexibility",
    dfy: "Set platforms per plan",
    diy: "Publish anywhere you choose",
    winner: "diy",
  },
  {
    criteria: "Creative control",
    dfy: "High — you approve scripts",
    diy: "Total — you make all decisions",
    winner: "diy",
  },
  {
    criteria: "Starting monthly cost",
    dfy: "$397/month (all-in)",
    diy: "$29–$240/month (tool only)",
    winner: "diy",
  },
  {
    criteria: "True monthly cost (time included)",
    dfy: "$497–$1,997/month",
    diy: "$1,500–$6,000+ (with time value)",
    winner: "dfy",
  },
  {
    criteria: "Consistency of output",
    dfy: "Guaranteed weekly delivery",
    diy: "Depends on your availability",
    winner: "dfy",
  },
  {
    criteria: "Competitive research",
    dfy: "Included (weekly intel)",
    diy: "You do your own research",
    winner: "dfy",
  },
  {
    criteria: "Learning the craft",
    dfy: "Limited — team handles it",
    diy: "You build real content skills",
    winner: "diy",
  },
  {
    criteria: "Scalability",
    dfy: "Upgrade plan for more volume",
    diy: "You hit a ceiling on time",
    winner: "dfy",
  },
];

export default function DoneForYouVsDIYPage() {
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
            <span className="bg-indigo-600/20 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-500/30">
              Definitive Guide
            </span>
            <span className="text-gray-400 text-xs">
              Updated March 2026 · By Asa Rogers, Founder of Assurgit
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
            Done-For-You vs. DIY AI Video Content: Which Is Right for Your Business?
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            AI has made it possible to create video content without a camera, a studio, or a production team. But there&apos;s a big difference between having access to the technology and having a system that actually works week after week. This guide breaks down both approaches honestly — because the right answer depends on who you are.
          </p>
        </div>

        {/* What each approach is */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-2xl font-black text-white mb-6">What Each Approach Actually Means</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">DIY AI Video</p>
              <h3 className="text-lg font-black text-white mb-4">You use the tools. You do the work.</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Platforms like HeyGen, Synthesia, and D-ID give you AI rendering technology. You bring the strategy, scripting, operations, and distribution.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Research your niche and script each video</li>
                <li>• Configure your avatar and render videos</li>
                <li>• Download MP4s and upload to each platform</li>
                <li>• Write captions, add hashtags, schedule posts</li>
                <li>• Monitor analytics and adjust your strategy</li>
              </ul>
              <div className="mt-5 pt-4 border-t border-gray-800">
                <p className="text-gray-400 text-sm">
                  Tool cost: <strong className="text-white">$29–$240/month</strong>
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Time investment: <strong className="text-white">5–15+ hours/week</strong>
                </p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Done-For-You AI Video</p>
              <h3 className="text-lg font-black text-white mb-4">A team produces your content. You review.</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                A managed service like Assurgit handles every step: research, scripting, avatar creation, rendering, quality control, and publishing — consistently, every week.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Team researches your niche and writes scripts</li>
                <li>• Your personal avatar + voice clone renders videos</li>
                <li>• Human QC checks each video before it goes live</li>
                <li>• Auto-published to IG, TikTok, LinkedIn, and YouTube</li>
                <li>• Weekly competitive intel report included</li>
              </ul>
              <div className="mt-5 pt-4 border-t border-gray-800">
                <p className="text-gray-400 text-sm">
                  All-in cost: <strong className="text-white">$497–$1,997/month</strong>
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Time investment: <strong className="text-white">~30 min/week</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-2xl font-black text-white mb-6">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-900">
                  <th className="text-left py-3 px-4 font-semibold text-gray-300 w-1/3">Criteria</th>
                  <th className="text-left py-3 px-4 font-semibold text-indigo-400">Done-For-You</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300">DIY Tools</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-400 w-24">Edge</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.criteria}
                    className={`border-t border-gray-800 ${i % 2 === 0 ? "" : "bg-gray-900/50"}`}
                  >
                    <td className="py-3 px-4 text-gray-300 font-medium">{row.criteria}</td>
                    <td className="py-3 px-4 text-gray-100">{row.dfy}</td>
                    <td className="py-3 px-4 text-gray-300">{row.diy}</td>
                    <td className="py-3 px-4">
                      {row.winner === "dfy" && (
                        <span className="text-indigo-400 text-xs font-semibold">DFY ✓</span>
                      )}
                      {row.winner === "diy" && (
                        <span className="text-gray-300 text-xs font-semibold">DIY ✓</span>
                      )}
                      {row.winner === "tie" && (
                        <span className="text-gray-400 text-xs">Tie</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* The real cost breakdown */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-2xl font-black text-white mb-6">The Real Cost of DIY</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              The tool subscription is the cheap part. Here&apos;s what producing 5 videos per week yourself actually costs, if your time is worth $100/hour:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 text-gray-400 font-medium">Task</th>
                    <th className="text-right py-2 pr-4 text-gray-400 font-medium">Time/Week</th>
                    <th className="text-right py-2 text-gray-400 font-medium">Monthly Value</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Niche research + script writing (5 videos)", "8–10 hrs", "$3,200–$4,000"],
                    ["Platform operations (render, QA, download)", "2–3 hrs", "$800–$1,200"],
                    ["Publishing + caption writing + scheduling", "2–3 hrs", "$800–$1,200"],
                    ["Analytics review + strategy", "1 hr", "$400"],
                    ["Tool subscription (HeyGen/Synthesia)", "—", "$29–$240"],
                  ].map(([task, time, cost]) => (
                    <tr key={String(task)} className="border-b border-gray-800">
                      <td className="py-2.5 text-gray-300">{task}</td>
                      <td className="py-2.5 text-right pr-4 text-gray-400">{time}</td>
                      <td className="py-2.5 text-right text-gray-300 font-medium">{cost}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-700">
                    <td className="pt-3 font-bold text-white">Total (DIY, time included)</td>
                    <td className="pt-3 text-right pr-4 text-gray-500">13–17 hrs</td>
                    <td className="pt-3 text-right font-black text-red-400">$5,229–$7,040</td>
                  </tr>
                  <tr>
                    <td className="pt-2 font-bold text-indigo-400">Assurgit (done for you)</td>
                    <td className="pt-2 text-right pr-4 text-gray-500">~30 min</td>
                    <td className="pt-2 text-right font-black text-indigo-400">From $497</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mt-4 italic">
              *Based on $100/hour time value. Numbers shift with your rate — the gap doesn&apos;t.
            </p>
          </div>
        </div>

        {/* Who should choose which */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-2xl font-black text-white mb-6">Who Should Choose Which Approach</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="font-bold text-white mb-4">DIY is the right choice if:</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">→</span>
                  You genuinely enjoy content creation and want to build the skill
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">→</span>
                  You have 10+ dedicated hours per week specifically for video production
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">→</span>
                  Your budget is under $300/month and time is genuinely abundant
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">→</span>
                  You want maximum creative control over every detail
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">→</span>
                  You already have a team handling strategy and publishing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">→</span>
                  You&apos;re testing the format before committing to a service
                </li>
              </ul>
            </div>

            <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-xl p-6">
              <h3 className="font-bold text-white mb-4">Done-for-you is the right choice if:</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  Your time is worth $75+/hour and content creation isn&apos;t your core skill
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  You need consistent weekly output — not occasional bursts
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  You want your actual face and voice on content, not a stock avatar
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  You need content on multiple platforms simultaneously
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  You&apos;ve tried DIY and content keeps falling off your priority list
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">✓</span>
                  You want a team accountable for weekly delivery — not just a tool
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* The consistency problem */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <h2 className="text-2xl font-black text-white mb-4">The Consistency Problem Nobody Talks About</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              The biggest difference between DIY and done-for-you isn&apos;t quality or cost — it&apos;s consistency. Social media algorithms reward accounts that post regularly. A brand that posts 5 times a week outperforms one that posts 5 times a month, even if the individual videos are better.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              The problem with DIY: it always competes with your actual work. When a client project heats up, when you&apos;re traveling, when you get sick — content creation is the first thing that stops. Two weeks off the algorithm can take months to recover from.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Done-for-you services remove the variable of your availability. The content goes out whether or not you had a busy week. That consistency compounds over months in ways that sporadic DIY output simply cannot.
            </p>
          </div>
        </div>

        {/* Social proof */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              What Done-For-You Looks Like in Practice
            </p>
            <p className="text-white text-lg font-bold mb-2">
              WellPreparedLife grew their business 50% in their first week with Assurgit.
            </p>
            <p className="text-gray-300 text-sm">
              Without filming a single new video. Without spending hours in a tool they had to learn.
            </p>
          </div>
        </div>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              See what done-for-you looks like for your business
            </h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              We&apos;ll show you a sample video with your avatar and voice before you commit. Book a free 30-minute call to get started — live in under a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
              >
                Book Your Free Call
              </Link>
              <Link
                href="/pricing"
                className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold px-10 py-4 rounded-xl transition-all"
              >
                View Pricing — From $397/mo
              </Link>
            </div>
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
                    className="w-4 h-4 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform"
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
                <p className="px-5 pb-5 text-gray-300 text-sm leading-relaxed">
                  {q.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-400">
            <span>Related:</span>
            <Link href="/compare/assurgit-vs-heygen" className="text-indigo-400 hover:underline">
              Assurgit vs. HeyGen
            </Link>
            <Link href="/compare/assurgit-vs-synthesia" className="text-indigo-400 hover:underline">
              Assurgit vs. Synthesia
            </Link>
            <Link href="/compare/assurgit-vs-marketing-agency" className="text-indigo-400 hover:underline">
              Assurgit vs. Marketing Agency
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

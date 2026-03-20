import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: "HeyGen vs. Custom AI Avatars: DIY vs. Done-For-You (Which Actually Works?)",
  description:
    "HeyGen is a powerful tool. But subscribing to HeyGen and getting 7 branded videos published every week are very different things. Here's what most people miss.",
  openGraph: {
    title: "HeyGen vs. Custom AI Avatars: DIY vs. Done-For-You (Which Actually Works?)",
    description:
      "HeyGen is a powerful tool. But subscribing to HeyGen and getting 7 branded videos published every week are very different things. Here's what most people miss.",
    type: "article",
  },
};

export default function HeyGenVsCustomAIAvatarsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Article Header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors mb-8 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="bg-indigo-600/20 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-500/30">
              Tools & Technology
            </span>
            <span className="text-gray-500 text-xs">8 min read</span>
            <span className="text-gray-500 text-xs">March 2026</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            HeyGen vs. Custom AI Avatars: Why the Tool Isn&apos;t the Hard Part
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            HeyGen is excellent. If you&apos;ve already trained your avatar, generated your voice clone, and you&apos;re consistently publishing 5 videos a week — you don&apos;t need to read this. But if you subscribed to HeyGen three months ago and you&apos;re still at zero videos, this is for you.
          </p>
        </div>

        {/* Article Body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Section 1 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            What HeyGen Actually Is (And What It Isn&apos;t)
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            HeyGen is a video rendering platform. It&apos;s a tool — an excellent one — but a tool nonetheless. You give it a script and an avatar configuration, and it renders a video. That&apos;s what it does.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            What HeyGen doesn&apos;t do: research your niche, write your scripts, develop your content strategy, format content for different platforms, post to Instagram and TikTok and LinkedIn and YouTube, review the output for quality issues, or ensure you&apos;re posting consistently week after week.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            HeyGen is the render engine. The hard part is everything around it — and that&apos;s the part most people underestimate when they subscribe and immediately picture themselves publishing five videos a week.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            What It Actually Takes to Publish 5 Videos/Week With HeyGen (Honest Breakdown)
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            Here&apos;s the actual workflow for doing this properly on your own, step by step:
          </p>

          <div className="space-y-3 mb-6">
            {[
              { step: 1, title: "Train your avatar", time: "1–2 hours, one-time", note: "Record a training video, submit to HeyGen. Actually not hard — most people complete this." },
              { step: 2, title: "Clone your voice", time: "30 minutes, one-time", note: "Requires quality audio. Most people get this done too." },
              { step: 3, title: "Research what to create", time: "2–4 hours/week", note: "Competitive monitoring, trending content, search intent, what your audience is actually asking. If you skip this, your scripts are guesswork." },
              { step: 4, title: "Write 5 scripts in your brand voice", time: "3–5 hours/week", note: "Scripts optimized for video — punchy hooks, correct length, the right tone. Not a quick task if done properly." },
              { step: 5, title: "Format scripts for each platform", time: "1–2 hours/week", note: "LinkedIn content is not TikTok content. Different hooks, different lengths, different pacing." },
              { step: 6, title: "Render in HeyGen", time: "30–60 minutes/week", note: "If everything works smoothly. Budget extra time when it doesn't." },
              { step: 7, title: "Post-process each video", time: "1–2 hours/week", note: "Captions, watermarks, formatting per platform, thumbnail selection." },
              { step: 8, title: "Upload and schedule to each platform", time: "1–2 hours/week", note: "Four platforms, five videos, correct timing for each." },
              { step: 9, title: "Review performance and adjust", time: "1 hour/week", note: "What worked? What didn't? What changes next week?" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="bg-indigo-600/20 text-indigo-400 font-bold text-sm w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{item.step}</span>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <span className="text-indigo-400/70 text-xs">— {item.time}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 mb-6">
            <p className="text-amber-300 font-semibold text-sm mb-1">Total weekly time: 9–16 hours to do this properly.</p>
            <p className="text-gray-400 text-sm leading-relaxed">That&apos;s a part-time job — on top of whatever you&apos;re actually running.</p>
          </div>

          {/* Section 3 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            Where Most DIY HeyGen Users Fall Off (The Real Breakdown Points)
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            The pattern is almost always the same:
          </p>

          <div className="space-y-3 mb-6">
            {[
              { label: "Avatar training", color: "green", outcome: "Done. Most people complete this." },
              { label: "Voice clone", color: "green", outcome: "Done. This gets finished too." },
              { label: "First 2 scripts", color: "green", outcome: "Done. There's momentum here. It feels possible." },
              { label: "Week 3–4", color: "amber", outcome: "A busy week. Filming gets pushed back. The scripts don't get written. The queue clears." },
              { label: "Week 8", color: "red", outcome: "4 videos published total. Not 56. The subscription is still running." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${item.color === 'green' ? 'bg-green-500' : item.color === 'amber' ? 'bg-amber-500' : 'bg-red-500'}`} />
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.outcome}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">
            The tool isn&apos;t the problem. Execution consistency over time is. That&apos;s true of almost every content strategy, but it&apos;s especially true of video — because the workflow is genuinely time-intensive and every single week, there&apos;s something more urgent competing for the same hours.
          </p>

          {/* Section 4 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            When DIY HeyGen Makes Sense
          </h2>

          <ul className="text-gray-300 leading-relaxed mb-4 space-y-3 list-none">
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1 flex-shrink-0">&#10003;</span>
              <span>You&apos;re a developer or creator who enjoys the technical side and finds the workflow energizing rather than draining</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1 flex-shrink-0">&#10003;</span>
              <span>You have dedicated content time blocked in your calendar — genuinely blocked, not aspirationally blocked</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1 flex-shrink-0">&#10003;</span>
              <span>You&apos;re pre-revenue and need to keep costs minimal while building traction</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1 flex-shrink-0">&#10003;</span>
              <span>You have an existing VA or editor who can own most of the workflow and just needs the tooling direction</span>
            </li>
          </ul>

          {/* Section 5 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            When Done-For-You Makes Sense
          </h2>

          <ul className="text-gray-300 leading-relaxed mb-4 space-y-3 list-none">
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">&#10003;</span>
              <span>You&apos;re revenue-generating and your time is worth more than $200/hour — in which case 10–16 hours of content work per week is a $2,000+ weekly opportunity cost</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">&#10003;</span>
              <span>You want 5 videos published every week regardless of how busy your week gets — without the output depending on your availability</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">&#10003;</span>
              <span>You want research-backed scripts, not gut-feel content that may or may not resonate with your audience</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">&#10003;</span>
              <span>You want a human reviewing every video before it goes live, not just automated rendering that may have quality issues</span>
            </li>
          </ul>

          {/* Section 6 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            How Assurgit Uses HeyGen — And What We Add On Top
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            To be direct: Assurgit uses HeyGen&apos;s rendering engine. The same tool you&apos;d use if you went DIY. We&apos;re not doing something HeyGen can&apos;t do — we&apos;re building the full system around it so the output is consistent, strategic, and high-quality every week.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            What we add on top of HeyGen&apos;s rendering capability:
          </p>

          <ul className="text-gray-300 leading-relaxed mb-4 space-y-2 list-none">
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">—</span>
              <span>A weekly research pipeline monitoring your niche, competitors, and what&apos;s resonating with your target audience</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">—</span>
              <span>Script generation trained on your specific brand voice, positioning, and content pillars</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">—</span>
              <span>Rendering management and post-processing — including captions, platform formatting, and quality control</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">—</span>
              <span>Fully managed publishing to Instagram, TikTok, LinkedIn, and YouTube on a consistent schedule</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">—</span>
              <span>Friday strategy calls reviewing performance and adjusting direction week over week</span>
            </li>
          </ul>

          <p className="text-gray-300 leading-relaxed mb-4">
            You get the output — 7 branded videos, live across 4 platforms — without the overhead of managing the workflow yourself.
          </p>

          {/* Mid CTA */}
          <div className="my-10 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-8 text-center">
            <p className="text-white font-semibold text-lg mb-2">See a sample of what your content would look like</p>
            <p className="text-gray-400 text-sm mb-6">Book a free call. 20 minutes, no pitch deck.</p>
            <Link
              href="/book"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
            >
              Book a Free Call
            </Link>
          </div>

          {/* Section 7 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            Cost Comparison: DIY HeyGen vs. Assurgit
          </h2>

          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-6">
            <div className="grid grid-cols-2 divide-x divide-gray-800">
              <div className="p-6">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-4">DIY HeyGen</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-semibold text-sm">HeyGen Creator plan</p>
                    <p className="text-indigo-400 text-sm">~$89/month</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Your time (10–16 hrs/week)</p>
                    <p className="text-indigo-400 text-sm">$7,200–$12,800/month</p>
                    <p className="text-gray-500 text-xs mt-0.5">at $200/hr implied opportunity cost</p>
                  </div>
                  <div className="pt-3 border-t border-gray-800">
                    <p className="text-white font-bold text-sm">True cost</p>
                    <p className="text-amber-400 font-bold">$7,289–$12,889/month</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-indigo-600/5">
                <p className="text-indigo-400 text-xs uppercase tracking-wider mb-4">Assurgit Growth</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-semibold text-sm">Everything included</p>
                    <p className="text-gray-400 text-xs mt-0.5">HeyGen rendering costs included</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Your weekly time</p>
                    <p className="text-indigo-400 text-sm">~30 minutes</p>
                    <p className="text-gray-500 text-xs mt-0.5">Optional script review on Monday</p>
                  </div>
                  <div className="pt-3 border-t border-indigo-500/20">
                    <p className="text-white font-bold text-sm">Total cost</p>
                    <p className="text-white font-bold text-lg">$3,497/month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            The Honest Answer
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            If you&apos;ll actually do it — go DIY. HeyGen is excellent. The workflow is learnable. If you have the time, the discipline, and the genuine interest in managing the production process, DIY is a legitimate choice.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            But if you&apos;ve already proven to yourself that you won&apos;t — stop losing time pretending you will. The evidence is already there. Three months of a subscription and zero published videos is data, not a temporary situation.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            Done-for-you isn&apos;t for people who lack discipline. It&apos;s for people who are running a business, and whose highest-value use of time is not video production. Understanding the difference is how you make the right call.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            You can also read our guide to <Link href="/blog/best-ai-video-agency-for-coaches" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">what to look for in an AI video agency</Link> and our breakdown of <Link href="/blog/ai-video-ads-pricing-2026" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">AI video pricing in 2026</Link> to make a more fully informed comparison.
          </p>

          {/* Closing CTA */}
          <div className="mt-14 bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Had a HeyGen subscription for 60+ days with no consistent output?
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
              Book a call. We&apos;ll show you what your account could look like with a real system behind it — your avatar, your voice, five videos live every week.
            </p>
            <Link
              href="/book"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-10 py-4 rounded-lg transition-colors"
            >
              Book a Free Call
            </Link>
          </div>

          {/* Related Articles */}
          <div className="mt-14 pt-10 border-t border-gray-800">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-5">Related Articles</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/blog/best-ai-video-agency-for-coaches"
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-indigo-500/50 transition-colors group"
              >
                <p className="text-white font-semibold text-sm group-hover:text-indigo-300 transition-colors">
                  Best AI Video Agency for Coaches in 2026
                </p>
                <p className="text-gray-500 text-xs mt-2">For Coaches</p>
              </Link>
              <Link
                href="/blog/done-for-you-ai-video-content"
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-indigo-500/50 transition-colors group"
              >
                <p className="text-white font-semibold text-sm group-hover:text-indigo-300 transition-colors">
                  Done-For-You AI Video Content: What Businesses Get in 2026
                </p>
                <p className="text-gray-500 text-xs mt-2">How It Works</p>
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* Sticky Bottom CTA */}
      <div className="sticky bottom-0 left-0 right-0 bg-gray-950/95 backdrop-blur-md border-t border-gray-800 py-4 px-4 z-40">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-300 text-sm text-center sm:text-left">
            Stop managing tools. Start publishing consistently.
          </p>
          <Link
            href="/book"
            className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap"
          >
            Book a Free Call
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

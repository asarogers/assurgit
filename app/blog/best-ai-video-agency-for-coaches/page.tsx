import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Best AI Video Agency for Coaches in 2026 (That Actually Sounds Like You)",
  description:
    "You don't need a camera crew or a studio. The best AI video agencies for coaches use your voice, your face, and your ideas — and handle the rest. Here's what to look for.",
  openGraph: {
    title: "Best AI Video Agency for Coaches in 2026 (That Actually Sounds Like You)",
    description:
      "You don't need a camera crew or a studio. The best AI video agencies for coaches use your voice, your face, and your ideas — and handle the rest.",
    type: "article",
  },
};

export default function BestAIVideoAgencyForCoachesPage() {
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
              For Coaches
            </span>
            <span className="text-gray-500 text-xs">9 min read</span>
            <span className="text-gray-500 text-xs">March 2026</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            The Best AI Video Agency for Coaches in 2026 (That Actually Sounds Like You)
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            Most coaches know they need to post video. Most coaches also know they&apos;re never actually going to sit down and film seven of them this week. That&apos;s not a discipline problem. It&apos;s a systems problem.
          </p>
        </div>

        {/* Article Body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Section 1 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            Why Coaches Specifically Struggle With Video Consistency
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            You&apos;re good at what you do. You can hold a room, run a transformation, and articulate complex ideas with clarity. But video is a completely different skill set — and more importantly, it&apos;s a completely different workflow.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            The camera is a production problem, an editing problem, a posting problem, and a strategy problem all at once. You need to look good, sound good, say the right things, cut it correctly, caption it properly, and post it to the right platform at the right time — repeatedly, every week, without fail.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            Even coaches who are genuinely great on camera burn out on the volume required to build an audience in 2026. The algorithm doesn&apos;t reward brilliance. It rewards consistency. And consistency is a systems game, not a talent game.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            What &ldquo;AI Video Agency&rdquo; Actually Means (Cut Through the Confusion)
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            The term &ldquo;AI video agency&rdquo; has been stretched beyond recognition. Some agencies put your logo on a stock footage template, run it through a basic tool, and call it AI. That&apos;s not what we&apos;re talking about.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            Real AI video agencies use avatar and voice clone technology — platforms like HeyGen, Synthesia, and ElevenLabs — to generate video that actually looks and sounds like you. The difference is not subtle. One sounds like a template. One sounds like you recorded it yourself.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            When evaluating any AI video agency, the questions that matter are specific: Do they use <em>your</em> face and voice, or a generic avatar? Do they write custom scripts, or recycle templates? Do they research your niche, or guess? The answers tell you everything about whether the content will actually build your authority.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            What to Look For When Hiring an AI Video Agency as a Coach
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            Not all done-for-you AI video services are built the same. Here&apos;s what separates the ones worth paying for from the ones that will produce content you&apos;re embarrassed to post.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Your face and voice, not a generic avatar</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            If the agency is using stock avatars or pre-built personas, the content won&apos;t build <em>your</em> authority — it will build a character&apos;s. Your audience needs to see you. Your avatar needs to be trained on your actual appearance, and your voice needs to be cloned from your actual recordings.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Research-backed scripts, not recycled content</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Scripts written from gut feel produce generic content that blends into the noise. The best agencies monitor your competitive landscape, analyze what&apos;s working in your niche, and build scripts from real research. You should never post something that your top competitor posted last week.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Platform-specific optimization</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            LinkedIn content is not TikTok content. The hook, the length, the pacing, the format — they&apos;re all different. An agency that posts the same video across all four platforms without adjusting for each one is not doing the job.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">An approval process you can actually use</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            You should see every script before it goes live. Not because you need to rewrite them — that defeats the purpose — but because you should be able to flag anything that conflicts with your positioning, your current offer, or your audience&apos;s expectations.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Publishing included, not just MP4 delivery</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            An agency that delivers you MP4 files and calls it done has transferred the hard part back to you. Publishing to four platforms, scheduling correctly, captioning, and optimizing thumbnails — that&apos;s 30–60 minutes per video you&apos;re still spending. Real done-for-you means the videos are live without you touching them.
          </p>

          {/* Section 4 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            How Assurgit Works for Coaches
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            Setup takes 30 minutes. Your avatar is trained on your appearance from a short video recording. Your voice is cloned from a brief audio session. After that, you never need to film again.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            Every Monday, five scripts land in your inbox — written from real competitive research in your niche, optimized for your audience, and formatted for each platform. You have a 48-hour window to review them, request changes, or simply let them auto-approve and move forward.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            By the end of the week, every approved script has been rendered with your face and voice through HeyGen, reviewed by a human for quality, and scheduled for auto-publishing across Instagram, TikTok, LinkedIn, and YouTube.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            Every Friday, there&apos;s a strategy call — reviewing last week&apos;s performance, adjusting positioning if needed, and planning the content direction for the week ahead.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            You are visible every week. You never filmed once.
          </p>

          {/* Mid CTA */}
          <div className="my-10 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-8 text-center">
            <p className="text-white font-semibold text-lg mb-2">See exactly what your content would look like</p>
            <p className="text-gray-400 text-sm mb-6">Book a free 20-minute call. No pitch deck, no hard sell.</p>
            <Link
              href="/book"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
            >
              Book a Free Call
            </Link>
          </div>

          {/* Section 5 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            What Coaches Are Actually Buying (The Real ROI)
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            You&apos;re not buying five videos a week. You&apos;re buying the authority that builds over six months of showing up every single week, without exception. That&apos;s the thing that compounds.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            Every video is a sales asset. A prospect who watches 12 of your videos before booking a call arrives warm, pre-sold, and already aligned with your approach. Every video you publish is a piece of that funnel working on autopilot — permanently.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            The alternative is zero videos because you&apos;re too busy coaching, zero authority because you&apos;re invisible, and losing clients to the coach who&apos;s showing up on LinkedIn every Tuesday at 9am while you&apos;re in back-to-back sessions.
          </p>

          {/* Section 6 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            What It Costs and What You Get
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            Assurgit offers four plans starting at $397/month. For most coaches getting started, the <strong className="text-white">Launch plan at $397/month</strong> is the right entry point — short-form videos every week, avatar + voice clone, human QC on one platform. For coaches ready for full automation, the <strong className="text-white">Starter plan at $997/month</strong> includes content across 4 platforms, auto-publishing, weekly competitive intel, and the Friday strategy call.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            To calibrate that price, here&apos;s what coaches typically spend when they try to assemble this themselves:
          </p>

          <ul className="text-gray-300 leading-relaxed mb-4 space-y-2 list-none">
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">—</span>
              <span>A freelance video editor who can handle AI rendering: $2,000–$4,000/month — and you still need to film or write scripts</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">—</span>
              <span>A social media manager to handle posting and scheduling: $1,500–$3,000/month — generic captions, no research, no voice</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">—</span>
              <span>Filming yourself: technically free, but in practice produces zero videos because you never have time</span>
            </li>
          </ul>

          <p className="text-gray-300 leading-relaxed mb-4">
            The Starter plan replaces all three — with better output. View the full plan breakdown on the <Link href="/pricing" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">pricing page</Link>.
          </p>

          {/* Section 7 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            Common Questions Coaches Ask Before Signing
          </h2>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Do I have to film anything?</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            No. After the initial 30-minute setup — which includes your avatar training video and your voice clone recording — you never need to film again. Everything is generated from your existing avatar and voice clone.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Will it actually sound like me?</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Yes. Your voice clone is generated from your actual voice recordings using industry-leading technology. The difference between a generic text-to-speech voice and a proper voice clone is significant — and it&apos;s what determines whether your audience connects with the content or tunes it out.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">How long until I see results?</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Consistency compounds. Most clients see meaningful engagement growth by week 8. Authority takes longer — six months of weekly posting builds a presence that very few coaches in any niche have. The clients who see the biggest results are the ones who commit to the long game and stay consistent.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Can I approve content before it goes live?</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Yes. Every Monday, your five scripts are delivered for optional review. You have a 48-hour window to read them, request changes, or approve them. If you don&apos;t respond, they auto-approve and move to rendering — keeping the production schedule on track without creating a bottleneck.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            You can also learn more about how avatar technology works and how it compares to DIY in our article on <Link href="/blog/heygen-vs-custom-ai-avatars" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">HeyGen vs. custom AI avatars</Link>.
          </p>

          {/* Closing CTA */}
          <div className="mt-14 bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              See what your content would actually look like
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
              Book a free call. We&apos;ll show you a sample of what your content would look like with your avatar and voice, walk through the Starter plan, and answer every question. No pitch deck, no hard sell — just 20 minutes to see if it&apos;s a fit.
            </p>
            <Link
              href="/book"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-10 py-4 rounded-lg transition-colors"
            >
              Book a Free 20-Minute Call
            </Link>
          </div>

          {/* Related Articles */}
          <div className="mt-14 pt-10 border-t border-gray-800">
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-5">Related Articles</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/blog/heygen-vs-custom-ai-avatars"
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-indigo-500/50 transition-colors group"
              >
                <p className="text-white font-semibold text-sm group-hover:text-indigo-300 transition-colors">
                  HeyGen vs. Custom AI Avatars: DIY vs. Done-For-You
                </p>
                <p className="text-gray-500 text-xs mt-2">Tools & Technology</p>
              </Link>
              <Link
                href="/blog/ai-video-ads-pricing-2026"
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-indigo-500/50 transition-colors group"
              >
                <p className="text-white font-semibold text-sm group-hover:text-indigo-300 transition-colors">
                  AI Video Content Pricing in 2026: What You Should Expect to Pay
                </p>
                <p className="text-gray-500 text-xs mt-2">Pricing & ROI</p>
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* Sticky Bottom CTA */}
      <div className="sticky bottom-0 left-0 right-0 bg-gray-950/95 backdrop-blur-md border-t border-gray-800 py-4 px-4 z-40">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-300 text-sm text-center sm:text-left">
            Ready to see what your content would look like?
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

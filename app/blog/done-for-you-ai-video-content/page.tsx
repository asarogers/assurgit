import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: "Done-For-You AI Video Content for Businesses: What It Is, What It Costs, and What to Expect",
  description:
    "Done-for-you AI video content means your face, your voice, and your ideas — published to 4 platforms weekly, without you lifting a finger. Here's exactly how it works.",
  openGraph: {
    title: "Done-For-You AI Video Content for Businesses: What It Is, What It Costs, and What to Expect",
    description:
      "Done-for-you AI video content means your face, your voice, and your ideas — published to 4 platforms weekly, without you lifting a finger. Here's exactly how it works.",
    type: "article",
  },
};

export default function DoneForYouAIVideoContentPage() {
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
              How It Works
            </span>
            <span className="text-gray-500 text-xs">9 min read</span>
            <span className="text-gray-500 text-xs">March 2026</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            Done-For-You AI Video Content: What Businesses Are Actually Getting in 2026
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            Done-for-you used to mean hiring an agency to produce generic branded videos with stock footage and a voiceover that sounds like nobody you know. AI changed that. Done-for-you now means your face, your voice, your content — published automatically. Here&apos;s what that actually looks like in practice.
          </p>
        </div>

        {/* Article Body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Section 1 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            What &ldquo;Done-For-You AI Video&rdquo; Actually Means in 2026
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            The real definition: a fully managed system where a service provider builds your AI avatar and voice clone, writes scripts from real research, renders videos using your likeness, reviews them for quality, and publishes them to your platforms — on a weekly, recurring basis. The output looks and sounds like you. The production doesn&apos;t require your time.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            What you provide at setup:
          </p>

          <ul className="text-gray-300 leading-relaxed mb-4 space-y-2 list-none">
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">—</span>
              <span>A 30-minute onboarding call to align on brand voice, audience, and content pillars</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">—</span>
              <span>A short video recording used to train your custom AI avatar</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">—</span>
              <span>1–2 minutes of clean audio used to generate your voice clone</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 flex-shrink-0">—</span>
              <span>A brand brief: your tone, your audience, your content topics, and anything you want to avoid</span>
            </li>
          </ul>

          <p className="text-gray-300 leading-relaxed mb-4">
            What you do after setup: optional script review on Monday. Nothing else.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            The Weekly Production Rhythm (How a Real System Runs)
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            One of the most common questions people ask is: &ldquo;Once I sign up, what actually happens every week?&rdquo; Here&apos;s the exact cadence:
          </p>

          <div className="space-y-3 mb-6">
            {[
              {
                day: "Sunday",
                title: "Research pipeline runs",
                detail: "Automated competitive analysis scans what your top competitors are posting, what&apos;s trending in your niche, and what your target audience is actively searching for. This is the intelligence that makes the scripts strategic rather than generic.",
              },
              {
                day: "Monday",
                title: "5 scripts delivered",
                detail: "Scripts arrive in your inbox or dashboard. You have 48 hours to review them, request revisions, or approve. If you don't respond, they auto-approve — keeping the schedule on track without creating a bottleneck.",
              },
              {
                day: "Tue–Fri",
                title: "Review window",
                detail: "Read the scripts. Flag anything that conflicts with your positioning, your current offer, or something you want adjusted. Most clients approve as-is or with minor tweaks. Revisions are handled same-day.",
              },
              {
                day: "Saturday",
                title: "Rendering via HeyGen",
                detail: "All approved scripts render using your trained avatar and voice clone. Each video goes through a human quality review before it moves to post-processing.",
              },
              {
                day: "Sat–Sun",
                title: "Post-processing & scheduling",
                detail: "Captions added. Format adjusted per platform. Videos scheduled for optimal publishing times across Instagram, TikTok, LinkedIn, and YouTube.",
              },
              {
                day: "Monday",
                title: "Content goes live. Cycle resets.",
                detail: "Five videos are published across your platforms. The research pipeline starts again for next week&apos;s content.",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-xl p-5">
                <span className="bg-indigo-600/20 text-indigo-400 font-bold text-xs px-2 py-1 rounded-md flex-shrink-0 min-w-[70px] text-center mt-0.5">{item.day}</span>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section 3 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            What &ldquo;Research-Backed Scripts&rdquo; Actually Means (And Why It Matters)
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            Most content agencies write scripts based on gut feel, trending audio, or recycled topics they&apos;ve used for ten other clients. Research-backed scripts are different — and the difference shows up directly in engagement and authority.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            The research process behind each week&apos;s scripts pulls from four sources:
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-white font-semibold text-sm mb-2">Competitive monitoring</p>
              <p className="text-gray-400 text-sm leading-relaxed">What are your top 3 competitors posting? What&apos;s getting traction for them, and what isn&apos;t? The goal is to identify where you can take a different angle — not to copy, but to find the gaps they&apos;re missing.</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-white font-semibold text-sm mb-2">Content gap analysis</p>
              <p className="text-gray-400 text-sm leading-relaxed">What questions is your audience asking that nobody in your space is answering clearly? These are the highest-value scripts — because your content becomes the definitive answer.</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-white font-semibold text-sm mb-2">Search intent data</p>
              <p className="text-gray-400 text-sm leading-relaxed">What is your target audience actively searching for this week — not six months ago, this week? Scripts aligned with current search intent perform better and drive inbound from people actively looking for what you offer.</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-white font-semibold text-sm mb-2">Platform trend data</p>
              <p className="text-gray-400 text-sm leading-relaxed">What formats, hooks, and structures are performing in your niche across each platform right now? This keeps your content current without you needing to monitor the algorithm changes yourself.</p>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">
            The output is scripts that are strategically positioned — not randomly generated. The difference between a script built from research and one built from a template is the difference between content that builds authority and content that gets ignored.
          </p>

          {/* Mid CTA */}
          <div className="my-10 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-8 text-center">
            <p className="text-white font-semibold text-lg mb-2">See what research-backed scripts look like for your industry</p>
            <p className="text-gray-400 text-sm mb-6">Book a free 20-minute call. We&apos;ll walk through exactly what your first month would look like.</p>
            <Link
              href="/book"
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
            >
              Book a Free Call
            </Link>
          </div>

          {/* Section 4 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            The Platforms — And Why All Four Matter
          </h2>

          <div className="space-y-4 mb-6">
            {[
              {
                platform: "LinkedIn",
                label: "B2B authority",
                detail: "Your future clients are on LinkedIn. Video drives 5x more engagement than text on the platform, and most professionals still underuse it. Consistent video presence builds the kind of authority that makes you the obvious choice in your category.",
              },
              {
                platform: "Instagram Reels",
                label: "Discovery channel",
                detail: "Reaches new audiences outside your existing network. Instagram&apos;s algorithm actively distributes Reels to non-followers — making it the best organic discovery channel for coaches, consultants, and service businesses.",
              },
              {
                platform: "TikTok",
                label: "B2B&apos;s fastest-growing platform",
                detail: "The fastest-growing B2B discovery channel in 2025–2026, and still significantly underused by competitors in most niches. The window to build early authority before it gets crowded is still open — but not indefinitely.",
              },
              {
                platform: "YouTube",
                label: "Long-term compounding asset",
                detail: "YouTube videos rank in Google. A 6-month library of weekly videos becomes a permanent search-driven authority asset. YouTube is the platform with the longest content lifespan — a video published today can still drive inbound leads two years from now.",
              },
            ].map((item) => (
              <div key={item.platform} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <div className="flex items-baseline gap-3 mb-2">
                  <p className="text-white font-bold text-sm">{item.platform}</p>
                  <span className="text-indigo-400 text-xs">{item.label}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">
            Publishing to one platform manually is achievable. Publishing to four platforms, five times a week, with platform-specific formatting and consistent timing — is a system, not a task.
          </p>

          {/* Section 5 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            Is It Worth It? The Honest ROI Case
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            Here&apos;s a direct breakdown of what you&apos;re actually buying and what you&apos;re getting in return:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-white font-semibold text-sm mb-3">Time saved</p>
              <p className="text-indigo-400 font-bold text-xl mb-1">10–15 hrs/week</p>
              <p className="text-gray-400 text-xs leading-relaxed">Of content production, research, editing, and publishing — returned to client work, sales, or delivery.</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-white font-semibold text-sm mb-3">Authority built</p>
              <p className="text-indigo-400 font-bold text-xl mb-1">168 videos in 6 months</p>
              <p className="text-gray-400 text-xs leading-relaxed">Consistent weekly presence vs. sporadic posting. Every video is a permanent sales asset.</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-white font-semibold text-sm mb-3">Pipeline impact</p>
              <p className="text-indigo-400 font-bold text-xl mb-1">Inbound on autopilot</p>
              <p className="text-gray-400 text-xs leading-relaxed">Prospects who watch 10+ of your videos before booking a call arrive pre-sold. Every video works while you sleep.</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-white font-semibold text-sm mb-3">The intangible</p>
              <p className="text-indigo-400 font-bold text-xl mb-1">Visibility</p>
              <p className="text-gray-400 text-xs leading-relaxed">You stop being invisible. In most niches, showing up consistently every week puts you ahead of 95% of competitors within 90 days.</p>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">
            <strong className="text-white">What it costs:</strong> $1,997–$5,997/month depending on plan. View the full breakdown on the <Link href="/pricing" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">pricing page</Link>.
          </p>

          <p className="text-gray-300 leading-relaxed mb-4">
            <strong className="text-white">What inconsistency costs:</strong> Your visibility, your authority, and the clients who found someone else while you were too busy to post.
          </p>

          {/* Section 6 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            Who This Is Actually Right For
          </h2>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Right fit</h3>
          <ul className="text-gray-300 leading-relaxed mb-6 space-y-2 list-none">
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1 flex-shrink-0">&#10003;</span>
              <span>Coaches, consultants, and service businesses doing $150K+ annually who want to scale authority without scaling time</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1 flex-shrink-0">&#10003;</span>
              <span>B2B SaaS founders who need consistent LinkedIn and YouTube presence to build category authority</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1 flex-shrink-0">&#10003;</span>
              <span>Agency owners who want a white-label content system they can offer to their own clients</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1 flex-shrink-0">&#10003;</span>
              <span>E-commerce brands doing $1M+ who need consistent video at scale across multiple channels</span>
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Not the right fit</h3>
          <ul className="text-gray-300 leading-relaxed mb-6 space-y-2 list-none">
            <li className="flex items-start gap-3">
              <span className="text-gray-600 mt-1 flex-shrink-0">—</span>
              <span>Pre-revenue businesses where every dollar is critical — start with outreach and direct sales first</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-600 mt-1 flex-shrink-0">—</span>
              <span>Businesses with strict legal or compliance restrictions on using AI-generated likenesses</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-600 mt-1 flex-shrink-0">—</span>
              <span>People who genuinely enjoy the content production process and want to stay hands-on — DIY is a valid path for those who will actually do it</span>
            </li>
          </ul>

          {/* Section 7 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            Questions People Ask Before Signing
          </h2>

          <div className="space-y-4 mb-6">
            {[
              {
                q: "Do I need to film anything?",
                a: "Only at setup — a short video for avatar training and a brief audio recording for voice cloning. After that, no filming required. Your avatar and voice clone handle everything.",
              },
              {
                q: "How long does setup take?",
                a: "30 minutes for the onboarding call. Avatar training and voice clone generation happen on our side. Most clients are live and publishing within 5–7 business days of onboarding.",
              },
              {
                q: "What if I want changes to a script?",
                a: "Request revisions during the 48-hour Monday review window. We handle them same-day. You can flag tone, topic, specific claims, or anything that doesn't fit your current positioning.",
              },
              {
                q: "Are there contracts?",
                a: "Month-to-month. No long-term contracts required. The clients who stay do so because results compound over time — not because they're locked in.",
              },
              {
                q: "What platforms do you publish to?",
                a: "Instagram, TikTok, LinkedIn, and YouTube. All four are included in the Growth plan. Platform-specific formatting is handled for each.",
              },
              {
                q: "What if the avatar doesn't look right?",
                a: "Every avatar goes through quality review before going live. If something doesn't meet the standard, we re-train. You approve the avatar before it's ever used in published content.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-white font-semibold text-sm mb-2">{item.q}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          {/* Closing CTA */}
          <div className="mt-14 bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to see exactly what your first month would look like?
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
              Book a 20-minute call. We&apos;ll walk through exactly what your first month of content would look like, answer every question, and tell you honestly if we&apos;re the right fit. No pitch deck, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book"
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-10 py-4 rounded-lg transition-colors"
              >
                Book a Free 20-Minute Call
              </Link>
              <Link
                href="/pricing"
                className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-semibold px-10 py-4 rounded-lg transition-colors"
              >
                View Pricing
              </Link>
            </div>
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
            Your face, your voice, 5 videos/week — without filming.
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

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: "AI Video Content Pricing in 2026: What You Should Expect to Pay",
  description:
    "AI video production ranges from $50/month DIY tools to $10,000+/month for full agencies. Here's a complete breakdown of what each tier delivers — and what's actually worth it.",
  openGraph: {
    title: "AI Video Content Pricing in 2026: What You Should Expect to Pay",
    description:
      "AI video production ranges from $50/month DIY tools to $10,000+/month for full agencies. Here's a complete breakdown of what each tier delivers — and what's actually worth it.",
    type: "article",
  },
};

export default function AIVideoPricingPage() {
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
              Pricing & ROI
            </span>
            <span className="text-gray-500 text-xs">8 min read</span>
            <span className="text-gray-500 text-xs">March 2026</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            AI Video Content Pricing in 2026: What You Should Expect to Pay (And Why the Ranges Are So Wide)
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            &ldquo;AI video&rdquo; can mean a $29/month Canva subscription or a $10,000/month managed service. Both involve AI. The difference in what you get is enormous. Here&apos;s how to know what you&apos;re actually comparing.
          </p>
        </div>

        {/* Article Body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Section 1 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            The 4 Tiers of AI Video Production in 2026
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            When someone says &ldquo;I&apos;m looking at AI video,&rdquo; they could mean any of four very different categories. Understanding the tiers is the first step to understanding what you&apos;re actually evaluating.
          </p>

          {/* Tier Table */}
          <div className="space-y-6 mb-8">

            {/* Tier 1 */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-lg font-semibold text-white">Tier 1: DIY AI Video Tools</h3>
                <span className="bg-gray-800 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">$29–$240/month</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                <strong className="text-gray-200">Tools:</strong> HeyGen, Synthesia, Creatify, Runway
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                <strong className="text-gray-200">What you get:</strong> Access to the platform, pre-built avatars, or the ability to configure your own if you invest the time.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                <strong className="text-gray-200">What you do:</strong> Write scripts, prompt the tool, render, download, post — yourself, every week.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-1">
                <strong className="text-gray-200">Best for:</strong> Technically comfortable individuals with 10+ hours/week to manage the production process.
              </p>
              <p className="text-amber-400/80 text-sm leading-relaxed mt-3 border-t border-gray-800 pt-3">
                Limitation: You still need to write scripts, manage the tool, handle publishing, and maintain consistency. This is not done-for-you — it&apos;s a powerful tool that requires a full workflow around it.
              </p>
            </div>

            {/* Tier 2 */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-lg font-semibold text-white">Tier 2: Freelancers & Content Editors</h3>
                <span className="bg-gray-800 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">$500–$2,000/month</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                <strong className="text-gray-200">What you get:</strong> Someone to edit clips, write some captions, maybe create graphics.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-1">
                <strong className="text-gray-200">What they don&apos;t do:</strong> Strategy, research, avatar or voice clone setup, publishing to multiple platforms.
              </p>
              <p className="text-amber-400/80 text-sm leading-relaxed mt-3 border-t border-gray-800 pt-3">
                Limitation: Still requires you to film, or provide raw content. You&apos;re outsourcing post-production — not production itself.
              </p>
            </div>

            {/* Tier 3 */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-lg font-semibold text-white">Tier 3: Traditional Video / Social Agencies</h3>
                <span className="bg-gray-800 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">$2,000–$8,000/month</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                Stock footage, templates, generic branded content. Usually not your face, definitely not your voice. May include posting but rarely includes meaningful strategy or competitive research.
              </p>
              <p className="text-amber-400/80 text-sm leading-relaxed mt-3 border-t border-gray-800 pt-3">
                Limitation: The content looks like everyone else&apos;s. It doesn&apos;t build personal brand authority — it builds brand awareness for a generic identity.
              </p>
            </div>

            {/* Tier 4 */}
            <div className="bg-indigo-600/10 border border-indigo-500/40 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-lg font-semibold text-white">Tier 4: Done-For-You AI Avatar Video Services</h3>
                <span className="bg-indigo-600/30 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">$1,997–$6,000/month</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-1">
                Your face, your voice, researched and scripted content — published for you, week after week. The gap most people didn&apos;t know existed until recently.
              </p>
              <p className="text-indigo-400/80 text-sm leading-relaxed mt-3 border-t border-indigo-500/20 pt-3">
                This is the category that actually builds personal brand authority at scale, without you appearing on camera.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            Why Pricing Varies So Much Within &ldquo;AI Video&rdquo;
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            Two services can both truthfully say &ldquo;we do AI video&rdquo; and be priced $5,000/month apart. The gap comes down to five variables:
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-4">
              <span className="text-indigo-400 font-bold text-lg leading-none mt-0.5 flex-shrink-0">1</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Avatar quality</p>
                <p className="text-gray-400 text-sm leading-relaxed">Generic stock avatars vs. a custom-trained personal avatar built from your own video footage. The difference is immediately visible — and immediately affects whether your audience connects with the content.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-indigo-400 font-bold text-lg leading-none mt-0.5 flex-shrink-0">2</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Voice</p>
                <p className="text-gray-400 text-sm leading-relaxed">Generic text-to-speech voices vs. your actual cloned voice. Anyone who has heard both knows the difference is not small.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-indigo-400 font-bold text-lg leading-none mt-0.5 flex-shrink-0">3</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Research</p>
                <p className="text-gray-400 text-sm leading-relaxed">Template scripts recycled from generic topics vs. competitive-intelligence-driven scripts built around what your specific audience is searching for this week.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-indigo-400 font-bold text-lg leading-none mt-0.5 flex-shrink-0">4</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Publishing</p>
                <p className="text-gray-400 text-sm leading-relaxed">MP4 delivery to your inbox vs. fully managed auto-publishing to all four platforms with platform-specific formatting and scheduling.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-indigo-400 font-bold text-lg leading-none mt-0.5 flex-shrink-0">5</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Strategy</p>
                <p className="text-gray-400 text-sm leading-relaxed">One-off content production vs. a weekly strategic rhythm with performance feedback, competitive monitoring, and positioning adjustments.</p>
              </div>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">
            The cheapest AI video option addresses none of these. The most expensive addresses all of them. Everything in between is a tradeoff — and understanding which tradeoffs matter to you determines which tier is worth paying for.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            What $3,497/Month Actually Buys You: The Assurgit Growth Plan Breakdown
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            Let&apos;s put the Growth plan price in context by breaking down what each component is equivalent to if you tried to hire for it separately:
          </p>

          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-6">
            <div className="divide-y divide-gray-800">
              {[
                { item: "Avatar setup + voice clone training", note: "One-time, included", equiv: "~$500 one-time if done externally" },
                { item: "Weekly research pipeline", note: "Competitive analysis, trending content, search intent — weekly", equiv: "Junior analyst: $2,000+/month" },
                { item: "5 scripts/week in your brand voice", note: "Written and revised weekly", equiv: "Ghostwriter: $1,500+/month" },
                { item: "HeyGen rendering + post-processing + QC", note: "Every video reviewed before publishing", equiv: "Video editor: $2,000+/month" },
                { item: "Multi-platform publishing", note: "IG, TikTok, LinkedIn, YouTube — formatted per platform", equiv: "Social media manager: $1,000+/month" },
                { item: "Friday strategy call with performance briefing", note: "Weekly, with a human strategist", equiv: "Marketing consultant: $500+/month" },
              ].map((row, i) => (
                <div key={i} className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <p className="text-white font-semibold text-sm">{row.item}</p>
                      <p className="text-gray-500 text-xs mt-1">{row.note}</p>
                    </div>
                    <span className="text-indigo-400 text-xs font-semibold whitespace-nowrap flex-shrink-0 sm:text-right">{row.equiv}</span>
                  </div>
                </div>
              ))}
              <div className="p-5 bg-indigo-600/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <p className="text-white font-bold">Total if hired separately</p>
                  <span className="text-indigo-300 font-bold">$7,000–$10,000+/month</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3 pt-3 border-t border-indigo-500/20">
                  <p className="text-white font-bold">Assurgit Growth Plan</p>
                  <span className="text-white font-bold text-lg">$3,497/month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mid CTA */}
          <div className="my-10 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-8 text-center">
            <p className="text-white font-semibold text-lg mb-2">See the Growth plan in detail</p>
            <p className="text-gray-400 text-sm mb-6">Book a free call to get pricing for your specific situation and see a sample of your content.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book"
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
              >
                Book a Free Call
              </Link>
              <Link
                href="/pricing"
                className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
              >
                View All Plans
              </Link>
            </div>
          </div>

          {/* Section 4 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            Questions to Ask Before You Pay for AI Video
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            Not every AI video service will answer these honestly. The ones that can are worth the conversation.
          </p>

          <div className="space-y-4 mb-6">
            {[
              { q: "Is it my face and voice, or a generic avatar?", a: "This is the most important question. Generic avatars don't build your authority — they build a character's." },
              { q: "Do they write the scripts, or do I?", a: "If script writing is on you, you've outsourced the easiest part and kept the hardest part." },
              { q: "Do they publish, or just deliver files?", a: "File delivery is not done-for-you. Publishing to 4 platforms weekly, formatted correctly, is done-for-you." },
              { q: "Is there a research component — do they know your niche?", a: "Generic scripts don't create authority. Research-backed content does." },
              { q: "Is there a human reviewing the final output?", a: "AI can make mistakes. A human QC step is the difference between a professional result and an embarrassing one." },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                <p className="text-white font-semibold text-sm mb-2">{item.q}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          {/* Section 5 */}
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">
            When NOT to Use a Done-For-You AI Video Service
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            This section matters. Done-for-you AI video is not the right answer for everyone, and saying otherwise would be dishonest.
          </p>

          <ul className="text-gray-300 leading-relaxed mb-4 space-y-3 list-none">
            <li className="flex items-start gap-3">
              <span className="text-gray-600 mt-1 flex-shrink-0">—</span>
              <span><strong className="text-white">If you&apos;re pre-revenue and every dollar is critical:</strong> Start with outreach and direct sales. Video builds awareness over months; outreach can close deals this week.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-600 mt-1 flex-shrink-0">—</span>
              <span><strong className="text-white">If your business has strict compliance restrictions on your likeness:</strong> Some regulated industries (certain finance, legal, medical contexts) have restrictions on AI-generated representations. Verify with your compliance team first.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-600 mt-1 flex-shrink-0">—</span>
              <span><strong className="text-white">If you genuinely enjoy producing content and have the time:</strong> DIY with HeyGen is a legitimate path if you have the discipline and the workflow. See our breakdown of <Link href="/blog/heygen-vs-custom-ai-avatars" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">HeyGen vs. done-for-you</Link> for an honest comparison.</span>
            </li>
          </ul>

          {/* Closing CTA */}
          <div className="mt-14 bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to see if the numbers work for your situation?
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto">
              If you&apos;re spending more than $3,000/month on any combination of content, editing, or social management — and you&apos;re still not posting consistently — we should talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book"
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-10 py-4 rounded-lg transition-colors"
              >
                Book a Free Call
              </Link>
              <Link
                href="/pricing"
                className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-semibold px-10 py-4 rounded-lg transition-colors"
              >
                See All Pricing
              </Link>
            </div>
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
            See if the Growth plan is right for your business.
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

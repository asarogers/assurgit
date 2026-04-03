import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Insights & Strategy | AI Video Content for Business",
  description:
    "Guides on AI video production, pricing, and strategy for coaches, consultants, and growing businesses. Learn how done-for-you AI video content works and what it costs.",
};

const posts = [
  {
    slug: "best-ai-video-agency-for-coaches",
    title: "The Best AI Video Agency for Coaches in 2026 (That Actually Sounds Like You)",
    description:
      "You don't need a camera crew or a studio. The best AI video agencies for coaches use your voice, your face, and your ideas — and handle the rest. Here's what to look for.",
    readTime: "9 min read",
    category: "For Coaches",
  },
  {
    slug: "ai-video-ads-pricing-2026",
    title: "AI Video Content Pricing in 2026: What You Should Expect to Pay",
    description:
      "AI video production ranges from $50/month DIY tools to $10,000+/month for full agencies. Here's a complete breakdown of what each tier delivers — and what's actually worth it.",
    readTime: "8 min read",
    category: "Pricing & ROI",
  },
  {
    slug: "heygen-vs-custom-ai-avatars",
    title: "HeyGen vs. Custom AI Avatars: DIY vs. Done-For-You (Which Actually Works?)",
    description:
      "HeyGen is a powerful tool. But subscribing to HeyGen and getting 5 branded videos published every week are very different things. Here's what most people miss.",
    readTime: "8 min read",
    category: "Tools & Technology",
  },
  {
    slug: "done-for-you-ai-video-content",
    title: "Done-For-You AI Video Content for Businesses: What It Is, What It Costs, and What to Expect",
    description:
      "Done-for-you AI video content means your face, your voice, and your ideas — published to 4 platforms weekly, without you lifting a finger. Here's exactly how it works.",
    readTime: "9 min read",
    category: "How It Works",
  },
  {
    slug: "linkedin-video-strategy-for-business-owners",
    title: "LinkedIn Video Strategy for Business Owners in 2026 (Without Picking Up a Camera)",
    description:
      "LinkedIn's algorithm is rewarding video harder than ever — and most of your competitors still aren't posting consistently. Here's how to show up every week without filming.",
    readTime: "8 min read",
    category: "LinkedIn",
  },
  {
    slug: "how-to-get-clients-from-social-media-without-posting-every-day",
    title: "How to Get Clients from Social Media Without Posting Every Day",
    description:
      "You don't need to post every day to get clients from social media. You need the right content, at the right frequency, published consistently. Here's the system.",
    readTime: "9 min read",
    category: "Strategy",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-brand-accent font-semibold text-sm uppercase tracking-wider mb-3">
              Insights & Strategy
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Everything you need to know about AI video content
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Guides on pricing, tools, and strategy for coaches, consultants, and growing businesses who want to build authority through consistent video — without filming.
            </p>
          </div>
        </div>

        {/* Post Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-brand-accent/50 transition-colors flex flex-col"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="bg-brand-accent/20 text-brand-accent text-xs font-semibold px-3 py-1 rounded-full border border-brand-accent/30">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-xs">{post.readTime}</span>
                </div>

                <h2 className="text-xl font-bold text-white mb-3 leading-snug">
                  {post.title}
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {post.description}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-brand-accent hover:text-brand-accent-hov font-semibold text-sm transition-colors group"
                >
                  Read article
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-20">
          <div className="bg-brand-accent/10 border border-brand-accent/30 rounded-2xl p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to see what your content would look like?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Book a free 20-minute call. We&apos;ll show you a sample, walk through the Starter plan, and answer every question.
            </p>
            <Link
              href="/book"
              className="inline-block bg-brand-accent hover:bg-brand-accent-hov text-white font-semibold px-8 py-4 rounded-lg transition-colors text-sm"
            >
              Book a Free Call
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

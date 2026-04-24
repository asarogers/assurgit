import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  openGraph: {
  url: "https://assurgit.com/blog",
  images: [{ url: "https://assurgit.com/opengraph-image.png", width: 1024, height: 1024, alt: "Assurgit" }],
  },
  title: "Insights & Strategy | AI Video Content for Business",
  description:
    "Guides on AI video production, pricing, and strategy for coaches, consultants, and growing businesses. Learn how done-for-you AI video content works and what it costs.",
  alternates: {
    canonical: 'https://assurgit.com/blog',
  },
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


const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Insights & Strategy | AI Video Content for Business",
  "description": "Guides on AI video production, pricing, and strategy for coaches, consultants, and growing businesses. Learn how done-for-you AI video content works and what it costs.",
  "image": "https://assurgit.com/app-icon-1024.png",
  "datePublished": "2026-01-01",
  "dateModified": "2026-01-01",
  "url": "https://assurgit.com/blog",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://assurgit.com/blog"
  },
  "author": {
    "@type": "Organization",
    "name": "Assurgit",
    "url": "https://assurgit.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Assurgit",
    "url": "https://assurgit.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://assurgit.com/app-icon-1024.png"
    }
  }
}

export default function BlogIndexPage() {
  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
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

        {/* FAQ Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <dl className="space-y-8">
            <div>
              <dt className="text-lg font-semibold text-white">How does AI video content work?</dt>
              <dd className="mt-2 text-gray-400">
                AI video platforms use your voice, face, and written scripts to generate professional videos automatically. No camera needed!
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-white">Is it hard to get started?</dt>
              <dd className="mt-2 text-gray-400">
                Most platforms offer templates and guided workflows, making it easy even for non-tech users. We'll show you how in our free call.
              </dd>
            </div>
            <div>
              <dt className="text-lg font-semibold text-white">Can I use AI video on LinkedIn?</dt>
              <dd className="mt-2 text-gray-400">
                Absolutely! In fact, LinkedIn rewards video content heavily. We'll teach you the best strategies for maximum engagement.
              </dd>
            </div>
          </dl>
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

        {/* Additional Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12">
          <h3 className="text-xl font-bold text-white mb-6">Why Choose AI Video Content?</h3>
          <ul className="list-disc list-inside space-y-4 text-gray-400">
            <li>Consistent branding across all your videos</li>
            <li>No need for expensive equipment or camera crews</li>
            <li>Scalable content production that grows with your business</li>
            <li>Better engagement rates than static images</li>
            <li>Easier to repurpose content across multiple platforms</li>
          </ul>
        </div>

      </main>

      <Footer />
    </div>
    </>
  );
}
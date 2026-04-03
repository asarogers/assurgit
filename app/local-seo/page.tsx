import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Local SEO for Small Businesses — $200/month | Assurgit",
  description:
    "We build your website, fix your Google Business Profile, get you listed on 40+ directories, and set up proper indexing — everything Google needs to trust and rank your business. $200/month, no contracts.",
  openGraph: {
    title: "Local SEO for Small Businesses — $200/month",
    description:
      "Most small businesses are missing 30–50 directory listings, have the wrong GBP category, and have site-level penalties they don't know about. We fix all of it for $200/month.",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Local SEO & Website for Small Businesses",
  "provider": { "@type": "Organization", "name": "Assurgit", "url": "https://assurgit.com" },
  "description": "Done-for-you local SEO service for small businesses. Custom website, Google Business Profile optimization, 40+ directory citations, service and location pages, schema markup, and full indexing setup.",
  "offers": { "@type": "Offer", "price": "200", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What do you actually deliver for $200/month?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We build a custom, fast website (PageSpeed 100/100), write and publish service pages and location pages targeting your keywords, set up and fully optimize your Google Business Profile, get you listed on 40+ key directories, add proper schema markup, and set up indexing across Google, Bing, and AI search engines. Everything is done for you — you own all of it, no contracts.",
      },
    },
    {
      "@type": "Question",
      "name": "What is a citation gap and why does it matter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google cross-references your business across 40+ directories — Yelp, Apple Maps, BBB, Data Axle, and many others. If you're only listed on a few, Google doesn't trust that your business is established. Most small businesses are missing 30–50 of these listings. Fixing this alone can move rankings significantly.",
      },
    },
    {
      "@type": "Question",
      "name": "How is this different from other SEO agencies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most agencies at $200/month send you a report. We build the whole stack: website, citations, GBP, schema, content, and indexing. We've done this for real clients — one ranked #2 nationally for their primary keyword within 30 days. Another grew 50% in their first week. We fix what's actually broken, not just what's visible on the surface.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the free directory audit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Send us your business name and city and we'll pull a report showing every directory you're not listed on, your current citation score, and the most common site-level issues on your current website — things like missing SSL, duplicate page titles, no schema markup, and unindexed pages. No pitch, no call required. Takes about 20 minutes.",
      },
    },
    {
      "@type": "Question",
      "name": "Do I need to already have a website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. If you don't have a site, we build one. If you do, we'll audit it for penalties and fix them. Either way, the goal is the same: a fast, properly structured site that Google and AI search engines can crawl, understand, and rank.",
      },
    },
  ],
};

const layers = [
  {
    num: "1",
    title: "Directory listings",
    body: "Google cross-references your business across 40+ directories — Yelp, Apple Maps, BBB, Data Axle, and a bunch you've never heard of. Most small businesses are listed on 3 of them. That citation gap is usually the first reason nothing ranks.",
  },
  {
    num: "2",
    title: "Google Business Profile",
    body: "Most GBPs have the wrong primary category. One wrong selection can drop you from the top 3 to rank #50. Same business. Same reviews. Wrong box checked. We research your competitors, pick the right category, add 7 secondaries, and list 40 services.",
  },
  {
    num: "3",
    title: "Service pages + location pages",
    body: "If you offer 5 services across 3 cities, you need pages for each combination — not one homepage that mentions all of them. Google ranks pages, not businesses. One generic homepage is not enough.",
  },
  {
    num: "4",
    title: "Indexing — Google, Bing, and AI search",
    body: "You can have a perfectly built site and it still won't rank if it's not properly indexed. Most small business sites have pages Google has never seen. And almost none are set up for AI search — ChatGPT, Perplexity, and Siri pull from Bing's index and structured data. If you're not there, you don't exist to them either.",
  },
  {
    num: "5",
    title: "Site-level penalties most owners don't know about",
    body: "These are invisible in a browser but Google sees all of them.",
    penalties: [
      "No SSL → active ranking penalty, most owners don't know it's off",
      "Duplicate page titles and meta descriptions → Google discounts the whole site",
      "No canonical URLs → you're competing against yourself",
      "Missing schema markup → Google and AI engines can't understand what your business is, who it serves, or where it operates",
      "Dynamic URLs generating duplicate pages → silent penalty running in the background",
    ],
  },
];

const included = [
  "Custom website — Next.js, PageSpeed 100/100, mobile-first",
  "Service pages for every service you offer",
  "Location pages for every city you serve",
  "Google Business Profile — right categories, 40 services listed, GBP posts",
  "Listed on 40+ directories (citations built and maintained)",
  "Schema markup on every page (LocalBusiness JSON-LD)",
  "Google Search Console + Bing Webmaster Tools setup",
  "AI search indexing — ChatGPT, Perplexity, Siri, Apple Maps",
  "Competitor gap analysis + Local Falcon grid scan",
  "Blog content targeting your customers' actual search questions",
  "Ongoing rank tracking and maintenance",
  "You own everything — no lock-in, no contracts",
];

export default function LocalSEOPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      <main className="pt-24 pb-20">

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-16">
          <div className="inline-flex items-center gap-2 bg-rose-600/20 text-rose-600 dark:text-rose-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-rose-500/30 mb-6">
            Local SEO for Small Businesses
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
            Get found on Google.{" "}
            <span className="text-rose-600 dark:text-rose-400">We build your entire local search presence.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Website, Google Business Profile, 40+ directory listings, schema markup, and full indexing across Google and AI search — all done for you. $200/month. No contracts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
            >
              Get Your Free Directory Audit
            </Link>
            <Link
              href="/pricing"
              className="border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              See Full Pricing
            </Link>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { stat: "$200/mo", label: "Full stack — website, citations, GBP, schema, indexing" },
              { stat: "40+", label: "Directories we get you listed on" },
              { stat: "No contracts", label: "Month-to-month. You own everything." },
            ].map((item) => (
              <div key={item.stat} className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                <p className="text-rose-600 dark:text-rose-400 font-black text-2xl mb-1">{item.stat}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Problem */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 sm:p-10">
            <p className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-widest font-semibold mb-4">The actual problem</p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4 leading-snug">
              Google isn&apos;t reading your website and deciding if you&apos;re good.
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
              It&apos;s asking one question: <span className="text-gray-900 dark:text-white font-semibold">&ldquo;Is this business real and trusted in this location?&rdquo;</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The answer comes from a stack of signals — and most small business websites fail multiple layers at once. Most agencies at $200/month send you a report. We fix the stack.
            </p>
          </div>
        </section>

        {/* Layers */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white text-center mb-10">
            The 5 layers most small businesses are missing
          </h2>
          <div className="space-y-4">
            {layers.map((layer) => (
              <div key={layer.num} className="flex items-start gap-5 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <span className="text-rose-600 dark:text-rose-400 font-black text-xl leading-none mt-0.5 w-6 flex-shrink-0">
                  {layer.num}
                </span>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-semibold mb-2">{layer.title}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{layer.body}</p>
                  {layer.penalties && (
                    <ul className="mt-3 space-y-2">
                      {layer.penalties.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-rose-500 mt-0.5 flex-shrink-0">→</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Proof */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white text-center mb-8">
            What this looks like in practice
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
              <p className="text-rose-600 dark:text-rose-400 font-black text-sm uppercase tracking-widest mb-3">Client: WellPreparedLife</p>
              <p className="text-gray-900 dark:text-white font-semibold mb-2">50% business growth in the first week</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Bay Area meal prep and kitchen coaching for seniors. When we started: 0 directory listings, wrong GBP category, no service pages, nothing indexed. We built the full stack. Within the first week of going live, the business grew 50%.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
              <p className="text-rose-600 dark:text-rose-400 font-black text-sm uppercase tracking-widest mb-3">Client: Same Day Handyman OKC</p>
              <p className="text-gray-900 dark:text-white font-semibold mb-2">Ranked #2 nationally for primary keyword in 30 days</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Oklahoma City handyman business. Wrong primary GBP category (was &ldquo;Remodeler,&rdquo; should have been &ldquo;Handyman&rdquo;), 0 directory listings, no location pages. Fixed the foundation — ranking #2 for &ldquo;same day handyman&rdquo; nationally within 30 days.
              </p>
            </div>
          </div>
          <div className="mt-6 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic">
              &ldquo;Went through this with a client recently. They were paying $300/month for &lsquo;SEO&rsquo; and nothing was happening. When we looked under the hood: 40+ missing directory listings, wrong GBP category, no SSL, duplicate titles across half the site, zero schema, a third of their pages unindexed. We fixed just the foundation and they started showing up within weeks.&rdquo;
            </p>
            <p className="text-gray-500 text-xs mt-3">— Asa Rogers, Founder of Assurgit</p>
          </div>
        </section>

        {/* What's included */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white text-center mb-8">
            Everything included at $200/month
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {included.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Free audit CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-gray-100 dark:bg-gray-900 border border-rose-500/30 rounded-2xl p-8 sm:p-10">
            <p className="text-rose-600 dark:text-rose-400 font-black text-sm uppercase tracking-widest mb-3">Free first step</p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4">
              We&apos;ll send you every directory you&apos;re missing — free
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-xl">
              Send us your business name and city. We&apos;ll pull a report of every directory you&apos;re not listed on, your current citation score, and the most common site-level issues on your current website. No pitch. No call required. Takes us about 20 minutes.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              If you want it all handled after that — $200/month. No contracts. You own everything.
            </p>
            <Link
              href="/book"
              className="inline-block bg-rose-600 hover:bg-rose-500 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
            >
              Get My Free Directory Audit
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((q, i) => (
              <details key={i} className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl group">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <span className="text-gray-900 dark:text-white font-medium text-sm">{q.name}</span>
                  <svg
                    className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Add-on upsell */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center">
            <p className="text-gray-500 text-sm uppercase tracking-widest font-semibold mb-3">Optional add-on</p>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-3">
              Want to grow even faster? Add AI video content.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-lg mx-auto mb-6">
              We clone your face and voice from a 30-minute setup call, write research-backed scripts every week, and publish 5 videos to Instagram, TikTok, LinkedIn, and YouTube — automatically. This is what drove 50% growth for WellPreparedLife in their first week.
            </p>
            <Link
              href="/pricing"
              className="inline-block border border-rose-500/50 text-rose-600 dark:text-rose-400 hover:bg-rose-600/10 font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
            >
              See Video Content Plans — from $397/mo
            </Link>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Related:</span>
            <Link href="/for/handyman-contractors" className="text-rose-600 dark:text-rose-400 hover:underline">Handyman & Contractors</Link>
            <Link href="/for/real-estate-agents" className="text-rose-600 dark:text-rose-400 hover:underline">Real Estate Agents</Link>
            <Link href="/for/consultants" className="text-rose-600 dark:text-rose-400 hover:underline">Consultants</Link>
            <Link href="/pricing" className="text-rose-600 dark:text-rose-400 hover:underline">Full Pricing</Link>
            <Link href="/" className="text-rose-600 dark:text-rose-400 hover:underline">← Back to Assurgit</Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

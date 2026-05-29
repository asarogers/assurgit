import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import CTASection from "@/components/marketing/CTASection";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Best Small Business Website Builder in 2026 — Wix vs Squarespace vs GoDaddy vs Done-For-You",
  description:
    "An honest 2026 comparison of Wix, Squarespace, GoDaddy, custom-coded, and done-for-you small business website builders. What each one actually costs, what your phone does after launch, and when DIY breaks down.",
  openGraph: {
    url: "https://assurgit.com/best/small-business-website-builder",
    title: "Best Small Business Website Builder in 2026 — Honest Comparison",
    description:
      "Wix vs Squarespace vs GoDaddy vs custom vs done-for-you. What you'll actually pay, build, and rank for.",
    type: "article",
    images: [{ url: "https://assurgit.com/opengraph-image.png", width: 1024, height: 1024, alt: "Assurgit" }],
  },
  alternates: { canonical: "https://assurgit.com/best/small-business-website-builder" },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Best Small Business Website Builder 2026",
  "description": "Ranked comparison of Wix, Squarespace, GoDaddy, custom-coded, and done-for-you website builders for small service businesses.",
  "numberOfItems": 5,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Assurgit (done-for-you)", "url": "https://assurgit.com", "description": "Custom site, GBP, and ongoing local SEO from $189/month. Page-1-in-90-days guarantee." },
    { "@type": "ListItem", "position": 2, "name": "Wix", "url": "https://wix.com", "description": "DIY drag-and-drop builder. $17–$59/month. Slow load times, weak local SEO out of the box." },
    { "@type": "ListItem", "position": 3, "name": "Squarespace", "url": "https://squarespace.com", "description": "DIY template builder, design-led. $16–$49/month. Limited SEO controls, no GBP integration." },
    { "@type": "ListItem", "position": 4, "name": "GoDaddy Website Builder", "url": "https://godaddy.com", "description": "Cheapest DIY tier. $9.99–$24.99/month. Slow loads, generic SEO, hard to migrate off." },
    { "@type": "ListItem", "position": 5, "name": "Custom-coded (freelancer)", "url": "https://upwork.com", "description": "Hand-built site, $1,500–$4,000 one-time. No ongoing SEO unless you pay separately." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What's the best small business website builder for getting found on Google?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "None of the DIY builders (Wix, Squarespace, GoDaddy) are optimized for local Google ranking out of the box — they ship slow CSS, weak schema markup, and no GBP integration. If your goal is to rank for '[service] near me' searches, a done-for-you service that handles the website, Google Business Profile, citations, and ongoing SEO together (like Assurgit) outperforms any DIY option in 60–90 days.",
      },
    },
    {
      "@type": "Question",
      "name": "Is Wix or Squarespace better for SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Squarespace has slightly cleaner technical SEO out of the box (better default schema markup, faster load times). Wix has a more flexible drag-and-drop editor but ships heavier code. Neither handles Google Business Profile, local citations, or review automation — which together account for 70%+ of local rankings.",
      },
    },
    {
      "@type": "Question",
      "name": "What's the cheapest way to build a small business website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GoDaddy at $9.99/month is the cheapest first-year option. But cheapest ≠ best ROI. If your business depends on local search traffic, a $200/year Wix subscription that doesn't rank is more expensive than a $189/month service that does — because the cheap option costs you the leads.",
      },
    },
    {
      "@type": "Question",
      "name": "How long does it take to build a small business website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DIY: 3 days to 3 months, depending on your patience. Most owners abandon halfway. Freelancer: 4–8 weeks. Done-for-you services like Assurgit: live in 1–2 weeks, with the Google Business Profile claimed and tracking installed before you go live.",
      },
    },
    {
      "@type": "Question",
      "name": "Can I switch from Wix or Squarespace later?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but it's painful. Wix and Squarespace make it deliberately hard to export — you can't directly download HTML/CSS, and your URL structure is tied to their domain conventions. Migrating typically requires rebuilding from scratch and setting up 301 redirects to preserve any ranking you had. Most owners migrate after the first year of frustration.",
      },
    },
  ],
};

const options = [
  {
    rank: 1,
    name: "Assurgit (done-for-you)",
    tagline: "Built, ranked, and supported — month-to-month",
    price: "From $189/mo + $97 setup",
    yearOne: "$2,268",
    pros: [
      "Custom site live in 1–2 weeks",
      "Google Business Profile set up correctly the first time",
      "Ongoing local SEO + citations + review automation",
      "Page-1-in-90-days guarantee in writing",
      "You own the code, content, and domain — day one",
    ],
    cons: [
      "Subscription, not one-time (but compounds, see math below)",
      "3-month initial term on Growth/Scale tiers",
    ],
    bestFor: "Service businesses that need to show up on Google for local searches and don't have time to learn SEO themselves.",
    href: "/pricing",
    cta: "See pricing",
    highlight: true,
  },
  {
    rank: 2,
    name: "Squarespace",
    tagline: "Design-led DIY builder",
    price: "$16–$49/mo + your time",
    yearOne: "~$200 + 60+ hours",
    pros: [
      "Cleaner technical SEO than Wix or GoDaddy",
      "Beautiful templates out of the box",
      "Decent for a portfolio or brochure site",
    ],
    cons: [
      "No Google Business Profile integration",
      "No local citations, no review automation",
      "Slower loads than custom code → Google penalizes",
      "You're the support team",
    ],
    bestFor: "Designers, photographers, and businesses that don't depend on local search.",
    href: "https://squarespace.com",
    cta: "Visit Squarespace",
    external: true,
  },
  {
    rank: 3,
    name: "Wix",
    tagline: "Drag-and-drop, most flexible DIY",
    price: "$17–$59/mo + your time",
    yearOne: "~$300 + 60+ hours",
    pros: [
      "Most flexible drag-and-drop editor",
      "Built-in app marketplace",
      "Cheapest to start",
    ],
    cons: [
      "Notoriously slow load times — Google's mobile algorithm penalizes",
      "Locked into Wix domain conventions",
      "Hard to migrate later",
      "No real local SEO out of the box",
    ],
    bestFor: "Hobby sites, side hustles, or businesses without local-search dependence.",
    href: "https://wix.com",
    cta: "Visit Wix",
    external: true,
  },
  {
    rank: 4,
    name: "GoDaddy Website Builder",
    tagline: "Cheapest DIY tier",
    price: "$9.99–$24.99/mo",
    yearOne: "~$120 + your time",
    pros: [
      "Cheapest first-year cost",
      "Bundled with domain",
      "Simple for a 1-page site",
    ],
    cons: [
      "Slow page loads",
      "Generic templates that look like every other GoDaddy site",
      "Weak SEO controls",
      "Hardest to migrate off — domain held hostage if you cancel",
    ],
    bestFor: "Owners who need a placeholder page and nothing more.",
    href: "https://godaddy.com",
    cta: "Visit GoDaddy",
    external: true,
  },
  {
    rank: 5,
    name: "Custom-coded (freelancer or agency)",
    tagline: "Hand-built one-time project",
    price: "$1,500–$4,000 one-time",
    yearOne: "$1,500–$4,000",
    pros: [
      "Fully custom design",
      "Can be optimized for performance",
      "No platform lock-in",
    ],
    cons: [
      "No ongoing SEO unless you pay separately ($1,500+/mo)",
      "Freelancers ghost — most disappear after the deposit",
      "No Google Business Profile work included",
      "When something breaks, you're paying hourly to fix it",
    ],
    bestFor: "Established businesses that already rank well and just need a brand refresh.",
    href: "https://upwork.com",
    cta: "Find a freelancer",
    external: true,
  },
];


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://assurgit.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Best",
      "item": "https://assurgit.com/best"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Small Business Website Builder",
      "item": "https://assurgit.com/best/small-business-website-builder"
    }
  ]
};

export default function Page() {
  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main>
        {/* Hero */}
        <section className="bg-gray-950 pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563eb] mb-5">
              Honest comparison &middot; Updated 2026
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 tracking-tight leading-[1.05]">
              Best small business website builder
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                for actually getting found on Google.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              You don&rsquo;t need a beautiful website. You need a website that <span className="text-white font-bold">makes the phone ring</span>. Here&rsquo;s how Wix, Squarespace, GoDaddy, custom-coded, and done-for-you actually compare for the only thing that matters: local search traffic.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/tools/seo-audit"
                className="inline-block bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 glow-blue-btn"
              >
                Run a free audit on your site &rarr;
              </Link>
              <Link
                href="/book"
                className="inline-block border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all"
              >
                Or get a free homepage mockup &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* The TL;DR — buyer signal: avoid complex platforms unless enjoy tinkering */}
        <section className="bg-white dark:bg-gray-950 py-12 border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#2563eb] mb-3">TL;DR</h2>
            <p className="text-lg sm:text-xl text-gray-900 dark:text-white leading-relaxed mb-4">
              <span className="font-bold">If you&rsquo;re a service business depending on local search</span> &mdash; plumber, salon, therapist, contractor, anyone whose customers find them on Google &mdash; <span className="font-bold">DIY website builders are the wrong tool.</span>
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Wix, Squarespace, and GoDaddy are platforms. Local rankings are a system. The site is one part. The Google Business Profile, the citations, the review velocity, the schema markup, the technical SEO &mdash; that&rsquo;s the system. DIY builders ship the platform and leave you to figure out the system.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
              That&rsquo;s why most service businesses on Wix or Squarespace are on page 3 of Google.
            </p>
          </div>
        </section>

        {/* Ranked comparison */}
        <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 dark:text-white text-center mb-12 tracking-tight">
              Ranked: best to worst for local search.
            </h2>

            <div className="space-y-6">
              {options.map((opt) => (
                <div
                  key={opt.rank}
                  className={`rounded-2xl p-6 sm:p-8 border-2 ${
                    opt.highlight
                      ? "border-emerald-400 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/30"
                      : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${
                      opt.highlight ? "bg-emerald-500 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}>
                      #{opt.rank}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-black text-gray-950 dark:text-white">{opt.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{opt.tagline}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="font-bold text-gray-900 dark:text-white">{opt.price}</span>
                        <span className="text-gray-400">&middot;</span>
                        <span className="text-gray-600 dark:text-gray-400">Year 1: <span className="font-bold text-gray-900 dark:text-white">{opt.yearOne}</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">What you get</p>
                      <ul className="space-y-1.5">
                        {opt.pros.map((p) => (
                          <li key={p} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                            <span className="text-emerald-600 dark:text-emerald-400 flex-shrink-0">+</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400 mb-2">What you don&rsquo;t</p>
                      <ul className="space-y-1.5">
                        {opt.cons.map((c) => (
                          <li key={c} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                            <span className="text-red-600 dark:text-red-400 flex-shrink-0">&minus;</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                      <span className="font-bold not-italic">Best for:</span> {opt.bestFor}
                    </p>
                    {opt.external ? (
                      <a
                        href={opt.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm font-semibold text-[#2563eb] dark:text-blue-400 hover:underline whitespace-nowrap"
                      >
                        {opt.cta} &rarr;
                      </a>
                    ) : (
                      <Link
                        href={opt.href}
                        className={`inline-block text-sm font-bold px-5 py-2 rounded-lg whitespace-nowrap transition-colors ${
                          opt.highlight
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-gray-900 hover:bg-gray-800 text-white"
                        }`}
                      >
                        {opt.cta} &rarr;
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When DIY breaks down */}
        <section className="bg-white dark:bg-gray-950 py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 dark:text-white mb-8 tracking-tight">
              The Stage 3 exit moment: when DIY runs out.
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                Almost every service business owner we talk to has tried at least one DIY builder. The pattern is consistent:
              </p>
              <ol className="space-y-4 list-decimal list-inside text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                <li><span className="font-bold text-gray-900 dark:text-white">Day 1:</span> &ldquo;This looks easy. I&rsquo;ll have it done by Sunday.&rdquo;</li>
                <li><span className="font-bold text-gray-900 dark:text-white">Day 3:</span> Stuck on the contact form. Watching YouTube tutorials. Frustrated.</li>
                <li><span className="font-bold text-gray-900 dark:text-white">Day 7:</span> Site is &ldquo;done&rdquo; but doesn&rsquo;t look right on phones. The fonts are weird. The booking integration broke.</li>
                <li><span className="font-bold text-gray-900 dark:text-white">Day 30:</span> Site is up. Phone isn&rsquo;t ringing. You realize Google doesn&rsquo;t know you exist.</li>
                <li><span className="font-bold text-gray-900 dark:text-white">Day 60:</span> You start searching for &ldquo;why is my Wix site not ranking.&rdquo; That&rsquo;s how you found this page.</li>
              </ol>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                If any of that sounds familiar, you&rsquo;re at what we call <span className="font-bold text-gray-900 dark:text-white">the Stage 3 exit moment</span> &mdash; the point where DIY has failed and you&rsquo;re ready to pay someone to make this stop.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The honest truth: a $189/mo done-for-you service that handles the site, the GBP, the SEO, and the reviews is going to outperform any DIY builder for a service business in the Bay Area. <span className="font-bold text-gray-900 dark:text-white">Not because the DIY tools are bad.</span> Because the system around them &mdash; the part that actually drives local rankings &mdash; isn&rsquo;t something a tool can do for you.
              </p>
            </div>

            <div className="mt-10 rounded-2xl border-2 border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3">Real result &middot; Bay Area client</p>
              <p className="text-xl font-black text-emerald-900 dark:text-emerald-200 leading-tight mb-2">
                Well Prepped Life: no website, 2 word-of-mouth clients &rarr; 1 new client + 2 phone calls in 30 days, from the site alone.
              </p>
              <p className="text-sm text-emerald-800/80 dark:text-emerald-400/80">
                Mountain View, in-home meal prep. We built the site, set up the Google Business Profile, ran the local SEO. No paid ads.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 dark:text-white text-center mb-10 tracking-tight">
              Common questions
            </h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((q, i) => (
                <details key={i} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 group">
                  <summary className="text-base sm:text-lg font-bold text-gray-950 dark:text-white cursor-pointer list-none flex items-start justify-between gap-4">
                    {q.name}
                    <span className="text-[#2563eb] flex-shrink-0 transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                  </summary>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                    {q.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}

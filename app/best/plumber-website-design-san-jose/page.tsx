import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import CTASection from "@/components/marketing/CTASection";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Plumber Website Design San Jose — Done-For-You Sites That Get You Calls",
  description:
    "Plumber-specific website design + Google Business Profile + local SEO for San Jose plumbing companies. From $189/mo. Page 1 in 90 days or your fourth month is free. Booking integration with Booksy, Square, and Cal.com.",
  openGraph: {
    url: "https://assurgit.com/best/plumber-website-design-san-jose",
    title: "Plumber Website Design San Jose — Sites That Get You Calls",
    description:
      "Done-for-you websites + GBP + local SEO for San Jose plumbers. Page 1 in 90 days or your fourth month is free.",
    type: "article",
    images: [{ url: "https://assurgit.com/opengraph-image.png", width: 1024, height: 1024, alt: "Assurgit" }],
  },
  alternates: { canonical: "https://assurgit.com/best/plumber-website-design-san-jose" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Assurgit — Plumber Website Design San Jose",
  "url": "https://assurgit.com/best/plumber-website-design-san-jose",
  "description": "Done-for-you website design, Google Business Profile management, and local SEO for plumbing companies in San Jose and the Bay Area.",
  "areaServed": {
    "@type": "City",
    "name": "San Jose",
    "containedInPlace": { "@type": "State", "name": "California" }
  },
  "audience": { "@type": "Audience", "audienceType": "Plumbing companies and emergency plumbers" },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "189",
    "highPrice": "649",
    "priceCurrency": "USD",
    "offerCount": "3"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a plumber website cost in San Jose?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "San Jose plumber websites typically range from $1,500-$4,000 one-time (agency or freelancer) or $9-$59/month for a DIY platform. A done-for-you service like Assurgit, which includes the website, Google Business Profile management, and ongoing local SEO, starts at $189/month with a $97 setup deposit. The done-for-you path is usually cheaper than agency builds in year one ($2,268 vs $3,000+) and dramatically more effective for getting calls because it includes the SEO work that DIY and one-time builds skip.",
      },
    },
    {
      "@type": "Question",
      "name": "How long does it take to rank a plumber website on Google in San Jose?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Realistic timeline: emergency-keyword phrases (like 'emergency plumber San Jose') can hit page 1 in 60-90 days with proper Google Business Profile setup, citations, and review velocity. Broader head terms ('plumber San Jose') take 4-9 months in competitive markets. We guarantee top-5-keyword page 1 ranking within 90 days or your fourth month is free.",
      },
    },
    {
      "@type": "Question",
      "name": "What's the most important thing for a plumber website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Three things: (1) click-to-call phone number visible on every page above the fold — emergency callers won't fill out a form; (2) a properly set up Google Business Profile that shows up in the Maps 3-pack for 'plumber near me'; (3) service-area pages for the specific cities you cover (San Jose, Santa Clara, Sunnyvale, Cupertino, etc). Design barely matters compared to these three.",
      },
    },
    {
      "@type": "Question",
      "name": "Should plumbers use Wix or Squarespace?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Neither, if you depend on emergency search traffic. Wix and Squarespace ship slow page loads and weak local SEO out of the box. Plumber search is hyper-local — someone with a flooded basement is searching 'emergency plumber [neighborhood]' on their phone at 11pm. They need a fast page, a clickable phone number, and a Google Maps result. DIY builders aren't optimized for any of those.",
      },
    },
    {
      "@type": "Question",
      "name": "Do you integrate with my booking software (Booksy, Square, Service Titan)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We integrate with Booksy, Square Booking, Cal.com, GlossGenius, Service Titan, and Housecall Pro. The booking flow is one of the most-broken parts of typical plumber sites — we make sure customers can request a service call in 2 taps from any page.",
      },
    },
  ],
};

const featureRows = [
  {
    feature: "Click-to-call on every page (emergency-first)",
    why: "Half your San Jose customers are calling at 11pm with a burst pipe. They're not filling out a form.",
  },
  {
    feature: "Google Business Profile setup or repair",
    why: "70%+ of plumber leads come through the Maps 3-pack. If your GBP is misconfigured or suspended, your phone is silent.",
  },
  {
    feature: "Service-area pages for every city you serve",
    why: "Each Bay Area city has its own ranking. A page for San Jose, another for Santa Clara, another for Sunnyvale — that's how you show up locally.",
  },
  {
    feature: "Schema markup (LocalBusiness + Plumber)",
    why: "Google needs to know you're a plumber, your hours, your service area, your reviews. Schema is how you tell it.",
  },
  {
    feature: "Booking integration (Booksy / Square / Service Titan / Housecall Pro)",
    why: "Customers book in 2 taps. You don't lose the lead to your competitor's website while they're choosing.",
  },
  {
    feature: "Review automation + bad-review response drafting",
    why: "More recent reviews = higher rank in Maps. We automate the request and draft responses to bad reviews same-day.",
  },
  {
    feature: "Live ranking dashboard",
    why: "You see the keywords moving, the calls coming in, the reviews arriving. No fake monthly PDF reports.",
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
      "name": "Plumber Website Design San Jose",
      "item": "https://assurgit.com/best/plumber-website-design-san-jose"
    }
  ]
};

export default function Page() {
  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main>
        {/* Hero */}
        <section className="bg-gray-950 pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563eb] mb-5">
              For San Jose plumbers &middot; Bay Area service area
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 tracking-tight leading-[1.05]">
              Plumber website design that
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                makes the phone ring at 11pm.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-3 leading-relaxed">
              Done-for-you websites + Google Business Profile + local SEO for San Jose plumbing companies. From <span className="text-white font-bold">$189/month</span>. Live in 1&ndash;2 weeks.
            </p>
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 mb-8">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">
                Page 1 in 90 days &mdash; or your fourth month is free
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/tools/seo-audit"
                className="inline-block bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 glow-blue-btn"
              >
                Audit my plumber site &rarr;
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

        {/* Buyer pain — what's broken on most plumber sites */}
        <section className="bg-white dark:bg-gray-950 py-16 md:py-20 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[#2563eb] mb-3">
              The honest read
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 dark:text-white mb-6 tracking-tight">
              Most San Jose plumber websites are broken in the same three ways.
            </h2>
            <ol className="space-y-5 text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 font-black flex items-center justify-center text-sm">1</span>
                <span>
                  <span className="font-bold text-gray-900 dark:text-white">The Google Business Profile is wrong or suspended.</span> Categories are misconfigured (often listed as &ldquo;Internet marketing service&rdquo; instead of &ldquo;Plumber&rdquo;). The service area is empty. There&rsquo;s a stock photo and 3 reviews from 2019.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 font-black flex items-center justify-center text-sm">2</span>
                <span>
                  <span className="font-bold text-gray-900 dark:text-white">The site loads in 4&ndash;6 seconds on mobile.</span> Wix or Squarespace defaults. Google&rsquo;s mobile algorithm penalizes slow loads. Your competitor with a 1.2-second site is outranking you because of that alone.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 font-black flex items-center justify-center text-sm">3</span>
                <span>
                  <span className="font-bold text-gray-900 dark:text-white">The phone number isn&rsquo;t click-to-call on mobile.</span> Or it&rsquo;s in a footer image. Emergency callers don&rsquo;t fill out forms &mdash; they tap a number. If yours doesn&rsquo;t dial, you lost the lead.
                </span>
              </li>
            </ol>
          </div>
        </section>

        {/* What's included — outcome-framed */}
        <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 dark:text-white text-center mb-3 tracking-tight">
              What we ship for San Jose plumbers.
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Each line is something we actually do &mdash; and what it means for your phone ringing.
            </p>

            <div className="space-y-3">
              {featureRows.map((row, i) => (
                <div key={i} className="rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2563eb]/10 dark:bg-[#2563eb]/20 border border-[#2563eb]/30 text-[#2563eb] font-black flex items-center justify-center text-sm">
                      &#10003;
                    </span>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white font-bold text-base mb-1">{row.feature}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{row.why}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing anchor */}
        <section className="bg-white dark:bg-gray-950 py-16 md:py-20 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-[#2563eb] mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 dark:text-white mb-5 tracking-tight">
              From <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">$189/month</span>. Cancel anytime after the first 3 months.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Site + GBP + local SEO + reviews + ranking dashboard. <span className="font-bold text-gray-900 dark:text-white">All included.</span> Setup deposit is $97 (Starter), $148 (Growth), $324 (Scale) &mdash; covers the build.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Starter</p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">$189<span className="text-base font-normal text-gray-500">/mo</span></p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">For solo plumbers in 1&ndash;2 cities.</p>
              </div>
              <div className="rounded-xl border-2 border-[#2563eb] bg-[#2563eb]/5 dark:bg-[#2563eb]/10 p-5 relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#2563eb] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">Most plumbers</span>
                <p className="text-xs font-bold uppercase tracking-wider text-[#2563eb] mb-1">Growth</p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">$389<span className="text-base font-normal text-gray-500">/mo</span></p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Multi-truck shops, 5&ndash;10 city service area.</p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Scale</p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">$649<span className="text-base font-normal text-gray-500">/mo</span></p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Multi-location plumbing companies.</p>
              </div>
            </div>
            <Link
              href="/pricing"
              className="inline-block text-sm font-semibold text-[#2563eb] dark:text-blue-400 underline underline-offset-4 hover:no-underline"
            >
              Full pricing details &rarr;
            </Link>
          </div>
        </section>

        {/* WPL proof */}
        <section className="bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl border-2 border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-3">Real result &middot; Bay Area client</p>
              <p className="text-xl font-black text-emerald-900 dark:text-emerald-200 leading-tight mb-2">
                Mountain View client: no website, 2 word-of-mouth clients &rarr; 1 new client + 2 phone calls in 30 days, from the site alone.
              </p>
              <p className="text-sm text-emerald-800/80 dark:text-emerald-400/80 mb-3">
                Different vertical (in-home meal prep), same playbook: site + Google Business Profile + local SEO. <span className="font-semibold">No paid ads.</span>
              </p>
              <Link href="/case-studies" className="text-emerald-700 dark:text-emerald-400 text-sm font-semibold underline underline-offset-2">
                Read the full case study &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white dark:bg-gray-950 py-16 md:py-20 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 dark:text-white text-center mb-10 tracking-tight">
              Common questions from San Jose plumbers
            </h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((q, i) => (
                <details key={i} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5 group">
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

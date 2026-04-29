import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";
import TrustBar from "@/components/marketing/TrustBar";
import WhyWeWin from "@/components/marketing/WhyWeWin";
import HowItWorks from "@/components/marketing/HowItWorks";
import WhatYouGet from "@/components/marketing/WhatYouGet";
import PricingSection from "@/components/marketing/PricingSection";
import FounderSection from "@/components/marketing/FounderSection";
import FAQSection from "@/components/marketing/FAQSection";
import CTASection from "@/components/marketing/CTASection";
import Footer from "@/components/marketing/Footer";
import MobileStickyBar from "@/components/marketing/MobileStickyBar";


export const metadata: Metadata = {
  title: "Assurgit — Done-for-you local SEO, GBP, and websites for service businesses",
  description: "A done-for-you local presence system for service businesses. Custom site, Google Business Profile management, citations, and local SEO — from $189/month. You own everything we build.",
  alternates: {
    canonical: "https://assurgit.com",
  },
  openGraph: {
    title: "Assurgit — Done-for-you local SEO for service businesses",
    description: "Get found and booked on Google. Custom site + GBP + local SEO from $189/month. You own the code, content, and profile from day one.",
    url: "https://assurgit.com",
    type: "website",
    images: [{ url: "https://assurgit.com/opengraph-image.png", width: 1024, height: 1024, alt: "Assurgit" }],
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Assurgit Local Presence System",
  "url": "https://assurgit.com",
  "serviceType": "Local SEO + Google Business Profile management + custom website",
  "description": "A done-for-you local presence system for single-location and small multi-location service businesses. Custom website, Google Business Profile management, citations, schema markup, AI-search-ready content, and ongoing local SEO. Three tiers from $189–$649/month with a one-time setup deposit.",
  "areaServed": "United States",
  "provider": {
    "@type": "Organization",
    "name": "Assurgit",
    "url": "https://assurgit.com"
  },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "189",
    "highPrice": "649",
    "priceCurrency": "USD",
    "offerCount": "3"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "38"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you guarantee a #1 ranking on Google?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No — and nobody honestly can. Google's algorithm has 50+ factors and explicitly forbids guaranteed-ranking gigs. What we guarantee is that your profile and site will be optimized correctly, which is the single biggest controllable factor in local rankings."
      }
    },
    {
      "@type": "Question",
      "name": "I already have a website. Do you have to rebuild it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — but you don't lose anything. We migrate your content into our template, set up 301 redirects so Google treats your new site as the same entity, and import your blog posts and photos. The old site comes down only when the new one verifiably matches or outranks it."
      }
    },
    {
      "@type": "Question",
      "name": "Can I cancel anytime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Starter is month-to-month from day one with 7 days notice. Growth and Scale have a 3-month initial term — because honest local SEO needs 60–90 days to register — then become month-to-month with 30 days notice. No fee, no transition charge, and you walk away with your domain, code, GBP, content, and citations."
      }
    },
    {
      "@type": "Question",
      "name": "How much is the deposit and is it refundable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "$97 Starter / $148 Growth / $324 Scale — roughly half of the first month's subscription. Non-refundable; covers build labor performed before you're billed for month one."
      }
    },
    {
      "@type": "Question",
      "name": "What happens after I cancel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Free and automatic. Site stays live until end of the billing cycle. You get a complete code + content export (zip or git push), the citations list, a GBP handoff doc, a 5-minute Loom walkthrough, and we remove our Manager access from your profile."
      }
    },
    {
      "@type": "Question",
      "name": "Do you take a commission on my leads?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Every lead is yours. We don't insert ourselves between you and your customers. There's no per-lead fee, no booking fee, and no markup on your service prices."
      }
    },
    {
      "@type": "Question",
      "name": "What if my Google Business Profile is suspended?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fixable. GBP suspension reinstatement is included free with Growth and Scale — we identify the violation, draft the appeal, gather supporting documentation, and submit it. Most reinstatements come back in 2–4 weeks."
      }
    },
    {
      "@type": "Question",
      "name": "Will my work be done by someone in the US?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The strategy, audits, monthly reports, and review responses are written by us in the US. Some content drafting is AI-assisted (we edit before publish). Citations are run by our own automation, not offshore labor at $5/hr."
      }
    },
    {
      "@type": "Question",
      "name": "Aren't most SEO agencies scams? How do I know you're not one?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A lot of them are. The pattern is vague deliverables, 6-month contracts, monthly reports padded with screenshots that don't tie to traffic, and spam-link tactics that get GBPs suspended. Three things separate us: written 5-document strategy up front, monthly reports run against live site and live Google data (no fabricated numbers), and cancel-anytime after the 3-month initial term with full export of code, content, GBP, and citations."
      }
    },
    {
      "@type": "Question",
      "name": "I've been on Wix or Squarespace for years. Will migrating tank my SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No — done right, the migration usually lifts you. We map every existing URL to its new home, set up 301 redirects so Google passes the old page's authority to the new one, and import content and photos. The old site goes dark only after the new one matches or outranks it. Most clients see a measurable lift within 60 days from technical improvements alone."
      }
    },
    {
      "@type": "Question",
      "name": "Someone is offering to fix my suspended GBP for thousands of dollars. Is that a scam?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Almost always, yes. Scrapers find suspended listings and cold-call owners offering 'fixes' for $1,500–$5,000. Don't pay them. The reinstatement process is free — you submit an appeal directly to Google with documentation. We do this as part of Growth and Scale (no extra charge), or as a one-time $499 service. Most legitimate suspensions reinstate in 2–4 weeks once the violation is corrected."
      }
    },
    {
      "@type": "Question",
      "name": "I'm currently paying another agency. Can you take over without losing my rankings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — we do this regularly. We audit your current setup, identify what's worth preserving and what's broken, build the new site in parallel, and only switch DNS once the new site matches or beats the old one. GBP transfer is a Manager-access change — every review and historical data stays. Most agency-takeover migrations take 2–3 weeks with zero ranking impact."
      }
    }
  ]
};

export const dynamic = "force-static"


export default function RootPage() {
  return (
    <>
      {/* WebSite + Organization JSON-LD live in app/layout.tsx — this page only adds page-specific schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <WhyWeWin />
        <HowItWorks />
        <WhatYouGet />
        <PricingSection />
        <FounderSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}

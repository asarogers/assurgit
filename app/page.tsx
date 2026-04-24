import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";
import TrustBar from "@/components/marketing/TrustBar";
import ProblemSection from "@/components/marketing/ProblemSection";
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
  title: "Home",
  description: "Home \u2014 learn more on our site.",
  alternates: {
    canonical: "https://assurgit.com",
  },
  openGraph: {
    title: "Home",
    description: "Home \u2014 learn more on our site.",
    url: "https://assurgit.com",
    type: "website",
    images: [{ url: "https://assurgit.com/opengraph-image.png", width: 1024, height: 1024, alt: "Assurgit" }],
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Assurgit",
  "url": "https://assurgit.com",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Assurgit is a done-for-you AI video content service. Your AI avatar and voice clone produce 5 research-backed videos every week, auto-published to Instagram, TikTok, LinkedIn, and YouTube. Starting at $397/month.",
  "featureList": "AI avatar creation, voice cloning, research-backed scripting, human QC, auto-publishing to Instagram, TikTok, LinkedIn, and YouTube",
  "screenshot": "https://assurgit.com/screenshot.png",
  "author": {
    "@type": "Person",
    "name": "Asa Rogers"
  },
  "dateModified": "2026-04-01",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "397",
    "highPrice": "1997",
    "priceCurrency": "USD",
    "offerCount": "3"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "38"
  },
  "provider": {
    "@type": "Organization",
    "name": "Assurgit",
    "url": "https://assurgit.com"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is it really my face and voice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We build an avatar clone from a short video recording and a voice clone from a 1–2 minute audio sample. Every video uses your actual appearance and voice — not a stock avatar or generic AI voice."
      }
    },
    {
      "@type": "Question",
      "name": "Will the videos look professional?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Every video goes through human QC before it's published or delivered. We review for rendering quality, caption accuracy, branding, and format specs. If something looks off, we fix it before it goes live."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to film anything after setup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "After the initial 30-minute setup call and recording, no. The system runs on autopilot. You approve scripts (or skip approval — it's optional) and we handle everything else: rendering, QC, scheduling, publishing."
      }
    },
    {
      "@type": "Question",
      "name": "What does the $397/month Launch plan include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Launch plan at $397/month includes your personal AI avatar, voice clone, short-form videos every week with research-backed scripts, human QC on every video, and MP4 delivery to one platform. Auto-publishing to all 4 platforms is available on the Starter plan at $997/month."
      }
    },
    {
      "@type": "Question",
      "name": "What platforms do you publish to?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Starter and Growth plans auto-publish to Instagram, TikTok, LinkedIn, and YouTube. The Launch plan delivers MP4 files via email for manual posting."
      }
    },
    {
      "@type": "Question",
      "name": "How long does setup take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your avatar and voice clone are ready within 48–72 hours of the setup call. Your first batch of videos goes live the Monday after setup is complete."
      }
    },
    {
      "@type": "Question",
      "name": "Can I approve content before it goes live?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Every Monday, you receive 5 scripts by email with a 48-hour review window. Approve as-is, request one round of revisions, or skip review entirely — your choice. The system is built to run with or without your input."
      }
    },
    {
      "@type": "Question",
      "name": "What if I want to cancel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Month-to-month. No contracts, no cancellation fees, no awkward conversations. We'd rather earn your business every month than lock you in."
      }
    }
  ]
};

export const dynamic = "force-static"


const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Assurgit",
  "url": "https://assurgit.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://assurgit.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export default function RootPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
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
        <ProblemSection />
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

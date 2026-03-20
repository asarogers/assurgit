import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";
import TrustBar from "@/components/marketing/TrustBar";
import ProblemSection from "@/components/marketing/ProblemSection";
import HowItWorks from "@/components/marketing/HowItWorks";
import WhatYouGet from "@/components/marketing/WhatYouGet";
import PricingSection from "@/components/marketing/PricingSection";
import FAQSection from "@/components/marketing/FAQSection";
import CTASection from "@/components/marketing/CTASection";
import Footer from "@/components/marketing/Footer";

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Assurgit",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Assurgit creates 7 fully branded AI videos per week for your business using your personal avatar and voice clone. The research pipeline monitors your competitive landscape, writes platform-optimized scripts, renders videos, and publishes to Instagram, TikTok, LinkedIn, and YouTube on autopilot.",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "1997",
    "highPrice": "5997",
    "priceCurrency": "USD",
    "offerCount": "3"
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
      "name": "What platforms do you publish to?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Growth and Scale plans: Instagram, TikTok, LinkedIn, and YouTube. Starter plan delivers MP4 files via email for you to post manually or through your own scheduler."
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

export default function RootPage() {
  return (
    <>
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
        <HowItWorks />
        <WhatYouGet />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

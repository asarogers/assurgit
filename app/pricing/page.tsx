import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import PricingPlans from "@/components/marketing/PricingPlans";
import FAQSection from "@/components/marketing/FAQSection";
import AuditGuaranteeCTA from "@/components/marketing/AuditGuaranteeCTA";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Pricing — Local SEO + GBP + Websites from $189/Month",
  description:
    "Done-for-you local presence: custom site, Google Business Profile, and local SEO. Three tiers from $189/month. One-time deposit. You own everything we build.",
  alternates: {
    canonical: "https://assurgit.com/pricing",
  },
  openGraph: {
    url: "https://assurgit.com/pricing",
    title: "Pricing — Assurgit",
    description: "Three tiers from $189/month. One-time deposit. You own everything.",
    images: [
      {
        url: "https://assurgit.com/opengraph-image.png",
        width: 1024,
        height: 1024,
        alt: "Assurgit",
      },
    ],
  },
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-zinc-950 pt-24">
        <PricingPlans variant="public" />
        <FAQSection />
        <AuditGuaranteeCTA />
      </main>
      <Footer />
    </>
  );
}

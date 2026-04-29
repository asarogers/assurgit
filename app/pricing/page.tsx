import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import PricingSection from "@/components/marketing/PricingSection";
import FAQSection from "@/components/marketing/FAQSection";
import CTASection from "@/components/marketing/CTASection";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  openGraph: {
  url: "https://assurgit.com/pricing",
  images: [{ url: "https://assurgit.com/opengraph-image.png", width: 1024, height: 1024, alt: "Assurgit" }],
  },
  title: "Pricing — Local SEO + GBP + Websites from $189/Month",
  description:
    "Done-for-you local presence: custom site, Google Business Profile, and local SEO. Three tiers from $189/month. One-time deposit. You own everything we build.",
  alternates: {
    canonical: 'https://assurgit.com/pricing',
  },
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page hero */}
        <section className="bg-gray-950 pt-32 pb-16 md:pt-40 md:pb-20 text-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563eb] mb-5">
              Pricing
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 tracking-tight">
              Three tiers. One done-for-you stack.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Custom site + Google Business Profile + local SEO from $189/month.
              <br />
              One-time deposit. Month-to-month after the initial term. You own everything.
            </p>
          </div>
        </section>

        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

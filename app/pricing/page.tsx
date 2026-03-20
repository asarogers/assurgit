import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import PricingSection from "@/components/marketing/PricingSection";
import FAQSection from "@/components/marketing/FAQSection";
import CTASection from "@/components/marketing/CTASection";
import Footer from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for AI video content. Starter at $1,997/month, Growth at $3,497/month, Scale at $5,997/month. Month-to-month, no contracts.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page hero */}
        <section className="bg-gray-950 pt-32 pb-16 md:pt-40 md:pb-20 text-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 tracking-tight">
              Simple, transparent pricing
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto">
              Month-to-month. No contracts. No setup fees.
              <br />
              Cancel any time.
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

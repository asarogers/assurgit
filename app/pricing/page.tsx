import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import PricingSection from "@/components/marketing/PricingSection";
import FAQSection from "@/components/marketing/FAQSection";
import CTASection from "@/components/marketing/CTASection";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Pricing — AI Video Content Starting at $397/Month",
  description:
    "Done-for-you AI video content starting at $397/month. Launch, Starter, and Growth plans. Avatar + voice clone included on every plan. No contracts.",
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
              AI video content starting at $397/month
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Your face. Your voice. Done for you — every week.
              <br />
              Month-to-month. No contracts. No setup fees. Cancel anytime.
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

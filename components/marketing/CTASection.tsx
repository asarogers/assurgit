import Link from "next/link";
import { MotionWrapper } from "@/components/marketing/MotionWrapper";

export default function CTASection() {
  return (
    <section className="bg-[#0a0f1e] py-16 md:py-24 relative overflow-hidden">
      {/* Ambient glow — CSS animation: fades in and gently pulses */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2563eb] blur-[120px] rounded-full animate-cta-glow" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <MotionWrapper>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 tracking-tight leading-tight">
            Stop being invisible on Maps.
            <br />
            Start showing up where customers search.
          </h2>

          <p className="text-white/60 text-lg max-w-xl mx-auto mb-4 leading-relaxed">
            Book a 15-minute call. We&apos;ll look at your current GBP and site, tell you honestly which tier fits, and answer any questions before you put down a deposit.
          </p>

          <p className="text-white/40 text-sm mb-10">
            $97 / $148 / $324 one-time deposit to start (Starter / Growth / Scale). You own everything we build — day one.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/book"
              className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold px-10 py-4 rounded-xl text-base transition-all duration-200 hover:-translate-y-1 glow-blue-btn"
            >
              Book Your 15-min Call
            </Link>
            <Link
              href="#pricing"
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200"
            >
              See Pricing — from $189/mo
            </Link>
          </div>

          <p className="text-white/40 text-sm font-medium">
            Manager-only on your GBP. Free code + content export anytime. No commission on your leads.
          </p>
        </MotionWrapper>
      </div>
    </section>
  );
}

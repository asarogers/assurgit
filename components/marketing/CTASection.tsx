import Link from "next/link";
import { MotionWrapper } from "@/components/marketing/MotionWrapper";

export default function CTASection() {
  return (
    <section className="bg-[#0a0f1e] py-16 md:py-24 relative overflow-hidden">
      {/* Ambient glow — CSS animation: fades in and gently pulses */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2563eb] blur-[120px] rounded-full animate-cta-glow" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <MotionWrapper>
          {/* The risk-reversal guarantee — most powerful element on the page */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 mb-7">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider">
              Page 1 in 90 days &mdash; or your fourth month is free
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 tracking-tight leading-tight">
            Stop guessing what&rsquo;s broken.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              See it in 60 seconds.
            </span>
          </h2>

          <p className="text-white/70 text-lg max-w-xl mx-auto mb-3 leading-relaxed">
            Free audit. No email needed to see the results. Live Google rank, page speed, GBP visibility, and the top 3 things costing you leads right now.
          </p>
          <p className="text-white/55 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
            If after 90 days your top 5 keywords aren&rsquo;t on page 1 of Google, your fourth month is free. <span className="text-white/75 font-semibold">In writing, in your contract.</span>
          </p>

          {/* Audit form — mirrors hero */}
          <form
            action="/tools/seo-audit"
            method="GET"
            className="flex flex-col sm:flex-row items-stretch gap-3 max-w-xl mx-auto mb-5"
          >
            <input
              type="text"
              name="url"
              placeholder="yoursite.com"
              aria-label="Your website URL"
              className="flex-1 h-14 px-4 text-base text-white placeholder:text-white/40 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
              required
            />
            <button
              type="submit"
              className="h-14 px-6 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-base rounded-xl transition-all duration-200 hover:-translate-y-0.5 glow-blue-btn whitespace-nowrap"
            >
              Run my free audit &rarr;
            </button>
          </form>

          <p className="text-sm text-white/50 mb-8">
            Already audited?{" "}
            <Link href="/book" className="text-blue-400 font-semibold underline underline-offset-4 hover:no-underline">
              Book a 15-minute call &rarr;
            </Link>
            {" "}&middot;{" "}
            <a href="mailto:hi@assurgit.com" className="text-blue-400 font-semibold underline underline-offset-4 hover:no-underline">
              Or email me directly
            </a>
          </p>

          <p className="text-white/40 text-xs uppercase tracking-wider font-semibold">
            Manager-only on your GBP &middot; Free code &amp; content export anytime &middot; No commission on your leads
          </p>
        </MotionWrapper>
      </div>
    </section>
  );
}

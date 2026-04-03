import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real client results from Assurgit's AI clone content and presence infrastructure system. Named clients, verified outcomes.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gray-950 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent mb-5">
              Results
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              Real results. Named clients. Verified outcomes.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              These are early proof points — not guarantees. Each business is different. What holds
              across clients is the system.
            </p>
          </div>
        </section>

        {/* Case study: Well Prepared Life */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              {/* Header bar */}
              <div className="bg-brand-accent px-8 py-5">
                <p className="text-white text-xs font-semibold uppercase tracking-wider mb-1">Case Study #1</p>
                <h2 className="text-white font-black text-2xl">Well Prepared Life</h2>
              </div>

              <div className="p-8">
                <div className="grid sm:grid-cols-3 gap-8 mb-8">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Business</p>
                    <p className="text-gray-800 text-sm">Bay Area meal prep and kitchen coaching for seniors and disabled adults</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">What they used</p>
                    <p className="text-gray-800 text-sm">AI clone content system — no filming required</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Timeframe</p>
                    <p className="text-gray-800 text-sm">First week of Assurgit content</p>
                  </div>
                </div>

                {/* Result callout */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8 text-center">
                  <p className="text-emerald-800 text-4xl font-black mb-1">50%</p>
                  <p className="text-emerald-700 text-base font-semibold">Business growth in the first week</p>
                  <p className="text-emerald-600 text-sm mt-1">Without filming a single new video</p>
                </div>

                <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                  <p>
                    Well Prepared Life serves seniors and disabled adults in the Bay Area with meal prep
                    and kitchen coaching. Their founder had the expertise and the story — but no consistent
                    way to get it in front of new clients without spending hours on content every week.
                  </p>
                  <p>
                    In the first week of Assurgit content — AI clone videos published to their key platforms
                    with research-backed scripts — the business grew 50%. No new filming. No content sprint.
                    Just a system that ran.
                  </p>
                  <p className="text-xs text-gray-400 italic">
                    Note: This result reflects a specific client in a specific market during a specific period.
                    It is a named proof point, not a guaranteed outcome.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More coming */}
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl font-black text-gray-950 mb-3">More case studies coming</h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto mb-8">
              We add named case studies as clients give permission to share their results. Every case
              study includes the business type, the offer used, and a specific, verifiable outcome.
            </p>
            <Link
              href="/book"
              className="inline-block bg-brand-accent hover:bg-brand-accent-hov text-white font-bold px-8 py-4 rounded-xl text-base transition-all"
            >
              Book a Free Call →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import FounderSection from "@/components/marketing/FounderSection";
import IntakeForm from "./IntakeForm";

export const dynamic = "force-static";

export const metadata: Metadata = {
  openGraph: {
    url: "https://assurgit.com/book",
    images: [{ url: "https://assurgit.com/opengraph-image.png", width: 1024, height: 1024, alt: "Assurgit" }],
  },
  title: "Talk to a real person — Assurgit",
  description:
    "Tell us what you've already tried. We reply within 24 hours with an honest read on whether we can help and what tier fits. Page 1 in 90 days or your fourth month is free.",
  alternates: {
    canonical: "https://assurgit.com/book",
  },
};

const whatYoullGet = [
  {
    title: "An honest read on your situation within 24 hours",
    description: "Not a sequence. A real reply from a person who looked at your site, your GBP, and your competitors.",
  },
  {
    title: "A custom homepage mockup if you're a fit",
    description: "We design a tailored mockup of your homepage so you can see how it would actually look — before you sign anything.",
  },
  {
    title: "A clear yes or no",
    description: "If we can&rsquo;t help, we&rsquo;ll tell you why and point you to someone who can. We don&rsquo;t take clients we can&rsquo;t move the needle for.",
  },
  {
    title: "Zero pitch deck. Zero pressure.",
    description: "No invoice until you decide to move forward. No commitment to a tier or a contract on the first reply.",
  },
];

export default function BookPage() {
  const calUsername = process.env.NEXT_PUBLIC_CALCOM_USERNAME;
  const calSlug = process.env.NEXT_PUBLIC_CALCOM_EVENT_SLUG;
  const calUrl =
    calUsername && calSlug
      ? `https://cal.com/${calUsername}/${calSlug}?embed=true`
      : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">

          {/* Page header — risk-reversal as the headline */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563eb] mb-4">
              Talk to a real person
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 dark:text-white mb-5 tracking-tight leading-[1.1]">
              Rank on page 1 in 90 days{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                or your fourth month is free.
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Tell us what you&rsquo;ve already tried. We&rsquo;ll reply within 24 hours with an honest read on whether we can help and what tier fits. In writing, in your contract, every time.
            </p>
          </div>

          {/* WPL proof card — the full origin story: no site → conversions in 30 days */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="rounded-2xl border-2 border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-4">Recent client result</p>

              <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-3 items-center mb-5">
                <div className="rounded-xl bg-white/80 dark:bg-black/30 border border-gray-200 dark:border-white/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Before us</p>
                  <p className="text-gray-900 dark:text-white text-base font-bold leading-tight">
                    No website. 2 clients, all word of mouth. Zero paid ads.
                  </p>
                </div>
                <div className="text-emerald-600 dark:text-emerald-400 text-2xl font-black text-center sm:rotate-0 rotate-90">&rarr;</div>
                <div className="rounded-xl bg-emerald-100 dark:bg-emerald-900/40 border-2 border-emerald-400 dark:border-emerald-700 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">30 days after launch</p>
                  <p className="text-gray-900 dark:text-white text-base font-bold leading-tight">
                    <span className="text-emerald-700 dark:text-emerald-400">1 new client + 2 phone calls</span> &mdash; from the site, not word of mouth.
                  </p>
                </div>
              </div>

              <p className="text-sm text-emerald-900/85 dark:text-emerald-300/85 leading-relaxed">
                <span className="font-bold">Well Prepped Life</span> &mdash; Mountain View, Bay Area in-home meal prep. Came to us with no website and two word-of-mouth clients. We built the site, audited it, set up the Google Business Profile, ran the local SEO. Within 30 days the site itself was generating leads.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left: 2-question intake form */}
            <div>
              <h2 className="text-xl font-black text-gray-950 dark:text-white mb-2">
                Two questions. We&rsquo;ll reply in 24 hours.
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                Both answers shape what we send back. Honest answers get honest replies.
              </p>

              <IntakeForm />

              {/* What you'll get */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
                <h3 className="text-base font-bold text-gray-950 dark:text-white mb-5">
                  What you&rsquo;ll get back
                </h3>
                <div className="space-y-4">
                  {whatYoullGet.map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-[#2563eb]/10 dark:bg-[#2563eb]/20 border border-[#2563eb]/30 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-gray-950 dark:text-white font-bold text-sm leading-tight mb-0.5">{item.title}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Cal.com — for people who'd rather skip the form */}
            <div>
              <h2 className="text-xl font-black text-gray-950 dark:text-white mb-2">
                Or grab a 15-min slot now.
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Pick a time. Same conversation. Faster.
              </p>

              <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
                {calUrl ? (
                  <iframe
                    src={calUrl}
                    width="100%"
                    height="600"
                    style={{ border: "none" }}
                    title="Book a call with Assurgit"
                    className="w-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-96 p-8 text-center">
                    <svg className="w-12 h-12 text-gray-300 dark:text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Calendar booking is currently being set up.
                      <br />
                      <a href="mailto:hi@assurgit.com" className="text-[#2563eb] hover:text-[#1d4ed8] font-medium transition-colors">
                        Email us to schedule a call
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10">
          <FounderSection />
        </div>
      </main>
      <Footer />
    </>
  );
}

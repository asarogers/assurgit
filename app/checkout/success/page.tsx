import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import CheckoutSuccessAnalytics from "@/components/CheckoutSuccessAnalytics";

export const metadata: Metadata = {
  title: "You're in — Assurgit",
  description:
    "Your Assurgit subscription is active. We'll be in touch within one business day to schedule your intake call.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-static";

const STEPS = [
  {
    label: "Within 1 business day",
    body: "We email you to schedule a 15-minute intake call.",
  },
  {
    label: "Intake call",
    body: "15 minutes. We collect your NAP, services, target cities, competitors, and existing accounts.",
  },
  {
    label: "Setup phase",
    body: "1–2 weeks. We build the site, integrate booking, set up GBP, and submit to search engines.",
  },
  {
    label: "Go live",
    body: "Your subscription billing starts the day the site goes live — not today.",
  },
];

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="bg-zinc-950 text-white min-h-[85vh] pt-32 pb-24 px-4 sm:px-6">
        <CheckoutSuccessAnalytics />

        <div className="max-w-xl mx-auto">
          {/* Header / confirmation */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 ring-4 ring-emerald-500/20 text-emerald-400 mb-7">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              You&rsquo;re in.
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Your deposit was charged and your account is active.
              <br className="hidden sm:block" />
              We&rsquo;ll email your receipt within a few minutes.
            </p>
          </div>

          {/* Timeline / what happens next */}
          <div className="relative mb-12">
            {/* Vertical rail */}
            <div
              aria-hidden="true"
              className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-[#2563eb]/60 via-[#2563eb]/20 to-transparent"
            />

            <ol className="space-y-7">
              {STEPS.map((step, i) => (
                <li key={i} className="relative pl-12">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0.5 w-[31px] h-[31px] rounded-full bg-zinc-900 border border-[#2563eb]/40 flex items-center justify-center text-[13px] font-black text-[#7aa6ff]"
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm font-bold text-white mb-1">
                    {step.label}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3 px-6 rounded-xl text-sm transition hover:-translate-y-0.5"
            >
              Back to home
            </Link>
            <a
              href="mailto:hello@assurgit.com"
              className="inline-flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 px-6 rounded-xl text-sm border border-zinc-800 transition"
            >
              Email us a question
            </a>
          </div>

          {/* Footnote */}
          <p className="text-center text-xs text-zinc-600">
            Need a copy of your receipt? Check your inbox, or reply to any email
            from us and we&rsquo;ll resend it.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

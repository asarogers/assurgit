import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: "Checkout canceled — Assurgit",
  description: "No card was charged. Take another look at the tiers when you're ready.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-static";

export default function CheckoutCancelPage() {
  return (
    <>
      <Navbar />
      <main className="bg-zinc-950 text-white min-h-[80vh] pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 ring-4 ring-zinc-800 text-zinc-400 mb-7">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            No card was charged.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed mb-10">
            You closed the checkout before finishing.
            <br className="hidden sm:block" />
            Nothing was billed and no subscription started.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3 px-6 rounded-xl text-sm transition hover:-translate-y-0.5"
            >
              Back to pricing
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 px-6 rounded-xl text-sm border border-zinc-800 transition"
            >
              Talk to us first (15 min)
            </Link>
          </div>

          <p className="text-sm text-zinc-500">
            Have questions about which tier fits you?{" "}
            <a
              href="mailto:hello@assurgit.com"
              className="text-[#7aa6ff] hover:text-white font-semibold transition-colors"
            >
              hello@assurgit.com
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

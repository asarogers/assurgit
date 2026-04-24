import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Link from "next/link";
import LeaderboardClient from "./LeaderboardClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "SEO Leaderboard — Top Ranked Sites | Assurgit",
  description:
    "See which sites score highest on SEO health. Rankings based on full-site audits: errors, warnings, and clean pages across every URL.",
  alternates: {
    canonical: "https://assurgit.com/tools/seo-leaderboard",
  },
  openGraph: {
    title: "SEO Leaderboard — Top Ranked Sites | Assurgit",
    description:
      "See which sites score highest on SEO health. Rankings based on full-site audits: errors, warnings, and clean pages across every URL.",
    url: "https://assurgit.com/tools/seo-leaderboard",
    type: "website",
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "SEO Leaderboard — Top Ranked Sites",
  "url": "https://assurgit.com/tools/seo-leaderboard",
  "description": "See which sites score highest on SEO health. Rankings based on full-site audits: errors, warnings, and clean pages across every URL.",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Assurgit",
    "url": "https://assurgit.com",
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://assurgit.com" },
      { "@type": "ListItem", "position": 2, "name": "SEO Audit", "item": "https://assurgit.com/tools/seo-audit" },
      { "@type": "ListItem", "position": 3, "name": "SEO Leaderboard", "item": "https://assurgit.com/tools/seo-leaderboard" },
    ],
  },
};

export default function SeoLeaderboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="mb-2">
            <Link
              href="/tools/seo-audit"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 mb-6 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to SEO Audit
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO Leaderboard</h1>
            <p className="text-gray-500 text-base">
              Sites ranked by SEO health score. Updated automatically after each full-site audit.
            </p>
          </div>

          {/* Score explanation */}
          <div className="flex gap-4 my-6 text-xs">
            <span className="flex items-center gap-1.5 text-green-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
              80–100 Good
            </span>
            <span className="flex items-center gap-1.5 text-amber-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              50–79 Needs work
            </span>
            <span className="flex items-center gap-1.5 text-red-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              0–49 Poor
            </span>
          </div>

          <LeaderboardClient />

          <p className="text-xs text-gray-400 text-center mt-6">
            Score = 100 − (avg errors/page × 5) − (avg warnings/page × 1). Run a{" "}
            <Link href="/tools/seo-audit" className="text-green-600 hover:underline">
              full-site audit
            </Link>{" "}
            to add your site.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

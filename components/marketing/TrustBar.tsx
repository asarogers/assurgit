import Link from "next/link";
import { StaggerContainer, MotionItem, MotionWrapper } from "@/components/marketing/MotionWrapper";

const trustItems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
      </svg>
    ),
    title: "70% of local clicks happen in the Map Pack",
    description: "If you're not in the top 3 of Google Maps for your core service, you're invisible to most of your future customers — even the ones in your neighborhood.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Wix and Squarespace load slowly. Google penalizes that",
    description: "Page builders ship bloated CSS and slow JavaScript. Google's mobile algorithm uses load speed as a ranking signal — your DIY site is competing with one hand tied behind its back.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "Most agencies hold the keys to your business",
    description: "Your domain, your GBP, your code, your content — locked behind their login or contract. Yours stays yours. Day one. We work as Manager on your GBP, never Owner.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
    title: "Most monthly reports lie",
    description: "Vanity-metric screenshots. Fabricated keyword positions. Numbers that don't tie to actual traffic. Yours will be a written narrative against live Google data — what we shipped, what moved, what's next.",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Real-result proof tile — the metric that actually matters: phone calls + clients */}
        <MotionWrapper className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="rounded-2xl border-2 border-emerald-300 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30 p-6 sm:p-8 max-w-3xl mx-auto">
            <p className="text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Recent client result
            </p>

            {/* Before / after — the actual story */}
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

            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-2">
              <span className="font-bold">Well Prepped Life</span> &mdash; Mountain View, Bay Area in-home meal prep. They came to us with no website and two word-of-mouth clients. We built the site, audited it, set up the Google Business Profile, ran the local SEO. Within 30 days the site itself was generating leads.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs">
              <Link href="/case-studies" className="hover:text-gray-700 dark:hover:text-gray-400 transition-colors underline underline-offset-2 font-semibold">
                Read the full case study &rarr;
              </Link>
              {" "}&middot; Also: 66-service GBP catalog live, 7 striking-distance keywords moving toward page 1, serving 25 Bay Area cities.
            </p>
          </div>
        </MotionWrapper>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, i) => (
            <MotionItem key={i}>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg flex items-center justify-center text-brand-accent">
                {item.icon}
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-semibold text-sm mb-0.5">{item.title}</p>
                <p className="text-gray-600 dark:text-gray-500 text-xs leading-relaxed">{item.description}</p>
              </div>
            </div>
            </MotionItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

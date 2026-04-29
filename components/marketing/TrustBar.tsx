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
        {/* Social proof banner */}
        <MotionWrapper className="text-center mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Active Client Result</p>
          <p className="text-gray-900 dark:text-white text-base font-semibold">
            <span className="text-emerald-600 dark:text-emerald-400 font-black">66-service GBP catalog live, 7 striking-distance keywords moving toward page 1</span>{" "}
            inside the first month for Well Prepped Life — Bay Area in-home meal prep.
          </p>
          <p className="text-gray-500 dark:text-gray-600 text-xs mt-2">
            — <Link href="/case-studies" className="hover:text-gray-700 dark:hover:text-gray-400 transition-colors">Well Prepped Life case study</Link>,
            {" "}Mountain View, CA &middot; serving 25 Bay Area cities
          </p>
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

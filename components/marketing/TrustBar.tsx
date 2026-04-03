import Link from "next/link";
import { StaggerContainer, MotionItem, MotionWrapper } from "@/components/marketing/MotionWrapper";

const trustItems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Your Face & Voice",
    description: "Built from your actual recording — not stock footage or templates",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Research-Backed Scripts",
    description: "Competitive intelligence and trend data baked into every script",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    title: "4 Platforms, Auto-Published",
    description: "Instagram, TikTok, LinkedIn, and YouTube — on schedule every week",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Human QC on Every Video",
    description: "Every video reviewed for quality before it goes live",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Social proof banner */}
        <MotionWrapper className="text-center mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Real Client Result</p>
          <p className="text-gray-900 dark:text-white text-base font-semibold">
            <span className="text-emerald-600 dark:text-emerald-400 font-black">WellPreparedLife grew their business 50%</span>{" "}
            in their first week with Assurgit — without filming a single new video.
          </p>
          <p className="text-gray-500 dark:text-gray-600 text-xs mt-2">
            — <Link href="/for/meal-prep-coaches" className="hover:text-gray-700 dark:hover:text-gray-400 transition-colors">WellPreparedLife</Link>,
            {" "}Bay Area meal prep & kitchen coaching for seniors
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

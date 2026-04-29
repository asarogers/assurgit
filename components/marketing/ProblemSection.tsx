const problems = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
      </svg>
    ),
    headline: "“I'm invisible on Google Maps.”",
    body: "What it actually means: you're not in the top 3 for your core service, the GBP categories are wrong, and citations are inconsistent across the directories Google checks.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    headline: "“My site looks fine but doesn't bring calls.”",
    body: "What it actually means: a Wix or Squarespace site with no schema, no service-area pages, no tap-to-call button, and no booking integration. It looks like a brochure, not a conversion path.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    headline: "“Competitors with worse reviews rank above me.”",
    body: "What it actually means: their GBP is more complete, their citations are consistent, and their service catalog is broader. Reviews matter — but a complete profile beats a half-filled one with more stars.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    headline: "“I serve neighboring cities but never get calls there.”",
    body: "What it actually means: no service-area pages, GBP service area set too narrow, and no local content for those neighborhoods. Google needs a unique page for every service-and-city pair.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    headline: "“I paid an agency $X and have nothing to show for it.”",
    body: "What it actually means: no monthly reporting, no proof of work, opaque deliverables. You don't know what was done, what worked, or where the money went.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    headline: "“My phone or address is wrong somewhere on the internet.”",
    body: "What it actually means: inconsistent name/address/phone across Yelp, YellowPages, Apple Maps, and dozens of directories you've forgotten about. NAP inconsistency is one of the top reasons businesses don't rank.",
  },
];

import { StaggerContainer, MotionItem, MotionWrapper } from "@/components/marketing/MotionWrapper";

export default function ProblemSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <MotionWrapper className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 dark:text-white mb-4 tracking-tight">
            What owners say.
            <br className="hidden sm:block" />
            <span className="text-gray-500 dark:text-gray-400"> What it actually means.</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
            Most local-presence problems sound vague to owners and obvious to us. Here&apos;s the translation.
          </p>
        </MotionWrapper>

        {/* Problem cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <MotionItem key={i}>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-700">
              <div className="w-14 h-14 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 rounded-xl flex items-center justify-center text-red-500 dark:text-red-400 mb-6">
                {problem.icon}
              </div>
              <h3 className="text-gray-950 dark:text-white font-bold text-lg mb-3 leading-snug">
                {problem.headline}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {problem.body}
              </p>
            </div>
            </MotionItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

const advantages = [
  {
    title: "The clone is the wedge",
    description:
      "Content still looks and sounds like you — not a generic avatar. Clients stay connected to the person, not the tool.",
  },
  {
    title: "Consistency beats inspiration",
    description:
      "The system makes weekly output normal instead of heroic. You don't need motivation — you need a machine that runs.",
  },
  {
    title: "Research beats generic AI copy",
    description:
      "Scripts are informed by niche signals, competitive movement, and audience intent — not recycled templates.",
  },
  {
    title: "Human QC protects trust",
    description:
      "Every finished output is reviewed before handoff or publishing. Nothing goes live that shouldn't.",
  },
  {
    title: "Visibility infrastructure compounds the content",
    description:
      "Profiles, listings, and GEO make the content engine more valuable over time — not just a weekly video drop.",
  },
];

const comparisons = [
  {
    alternative: "DIY",
    stillHaveToDo: "Research, script, film, edit, caption, format, schedule — every week",
    weakness: "Inconsistent and time-heavy",
    edge: "Recaptures time and makes consistency normal",
  },
  {
    alternative: "Hire an editor",
    stillHaveToDo: "Film, direct, source footage, hand off assets, manage revisions",
    weakness: "Still depends on you to create raw material",
    edge: "No filming required — output starts from your clone",
  },
  {
    alternative: "Full-service agency",
    stillHaveToDo: "Pay for broad scope and services you may not need",
    weakness: "Expensive, broad, and hard to understand",
    edge: "Narrower, faster, more specialized recurring offer",
  },
  {
    alternative: "Self-serve avatar tool",
    stillHaveToDo: "Write scripts, manage publishing, monitor quality, own the process",
    weakness: "Tool burden stays with you",
    edge: "Done-for-you research, scripting, QC, and publishing",
  },
];

import { Mic, TrendingUp, Landmark } from "lucide-react";
import { StaggerContainer, MotionItem, MotionWrapper } from "@/components/marketing/MotionWrapper";

const personas = [
  {
    title: "Coaches & Founders",
    description: "Consistent personal-brand output without filming. The avatar + voice clone directly solves the inconsistency problem.",
    icon: Mic,
    plan: "Starter or Growth",
  },
  {
    title: "Consultants & Advisors",
    description: "Authority, trust, and top-of-mind referral presence. Your upside per client is high enough to support recurring content.",
    icon: TrendingUp,
    plan: "Starter",
  },
  {
    title: "Loan Officers",
    description: "Stay visible between closings. Build trust before the referral call happens. Content that keeps your name top of mind.",
    icon: Landmark,
    plan: "Starter",
  },
];

export default function WhyWeWin() {
  return (
    <section className="bg-white dark:bg-gray-950 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <MotionWrapper className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 dark:text-white mb-4 tracking-tight">
            Why Assurgit wins
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The memorable edge is not &ldquo;AI marketing.&rdquo; It&apos;s your face, your voice, no constant
            filming — with a system that compounds over time.
          </p>
        </MotionWrapper>

        {/* Advantages grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {advantages.map((item) => (
            <MotionItem key={item.title}>
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-700">
              <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center mb-4">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-gray-950 dark:text-white font-bold text-base mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>
            </MotionItem>
          ))}
        </StaggerContainer>

        {/* Who this is for — merged BestFitBuyers */}
        <MotionWrapper className="mb-16">
          <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2 text-center">Who this is for</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-8 max-w-xl mx-auto">
            Assurgit works best when the plan matches your economics. Here&apos;s where the fit is strongest.
          </p>
          <StaggerContainer className="grid sm:grid-cols-3 gap-5">
            {personas.map((p) => (
              <MotionItem key={p.title}>
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 h-full transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb]/40 dark:hover:border-[#2563eb]/40">
                  <div className="w-9 h-9 bg-[#2563eb]/10 rounded-lg flex items-center justify-center mb-3">
                    <p.icon className="w-4.5 h-4.5 text-[#2563eb]" strokeWidth={1.75} />
                  </div>
                  <h4 className="text-gray-950 dark:text-white font-bold text-sm mb-2">{p.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mb-3">{p.description}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563eb] bg-[#2563eb]/10 px-2 py-1 rounded-full">
                    Best fit: {p.plan}
                  </span>
                </div>
              </MotionItem>
            ))}
          </StaggerContainer>
        </MotionWrapper>

        {/* Comparison table */}
        <div>
          <h3 className="text-xl font-black text-gray-950 dark:text-white mb-6 text-center">
            What the alternatives still leave on your plate
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <th className="text-left py-3 px-4 font-semibold">Alternative</th>
                  <th className="text-left py-3 px-4 font-semibold hidden md:table-cell">What you still have to do</th>
                  <th className="text-left py-3 px-4 font-semibold hidden lg:table-cell">Weakness</th>
                  <th className="text-left py-3 px-4 font-semibold">Assurgit edge</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={row.alternative} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-950"}>
                    <td className="py-3 px-4 font-semibold text-gray-950 dark:text-white">{row.alternative}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400 hidden md:table-cell">{row.stillHaveToDo}</td>
                    <td className="py-3 px-4 text-gray-500 hidden lg:table-cell">{row.weakness}</td>
                    <td className="py-3 px-4 text-brand-accent font-medium">{row.edge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

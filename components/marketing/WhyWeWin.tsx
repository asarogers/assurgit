const advantages = [
  {
    title: "We own the whole stack",
    description:
      "Site, GBP, citations, content, monitoring — all in-house. Most agencies subcontract to three vendors and add margin at every handoff. That's why our prices are this low and turnarounds this fast.",
  },
  {
    title: "Real custom code, not Wix",
    description:
      "Your site runs on the same hosting platform Disney+, Discord, and Notion use. Sub-second loads on phones — faster than 95% of small business sites. Speed is a ranking factor.",
  },
  {
    title: "We solve the #1 local-SEO complaint",
    description:
      "Missing GBP category pages is the most-cited gap in every local SEO audit. Our template + automation generates a dedicated page for every GBP category by default. Day one.",
  },
  {
    title: "Real audits, not AI hallucinations",
    description:
      "The community has been burned by AI tools that invent broken links and fake schema errors. Our monthly health reports are real checks against your live site, run with our own tooling, against real Google data.",
  },
  {
    title: "Programmatic NAP enforcement",
    description:
      "Your name, address, and phone live in our database as the single source of truth and get pushed byte-for-byte to every directory. Manual agencies fat-finger one suite number and lose 3 months of citation work.",
  },
  {
    title: "Written 5-doc strategy tree",
    description:
      "Every client gets a written package — service entity research, GBP categories map, goal-completion rewrites, local SEO content plan, schema spec — explaining every decision. So you can hold us accountable to it.",
  },
  {
    title: "US-based, not offshore template work",
    description:
      "Strategy, audits, monthly reports, and review responses written by us in the US. Citations run by our own automation — not $5/hr offshore labor. No part of your account handed to a stranger overseas.",
  },
  {
    title: "You own everything we build",
    description:
      "Code, content, GBP, domain, data — yours from day one. We work as Manager on your GBP, never Owner. Free code export and Loom handoff at cancellation. Most agencies blur this line; we make it the headline.",
  },
];

const comparisons = [
  {
    alternative: "Fiverr $40 GBP gig",
    stillHaveToDo: "Manage your own site, citations, and content; hope they don't use spam tactics",
    weakness: "$40 of work, often citation spam that gets profiles suspended",
    edge: "Manager-only GBP access, white-hat citations, no-spam guarantee",
  },
  {
    alternative: "Wix or Squarespace + DIY SEO",
    stillHaveToDo: "Schema, citations, content, GBP optimization, monitoring — all of it",
    weakness: "Generic templates, no schema, no local SEO, slow on mobile",
    edge: "Custom code, schema by default, sub-second loads on enterprise hosting",
  },
  {
    alternative: "Local marketing agency",
    stillHaveToDo: "Wait 30 days for replies, accept opaque deliverables, no proof of work",
    weakness: "$1,500–$3,000/mo, 6-month contracts, results in spreadsheets you can't verify",
    edge: "Month-to-month after term, monthly reports against live data, free handoff anytime",
  },
  {
    alternative: "DIY local SEO",
    stillHaveToDo: "10–15 hours/month of specialized work for the rest of your business's life",
    weakness: "Most owners try for 3–6 months, get distracted, and end up worse than zero",
    edge: "Done-for-you with a written playbook so you can hold us accountable",
  },
];

import { Wrench, Scissors, Salad } from "lucide-react";
import { StaggerContainer, MotionItem, MotionWrapper } from "@/components/marketing/MotionWrapper";

const personas = [
  {
    title: "Trades & Home Services",
    description: "Handymen, contractors, electricians, plumbers, landscapers. Service-area pages and GBP service-area tuning are the highest-leverage moves.",
    icon: Wrench,
    plan: "Growth",
  },
  {
    title: "Salons, Barbers & Personal Care",
    description: "Salons, barbershops, personal trainers, chiropractors. The Maps 3-pack is the whole game; service catalog expansion 6× the search surface.",
    icon: Scissors,
    plan: "Starter or Growth",
  },
  {
    title: "Specialty Service Niches",
    description: "Meal prep, attorneys, dentists, advisors, mortgage brokers, CPAs. Voice-of-customer research and competitor intel separate you from generic agencies.",
    icon: Salad,
    plan: "Growth or Scale",
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
            The edge isn&apos;t magic. It&apos;s owning the whole stack, building real custom code, and shipping a written strategy that explains every decision.
          </p>
        </MotionWrapper>

        {/* Advantages grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

        {/* Who this is for */}
        <MotionWrapper className="mb-16">
          <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2 text-center">Who this is for</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-8 max-w-xl mx-auto">
            Local service businesses that get most of their work from people searching online — US-based.
          </p>
          <StaggerContainer className="grid sm:grid-cols-3 gap-5">
            {personas.map((p) => (
              <MotionItem key={p.title}>
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 h-full transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb]/40 dark:hover:border-[#2563eb]/40">
                  <div className="w-9 h-9 bg-[#2563eb]/10 rounded-lg flex items-center justify-center mb-3">
                    <p.icon className="w-4 h-4 text-[#2563eb]" strokeWidth={1.75} />
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

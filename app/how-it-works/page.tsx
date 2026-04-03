import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import FAQSection from "@/components/marketing/FAQSection";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See the exact 4-week onboarding process and weekly operating system behind Assurgit's AI clone content service — from clone setup to recurring publish-ready content.",
};

const onboardingWeeks = [
  {
    week: "Week 1",
    focus: "Setup",
    deliverables: "Clone creation, positioning capture, profile setup, baseline asset collection",
    why: "Build the system correctly before promising scale.",
  },
  {
    week: "Week 2",
    focus: "Production",
    deliverables: "Initial script batch, first videos, first publishing or delivery cycle",
    why: "Creates visible momentum and early feedback.",
  },
  {
    week: "Week 3",
    focus: "Refinement",
    deliverables: "Stronger hooks, better cadence, cleaner profiles, better prompts",
    why: "Prevents weak assumptions from getting automated.",
  },
  {
    week: "Week 4",
    focus: "Systemization",
    deliverables: "Scheduling, automation, monitoring checklist, reporting baseline",
    why: "Moves recurring work into a repeatable operating system.",
  },
];

const cadence = [
  { day: "Sunday", what: "Research refresh + planning", owner: "Research / planning layer", output: "Fresh topics, intent signals, competitive movement" },
  { day: "Monday", what: "Scripts generated and sent", owner: "Content layer", output: "Draft scripts for the week" },
  { day: "Tue–Thu", what: "Review window + adjustments", owner: "Client + operator", output: "Approved scripts + issue resolution" },
  { day: "Saturday", what: "Rendering, post-processing, QC", owner: "Production layer + human review", output: "Publish-ready assets" },
  { day: "Sunday", what: "Scheduling + next-cycle setup", owner: "Publishing layer", output: "Content loaded for the following week" },
];

const offerLayers = [
  {
    name: "AI Clone Content System",
    type: "Recurring",
    description: "Clone setup, short-form videos every week, research-backed scripts, human QC, delivery or publishing.",
    icon: "🎬",
  },
  {
    name: "Presence Infrastructure",
    type: "Add-on",
    description: "GBP optimization, directory listings, social setup, GEO support, monitoring prompts, automations.",
    icon: "📍",
  },
  {
    name: "Website + Presence Launch",
    type: "Project",
    description: "Site build or upgrade, search setup, social and directory profiles, foundational content system.",
    icon: "🌐",
  },
  {
    name: "Automation + Reporting",
    type: "Internal ops",
    description: "Scheduling, monitoring, performance checks, recurring reports. Lower friction and better retention at scale.",
    icon: "⚙️",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gray-950 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent mb-5">
              The system
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
              A system, not a service
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              From clone setup to recurring publish-ready content — here&apos;s exactly what happens
              and when.
            </p>
          </div>
        </section>

        {/* 4-week onboarding */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-black text-gray-950 mb-4 tracking-tight text-center">
              The 4-week onboarding story
            </h2>
            <p className="text-gray-500 text-base text-center mb-12 max-w-xl mx-auto">
              The first month is not just content delivery. It&apos;s system setup. Each week has a specific
              job.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {onboardingWeeks.map((w) => (
                <div key={w.week} className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-full bg-brand-accent text-white font-black text-sm flex items-center justify-center flex-shrink-0">
                      {w.week.split(" ")[1]}
                    </span>
                    <div>
                      <p className="font-black text-gray-950">{w.week}: {w.focus}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-2"><strong>Deliverables:</strong> {w.deliverables}</p>
                  <p className="text-brand-accent text-sm font-medium">{w.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Weekly cadence */}
        <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-black text-gray-950 mb-4 tracking-tight text-center">
              The weekly operating rhythm
            </h2>
            <p className="text-gray-500 text-base text-center mb-12 max-w-xl mx-auto">
              Every client runs through the same reliable cycle — research, scripts, review, render, publish.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-950 text-white">
                    <th className="text-left py-3 px-4 font-semibold">Day</th>
                    <th className="text-left py-3 px-4 font-semibold">What happens</th>
                    <th className="text-left py-3 px-4 font-semibold hidden md:table-cell">Primary owner</th>
                    <th className="text-left py-3 px-4 font-semibold hidden sm:table-cell">Output</th>
                  </tr>
                </thead>
                <tbody>
                  {cadence.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-3 px-4 font-semibold text-gray-900">{row.day}</td>
                      <td className="py-3 px-4 text-gray-700">{row.what}</td>
                      <td className="py-3 px-4 text-gray-500 hidden md:table-cell">{row.owner}</td>
                      <td className="py-3 px-4 text-gray-400 hidden sm:table-cell">{row.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Offer layers */}
        <section className="py-16 md:py-24 bg-white border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-black text-gray-950 mb-4 tracking-tight text-center">
              The four offer layers
            </h2>
            <p className="text-gray-500 text-base text-center mb-12 max-w-xl mx-auto">
              Content is the wedge. Infrastructure, website, and automation compound it.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {offerLayers.map((layer) => (
                <div key={layer.name} className="border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{layer.icon}</span>
                    <div>
                      <p className="font-black text-gray-950 text-base">{layer.name}</p>
                      <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider">{layer.type}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{layer.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <div className="border-t border-gray-200">
          <FAQSection />
        </div>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gray-950 border-t border-gray-800">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-black text-white mb-4">See it work for your business</h2>
            <p className="text-gray-400 mb-8">
              Book a free call. We&apos;ll show you what the system looks like for your specific niche and
              recommend the right tier.
            </p>
            <Link
              href="/book"
              className="inline-block bg-brand-accent hover:bg-brand-accent-hov text-white font-bold px-8 py-4 rounded-xl text-base transition-all"
            >
              Book a Free Call →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

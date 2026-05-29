"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MotionWrapper, StaggerContainer, MotionItem } from "@/components/marketing/MotionWrapper";

const steps = [
  {
    number: "1",
    title: "Deposit + 15-min intake",
    description:
      "$97 / $148 / $324 deposit (Starter / Growth / Scale) — roughly half the first month, covers build labor. We collect business info, NAP, services, target cities, competitors, and existing accounts.",
    ownerOutcome:
      "You don't pay full price until the site is live. The intake doubles as us telling you, in writing, exactly what we'll build and when — so there's nothing vague to argue about later.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Setup phase (1–2 weeks)",
    description:
      "We build the site, integrate your booking platform (Booksy, Fresha, Square, Cal.com, Vagaro, GlossGenius), do GBP setup, ship schema markup, and submit to search engines. Growth and Scale layer on active GBP optimization, posts, and citations.",
    ownerOutcome:
      "Most owners spend 3+ days fighting Wix or Squarespace and still have nothing usable. You spend 15 minutes giving us your info and walk away with a real site, a working booking flow, and a Google profile set up correctly the first time.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Go live + first month begins",
    description:
      "Subscription starts the day the site goes live. Starter is month-to-month from day one (7 days notice). Growth and Scale have a 3-month initial term — because honest local SEO needs 60–90 days to register — then become month-to-month with 30 days notice.",
    ownerOutcome:
      "Your phone starts to ring while we&rsquo;re still working. Well Prepped Life had no website and 2 word-of-mouth clients. 30 days after launch they had 1 new client + 2 calls from the site itself. If the calls don&rsquo;t come — page 1 in 90 days or your fourth month is free, in writing, in your contract.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

function AnimatedConnector() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <svg
      ref={ref}
      className="hidden md:block absolute top-10 left-0 w-full overflow-visible pointer-events-none"
      height="2"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* Dim baseline track */}
      <line x1="16.67%" y1="1" x2="83.33%" y2="1" stroke="#e5e7eb" strokeWidth="1.5" />
      {/* Animated blue fill */}
      <motion.line
        x1="16.67%"
        y1="1"
        x2="83.33%"
        y2="1"
        stroke="#2563eb"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
      />
    </svg>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white dark:bg-gray-950 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <MotionWrapper className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563eb] mb-4">
            What every step actually means for your business
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 dark:text-white mb-4 tracking-tight">
            Most agencies hide their process.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Here&rsquo;s ours.</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            From deposit to live in 1&ndash;2 weeks. From live to ranking in 60&ndash;90 days. Below each step, what we actually do &mdash; and what it means for your bottom line.
          </p>
        </MotionWrapper>

        {/* Steps */}
        <div className="relative">
          <AnimatedConnector />
          <StaggerContainer className="grid md:grid-cols-3 gap-10 md:gap-8" delay={0.5}>
            {steps.map((step, index) => (
              <MotionItem key={step.number}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Number circle — scales in */}
                  <motion.div
                    className="relative z-10 w-20 h-20 bg-[#2563eb] rounded-full flex items-center justify-center mb-6 shadow-xl"
                    initial={{ scale: 0.75, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.5 + index * 0.15, ease: "easeOut" }}
                  >
                    <span className="text-white font-black text-3xl">{step.number}</span>
                  </motion.div>

                  {/* Icon */}
                  <div className="text-[#2563eb] mb-4">{step.icon}</div>

                  <h3 className="text-xl font-bold text-gray-950 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mb-5">{step.description}</p>

                  {/* What this means for the owner — the differentiator */}
                  <div className="w-full max-w-xs rounded-xl border-l-4 border-[#2563eb] bg-[#2563eb]/5 dark:bg-[#2563eb]/10 px-4 py-3 text-left">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#2563eb] mb-1.5">
                      What this means for you
                    </p>
                    <p
                      className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: step.ownerOutcome }}
                    />
                  </div>

                  {/* Mobile arrow */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden mt-8 text-[#2563eb] text-2xl" aria-hidden="true">↓</div>
                  )}
                </div>
              </MotionItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Realistic timeline */}
        <MotionWrapper className="mt-20" delay={0.1}>
          <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2 text-center">
            What to expect, month by month
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Local SEO is a build, not a switch. Anyone promising &ldquo;top of Google overnight&rdquo; is either lying or planning to use tactics that get your profile suspended.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-950 text-white">
                  <th className="text-left py-3 px-4 font-semibold">Window</th>
                  <th className="text-left py-3 px-4 font-semibold">What happens</th>
                  <th className="text-left py-3 px-4 font-semibold">What you should NOT expect</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { day: "Weeks 1–2", what: "Site live, GBP set up, sitemap submitted, citations begin (G/S), reviews flip on (G/S)", output: "Phone exploding, top-of-Google positions, immediate flood of leads" },
                  { day: "Month 1", what: "40% of citations live, 2–3 secondary keywords moving, first measurable lift in Search Console impressions", output: "Page-1 head terms in your home city" },
                  { day: "Weeks 6–7", what: "Citations 80% complete, striking-distance keywords hit page 1 (Growth), first measurable lead increase", output: "Domination across all keywords yet" },
                  { day: "Months 2–3", what: "Core 30 pages indexed and ranking, Maps 3-pack stabilizing in your home city, 2–3× calls vs week 1 for most clients", output: "Head terms in competitive markets to be locked in (those take 4–9 months)" },
                  { day: "Months 3–6", what: "Primary head terms moving page 2 → page 1, geographic expansion (Scale), 50+ reviews, AI search citations starting (Scale)", output: "Stopping the work — the compounding hasn't started yet" },
                  { day: "6 Months+", what: "Sustained growth phase, rank map mostly green across your service area, review velocity stable", output: "Anyone telling you it took 30 days" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
                    <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">{row.day}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{row.what}</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{row.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MotionWrapper>

      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MotionWrapper, StaggerContainer, MotionItem } from "@/components/marketing/MotionWrapper";

const steps = [
  {
    number: "1",
    title: "We clone you",
    description:
      "30-minute setup call. We build your personal AI avatar and voice clone from a short recording. You never film again.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "We research & script",
    description:
      "Every week, our AI monitors your competitors, tracks trending content in your niche, and writes 5 platform-optimized scripts in your voice.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "We publish for you",
    description:
      "Videos render, get human QC, and go live on Instagram, TikTok, LinkedIn, and YouTube — on schedule, every week.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
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
        <MotionWrapper className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 dark:text-white mb-4 tracking-tight">
            How it works
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            From zero to published content every week in three simple steps.
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
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">{step.description}</p>

                  {/* Mobile arrow */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden mt-8 text-[#2563eb] text-2xl" aria-hidden="true">↓</div>
                  )}
                </div>
              </MotionItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Weekly cadence table */}
        <MotionWrapper className="mt-20" delay={0.1}>
          <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2 text-center">
            The weekly operating rhythm
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
            Every client runs through the same reliable cycle — research, scripts, review, render, publish.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-950 text-white">
                  <th className="text-left py-3 px-4 font-semibold">Day</th>
                  <th className="text-left py-3 px-4 font-semibold">What happens</th>
                  <th className="text-left py-3 px-4 font-semibold">Output</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { day: "Sunday", what: "Research refresh + planning", output: "Fresh topics, intent signals, competitive movement" },
                  { day: "Monday", what: "Scripts generated and sent", output: "Draft scripts for the week" },
                  { day: "Tue–Thu", what: "Review window + adjustments", output: "Approved scripts + issue resolution" },
                  { day: "Saturday", what: "Rendering, post-processing, QC", output: "Publish-ready assets" },
                  { day: "Sunday", what: "Scheduling + next-cycle setup", output: "Content loaded for the following week" },
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

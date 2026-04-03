"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What does the $397/month Launch plan actually include?",
    answer:
      "The Launch plan includes everything core to the system: your personal AI avatar built from a short video recording, your voice clone, 5 short-form videos every week written with research-backed scripts, human QC on every video before delivery, and MP4 delivery to your inbox. You post them across all 4 platforms (IG, TT, LI, YT). It's the full system — just without auto-publishing, which unlocks on Starter and Growth.",
  },
  {
    question: "Is it really my face and voice?",
    answer:
      "Yes. We build an avatar clone from a short video recording and a voice clone from a 1–2 minute audio sample. Every video uses your actual appearance and voice — not a stock avatar or generic AI voice.",
  },
  {
    question: "Will the videos look professional?",
    answer:
      "Yes. Every video goes through human QC before it's published or delivered. We review for rendering quality, caption accuracy, branding, and format specs. If something looks off, we fix it before it goes live.",
  },
  {
    question: "Do I need to film anything after setup?",
    answer:
      "After the initial 30-minute setup call and recording, no. The system runs on autopilot. You approve scripts (or skip approval — it's optional) and we handle everything else: rendering, QC, scheduling, publishing.",
  },
  {
    question: "What platforms do you publish to?",
    answer:
      "Starter and Growth plans auto-publish to Instagram, TikTok, LinkedIn, and YouTube. The Launch plan delivers MP4 files via email for you to post manually. All plans include your avatar and voice clone.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Your avatar and voice clone are ready within 48–72 hours of the setup call. Your first batch of videos goes live the Monday after setup is complete.",
  },
  {
    question: "Can I approve content before it goes live?",
    answer:
      "Yes. Every Monday, you receive 5 scripts by email with a 48-hour review window. Approve as-is, request one round of revisions, or skip review entirely — your choice. The system is built to run with or without your input.",
  },
  {
    question: "What if I want to cancel?",
    answer:
      "Month-to-month. No contracts, no cancellation fees, no awkward conversations. We'd rather earn your business every month than lock you in.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-gray-950 dark:text-white font-semibold text-base group-hover:text-brand-accent transition-colors">
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mt-0.5 transition-all ${
            isOpen ? "bg-brand-accent border-brand-accent rotate-180" : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          }`}
        >
          <svg
            className={`w-3 h-3 transition-colors ${isOpen ? "text-white" : "text-gray-500"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed pb-5">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 dark:text-white mb-4 tracking-tight">
            Frequently asked questions
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Everything you need to know before booking a call.
          </p>
        </div>

        {/* FAQ list */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm px-6 md:px-8">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

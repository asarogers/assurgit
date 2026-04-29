"use client";

import { useState, useCallback, KeyboardEvent } from "react";

/* ============================================================
   DATA
   ============================================================ */
const faqs: { q: string; a: string }[] = [
  {
    q: "What areas of the Bay Area do you serve?",
    a: "Currently serving San Francisco, Oakland, San Jose, Berkeley, and surrounding areas. Contact us if you're unsure whether we serve your area — we're always happy to discuss options.",
  },
  {
    q: "Do you accommodate dietary restrictions?",
    a: "Absolutely. We work with all dietary needs including diabetic, low-sodium, heart-healthy, vegetarian, vegan, gluten-free, and more. Your health needs drive every menu and lesson we design.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing varies based on service and frequency. We don't publish rates on the site because every client situation is different. Book a free assessment and we'll discuss what makes sense for your budget — no surprises.",
  },
  {
    q: "Do you work with specific medical conditions?",
    a: "Yes. We have experience with diabetes, Parkinson's, stroke recovery, arthritis, COPD, kidney disease, and various mobility conditions. We're not medical professionals, but we work closely with your care team to make sure everything we do supports your health plan.",
  },
  {
    q: "How often do you visit?",
    a: "That depends on the service. Cooking sessions are typically weekly or bi-weekly. Meal prep is weekly or bi-weekly. Kitchen optimization is usually a one-time engagement with optional follow-up check-ins.",
  },
  {
    q: "Can I book a service for a family member?",
    a: "Yes — in fact, most of our clients are adult children booking for aging parents. We're happy to coordinate with family members and include them in sessions if desired.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. We carry full liability insurance and hold a current ServSafe Food Handler certification. You can ask to see documentation at any time.",
  },
  {
    q: "What's the difference between Well Prepped Life and a home care agency?",
    a: "Home care agencies provide general assistance with daily tasks. We are specialized specifically in kitchen confidence, adaptive cooking, and nutrition — a focused, expert service that home care agencies typically don't offer. Think of us as the specialist, not the generalist.",
  },
  {
    q: "How quickly can we get started?",
    a: "We typically have availability within the week. Book a free assessment and we'll discuss timing on the call. Most clients have their first session scheduled within 7–10 days of their initial consultation.",
  },
  {
    q: "Is the consultation really free?",
    a: "Yes. The 30-minute Kitchen & Nutrition Assessment is completely free, no-obligation, and no credit card required. You'll walk away with useful insights about your kitchen setup and nutritional needs regardless of whether we work together.",
  },
];

/* ============================================================
   SUB-COMPONENT: Single FAQ Item
   ============================================================ */
function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}) {
  const id = `faq-answer-${index}`;
  const triggerId = `faq-trigger-${index}`;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggle(index);
      }
    },
    [index, onToggle]
  );

  return (
    <div className="border border-[#E0D8CF] rounded-xl overflow-hidden bg-white">
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={id}
          onClick={() => onToggle(index)}
          onKeyDown={handleKeyDown}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-[family-name:var(--font-sans)] font-bold text-[#2C2C2C] text-base leading-snug hover:bg-[#E8F0E9] focus-visible:bg-[#E8F0E9] transition-colors cursor-pointer"
        >
          <span>{item.q}</span>
          {/* Chevron icon */}
          <span
            className={`shrink-0 w-6 h-6 rounded-full bg-[#E8F0E9] flex items-center justify-center transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-[#6B8F71]"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </h3>

      {/* Answer panel */}
      <div
        id={id}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
      >
        <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-base leading-relaxed px-6 pb-5 pt-1">
          {item.a}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN EXPORT: FAQ Accordion
   ============================================================ */
export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="flex flex-col gap-3" role="list">
        {faqs.map((item, i) => (
          <div key={i} role="listitem">
            <FAQItem
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={handleToggle}
            />
          </div>
        ))}
      </div>
    </>
  );
}

"use client";

import { useState, useCallback } from "react";

export interface FAQItem { q: string; a: string }

/**
 * Shared FAQ accordion for service + location pages. Emits a FAQPage
 * JSON-LD <script> block so Google can eligibility-check the Q&A set for
 * People Also Ask rich results.
 *
 * Renders a visible accordion so the schema corresponds to real content
 * (Google flags hidden-only FAQPage as spam).
 */
export default function FAQSection({
  faqs,
  headingId = "faq-heading",
  heading = "Frequently Asked Questions",
}: {
  faqs: FAQItem[];
  headingId?: string;
  heading?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const handleToggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
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
    <section
      aria-labelledby={headingId}
      className="bg-[#FAF7F2] section-pad border-t border-[#E0D8CF]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-xl max-w-3xl">
        <div className="sage-divider mx-auto mb-6" />
        <h2 id={headingId} className="section-heading text-center mb-10">
          {heading}
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((item, i) => {
            const panelId = `${headingId}-panel-${i}`;
            const triggerId = `${headingId}-trigger-${i}`;
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border border-[#E0D8CF] rounded-xl overflow-hidden bg-white">
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleToggle(i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-[family-name:var(--font-sans)] font-bold text-[#2C2C2C] text-base leading-snug hover:bg-[#E8F0E9] focus-visible:bg-[#E8F0E9] transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <span
                      className={`shrink-0 w-6 h-6 rounded-full bg-[#E8F0E9] flex items-center justify-center transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      aria-hidden="true"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#6B8F71]">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen}>
                  <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-base leading-relaxed px-6 pb-5 pt-1">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

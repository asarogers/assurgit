"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Do you guarantee a #1 ranking on Google?",
    answer:
      "No — and nobody honestly can. Google's algorithm has 50+ factors and explicitly forbids guaranteed-ranking gigs. Anyone promising #1 is either lying or planning to use spam tactics that will get your profile suspended within 90 days. What we guarantee is that your profile and site will be optimized correctly — which is the single biggest controllable factor in local rankings.",
  },
  {
    question: "I already have a website. Do you have to rebuild it?",
    answer:
      "Yes — but you don't lose anything. We migrate your existing content into our template, set up 301 redirects so Google treats your new site as the same entity (preserving any existing ranking authority), and import your blog posts and photos. The old site comes down only when the new one verifiably matches or outranks it. Most clients see no ranking dip — and a measurable lift within 60 days from the technical improvements alone.",
  },
  {
    question: "Can I cancel anytime, really?",
    answer:
      "Starter: yes. Month-to-month from day one, 7 days notice before your renewal date. Growth and Scale: not for the first 3 months. The initial term exists because the work — citations, content, GBP signals, indexing — needs 60–90 days to register. After month 3 it becomes month-to-month with 30 days notice. In all cases the cancellation itself is clean: no fee, no contract clause, no transition fee. You walk away with your domain, code, GBP, content, reviews, and citations.",
  },
  {
    question: "How much is the deposit and is it refundable?",
    answer:
      "$97 Starter / $148 Growth / $324 Scale — roughly half of the first month's subscription. Non-refundable; covers build labor performed before you're billed for month one (site setup, schema, citations kickoff, GBP setup, research, content drafting). If you cancel during onboarding before launch, the deposit stays with us — but you keep everything we've built (code drafts, research, content) as a free export.",
  },
  {
    question: "What if I'm not tech-savvy?",
    answer:
      "After the 15-minute intake call, almost nothing. We need you to give us Manager access on your GBP (we send a step-by-step screenshot guide), forward us your existing domain registrar login (or we register on your behalf), and approve content drafts as we send them. That's it. No code, no plugins, no logging into anything ongoing.",
  },
  {
    question: "What happens after I cancel?",
    answer:
      "Free and automatic. Site stays live until end of the billing cycle. You get a complete code + content export (zip or git push), the citations list with logins where applicable, a GBP handoff doc, a 5-minute Loom walkthrough of how everything is wired together, and we remove our Manager access from your profile. Optional paid migration ($200–$500) if you'd rather we physically move the site to your new host instead of handing the zip to a developer.",
  },
  {
    question: "Can I keep my current domain, email, and booking system?",
    answer:
      "Yes to all three. Domain ownership stays with you — we point your existing domain to our hosting. Email aliases on your domain (name@yourdomain.com) get set up free as part of foundation; if you have an existing Google Workspace or Microsoft 365 setup, we leave it alone. Booking: we integrate with whatever you use today — Booksy, Fresha, Square Appointments, Cal.com, Vagaro, GlossGenius, Calendly. You don't need to switch platforms.",
  },
  {
    question: "Do you take a commission on my leads?",
    answer:
      "No. Every lead is yours. We don't insert ourselves between you and your customers. There's no per-lead fee, no booking fee, no markup on your service prices.",
  },
  {
    question: "What if my Google Business Profile is suspended?",
    answer:
      "Fixable. GBP suspension reinstatement is included free with Growth and Scale — we identify the violation, draft the appeal, gather supporting documentation, and submit it. Most reinstatements come back in 2–4 weeks. If you're not yet verified, we coach you through the 60-second video walkthrough that gets you verified in 24–48 hours instead of the 2-week postcard wait.",
  },
  {
    question: "Will my work be done by someone in the US?",
    answer:
      "The strategy, audits, monthly reports, and review responses are written by us in the US. Some content drafting is AI-assisted (Claude and GPT) — we edit before publish. Citations submissions are run by our own automation, not offshore labor at $5/hr. No part of your account is handed off to a stranger overseas.",
  },
  {
    question: "Aren't most SEO agencies scams? How do I know you're not one?",
    answer:
      "The honest answer: a lot of them are, and you're right to be cautious. The pattern is well-documented — vague deliverables, 6-month contracts, monthly reports padded with screenshots that don't tie to traffic, and spam-link tactics that get GBPs suspended. Three things separate us. (1) Written strategy: every client gets a 5-document plan up front explaining every decision, so you can hold us accountable to it. (2) Monthly reports run against your live site and live Google data — no fabricated keyword numbers. (3) Cancel any time after the 3-month initial term, take everything with you (code, content, GBP, citations). If we were running a scam, we'd structure all three of those very differently.",
  },
  {
    question: "I've been on Wix or Squarespace for years. Will migrating tank my SEO?",
    answer:
      "No — done right, the migration usually lifts you. We map every existing URL to its new home, set up 301 redirects so Google passes the old page's authority to the new one, and import your content + photos. The old site goes dark only after the new one matches or outranks it. Most clients see a measurable lift within 60 days from the technical improvements alone (sub-second loads, schema, real service-area pages). The risk of staying on Wix is bigger: page builders ship bloated CSS that hurts Core Web Vitals — which Google explicitly uses as a ranking signal in mobile search.",
  },
  {
    question: "Someone is offering to fix my suspended GBP for thousands of dollars. Is that a scam?",
    answer:
      "Almost always, yes. There's an entire ecosystem of bad actors who scrape suspended GBP listings and cold-call the owners offering 'fixes' for $1,500–$5,000. Don't pay them. The reinstatement process is free — you submit an appeal directly to Google with documentation. We do this as part of Growth and Scale (no extra charge), or as a one-time $499 service if you don't want a subscription. Most legitimate suspensions reinstate in 2–4 weeks once the underlying violation is corrected.",
  },
  {
    question: "I'm currently paying another agency. Can you take over without losing my rankings?",
    answer:
      "Yes, and we do this regularly. The transition is: we audit your current setup (site, GBP, citations, content), identify what's worth preserving and what's broken, build the new site in parallel, and only switch DNS once we've verified the new site matches or beats the old one in technical scores. GBP transfer is a Manager-access change — your profile keeps every review and historical data. The old agency gets a clean handoff (we'll even help you draft the cancellation email if needed). Most agency-takeover migrations take 2–3 weeks and have zero ranking impact.",
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
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  };

  return (
    <section id="faq" className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTABlock from "@/components/CTABlock";
import FAQAccordion from "./FAQAccordion";
import { getAllServices, serviceImagePath } from "@/lib/services-data";
import { getAllGBPCategories } from "@/lib/gbp-categories-data";

export const dynamic = 'force-static'

/* ============================================================
   SEO METADATA
   ============================================================ */
export const metadata: Metadata = {
  title: "Services — Meal Prep & Kitchen Coaching",
  description:
    "Personal chef, in-home cooking, meal prep, specialized diets, adaptive cooking, caregiver support, and kitchen optimization in the SF Bay Area.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Meal Prep & Kitchen Coaching | Well Prepped Life",
    description:
      "Personal chef, in-home cooking, meal prep, specialized diets, adaptive cooking, caregiver support, and kitchen optimization in the SF Bay Area.",
    url: "https://wellpreppedlife.com/services",
    siteName: "Well Prepped Life",
    type: "website",
    images: [{ url: "https://wellpreppedlife.com/opengraph-image.png", width: 1200, height: 630 }],
  },
};

/* ============================================================
   INLINE SVG ICONS — one per service overview card
   ============================================================ */
function IconChefHat({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 9.18 0A4 4 0 0 1 18 13.87V21H6z" />
      <line x1="6" y1="17" x2="18" y2="17" />
    </svg>
  );
}

function IconPot({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10h18v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-8z" />
      <path d="M3 10a2 2 0 0 1 0-4h18a2 2 0 0 1 0 4" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <path d="M9 2c0 1 .5 2 1.5 2.5" />
      <path d="M15 2c0 1-.5 2-1.5 2.5" />
    </svg>
  );
}

function IconHouse({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
      <polyline points="9 21 9 14 15 14 15 21" />
    </svg>
  );
}

function IconHeart({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconAccessibility({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="4.5" r="2" />
      <path d="M7 8h10" />
      <path d="M12 8v5" />
      <path d="M9.5 21l2.5-8 2.5 8" />
      <path d="M7.5 16h9" />
    </svg>
  );
}

function IconPeople({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconCheck({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function IconArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

/* ============================================================
   SERVICE OVERVIEW CARD DATA
   ============================================================ */
const serviceOverview = [
  {
    id: "cooking-sessions",
    icon: IconChefHat,
    name: "1-on-1 Cooking Sessions",
    description: "Personalized in-home cooking instruction adapted to your abilities and goals.",
    accentColor: "text-[#C4622D]",
  },
  {
    id: "meal-prep",
    icon: IconPot,
    name: "Done-For-You Meal Prep",
    description: "A full week of nutritious, ready-to-reheat meals prepared fresh in your kitchen.",
    accentColor: "text-[#6B8F71]",
  },
  {
    id: "kitchen-optimization",
    icon: IconHouse,
    name: "Kitchen Optimization",
    description: "Safety assessment and ergonomic redesign so your kitchen works with you, not against you.",
    accentColor: "text-[#C4622D]",
  },
  {
    id: "dietary-meal-prep",
    icon: IconHeart,
    name: "Dietary Meal Prep",
    description: "Condition-specific meals for diabetes, heart disease, kidney diet, and more.",
    accentColor: "text-[#6B8F71]",
  },
  {
    id: "adaptive-cooking",
    icon: IconAccessibility,
    name: "Adaptive Cooking",
    description: "Cooking instruction designed around your body, your tools, and your independence.",
    accentColor: "text-[#C4622D]",
  },
  {
    id: "caregiver-support",
    icon: IconPeople,
    name: "Caregiver & Family Support",
    description: "Reliable meal support so caregivers can take a breath and families can rest easy.",
    accentColor: "text-[#6B8F71]",
  },
];

/* ============================================================
   SERVICE IMAGE MAP — maps section ids to SVG illustrations
   ============================================================ */
const serviceImageMap: Record<string, string> = {
  "cooking-sessions": serviceImagePath("in-home-cooking-lessons"),
  "meal-prep": serviceImagePath("meal-prep-for-seniors"),
  "kitchen-optimization": serviceImagePath("kitchen-optimization-seniors"),
  "dietary-meal-prep": serviceImagePath("diabetic-meal-prep"),
  "adaptive-cooking": serviceImagePath("adaptive-cooking"),
  "caregiver-support": serviceImagePath("caregiver-meal-support"),
};

/* ============================================================
   SERVICE DIRECTORY CATEGORIES
   ============================================================ */
const serviceCategories: { name: string; slugs: string[] }[] = [
  {
    name: "Dietary & Nutrition",
    slugs: [
      "diabetic-meal-prep",
      "low-sodium-cooking",
      "heart-healthy-meal-prep",
      "renal-diet-meal-prep",
      "soft-food-meal-prep",
      "gluten-free-meal-prep",
      "anti-inflammatory-cooking",
      "allergen-free-cooking",
      "vegetarian-meal-prep",
    ],
  },
  {
    name: "Condition-Specific",
    slugs: [
      "dementia-meal-support",
      "parkinsons-meal-prep",
      "arthritis-friendly-cooking",
      "stroke-recovery-meals",
      "cancer-nutrition-meals",
      "post-surgery-meal-prep",
    ],
  },
  {
    name: "Meal Prep & Chef Services",
    slugs: [
      "personal-chef-for-seniors",
      "meal-prep-for-seniors",
      "weekly-meal-prep",
      "holiday-meal-preparation",
    ],
  },
  {
    name: "Cooking & Training",
    slugs: [
      "adaptive-cooking",
      "in-home-cooking-lessons",
      "caregiver-cooking-training",
    ],
  },
  {
    name: "Kitchen & Accessibility",
    slugs: [
      "kitchen-optimization-seniors",
      "kitchen-safety-assessment",
      "wheelchair-accessible-kitchen",
      "aging-in-place-kitchen",
    ],
  },
  {
    name: "Caregiver Support",
    slugs: [
      "caregiver-meal-support",
    ],
  },
];

/* ============================================================
   SUB-COMPONENT: Service Section (redesigned)
   ============================================================ */
function ServiceSection({
  id,
  sectionLabel,
  heading,
  problem,
  included,
  whoItsFor,
  expectSteps,
  transformation,
  accentBg = false,
  detailLink,
  imageSrc,
}: {
  id: string;
  sectionLabel: string;
  heading: string;
  problem: string;
  included: string[];
  whoItsFor: string;
  expectSteps: string[];
  transformation: string;
  accentBg?: boolean;
  detailLink?: { href: string; label: string };
  imageSrc?: string;
}) {
  const bg = accentBg ? "bg-[#E8F0E9]" : "bg-[#FAF7F2]";

  return (
    <section
      id={id}
      className={`${bg} section-pad scroll-mt-20`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="container-xl max-w-5xl">
        {/* Card wrapper with subtle panel design */}
        <div className="bg-white rounded-3xl border border-[#E0D8CF] shadow-sm overflow-hidden">
          {/* Image + header area */}
          {imageSrc && (
            <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gradient-to-br from-[#E8F0E9] to-[#FAF7F2] flex items-center justify-center overflow-hidden">
              <Image
                src={imageSrc}
                alt=""
                width={320}
                height={240}
                className="w-auto h-36 sm:h-44 md:h-52 object-contain opacity-90"
                aria-hidden="true"
              />
            </div>
          )}

          <div className="p-6 sm:p-8 md:p-10 lg:p-12">
            {/* Section label + divider */}
            <p className="font-[family-name:var(--font-sans)] text-[#6B8F71] font-semibold text-sm uppercase tracking-widest mb-3">
              {sectionLabel}
            </p>
            <div className="sage-divider mb-6" />

            <h2
              id={`${id}-heading`}
              className="section-heading mb-5"
            >
              {heading}
            </h2>

            {/* Problem statement */}
            <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-lg italic leading-relaxed mb-10 border-l-4 border-[#6B8F71] pl-5 bg-[#f7faf7] rounded-r-lg py-4 pr-4">
              {problem}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left column */}
              <div className="flex flex-col gap-8">
                {/* What's Included — 2-column grid */}
                <div>
                  <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold text-[#2C2C2C] mb-5">
                    What&rsquo;s Included
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label={`What's included in ${heading}`}>
                    {included.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 font-[family-name:var(--font-sans)] text-[#5A5A5A] text-[0.95rem] leading-relaxed"
                      >
                        <span className="mt-0.5 shrink-0 text-[#6B8F71]">
                          <IconCheck className="w-5 h-5" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Who It's For */}
                <div>
                  <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold text-[#2C2C2C] mb-3">
                    Who It&rsquo;s For
                  </h3>
                  <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] leading-relaxed">
                    {whoItsFor}
                  </p>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-8">
                {/* What to Expect */}
                <div>
                  <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold text-[#2C2C2C] mb-4">
                    What to Expect
                  </h3>
                  <ol className="space-y-2" aria-label={`Steps for ${heading}`}>
                    {expectSteps.map((step, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 font-[family-name:var(--font-sans)] text-[#5A5A5A] leading-relaxed"
                      >
                        <span
                          className="shrink-0 w-7 h-7 rounded-full bg-[#6B8F71] text-white text-xs font-bold flex items-center justify-center mt-0.5"
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* The Transformation — enhanced quote treatment */}
                <div className="bg-gradient-to-br from-[#E8F0E9] to-[#f0f5f0] rounded-2xl p-6 relative">
                  <svg className="absolute top-4 left-5 w-8 h-8 text-[#6B8F71] opacity-30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="font-[family-name:var(--font-sans)] text-[#6B8F71] font-semibold text-xs uppercase tracking-widest mb-3 pl-2">
                    The Transformation
                  </p>
                  <p className="font-[family-name:var(--font-serif)] text-[#2C2C2C] text-lg italic leading-relaxed pl-2">
                    &ldquo;{transformation}&rdquo;
                  </p>
                  <p className="font-[family-name:var(--font-sans)] text-[#6B8F71] text-sm font-semibold mt-3 pl-2">
                    &mdash; What our clients experience
                  </p>
                </div>

                {/* Detail page link */}
                {detailLink && (
                  <div>
                    <Link
                      href={detailLink.href}
                      className="inline-flex items-center gap-2 font-[family-name:var(--font-sans)] font-semibold text-[#6B8F71] underline underline-offset-2 hover:text-[#5A7D60] transition-colors"
                    >
                      {detailLink.label}
                      <IconArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}

                {/* CTA */}
                <div>
                  <Link
                    href="/book"
                    className="btn-primary"
                    aria-label={`Book a free assessment for ${heading}`}
                  >
                    Book Your Free Kitchen Assessment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE COMPONENT
   ============================================================ */
export default function ServicesPage() {
  const allServices = getAllServices();

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Well Prepped Life — In-Home Meal Prep & Kitchen Coaching",
    description:
      "Personal chef, in-home cooking, meal prep, specialized diets, adaptive cooking, caregiver support, and kitchen optimization in the SF Bay Area.",
    serviceType: "Personal chef and meal prep for seniors and disabled adults",
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://wellpreppedlife.com/#business",
      name: "Well Prepped Life",
      telephone: "+1-415-971-3464",
      url: "https://wellpreppedlife.com",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "San Francisco Bay Area",
    },
    url: "https://wellpreppedlife.com/services",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      {/* ── Hero Section ────────────────────────────────────── */}
      <section
        className="relative overflow-hidden section-pad text-center"
        aria-labelledby="services-page-heading"
      >
        {/* Subtle background pattern — gradient + decorative shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2] via-[#f5f0e8] to-[#E8F0E9]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#6B8F71] opacity-[0.04] rounded-full -translate-y-1/3 translate-x-1/3" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C4622D] opacity-[0.03] rounded-full translate-y-1/2 -translate-x-1/3" aria-hidden="true" />

        <div className="container-xl max-w-3xl relative z-10">
          <p className="font-[family-name:var(--font-sans)] text-[#6B8F71] font-semibold text-sm uppercase tracking-widest mb-3">
            What We Offer
          </p>
          <div className="sage-divider mx-auto mb-6" />
          <h1
            id="services-page-heading"
            className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4vw+1rem,3.25rem)] font-bold text-[#2C2C2C] leading-tight mb-6"
          >
            Services Designed Around Your Life
          </h1>
          <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Every service we offer is built around one goal: helping you or
            your loved one eat well, feel confident, and live independently. We
            come to you, we adapt to your needs, and we do the heavy lifting —
            so you don&rsquo;t have to.
          </p>

          {/* Quick-jump nav pills with icons */}
          <nav aria-label="Jump to service section">
            <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-2.5 sm:gap-3 list-none m-0 p-0 w-full sm:w-auto">
              {serviceOverview.map(({ id, icon: Icon, name }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="inline-flex items-center gap-2 font-[family-name:var(--font-sans)] font-semibold text-sm px-5 py-2.5 sm:py-2.5 rounded-full border-2 border-[#6B8F71] text-[#6B8F71] hover:bg-[#6B8F71] hover:text-white transition-all duration-200 hover:shadow-md text-center"
                  >
                    <Icon className="w-4 h-4" />
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ── Services Overview Grid (NEW) ─────────────────────── */}
      <section
        className="bg-white section-pad"
        aria-labelledby="overview-heading"
      >
        <div className="container-xl max-w-5xl">
          <div className="text-center mb-12">
            <p className="font-[family-name:var(--font-sans)] text-[#6B8F71] font-semibold text-sm uppercase tracking-widest mb-3">
              At a Glance
            </p>
            <div className="sage-divider mx-auto mb-6" />
            <h2 id="overview-heading" className="section-heading">
              Six Ways We Can Help
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceOverview.map(({ id, icon: Icon, name, description, accentColor }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group block bg-[#FAF7F2] rounded-2xl border border-[#E0D8CF] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#6B8F71]/10 hover:border-[#6B8F71]/40"
              >
                {/* Icon circle */}
                <div className={`w-14 h-14 rounded-2xl bg-white border border-[#E0D8CF] flex items-center justify-center mb-4 ${accentColor} group-hover:border-[#6B8F71]/40 transition-colors`}>
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="font-[family-name:var(--font-serif)] text-lg font-bold text-[#2C2C2C] mb-2 group-hover:text-[#6B8F71] transition-colors">
                  {name}
                </h3>
                <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-sm leading-relaxed mb-4">
                  {description}
                </p>
                <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-sans)] font-semibold text-sm text-[#6B8F71] group-hover:gap-2.5 transition-all duration-200">
                  Learn more
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service 1: Cooking Sessions ─────────────────────── */}
      <ServiceSection
        id="cooking-sessions"
        sectionLabel="Service 01"
        heading="1-on-1 In-Home Cooking Sessions"
        problem="You or your loved one wants to cook independently but needs guidance, adapted techniques, and someone patient enough to meet you exactly where you are."
        included={[
          "Weekly or bi-weekly in-home sessions (1–2 hours)",
          "Personalized lesson plan based on your abilities and health goals",
          "Adaptive technique coaching (grip assists, standing vs. seated prep, one-handed techniques)",
          "Nutritionist-informed recipe selection",
          "Grocery list creation and pantry organization guidance",
          "Session notes and take-home recipe cards",
        ]}
        whoItsFor="Seniors returning to cooking after a health event, disabled adults building kitchen confidence, individuals recovering from surgery or stroke, or anyone who wants to learn to cook safely with their specific abilities in mind."
        expectSteps={[
          "Initial assessment — we learn your abilities, goals, and kitchen setup",
          "Customized lesson plan — designed around what you can and want to do",
          "Weekly sessions — building skills one recipe at a time",
          "Monthly progress check-ins — adjusting as you grow",
        ]}
        transformation="After working with us, you'll cook with confidence, know your kitchen like a friend, and approach mealtimes with joy instead of dread."
        imageSrc={serviceImageMap["cooking-sessions"]}
        accentBg={false}
      />

      {/* ── Service 2: Meal Prep ─────────────────────────────── */}
      <ServiceSection
        id="meal-prep"
        sectionLabel="Service 02"
        heading="Done-For-You Meal Prep"
        problem="Nutrition is slipping — not because of a lack of desire, but because planning, shopping, and cooking multiple meals a week is simply too much."
        included={[
          "Weekly or bi-weekly in-home meal prep sessions (3–4 hours)",
          "Full meal planning based on dietary needs, preferences, and health goals",
          "Grocery shopping (add-on service) or detailed shopping list",
          "Batch cooking: 7–10 meals or meal components per session",
          "Proper portioning, labeling, and storage",
          "Reheating instructions for each dish",
        ]}
        whoItsFor="Seniors who want home-cooked meals without the physical demand, family caregivers who need reliable nutrition support for their loved one, individuals with chronic conditions requiring dietary management (diabetes, heart disease, kidney disease)."
        expectSteps={[
          "Initial nutrition consultation — dietary needs, preferences, restrictions",
          "Tailored meal plan — approved by you before we shop",
          "Weekly prep sessions — your fridge filled with ready-to-reheat meals",
          "Monthly menu refreshes — so you never get bored",
        ]}
        transformation="After working with us, your fridge will always be stocked with nutritious, delicious meals. You'll never reach for takeout out of exhaustion again."
        imageSrc={serviceImageMap["meal-prep"]}
        accentBg={true}
      />

      {/* ── Service 3: Kitchen Optimization ─────────────────── */}
      <ServiceSection
        id="kitchen-optimization"
        sectionLabel="Service 03"
        heading="Kitchen Optimization Consulting"
        problem="The kitchen itself is working against you — the layout, the tools, the storage — making cooking harder, less safe, and more frustrating than it needs to be."
        included={[
          "In-home kitchen safety and ergonomics assessment (2–3 hours)",
          "Detailed written report with specific, actionable recommendations",
          "Adaptive equipment recommendations (links, brands, where to buy)",
          "Storage and organization redesign (implemented same day)",
          "Lighting and contrast recommendations for low vision",
          "Accessibility modifications guidance (no construction — we work with what you have)",
        ]}
        whoItsFor="Individuals returning home after a hospital stay, families who need to adapt a parent's kitchen, anyone with arthritis, low vision, reduced grip strength, or mobility limitations that make the kitchen unsafe."
        expectSteps={[
          "Assessment — we walk through every inch of your kitchen with trained eyes",
          "Written report — clear, prioritized recommendations you can act on",
          "Implementation session — we reorganize and set things up together",
          "Follow-up check-in — making sure everything is working for you",
        ]}
        transformation="After working with us, your kitchen will feel like yours again — safe, organized, and set up to help you succeed instead of struggle."
        imageSrc={serviceImageMap["kitchen-optimization"]}
        accentBg={false}
      />

      {/* ── Service 4: Specialized Dietary Meal Prep ─────────── */}
      <ServiceSection
        id="dietary-meal-prep"
        sectionLabel="Service 04"
        heading="Specialized Dietary Meal Prep"
        problem="Managing a medical diet is overwhelming — the restrictions, the label-reading, the fear of getting it wrong. You need meals that are safe, nourishing, and actually taste good."
        included={[
          "Condition-specific meal planning (diabetic, low-sodium, heart-healthy, renal diet)",
          "Soft food and pureed meal preparation for swallowing difficulties",
          "Post-surgery recovery meals designed for healing and energy",
          "Nutrient-dense meals tailored to physician or dietitian guidelines",
          "Proper portioning for blood sugar management and medication timing",
          "Labeled containers with full ingredient lists and reheating instructions",
        ]}
        whoItsFor="Seniors managing diabetes, heart disease, kidney disease, or other chronic conditions that require strict dietary management. Individuals recovering from surgery who need nutrient-rich meals to support healing. Anyone with swallowing difficulties (dysphagia) who needs soft or pureed meals that still taste like real food."
        expectSteps={[
          "Medical diet consultation — we review your dietary restrictions, physician guidelines, and preferences",
          "Customized meal plan — built around your condition, approved by you before we cook",
          "Weekly prep sessions — condition-appropriate meals, portioned and labeled for easy use",
          "Ongoing adjustments — as your health needs change, your meals change with you",
        ]}
        transformation="After working with us, managing your medical diet will feel manageable instead of impossible. You'll eat meals that nourish your body and satisfy your taste buds — without the stress of figuring it all out alone."
        detailLink={{ href: "/services/diabetic-meal-prep", label: "Learn more about diabetic meal prep" }}
        imageSrc={serviceImageMap["dietary-meal-prep"]}
        accentBg={true}
      />

      {/* ── Service 5: Adaptive Cooking for Disabled Adults ─── */}
      <ServiceSection
        id="adaptive-cooking"
        sectionLabel="Service 05"
        heading="Adaptive Cooking for Disabled Adults"
        problem="You want to cook for yourself, but standard recipes and kitchen setups don't account for your body. You need instruction that starts with what you can do — not what you can't."
        included={[
          "Personalized cooking instruction adapted to your specific abilities",
          "Techniques for mobility limitations, including seated prep and wheelchair-accessible workflows",
          "One-handed cooking methods and adaptive grip strategies",
          "Visual impairment adaptations — tactile cues, high-contrast tools, talking timers",
          "Tremor-friendly techniques and stabilization tools",
          "Adaptive equipment recommendations and hands-on training",
        ]}
        whoItsFor="Adults living with physical disabilities who want to cook independently — including those with mobility limitations, visual impairments, tremors, limb differences, or conditions that affect fine motor control. Whether you've cooked your whole life and need to adapt, or you're learning for the first time, we meet you where you are."
        expectSteps={[
          "Abilities assessment — we learn how you move, what tools work for you, and what you want to cook",
          "Customized lesson plan — built around your body, your kitchen, and your goals",
          "Hands-on sessions — learning by doing, with patient guidance and real-time adaptation",
          "Progress and independence milestones — celebrating what you've mastered and adjusting what's next",
        ]}
        transformation="After working with us, you'll have the skills, tools, and confidence to cook meals you're proud of — on your terms, in your kitchen, with your abilities."
        detailLink={{ href: "/services/adaptive-cooking", label: "Learn more about adaptive cooking" }}
        imageSrc={serviceImageMap["adaptive-cooking"]}
        accentBg={false}
      />

      {/* ── Service 6: Caregiver & Family Support ──────────── */}
      <ServiceSection
        id="caregiver-support"
        sectionLabel="Service 06"
        heading="Caregiver & Family Support"
        problem="You're doing everything you can for your loved one, but meal planning, cooking, and nutrition have become one more thing on an already overwhelming list. You need reliable support — not another thing to manage."
        included={[
          "Caregiver respite meal service — we handle meals so you can take a break",
          "Long-distance caregiver coordination — meal prep and nutrition updates for out-of-town family members",
          "Caregiver cooking training — learn to prepare condition-specific meals efficiently",
          "Post-hospital discharge meal transition — nutritious meals ready when your loved one comes home",
          "Weekly meal status reports for family members who want to stay informed",
          "Flexible scheduling that works around your caregiving routine",
        ]}
        whoItsFor="Family caregivers managing meals for aging parents or disabled loved ones, long-distance caregivers who need a trusted local partner for nutrition support, families navigating a hospital-to-home transition, and anyone who needs help ensuring their loved one is eating well while they manage everything else."
        expectSteps={[
          "Family consultation — we learn about your loved one's needs and your caregiving situation",
          "Support plan — a customized combination of meal prep, training, and coordination tailored to your family",
          "Ongoing service — reliable, consistent meal support you can count on week after week",
          "Regular communication — updates, adjustments, and peace of mind for the whole family",
        ]}
        transformation="After working with us, you'll know your loved one is eating well — and you'll finally have one less thing to worry about. Caregiving is hard enough. Let us carry the meals."
        detailLink={{ href: "/services/caregiver-support", label: "Learn more about caregiver & family support" }}
        imageSrc={serviceImageMap["caregiver-support"]}
        accentBg={true}
      />

      {/* ── All Services Directory (NEW) ─────────────────────── */}
      <section
        className="bg-[#FAF7F2] section-pad"
        aria-labelledby="directory-heading"
      >
        <div className="container-xl max-w-6xl">
          <div className="text-center mb-12">
            <p className="font-[family-name:var(--font-sans)] text-[#6B8F71] font-semibold text-sm uppercase tracking-widest mb-3">
              Full Directory
            </p>
            <div className="sage-divider mx-auto mb-6" />
            <h2 id="directory-heading" className="section-heading mb-4">
              Explore All Our Services
            </h2>
            <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-lg leading-relaxed max-w-2xl mx-auto">
              From dietary-specific meal prep to kitchen accessibility consulting, we offer
              specialized services for every need.
            </p>
          </div>

          <div className="space-y-10">
            {serviceCategories.map((category) => {
              const categoryServices = category.slugs
                .map((slug) => allServices.find((s) => s.slug === slug))
                .filter(Boolean);

              if (categoryServices.length === 0) return null;

              return (
                <div key={category.name}>
                  <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold text-[#2C2C2C] mb-4 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#C4622D] shrink-0" aria-hidden="true" />
                    {category.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryServices.map((service) => {
                      if (!service) return null;
                      return (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="group flex items-start gap-4 bg-white rounded-xl border border-[#E0D8CF] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#6B8F71]/40"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="font-[family-name:var(--font-serif)] text-[0.95rem] font-bold text-[#2C2C2C] mb-1.5 group-hover:text-[#6B8F71] transition-colors leading-snug">
                              {service.h1.replace(/ in the (San Francisco )?Bay Area$/, "")}
                            </h4>
                            <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-xs leading-relaxed line-clamp-2">
                              {service.metaDescription.split(".")[0]}.
                            </p>
                          </div>
                          <span className="shrink-0 mt-1 text-[#6B8F71] opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                            <IconArrowRight className="w-4 h-4" />
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How Pricing Works ───────────────────────────────── */}
      <section
        className="bg-[#E8F0E9] section-pad"
        aria-labelledby="pricing-heading"
      >
        <div className="container-xl max-w-3xl">
          <div className="text-center mb-12">
            <p className="font-[family-name:var(--font-sans)] text-[#6B8F71] font-semibold text-sm uppercase tracking-widest mb-3">
              Pricing
            </p>
            <div className="sage-divider mx-auto mb-6" />
            <h2 id="pricing-heading" className="section-heading mb-4">
              How Pricing Works
            </h2>
            <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-lg leading-relaxed max-w-2xl mx-auto">
              Good nutrition is an investment in health, independence, and quality of
              life &mdash; not just food on a plate. Here&rsquo;s how our pricing is structured
              so there are no surprises.
            </p>
          </div>

          <div className="space-y-6">
            {/* Free assessment */}
            <div className="bg-white rounded-2xl border border-[#E0D8CF] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-10 h-10 rounded-full bg-[#6B8F71] text-white text-lg font-bold flex items-center justify-center mt-0.5" aria-hidden="true">
                  1
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold text-[#2C2C2C] mb-2">
                    Free 30-Minute Kitchen Assessment
                  </h3>
                  <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] leading-relaxed">
                    Every engagement starts with a complimentary, no-obligation consultation. We
                    learn about your dietary needs, kitchen setup, and goals &mdash; and you decide
                    if we&rsquo;re the right fit. No cost, no pressure.
                  </p>
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="bg-white rounded-2xl border border-[#E0D8CF] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-10 h-10 rounded-full bg-[#6B8F71] text-white text-lg font-bold flex items-center justify-center mt-0.5" aria-hidden="true">
                  2
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold text-[#2C2C2C] mb-2">
                    Weekly Meal Prep Sessions &mdash; Everything Is Included
                  </h3>
                  <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] leading-relaxed mb-4">
                    Our service fee covers the full experience, not just the cooking. Each session includes:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      "Personalized menu planning",
                      "Grocery shopping",
                      "In-home cooking",
                      "Portioning & labeling",
                      "Storage & reheating guidance",
                      "Full kitchen cleanup",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 font-[family-name:var(--font-sans)] text-[#5A5A5A] text-[0.95rem] leading-relaxed"
                      >
                        <span className="mt-0.5 shrink-0 text-[#6B8F71]">
                          <IconCheck className="w-5 h-5" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Factors */}
            <div className="bg-white rounded-2xl border border-[#E0D8CF] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-10 h-10 rounded-full bg-[#6B8F71] text-white text-lg font-bold flex items-center justify-center mt-0.5" aria-hidden="true">
                  3
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold text-[#2C2C2C] mb-2">
                    Personalized to Your Situation
                  </h3>
                  <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] leading-relaxed mb-4">
                    Your quote reflects what you actually need. Factors that shape pricing include:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      "Frequency (weekly vs. biweekly)",
                      "Number of meals per session",
                      "Dietary complexity",
                      "Household size",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 font-[family-name:var(--font-sans)] text-[#5A5A5A] text-[0.95rem] leading-relaxed"
                      >
                        <span className="mt-0.5 shrink-0 text-[#6B8F71]">
                          <IconCheck className="w-5 h-5" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-sm leading-relaxed mt-4 italic">
                    Grocery costs are passed through at retail price with no markup.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary callout */}
          <div className="mt-10 bg-gradient-to-br from-[#f7faf7] to-white rounded-2xl border border-[#6B8F71]/30 p-6 sm:p-8 text-center">
            <p className="font-[family-name:var(--font-serif)] text-xl sm:text-2xl font-bold text-[#2C2C2C] leading-snug mb-3">
              Most clients invest between $350&ndash;$600 per week
            </p>
            <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] leading-relaxed max-w-xl mx-auto mb-6">
              That covers all planning, shopping, and cooking &mdash; a complete service so
              you or your loved one can eat well every day without the burden of doing it alone.
            </p>
            <Link
              href="/book"
              className="btn-primary"
              aria-label="Contact us for a personalized pricing quote"
            >
              Get a Personalized Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── GBP Service Categories ───────────────────────────── */}
      <section
        className="bg-[#E8F0E9] section-pad"
        aria-labelledby="gbp-categories-heading"
      >
        <div className="container-xl max-w-6xl">
          <div className="text-center mb-10">
            <p className="font-[family-name:var(--font-sans)] text-[#6B8F71] font-semibold text-sm uppercase tracking-widest mb-3">
              Services by Category
            </p>
            <div className="sage-divider mx-auto mb-6" />
            <h2 id="gbp-categories-heading" className="section-heading mb-4">
              Find the Right Service
            </h2>
            <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-lg leading-relaxed max-w-2xl mx-auto">
              Browse all 66 services organized into six care categories — from medical diet meal prep to adaptive cooking and kitchen accessibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {getAllGBPCategories().map((cat) => (
              <Link
                key={cat.slug}
                href={`/services/categories/${cat.slug}`}
                className="group bg-white rounded-2xl border border-[#E0D8CF] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#6B8F71]/50 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-[family-name:var(--font-sans)] text-[#6B8F71] font-semibold text-xs uppercase tracking-widest">
                    {cat.isPrimary ? "Primary Category" : "Category"}
                  </span>
                  <span className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-xs bg-[#F0F5F0] rounded-full px-2.5 py-1">
                    {cat.services.length} services
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-serif)] text-lg font-bold text-[#2C2C2C] group-hover:text-[#6B8F71] transition-colors leading-snug">
                  {cat.name}
                </h3>
                <p className="font-[family-name:var(--font-sans)] text-[#5A5A5A] text-sm leading-relaxed flex-1">
                  {cat.tagline}
                </p>
                <span className="font-[family-name:var(--font-sans)] text-[#C4622D] font-semibold text-sm group-hover:underline">
                  Browse services &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ──────────────────────────────────────── */}
      <section
        className="bg-white section-pad"
        aria-labelledby="faq-heading"
      >
        <div className="container-xl max-w-3xl">
          <div className="text-center mb-12">
            <p className="font-[family-name:var(--font-sans)] text-[#6B8F71] font-semibold text-sm uppercase tracking-widest mb-3">
              FAQ
            </p>
            <div className="sage-divider mx-auto mb-6" />
            <h2
              id="faq-heading"
              className="section-heading"
            >
              Frequently Asked Questions
            </h2>
          </div>

          <FAQAccordion />
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <CTABlock
        headline="Ready to Get Started?"
        subtext="Every client begins with a free 30-minute Kitchen & Nutrition Assessment. We'll learn about your situation and find the right service for your life."
      />
    </>
  );
}

import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

/* ============================================================
   Props
   ============================================================ */
interface CTABlockProps {
  /** Main headline. Defaults to "Ready to Start? Let's Talk." */
  headline?: string;
  /** Supporting paragraph. Defaults to the standard booking pitch. */
  subtext?: string;
  /** Button label. Defaults to "Book Your Free Kitchen Assessment". */
  ctaText?: string;
  /** Optional id for aria-labelledby (useful when multiple CTABlocks appear on a page) */
  headingId?: string;
  /** If true, show "Or call us directly at [number]" below the button. */
  showPhone?: boolean;
}

/* ============================================================
   CTABlock Component
   Full-width sage green band used throughout the site
   to drive visitors to book a free assessment.
   ============================================================ */
const PHONE_DISPLAY = siteConfig.phone.display;
const PHONE_HREF = siteConfig.phone.href;

export default function CTABlock({
  headline = "Ready to Start? Let\u2019s Talk.",
  subtext = "Book your free Kitchen & Nutrition Assessment \u2014 no pressure, no obligation. Just a conversation about how we can help you eat better and live more confidently.",
  ctaText = "Book Your Free Kitchen Assessment",
  headingId = "cta-block-heading",
  showPhone = false,
}: CTABlockProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="bg-[#6B8F71] section-pad"
    >
      <div className="container-xl">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Decorative divider */}
          <div
            className="w-12 h-[3px] rounded-full bg-[#FAF7F2]/50 mb-7"
            aria-hidden="true"
          />

          {/* Headline */}
          <h2
            id={headingId}
            className="section-heading text-[#FAF7F2] mb-5"
          >
            {headline}
          </h2>

          {/* Subtext */}
          <p
            className="text-lg md:text-xl text-[#FAF7F2]/90 leading-relaxed mb-10 max-w-2xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {subtext}
          </p>

          {/* Primary CTA — terracotta button */}
          <Link
            href="/book"
            aria-label={ctaText}
            className={[
              "inline-flex items-center justify-center gap-2",
              "px-10 py-4 rounded-xl",
              "bg-[#C4622D] border-2 border-[#C4622D]",
              "text-white text-lg font-bold leading-snug",
              "hover:bg-[#A34F23] hover:border-[#A34F23]",
              "hover:shadow-[0_6px_24px_rgba(196,98,45,0.5)]",
              "active:translate-y-px",
              "transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-3",
              "focus-visible:ring-white focus-visible:ring-offset-3",
              "focus-visible:ring-offset-[#6B8F71]",
            ].join(" ")}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {/* Calendar icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
              className="flex-shrink-0"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {ctaText}
          </Link>

          {/* Phone number (shown when showPhone=true, e.g. homepage final CTA) */}
          {showPhone ? (
            <p
              className="mt-5 text-base text-[#FAF7F2]/90"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Or call us directly at{" "}
              <a
                href={PHONE_HREF}
                aria-label={`Call us at ${PHONE_DISPLAY}`}
                className="font-bold text-[#FAF7F2] underline underline-offset-2 hover:text-[#E8F0E9] transition-colors"
              >
                {PHONE_DISPLAY}
              </a>
            </p>
          ) : (
            <p
              className="mt-5 text-sm text-[#FAF7F2]/70"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Free, no-obligation 30-minute call &mdash; Bay Area in-home service
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

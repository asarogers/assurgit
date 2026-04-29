"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* ============================================================
   MobileStickyButton
   ─────────────────────────────────────────────────────────────
   A floating "Book a Call" pill that appears on mobile only
   (hidden at md breakpoint and above) after the user scrolls
   past the hero section (>300px). Terracotta background,
   bottom-right corner, phone icon + label.
   ============================================================ */
export default function MobileStickyButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check on mount in case page loads mid-scroll

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      role="region"
      aria-label="Quick booking button"
      className={[
        "mobile-sticky-cta",
        "fixed bottom-5 right-4 z-50",
        "md:hidden", // hidden on desktop
        "transition-all duration-300 ease-out",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      <Link
        href="/book"
        aria-label="Book a free consultation call"
        className={[
          // Layout
          "flex items-center gap-2",
          "pl-4 pr-5 py-3.5",
          "rounded-full",
          // Colors
          "bg-[#C4622D] !text-white",
          // Typography
          "text-sm font-bold leading-none",
          // Shadow & depth
          "shadow-[0_4px_20px_rgba(196,98,45,0.45)]",
          // Hover / active
          "hover:bg-[#A34F23]",
          "hover:shadow-[0_6px_28px_rgba(196,98,45,0.55)]",
          "active:scale-95",
          // Transition
          "transition-all duration-150",
          // Accessibility
          "focus-visible:outline-none",
          "focus-visible:ring-3 focus-visible:ring-white",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-[#C4622D]",
        ].join(" ")}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {/* Phone icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
          className="flex-shrink-0"
        >
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
        Book a Call
      </Link>
    </div>
  );
}

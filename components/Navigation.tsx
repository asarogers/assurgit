"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Events } from "@/lib/analytics";
import { siteConfig } from "@/lib/siteConfig";
import { LogoForkFlash } from "@/components/LogoConcepts";

/* ============================================================
   Types & Constants
   ============================================================ */
interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
];

const PHONE_DISPLAY = siteConfig.phone.display;
const PHONE_HREF = siteConfig.phone.href;

/* ============================================================
   Navigation Component
   ============================================================ */
export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);

  /* ---- Scroll listener ---- */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 10);
      setIsPastHero(y > 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Close on route change ---- */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* ---- Focus management & keyboard trap when mobile menu is open ---- */
  useEffect(() => {
    if (!mobileOpen) return;

    const menu = mobileMenuRef.current;
    if (!menu) return;

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(", ");

    const focusableEls = Array.from(
      menu.querySelectorAll<HTMLElement>(focusableSelectors)
    );

    if (focusableEls.length > 0) {
      firstFocusableRef.current = focusableEls[0];
      focusableEls[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
        return;
      }

      if (e.key !== "Tab") return;

      const first = focusableEls[0];
      const last = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  /* ---- Prevent background scroll when menu is open ---- */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ---- Active link check ---- */
  const isActive = (href: string): boolean =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ================================================================
          HEADER
          ================================================================ */}
      <header
        role="banner"
        className={[
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-200 ease-in-out",
          isScrolled
            ? "bg-white/97 backdrop-blur-md shadow-[0_2px_20px_rgba(44,44,44,0.10)]"
            : "bg-[#FAF7F2]",
        ].join(" ")}
      >
        <nav
          aria-label="Main navigation"
          className="container-xl flex items-center justify-between h-16 md:h-20"
        >
          {/* ---- Logo ---- */}
          <Link
            href="/"
            aria-label="Well Prepped Life — return to homepage"
            className={[
              "flex-shrink-0 rounded-sm",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[#C4622D] focus-visible:ring-offset-2",
            ].join(" ")}
          >
            <span className="flex items-center gap-3">
              <LogoForkFlash size={36} theme="light" />
              <span
                className="hidden sm:block font-bold text-[#1A1A1A] tracking-tight leading-none"
                style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem" }}
              >
                Well Prepped Life
              </span>
            </span>
          </Link>

          {/* ---- Desktop Nav ---- */}
          <div className="hidden md:flex items-center gap-8" role="presentation">
            <ul
              className="flex items-center gap-6 list-none m-0 p-0"
              role="list"
              aria-label="Site pages"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={[
                      "relative inline-block text-base font-semibold py-1.5 leading-none",
                      "transition-colors duration-150",
                      // Underline pseudo-element via Tailwind arbitrary after:
                      "after:absolute after:bottom-0 after:left-0 after:h-[2px]",
                      "after:rounded-full after:transition-all after:duration-200 after:ease-out",
                      isActive(href)
                        ? "text-[#6B8F71] after:w-full after:bg-[#6B8F71]"
                        : [
                            "text-[#2C2C2C] hover:text-[#6B8F71]",
                            "after:w-0 hover:after:w-full after:bg-[#6B8F71]",
                          ].join(" "),
                      "focus-visible:outline-none focus-visible:ring-2",
                      "focus-visible:ring-[#C4622D] focus-visible:ring-offset-2",
                      "rounded-sm",
                    ].join(" ")}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTA Button */}
            <Link
              href="/book"
              onClick={() => Events.bookClick()}
              aria-label="Book a free consultation call"
              className={[
                "btn-primary text-sm md:text-base",
                "transition-all duration-200",
                isPastHero
                  ? [
                      "ring-2 ring-[#C4622D] ring-offset-2 ring-offset-white",
                      "scale-[1.04] shadow-[0_4px_16px_rgba(196,98,45,0.4)]",
                    ].join(" ")
                  : "",
              ].join(" ")}
            >
              Book a Call
            </Link>
          </div>

          {/* ---- Mobile: phone number + hamburger ---- */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={PHONE_HREF}
              onClick={() => Events.phoneClick()}
              aria-label={`Call us at ${PHONE_DISPLAY}`}
              className={[
                "text-xs font-bold text-[#C4622D] leading-none",
                "hover:text-[#A34F23] transition-colors",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-[#C4622D] focus-visible:ring-offset-1",
                "rounded-sm px-0.5",
              ].join(" ")}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {PHONE_DISPLAY}
            </a>

            <button
              ref={hamburgerRef}
              type="button"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setMobileOpen((prev) => !prev)}
              className={[
                "flex flex-col justify-center items-center",
                "w-11 h-11 rounded-md gap-[5px] flex-shrink-0",
                "text-[#2C2C2C] hover:bg-[#E8F0E9] transition-colors",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-[#C4622D] focus-visible:ring-offset-1",
              ].join(" ")}
            >
              <span className="sr-only">
                {mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              </span>
              {/* Animated lines */}
              <span
                aria-hidden="true"
                className={[
                  "block w-5 h-0.5 bg-current rounded-full",
                  "transition-transform duration-200 origin-center",
                  mobileOpen ? "translate-y-[7px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                aria-hidden="true"
                className={[
                  "block w-5 h-0.5 bg-current rounded-full",
                  "transition-all duration-200",
                  mobileOpen ? "opacity-0 scale-x-0" : "",
                ].join(" ")}
              />
              <span
                aria-hidden="true"
                className={[
                  "block w-5 h-0.5 bg-current rounded-full",
                  "transition-transform duration-200 origin-center",
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : "",
                ].join(" ")}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* ================================================================
          MOBILE MENU OVERLAY
          ================================================================ */}
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
        className={[
          "fixed inset-0 z-40 md:hidden",
          "bg-[#2C2C2C]/60 backdrop-blur-sm",
          "transition-opacity duration-200",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Slide-in drawer */}
      <div
        id="mobile-nav-panel"
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileOpen}
        className={[
          "fixed top-0 right-0 z-50 h-full",
          "w-[85vw] max-w-[340px]",
          "bg-[#FAF7F2] flex flex-col",
          "shadow-[-4px_0_40px_rgba(44,44,44,0.15)]",
          "transition-transform duration-300 ease-out",
          "md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Drawer header */}
        <div
          className={[
            "flex items-center justify-between",
            "px-5 h-16 flex-shrink-0",
            "border-b border-[#E0D8CF]",
          ].join(" ")}
        >
          <span
            className="text-lg font-bold text-[#6B8F71] leading-none"
            style={{ fontFamily: "var(--font-serif)" }}
            aria-hidden="true"
          >
            Well Prepped Life
          </span>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => {
              setMobileOpen(false);
              hamburgerRef.current?.focus();
            }}
            className={[
              "w-9 h-9 flex items-center justify-center",
              "rounded-md text-[#5A5A5A]",
              "hover:bg-[#E8F0E9] hover:text-[#2C2C2C]",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[#C4622D] focus-visible:ring-offset-1",
            ].join(" ")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M1 1L15 15M15 1L1 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav links list */}
        <nav
          aria-label="Mobile site navigation"
          className="flex-1 overflow-y-auto px-4 py-6"
        >
          <ul className="flex flex-col gap-1 list-none m-0 p-0" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      "flex items-center gap-3 px-4 py-3.5 rounded-xl",
                      "text-lg font-semibold leading-snug",
                      "transition-colors duration-150",
                      "focus-visible:outline-none focus-visible:ring-2",
                      "focus-visible:ring-[#C4622D] focus-visible:ring-offset-1",
                      active
                        ? "text-[#6B8F71] bg-[#E8F0E9]"
                        : "text-[#2C2C2C] hover:text-[#6B8F71] hover:bg-[#E8F0E9]",
                    ].join(" ")}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {/* Active indicator bar */}
                    <span
                      aria-hidden="true"
                      className={[
                        "w-1 h-5 rounded-full flex-shrink-0 transition-colors",
                        active ? "bg-[#6B8F71]" : "bg-transparent",
                      ].join(" ")}
                    />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Drawer footer — CTA */}
        <div
          className={[
            "flex-shrink-0 px-5 py-5",
            "border-t border-[#E0D8CF]",
            "flex flex-col gap-3",
          ].join(" ")}
        >
          <Link
            href="/book"
            onClick={() => { setMobileOpen(false); Events.bookClick(); }}
            aria-label="Book a free consultation call"
            className="btn-primary w-full justify-center text-base"
          >
            Book a Call
          </Link>
          <a
            href={PHONE_HREF}
            onClick={() => Events.phoneClick()}
            aria-label={`Call us at ${PHONE_DISPLAY}`}
            className={[
              "flex items-center justify-center gap-2",
              "text-sm font-semibold text-[#5A5A5A]",
              "hover:text-[#C4622D] transition-colors py-1",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[#C4622D] focus-visible:ring-offset-1",
              "rounded-md",
            ].join(" ")}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {/* Phone icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* ================================================================
          HEADER SPACER — keeps content from hiding behind fixed header
          ================================================================ */}
      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  );
}

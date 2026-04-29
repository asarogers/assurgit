import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

/* ============================================================
   Social Link data & icon helpers
   ============================================================ */
interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

/* Inline SVG icons — no external icon library dependency */
const IconInstagram = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const IconFacebook = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

const IconTikTok = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.73a8.19 8.19 0 004.79 1.52V6.78a4.85 4.85 0 01-1.02-.09z" />
  </svg>
);

const IconYouTube = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M22.54 6.42A2.78 2.78 0 0020.6 4.47C18.88 4 12 4 12 4s-6.88 0-8.6.47A2.78 2.78 0 001.46 6.42 29.19 29.19 0 001 12a29.19 29.19 0 00.46 5.58A2.78 2.78 0 003.4 19.53C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 001.94-1.95A29.19 29.19 0 0023 12a29.19 29.19 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
);

const IconLinkedIn = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Follow Well Prepped Life on Instagram",
    href: siteConfig.social.instagram,
    icon: <IconInstagram />,
  },
  {
    label: "Follow Well Prepped Life on Facebook",
    href: siteConfig.social.facebook,
    icon: <IconFacebook />,
  },
  {
    label: "Follow Well Prepped Life on TikTok",
    href: siteConfig.social.tiktok,
    icon: <IconTikTok />,
  },
  // {
  //   label: "Connect with Well Prepped Life on LinkedIn",
  //   href: siteConfig.social.linkedin,
  //   icon: <IconLinkedIn />,
  // },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "What is Well Prepped Life?", href: "/what-is-well-prepped-life" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Book Your Free Kitchen Assessment", href: "/book" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Accessibility Statement", href: "/accessibility" },
];

const PHONE_DISPLAY = siteConfig.phone.display;
const PHONE_HREF = siteConfig.phone.href;
const EMAIL = siteConfig.email;

/* ============================================================
   Footer Component
   ============================================================ */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-[#6B8F71] text-[#FAF7F2]"
      aria-label="Site footer"
    >
      {/* ---- Main footer grid ---- */}
      <div className="container-xl py-14 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-14">
          {/* ---- Column 1: Brand ---- */}
          <div>
            <Link
              href="/"
              aria-label="Well Prepped Life — return to homepage"
              className={[
                "inline-block mb-4 rounded-sm",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-[#FAF7F2] focus-visible:ring-offset-2",
                "focus-visible:ring-offset-[#6B8F71]",
              ].join(" ")}
            >
              <span
                className="text-2xl font-bold text-[#FAF7F2] leading-none"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Well Prepped Life
              </span>
            </Link>

            <p
              className="text-[#E8F0E9] text-base leading-relaxed mb-5 max-w-xs"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              A well prepped kitchen means a well prepped life.
            </p>

            <a
              href={PHONE_HREF}
              aria-label={`Call us at ${PHONE_DISPLAY}`}
              className={[
                "inline-flex items-center gap-2 text-[#FAF7F2] font-semibold",
                "text-base hover:text-[#2C2C2C] transition-colors",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-[#FAF7F2] focus-visible:ring-offset-2",
                "focus-visible:ring-offset-[#6B8F71] rounded-sm",
              ].join(" ")}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {/* Phone icon */}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                className="flex-shrink-0 opacity-80"
              >
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              {PHONE_DISPLAY}
            </a>
          </div>

          {/* ---- Column 2: Quick Links ---- */}
          <div>
            <h3
              className={[
                "text-xs font-bold uppercase tracking-widest",
                "text-[#E8F0E9] mb-5",
              ].join(" ")}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2 list-none m-0 p-0" role="list">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      "text-[#FAF7F2] text-base font-medium",
                      "hover:text-[#2C2C2C] transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2",
                      "focus-visible:ring-[#FAF7F2] focus-visible:ring-offset-1",
                      "focus-visible:ring-offset-[#6B8F71]",
                      "rounded-sm inline-block",
                    ].join(" ")}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Column 3: Connect ---- */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest text-[#E8F0E9] mb-5"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Connect With Us
            </h3>

            {/* Social icons */}
            <div className="flex flex-wrap gap-3 mb-6" role="list" aria-label="Social media links">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                  className={[
                    "w-11 h-11 flex items-center justify-center",
                    "rounded-lg bg-[#FAF7F2]/15",
                    "text-[#FAF7F2] hover:bg-[#FAF7F2] hover:text-[#6B8F71]",
                    "transition-all duration-150",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-[#FAF7F2] focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-[#6B8F71]",
                  ].join(" ")}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Email */}
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest text-[#E8F0E9] mb-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Email
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className={[
                  "text-[#FAF7F2] text-base font-medium",
                  "hover:text-[#2C2C2C] transition-colors",
                  "underline underline-offset-2",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-[#FAF7F2] focus-visible:ring-offset-1",
                  "focus-visible:ring-offset-[#6B8F71]",
                  "rounded-sm",
                ].join(" ")}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Service Area ---- */}
      <div className="border-t border-[#FAF7F2]/20">
        <div className="container-xl py-8">
          <h3
            className="text-xs font-bold uppercase tracking-widest text-[#E8F0E9] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Serving Seniors &amp; Disabled Adults Across the Bay Area
          </h3>
          <nav aria-label="Service area locations" className="flex flex-wrap gap-x-2 gap-y-1">
            {[
              { label: "Mountain View", href: "/locations/mountain-view" },
              { label: "Palo Alto", href: "/locations/palo-alto" },
              { label: "Los Altos", href: "/locations/los-altos" },
              { label: "Atherton", href: "/locations/atherton" },
              { label: "Menlo Park", href: "/locations/menlo-park" },
              { label: "Sunnyvale", href: "/locations/sunnyvale" },
              { label: "Cupertino", href: "/locations/cupertino" },
              { label: "Santa Clara", href: "/locations/santa-clara" },
              { label: "Saratoga", href: "/locations/saratoga" },
              { label: "Los Altos Hills", href: "/locations/los-altos-hills" },
              { label: "Los Gatos", href: "/locations/los-gatos" },
              { label: "Campbell", href: "/locations/campbell" },
              { label: "San Jose", href: "/locations/san-jose" },
              { label: "Redwood City", href: "/locations/redwood-city" },
              { label: "San Mateo", href: "/locations/san-mateo" },
              { label: "Burlingame", href: "/locations/burlingame" },
              { label: "Hillsborough", href: "/locations/hillsborough" },
              { label: "Milpitas", href: "/locations/milpitas" },
              { label: "East Palo Alto", href: "/locations/east-palo-alto" },
              { label: "Walnut Creek", href: "/locations/walnut-creek" },
              { label: "San Francisco", href: "/locations/san-francisco" },
              { label: "Oakland", href: "/locations/oakland" },
              { label: "Fremont", href: "/locations/fremont" },
              { label: "Marin County", href: "/locations/marin" },
            ].map(({ label, href }, index, arr) => (
              <span key={href} className="inline-flex items-center">
                <Link
                  href={href}
                  className={[
                    "text-sm text-[#E8F0E9]/80 hover:text-[#FAF7F2]",
                    "transition-colors whitespace-nowrap",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-[#FAF7F2] focus-visible:ring-offset-1",
                    "focus-visible:ring-offset-[#6B8F71]",
                    "rounded-sm",
                  ].join(" ")}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {label}
                </Link>
                {index < arr.length - 1 && (
                  <span aria-hidden="true" className="text-[#FAF7F2]/30 ml-2">·</span>
                )}
              </span>
            ))}
          </nav>
          <p
            className="text-xs text-[#E8F0E9]/60 mt-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            In-home meal prep &amp; adaptive cooking services. We come to your kitchen throughout the San Francisco Bay Area.
          </p>
        </div>
      </div>

      {/* ---- Bottom bar ---- */}
      <div className="border-t border-[#FAF7F2]/20">
        <div className="container-xl py-5 flex flex-col items-center gap-3">
          <p className="text-xs text-[#E8F0E9]/60 text-center max-w-2xl font-[family-name:var(--font-sans)]">
            Well Prepped Life provides meal preparation services, not medical treatment or dietitian services. We implement meals based on client preferences and healthcare provider guidance when applicable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
            <p
              className="text-sm text-[#E8F0E9]/80 text-center sm:text-left"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              &copy; {currentYear} Well Prepped Life LLC. All rights reserved.
            </p>

            <nav aria-label="Legal links" className="flex flex-wrap items-center gap-4 justify-center">
            {LEGAL_LINKS.map(({ label, href }, index) => (
              <span key={href} className="flex items-center gap-4">
                <Link
                  href={href}
                  className={[
                    "text-sm text-[#E8F0E9]/80 hover:text-[#FAF7F2]",
                    "transition-colors whitespace-nowrap",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-[#FAF7F2] focus-visible:ring-offset-1",
                    "focus-visible:ring-offset-[#6B8F71]",
                    "rounded-sm",
                  ].join(" ")}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {label}
                </Link>
                {/* Separator dot — not after the last link */}
                {index < LEGAL_LINKS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="w-1 h-1 rounded-full bg-[#FAF7F2]/30 flex-shrink-0"
                  />
                )}
              </span>
            ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

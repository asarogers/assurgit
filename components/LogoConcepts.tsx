/**
 * ============================================================
 *  WELL PREPPED LIFE — Logo Concepts (5 options)
 *  All SVGs are self-contained, scalable, and theme-aware.
 *
 *  Usage in navbar:    <LogoWarmDot height={36} />
 *  Usage as icon:      <LogoForkFlash size={48} />
 *  Usage as favicon:   export /public/logos/badge.svg
 *
 *  Concepts:
 *    1. WarmDot    — terracotta circle mark + wordmark  ← recommended for navbar
 *    2. ForkFlash  — fork + motion lines in dark circle ← best as app icon
 *    3. PrepPin    — location pin with bowl inside      ← most distinctive
 *    4. WTine      — W letterform as fork               ← cleanest lettermark
 *    5. DarkBadge  — rounded square app-icon style      ← best for favicon / app
 * ============================================================
 */

/* ── Color tokens ─────────────────────────────────────────── */
const C = {
  terra:  "#C4622D",  // terracotta — primary brand / delivery-app red energy
  sage:   "#6B8F71",  // sage green
  dark:   "#1A1A1A",  // near-black
  mid:    "#5A5A5A",  // mid grey
  cream:  "#FAF7F2",  // background cream
  white:  "#FFFFFF",
};

/* ============================================================
   CONCEPT 1 — "Warm Dot"
   Horizontal wordmark. Terracotta filled circle with white W
   inside + "WELL PREPPED LIFE" text. Clean delivery-app language.
   Best for: navbar, email header, letterhead.
   ============================================================ */
export function LogoWarmDot({
  height = 40,
  theme = "light",
}: {
  height?: number;
  theme?: "light" | "dark";
}) {
  const textColor = theme === "dark" ? C.white : C.dark;
  const subColor  = theme === "dark" ? "#A0A0A0" : C.mid;
  const w = (height / 40) * 220;

  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 220 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Well Prepped Life"
    >
      {/* Circle mark */}
      <circle cx="20" cy="20" r="19" fill={C.terra} />

      {/* W inside circle — clean angular path */}
      <path
        d="M 9 12 L 13 28 L 20 17 L 27 28 L 31 12"
        stroke={C.white}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Vertical divider */}
      <line x1="50" y1="7" x2="50" y2="33" stroke={theme === "dark" ? "#444" : "#E0D8CF"} strokeWidth="1" />

      {/* Wordmark — "WELL PREPPED" */}
      <text
        x="62"
        y="18"
        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontSize="13"
        letterSpacing="1.5"
        fill={textColor}
      >
        WELL PREPPED
      </text>

      {/* Wordmark — "LIFE" with terracotta dot accent */}
      <text
        x="62"
        y="32"
        fontFamily="Arial, 'Helvetica Neue', sans-serif"
        fontWeight="400"
        fontSize="10"
        letterSpacing="4"
        fill={subColor}
      >
        LIFE
      </text>

      {/* Small terracotta dot after LIFE */}
      <circle cx="89" cy="29" r="2" fill={C.terra} />
    </svg>
  );
}

/* ============================================================
   CONCEPT 2 — "Fork Flash"
   Dark circle, white fork silhouette, terracotta speed lines.
   Delivery-app energy. Bold and iconic.
   Best for: app icon, social avatar, dark navbar.
   ============================================================ */
export function LogoForkFlash({
  size = 48,
  theme = "light",
}: {
  size?: number;
  theme?: "light" | "dark";
}) {
  const bg = theme === "dark" ? "#2A2A2A" : C.dark;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Well Prepped Life"
    >
      {/* Background circle */}
      <circle cx="24" cy="24" r="23" fill={bg} />

      {/* Fork — 3 tines */}
      <rect x="17" y="9"  width="3.5" height="14" rx="1.75" fill={C.white} />
      <rect x="22" y="9"  width="3.5" height="14" rx="1.75" fill={C.white} />
      <rect x="27" y="9"  width="3.5" height="14" rx="1.75" fill={C.white} />

      {/* Fork — connector bar */}
      <rect x="17" y="22" width="13.5" height="3" rx="1.5" fill={C.white} />

      {/* Fork — handle */}
      <rect x="21" y="24.5" width="5.5" height="15" rx="2.75" fill={C.white} />

      {/* Terracotta speed lines — bottom right */}
      <line x1="31" y1="34" x2="40" y2="34" stroke={C.terra} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="33" y1="38" x2="40" y2="38" stroke={C.terra} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="35" y1="42" x2="40" y2="42" stroke={C.terra} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ============================================================
   CONCEPT 3 — "Prep Pin"
   Location map pin with a bowl/plate silhouette inside the
   pin circle. References "we come to you." Bay Area local.
   Best for: standalone mark, sticker, social icon.
   ============================================================ */
export function LogoPrepPin({
  height = 56,
  theme = "light",
}: {
  height?: number;
  theme?: "light" | "dark";
}) {
  const w = (height / 56) * 40;

  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 40 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Well Prepped Life"
    >
      {/* Pin body */}
      <path
        d="M 20 54 C 20 54 3 36 3 20 C 3 10.6 10.6 3 20 3 C 29.4 3 37 10.6 37 20 C 37 36 20 54 20 54 Z"
        fill={C.terra}
      />

      {/* Inner white circle */}
      <circle cx="20" cy="20" r="11" fill={C.white} />

      {/* Bowl silhouette inside circle */}
      {/* Bowl arc */}
      <path
        d="M 12 19 Q 12 26 20 26 Q 28 26 28 19"
        stroke={C.terra}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Bowl rim */}
      <line x1="11" y1="17.5" x2="29" y2="17.5" stroke={C.terra} strokeWidth="2" strokeLinecap="round" />
      {/* Steam lines */}
      <path d="M 16 13 Q 17 10 16 8"  stroke={C.terra} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 20 14 Q 21 11 20 9"  stroke={C.terra} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 24 13 Q 25 10 24 8"  stroke={C.terra} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ============================================================
   CONCEPT 4 — "W Tine"
   The letter W where the four peaks extend upward as fork
   tines. Lettermark + utensil in one clean shape.
   Best for: embossed stamp, favicon, minimalist branding.
   ============================================================ */
export function LogoWTine({
  size = 48,
  theme = "light",
}: {
  size?: number;
  theme?: "light" | "dark";
}) {
  const color = theme === "dark" ? C.white : C.dark;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Well Prepped Life"
    >
      {/* 4 tines pointing up */}
      <rect x="8"  y="4" width="5" height="20" rx="2.5" fill={C.terra} />
      <rect x="21" y="4" width="5" height="20" rx="2.5" fill={C.terra} />
      <rect x="34" y="4" width="5" height="20" rx="2.5" fill={C.terra} />
      <rect x="47" y="4" width="5" height="20" rx="2.5" fill={C.terra} />

      {/* Connector bar linking tines */}
      <rect x="8" y="22" width="44" height="4.5" rx="2.25" fill={C.terra} />

      {/* W shape below — outer lines match tine positions */}
      <path
        d="M 10 26 L 17 52 L 30 38 L 43 52 L 50 26"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ============================================================
   CONCEPT 5 — "Dark Badge"
   Rounded square app icon. Bold "WP" in terracotta on near-
   black. Works at 16px favicon through 1024px app store icon.
   Best for: favicon, iOS/Android app icon, PWA manifest.
   ============================================================ */
export function LogoDarkBadge({
  size = 48,
  theme = "light",
}: {
  size?: number;
  theme?: "light" | "dark";
}) {
  const bg      = theme === "dark" ? "#2C2C2C" : C.dark;
  const radius  = size * 0.23; // ~23% corner radius like iOS

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Well Prepped Life"
    >
      {/* Background */}
      <rect x="2" y="2" width="56" height="56" rx="14" fill={bg} />

      {/* "W" — bold, centered, terracotta */}
      <path
        d="M 11 16 L 17 44 L 30 28 L 43 44 L 49 16"
        stroke={C.terra}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Terracotta underline accent */}
      <rect x="11" y="49" width="38" height="3" rx="1.5" fill={C.terra} opacity="0.5" />
    </svg>
  );
}

/* ============================================================
   Preview grid — renders all 5 side by side (dev use only)
   Import on a /logo-preview page to compare.
   ============================================================ */
export function LogoPreviewGrid() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 40, background: "#FAF7F2" }}>
      <h2 style={{ marginBottom: 32, color: "#2C2C2C" }}>Logo Concepts — Light Theme</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center", marginBottom: 48 }}>
        <div style={{ textAlign: "center" }}>
          <LogoWarmDot height={40} theme="light" />
          <p style={{ fontSize: 11, marginTop: 8, color: "#888" }}>1. Warm Dot</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <LogoForkFlash size={48} theme="light" />
          <p style={{ fontSize: 11, marginTop: 8, color: "#888" }}>2. Fork Flash</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <LogoPrepPin height={56} theme="light" />
          <p style={{ fontSize: 11, marginTop: 8, color: "#888" }}>3. Prep Pin</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <LogoWTine size={56} theme="light" />
          <p style={{ fontSize: 11, marginTop: 8, color: "#888" }}>4. W Tine</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <LogoDarkBadge size={56} theme="light" />
          <p style={{ fontSize: 11, marginTop: 8, color: "#888" }}>5. Dark Badge</p>
        </div>
      </div>

      <h2 style={{ marginBottom: 32, color: "#2C2C2C" }}>Logo Concepts — Dark Theme</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center", padding: 32, background: "#1A1A1A", borderRadius: 12 }}>
        <div style={{ textAlign: "center" }}>
          <LogoWarmDot height={40} theme="dark" />
          <p style={{ fontSize: 11, marginTop: 8, color: "#888" }}>1. Warm Dot</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <LogoForkFlash size={48} theme="dark" />
          <p style={{ fontSize: 11, marginTop: 8, color: "#888" }}>2. Fork Flash</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <LogoPrepPin height={56} theme="dark" />
          <p style={{ fontSize: 11, marginTop: 8, color: "#888" }}>3. Prep Pin</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <LogoWTine size={56} theme="dark" />
          <p style={{ fontSize: 11, marginTop: 8, color: "#888" }}>4. W Tine</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <LogoDarkBadge size={56} theme="dark" />
          <p style={{ fontSize: 11, marginTop: 8, color: "#888" }}>5. Dark Badge</p>
        </div>
      </div>
    </div>
  );
}

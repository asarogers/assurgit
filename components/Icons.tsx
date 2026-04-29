/**
 * ============================================================
 *  WELL PREPPED LIFE — Custom SVG Icon Set
 *  Same technique as LogoConcepts: pure geometric SVG, no deps.
 *
 *  Dual-tone: `color` = primary (default currentColor/sage),
 *             terracotta (#C4622D) used for accent details.
 *
 *  Usage:  <IconCheck size={20} />
 *          <IconStar size={16} />
 *          <IconBowl size={24} color="white" />
 * ============================================================
 */

const TERRA = "#C4622D"; // terracotta accent

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

/* ── Check mark ─────────────────────────────────────────── */
export function IconCheck({ size = 20, color = TERRA, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      <path d="M4 12L9 17L20 6" stroke={color} strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Star ───────────────────────────────────────────────── */
export function IconStar({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Terracotta fill + sage outline for depth */}
      <path d="M12 2.5L14.9 8.7L21.7 9.6L16.8 14.4L18.2 21.2L12 18L5.8 21.2L7.2 14.4L2.3 9.6L9.1 8.7Z"
        fill={TERRA} stroke={color} strokeWidth="0.5" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Location pin ───────────────────────────────────────── */
export function IconLocationDot({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Terracotta pin body */}
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill={TERRA} />
      {/* Sage ring accent */}
      <circle cx="12" cy="9" r="3.5" fill="none" stroke={color} strokeWidth="1.5" />
      {/* White inner dot */}
      <circle cx="12" cy="9" r="1.5" fill="white" />
    </svg>
  );
}

/* ── Battery low (quarter) ──────────────────────────────── */
export function IconBatteryLow({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Battery body — sage */}
      <rect x="1" y="7" width="18" height="10" rx="2" stroke={color} strokeWidth="2" />
      {/* Terminal cap — sage */}
      <path d="M20 10.5v3" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Quarter fill — terracotta: visually signals "low" */}
      <rect x="3" y="9" width="4" height="6" rx="1" fill={TERRA} />
    </svg>
  );
}

/* ── Person with cane ───────────────────────────────────── */
export function IconPersonCane({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Head — sage */}
      <circle cx="9" cy="4" r="2.5" fill={color} />
      {/* Body + legs — sage */}
      <path d="M9 7L9 14L6 20" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 14L12 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Arm reaching to cane — sage */}
      <path d="M9 10L13 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Cane shaft + hook — terracotta */}
      <path d="M13 12L15 20" stroke={TERRA} strokeWidth="2" strokeLinecap="round" />
      <path d="M15 20Q13 21.5 12 20" stroke={TERRA} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ── Utensils (fork + knife) ────────────────────────────── */
export function IconUtensils({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Fork — sage */}
      <path d="M7 3v5M9 3v5M11 3v5" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M7 8Q9 10.5 11 8" stroke={color} strokeWidth="1.75"
        fill="none" strokeLinecap="round" />
      <path d="M9 10v11" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      {/* Knife — terracotta */}
      <path d="M15 3L15 9Q16.5 9.5 17 11" stroke={TERRA} strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M17 11v10" stroke={TERRA} strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/* ── House with chimney ─────────────────────────────────── */
export function IconHouse({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Roof + walls — sage */}
      <path d="M3 10L12 3L21 10" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10V21H19V10" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
      {/* Door — terracotta tint */}
      <rect x="9.5" y="15" width="5" height="6" rx="1"
        fill={TERRA} fillOpacity="0.25" stroke={TERRA} strokeWidth="1.5" />
      {/* Chimney — terracotta */}
      <rect x="15" y="4" width="3" height="5" rx="0.5" fill={TERRA} />
    </svg>
  );
}

/* ── Wheelchair ─────────────────────────────────────────── */
export function IconWheelchair({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Head — sage */}
      <circle cx="13" cy="3.5" r="2" fill={color} />
      {/* Torso + armrest — sage */}
      <path d="M13 6L13 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M9 9L13 9" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Seat + footrest — sage */}
      <path d="M13 12L18 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M18 12L20 17" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M18 17L21 17" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Large rear wheel — terracotta */}
      <circle cx="13" cy="19" r="4" stroke={TERRA} strokeWidth="2" />
      {/* Front wheel — terracotta */}
      <circle cx="20.5" cy="18" r="1.5" stroke={TERRA} strokeWidth="1.5" />
    </svg>
  );
}

/* ── Leaf ───────────────────────────────────────────────── */
export function IconLeaf({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Leaf body — sage */}
      <path d="M17 3C17 3 19 9 14 14C10 18.5 4 21 4 21C4 21 5.5 14 9 10C13 5.5 17 3 17 3Z"
        fill={color} />
      {/* Stem — terracotta */}
      <path d="M4 21L8 17" stroke={TERRA} strokeWidth="2" strokeLinecap="round" />
      {/* Vein — white */}
      <path d="M9 19L14 12" stroke="white" strokeWidth="1.25" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/* ── Handshake ──────────────────────────────────────────── */
export function IconHandshake({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Left forearm — sage */}
      <path d="M2 14L6 11L10 13" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
      {/* Right forearm — sage */}
      <path d="M22 14L18 11L14 13" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
      {/* Clasped hands — terracotta */}
      <path d="M10 13C10 13 11 11 12 11C13 11 14 13 14 13"
        stroke={TERRA} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M10 13L10 16L14 16L14 13"
        stroke={TERRA} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Center knuckle — terracotta */}
      <circle cx="12" cy="11" r="1" fill={TERRA} />
    </svg>
  );
}

/* ── Bowl with food / steam ─────────────────────────────── */
export function IconBowl({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Steam — terracotta */}
      <path d="M8 7Q9 4.5 8 2" stroke={TERRA} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 7Q13 4.5 12 2" stroke={TERRA} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 7Q17 4.5 16 2" stroke={TERRA} strokeWidth="1.5" strokeLinecap="round" />
      {/* Rim — sage */}
      <path d="M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Bowl curve — sage */}
      <path d="M4 10Q4 18 12 18Q20 18 20 10"
        fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Base — sage */}
      <path d="M9 18H15" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Kitchen / pot ──────────────────────────────────────── */
export function IconKitchen({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Handles — sage */}
      <path d="M6 11Q3 11 3 14Q3 17 6 17"
        stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M18 11Q21 11 21 14Q21 17 18 17"
        stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Pot body — sage */}
      <rect x="6" y="11" width="12" height="9" rx="2"
        stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" />
      {/* Lid — sage */}
      <rect x="5" y="7.5" width="14" height="3.5" rx="1"
        stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" />
      {/* Lid knob — terracotta */}
      <circle cx="12" cy="6.5" r="1.75" fill={TERRA} />
    </svg>
  );
}

/* ── Seedling / plant ───────────────────────────────────── */
export function IconSeedling({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Stem — terracotta */}
      <path d="M12 22L12 13" stroke={TERRA} strokeWidth="2" strokeLinecap="round" />
      {/* Left leaf — sage */}
      <path d="M12 16Q8 11 4 13Q7 18 12 16Z" fill={color} />
      {/* Right leaf — slightly lighter sage via opacity */}
      <path d="M12 16Q16 11 20 13Q17 18 12 16Z" fill={color} fillOpacity="0.75" />
    </svg>
  );
}

/* ── Heart with pulse line ──────────────────────────────── */
export function IconHeartPulse({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Heart — sage fill */}
      <path
        d="M12 21C12 21 2 14 2 8C2 5.24 4.24 3 7 3C8.5 3 9.89 3.65 10.87 4.7L12 5.9L13.13 4.7C14.11 3.65 15.5 3 17 3C19.76 3 22 5.24 22 8C22 14 12 21 12 21Z"
        fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
      {/* EKG pulse — terracotta */}
      <path d="M5 12L8 12L9.5 9L11 14L12.5 10L14 12L19 12"
        stroke={TERRA} strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Open / giving hands ────────────────────────────────── */
export function IconHands({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Left palm — sage */}
      <path d="M2 19Q2 15 5 14L9 13Q11 13 11 15L11 19Q11 22 7 22Q2 22 2 19Z"
        fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
      {/* Right palm — sage */}
      <path d="M22 19Q22 15 19 14L15 13Q13 13 13 15L13 19Q13 22 17 22Q22 22 22 19Z"
        fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
      {/* Left fingers — terracotta */}
      <path d="M5 14L5 10M7 13L7 9M9 13L9 10"
        stroke={TERRA} strokeWidth="1.5" strokeLinecap="round" />
      {/* Right fingers — terracotta */}
      <path d="M19 14L19 10M17 13L17 9M15 13L15 10"
        stroke={TERRA} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── People group (3 figures) ───────────────────────────── */
export function IconPeopleGroup({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Center person — terracotta (focal figure) */}
      <circle cx="12" cy="5" r="2.5" fill={TERRA} />
      <path d="M8 22Q8 14 12 14Q16 14 16 22"
        fill={TERRA} fillOpacity="0.15" stroke={TERRA} strokeWidth="1.5" strokeLinecap="round" />
      {/* Left person — sage */}
      <circle cx="5" cy="7" r="2" fill={color} fillOpacity="0.8" />
      <path d="M2 22Q2 16 5 16Q8 16 8 22"
        fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Right person — sage */}
      <circle cx="19" cy="7" r="2" fill={color} fillOpacity="0.8" />
      <path d="M16 22Q16 16 19 16Q22 16 22 22"
        fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Certificate / award badge ──────────────────────────── */
export function IconCertificate({ size = 20, color = "currentColor", className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      {/* Badge ring — sage */}
      <circle cx="12" cy="9.5" r="7" stroke={color} strokeWidth="1.75"
        fill={color} fillOpacity="0.1" />
      {/* Star inside — terracotta */}
      <path d="M12 6L13.2 8.6L16 9L14 11L14.5 13.8L12 12.5L9.5 13.8L10 11L8 9L10.8 8.6Z"
        fill={TERRA} />
      {/* Left ribbon — terracotta */}
      <path d="M9 16L7 22L10 20L12 22"
        stroke={TERRA} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Right ribbon — terracotta */}
      <path d="M15 16L17 22L14 20L12 22"
        stroke={TERRA} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

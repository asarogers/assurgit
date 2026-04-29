'use client';
/**
 * Thin wrapper around Font Awesome so we import once and use cleanly.
 * Usage: <Icon icon={faHouseChimney} className="text-2xl text-[#6B8F71]" />
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export { FontAwesomeIcon };

// ── Re-export every icon the site uses so pages only import from here ──────
export {
  // Pain points
  faBatteryQuarter,
  faPersonCane,
  faUtensils,
  // Solution pillars
  faHouseChimney,
  faWheelchair,
  faLeaf,
  faLocationDot,
  // Services
  faHandshake,
  faBowlFood,
  faKitchenSet,
  // Checks / stars
  faCheck,
  faCircleCheck,
  faStar,
  // About — mission pillars
  faSeedling,
  faHeartPulse,
  faHands,
  faPeopleGroup,
  // About — credentials
  faCertificate,
  faAward,
} from '@fortawesome/free-solid-svg-icons';

interface IconProps {
  icon: IconDefinition;
  className?: string;
  'aria-hidden'?: boolean;
}

export default function Icon({ icon, className = '', ...rest }: IconProps) {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      aria-hidden={rest['aria-hidden'] ?? true}
    />
  );
}

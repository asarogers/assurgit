#!/usr/bin/env node
/**
 * Generate SVG hero/background images for all service detail and location pages.
 * Brand colors: Cream #FAF7F2, Sage #6B8F71 #4A6B50 #E8F0E9 #B5D4BB,
 *               Beige #E0D8CF #D8D0C8, Terracotta #C4622D
 * Each SVG is 1200x560, under 5KB, with detailed multi-element illustrations.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = '/Users/atlas/repo/wellpreppedlife/public/images';
const SERVICES_DIR = join(BASE, 'services');
const LOCATIONS_DIR = join(BASE, 'locations');

mkdirSync(SERVICES_DIR, { recursive: true });
mkdirSync(LOCATIONS_DIR, { recursive: true });

// ─── Background template ─────────────────────────────────────────────
function bg(cx1, cy1, r1, cx2, cy2, r2, cx3, cy3, r3) {
  return `<rect width="1200" height="560" fill="#FAF7F2"/>
  <circle cx="${cx1}" cy="${cy1}" r="${r1}" fill="#E8F0E9" opacity="0.5"/>
  <circle cx="${cx2}" cy="${cy2}" r="${r2}" fill="#E8F0E9" opacity="0.4"/>
  <circle cx="${cx3}" cy="${cy3}" r="${r3}" fill="#E0D8CF" opacity="0.3"/>`;
}

function wrap(content, bgParams) {
  const b = bgParams || [140, 290, 270, 1060, 220, 230, 920, 510, 155];
  return `<svg width="1200" height="560" viewBox="0 0 1200 560" xmlns="http://www.w3.org/2000/svg">
  ${bg(...b)}
  ${content}
  <rect x="430" y="510" width="340" height="3" rx="1.5" fill="#6B8F71" opacity="0.22"/>
</svg>`;
}

// ─── Accent dots helper ──────────────────────────────────────────────
function dots(sets) {
  return sets.map(([cx, cy, r, fill, op]) =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${op}"/>`
  ).join('\n  ');
}

// ─── Herb sprig helper ──────────────────────────────────────────────
function herbSprig(tx, ty, scale = 1) {
  return `<g transform="translate(${tx}, ${ty}) scale(${scale})">
    <line x1="0" y1="0" x2="0" y2="-70" stroke="#6B8F71" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="-14" cy="-22" rx="12" ry="7" fill="#6B8F71" opacity="0.6" transform="rotate(-35 -14 -22)"/>
    <ellipse cx="14" cy="-38" rx="12" ry="7" fill="#6B8F71" opacity="0.6" transform="rotate(35 14 -38)"/>
    <ellipse cx="-10" cy="-52" rx="10" ry="6" fill="#4A6B50" opacity="0.6" transform="rotate(-25 -10 -52)"/>
    <ellipse cx="10" cy="-64" rx="9" ry="5" fill="#4A6B50" opacity="0.5" transform="rotate(25 10 -64)"/>
  </g>`;
}

// ─── Steam lines helper ─────────────────────────────────────────────
function steam(cx, cy, count = 3, spacing = 30) {
  let s = '';
  for (let i = 0; i < count; i++) {
    const x = cx - ((count - 1) * spacing) / 2 + i * spacing;
    s += `<path d="M${x} ${cy} Q${x + 5} ${cy - 22} ${x + 2} ${cy - 8} Q${x - 3} ${cy - 38} ${x + 4} ${cy - 44}" stroke="#6B8F71" stroke-width="2.5" fill="none" opacity="0.35" stroke-linecap="round"/>`;
  }
  return s;
}

// ─── SERVICE ILLUSTRATIONS ───────────────────────────────────────────
const serviceIllustrations = {
  'personal-chef-for-seniors': () => {
    // Chef hat + apron + steaming plate + fresh vegetables
    return `
  <!-- Chef hat puff -->
  <ellipse cx="320" cy="195" rx="50" ry="40" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="2"/>
  <ellipse cx="295" cy="205" rx="30" ry="25" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="2"/>
  <ellipse cx="345" cy="205" rx="30" ry="25" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="2"/>
  <!-- Hat band -->
  <rect x="280" y="225" width="80" height="14" rx="4" fill="#6B8F71"/>
  <rect x="283" y="228" width="74" height="8" rx="3" fill="#4A6B50" opacity="0.5"/>

  <!-- Apron -->
  <path d="M290 245 Q320 238 350 245 L360 400 L280 400 Z" fill="#E8F0E9"/>
  <path d="M290 245 Q270 255 260 275 L260 295 L288 285 L288 400 L280 400 L280 285" fill="#E8F0E9"/>
  <path d="M350 245 Q370 255 380 275 L380 295 L352 285 L352 400 L360 400 L360 285" fill="#E8F0E9"/>
  <!-- Apron pocket -->
  <rect x="300" y="320" width="40" height="30" rx="5" fill="#D8E8DA" stroke="#B5D4BB" stroke-width="1.5"/>
  <!-- Apron tie bow -->
  <ellipse cx="306" cy="285" rx="12" ry="6" fill="#6B8F71" opacity="0.6" transform="rotate(-20 306 285)"/>
  <ellipse cx="334" cy="285" rx="12" ry="6" fill="#6B8F71" opacity="0.6" transform="rotate(20 334 285)"/>

  <!-- Steaming plate of food -->
  <ellipse cx="650" cy="340" rx="140" ry="45" fill="#E0D8CF"/>
  <ellipse cx="650" cy="334" rx="120" ry="36" fill="#FAF7F2"/>
  <!-- Protein (chicken/salmon piece) -->
  <ellipse cx="620" cy="318" rx="45" ry="28" fill="#D4885A"/>
  <ellipse cx="620" cy="316" rx="35" ry="20" fill="#E09878" opacity="0.7"/>
  <!-- Grill marks -->
  <line x1="600" y1="308" x2="615" y2="328" stroke="#B0603A" stroke-width="2" opacity="0.5" stroke-linecap="round"/>
  <line x1="614" y1="304" x2="629" y2="324" stroke="#B0603A" stroke-width="2" opacity="0.5" stroke-linecap="round"/>
  <!-- Greens on plate -->
  <ellipse cx="695" cy="320" rx="28" ry="18" fill="#6B8F71" opacity="0.7" transform="rotate(-10 695 320)"/>
  <ellipse cx="710" cy="328" rx="22" ry="14" fill="#4A6B50" opacity="0.6" transform="rotate(15 710 328)"/>
  <!-- Rice/grain mound -->
  <ellipse cx="655" cy="345" rx="30" ry="12" fill="#D4B882" opacity="0.8"/>
  ${steam(650, 278)}

  <!-- Fresh vegetables (right side) -->
  <!-- Carrot -->
  <path d="M860 280 Q875 260 880 320" fill="#C4622D" opacity="0.7"/>
  <ellipse cx="871" cy="268" rx="8" ry="5" fill="#6B8F71" opacity="0.6" transform="rotate(-20 871 268)"/>
  <ellipse cx="878" cy="264" rx="7" ry="4" fill="#4A6B50" opacity="0.5" transform="rotate(15 878 264)"/>
  <!-- Tomato -->
  <circle cx="840" cy="350" r="22" fill="#C4622D" opacity="0.55"/>
  <circle cx="840" cy="347" r="18" fill="#D87050" opacity="0.4"/>
  <path d="M832 338 Q840 332 848 338" stroke="#4A6B50" stroke-width="2" fill="none" opacity="0.5"/>
  <!-- Broccoli floret -->
  <circle cx="890" cy="345" r="16" fill="#5A8840"/>
  <circle cx="890" cy="342" r="11" fill="#70A050" opacity="0.7"/>
  <rect x="887" y="358" width="6" height="14" rx="3" fill="#4A7030"/>

  ${herbSprig(480, 420, 0.8)}
  ${dots([[190,170,7,'#C4622D',0.5],[210,195,4.5,'#C4622D',0.35],[920,220,5,'#6B8F71',0.4],[760,180,6,'#C4622D',0.3]])}`;
  },

  'diabetic-meal-prep': () => {
    // Blood glucose meter + balanced plate (divided sections) + measuring cup
    return `
  <!-- Blood glucose meter -->
  <rect x="160" y="195" width="130" height="185" rx="16" fill="#E0D8CF"/>
  <rect x="168" y="203" width="114" height="169" rx="12" fill="#3A3A3A"/>
  <!-- Screen -->
  <rect x="178" y="213" width="94" height="70" rx="8" fill="#1A3020"/>
  <text x="225" y="254" text-anchor="middle" fill="#6BFF90" font-size="28" font-family="monospace" font-weight="700">98</text>
  <text x="225" y="272" text-anchor="middle" fill="#6B9F71" font-size="10" font-family="monospace">mg/dL</text>
  <!-- In-range indicator -->
  <circle cx="248" cy="248" r="5" fill="#4ADE4A" opacity="0.8"/>
  <!-- Buttons -->
  <circle cx="205" cy="310" r="10" fill="#4A4A4A"/>
  <circle cx="245" cy="310" r="10" fill="#4A4A4A"/>
  <!-- Test strip slot -->
  <rect x="270" y="260" width="22" height="35" rx="5" fill="#8A7858"/>
  <rect x="274" y="264" width="14" height="27" rx="3" fill="#7A6848"/>
  <!-- Test strip inserted -->
  <rect x="278" y="240" width="6" height="30" rx="2" fill="#D8D0C8"/>
  <!-- Drop of blood -->
  <path d="M281 237 Q284 228 287 237" fill="#C4622D"/>
  <circle cx="284" cy="239" r="3" fill="#C4622D" opacity="0.8"/>

  <!-- Balanced divided plate -->
  <circle cx="600" cy="300" r="130" fill="#E0D8CF"/>
  <circle cx="600" cy="300" r="115" fill="#FAF7F2"/>
  <!-- Plate rim detail -->
  <circle cx="600" cy="300" r="122" fill="none" stroke="#D8D0C8" stroke-width="1.5"/>
  <!-- Divider lines -->
  <line x1="600" y1="185" x2="600" y2="415" stroke="#D8D0C8" stroke-width="2.5"/>
  <line x1="485" y1="300" x2="600" y2="300" stroke="#D8D0C8" stroke-width="2.5"/>
  <!-- Protein section (right half) - salmon -->
  <path d="M620 220 Q680 210 710 260 Q700 320 680 360 Q640 380 620 360 Z" fill="#E07050" opacity="0.5"/>
  <path d="M628 230 Q675 222 700 265 Q692 315 675 350 Q645 368 628 350 Z" fill="#E89070" opacity="0.35"/>
  <!-- White fat lines on salmon -->
  <line x1="640" y1="250" x2="685" y2="260" stroke="#FAF7F2" stroke-width="1.5" opacity="0.5"/>
  <line x1="638" y1="280" x2="690" y2="285" stroke="#FAF7F2" stroke-width="1.5" opacity="0.5"/>
  <line x1="636" y1="310" x2="685" y2="310" stroke="#FAF7F2" stroke-width="1.5" opacity="0.5"/>
  <!-- Veggie section (top left) - broccoli + greens -->
  <circle cx="540" cy="240" r="20" fill="#5A8840"/>
  <circle cx="540" cy="237" r="14" fill="#70A050" opacity="0.7"/>
  <circle cx="560" cy="255" r="16" fill="#5A8840"/>
  <circle cx="560" cy="252" r="11" fill="#6A9850" opacity="0.7"/>
  <ellipse cx="525" cy="260" rx="16" ry="10" fill="#6B8F71" opacity="0.6"/>
  <!-- Grain section (bottom left) - brown rice -->
  <ellipse cx="540" cy="350" rx="42" ry="28" fill="#D4B882" opacity="0.6"/>
  <ellipse cx="540" cy="347" rx="34" ry="22" fill="#DCC090" opacity="0.5"/>

  <!-- Measuring cup (right side) -->
  <path d="M830 235 L830 370 Q830 385 845 385 L895 385 Q910 385 910 370 L910 235 Z" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="2"/>
  <!-- Measurement lines -->
  <line x1="835" y1="270" x2="855" y2="270" stroke="#6B8F71" stroke-width="1.5" opacity="0.5"/>
  <line x1="835" y1="305" x2="860" y2="305" stroke="#6B8F71" stroke-width="1.5" opacity="0.5"/>
  <line x1="835" y1="340" x2="855" y2="340" stroke="#6B8F71" stroke-width="1.5" opacity="0.5"/>
  <!-- Handle -->
  <path d="M910 280 Q940 280 940 310 Q940 340 910 340" fill="none" stroke="#B5D4BB" stroke-width="4" stroke-linecap="round"/>
  <!-- Liquid inside -->
  <rect x="834" y="305" width="72" height="76" rx="0" fill="#B5D4BB" opacity="0.3"/>
  <text x="870" y="280" text-anchor="middle" fill="#4A6B50" font-size="10" font-family="system-ui" opacity="0.6">1 cup</text>

  ${dots([[370,180,6,'#C4622D',0.45],[760,180,5,'#6B8F71',0.4],[380,400,5,'#6B8F71',0.3]])}`;
  },

  'kitchen-optimization-seniors': () => {
    // Organized kitchen counter with labeled jars + step stool + bright lighting
    return `
  <!-- Counter surface -->
  <rect x="200" y="310" width="800" height="16" rx="4" fill="#D8D0C8"/>
  <rect x="200" y="326" width="800" height="120" rx="0" fill="#E0D8CF" opacity="0.5"/>
  <!-- Cabinet above -->
  <rect x="350" y="120" width="500" height="170" rx="8" fill="#D8D0C8"/>
  <rect x="358" y="128" width="234" height="154" rx="4" fill="#FAF7F2"/>
  <rect x="608" y="128" width="234" height="154" rx="4" fill="#FAF7F2"/>
  <!-- Cabinet handles -->
  <rect x="488" y="195" width="6" height="30" rx="3" fill="#4A6B50" opacity="0.6"/>
  <rect x="706" y="195" width="6" height="30" rx="3" fill="#4A6B50" opacity="0.6"/>

  <!-- Labeled jar 1 (FLOUR) -->
  <rect x="380" y="225" width="55" height="80" rx="6" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="1.5"/>
  <ellipse cx="407" cy="225" rx="28" ry="6" fill="#6B8F71"/>
  <rect x="390" y="250" width="35" height="14" rx="3" fill="#FAF7F2" stroke="#B5D4BB" stroke-width="1"/>
  <text x="407" y="260" text-anchor="middle" fill="#4A6B50" font-size="7" font-family="system-ui" font-weight="600">FLOUR</text>
  <!-- Jar contents hint -->
  <rect x="385" y="270" width="45" height="30" rx="3" fill="#FAF7F2" opacity="0.5"/>

  <!-- Labeled jar 2 (SUGAR) -->
  <rect x="450" y="235" width="50" height="70" rx="6" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="1.5"/>
  <ellipse cx="475" cy="235" rx="25" ry="5" fill="#6B8F71"/>
  <rect x="458" y="255" width="35" height="14" rx="3" fill="#FAF7F2" stroke="#B5D4BB" stroke-width="1"/>
  <text x="475" y="265" text-anchor="middle" fill="#4A6B50" font-size="7" font-family="system-ui" font-weight="600">SUGAR</text>

  <!-- Labeled jar 3 (RICE) -->
  <rect x="515" y="228" width="48" height="76" rx="6" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="1.5"/>
  <ellipse cx="539" cy="228" rx="24" ry="5" fill="#4A6B50"/>
  <rect x="523" y="250" width="33" height="14" rx="3" fill="#FAF7F2" stroke="#B5D4BB" stroke-width="1"/>
  <text x="539" y="260" text-anchor="middle" fill="#4A6B50" font-size="7" font-family="system-ui" font-weight="600">RICE</text>

  <!-- Labeled jar 4 (OATS) -->
  <rect x="578" y="232" width="52" height="73" rx="6" fill="#E0D8CF" stroke="#D8D0C8" stroke-width="1.5"/>
  <ellipse cx="604" cy="232" rx="26" ry="5" fill="#C4622D" opacity="0.6"/>
  <rect x="588" y="254" width="33" height="14" rx="3" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1"/>
  <text x="604" y="264" text-anchor="middle" fill="#C4622D" font-size="7" font-family="system-ui" font-weight="600">OATS</text>

  <!-- Pendant light -->
  <line x1="600" y1="50" x2="600" y2="90" stroke="#D8D0C8" stroke-width="2"/>
  <path d="M570 90 Q600 80 630 90 L625 115 Q600 120 575 115 Z" fill="#F0E8D8" stroke="#D8D0C8" stroke-width="1.5"/>
  <!-- Light glow -->
  <ellipse cx="600" cy="115" rx="40" ry="8" fill="#F8F0D0" opacity="0.4"/>

  <!-- Step stool (left side) -->
  <rect x="230" y="360" width="80" height="14" rx="4" fill="#C4622D" opacity="0.7"/>
  <rect x="235" y="374" width="10" height="60" rx="2" fill="#C4622D" opacity="0.6"/>
  <rect x="295" y="374" width="10" height="60" rx="2" fill="#C4622D" opacity="0.6"/>
  <!-- Step -->
  <rect x="238" y="400" width="64" height="10" rx="3" fill="#C4622D" opacity="0.5"/>
  <!-- Non-slip dots on step -->
  <circle cx="255" cy="365" r="2" fill="#FAF7F2" opacity="0.5"/>
  <circle cx="270" cy="365" r="2" fill="#FAF7F2" opacity="0.5"/>
  <circle cx="285" cy="365" r="2" fill="#FAF7F2" opacity="0.5"/>

  <!-- Potted herb on counter -->
  <rect x="700" y="275" width="35" height="30" rx="4" fill="#C4622D" opacity="0.5"/>
  ${herbSprig(718, 278, 0.6)}

  ${dots([[160,160,6,'#C4622D',0.45],[880,150,5,'#6B8F71',0.4],[950,300,5,'#C4622D',0.3]])}`;
  },

  'meal-prep-for-seniors': () => {
    // Multiple labeled containers in a row + fresh ingredients + calendar
    return `
  <!-- Container row -->
  <!-- Container 1 (greens) -->
  <rect x="240" y="230" width="130" height="95" rx="10" fill="#D8E8DA"/>
  <rect x="240" y="230" width="130" height="20" rx="10" fill="#6B8F71"/>
  <rect x="240" y="242" width="130" height="8" fill="#6B8F71"/>
  <!-- Lid clips -->
  <rect x="252" y="225" width="16" height="10" rx="3" fill="#4A6B50"/>
  <rect x="350" y="225" width="16" height="10" rx="3" fill="#4A6B50"/>
  <!-- Contents: chicken + broccoli -->
  <ellipse cx="285" cy="285" rx="28" ry="18" fill="#D4885A" opacity="0.7"/>
  <circle cx="335" cy="280" r="14" fill="#5A8840"/>
  <circle cx="335" cy="278" r="9" fill="#70A050" opacity="0.7"/>
  <!-- Label strip -->
  <rect x="255" y="315" width="55" height="6" rx="3" fill="#4A6B50" opacity="0.4"/>

  <!-- Container 2 (salmon) -->
  <rect x="400" y="230" width="130" height="95" rx="10" fill="#E8DDD8"/>
  <rect x="400" y="230" width="130" height="20" rx="10" fill="#C4622D" opacity="0.7"/>
  <rect x="400" y="242" width="130" height="8" fill="#C4622D" opacity="0.7"/>
  <rect x="412" y="225" width="16" height="10" rx="3" fill="#C4622D"/>
  <rect x="510" y="225" width="16" height="10" rx="3" fill="#C4622D"/>
  <!-- Contents: salmon + quinoa -->
  <path d="M420 275 Q460 262 500 275 Q490 290 460 292 Q430 290 420 275 Z" fill="#E07050" opacity="0.6"/>
  <ellipse cx="465" cy="300" rx="32" ry="10" fill="#E8DFB8" opacity="0.7"/>
  <rect x="415" y="315" width="55" height="6" rx="3" fill="#C4622D" opacity="0.3"/>

  <!-- Container 3 (soup) -->
  <rect x="560" y="230" width="130" height="95" rx="10" fill="#E8E0D8"/>
  <rect x="560" y="230" width="130" height="20" rx="10" fill="#8A7868"/>
  <rect x="560" y="242" width="130" height="8" fill="#8A7868"/>
  <rect x="572" y="225" width="16" height="10" rx="3" fill="#8A7868"/>
  <rect x="670" y="225" width="16" height="10" rx="3" fill="#8A7868"/>
  <!-- Contents: lentil soup -->
  <rect x="573" y="262" width="104" height="52" rx="6" fill="#C89050" opacity="0.6"/>
  <circle cx="600" cy="280" r="6" fill="#B07840" opacity="0.7"/>
  <circle cx="618" cy="275" r="5" fill="#A86830" opacity="0.7"/>
  <circle cx="638" cy="282" r="6" fill="#B07840" opacity="0.7"/>
  <circle cx="655" cy="276" r="5" fill="#A86830" opacity="0.7"/>
  <rect x="575" y="315" width="55" height="6" rx="3" fill="#8A7868" opacity="0.3"/>

  <!-- Fresh ingredients cluster below -->
  <!-- Tomato -->
  <circle cx="340" cy="390" r="18" fill="#C4622D" opacity="0.5"/>
  <path d="M334 378 Q340 373 346 378" stroke="#4A6B50" stroke-width="1.5" fill="none" opacity="0.6"/>
  <!-- Lemon -->
  <ellipse cx="390" cy="395" rx="20" ry="16" fill="#F8D830" opacity="0.6"/>
  <ellipse cx="390" cy="393" rx="15" ry="11" fill="#FDE860" opacity="0.4"/>
  <!-- Avocado -->
  <ellipse cx="445" cy="392" rx="18" ry="22" fill="#6B8F71"/>
  <ellipse cx="445" cy="392" rx="11" ry="14" fill="#B5D4BB"/>
  <circle cx="445" cy="395" r="6" fill="#4A6B50"/>

  <!-- Calendar (right side) -->
  <rect x="780" y="200" width="140" height="140" rx="10" fill="#E0D8CF"/>
  <rect x="780" y="200" width="140" height="32" rx="10" fill="#6B8F71"/>
  <rect x="780" y="220" width="140" height="12" fill="#6B8F71"/>
  <text x="850" y="222" text-anchor="middle" fill="#FAF7F2" font-size="12" font-family="system-ui" font-weight="700">THIS WEEK</text>
  <!-- Day grid -->
  <g fill="#4A6B50" font-size="10" font-family="system-ui" text-anchor="middle">
    <text x="802" y="258">M</text><text x="822" y="258">T</text><text x="842" y="258">W</text><text x="862" y="258">T</text><text x="882" y="258">F</text><text x="902" y="258">S</text>
  </g>
  <!-- Checkmarks -->
  <circle cx="802" cy="278" r="8" fill="#6B8F71"/>
  <path d="M797 278 L801 282 L808 274" stroke="#FAF7F2" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <circle cx="822" cy="278" r="8" fill="#6B8F71"/>
  <path d="M817 278 L821 282 L828 274" stroke="#FAF7F2" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <circle cx="842" cy="278" r="8" fill="#6B8F71"/>
  <path d="M837 278 L841 282 L848 274" stroke="#FAF7F2" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <circle cx="862" cy="278" r="8" fill="#E0D8CF" stroke="#6B8F71" stroke-width="1.5"/>
  <circle cx="882" cy="278" r="8" fill="#E0D8CF" stroke="#6B8F71" stroke-width="1.5"/>

  ${dots([[180,185,6,'#C4622D',0.45],[950,195,5,'#6B8F71',0.4]])}`;
  },

  'adaptive-cooking': () => {
    // One-handed cutting board + weighted utensil + non-slip bowl
    return `
  <!-- One-handed cutting board -->
  <rect x="180" y="240" width="240" height="160" rx="12" fill="#D4B882"/>
  <rect x="188" y="248" width="224" height="144" rx="8" fill="#DCC090"/>
  <!-- Corner nails/grip -->
  <circle cx="200" cy="260" r="5" fill="#B09060" opacity="0.6"/>
  <circle cx="200" cy="376" r="5" fill="#B09060" opacity="0.6"/>
  <circle cx="400" cy="260" r="5" fill="#B09060" opacity="0.6"/>
  <circle cx="400" cy="376" r="5" fill="#B09060" opacity="0.6"/>
  <!-- Prongs/spikes on board for holding food -->
  <rect x="260" y="290" width="5" height="18" rx="1" fill="#A0A0A0"/>
  <rect x="275" y="290" width="5" height="18" rx="1" fill="#A0A0A0"/>
  <rect x="260" y="330" width="5" height="18" rx="1" fill="#A0A0A0"/>
  <rect x="275" y="330" width="5" height="18" rx="1" fill="#A0A0A0"/>
  <!-- Corner guard / edge stopper -->
  <rect x="350" y="248" width="62" height="12" rx="3" fill="#4A6B50"/>
  <rect x="398" y="248" width="14" height="144" rx="3" fill="#4A6B50"/>
  <!-- Veggie on board -->
  <ellipse cx="320" cy="320" rx="35" ry="22" fill="#C4622D" opacity="0.5"/>
  <line x1="310" y1="305" x2="310" y2="338" stroke="#A0A0A0" stroke-width="1.5" opacity="0.4" stroke-dasharray="3,3"/>

  <!-- Weighted utensil (center) -->
  <!-- Handle (thick, weighted) -->
  <rect x="530" y="220" width="22" height="155" rx="11" fill="#D8D0C8"/>
  <!-- Weight section (darker, heavier part) -->
  <rect x="526" y="310" width="30" height="55" rx="10" fill="#4A6B50"/>
  <!-- Grip texture -->
  <line x1="533" y1="320" x2="549" y2="320" stroke="#6B8F71" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
  <line x1="533" y1="332" x2="549" y2="332" stroke="#6B8F71" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
  <line x1="533" y1="344" x2="549" y2="344" stroke="#6B8F71" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
  <!-- Spoon bowl -->
  <ellipse cx="541" cy="210" rx="28" ry="36" fill="#E0D8CF"/>
  <ellipse cx="541" cy="210" rx="20" ry="26" fill="#D8D0C8" opacity="0.5"/>

  <!-- Non-slip bowl (right) -->
  <path d="M700 300 Q710 380 830 380 Q950 380 960 300 Z" fill="#D8D0C8"/>
  <!-- Rubber non-slip base -->
  <rect x="720" y="372" width="220" height="16" rx="6" fill="#C4622D" opacity="0.45"/>
  <!-- Bowl rim -->
  <ellipse cx="830" cy="300" rx="130" ry="38" fill="#E0D8CF"/>
  <ellipse cx="830" cy="297" rx="112" ry="30" fill="#FAF7F2"/>
  <!-- Food inside bowl -->
  <ellipse cx="830" cy="295" rx="95" ry="24" fill="#B5D4BB" opacity="0.5"/>
  <circle cx="805" cy="290" r="12" fill="#6B8F71" opacity="0.4"/>
  <circle cx="845" cy="288" r="10" fill="#4A6B50" opacity="0.4"/>
  <circle cx="865" cy="292" r="8" fill="#6B8F71" opacity="0.35"/>
  <!-- Suction cup indicators -->
  <circle cx="760" cy="385" r="5" fill="#C4622D" opacity="0.3"/>
  <circle cx="830" cy="387" r="5" fill="#C4622D" opacity="0.3"/>
  <circle cx="900" cy="385" r="5" fill="#C4622D" opacity="0.3"/>

  ${dots([[470,180,6,'#C4622D',0.5],[650,175,5,'#6B8F71',0.4],[160,200,5,'#6B8F71',0.35]])}`;
  },

  'caregiver-meal-support': () => {
    // Two figures (one standing, one seated) + steaming bowl between them
    return `
  <!-- Seated person (senior) -->
  <!-- Chair -->
  <rect x="280" y="290" width="120" height="10" rx="4" fill="#D8D0C8"/>
  <rect x="280" y="300" width="10" height="80" rx="3" fill="#D8D0C8"/>
  <rect x="390" y="300" width="10" height="80" rx="3" fill="#D8D0C8"/>
  <rect x="385" y="235" width="12" height="65" rx="4" fill="#D8D0C8"/>
  <rect x="280" y="230" width="120" height="10" rx="4" fill="#D8D0C8"/>
  <!-- Person sitting -->
  <circle cx="340" cy="215" r="28" fill="#E0D8CF"/>
  <!-- Hair -->
  <path d="M315 205 Q340 185 365 205" fill="#B0A090" opacity="0.5"/>
  <!-- Body -->
  <path d="M312 248 Q340 240 368 248 L372 295 L308 295 Z" fill="#E8F0E9"/>
  <!-- Arms -->
  <path d="M312 260 Q290 275 305 290" stroke="#E0D8CF" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M368 260 Q400 270 420 260" stroke="#E0D8CF" stroke-width="8" fill="none" stroke-linecap="round"/>

  <!-- Standing person (caregiver) -->
  <circle cx="750" cy="180" r="30" fill="#B5D4BB"/>
  <!-- Body -->
  <path d="M718 215 Q750 205 782 215 L790 350 L710 350 Z" fill="#6B8F71"/>
  <!-- Apron -->
  <path d="M725 250 Q750 245 775 250 L778 350 L722 350 Z" fill="#E8F0E9" opacity="0.6"/>
  <!-- Arms reaching forward with bowl -->
  <path d="M718 235 Q680 260 660 270" stroke="#B5D4BB" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M782 235 Q800 255 790 280" stroke="#B5D4BB" stroke-width="9" fill="none" stroke-linecap="round"/>

  <!-- Steaming bowl between them (center) -->
  <path d="M480 330 Q490 390 570 390 Q650 390 660 330 Z" fill="#D8D0C8"/>
  <ellipse cx="570" cy="330" rx="90" ry="28" fill="#E0D8CF"/>
  <ellipse cx="570" cy="327" rx="75" ry="22" fill="#B5D4BB" opacity="0.5"/>
  <!-- Food contents -->
  <circle cx="545" cy="322" r="10" fill="#6B8F71" opacity="0.4"/>
  <circle cx="575" cy="320" r="8" fill="#4A6B50" opacity="0.4"/>
  <circle cx="595" cy="324" r="9" fill="#C4622D" opacity="0.3"/>
  ${steam(570, 298, 3, 25)}

  <!-- Warm heart accent -->
  <path d="M555 410 Q555 398 565 398 Q575 398 575 410 Q575 398 585 398 Q595 398 595 410 Q595 425 575 435 Q555 425 555 410 Z" fill="#C4622D" opacity="0.35"/>

  ${dots([[180,170,6,'#C4622D',0.4],[880,180,5,'#6B8F71',0.4],[850,350,4,'#C4622D',0.3]])}`;
  },

  'post-surgery-meal-prep': () => {
    // Bandage/cross symbol + protein-rich foods + recovery timeline
    return `
  <!-- Red cross / medical symbol -->
  <rect x="160" y="195" width="100" height="100" rx="18" fill="#6B8F71"/>
  <rect x="195" y="208" width="30" height="74" rx="6" fill="#FAF7F2"/>
  <rect x="173" y="230" width="74" height="30" rx="6" fill="#FAF7F2"/>

  <!-- Protein-rich foods arrangement (center) -->
  <!-- Large bowl of bone broth -->
  <path d="M430 290 Q440 360 560 360 Q680 360 690 290 Z" fill="#D8D0C8"/>
  <ellipse cx="560" cy="290" rx="130" ry="36" fill="#E0D8CF"/>
  <ellipse cx="560" cy="287" rx="112" ry="28" fill="#D4B882" opacity="0.5"/>
  ${steam(560, 250)}
  <!-- Broth detail -->
  <ellipse cx="540" cy="282" rx="20" ry="6" fill="#C89050" opacity="0.3"/>

  <!-- Eggs beside bowl -->
  <ellipse cx="740" cy="310" rx="22" ry="28" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1.5"/>
  <ellipse cx="770" cy="315" rx="20" ry="26" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1.5"/>
  <!-- Egg highlight -->
  <ellipse cx="737" cy="302" rx="8" ry="10" fill="#FFFFFF" opacity="0.4"/>

  <!-- Greek yogurt cup -->
  <path d="M790 270 L785 340 Q785 350 800 350 L850 350 Q865 350 865 340 L860 270 Z" fill="#E8F0E9"/>
  <rect x="788" y="265" width="74" height="12" rx="4" fill="#6B8F71" opacity="0.6"/>
  <text x="825" y="315" text-anchor="middle" fill="#4A6B50" font-size="9" font-family="system-ui" opacity="0.6">YOGURT</text>

  <!-- Recovery timeline bar (bottom) -->
  <rect x="280" y="420" width="640" height="8" rx="4" fill="#E0D8CF"/>
  <!-- Progress fill -->
  <rect x="280" y="420" width="400" height="8" rx="4" fill="#6B8F71" opacity="0.6"/>
  <!-- Timeline markers -->
  <circle cx="280" cy="424" r="10" fill="#6B8F71"/>
  <text x="280" y="455" text-anchor="middle" fill="#4A6B50" font-size="9" font-family="system-ui">Day 1</text>
  <circle cx="470" cy="424" r="10" fill="#6B8F71"/>
  <text x="470" y="455" text-anchor="middle" fill="#4A6B50" font-size="9" font-family="system-ui">Week 1</text>
  <circle cx="680" cy="424" r="10" fill="#6B8F71" opacity="0.5"/>
  <text x="680" y="455" text-anchor="middle" fill="#4A6B50" font-size="9" font-family="system-ui">Week 2</text>
  <circle cx="920" cy="424" r="10" fill="#E0D8CF" stroke="#6B8F71" stroke-width="2"/>
  <text x="920" y="455" text-anchor="middle" fill="#4A6B50" font-size="9" font-family="system-ui">Healed</text>
  <!-- Arrow on timeline -->
  <path d="M688 424 L710 424" stroke="#6B8F71" stroke-width="2" stroke-linecap="round" opacity="0.5" stroke-dasharray="4,3"/>

  ${dots([[140,320,5,'#C4622D',0.4],[950,200,6,'#6B8F71',0.35]])}`;
  },

  'weekly-meal-prep': () => {
    // 7 containers in a row (Mon-Sun) + shopping bag
    return `
  <!-- Row of 7 mini containers -->
  <g>
    <!-- Mon -->
    <rect x="170" y="220" width="95" height="70" rx="8" fill="#D8E8DA"/>
    <rect x="170" y="220" width="95" height="14" rx="8" fill="#6B8F71"/>
    <text x="217" y="270" text-anchor="middle" fill="#4A6B50" font-size="10" font-family="system-ui" font-weight="600">MON</text>
    <circle cx="217" cy="290" r="3" fill="#6B8F71" opacity="0.6"/>
    <!-- Tue -->
    <rect x="275" y="220" width="95" height="70" rx="8" fill="#E8DDD8"/>
    <rect x="275" y="220" width="95" height="14" rx="8" fill="#C4622D" opacity="0.6"/>
    <text x="322" y="270" text-anchor="middle" fill="#C4622D" font-size="10" font-family="system-ui" font-weight="600">TUE</text>
    <!-- Wed -->
    <rect x="380" y="220" width="95" height="70" rx="8" fill="#D8E8DA"/>
    <rect x="380" y="220" width="95" height="14" rx="8" fill="#4A6B50"/>
    <text x="427" y="270" text-anchor="middle" fill="#4A6B50" font-size="10" font-family="system-ui" font-weight="600">WED</text>
    <!-- Thu -->
    <rect x="485" y="220" width="95" height="70" rx="8" fill="#E8E0D8"/>
    <rect x="485" y="220" width="95" height="14" rx="8" fill="#8A7868"/>
    <text x="532" y="270" text-anchor="middle" fill="#8A7868" font-size="10" font-family="system-ui" font-weight="600">THU</text>
    <!-- Fri -->
    <rect x="590" y="220" width="95" height="70" rx="8" fill="#D8E8DA"/>
    <rect x="590" y="220" width="95" height="14" rx="8" fill="#6B8F71"/>
    <text x="637" y="270" text-anchor="middle" fill="#4A6B50" font-size="10" font-family="system-ui" font-weight="600">FRI</text>
    <!-- Sat -->
    <rect x="695" y="220" width="95" height="70" rx="8" fill="#E0D8CF"/>
    <rect x="695" y="220" width="95" height="14" rx="8" fill="#D8D0C8"/>
    <text x="742" y="270" text-anchor="middle" fill="#8A7868" font-size="10" font-family="system-ui" font-weight="600">SAT</text>
    <!-- Sun -->
    <rect x="800" y="220" width="95" height="70" rx="8" fill="#E0D8CF"/>
    <rect x="800" y="220" width="95" height="14" rx="8" fill="#D8D0C8"/>
    <text x="847" y="270" text-anchor="middle" fill="#8A7868" font-size="10" font-family="system-ui" font-weight="600">SUN</text>
  </g>
  <!-- Checkmarks on weekday containers -->
  <g stroke="#FAF7F2" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M211 226 L215 230 L224 222"/>
    <path d="M316 226 L320 230 L329 222"/>
    <path d="M421 226 L425 230 L434 222"/>
  </g>

  <!-- Shopping bag (bottom left) -->
  <rect x="250" y="355" width="100" height="115" rx="8" fill="#D4B882"/>
  <rect x="258" y="363" width="84" height="100" rx="4" fill="#DCC090" opacity="0.7"/>
  <!-- Bag handles -->
  <path d="M275 355 Q275 335 300 335 Q325 335 325 355" fill="none" stroke="#C4A870" stroke-width="4" stroke-linecap="round"/>
  <!-- Food peeking out -->
  <ellipse cx="280" cy="370" rx="12" ry="8" fill="#6B8F71" opacity="0.6" transform="rotate(-15 280 370)"/>
  <path d="M310 358 L315 340 L320 358" fill="#C4622D" opacity="0.5"/>
  <circle cx="330" cy="368" r="8" fill="#F8D830" opacity="0.5"/>

  <!-- Grocery list (bottom right) -->
  <rect x="750" y="355" width="120" height="115" rx="6" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1.5"/>
  <rect x="765" y="375" width="70" height="5" rx="2.5" fill="#6B8F71" opacity="0.3"/>
  <rect x="765" y="388" width="55" height="5" rx="2.5" fill="#6B8F71" opacity="0.25"/>
  <rect x="765" y="401" width="65" height="5" rx="2.5" fill="#6B8F71" opacity="0.2"/>
  <rect x="765" y="414" width="50" height="5" rx="2.5" fill="#6B8F71" opacity="0.2"/>
  <text x="810" y="368" text-anchor="middle" fill="#4A6B50" font-size="9" font-family="system-ui" font-weight="600">GROCERY LIST</text>

  ${dots([[140,195,6,'#C4622D',0.5],[930,195,5,'#6B8F71',0.35],[600,170,4,'#C4622D',0.3]])}`;
  },

  'low-sodium-cooking': () => {
    // Herbs and spices (rosemary, basil, lemon) + salt shaker with X
    return `
  <!-- Salt shaker with X -->
  <rect x="200" y="230" width="75" height="135" rx="10" fill="#D8D0C8"/>
  <path d="M200 230 Q200 200 237 200 Q275 200 275 230" fill="#E0D8CF"/>
  <!-- Salt holes -->
  <circle cx="222" cy="215" r="3.5" fill="#FAF7F2"/>
  <circle cx="237" cy="212" r="3.5" fill="#FAF7F2"/>
  <circle cx="252" cy="215" r="3.5" fill="#FAF7F2"/>
  <!-- Red X over salt -->
  <line x1="185" y1="210" x2="290" y2="365" stroke="#C4622D" stroke-width="6" stroke-linecap="round" opacity="0.65"/>
  <line x1="290" y1="210" x2="185" y2="365" stroke="#C4622D" stroke-width="6" stroke-linecap="round" opacity="0.65"/>
  <!-- S letter on shaker -->
  <text x="237" y="300" text-anchor="middle" fill="#A0A0A0" font-size="28" font-family="system-ui" font-weight="700" opacity="0.4">S</text>

  <!-- Rosemary sprig (large, center) -->
  <g transform="translate(500, 400)">
    <line x1="0" y1="0" x2="20" y2="-160" stroke="#6B8F71" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="8" cy="-30" rx="16" ry="6" fill="#6B8F71" opacity="0.7" transform="rotate(-40 8 -30)"/>
    <ellipse cx="28" cy="-50" rx="16" ry="6" fill="#4A6B50" opacity="0.7" transform="rotate(30 28 -50)"/>
    <ellipse cx="10" cy="-70" rx="14" ry="5" fill="#6B8F71" opacity="0.65" transform="rotate(-35 10 -70)"/>
    <ellipse cx="30" cy="-90" rx="14" ry="5" fill="#4A6B50" opacity="0.6" transform="rotate(25 30 -90)"/>
    <ellipse cx="14" cy="-108" rx="12" ry="5" fill="#6B8F71" opacity="0.6" transform="rotate(-30 14 -108)"/>
    <ellipse cx="28" cy="-125" rx="10" ry="4" fill="#4A6B50" opacity="0.55" transform="rotate(20 28 -125)"/>
    <ellipse cx="18" cy="-142" rx="8" ry="4" fill="#6B8F71" opacity="0.5" transform="rotate(-20 18 -142)"/>
  </g>

  <!-- Basil leaves (right of rosemary) -->
  <g transform="translate(620, 350)">
    <line x1="0" y1="0" x2="0" y2="-60" stroke="#4A6B50" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M0 -20 Q-25 -35 -20 -55 Q-5 -50 0 -35" fill="#6B8F71" opacity="0.7"/>
    <path d="M0 -20 Q25 -35 20 -55 Q5 -50 0 -35" fill="#4A6B50" opacity="0.6"/>
    <path d="M0 -40 Q-20 -55 -15 -70 Q-3 -65 0 -52" fill="#6B8F71" opacity="0.6"/>
    <path d="M0 -40 Q20 -55 15 -70 Q3 -65 0 -52" fill="#4A6B50" opacity="0.55"/>
  </g>

  <!-- Lemon (center right) -->
  <ellipse cx="780" cy="300" rx="55" ry="42" fill="#F8D830" opacity="0.7"/>
  <ellipse cx="780" cy="297" rx="42" ry="32" fill="#FDE860" opacity="0.5"/>
  <!-- Lemon slice -->
  <circle cx="860" cy="330" r="30" fill="#F8D830" opacity="0.6"/>
  <circle cx="860" cy="330" r="22" fill="#FDE860" opacity="0.5"/>
  <line x1="860" y1="310" x2="860" y2="350" stroke="#D8A820" stroke-width="1.2" opacity="0.5"/>
  <line x1="842" y1="318" x2="878" y2="342" stroke="#D8A820" stroke-width="1.2" opacity="0.5"/>
  <line x1="878" y1="318" x2="842" y2="342" stroke="#D8A820" stroke-width="1.2" opacity="0.5"/>

  <!-- Garlic bulb -->
  <ellipse cx="720" cy="380" rx="22" ry="28" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1.5"/>
  <path d="M714 365 Q720 355 726 365" fill="#D8D0C8" opacity="0.6"/>
  <line x1="720" y1="358" x2="720" y2="380" stroke="#D8D0C8" stroke-width="1" opacity="0.4"/>

  <!-- Pepper grinder -->
  <rect x="920" y="240" width="40" height="100" rx="6" fill="#8A7858"/>
  <rect x="916" y="235" width="48" height="12" rx="4" fill="#6B8F71"/>
  <circle cx="940" cy="230" r="6" fill="#4A6B50"/>
  <rect x="924" y="290" width="32" height="4" rx="2" fill="#7A6848" opacity="0.5"/>
  <rect x="924" y="310" width="32" height="4" rx="2" fill="#7A6848" opacity="0.5"/>

  ${dots([[380,180,6,'#6B8F71',0.4],[140,400,5,'#C4622D',0.35],[960,180,4,'#C4622D',0.35]])}`;
  },

  'heart-healthy-meal-prep': () => {
    // Heart shape + salmon fillet + olive oil bottle + avocado
    return `
  <!-- Large heart -->
  <path d="M560 180 Q560 140 595 140 Q630 140 630 180 Q630 140 665 140 Q700 140 700 180 Q700 240 630 285 Q560 240 560 180 Z" fill="#C4622D" opacity="0.45"/>
  <path d="M572 182 Q572 150 600 150 Q628 150 628 182 Q628 150 656 150 Q684 150 684 182 Q684 234 628 272 Q572 234 572 182 Z" fill="#C4622D" opacity="0.25"/>
  <!-- Heartbeat line through -->
  <path d="M420 210 L540 210 L555 190 L575 235 L590 195 L600 210 L810 210" stroke="#6B8F71" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.35"/>

  <!-- Salmon fillet (bottom center) -->
  <path d="M420 360 Q520 330 620 360 Q600 395 520 400 Q440 395 420 360 Z" fill="#E07050"/>
  <path d="M435 362 Q520 340 605 362 Q590 388 520 392 Q450 388 435 362 Z" fill="#E89070" opacity="0.7"/>
  <!-- Fat lines on salmon -->
  <line x1="460" y1="365" x2="580" y2="365" stroke="#FAF7F2" stroke-width="1.5" opacity="0.5"/>
  <line x1="455" y1="377" x2="585" y2="377" stroke="#FAF7F2" stroke-width="1.5" opacity="0.5"/>
  <line x1="460" y1="389" x2="575" y2="389" stroke="#FAF7F2" stroke-width="1.5" opacity="0.4"/>
  <!-- Skin on bottom -->
  <path d="M430 385 Q520 395 610 385 Q598 400 520 405 Q445 400 430 385 Z" fill="#B05030" opacity="0.4"/>

  <!-- Olive oil bottle (left) -->
  <rect x="190" y="270" width="60" height="130" rx="8" fill="#B5D4BB" opacity="0.7"/>
  <rect x="205" y="250" width="30" height="25" rx="4" fill="#4A6B50"/>
  <rect x="210" y="240" width="20" height="14" rx="6" fill="#6B8F71"/>
  <!-- Oil level line -->
  <rect x="196" y="330" width="48" height="64" rx="4" fill="#D4B882" opacity="0.4"/>
  <!-- Label -->
  <rect x="200" y="290" width="40" height="18" rx="3" fill="#FAF7F2" opacity="0.6"/>
  <text x="220" y="303" text-anchor="middle" fill="#4A6B50" font-size="7" font-family="system-ui" font-weight="600">EVOO</text>

  <!-- Avocado half (right) -->
  <ellipse cx="820" cy="350" rx="55" ry="65" fill="#6B8F71"/>
  <ellipse cx="820" cy="350" rx="38" ry="48" fill="#B5D4BB"/>
  <circle cx="820" cy="358" r="20" fill="#4A6B50"/>
  <circle cx="815" cy="352" r="6" fill="#6B8F71" opacity="0.4"/>

  <!-- Walnuts scattered -->
  <ellipse cx="700" cy="430" rx="12" ry="10" fill="#A08060" opacity="0.5"/>
  <path d="M694 430 L706 430" stroke="#8A6840" stroke-width="1" opacity="0.5"/>
  <ellipse cx="730" cy="440" rx="10" ry="8" fill="#A08060" opacity="0.45"/>

  ${dots([[350,160,7,'#C4622D',0.5],[900,180,5,'#6B8F71',0.4],[150,220,5,'#6B8F71',0.35]])}`;
  },

  'renal-diet-meal-prep': () => {
    // Kidney shape + balanced plate + checklist
    return `
  <!-- Stylized kidney shape (large, left) -->
  <path d="M240 220 Q310 160 370 220 Q400 270 370 320 Q340 290 310 320 Q260 370 210 320 Q170 270 240 220 Z" fill="#C4622D" opacity="0.35"/>
  <path d="M248 228 Q310 175 362 228 Q388 270 362 312 Q335 286 310 312 Q265 356 220 312 Q185 270 248 228 Z" fill="#C4622D" opacity="0.2"/>
  <!-- Shield with check (kidney-safe) -->
  <path d="M310 250 L290 260 L290 290 Q290 310 310 320 Q330 310 330 290 L330 260 Z" fill="#6B8F71" opacity="0.7"/>
  <path d="M302 282 L308 288 L320 274" stroke="#FAF7F2" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Balanced plate (center) -->
  <circle cx="620" cy="300" r="130" fill="#E0D8CF"/>
  <circle cx="620" cy="300" r="115" fill="#FAF7F2"/>
  <circle cx="620" cy="300" r="120" fill="none" stroke="#D8D0C8" stroke-width="1.5"/>
  <!-- Low-potassium foods -->
  <ellipse cx="580" cy="270" rx="35" ry="22" fill="#B5D4BB" opacity="0.6"/>
  <!-- Apple slices -->
  <path d="M650 255 Q665 245 675 260 Q672 275 655 272 Q642 268 650 255 Z" fill="#C4622D" opacity="0.4"/>
  <!-- Rice -->
  <ellipse cx="600" cy="340" rx="40" ry="18" fill="#D4B882" opacity="0.5"/>
  <!-- Cauliflower -->
  <circle cx="660" cy="330" r="18" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1.5"/>
  <circle cx="655" cy="325" r="10" fill="#F0EAE0" opacity="0.7"/>

  <!-- Nutrition checklist (right) -->
  <rect x="830" y="200" width="150" height="200" rx="8" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1.5"/>
  <rect x="830" y="200" width="150" height="28" rx="8" fill="#6B8F71"/>
  <rect x="830" y="218" width="150" height="10" fill="#6B8F71"/>
  <text x="905" y="220" text-anchor="middle" fill="#FAF7F2" font-size="10" font-family="system-ui" font-weight="600">RENAL SAFE</text>
  <!-- Checklist items -->
  <rect x="848" y="245" width="12" height="12" rx="2" fill="#6B8F71"/>
  <path d="M851 251 L854 254 L858 248" stroke="#FAF7F2" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <rect x="868" y="247" width="60" height="5" rx="2.5" fill="#D8D0C8"/>
  <rect x="848" y="270" width="12" height="12" rx="2" fill="#6B8F71"/>
  <path d="M851 276 L854 279 L858 273" stroke="#FAF7F2" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <rect x="868" y="272" width="50" height="5" rx="2.5" fill="#D8D0C8"/>
  <rect x="848" y="295" width="12" height="12" rx="2" fill="#E0D8CF" stroke="#6B8F71" stroke-width="1.5"/>
  <rect x="868" y="297" width="55" height="5" rx="2.5" fill="#D8D0C8"/>
  <rect x="848" y="320" width="12" height="12" rx="2" fill="#E0D8CF" stroke="#6B8F71" stroke-width="1.5"/>
  <rect x="868" y="322" width="45" height="5" rx="2.5" fill="#D8D0C8"/>

  ${dots([[140,180,5,'#C4622D',0.45],[500,170,6,'#6B8F71',0.35]])}`;
  },

  'soft-food-meal-prep': () => {
    // Blender + smooth bowl + soft foods
    return `
  <!-- Blender (left) -->
  <path d="M230 210 L220 380 Q220 395 240 395 L330 395 Q350 395 350 380 L340 210 Z" fill="#E0D8CF"/>
  <rect x="225" y="200" width="120" height="18" rx="6" fill="#4A6B50"/>
  <!-- Blender lid knob -->
  <rect x="270" y="188" width="30" height="16" rx="6" fill="#6B8F71"/>
  <!-- Blending contents -->
  <path d="M234 240 L226 370 Q226 385 242 385 L328 385 Q344 385 344 370 L336 240 Z" fill="#B5D4BB" opacity="0.5"/>
  <!-- Swirl lines -->
  <path d="M260 280 Q285 270 310 290" stroke="#6B8F71" stroke-width="2" fill="none" opacity="0.3" stroke-linecap="round"/>
  <path d="M250 320 Q285 305 320 325" stroke="#6B8F71" stroke-width="2" fill="none" opacity="0.25" stroke-linecap="round"/>
  <!-- Base -->
  <rect x="215" y="395" width="140" height="25" rx="8" fill="#D8D0C8"/>
  <!-- Buttons -->
  <circle cx="260" cy="407" r="6" fill="#6B8F71"/>
  <circle cx="285" cy="407" r="6" fill="#4A6B50"/>
  <circle cx="310" cy="407" r="6" fill="#6B8F71"/>

  <!-- Smooth puree bowl (center) -->
  <path d="M480 310 Q490 390 610 390 Q730 390 740 310 Z" fill="#D8D0C8"/>
  <ellipse cx="610" cy="310" rx="130" ry="38" fill="#E0D8CF"/>
  <ellipse cx="610" cy="307" rx="112" ry="30" fill="#B5D4BB"/>
  <!-- Smooth swirl on top -->
  <path d="M560 300 Q585 290 610 305 Q635 290 660 300" stroke="#6B8F71" stroke-width="2" fill="none" opacity="0.35" stroke-linecap="round"/>
  ${steam(610, 270)}
  <!-- Garnish dollop -->
  <ellipse cx="610" cy="300" rx="12" ry="6" fill="#FAF7F2" opacity="0.6"/>

  <!-- Soft food samples (right) -->
  <!-- Mashed sweet potato -->
  <ellipse cx="860" cy="290" rx="45" ry="30" fill="#E08A30" opacity="0.5"/>
  <ellipse cx="860" cy="287" rx="35" ry="22" fill="#E8A040" opacity="0.4"/>
  <!-- Smooth applesauce -->
  <circle cx="900" cy="360" r="28" fill="#D4B882" opacity="0.5"/>
  <circle cx="900" cy="357" r="20" fill="#DCC090" opacity="0.4"/>
  <!-- Pudding cup -->
  <path d="M810 340 L806 390 Q806 400 820 400 L860 400 Q874 400 874 390 L870 340 Z" fill="#D8D0C8"/>
  <ellipse cx="840" cy="340" rx="30" ry="8" fill="#E0D8CF"/>
  <ellipse cx="840" cy="342" rx="24" ry="5" fill="#C89050" opacity="0.4"/>

  ${dots([[420,190,6,'#C4622D',0.45],[940,220,5,'#6B8F71',0.4],[180,170,5,'#C4622D',0.3]])}`;
  },

  'gluten-free-meal-prep': () => {
    // Wheat with X + fresh vegetable bowl + GF label
    return `
  <!-- Wheat stalk with X -->
  <g transform="translate(220, 220)">
    <line x1="30" y1="180" x2="45" y2="0" stroke="#D8D0C8" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="38" cy="20" rx="10" ry="22" fill="#D8D0C8" transform="rotate(-12 38 20)"/>
    <ellipse cx="52" cy="20" rx="10" ry="22" fill="#D8D0C8" transform="rotate(12 52 20)"/>
    <ellipse cx="40" cy="55" rx="9" ry="20" fill="#D8D0C8" transform="rotate(-10 40 55)"/>
    <ellipse cx="52" cy="55" rx="9" ry="20" fill="#D8D0C8" transform="rotate(10 52 55)"/>
    <ellipse cx="42" cy="88" rx="8" ry="18" fill="#D8D0C8" transform="rotate(-8 42 88)"/>
    <ellipse cx="52" cy="88" rx="8" ry="18" fill="#D8D0C8" transform="rotate(8 52 88)"/>
  </g>
  <!-- Red X -->
  <line x1="200" y1="210" x2="310" y2="400" stroke="#C4622D" stroke-width="6" stroke-linecap="round" opacity="0.65"/>
  <line x1="310" y1="210" x2="200" y2="400" stroke="#C4622D" stroke-width="6" stroke-linecap="round" opacity="0.65"/>

  <!-- GF badge -->
  <circle cx="260" cy="440" r="28" fill="#6B8F71"/>
  <text x="260" y="445" text-anchor="middle" fill="#FAF7F2" font-size="14" font-family="system-ui" font-weight="700">GF</text>

  <!-- Fresh vegetable bowl (center-right) -->
  <path d="M500 310 Q510 390 660 390 Q810 390 820 310 Z" fill="#D8D0C8"/>
  <ellipse cx="660" cy="310" rx="160" ry="45" fill="#E0D8CF"/>
  <ellipse cx="660" cy="307" rx="140" ry="38" fill="#FAF7F2"/>
  <!-- Colorful veggies inside -->
  <ellipse cx="610" cy="295" rx="30" ry="18" fill="#6B8F71" opacity="0.6" transform="rotate(-10 610 295)"/>
  <circle cx="660" cy="288" r="18" fill="#C4622D" opacity="0.5"/>
  <ellipse cx="710" cy="292" rx="25" ry="16" fill="#F8D830" opacity="0.5" transform="rotate(10 710 292)"/>
  <circle cx="640" cy="310" r="12" fill="#5A8840" opacity="0.5"/>
  <circle cx="680" cy="312" r="10" fill="#4A6B50" opacity="0.45"/>
  <!-- Cherry tomatoes -->
  <circle cx="720" cy="308" r="10" fill="#D04030" opacity="0.5"/>
  <circle cx="600" cy="310" r="8" fill="#D04030" opacity="0.4"/>

  <!-- Rice noodles (right) -->
  <g transform="translate(890, 280)">
    <path d="M0 0 Q10 30 5 60 Q0 90 10 120" stroke="#D4B882" stroke-width="3" fill="none" opacity="0.5" stroke-linecap="round"/>
    <path d="M15 0 Q25 30 20 60 Q15 90 25 120" stroke="#DCC090" stroke-width="3" fill="none" opacity="0.45" stroke-linecap="round"/>
    <path d="M30 0 Q40 30 35 60 Q30 90 40 120" stroke="#D4B882" stroke-width="3" fill="none" opacity="0.4" stroke-linecap="round"/>
  </g>

  ${dots([[150,180,5,'#6B8F71',0.45],[950,200,6,'#C4622D',0.4],[450,180,4,'#C4622D',0.3]])}`;
  },

  'anti-inflammatory-cooking': () => {
    // Turmeric root + ginger + berries + leafy greens
    return `
  <!-- Turmeric root (left) -->
  <path d="M200 270 Q270 240 330 275 Q310 310 250 318 Q190 305 200 270 Z" fill="#D8A030"/>
  <path d="M330 275 Q365 258 380 285 Q370 305 335 300 Z" fill="#C89020"/>
  <path d="M200 270 Q185 255 195 240 Q210 232 215 250 Z" fill="#D8A030" opacity="0.8"/>
  <!-- Turmeric powder scatter -->
  <circle cx="260" cy="340" r="4" fill="#D8A030" opacity="0.4"/>
  <circle cx="280" cy="345" r="3" fill="#D8A030" opacity="0.35"/>
  <circle cx="300" cy="338" r="3.5" fill="#D8A030" opacity="0.3"/>

  <!-- Ginger root (center-left) -->
  <path d="M420 310 Q470 285 530 318 Q515 350 465 358 Q418 340 420 310 Z" fill="#D8C090"/>
  <path d="M530 318 Q560 305 570 330 Q555 348 535 340 Z" fill="#C8B080"/>
  <path d="M420 310 Q400 295 410 278 Q425 270 430 290 Z" fill="#D8C090" opacity="0.8"/>

  <!-- Mixed berry cluster (center-right) -->
  <!-- Blueberries -->
  <circle cx="680" cy="290" r="14" fill="#4A6B50"/>
  <circle cx="680" cy="288" r="10" fill="#5A7860" opacity="0.5"/>
  <circle cx="700" cy="302" r="12" fill="#3A5A40"/>
  <circle cx="665" cy="308" r="13" fill="#4A6B50"/>
  <circle cx="665" cy="306" r="9" fill="#5A7860" opacity="0.5"/>
  <!-- Strawberry -->
  <path d="M720 280 Q735 260 740 285 Q738 305 725 308 Q712 305 720 280 Z" fill="#C4622D" opacity="0.6"/>
  <!-- Seed dots -->
  <circle cx="728" cy="288" r="1.5" fill="#FAF7F2" opacity="0.4"/>
  <circle cx="732" cy="296" r="1.5" fill="#FAF7F2" opacity="0.4"/>
  <!-- Raspberry -->
  <circle cx="695" cy="320" r="11" fill="#C4622D" opacity="0.5"/>
  <circle cx="692" cy="317" r="4" fill="#C4622D" opacity="0.7"/>
  <circle cx="698" cy="317" r="4" fill="#C4622D" opacity="0.7"/>
  <circle cx="695" cy="323" r="4" fill="#C4622D" opacity="0.7"/>

  <!-- Leafy greens (right) -->
  <g transform="translate(880, 320)">
    <ellipse cx="0" cy="-20" rx="40" ry="25" fill="#6B8F71" opacity="0.5" transform="rotate(-15 0 -20)"/>
    <ellipse cx="20" cy="-45" rx="35" ry="22" fill="#4A6B50" opacity="0.5" transform="rotate(10 20 -45)"/>
    <ellipse cx="-10" cy="-55" rx="30" ry="18" fill="#6B8F71" opacity="0.45" transform="rotate(-20 -10 -55)"/>
    <line x1="5" y1="0" x2="5" y2="-30" stroke="#4A6B50" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
  </g>

  <!-- Anti-inflammation shield icon (top center) -->
  <circle cx="600" cy="195" r="35" fill="#E8F0E9"/>
  <circle cx="600" cy="195" r="35" fill="none" stroke="#6B8F71" stroke-width="2.5"/>
  <!-- Flame with line through it -->
  <path d="M592 205 Q600 180 608 205 Q612 195 605 185 Q600 175 595 185 Q588 195 592 205 Z" fill="#C4622D" opacity="0.5"/>
  <line x1="580" y1="195" x2="620" y2="195" stroke="#6B8F71" stroke-width="3" stroke-linecap="round"/>

  ${dots([[140,200,6,'#C4622D',0.45],[770,180,5,'#6B8F71',0.4],[500,430,4,'#C4622D',0.3]])}`;
  },

  'allergen-free-cooking': () => {
    // Shield with checkmark + allergen icons with X + safe plate
    return `
  <!-- Large shield (center) -->
  <path d="M580 160 L520 190 L520 290 Q520 350 600 385 Q680 350 680 290 L680 190 Z" fill="#6B8F71"/>
  <path d="M588 174 L534 200 L534 286 Q534 340 604 370 Q674 340 674 286 L674 200 Z" fill="#E8F0E9"/>
  <!-- Checkmark in shield -->
  <path d="M565 275 L590 300 L640 240" stroke="#4A6B50" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Shield glow -->
  <path d="M580 160 L520 190 L520 290 Q520 350 600 385 Q680 350 680 290 L680 190 Z" fill="none" stroke="#B5D4BB" stroke-width="2"/>

  <!-- Allergen: Peanut with X (left) -->
  <circle cx="300" cy="230" r="32" fill="#E0D8CF"/>
  <ellipse cx="300" cy="230" rx="16" ry="22" fill="#D4B882" opacity="0.6"/>
  <line x1="300" y1="215" x2="300" y2="245" stroke="#C8A870" stroke-width="1.5" opacity="0.5"/>
  <line x1="278" y1="210" x2="322" y2="250" stroke="#C4622D" stroke-width="4" stroke-linecap="round"/>
  <line x1="322" y1="210" x2="278" y2="250" stroke="#C4622D" stroke-width="4" stroke-linecap="round"/>

  <!-- Allergen: Dairy with X (left bottom) -->
  <circle cx="280" cy="350" r="30" fill="#E0D8CF"/>
  <path d="M270 340 L268 370 Q268 375 280 375 L292 375 Q304 375 304 370 L302 340 Z" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1"/>
  <line x1="260" y1="330" x2="300" y2="370" stroke="#C4622D" stroke-width="4" stroke-linecap="round"/>
  <line x1="300" y1="330" x2="260" y2="370" stroke="#C4622D" stroke-width="4" stroke-linecap="round"/>

  <!-- Allergen: Gluten with X (right) -->
  <circle cx="900" cy="230" r="32" fill="#E0D8CF"/>
  <text x="900" y="237" text-anchor="middle" fill="#D8D0C8" font-size="22" font-family="system-ui" font-weight="700">W</text>
  <line x1="878" y1="210" x2="922" y2="250" stroke="#C4622D" stroke-width="4" stroke-linecap="round"/>
  <line x1="922" y1="210" x2="878" y2="250" stroke="#C4622D" stroke-width="4" stroke-linecap="round"/>

  <!-- Allergen: Egg with X (right bottom) -->
  <circle cx="920" cy="350" r="30" fill="#E0D8CF"/>
  <ellipse cx="920" cy="348" rx="14" ry="18" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1"/>
  <line x1="900" y1="330" x2="940" y2="370" stroke="#C4622D" stroke-width="4" stroke-linecap="round"/>
  <line x1="940" y1="330" x2="900" y2="370" stroke="#C4622D" stroke-width="4" stroke-linecap="round"/>

  <!-- Safe plate (bottom center) -->
  <ellipse cx="600" cy="440" rx="80" ry="22" fill="#E0D8CF"/>
  <ellipse cx="600" cy="437" rx="65" ry="17" fill="#FAF7F2"/>
  <circle cx="585" cy="433" r="8" fill="#6B8F71" opacity="0.5"/>
  <circle cx="610" cy="431" r="7" fill="#B5D4BB"/>
  <circle cx="630" cy="434" r="6" fill="#4A6B50" opacity="0.4"/>

  ${dots([[380,170,5,'#C4622D',0.4],[810,170,5,'#6B8F71',0.35]])}`;
  },

  'vegetarian-meal-prep': () => {
    // Colorful veggie bowl + avocado + tofu + leafy greens
    return `
  <!-- Large bowl -->
  <path d="M380 300 Q395 400 600 400 Q805 400 820 300 Z" fill="#D8D0C8"/>
  <ellipse cx="600" cy="300" rx="220" ry="60" fill="#E0D8CF"/>
  <ellipse cx="600" cy="296" rx="200" ry="52" fill="#FAF7F2"/>

  <!-- Leafy greens base -->
  <ellipse cx="540" cy="280" rx="45" ry="25" fill="#6B8F71" opacity="0.6" transform="rotate(-10 540 280)"/>
  <ellipse cx="620" cy="275" rx="40" ry="22" fill="#4A6B50" opacity="0.6" transform="rotate(12 620 275)"/>
  <ellipse cx="700" cy="282" rx="35" ry="20" fill="#6B8F71" opacity="0.55" transform="rotate(-5 700 282)"/>

  <!-- Avocado half -->
  <ellipse cx="500" cy="290" rx="28" ry="35" fill="#6B8F71"/>
  <ellipse cx="500" cy="290" rx="18" ry="24" fill="#B5D4BB"/>
  <circle cx="500" cy="295" r="10" fill="#4A6B50"/>
  <circle cx="497" cy="290" r="3" fill="#6B8F71" opacity="0.4"/>

  <!-- Cherry tomatoes -->
  <circle cx="650" cy="288" r="16" fill="#D04030" opacity="0.6"/>
  <circle cx="675" cy="282" r="14" fill="#C03020" opacity="0.55"/>
  <circle cx="660" cy="305" r="12" fill="#D04030" opacity="0.5"/>
  <!-- Tomato highlight -->
  <circle cx="647" cy="283" r="4" fill="#FAF7F2" opacity="0.3"/>

  <!-- Tofu cubes -->
  <rect x="555" y="285" width="22" height="22" rx="3" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1.2"/>
  <rect x="580" y="290" width="20" height="20" rx="3" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1.2"/>

  <!-- Carrot sticks -->
  <rect x="720" y="270" width="7" height="35" rx="3.5" fill="#C4622D" opacity="0.65" transform="rotate(-12 723 287)"/>
  <rect x="735" y="268" width="6" height="32" rx="3" fill="#C4622D" opacity="0.55" transform="rotate(-8 738 284)"/>
  <rect x="748" y="272" width="6" height="30" rx="3" fill="#C4622D" opacity="0.5" transform="rotate(-5 751 287)"/>

  <!-- Chickpeas -->
  <circle cx="590" cy="310" r="7" fill="#D4A860" opacity="0.6"/>
  <circle cx="607" cy="312" r="6" fill="#C89848" opacity="0.55"/>
  <circle cx="622" cy="315" r="7" fill="#D4A860" opacity="0.5"/>

  <!-- Leaf garnish on top -->
  <ellipse cx="600" cy="268" rx="18" ry="8" fill="#B5D4BB" transform="rotate(20 600 268)"/>
  <ellipse cx="615" cy="264" rx="14" ry="6" fill="#6B8F71" opacity="0.5" transform="rotate(-15 615 264)"/>

  ${herbSprig(190, 380, 0.7)}
  ${dots([[170,200,6,'#6B8F71',0.45],[900,200,5,'#C4622D',0.4],[850,350,4,'#6B8F71',0.3]])}`;
  },

  'holiday-meal-preparation': () => {
    // Festive platter + holly + star + candles
    return `
  <!-- Large oval platter -->
  <ellipse cx="600" cy="310" rx="200" ry="80" fill="#E0D8CF"/>
  <ellipse cx="600" cy="305" rx="180" ry="68" fill="#FAF7F2"/>
  <!-- Platter rim detail -->
  <ellipse cx="600" cy="310" rx="190" ry="74" fill="none" stroke="#D8D0C8" stroke-width="1.5"/>

  <!-- Roast centerpiece -->
  <ellipse cx="600" cy="295" rx="85" ry="48" fill="#C4622D" opacity="0.5"/>
  <ellipse cx="600" cy="290" rx="70" ry="38" fill="#C4622D" opacity="0.35"/>
  <!-- Grill marks -->
  <line x1="555" y1="280" x2="575" y2="300" stroke="#A34F23" stroke-width="2" opacity="0.3" stroke-linecap="round"/>
  <line x1="575" y1="275" x2="595" y2="295" stroke="#A34F23" stroke-width="2" opacity="0.3" stroke-linecap="round"/>
  <line x1="600" y1="273" x2="620" y2="293" stroke="#A34F23" stroke-width="2" opacity="0.3" stroke-linecap="round"/>

  <!-- Garnish around roast -->
  <circle cx="490" cy="305" r="12" fill="#6B8F71" opacity="0.5"/>
  <circle cx="510" cy="320" r="10" fill="#B5D4BB"/>
  <circle cx="700" cy="305" r="12" fill="#6B8F71" opacity="0.5"/>
  <circle cx="690" cy="322" r="10" fill="#B5D4BB"/>
  <circle cx="570" cy="340" r="8" fill="#6B8F71" opacity="0.4"/>
  <circle cx="630" cy="342" r="8" fill="#B5D4BB" opacity="0.6"/>

  <!-- Holly leaves (left) -->
  <ellipse cx="280" cy="210" rx="22" ry="10" fill="#4A6B50" transform="rotate(-30 280 210)"/>
  <ellipse cx="298" cy="204" rx="22" ry="10" fill="#6B8F71" transform="rotate(20 298 204)"/>
  <circle cx="289" cy="195" r="6" fill="#C4622D" opacity="0.65"/>
  <circle cx="281" cy="200" r="5" fill="#C4622D" opacity="0.55"/>

  <!-- Star decoration (top center) -->
  <polygon points="600,130 612,158 643,158 618,175 628,205 600,188 572,205 582,175 557,158 588,158" fill="#C4622D" opacity="0.4"/>
  <polygon points="600,140 609,160 632,160 614,172 621,195 600,182 579,195 586,172 568,160 591,160" fill="#C4622D" opacity="0.25"/>

  <!-- Candles (right) -->
  <rect x="850" y="225" width="14" height="80" rx="4" fill="#E0D8CF" stroke="#D8D0C8" stroke-width="1"/>
  <rect x="873" y="210" width="14" height="95" rx="4" fill="#C4622D" opacity="0.45"/>
  <!-- Flames -->
  <ellipse cx="857" cy="220" rx="6" ry="10" fill="#F8D830" opacity="0.6"/>
  <ellipse cx="857" cy="218" rx="3" ry="6" fill="#FAF7F2" opacity="0.5"/>
  <ellipse cx="880" cy="205" rx="6" ry="10" fill="#F8D830" opacity="0.6"/>
  <ellipse cx="880" cy="203" rx="3" ry="6" fill="#FAF7F2" opacity="0.5"/>

  ${dots([[180,170,5,'#C4622D',0.5],[930,180,6,'#6B8F71',0.35],[450,170,4,'#6B8F71',0.3]])}`;
  },

  'dementia-meal-support': () => {
    // Color-coded labeled containers + gentle brain outline + simple icons
    return `
  <!-- Gentle brain outline (top) -->
  <path d="M540 185 Q510 160 520 130 Q540 110 565 125 Q580 108 600 125 Q625 108 640 130 Q650 160 620 185 Q630 210 615 230 Q590 242 570 230 Q540 242 528 225 Q515 210 540 185 Z" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="2.5"/>
  <!-- Brain center line -->
  <path d="M575 130 Q580 180 575 225" stroke="#B5D4BB" stroke-width="1.5" fill="none" opacity="0.4"/>

  <!-- Color-coded containers with big labels and picture icons -->
  <!-- Breakfast (green) -->
  <rect x="200" y="310" width="150" height="110" rx="12" fill="#D8E8DA"/>
  <rect x="200" y="310" width="150" height="24" rx="12" fill="#6B8F71"/>
  <rect x="200" y="326" width="150" height="8" fill="#6B8F71"/>
  <text x="275" y="328" text-anchor="middle" fill="#FAF7F2" font-size="11" font-family="system-ui" font-weight="700">BREAKFAST</text>
  <!-- Bowl icon -->
  <path d="M245 370 Q250 395 275 395 Q300 395 305 370" fill="#4A6B50" opacity="0.3"/>
  <ellipse cx="275" cy="370" rx="30" ry="8" fill="#6B8F71" opacity="0.4"/>
  ${steam(275, 358, 2, 15)}

  <!-- Lunch (terracotta) -->
  <rect x="380" y="310" width="150" height="110" rx="12" fill="#F0E5E0"/>
  <rect x="380" y="310" width="150" height="24" rx="12" fill="#C4622D" opacity="0.7"/>
  <rect x="380" y="326" width="150" height="8" fill="#C4622D" opacity="0.7"/>
  <text x="455" y="328" text-anchor="middle" fill="#FAF7F2" font-size="11" font-family="system-ui" font-weight="700">LUNCH</text>
  <!-- Sandwich icon -->
  <rect x="430" y="365" width="50" height="28" rx="6" fill="#D4B882" opacity="0.5"/>
  <rect x="430" y="372" width="50" height="6" rx="0" fill="#6B8F71" opacity="0.3"/>
  <rect x="430" y="380" width="50" height="4" rx="0" fill="#C4622D" opacity="0.2"/>

  <!-- Dinner (sage) -->
  <rect x="560" y="310" width="150" height="110" rx="12" fill="#D8E8DA"/>
  <rect x="560" y="310" width="150" height="24" rx="12" fill="#4A6B50"/>
  <rect x="560" y="326" width="150" height="8" fill="#4A6B50"/>
  <text x="635" y="328" text-anchor="middle" fill="#FAF7F2" font-size="11" font-family="system-ui" font-weight="700">DINNER</text>
  <!-- Plate icon -->
  <circle cx="635" cy="380" r="22" fill="#E0D8CF" opacity="0.6"/>
  <circle cx="635" cy="378" r="16" fill="#FAF7F2" opacity="0.5"/>

  <!-- Snack (beige) -->
  <rect x="740" y="310" width="150" height="110" rx="12" fill="#E8E0D8"/>
  <rect x="740" y="310" width="150" height="24" rx="12" fill="#8A7868"/>
  <rect x="740" y="326" width="150" height="8" fill="#8A7868"/>
  <text x="815" y="328" text-anchor="middle" fill="#FAF7F2" font-size="11" font-family="system-ui" font-weight="700">SNACK</text>
  <!-- Apple icon -->
  <circle cx="815" cy="378" r="16" fill="#C4622D" opacity="0.4"/>
  <path d="M812 365 Q815 358 818 365" stroke="#4A6B50" stroke-width="1.5" fill="none"/>

  ${dots([[160,200,6,'#C4622D',0.45],[920,200,5,'#6B8F71',0.35],[680,170,4,'#C4622D',0.3]])}`;
  },

  'parkinsons-meal-prep': () => {
    // Non-slip bowl + weighted utensil + plate guard + grip aids
    return `
  <!-- Non-slip bowl (center) with rubber base -->
  <path d="M400 295 Q415 385 600 385 Q785 385 800 295 Z" fill="#D8D0C8"/>
  <!-- Rubber non-slip ring -->
  <rect x="420" y="375" width="360" height="20" rx="8" fill="#C4622D" opacity="0.4"/>
  <ellipse cx="600" cy="295" rx="200" ry="55" fill="#E0D8CF"/>
  <ellipse cx="600" cy="292" rx="180" ry="46" fill="#FAF7F2"/>
  <!-- Food inside -->
  <ellipse cx="600" cy="288" rx="155" ry="38" fill="#B5D4BB" opacity="0.4"/>
  <ellipse cx="570" cy="282" rx="30" ry="14" fill="#6B8F71" opacity="0.3"/>
  <ellipse cx="640" cy="280" rx="25" ry="12" fill="#4A6B50" opacity="0.3"/>
  <!-- Suction cup dots -->
  <circle cx="500" cy="392" r="6" fill="#C4622D" opacity="0.3"/>
  <circle cx="600" cy="394" r="6" fill="#C4622D" opacity="0.3"/>
  <circle cx="700" cy="392" r="6" fill="#C4622D" opacity="0.3"/>

  <!-- Plate guard (on rim) -->
  <path d="M440 270 Q445 240 480 242 Q495 244 495 265" fill="#4A6B50" opacity="0.5"/>

  <!-- Weighted spoon (left) -->
  <rect x="195" y="200" width="20" height="165" rx="10" fill="#D8D0C8"/>
  <!-- Weight section -->
  <rect x="190" y="305" width="30" height="50" rx="10" fill="#4A6B50"/>
  <!-- Grip grooves -->
  <line x1="198" y1="315" x2="212" y2="315" stroke="#6B8F71" stroke-width="2.5" opacity="0.4" stroke-linecap="round"/>
  <line x1="198" y1="328" x2="212" y2="328" stroke="#6B8F71" stroke-width="2.5" opacity="0.4" stroke-linecap="round"/>
  <line x1="198" y1="341" x2="212" y2="341" stroke="#6B8F71" stroke-width="2.5" opacity="0.4" stroke-linecap="round"/>
  <!-- Spoon bowl -->
  <ellipse cx="205" cy="192" rx="26" ry="35" fill="#E0D8CF"/>
  <ellipse cx="205" cy="192" rx="18" ry="25" fill="#D8D0C8" opacity="0.5"/>

  <!-- Weighted fork (far left) -->
  <rect x="130" y="210" width="16" height="155" rx="8" fill="#D8D0C8"/>
  <rect x="127" y="312" width="22" height="45" rx="8" fill="#4A6B50"/>
  <!-- Fork tines -->
  <rect x="130" y="185" width="4" height="30" rx="2" fill="#A0A0A0"/>
  <rect x="137" y="185" width="4" height="30" rx="2" fill="#A0A0A0"/>
  <rect x="144" y="185" width="4" height="30" rx="2" fill="#A0A0A0"/>

  <!-- Scoop plate (right) -->
  <ellipse cx="920" cy="310" rx="80" ry="60" fill="#E0D8CF"/>
  <ellipse cx="920" cy="306" rx="68" ry="50" fill="#FAF7F2"/>
  <!-- High curved lip -->
  <path d="M860 280 Q858 260 880 255 Q900 252 910 260" fill="#D8D0C8" opacity="0.6"/>

  ${dots([[300,170,6,'#C4622D',0.45],[850,180,5,'#6B8F71',0.4],[960,420,4,'#C4622D',0.3]])}`;
  },

  'arthritis-friendly-cooking': () => {
    // Large-grip jar opener + easy-open container + ergonomic knife
    return `
  <!-- Jar with electric opener (left) -->
  <rect x="180" y="240" width="110" height="150" rx="12" fill="#D8D0C8"/>
  <rect x="172" y="228" width="126" height="36" rx="10" fill="#6B8F71"/>
  <!-- Rubber grip on lid -->
  <rect x="168" y="222" width="134" height="12" rx="6" fill="#C4622D" opacity="0.7"/>
  <!-- Jar contents -->
  <ellipse cx="235" cy="340" rx="38" ry="28" fill="#B5D4BB" opacity="0.5"/>
  <!-- Electric opener arm -->
  <path d="M296 240 Q340 230 348 252 Q342 272 296 262 Z" fill="#4A6B50"/>
  <circle cx="346" cy="251" r="14" fill="#6B8F71"/>
  <circle cx="346" cy="251" r="8" fill="#FAF7F2" opacity="0.5"/>
  <!-- Power indicator -->
  <path d="M342 251 L354 251 M348 245 L354 252 L348 259" stroke="#FAF7F2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

  <!-- Ergonomic knife (center) -->
  <!-- Blade -->
  <path d="M520 280 Q650 262 740 310 Q680 332 520 338 Z" fill="#A0A0A0"/>
  <path d="M526 288 Q640 274 725 310 Q665 324 526 328 Z" fill="#D0D0D0" opacity="0.6"/>
  <!-- Bolster -->
  <rect x="504" y="272" width="20" height="72" rx="5" fill="#3A3A3A"/>
  <!-- Ergonomic handle -->
  <path d="M370 268 Q440 256 504 272 L504 344 Q440 358 370 348 Q320 340 318 310 Q318 280 370 268 Z" fill="#6B8F71"/>
  <!-- Grip grooves -->
  <line x1="400" y1="262" x2="400" y2="352" stroke="#4A6B50" stroke-width="3" opacity="0.35" stroke-linecap="round"/>
  <line x1="435" y1="260" x2="435" y2="354" stroke="#4A6B50" stroke-width="3" opacity="0.35" stroke-linecap="round"/>
  <line x1="470" y1="259" x2="470" y2="355" stroke="#4A6B50" stroke-width="3" opacity="0.35" stroke-linecap="round"/>
  <!-- End cap -->
  <ellipse cx="332" cy="310" rx="26" ry="38" fill="#4A6B50"/>

  <!-- Easy-pull tab containers (right) -->
  <rect x="810" y="250" width="100" height="70" rx="8" fill="#E0D8CF"/>
  <path d="M810 260 Q795 248 790 260 Q785 272 800 272 L810 268" fill="#C4622D" opacity="0.6"/>
  <rect x="820" y="258" width="30" height="5" rx="2.5" fill="#D8D0C8" opacity="0.5"/>
  <rect x="810" y="340" width="100" height="70" rx="8" fill="#E8F0E9"/>
  <path d="M810 350 Q795 338 790 350 Q785 362 800 362 L810 358" fill="#6B8F71" opacity="0.6"/>
  <rect x="820" y="348" width="30" height="5" rx="2.5" fill="#B5D4BB" opacity="0.5"/>

  ${dots([[160,190,6,'#C4622D',0.45],[950,200,5,'#6B8F71',0.4],[600,195,4,'#C4622D',0.3]])}`;
  },

  'stroke-recovery-meals': () => {
    // Brain outline + recovery arrow + nutritious plate + omega foods
    return `
  <!-- Brain outline (top left) -->
  <path d="M260 195 Q230 170 240 140 Q258 118 285 135 Q300 118 320 135 Q345 118 358 140 Q368 170 340 195 Q350 218 335 240 Q310 252 290 240 Q260 252 248 235 Q235 218 260 195 Z" fill="none" stroke="#6B8F71" stroke-width="3.5" opacity="0.5"/>
  <!-- Brain detail line -->
  <path d="M278 138 Q282 185 278 238" stroke="#6B8F71" stroke-width="1.5" fill="none" opacity="0.3"/>
  <!-- Recovery arrow curving from brain -->
  <path d="M370 190 Q420 160 460 185" stroke="#C4622D" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M452 174 L460 185 L448 188" fill="#C4622D"/>

  <!-- Nutritious plate (center) -->
  <circle cx="620" cy="310" r="130" fill="#E0D8CF"/>
  <circle cx="620" cy="310" r="115" fill="#FAF7F2"/>
  <!-- Omega-rich salmon -->
  <path d="M560 290 Q620 268 680 290 Q668 320 620 325 Q572 320 560 290 Z" fill="#E07050" opacity="0.6"/>
  <path d="M568 292 Q620 275 672 292 Q662 316 620 320 Q578 316 568 292 Z" fill="#E89070" opacity="0.4"/>
  <!-- Fat lines -->
  <line x1="585" y1="296" x2="655" y2="296" stroke="#FAF7F2" stroke-width="1.2" opacity="0.4"/>
  <line x1="582" y1="306" x2="658" y2="306" stroke="#FAF7F2" stroke-width="1.2" opacity="0.4"/>
  <!-- Blueberries cluster -->
  <circle cx="570" cy="340" r="10" fill="#4A6B50"/>
  <circle cx="585" cy="345" r="9" fill="#3A5A40"/>
  <circle cx="575" cy="352" r="8" fill="#4A6B50" opacity="0.8"/>
  <!-- Leafy greens -->
  <ellipse cx="660" cy="340" rx="25" ry="14" fill="#6B8F71" opacity="0.5" transform="rotate(-10 660 340)"/>
  <ellipse cx="680" cy="348" rx="20" ry="12" fill="#4A6B50" opacity="0.45" transform="rotate(15 680 348)"/>

  <!-- Avocado (right) -->
  <ellipse cx="860" cy="300" rx="45" ry="55" fill="#6B8F71"/>
  <ellipse cx="860" cy="300" rx="30" ry="38" fill="#B5D4BB"/>
  <circle cx="860" cy="308" r="16" fill="#4A6B50"/>
  <circle cx="856" cy="300" r="5" fill="#6B8F71" opacity="0.4"/>

  <!-- Walnuts (bottom) -->
  <ellipse cx="480" cy="420" rx="15" ry="12" fill="#A08060" opacity="0.5"/>
  <path d="M473 420 L487 420" stroke="#8A6840" stroke-width="1" opacity="0.5"/>
  <ellipse cx="515" cy="425" rx="13" ry="10" fill="#A08060" opacity="0.45"/>

  ${dots([[160,300,5,'#C4622D',0.4],[940,200,6,'#6B8F71',0.35],[400,420,4,'#6B8F71',0.3]])}`;
  },

  'cancer-nutrition-meals': () => {
    // Awareness ribbon + nourishing bowl + protein sources + berry cluster
    return `
  <!-- Awareness ribbon (left) -->
  <path d="M260 160 Q230 200 245 250 Q258 270 265 250 Q272 270 285 250 Q300 200 270 160 Z" fill="#C4622D" opacity="0.5"/>
  <path d="M245 250 Q225 290 205 305" stroke="#C4622D" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.5"/>
  <path d="M285 250 Q305 290 325 305" stroke="#C4622D" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.5"/>

  <!-- Nourishing bowl (center) -->
  <path d="M430 310 Q442 395 600 395 Q758 395 770 310 Z" fill="#D8D0C8"/>
  <ellipse cx="600" cy="310" rx="170" ry="48" fill="#E0D8CF"/>
  <ellipse cx="600" cy="307" rx="150" ry="40" fill="#FAF7F2"/>
  <!-- Nutrient-dense soup -->
  <ellipse cx="600" cy="304" rx="135" ry="34" fill="#B5D4BB" opacity="0.4"/>
  <!-- Protein chunks -->
  <ellipse cx="555" cy="298" rx="18" ry="12" fill="#D4885A" opacity="0.5"/>
  <ellipse cx="640" cy="295" rx="16" ry="10" fill="#D4885A" opacity="0.45"/>
  <!-- Greens -->
  <ellipse cx="600" cy="300" rx="12" ry="7" fill="#6B8F71" opacity="0.4"/>
  <ellipse cx="580" cy="310" rx="10" ry="6" fill="#4A6B50" opacity="0.35"/>
  ${steam(600, 262, 3, 28)}

  <!-- Berry cluster (right) -->
  <circle cx="870" cy="260" r="16" fill="#4A6B50"/>
  <circle cx="890" cy="272" r="14" fill="#3A5A40"/>
  <circle cx="875" cy="282" r="15" fill="#6B8F71"/>
  <circle cx="855" cy="275" r="13" fill="#4A6B50" opacity="0.8"/>
  <circle cx="895" cy="255" r="12" fill="#6B8F71" opacity="0.7"/>
  <!-- Berry highlights -->
  <circle cx="868" cy="256" r="3" fill="#FAF7F2" opacity="0.3"/>
  <circle cx="873" cy="278" r="3" fill="#FAF7F2" opacity="0.3"/>

  <!-- Protein source (egg) -->
  <ellipse cx="870" cy="360" rx="25" ry="32" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1.5"/>
  <ellipse cx="867" cy="352" rx="8" ry="10" fill="#FFFFFF" opacity="0.4"/>

  ${dots([[160,260,6,'#6B8F71',0.45],[950,200,5,'#C4622D',0.4],[400,175,4,'#C4622D',0.3]])}`;
  },

  'in-home-cooking-lessons': () => {
    // Open recipe book + cooking pot + utensils + timer
    return `
  <!-- Open recipe book -->
  <path d="M340 190 Q470 205 600 190 L600 370 Q470 385 340 370 Z" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="2"/>
  <path d="M600 190 Q730 205 860 190 L860 370 Q730 385 600 370 Z" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="2"/>
  <line x1="600" y1="190" x2="600" y2="370" stroke="#D8D0C8" stroke-width="2.5"/>
  <!-- Spine shadow -->
  <rect x="596" y="190" width="8" height="180" fill="#E0D8CF" opacity="0.3"/>
  <!-- Text lines - left page -->
  <rect x="375" y="225" width="110" height="5" rx="2.5" fill="#6B8F71" opacity="0.3"/>
  <rect x="375" y="240" width="90" height="5" rx="2.5" fill="#6B8F71" opacity="0.22"/>
  <rect x="375" y="255" width="100" height="5" rx="2.5" fill="#6B8F71" opacity="0.28"/>
  <rect x="375" y="270" width="75" height="5" rx="2.5" fill="#6B8F71" opacity="0.22"/>
  <!-- Small pot illustration on left page -->
  <ellipse cx="430" cy="320" rx="32" ry="10" fill="#D8D0C8"/>
  <path d="M398 320 Q405 355 430 355 Q455 355 462 320" fill="#E0D8CF"/>
  <path d="M395 320 L385 318" stroke="#D8D0C8" stroke-width="3" stroke-linecap="round"/>
  <path d="M465 320 L475 318" stroke="#D8D0C8" stroke-width="3" stroke-linecap="round"/>
  <!-- Right page with recipe steps -->
  <rect x="635" y="225" width="100" height="5" rx="2.5" fill="#C4622D" opacity="0.25"/>
  <rect x="635" y="240" width="80" height="5" rx="2.5" fill="#C4622D" opacity="0.2"/>
  <rect x="635" y="255" width="95" height="5" rx="2.5" fill="#C4622D" opacity="0.25"/>
  <rect x="635" y="270" width="70" height="5" rx="2.5" fill="#C4622D" opacity="0.2"/>
  <!-- Step numbers -->
  <circle cx="625" cy="228" r="6" fill="#C4622D" opacity="0.3"/>
  <circle cx="625" cy="243" r="6" fill="#C4622D" opacity="0.3"/>
  <circle cx="625" cy="258" r="6" fill="#C4622D" opacity="0.3"/>

  <!-- Wooden spoon and spatula crossed below -->
  <rect x="460" y="395" width="8" height="110" rx="4" fill="#D4B882" transform="rotate(-25 464 450)"/>
  <ellipse cx="460" cy="390" rx="18" ry="26" fill="#DCC090" transform="rotate(-25 460 390)"/>
  <rect x="530" y="395" width="8" height="110" rx="4" fill="#D4B882" transform="rotate(25 534 450)"/>
  <rect x="524" y="388" width="20" height="30" rx="3" fill="#DCC090" transform="rotate(25 534 403)"/>

  <!-- Timer (top right) -->
  <circle cx="920" cy="220" r="35" fill="#E0D8CF"/>
  <circle cx="920" cy="220" r="30" fill="#FAF7F2"/>
  <circle cx="920" cy="220" r="28" fill="none" stroke="#6B8F71" stroke-width="2"/>
  <!-- Timer hands -->
  <line x1="920" y1="220" x2="920" y2="200" stroke="#4A6B50" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="920" y1="220" x2="935" y2="228" stroke="#C4622D" stroke-width="2" stroke-linecap="round"/>
  <circle cx="920" cy="220" r="3" fill="#4A6B50"/>
  <!-- Timer button -->
  <rect x="916" y="182" width="8" height="10" rx="2" fill="#4A6B50"/>

  ${dots([[280,170,6,'#C4622D',0.4],[160,300,5,'#6B8F71',0.35],[950,350,4,'#C4622D',0.3]])}`;
  },

  'caregiver-cooking-training': () => {
    // Graduation cap + apron + steaming pot + certificate
    return `
  <!-- Apron (center-left) -->
  <path d="M380 240 Q430 232 480 240 L495 420 L365 420 Z" fill="#6B8F71"/>
  <path d="M380 240 Q355 252 342 275 L342 298 L375 286 L375 420 L365 420 L365 286" fill="#6B8F71"/>
  <path d="M480 240 Q505 252 518 275 L518 298 L485 286 L485 420 L495 420 L495 286" fill="#6B8F71"/>
  <!-- Apron pocket -->
  <rect x="400" y="330" width="60" height="40" rx="6" fill="#4A6B50"/>
  <!-- Apron tie -->
  <ellipse cx="398" cy="290" rx="14" ry="7" fill="#4A6B50" opacity="0.6" transform="rotate(-20 398 290)"/>
  <ellipse cx="462" cy="290" rx="14" ry="7" fill="#4A6B50" opacity="0.6" transform="rotate(20 462 290)"/>

  <!-- Graduation cap on top of apron -->
  <polygon points="430,175 355,210 430,235 505,210" fill="#4A6B50"/>
  <rect x="425" y="168" width="10" height="22" rx="2" fill="#4A6B50"/>
  <!-- Tassel -->
  <line x1="505" y1="210" x2="512" y2="240" stroke="#C4622D" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="512" cy="242" r="5" fill="#C4622D"/>

  <!-- Steaming pot (right) -->
  <rect x="650" y="295" width="140" height="85" rx="10" fill="#D8D0C8"/>
  <rect x="642" y="288" width="156" height="16" rx="6" fill="#E0D8CF"/>
  <!-- Pot handles -->
  <path d="M642 310 L625 310" stroke="#D8D0C8" stroke-width="6" stroke-linecap="round"/>
  <path d="M798 310 L815 310" stroke="#D8D0C8" stroke-width="6" stroke-linecap="round"/>
  <!-- Lid knob -->
  <rect x="710" y="278" width="20" height="12" rx="5" fill="#4A6B50"/>
  ${steam(720, 268, 3, 22)}

  <!-- Certificate (far right) -->
  <rect x="870" y="230" width="120" height="90" rx="6" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1.5"/>
  <!-- Certificate text lines -->
  <rect x="890" y="250" width="80" height="4" rx="2" fill="#6B8F71" opacity="0.3"/>
  <rect x="895" y="262" width="60" height="4" rx="2" fill="#6B8F71" opacity="0.25"/>
  <rect x="892" y="274" width="70" height="4" rx="2" fill="#6B8F71" opacity="0.2"/>
  <!-- Certificate seal -->
  <circle cx="930" cy="300" r="10" fill="#C4622D" opacity="0.4"/>
  <!-- Ribbon below seal -->
  <path d="M925 308 L922 322 M935 308 L938 322" stroke="#C4622D" stroke-width="2" stroke-linecap="round" opacity="0.4"/>

  ${dots([[300,160,5,'#C4622D',0.45],[580,180,6,'#6B8F71',0.35],[980,180,4,'#C4622D',0.3]])}`;
  },

  'kitchen-safety-assessment': () => {
    // Clipboard with checklist + safety shield + fire extinguisher + grab bar
    return `
  <!-- Clipboard (center) -->
  <rect x="420" y="155" width="200" height="280" rx="12" fill="#D8D0C8"/>
  <rect x="488" y="142" width="64" height="26" rx="8" fill="#4A6B50"/>
  <rect x="432" y="182" width="176" height="240" rx="6" fill="#FAF7F2"/>
  <!-- Checklist title -->
  <rect x="455" y="195" width="130" height="8" rx="4" fill="#6B8F71" opacity="0.4"/>
  <!-- Checklist items -->
  <rect x="458" y="220" width="14" height="14" rx="3" fill="#6B8F71"/>
  <path d="M461 227 L465 231 L471 223" stroke="#FAF7F2" stroke-width="2" fill="none" stroke-linecap="round"/>
  <rect x="480" y="223" width="100" height="6" rx="3" fill="#D8D0C8"/>
  <rect x="458" y="248" width="14" height="14" rx="3" fill="#6B8F71"/>
  <path d="M461 255 L465 259 L471 251" stroke="#FAF7F2" stroke-width="2" fill="none" stroke-linecap="round"/>
  <rect x="480" y="251" width="90" height="6" rx="3" fill="#D8D0C8"/>
  <rect x="458" y="276" width="14" height="14" rx="3" fill="#6B8F71"/>
  <path d="M461 283 L465 287 L471 279" stroke="#FAF7F2" stroke-width="2" fill="none" stroke-linecap="round"/>
  <rect x="480" y="279" width="95" height="6" rx="3" fill="#D8D0C8"/>
  <rect x="458" y="304" width="14" height="14" rx="3" fill="#E0D8CF" stroke="#6B8F71" stroke-width="1.5"/>
  <rect x="480" y="307" width="80" height="6" rx="3" fill="#D8D0C8"/>
  <rect x="458" y="332" width="14" height="14" rx="3" fill="#E0D8CF" stroke="#6B8F71" stroke-width="1.5"/>
  <rect x="480" y="335" width="70" height="6" rx="3" fill="#D8D0C8"/>
  <rect x="458" y="360" width="14" height="14" rx="3" fill="#E0D8CF" stroke="#6B8F71" stroke-width="1.5"/>
  <rect x="480" y="363" width="85" height="6" rx="3" fill="#D8D0C8"/>

  <!-- Safety shield (left) -->
  <path d="M230 210 L200 225 L200 285 Q200 325 240 345 Q280 325 280 285 L280 225 Z" fill="#C4622D" opacity="0.5"/>
  <path d="M236 220 L212 232 L212 280 Q212 315 244 332 Q276 315 276 280 L276 232 Z" fill="#FAF7F2" opacity="0.6"/>
  <path d="M228 270 L238 280 L258 256" stroke="#C4622D" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Grab bar (right) -->
  <rect x="750" y="250" width="120" height="10" rx="5" fill="#4A6B50"/>
  <circle cx="755" cy="255" r="10" fill="#4A6B50"/>
  <circle cx="865" cy="255" r="10" fill="#4A6B50"/>
  <circle cx="755" cy="255" r="5" fill="#D8D0C8"/>
  <circle cx="865" cy="255" r="5" fill="#D8D0C8"/>

  <!-- Fire extinguisher (far right) -->
  <rect x="825" y="310" width="35" height="90" rx="6" fill="#C4622D" opacity="0.6"/>
  <rect x="830" y="298" width="25" height="18" rx="4" fill="#C4622D" opacity="0.5"/>
  <path d="M855 308 Q870 298 875 310" stroke="#4A6B50" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Pressure gauge -->
  <circle cx="842" cy="335" r="8" fill="#FAF7F2" opacity="0.5"/>

  ${dots([[350,170,5,'#C4622D',0.45],[680,170,6,'#6B8F71',0.35],[920,200,4,'#C4622D',0.3]])}`;
  },

  'wheelchair-accessible-kitchen': () => {
    // Wheelchair symbol + lowered counter + accessible cabinets + pull-down shelf
    return `
  <!-- Wheelchair accessibility symbol (left) -->
  <circle cx="250" cy="260" r="55" fill="#E8F0E9"/>
  <circle cx="250" cy="260" r="55" fill="none" stroke="#6B8F71" stroke-width="3"/>
  <!-- Person in chair -->
  <circle cx="248" cy="235" r="12" fill="#6B8F71"/>
  <line x1="248" y1="247" x2="248" y2="272" stroke="#6B8F71" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M248 272 L262 290 L275 283" stroke="#6B8F71" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <!-- Wheel -->
  <circle cx="255" cy="278" r="18" fill="none" stroke="#6B8F71" stroke-width="3"/>
  <circle cx="255" cy="278" r="3" fill="#6B8F71"/>

  <!-- Lowered kitchen counter (center-right) -->
  <rect x="420" y="290" width="480" height="16" rx="4" fill="#D8D0C8"/>
  <!-- Counter legs -->
  <rect x="430" y="306" width="14" height="110" rx="3" fill="#D8D0C8"/>
  <rect x="886" y="306" width="14" height="110" rx="3" fill="#D8D0C8"/>
  <!-- Open space below counter for wheelchair -->
  <path d="M444 416 L886 416" stroke="#B5D4BB" stroke-width="2" stroke-dasharray="8,5" opacity="0.4"/>
  <!-- Wheelchair space arrow indicator -->
  <path d="M600 360 L660 360" stroke="#6B8F71" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.4"/>
  <path d="M655 355 L660 360 L655 365" stroke="#6B8F71" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.4"/>
  <path d="M660 360 L600 360" stroke="#6B8F71" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.4"/>
  <path d="M605 355 L600 360 L605 365" stroke="#6B8F71" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.4"/>

  <!-- Sink on counter -->
  <rect x="560" y="270" width="80" height="22" rx="6" fill="#E8F0E9"/>
  <ellipse cx="600" cy="279" rx="30" ry="8" fill="#B5D4BB" opacity="0.4"/>
  <!-- Faucet -->
  <path d="M600 262 Q600 245 615 245 L620 245" stroke="#A0A0A0" stroke-width="4" fill="none" stroke-linecap="round"/>
  <!-- Drip -->
  <ellipse cx="600" cy="280" rx="2" ry="3" fill="#B5D4BB" opacity="0.5"/>

  <!-- Pull-down cabinet above -->
  <rect x="700" y="140" width="160" height="120" rx="8" fill="#D8D0C8"/>
  <rect x="708" y="148" width="144" height="104" rx="4" fill="#FAF7F2"/>
  <!-- Shelf inside -->
  <rect x="708" y="198" width="144" height="3" fill="#D8D0C8"/>
  <!-- Items on shelf -->
  <rect x="720" y="165" width="25" height="30" rx="4" fill="#6B8F71" opacity="0.5"/>
  <rect x="752" y="170" width="22" height="25" rx="4" fill="#B5D4BB" opacity="0.5"/>
  <!-- Pull-down handle -->
  <rect x="770" y="260" width="30" height="8" rx="4" fill="#4A6B50"/>
  <path d="M785 268 L785 255" stroke="#4A6B50" stroke-width="2" stroke-dasharray="3,2"/>

  <!-- Pot on lowered counter -->
  <rect x="480" y="260" width="55" height="30" rx="5" fill="#4A6B50"/>
  <rect x="475" y="255" width="65" height="10" rx="5" fill="#6B8F71"/>

  ${dots([[170,170,6,'#C4622D',0.5],[940,200,5,'#6B8F71',0.35],[350,420,4,'#6B8F71',0.3]])}`;
  },

  'senior-nutrition-planning': () => {
    return `
  <!-- Food groups wheel / pie chart -->
  <circle cx="260" cy="280" r="110" fill="#FAF7F2" stroke="#E0D8CF" stroke-width="2"/>
  <path d="M260 280 L260 170 A110 110 0 0 1 355 335 Z" fill="#6B8F71" opacity="0.55"/>
  <path d="M260 280 L355 335 A110 110 0 0 1 165 335 Z" fill="#D4B882" opacity="0.6"/>
  <path d="M260 280 L165 335 A110 110 0 0 1 165 225 Z" fill="#C4622D" opacity="0.45"/>
  <path d="M260 280 L165 225 A110 110 0 0 1 260 170 Z" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="1"/>
  <circle cx="260" cy="280" r="38" fill="#FAF7F2"/>
  <!-- Legend -->
  <rect x="400" y="205" width="14" height="14" rx="3" fill="#6B8F71" opacity="0.55"/>
  <rect x="400" y="228" width="14" height="14" rx="3" fill="#D4B882" opacity="0.6"/>
  <rect x="400" y="251" width="14" height="14" rx="3" fill="#C4622D" opacity="0.45"/>
  <rect x="400" y="274" width="14" height="14" rx="3" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="1"/>
  <rect x="422" y="208" width="80" height="7" rx="3" fill="#D8D0C8"/>
  <rect x="422" y="231" width="65" height="7" rx="3" fill="#D8D0C8"/>
  <rect x="422" y="254" width="72" height="7" rx="3" fill="#D8D0C8"/>
  <rect x="422" y="277" width="58" height="7" rx="3" fill="#D8D0C8"/>
  <!-- Calendar / plan -->
  <rect x="620" y="185" width="175" height="185" rx="10" fill="#FAF7F2" stroke="#E0D8CF" stroke-width="1.5"/>
  <rect x="620" y="185" width="175" height="32" rx="10" fill="#6B8F71" opacity="0.4"/>
  <rect x="635" y="232" width="40" height="32" rx="5" fill="#E8F0E9"/>
  <rect x="683" y="232" width="40" height="32" rx="5" fill="#E8F0E9"/>
  <rect x="731" y="232" width="40" height="32" rx="5" fill="#E8F0E9"/>
  <rect x="635" y="272" width="40" height="32" rx="5" fill="#E8F0E9"/>
  <rect x="683" y="272" width="40" height="32" rx="5" fill="#6B8F71" opacity="0.3"/>
  <rect x="731" y="272" width="40" height="32" rx="5" fill="#E8F0E9"/>
  <rect x="635" y="312" width="40" height="32" rx="5" fill="#E8F0E9"/>
  <rect x="683" y="312" width="40" height="32" rx="5" fill="#E8F0E9"/>
  <rect x="731" y="312" width="40" height="32" rx="5" fill="#C4622D" opacity="0.3"/>
  <!-- Senior figure -->
  <circle cx="900" cy="230" r="28" fill="#D4A882" opacity="0.7"/>
  <ellipse cx="900" cy="278" rx="35" ry="20" fill="#6B8F71" opacity="0.4"/>
  <line x1="880" y1="298" x2="870" y2="350" stroke="#D8D0C8" stroke-width="3" stroke-linecap="round"/>
  <line x1="920" y1="298" x2="930" y2="350" stroke="#D8D0C8" stroke-width="3" stroke-linecap="round"/>
  <line x1="870" y1="350" x2="860" y2="390" stroke="#D8D0C8" stroke-width="3" stroke-linecap="round"/>
  <line x1="930" y1="350" x2="940" y2="390" stroke="#D8D0C8" stroke-width="3" stroke-linecap="round"/>
  ${dots([[200,420,5,'#C4622D',0.4],[530,180,4,'#6B8F71',0.35]])}`;
  },

  'pantry-organization-seniors': () => {
    return `
  <!-- Pantry shelves with organized items -->
  <!-- Shelf frame -->
  <rect x="145" y="175" width="240" height="215" rx="8" fill="#F0EBE4" stroke="#D8D0C8" stroke-width="2"/>
  <!-- Shelves -->
  <rect x="145" y="230" width="240" height="10" rx="3" fill="#D8D0C8"/>
  <rect x="145" y="300" width="240" height="10" rx="3" fill="#D8D0C8"/>
  <rect x="145" y="370" width="240" height="10" rx="3" fill="#D8D0C8"/>
  <!-- Top shelf items -->
  <rect x="158" y="185" width="28" height="42" rx="4" fill="#6B8F71" opacity="0.6"/>
  <rect x="192" y="190" width="24" height="37" rx="4" fill="#D4B882" opacity="0.7"/>
  <rect x="222" y="185" width="28" height="42" rx="4" fill="#6B8F71" opacity="0.45"/>
  <rect x="256" y="192" width="22" height="35" rx="4" fill="#C4622D" opacity="0.4"/>
  <rect x="284" y="185" width="28" height="42" rx="4" fill="#D4B882" opacity="0.55"/>
  <rect x="318" y="190" width="24" height="37" rx="4" fill="#6B8F71" opacity="0.5"/>
  <!-- Middle shelf items -->
  <rect x="158" y="245" width="38" height="50" rx="5" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="1.5"/>
  <rect x="202" y="250" width="32" height="45" rx="4" fill="#D4B882" opacity="0.65"/>
  <rect x="240" y="245" width="38" height="50" rx="5" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="1.5"/>
  <rect x="284" y="252" width="30" height="43" rx="4" fill="#C4622D" opacity="0.4"/>
  <rect x="320" y="245" width="32" height="50" rx="4" fill="#6B8F71" opacity="0.45"/>
  <!-- Bottom shelf: baskets -->
  <rect x="158" y="318" width="62" height="46" rx="6" fill="#D8D0C8"/>
  <path d="M158 334 Q189 326 220 334" stroke="#B5A898" stroke-width="1.5" fill="none"/>
  <rect x="232" y="318" width="62" height="46" rx="6" fill="#D8D0C8"/>
  <path d="M232 334 Q263 326 294 334" stroke="#B5A898" stroke-width="1.5" fill="none"/>
  <rect x="306" y="318" width="56" height="46" rx="6" fill="#D8D0C8"/>
  <!-- Labels -->
  <rect x="165" y="326" width="48" height="8" rx="3" fill="#FAF7F2"/>
  <rect x="239" y="326" width="48" height="8" rx="3" fill="#FAF7F2"/>
  <rect x="312" y="326" width="44" height="8" rx="3" fill="#FAF7F2"/>
  <!-- Right side: label maker + organized tags -->
  <rect x="620" y="240" width="145" height="70" rx="10" fill="#3A3A3A"/>
  <rect x="632" y="252" width="121" height="34" rx="6" fill="#1A1A1A"/>
  <rect x="638" y="258" width="80" height="10" rx="3" fill="#FAF7F2" opacity="0.6"/>
  <rect x="732" y="320" width="70" height="28" rx="5" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1.5"/>
  <rect x="740" y="328" width="54" height="7" rx="2" fill="#D8D0C8"/>
  <rect x="740" y="340" width="44" height="5" rx="2" fill="#D8D0C8"/>
  <!-- Fruit bowl -->
  <ellipse cx="880" cy="340" rx="72" ry="22" fill="#D8D0C8"/>
  <ellipse cx="880" cy="332" rx="60" ry="16" fill="#FAF7F2"/>
  <circle cx="862" cy="320" r="16" fill="#C4622D" opacity="0.55"/>
  <circle cx="892" cy="318" r="14" fill="#6B8F71" opacity="0.5"/>
  <circle cx="878" cy="315" r="12" fill="#D4B882" opacity="0.7"/>
  ${herbSprig(550, 430, 0.75)}
  ${dots([[200,420,5,'#C4622D',0.4],[960,200,5,'#6B8F71',0.35]])}`;
  },

  'kitchen-accessibility-consulting': () => {
    return `
  <!-- Clipboard with checklist -->
  <rect x="155" y="175" width="130" height="165" rx="10" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="2"/>
  <rect x="185" y="165" width="70" height="22" rx="8" fill="#6B8F71"/>
  <rect x="172" y="205" width="96" height="10" rx="4" fill="#E8F0E9"/>
  <rect x="172" y="223" width="80" height="10" rx="4" fill="#E8F0E9"/>
  <rect x="172" y="241" width="88" height="10" rx="4" fill="#E8F0E9"/>
  <rect x="172" y="259" width="72" height="10" rx="4" fill="#E8F0E9"/>
  <!-- Check marks -->
  <path d="M162 211 L167 217 L177 206" stroke="#6B8F71" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M162 229 L167 235 L177 224" stroke="#6B8F71" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M162 247 L167 253 L177 242" stroke="#C4622D" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Wheelchair symbol -->
  <circle cx="650" cy="220" r="16" fill="none" stroke="#6B8F71" stroke-width="3"/>
  <path d="M650 242 L650 290 L620 330" stroke="#6B8F71" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M650 290 L680 330" stroke="#6B8F71" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M630 270 L680 270" stroke="#6B8F71" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="618" cy="340" r="14" fill="none" stroke="#6B8F71" stroke-width="2.5"/>
  <circle cx="682" cy="340" r="14" fill="none" stroke="#6B8F71" stroke-width="2.5"/>
  <!-- Kitchen counter accessible -->
  <rect x="730" y="290" width="260" height="18" rx="5" fill="#D8D0C8"/>
  <rect x="740" y="308" width="240" height="90" rx="4" fill="#E8F0E9"/>
  <rect x="840" y="265" width="40" height="28" rx="5" fill="#6B8F71" opacity="0.5"/>
  ${dots([[200,430,5,'#C4622D',0.4],[900,200,6,'#6B8F71',0.35],[500,160,4,'#C4622D',0.3]])}`;
  },

  'long-distance-family-meal-coordination': () => {
    return `
  <!-- Phone/video call screen -->
  <rect x="145" y="175" width="160" height="200" rx="18" fill="#3A3A3A"/>
  <rect x="155" y="190" width="140" height="160" rx="8" fill="#1A3020"/>
  <!-- Family face on screen -->
  <circle cx="225" cy="255" r="35" fill="#D4A882" opacity="0.8"/>
  <ellipse cx="225" cy="290" rx="30" ry="15" fill="#6B8F71" opacity="0.5"/>
  <circle cx="215" cy="248" r="5" fill="#3A3A3A" opacity="0.6"/>
  <circle cx="235" cy="248" r="5" fill="#3A3A3A" opacity="0.6"/>
  <path d="M215 265 Q225 272 235 265" stroke="#3A3A3A" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- Home button -->
  <circle cx="225" cy="362" r="10" fill="#5A5A5A"/>
  <!-- Signal/wifi -->
  <path d="M155 190 Q225 182 295 190" stroke="#6BFF90" stroke-width="1.5" fill="none" opacity="0.4"/>
  <!-- Meal container -->
  <rect x="560" y="240" width="180" height="120" rx="12" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="2"/>
  <rect x="560" y="240" width="180" height="28" rx="12" fill="#6B8F71" opacity="0.4"/>
  <!-- Food inside -->
  <ellipse cx="640" cy="325" rx="55" ry="20" fill="#D4B882" opacity="0.6"/>
  <ellipse cx="610" cy="318" rx="22" ry="14" fill="#6B8F71" opacity="0.5"/>
  <ellipse cx="670" cy="312" rx="18" ry="12" fill="#C4622D" opacity="0.4"/>
  <!-- Arrow connecting phone to meal -->
  <path d="M320 290 Q440 250 545 285" stroke="#6B8F71" stroke-width="2" stroke-dasharray="8,5" fill="none" opacity="0.6"/>
  <polygon points="542,278 558,285 542,292" fill="#6B8F71" opacity="0.6"/>
  <!-- Location pin -->
  <path d="M850 200 Q835 200 830 215 Q825 228 838 245 L850 262 L862 245 Q875 228 870 215 Q865 200 850 200 Z" fill="#C4622D" opacity="0.5"/>
  <circle cx="850" cy="218" r="9" fill="#FAF7F2"/>
  ${herbSprig(920, 420, 0.7)}
  ${dots([[180,420,5,'#C4622D',0.4],[490,200,4,'#6B8F71',0.35]])}`;
  },

  'post-hospital-meal-transition': () => {
    return `
  <!-- Hospital chart / discharge paper -->
  <rect x="150" y="180" width="140" height="180" rx="10" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="2"/>
  <rect x="150" y="180" width="140" height="32" rx="10" fill="#6B8F71" opacity="0.3"/>
  <rect x="168" y="228" width="104" height="8" rx="3" fill="#D8D0C8"/>
  <rect x="168" y="244" width="88" height="8" rx="3" fill="#D8D0C8"/>
  <rect x="168" y="260" width="96" height="8" rx="3" fill="#D8D0C8"/>
  <rect x="168" y="276" width="72" height="8" rx="3" fill="#D8D0C8"/>
  <!-- Cross symbol -->
  <rect x="206" y="186" width="28" height="8" rx="2" fill="#FAF7F2"/>
  <rect x="216" y="178" width="8" height="24" rx="2" fill="#FAF7F2"/>
  <!-- Arrow transition -->
  <path d="M308 275 L450 275" stroke="#6B8F71" stroke-width="3" stroke-linecap="round"/>
  <polygon points="445,268 462,275 445,282" fill="#6B8F71"/>
  <!-- Home with warm kitchen light -->
  <path d="M560 320 L560 230 L660 175 L760 230 L760 320 Z" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="2"/>
  <path d="M540 240 L660 170 L780 240" stroke="#6B8F71" stroke-width="3" fill="none" stroke-linecap="round"/>
  <rect x="620" y="265" width="45" height="55" rx="5" fill="#D8D0C8"/>
  <rect x="640" y="230" width="38" height="30" rx="4" fill="#FAF7F2"/>
  <!-- Warm glow in window -->
  <ellipse cx="659" cy="245" rx="14" ry="10" fill="#C4622D" opacity="0.25"/>
  <!-- Meal bowl -->
  <ellipse cx="850" cy="310" rx="75" ry="28" fill="#D8D0C8"/>
  <ellipse cx="850" cy="302" rx="62" ry="22" fill="#FAF7F2"/>
  <ellipse cx="850" cy="296" rx="45" ry="14" fill="#E8F0E9"/>
  ${steam(850, 272, 3, 25)}
  ${dots([[200,430,5,'#C4622D',0.4],[940,200,5,'#6B8F71',0.35]])}`;
  },

  'nutritional-needs-assessment': () => {
    return `
  <!-- Nutrition facts panel -->
  <rect x="145" y="170" width="155" height="210" rx="8" fill="#FAF7F2" stroke="#3A3A3A" stroke-width="3"/>
  <rect x="145" y="170" width="155" height="40" rx="8" fill="#3A3A3A"/>
  <text x="222" y="196" text-anchor="middle" fill="#FAF7F2" font-size="13" font-family="sans-serif" font-weight="700">Nutrition Facts</text>
  <rect x="150" y="210" width="145" height="3" fill="#3A3A3A"/>
  <rect x="150" y="225" width="145" height="1" fill="#D8D0C8"/>
  <rect x="150" y="245" width="100" height="6" rx="2" fill="#D8D0C8"/>
  <rect x="150" y="258" width="80" height="5" rx="2" fill="#D8D0C8"/>
  <rect x="150" y="270" width="90" height="5" rx="2" fill="#D8D0C8"/>
  <rect x="150" y="283" width="75" height="5" rx="2" fill="#D8D0C8"/>
  <rect x="150" y="296" width="145" height="2" fill="#3A3A3A"/>
  <!-- Bar chart (nutrient levels) -->
  <rect x="560" y="190" width="260" height="170" rx="8" fill="#FAF7F2" stroke="#E0D8CF" stroke-width="1.5"/>
  <rect x="580" y="310" width="28" height="34" rx="3" fill="#6B8F71" opacity="0.8"/>
  <rect x="618" y="285" width="28" height="59" rx="3" fill="#6B8F71" opacity="0.7"/>
  <rect x="656" y="265" width="28" height="79" rx="3" fill="#C4622D" opacity="0.6"/>
  <rect x="694" y="295" width="28" height="49" rx="3" fill="#6B8F71" opacity="0.7"/>
  <rect x="732" y="275" width="28" height="69" rx="3" fill="#6B8F71" opacity="0.6"/>
  <rect x="575" y="344" width="220" height="2" rx="1" fill="#D8D0C8"/>
  <!-- Magnifier -->
  <circle cx="880" cy="265" r="52" fill="none" stroke="#6B8F71" stroke-width="3"/>
  <line x1="917" y1="302" x2="945" y2="330" stroke="#6B8F71" stroke-width="4" stroke-linecap="round"/>
  <circle cx="880" cy="265" r="36" fill="#E8F0E9" opacity="0.4"/>
  ${herbSprig(460, 420, 0.8)}
  ${dots([[200,420,5,'#C4622D',0.4],[760,180,4,'#6B8F71',0.35]])}`;
  },

  'senior-diet-consulting': () => {
    return `
  <!-- Consultant at desk -->
  <rect x="145" y="300" width="200" height="12" rx="4" fill="#D8D0C8"/>
  <rect x="160" y="220" width="170" height="82" rx="6" fill="#FAF7F2" stroke="#E0D8CF" stroke-width="1.5"/>
  <!-- Laptop on desk -->
  <rect x="178" y="235" width="110" height="68" rx="5" fill="#3A3A3A"/>
  <rect x="185" y="242" width="96" height="54" rx="3" fill="#1A3020"/>
  <ellipse cx="238" cy="312" rx="60" ry="5" fill="#5A5A5A"/>
  <!-- Person silhouette -->
  <circle cx="238" cy="195" r="26" fill="#D4A882" opacity="0.7"/>
  <ellipse cx="238" cy="235" rx="30" ry="18" fill="#6B8F71" opacity="0.4"/>
  <!-- Food pyramid -->
  <polygon points="620,370 740,370 680,200" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="2"/>
  <line x1="630" y1="340" x2="730" y2="340" stroke="#B5D4BB" stroke-width="1.5"/>
  <line x1="644" y1="305" x2="716" y2="305" stroke="#B5D4BB" stroke-width="1.5"/>
  <line x1="658" y1="268" x2="702" y2="268" stroke="#B5D4BB" stroke-width="1.5"/>
  <ellipse cx="680" cy="360" rx="38" ry="8" fill="#6B8F71" opacity="0.5"/>
  <ellipse cx="680" cy="322" rx="28" ry="7" fill="#D4B882" opacity="0.5"/>
  <ellipse cx="680" cy="285" rx="18" ry="6" fill="#C4622D" opacity="0.5"/>
  <ellipse cx="680" cy="252" rx="10" ry="5" fill="#D4882A" opacity="0.5"/>
  <!-- Notes/plan sheet -->
  <rect x="790" y="220" width="130" height="160" rx="8" fill="#FAF7F2" stroke="#E0D8CF" stroke-width="1.5"/>
  <rect x="805" y="238" width="100" height="6" rx="2" fill="#D8D0C8"/>
  <rect x="805" y="254" width="85" height="6" rx="2" fill="#D8D0C8"/>
  <rect x="805" y="270" width="90" height="6" rx="2" fill="#D8D0C8"/>
  <rect x="805" y="286" width="70" height="6" rx="2" fill="#D8D0C8"/>
  ${dots([[200,430,5,'#C4622D',0.4],[950,420,5,'#6B8F71',0.35]])}`;
  },

  'medical-diet-planning': () => {
    return `
  <!-- Medical cross + clipboard -->
  <rect x="145" y="175" width="145" height="185" rx="10" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="2"/>
  <rect x="185" y="163" width="65" height="24" rx="8" fill="#6B8F71"/>
  <!-- Medical cross on header -->
  <rect x="203" y="183" width="30" height="8" rx="2" fill="#FAF7F2"/>
  <rect x="213" y="175" width="10" height="24" rx="2" fill="#FAF7F2"/>
  <rect x="165" y="210" width="105" height="8" rx="3" fill="#E8F0E9"/>
  <rect x="165" y="226" width="88" height="8" rx="3" fill="#E8F0E9"/>
  <rect x="165" y="242" width="95" height="8" rx="3" fill="#E8F0E9"/>
  <rect x="165" y="258" width="78" height="8" rx="3" fill="#E8F0E9"/>
  <rect x="165" y="274" width="92" height="8" rx="3" fill="#E8F0E9"/>
  <!-- Stethoscope -->
  <path d="M420 220 Q380 200 360 240 Q340 280 370 310 Q395 335 420 320" stroke="#3A3A3A" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="425" cy="320" r="18" fill="none" stroke="#3A3A3A" stroke-width="3"/>
  <circle cx="425" cy="320" r="9" fill="#6B8F71" opacity="0.6"/>
  <!-- Balanced plate -->
  <ellipse cx="700" cy="300" rx="130" ry="40" fill="#D8D0C8"/>
  <ellipse cx="700" cy="292" rx="112" ry="33" fill="#FAF7F2"/>
  <line x1="700" y1="262" x2="700" y2="322" stroke="#D8D0C8" stroke-width="1.5"/>
  <line x1="640" y1="292" x2="760" y2="292" stroke="#D8D0C8" stroke-width="1.5"/>
  <ellipse cx="668" cy="278" rx="22" ry="12" fill="#6B8F71" opacity="0.5"/>
  <ellipse cx="732" cy="278" rx="22" ry="12" fill="#D4B882" opacity="0.6"/>
  <ellipse cx="668" cy="308" rx="22" ry="12" fill="#C4622D" opacity="0.4"/>
  <ellipse cx="732" cy="308" rx="22" ry="12" fill="#E8F0E9"/>
  ${steam(700, 252, 3, 28)}
  ${dots([[900,200,5,'#C4622D',0.4],[950,420,5,'#6B8F71',0.35]])}`;
  },

  'nutrition-coaching-seniors': () => {
    return `
  <!-- Coach / person -->
  <circle cx="220" cy="200" r="36" fill="#D4A882" opacity="0.75"/>
  <ellipse cx="220" cy="255" rx="45" ry="22" fill="#6B8F71" opacity="0.45"/>
  <!-- Speech bubble with goal -->
  <rect x="275" y="165" width="155" height="70" rx="12" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="1.5"/>
  <polygon points="276,198 260,210 282,208" fill="#E8F0E9"/>
  <rect x="290" y="180" width="120" height="8" rx="3" fill="#B5D4BB"/>
  <rect x="290" y="196" width="95" height="8" rx="3" fill="#B5D4BB"/>
  <rect x="290" y="212" width="108" height="8" rx="3" fill="#B5D4BB"/>
  <!-- Progress / goal chart -->
  <rect x="555" y="185" width="265" height="180" rx="10" fill="#FAF7F2" stroke="#E0D8CF" stroke-width="1.5"/>
  <!-- Trend line (upward) -->
  <polyline points="575,340 610,310 650,320 695,285 740,265 780,240 800,225" stroke="#6B8F71" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="800" cy="225" r="6" fill="#6B8F71"/>
  <!-- Axes -->
  <line x1="572" y1="350" x2="572" y2="195" stroke="#D8D0C8" stroke-width="1.5"/>
  <line x1="572" y1="350" x2="810" y2="350" stroke="#D8D0C8" stroke-width="1.5"/>
  <!-- Star / achievement -->
  <path d="M900 220 L910 250 L940 250 L916 268 L926 298 L900 280 L874 298 L884 268 L860 250 L890 250 Z" fill="#C4622D" opacity="0.45"/>
  ${herbSprig(460, 420, 0.8)}
  ${dots([[200,420,5,'#C4622D',0.4],[960,420,4,'#6B8F71',0.35]])}`;
  },

  'single-serving-meal-prep': () => {
    return `
  <!-- Single plate setting -->
  <ellipse cx="260" cy="310" rx="105" ry="32" fill="#D8D0C8"/>
  <ellipse cx="260" cy="302" rx="90" ry="27" fill="#FAF7F2"/>
  <!-- Food on plate -->
  <ellipse cx="250" cy="292" rx="32" ry="20" fill="#6B8F71" opacity="0.55"/>
  <ellipse cx="278" cy="296" rx="24" ry="15" fill="#D4B882" opacity="0.65"/>
  <ellipse cx="255" cy="308" rx="20" ry="10" fill="#C4622D" opacity="0.45"/>
  ${steam(260, 268, 2, 22)}
  <!-- Fork and knife -->
  <line x1="150" y1="265" x2="150" y2="345" stroke="#D8D0C8" stroke-width="4" stroke-linecap="round"/>
  <path d="M143 265 L143 295 Q150 302 157 295 L157 265" fill="none" stroke="#D8D0C8" stroke-width="2.5"/>
  <line x1="370" y1="265" x2="370" y2="345" stroke="#D8D0C8" stroke-width="4" stroke-linecap="round"/>
  <path d="M366 265 Q370 280 370 295" stroke="#D8D0C8" stroke-width="2.5" fill="none"/>
  <!-- Individual portion containers -->
  <rect x="550" y="215" width="88" height="68" rx="8" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="1.5"/>
  <rect x="550" y="215" width="88" height="18" rx="8" fill="#6B8F71" opacity="0.3"/>
  <rect x="652" y="215" width="88" height="68" rx="8" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="1.5"/>
  <rect x="652" y="215" width="88" height="18" rx="8" fill="#6B8F71" opacity="0.3"/>
  <rect x="550" y="298" width="88" height="68" rx="8" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="1.5"/>
  <rect x="550" y="298" width="88" height="18" rx="8" fill="#6B8F71" opacity="0.3"/>
  <rect x="652" y="298" width="88" height="68" rx="8" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="1.5"/>
  <rect x="652" y="298" width="88" height="18" rx="8" fill="#6B8F71" opacity="0.3"/>
  <!-- Label tag -->
  <rect x="820" y="240" width="90" height="48" rx="8" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1.5"/>
  <rect x="830" y="253" width="70" height="6" rx="2" fill="#D8D0C8"/>
  <rect x="830" y="267" width="55" height="6" rx="2" fill="#D8D0C8"/>
  ${herbSprig(940, 400, 0.75)}
  ${dots([[200,420,5,'#C4622D',0.4],[480,200,4,'#6B8F71',0.35]])}`;
  },

  'kitchen-decluttering': () => {
    return `
  <!-- Cluttered to tidy arrow -->
  <!-- Before: messy pile -->
  <rect x="140" y="280" width="70" height="45" rx="5" fill="#D8D0C8" transform="rotate(-8 140 280)"/>
  <rect x="160" y="260" width="55" height="38" rx="5" fill="#E0D8CF" transform="rotate(5 160 260)"/>
  <rect x="148" y="240" width="80" height="30" rx="4" fill="#D8D0C8" transform="rotate(-4 148 240)"/>
  <rect x="170" y="220" width="60" height="28" rx="4" fill="#E0D8CF" transform="rotate(7 170 220)"/>
  <!-- X marks -->
  <path d="M155 300 L175 320 M175 300 L155 320" stroke="#C4622D" stroke-width="2.5" opacity="0.5"/>
  <!-- Arrow -->
  <path d="M350 280 L460 280" stroke="#6B8F71" stroke-width="3" stroke-linecap="round"/>
  <polygon points="455,272 472,280 455,288" fill="#6B8F71"/>
  <!-- After: neat shelf -->
  <rect x="520" y="195" width="320" height="12" rx="4" fill="#D8D0C8"/>
  <rect x="520" y="280" width="320" height="12" rx="4" fill="#D8D0C8"/>
  <rect x="520" y="365" width="320" height="12" rx="4" fill="#D8D0C8"/>
  <!-- Neatly arranged items on shelves -->
  <rect x="535" y="225" width="40" height="55" rx="5" fill="#6B8F71" opacity="0.5"/>
  <rect x="583" y="235" width="35" height="45" rx="5" fill="#6B8F71" opacity="0.4"/>
  <rect x="626" y="220" width="42" height="60" rx="5" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="1"/>
  <rect x="676" y="230" width="38" height="50" rx="5" fill="#D4B882" opacity="0.6"/>
  <rect x="722" y="225" width="40" height="55" rx="5" fill="#6B8F71" opacity="0.45"/>
  <rect x="535" y="310" width="35" height="55" rx="5" fill="#D4B882" opacity="0.55"/>
  <rect x="580" y="300" width="45" height="65" rx="5" fill="#E8F0E9" stroke="#B5D4BB" stroke-width="1"/>
  <rect x="634" y="308" width="38" height="57" rx="5" fill="#6B8F71" opacity="0.4"/>
  <rect x="682" y="298" width="42" height="67" rx="5" fill="#D8D0C8"/>
  <!-- Check mark -->
  <path d="M790 255 L800 268 L820 240" stroke="#6B8F71" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${dots([[200,420,5,'#C4622D',0.4],[950,420,4,'#C4622D',0.3]])}`;
  },

  'aging-in-place-kitchen': () => {
    // House outline + kitchen interior + grab bars + heart
    return `
  <!-- House outline -->
  <path d="M340 280 L600 150 L860 280" fill="none" stroke="#6B8F71" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="380" y="280" width="440" height="200" rx="4" fill="#E8F0E9" stroke="#6B8F71" stroke-width="3"/>

  <!-- Interior: Kitchen elements -->
  <!-- Counter -->
  <rect x="400" y="360" width="400" height="10" rx="3" fill="#D8D0C8"/>
  <!-- Stove burners -->
  <circle cx="450" cy="345" r="15" fill="#E0D8CF" stroke="#D8D0C8" stroke-width="1.5"/>
  <circle cx="450" cy="345" r="8" fill="#E0D8CF" stroke="#D8D0C8" stroke-width="1"/>
  <circle cx="500" cy="345" r="15" fill="#E0D8CF" stroke="#D8D0C8" stroke-width="1.5"/>
  <circle cx="500" cy="345" r="8" fill="#E0D8CF" stroke="#D8D0C8" stroke-width="1"/>

  <!-- Pot on stove -->
  <rect x="435" y="318" width="30" height="22" rx="4" fill="#4A6B50"/>
  <rect x="432" y="314" width="36" height="8" rx="4" fill="#6B8F71"/>
  ${steam(450, 305, 2, 12)}

  <!-- Window -->
  <rect x="420" y="295" width="60" height="50" rx="4" fill="#FAF7F2" stroke="#6B8F71" stroke-width="2"/>
  <line x1="450" y1="295" x2="450" y2="345" stroke="#6B8F71" stroke-width="1.5"/>
  <line x1="420" y1="320" x2="480" y2="320" stroke="#6B8F71" stroke-width="1.5"/>

  <!-- Door -->
  <rect x="590" y="380" width="65" height="100" rx="4" fill="#D8D0C8"/>
  <circle cx="645" cy="435" r="5" fill="#4A6B50"/>

  <!-- Grab bars -->
  <rect x="680" y="350" width="80" height="8" rx="4" fill="#4A6B50" opacity="0.6"/>
  <circle cx="684" cy="354" r="7" fill="#4A6B50" opacity="0.6"/>
  <circle cx="756" cy="354" r="7" fill="#4A6B50" opacity="0.6"/>
  <!-- Vertical grab bar -->
  <rect x="760" y="300" width="8" height="60" rx="4" fill="#4A6B50" opacity="0.5"/>
  <circle cx="764" cy="300" r="6" fill="#4A6B50" opacity="0.5"/>
  <circle cx="764" cy="360" r="6" fill="#4A6B50" opacity="0.5"/>

  <!-- Heart in house -->
  <path d="M715 300 Q715 285 728 285 Q741 285 741 300 Q741 285 754 285 Q767 285 767 300 Q767 320 741 336 Q715 320 715 300 Z" fill="#C4622D" opacity="0.4"/>

  <!-- Non-slip floor mat -->
  <rect x="510" y="465" width="80" height="10" rx="3" fill="#C4622D" opacity="0.3"/>
  <line x1="518" y1="470" x2="582" y2="470" stroke="#C4622D" stroke-width="1" opacity="0.3" stroke-dasharray="4,3"/>

  <!-- Chimney -->
  <rect x="710" y="175" width="30" height="65" rx="3" fill="#D8D0C8"/>

  ${dots([[280,180,5,'#C4622D',0.5],[920,200,6,'#6B8F71',0.35],[200,350,4,'#6B8F71',0.3]])}`;
  },
};

// ─── LOCATION ILLUSTRATIONS ──────────────────────────────────────────

const locationIllustrations = {
  'san-jose': () => {
    // Tech campus buildings + palm trees
    return wrap(`
  <!-- Sky gradient hint -->
  <rect x="0" y="380" width="1200" height="4" rx="2" fill="#D8D0C8" opacity="0.5"/>

  <!-- Tech campus buildings (center) -->
  <!-- Building 1 - tall glass -->
  <rect x="460" y="220" width="70" height="160" rx="4" fill="#D8D0C8"/>
  <rect x="468" y="228" width="18" height="22" rx="2" fill="#E8F0E9"/>
  <rect x="496" y="228" width="18" height="22" rx="2" fill="#E8F0E9"/>
  <rect x="468" y="258" width="18" height="22" rx="2" fill="#E8F0E9"/>
  <rect x="496" y="258" width="18" height="22" rx="2" fill="#E8F0E9"/>
  <rect x="468" y="288" width="18" height="22" rx="2" fill="#E8F0E9"/>
  <rect x="496" y="288" width="18" height="22" rx="2" fill="#E8F0E9"/>
  <rect x="468" y="318" width="18" height="22" rx="2" fill="#E8F0E9"/>
  <rect x="496" y="318" width="18" height="22" rx="2" fill="#E8F0E9"/>
  <!-- Building 2 - wide modern -->
  <rect x="545" y="260" width="110" height="120" rx="4" fill="#E0D8CF"/>
  <rect x="555" y="270" width="30" height="25" rx="3" fill="#E8F0E9"/>
  <rect x="595" y="270" width="30" height="25" rx="3" fill="#E8F0E9"/>
  <rect x="635" y="270" width="10" height="25" rx="2" fill="#E8F0E9"/>
  <rect x="555" y="305" width="30" height="25" rx="3" fill="#E8F0E9"/>
  <rect x="595" y="305" width="30" height="25" rx="3" fill="#E8F0E9"/>
  <!-- Building 3 - curved roof tech -->
  <rect x="670" y="280" width="80" height="100" rx="4" fill="#D8D0C8"/>
  <path d="M670 280 Q710 260 750 280" fill="#E0D8CF"/>
  <rect x="682" y="295" width="18" height="20" rx="2" fill="#E8F0E9"/>
  <rect x="712" y="295" width="18" height="20" rx="2" fill="#E8F0E9"/>
  <rect x="682" y="325" width="18" height="20" rx="2" fill="#E8F0E9"/>
  <rect x="712" y="325" width="18" height="20" rx="2" fill="#E8F0E9"/>
  <!-- Entry door -->
  <rect x="580" y="345" width="30" height="35" rx="3" fill="#4A6B50" opacity="0.4"/>

  <!-- Palm tree 1 (left) -->
  <rect x="278" y="280" width="8" height="100" rx="4" fill="#8A7858"/>
  <path d="M282 280 Q248 255 225 272" stroke="#6B8F71" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M282 280 Q310 255 340 270" stroke="#6B8F71" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M282 284 Q252 270 238 285" stroke="#4A6B50" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M282 284 Q315 268 332 282" stroke="#4A6B50" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M282 278 Q270 260 258 268" stroke="#6B8F71" stroke-width="3.5" fill="none" stroke-linecap="round"/>

  <!-- Palm tree 2 (far left) -->
  <rect x="178" y="300" width="7" height="80" rx="3.5" fill="#8A7858"/>
  <path d="M181 300 Q155 282 140 295" stroke="#6B8F71" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M181 300 Q205 282 220 293" stroke="#6B8F71" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M181 303 Q160 290 150 302" stroke="#4A6B50" stroke-width="3" fill="none" stroke-linecap="round"/>

  <!-- Palm tree 3 (right) -->
  <rect x="868" y="290" width="7" height="90" rx="3.5" fill="#8A7858"/>
  <path d="M871 290 Q845 272 832 285" stroke="#6B8F71" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <path d="M871 290 Q898 272 912 284" stroke="#6B8F71" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <path d="M871 293 Q850 280 840 292" stroke="#4A6B50" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M871 293 Q895 280 905 290" stroke="#4A6B50" stroke-width="3.5" fill="none" stroke-linecap="round"/>

  <!-- Location pin -->
  <path d="M600 120 Q575 120 565 142 Q555 162 575 195 L600 230 L625 195 Q645 162 635 142 Q625 120 600 120 Z" fill="#C4622D" opacity="0.55"/>
  <circle cx="600" cy="152" r="14" fill="#FAF7F2"/>

  ${dots([[400,180,5,'#C4622D',0.4],[950,200,6,'#6B8F71',0.35],[150,220,4,'#6B8F71',0.3]])}`, [160, 300, 260, 1050, 200, 220, 900, 490, 150]);
  },

  'san-francisco': () => {
    // Golden Gate Bridge towers + hills + row houses
    return wrap(`
  <rect x="0" y="390" width="1200" height="4" rx="2" fill="#D8D0C8" opacity="0.5"/>

  <!-- Hills in background -->
  <path d="M0 360 Q200 280 400 340 Q600 280 800 330 Q1000 280 1200 360 L1200 394 L0 394 Z" fill="#B5D4BB" opacity="0.2"/>

  <!-- Golden Gate Bridge -->
  <!-- Tower 1 -->
  <rect x="340" y="200" width="20" height="190" rx="3" fill="#C4622D" opacity="0.65"/>
  <rect x="335" y="195" width="30" height="10" rx="3" fill="#C4622D" opacity="0.55"/>
  <!-- Tower 2 -->
  <rect x="640" y="200" width="20" height="190" rx="3" fill="#C4622D" opacity="0.65"/>
  <rect x="635" y="195" width="30" height="10" rx="3" fill="#C4622D" opacity="0.55"/>
  <!-- Main cables -->
  <path d="M350 210 Q500 280 650 210" stroke="#C4622D" stroke-width="4" fill="none" opacity="0.5"/>
  <path d="M350 220 Q500 285 650 220" stroke="#C4622D" stroke-width="3" fill="none" opacity="0.35"/>
  <!-- Vertical suspender cables -->
  <line x1="400" y1="228" x2="400" y2="340" stroke="#C4622D" stroke-width="1.5" opacity="0.3"/>
  <line x1="450" y1="248" x2="450" y2="340" stroke="#C4622D" stroke-width="1.5" opacity="0.3"/>
  <line x1="500" y1="260" x2="500" y2="340" stroke="#C4622D" stroke-width="1.5" opacity="0.3"/>
  <line x1="550" y1="248" x2="550" y2="340" stroke="#C4622D" stroke-width="1.5" opacity="0.3"/>
  <line x1="600" y1="228" x2="600" y2="340" stroke="#C4622D" stroke-width="1.5" opacity="0.3"/>
  <!-- Road deck -->
  <rect x="330" y="340" width="340" height="12" rx="3" fill="#D8D0C8" opacity="0.5"/>

  <!-- Row houses -->
  <rect x="780" y="320" width="35" height="70" rx="2" fill="#E8F0E9"/>
  <rect x="820" y="312" width="35" height="78" rx="2" fill="#E0D8CF"/>
  <rect x="860" y="316" width="35" height="74" rx="2" fill="#B5D4BB" opacity="0.6"/>
  <rect x="900" y="322" width="35" height="68" rx="2" fill="#D8D0C8"/>
  <!-- Windows -->
  <rect x="788" y="332" width="10" height="12" rx="1.5" fill="#FAF7F2"/>
  <rect x="828" y="325" width="10" height="12" rx="1.5" fill="#FAF7F2"/>
  <rect x="868" y="328" width="10" height="12" rx="1.5" fill="#FAF7F2"/>
  <rect x="908" y="334" width="10" height="12" rx="1.5" fill="#FAF7F2"/>

  <!-- Location pin -->
  <path d="M500 115 Q475 115 465 137 Q455 157 475 190 L500 225 L525 190 Q545 157 535 137 Q525 115 500 115 Z" fill="#C4622D" opacity="0.55"/>
  <circle cx="500" cy="147" r="14" fill="#FAF7F2"/>

  <!-- Fog hint -->
  <ellipse cx="200" cy="310" rx="150" ry="20" fill="#FAF7F2" opacity="0.3"/>

  ${dots([[130,200,6,'#C4622D',0.4],[960,200,5,'#6B8F71',0.4],[700,180,4,'#6B8F71',0.3]])}`, [140, 280, 250, 1060, 200, 210, 900, 500, 150]);
  },

  'oakland': () => {
    // Lake Merritt outline + oak tree + city skyline
    return wrap(`
  <rect x="0" y="395" width="1200" height="4" rx="2" fill="#D8D0C8" opacity="0.5"/>

  <!-- Lake Merritt (left-center) -->
  <ellipse cx="400" cy="340" rx="160" ry="55" fill="#B5D4BB" opacity="0.25"/>
  <ellipse cx="400" cy="338" rx="140" ry="45" fill="#E8F0E9" opacity="0.3"/>
  <!-- Lake path -->
  <ellipse cx="400" cy="340" rx="155" ry="52" fill="none" stroke="#6B8F71" stroke-width="2.5" opacity="0.3" stroke-dasharray="8,4"/>

  <!-- Grand oak tree (right) -->
  <rect x="780" y="300" width="16" height="95" rx="4" fill="#8B5A2B"/>
  <!-- Branches -->
  <path d="M788 310 Q760 280 740 290" stroke="#8B5A2B" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M788 310 Q820 280 840 288" stroke="#8B5A2B" stroke-width="4" fill="none" stroke-linecap="round"/>
  <!-- Canopy -->
  <circle cx="788" cy="265" r="50" fill="#6B8F71" opacity="0.55"/>
  <circle cx="760" cy="278" r="35" fill="#4A6B50" opacity="0.45"/>
  <circle cx="818" cy="275" r="38" fill="#6B8F71" opacity="0.5"/>
  <circle cx="788" cy="248" r="30" fill="#4A6B50" opacity="0.4"/>
  <circle cx="770" cy="258" r="25" fill="#B5D4BB" opacity="0.3"/>

  <!-- City skyline (center background) -->
  <rect x="500" y="260" width="40" height="130" rx="3" fill="#D8D0C8" opacity="0.6"/>
  <rect x="545" y="240" width="50" height="150" rx="3" fill="#E0D8CF" opacity="0.6"/>
  <rect x="600" y="270" width="35" height="120" rx="3" fill="#D8D0C8" opacity="0.55"/>
  <rect x="640" y="250" width="45" height="140" rx="3" fill="#E0D8CF" opacity="0.6"/>
  <!-- Windows -->
  <rect x="510" y="278" width="12" height="12" rx="2" fill="#E8F0E9" opacity="0.7"/>
  <rect x="510" y="298" width="12" height="12" rx="2" fill="#E8F0E9" opacity="0.7"/>
  <rect x="555" y="258" width="14" height="14" rx="2" fill="#E8F0E9" opacity="0.7"/>
  <rect x="555" y="282" width="14" height="14" rx="2" fill="#E8F0E9" opacity="0.7"/>
  <rect x="555" y="306" width="14" height="14" rx="2" fill="#E8F0E9" opacity="0.7"/>
  <rect x="650" y="268" width="12" height="12" rx="2" fill="#E8F0E9" opacity="0.7"/>
  <rect x="650" y="290" width="12" height="12" rx="2" fill="#E8F0E9" opacity="0.7"/>

  <!-- Location pin -->
  <path d="M550 140 Q525 140 515 162 Q505 182 525 215 L550 250 L575 215 Q595 182 585 162 Q575 140 550 140 Z" fill="#4A6B50" opacity="0.55"/>
  <circle cx="550" cy="172" r="14" fill="#FAF7F2"/>

  ${dots([[200,200,6,'#C4622D',0.4],[920,200,5,'#6B8F71',0.4],[350,180,4,'#4A6B50',0.3]])}`, [120, 290, 260, 1070, 210, 220, 950, 480, 140]);
  },

  'palo-alto': () => {
    // Stanford-style archway + tall trees
    return wrap(`
  <rect x="0" y="400" width="1200" height="4" rx="2" fill="#D8D0C8" opacity="0.5"/>

  <!-- Stanford-style archway (center) -->
  <!-- Main arch structure -->
  <rect x="440" y="240" width="30" height="160" rx="3" fill="#D8C0A0"/>
  <rect x="730" y="240" width="30" height="160" rx="3" fill="#D8C0A0"/>
  <!-- Arch top -->
  <path d="M440 240 Q600 170 760 240" fill="#D8C0A0"/>
  <path d="M455 245 Q600 185 745 245" fill="#E0D0B8"/>
  <!-- Arch opening -->
  <path d="M470 400 L470 280 Q600 220 730 280 L730 400 Z" fill="#E8F0E9" opacity="0.3"/>
  <!-- Keystone -->
  <rect x="590" y="198" width="20" height="25" rx="3" fill="#C4622D" opacity="0.4"/>
  <!-- Column details -->
  <rect x="443" y="250" width="24" height="8" rx="2" fill="#C8B090"/>
  <rect x="443" y="380" width="24" height="8" rx="2" fill="#C8B090"/>
  <rect x="733" y="250" width="24" height="8" rx="2" fill="#C8B090"/>
  <rect x="733" y="380" width="24" height="8" rx="2" fill="#C8B090"/>

  <!-- Tall eucalyptus trees -->
  <!-- Tree 1 -->
  <rect x="230" y="230" width="12" height="170" rx="4" fill="#8B5A2B"/>
  <ellipse cx="236" cy="215" rx="35" ry="50" fill="#4A6B50" opacity="0.5"/>
  <ellipse cx="226" cy="230" rx="25" ry="35" fill="#6B8F71" opacity="0.45"/>
  <ellipse cx="248" cy="225" rx="22" ry="30" fill="#4A6B50" opacity="0.4"/>
  <!-- Tree 2 -->
  <rect x="170" y="260" width="10" height="140" rx="3" fill="#8B5A2B"/>
  <ellipse cx="175" cy="248" rx="28" ry="40" fill="#6B8F71" opacity="0.45"/>
  <ellipse cx="168" cy="258" rx="22" ry="30" fill="#4A6B50" opacity="0.4"/>
  <!-- Tree 3 (right) -->
  <rect x="890" y="240" width="12" height="160" rx="4" fill="#8B5A2B"/>
  <ellipse cx="896" cy="225" rx="32" ry="45" fill="#4A6B50" opacity="0.5"/>
  <ellipse cx="908" cy="238" rx="25" ry="32" fill="#6B8F71" opacity="0.4"/>

  <!-- Location pin -->
  <path d="M600 105 Q575 105 565 127 Q555 147 575 180 L600 215 L625 180 Q645 147 635 127 Q625 105 600 105 Z" fill="#C4622D" opacity="0.55"/>
  <circle cx="600" cy="137" r="14" fill="#FAF7F2"/>

  ${dots([[340,180,5,'#C4622D',0.4],[960,190,6,'#6B8F71',0.35],[120,200,4,'#C4622D',0.3]])}`, [130, 300, 270, 1060, 210, 230, 920, 500, 150]);
  },

  'mountain-view': () => {
    // Mountains + tech campus
    return wrap(`
  <rect x="0" y="400" width="1200" height="4" rx="2" fill="#D8D0C8" opacity="0.5"/>

  <!-- Mountain range -->
  <path d="M0 400 L200 240 L350 320 L500 200 L650 310 L800 220 L1000 350 L1200 280 L1200 400 Z" fill="#6B8F71" opacity="0.18"/>
  <path d="M0 400 L250 270 L380 340 L530 230 L680 330 L830 250 L1050 370 L1200 310 L1200 400 Z" fill="#4A6B50" opacity="0.12"/>
  <!-- Snow caps -->
  <path d="M490 200 L500 200 L510 210" fill="#FAF7F2" opacity="0.4"/>
  <path d="M790 220 L800 220 L812 232" fill="#FAF7F2" opacity="0.35"/>

  <!-- Tech campus (center foreground) -->
  <!-- Building 1 - circular tech building -->
  <ellipse cx="500" cy="350" rx="65" ry="30" fill="#E0D8CF"/>
  <rect x="440" y="310" width="120" height="40" rx="8" fill="#D8D0C8"/>
  <rect x="446" y="314" width="108" height="32" rx="6" fill="#E8F0E9" opacity="0.5"/>
  <path d="M440 310 Q500 290 560 310" fill="#E0D8CF"/>
  <!-- Building 2 - glass box -->
  <rect x="600" y="300" width="90" height="80" rx="4" fill="#E0D8CF"/>
  <rect x="608" y="308" width="30" height="28" rx="2" fill="#E8F0E9"/>
  <rect x="648" y="308" width="30" height="28" rx="2" fill="#E8F0E9"/>
  <rect x="608" y="344" width="30" height="28" rx="2" fill="#E8F0E9"/>
  <rect x="648" y="344" width="30" height="28" rx="2" fill="#E8F0E9"/>
  <!-- Walkway between buildings -->
  <rect x="560" y="360" width="40" height="8" rx="2" fill="#D8D0C8" opacity="0.5"/>

  <!-- Trees around campus -->
  <circle cx="420" cy="340" r="18" fill="#6B8F71" opacity="0.5"/>
  <rect x="418" y="355" width="4" height="25" rx="2" fill="#4A6B50"/>
  <circle cx="710" cy="340" r="20" fill="#4A6B50" opacity="0.45"/>
  <rect x="708" y="358" width="4" height="22" rx="2" fill="#4A6B50"/>

  <!-- Location pin -->
  <path d="M580 130 Q555 130 545 152 Q535 172 555 205 L580 240 L605 205 Q625 172 615 152 Q605 130 580 130 Z" fill="#6B8F71" opacity="0.6"/>
  <circle cx="580" cy="162" r="14" fill="#FAF7F2"/>

  ${dots([[200,200,5,'#C4622D',0.4],[900,200,6,'#6B8F71',0.35],[350,180,4,'#C4622D',0.3]])}`, [150, 310, 250, 1040, 220, 230, 880, 480, 160]);
  },

  'sunnyvale': () => {
    // Sun + suburban homes + palm trees
    return wrap(`
  <rect x="0" y="395" width="1200" height="4" rx="2" fill="#D8D0C8" opacity="0.5"/>

  <!-- Large sun -->
  <circle cx="850" cy="180" r="60" fill="#F8D830" opacity="0.2"/>
  <circle cx="850" cy="180" r="45" fill="#F8D830" opacity="0.15"/>
  <circle cx="850" cy="180" r="30" fill="#FDE860" opacity="0.15"/>
  <!-- Sun rays -->
  <line x1="850" y1="110" x2="850" y2="125" stroke="#F8D830" stroke-width="3" opacity="0.2" stroke-linecap="round"/>
  <line x1="895" y1="135" x2="885" y2="145" stroke="#F8D830" stroke-width="3" opacity="0.2" stroke-linecap="round"/>
  <line x1="910" y1="180" x2="895" y2="180" stroke="#F8D830" stroke-width="3" opacity="0.2" stroke-linecap="round"/>
  <line x1="805" y1="135" x2="815" y2="145" stroke="#F8D830" stroke-width="3" opacity="0.2" stroke-linecap="round"/>
  <line x1="790" y1="180" x2="805" y2="180" stroke="#F8D830" stroke-width="3" opacity="0.2" stroke-linecap="round"/>

  <!-- Suburban houses -->
  <!-- House 1 -->
  <rect x="280" y="315" width="90" height="80" rx="3" fill="#E0D8CF"/>
  <path d="M270 315 L325 265 L380 315" fill="#D8D0C8"/>
  <rect x="308" y="350" width="25" height="45" rx="2" fill="#4A6B50" opacity="0.4"/>
  <rect x="290" y="330" width="18" height="18" rx="2" fill="#E8F0E9"/>
  <rect x="350" y="330" width="18" height="18" rx="2" fill="#E8F0E9"/>
  <!-- House 2 (larger) -->
  <rect x="430" y="305" width="110" height="90" rx="3" fill="#D8D0C8"/>
  <path d="M420 305 L485 250 L550 305" fill="#E0D8CF"/>
  <rect x="468" y="345" width="28" height="50" rx="2" fill="#4A6B50" opacity="0.4"/>
  <rect x="508" y="320" width="20" height="18" rx="2" fill="#E8F0E9"/>
  <rect x="442" y="320" width="20" height="18" rx="2" fill="#E8F0E9"/>
  <!-- Garage -->
  <rect x="515" y="348" width="20" height="47" rx="2" fill="#D8D0C8" stroke="#B0A090" stroke-width="1"/>
  <!-- House 3 -->
  <rect x="610" y="310" width="85" height="85" rx="3" fill="#E0D8CF"/>
  <path d="M600 310 L652 260 L705 310" fill="#D8D0C8"/>
  <rect x="635" y="350" width="22" height="45" rx="2" fill="#4A6B50" opacity="0.4"/>
  <rect x="620" y="325" width="16" height="16" rx="2" fill="#E8F0E9"/>
  <rect x="670" y="325" width="16" height="16" rx="2" fill="#E8F0E9"/>

  <!-- Palm tree -->
  <rect x="210" y="280" width="7" height="115" rx="3.5" fill="#8A7858"/>
  <path d="M213 280 Q185 258 170 272" stroke="#6B8F71" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <path d="M213 280 Q240 258 258 270" stroke="#6B8F71" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <path d="M213 283 Q190 270 178 282" stroke="#4A6B50" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M213 283 Q238 270 250 280" stroke="#4A6B50" stroke-width="3.5" fill="none" stroke-linecap="round"/>

  <!-- Location pin -->
  <path d="M500 140 Q475 140 465 162 Q455 182 475 215 L500 250 L525 215 Q545 182 535 162 Q525 140 500 140 Z" fill="#C4622D" opacity="0.55"/>
  <circle cx="500" cy="172" r="14" fill="#FAF7F2"/>

  ${dots([[130,200,5,'#C4622D',0.4],[950,300,6,'#6B8F71',0.35],[750,270,4,'#6B8F71',0.3]])}`, [160, 310, 260, 1060, 190, 220, 900, 490, 150]);
  },

  'campbell': () => {
    // Water tower + downtown shops + oak tree
    return wrap(`
  <rect x="0" y="395" width="1200" height="4" rx="2" fill="#D8D0C8" opacity="0.5"/>

  <!-- Water tower (right) -->
  <rect x="780" y="270" width="14" height="125" rx="2" fill="#D8D0C8"/>
  <rect x="810" y="270" width="14" height="125" rx="2" fill="#D8D0C8"/>
  <!-- Cross brace -->
  <line x1="790" y1="310" x2="814" y2="360" stroke="#D8D0C8" stroke-width="3"/>
  <line x1="814" y1="310" x2="790" y2="360" stroke="#D8D0C8" stroke-width="3"/>
  <!-- Tank -->
  <ellipse cx="802" cy="260" rx="42" ry="28" fill="#E0D8CF"/>
  <ellipse cx="802" cy="255" rx="38" ry="22" fill="#D8D0C8"/>
  <!-- Band -->
  <rect x="765" y="252" width="74" height="6" rx="3" fill="#B0A090" opacity="0.4"/>

  <!-- Downtown shops (center) -->
  <rect x="380" y="300" width="80" height="95" rx="3" fill="#E0D8CF"/>
  <rect x="388" y="310" width="22" height="28" rx="2" fill="#E8F0E9"/>
  <rect x="416" y="310" width="22" height="28" rx="2" fill="#E8F0E9"/>
  <rect x="395" y="360" width="30" height="35" rx="2" fill="#4A6B50" opacity="0.35"/>
  <!-- Awning -->
  <path d="M378 300 L462 300 L458 310 L382 310 Z" fill="#C4622D" opacity="0.4"/>
  <!-- Shop 2 -->
  <rect x="470" y="295" width="75" height="100" rx="3" fill="#D8D0C8"/>
  <rect x="478" y="305" width="24" height="26" rx="2" fill="#E8F0E9"/>
  <rect x="510" y="305" width="24" height="26" rx="2" fill="#E8F0E9"/>
  <rect x="490" y="355" width="26" height="40" rx="2" fill="#4A6B50" opacity="0.35"/>
  <path d="M468 295 L547 295 L543 305 L472 305 Z" fill="#6B8F71" opacity="0.4"/>
  <!-- Shop 3 -->
  <rect x="555" y="305" width="70" height="90" rx="3" fill="#E0D8CF"/>
  <rect x="563" y="315" width="50" height="24" rx="2" fill="#E8F0E9"/>
  <rect x="572" y="360" width="24" height="35" rx="2" fill="#4A6B50" opacity="0.35"/>
  <path d="M553 305 L627 305 L623 315 L557 315 Z" fill="#C4622D" opacity="0.35"/>

  <!-- Oak tree (left) -->
  <rect x="218" y="310" width="14" height="85" rx="4" fill="#8B5A2B"/>
  <path d="M225 320 Q200 300 188 310" stroke="#8B5A2B" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M225 320 Q250 300 260 308" stroke="#8B5A2B" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <circle cx="225" cy="280" r="42" fill="#6B8F71" opacity="0.55"/>
  <circle cx="205" cy="292" r="30" fill="#4A6B50" opacity="0.45"/>
  <circle cx="248" cy="288" r="32" fill="#6B8F71" opacity="0.48"/>
  <circle cx="225" cy="265" r="25" fill="#4A6B50" opacity="0.4"/>

  <!-- Location pin -->
  <path d="M500 140 Q475 140 465 162 Q455 182 475 215 L500 250 L525 215 Q545 182 535 162 Q525 140 500 140 Z" fill="#6B8F71" opacity="0.55"/>
  <circle cx="500" cy="172" r="14" fill="#FAF7F2"/>

  ${dots([[340,190,5,'#C4622D',0.4],[900,200,6,'#6B8F71',0.35],[660,180,4,'#C4622D',0.3]])}`, [140, 300, 260, 1050, 210, 230, 920, 490, 150]);
  },

  'los-gatos': () => {
    // Rolling hills + charming downtown + tall trees
    return wrap(`
  <rect x="0" y="395" width="1200" height="4" rx="2" fill="#D8D0C8" opacity="0.5"/>

  <!-- Rolling hills -->
  <path d="M0 380 Q200 300 450 350 Q650 280 850 340 Q1050 290 1200 360 L1200 400 L0 400 Z" fill="#B5D4BB" opacity="0.22"/>
  <path d="M0 390 Q250 320 500 365 Q700 310 900 355 Q1100 310 1200 375 L1200 400 L0 400 Z" fill="#6B8F71" opacity="0.12"/>

  <!-- Charming downtown buildings -->
  <rect x="390" y="295" width="60" height="100" rx="4" fill="#D8D0C8"/>
  <path d="M385 295 L420 260 L455 295" fill="#E0D8CF"/>
  <rect x="402" y="320" width="14" height="18" rx="2" fill="#C4622D" opacity="0.35"/>
  <rect x="424" y="320" width="14" height="18" rx="2" fill="#C4622D" opacity="0.35"/>
  <rect x="408" y="360" width="20" height="35" rx="2" fill="#4A6B50" opacity="0.4"/>

  <rect x="460" y="285" width="70" height="110" rx="4" fill="#E0D8CF"/>
  <path d="M455 285 L495 250 L540 285" fill="#D8D0C8"/>
  <rect x="472" y="305" width="16" height="16" rx="2" fill="#E8F0E9"/>
  <rect x="498" y="305" width="16" height="16" rx="2" fill="#E8F0E9"/>
  <rect x="478" y="355" width="22" height="40" rx="2" fill="#4A6B50" opacity="0.4"/>
  <!-- Clock -->
  <circle cx="495" cy="268" r="8" fill="#FAF7F2" stroke="#D8D0C8" stroke-width="1"/>
  <line x1="495" y1="268" x2="495" y2="262" stroke="#4A6B50" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="495" y1="268" x2="500" y2="270" stroke="#4A6B50" stroke-width="1" stroke-linecap="round"/>

  <rect x="540" y="290" width="55" height="105" rx="3" fill="#D8D0C8"/>
  <rect x="548" y="305" width="14" height="14" rx="2" fill="#E8F0E9"/>
  <rect x="568" y="305" width="14" height="14" rx="2" fill="#E8F0E9"/>
  <rect x="555" y="355" width="18" height="40" rx="2" fill="#4A6B50" opacity="0.35"/>

  <!-- Tall redwood trees (left) -->
  <rect x="215" y="220" width="14" height="175" rx="4" fill="#8B5A2B"/>
  <circle cx="222" cy="210" r="38" fill="#4A6B50" opacity="0.5"/>
  <circle cx="210" cy="225" r="28" fill="#6B8F71" opacity="0.45"/>
  <circle cx="235" cy="220" r="26" fill="#4A6B50" opacity="0.42"/>

  <rect x="280" y="240" width="12" height="155" rx="3" fill="#8B5A2B"/>
  <circle cx="286" cy="230" r="30" fill="#6B8F71" opacity="0.48"/>
  <circle cx="278" cy="242" r="22" fill="#4A6B50" opacity="0.4"/>

  <!-- Location pin -->
  <path d="M490 145 Q465 145 455 167 Q445 187 465 220 L490 255 L515 220 Q535 187 525 167 Q515 145 490 145 Z" fill="#C4622D" opacity="0.55"/>
  <circle cx="490" cy="177" r="14" fill="#FAF7F2"/>

  ${dots([[150,185,5,'#C4622D',0.4],[820,200,6,'#6B8F71',0.35],[680,180,4,'#C4622D',0.3]])}`, [130, 290, 260, 1060, 210, 220, 920, 500, 155]);
  },

  'redwood-city': () => {
    // Courthouse dome + redwood trees
    return wrap(`
  <rect x="0" y="395" width="1200" height="4" rx="2" fill="#D8D0C8" opacity="0.5"/>

  <!-- Courthouse (center) -->
  <rect x="430" y="290" width="260" height="105" rx="4" fill="#D8D0C8"/>
  <!-- Columns -->
  <rect x="450" y="290" width="12" height="105" rx="3" fill="#E0D8CF"/>
  <rect x="482" y="290" width="12" height="105" rx="3" fill="#E0D8CF"/>
  <rect x="626" y="290" width="12" height="105" rx="3" fill="#E0D8CF"/>
  <rect x="658" y="290" width="12" height="105" rx="3" fill="#E0D8CF"/>
  <!-- Pediment / triangular top -->
  <path d="M425 290 L560 235 L695 290" fill="#E0D8CF"/>
  <path d="M440 290 L560 245 L680 290" fill="#D8D0C8"/>
  <!-- Dome -->
  <path d="M530 245 Q560 200 590 245" fill="#E0D8CF"/>
  <rect x="555" y="192" width="10" height="18" rx="3" fill="#D8D0C8"/>
  <!-- Dome detail -->
  <circle cx="560" cy="230" r="4" fill="#FAF7F2" opacity="0.4"/>
  <!-- Door -->
  <rect x="538" y="340" width="44" height="55" rx="4" fill="#4A6B50" opacity="0.4"/>
  <path d="M538 340 Q560 325 582 340" fill="#4A6B50" opacity="0.3"/>
  <!-- Steps -->
  <rect x="440" y="395" width="240" height="6" rx="2" fill="#D8D0C8" opacity="0.5"/>
  <rect x="445" y="389" width="230" height="6" rx="2" fill="#D8D0C8" opacity="0.4"/>

  <!-- Redwood tree 1 (left) -->
  <rect x="198" y="215" width="16" height="180" rx="4" fill="#8B5A2B"/>
  <circle cx="206" cy="205" r="42" fill="#4A6B50" opacity="0.5"/>
  <circle cx="192" cy="218" r="32" fill="#6B8F71" opacity="0.45"/>
  <circle cx="220" cy="212" r="30" fill="#4A6B50" opacity="0.42"/>
  <circle cx="206" cy="190" r="25" fill="#6B8F71" opacity="0.38"/>

  <!-- Redwood tree 2 (right) -->
  <rect x="850" y="225" width="14" height="170" rx="4" fill="#8B5A2B"/>
  <circle cx="857" cy="215" r="38" fill="#4A6B50" opacity="0.48"/>
  <circle cx="845" cy="228" r="28" fill="#6B8F71" opacity="0.42"/>
  <circle cx="870" cy="222" r="26" fill="#4A6B50" opacity="0.4"/>

  <!-- Location pin -->
  <path d="M560 115 Q535 115 525 137 Q515 157 535 190 L560 225 L585 190 Q605 157 595 137 Q585 115 560 115 Z" fill="#4A6B50" opacity="0.55"/>
  <circle cx="560" cy="147" r="14" fill="#FAF7F2"/>

  ${dots([[320,180,5,'#C4622D',0.4],[760,190,6,'#6B8F71',0.35],[920,300,4,'#C4622D',0.3]])}`, [140, 300, 270, 1060, 220, 230, 900, 490, 150]);
  },

  'fremont': () => {
    // Mission bell arch + open space + hills
    return wrap(`
  <rect x="0" y="395" width="1200" height="4" rx="2" fill="#D8D0C8" opacity="0.5"/>

  <!-- Gentle hills -->
  <path d="M0 380 Q300 310 600 360 Q900 310 1200 370 L1200 400 L0 400 Z" fill="#B5D4BB" opacity="0.2"/>

  <!-- Mission-style bell wall (center) -->
  <rect x="480" y="250" width="160" height="145" rx="4" fill="#D8C0A0"/>
  <!-- Bell arch cutouts -->
  <path d="M510 250 L510 215 Q560 185 610 215 L610 250" fill="#D8C0A0" stroke="#C8B090" stroke-width="2"/>
  <!-- Top decorative element -->
  <path d="M540 215 Q560 195 580 215" fill="#E0D0B8"/>
  <!-- Scalloped top -->
  <path d="M480 250 Q500 238 520 250 Q540 238 560 250 Q580 238 600 250 Q620 238 640 250" fill="#D8C0A0"/>
  <!-- Bell -->
  <path d="M545 225 Q560 220 575 225 L578 248 Q560 258 542 248 Z" fill="#C4622D" opacity="0.45"/>
  <line x1="560" y1="258" x2="560" y2="270" stroke="#C4622D" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/>
  <circle cx="560" cy="273" r="4" fill="#C4622D" opacity="0.4"/>
  <!-- Door -->
  <rect x="535" y="330" width="50" height="65" rx="4" fill="#4A6B50" opacity="0.35"/>
  <path d="M535 330 Q560 310 585 330" fill="#4A6B50" opacity="0.25"/>
  <!-- Windows -->
  <circle cx="510" cy="300" r="12" fill="#E8F0E9" opacity="0.6"/>
  <circle cx="610" cy="300" r="12" fill="#E8F0E9" opacity="0.6"/>
  <!-- Cross lines in windows -->
  <line x1="510" y1="290" x2="510" y2="310" stroke="#D8D0C8" stroke-width="1.2"/>
  <line x1="500" y1="300" x2="520" y2="300" stroke="#D8D0C8" stroke-width="1.2"/>

  <!-- Trees -->
  <circle cx="300" cy="330" r="35" fill="#6B8F71" opacity="0.5"/>
  <circle cx="288" cy="318" r="25" fill="#4A6B50" opacity="0.4"/>
  <rect x="297" y="360" width="8" height="35" rx="3" fill="#4A6B50"/>

  <circle cx="830" cy="335" r="30" fill="#4A6B50" opacity="0.45"/>
  <circle cx="840" cy="322" r="22" fill="#6B8F71" opacity="0.4"/>
  <rect x="828" y="360" width="7" height="35" rx="3" fill="#4A6B50"/>

  <!-- Location pin -->
  <path d="M560 105 Q535 105 525 127 Q515 147 535 180 L560 215 L585 180 Q605 147 595 127 Q585 105 560 105 Z" fill="#C4622D" opacity="0.55"/>
  <circle cx="560" cy="137" r="14" fill="#FAF7F2"/>

  ${dots([[200,200,5,'#C4622D',0.4],[900,210,6,'#6B8F71',0.4],[700,180,4,'#C4622D',0.3]])}`, [150, 290, 260, 1050, 210, 220, 920, 490, 150]);
  },

  'san-mateo': () => {
    // Bridge element + downtown skyline + bay water
    return wrap(`
  <rect x="0" y="395" width="1200" height="4" rx="2" fill="#D8D0C8" opacity="0.5"/>

  <!-- Bay water -->
  <path d="M0 380 Q300 370 600 378 Q900 370 1200 380 L1200 400 L0 400 Z" fill="#B5D4BB" opacity="0.18"/>
  <path d="M0 385 Q200 378 400 383 Q600 376 800 383 Q1000 378 1200 385 L1200 400 L0 400 Z" fill="#B5D4BB" opacity="0.12"/>

  <!-- Bridge hint (left) -->
  <rect x="200" y="290" width="14" height="105" rx="3" fill="#6B8F71" opacity="0.4"/>
  <rect x="360" y="290" width="14" height="105" rx="3" fill="#6B8F71" opacity="0.4"/>
  <path d="M207 300 Q280 270 367 300" stroke="#6B8F71" stroke-width="3.5" fill="none" opacity="0.35"/>
  <path d="M207 310 Q280 280 367 310" stroke="#6B8F71" stroke-width="2.5" fill="none" opacity="0.25"/>
  <!-- Road deck -->
  <rect x="195" y="345" width="185" height="8" rx="3" fill="#D8D0C8" opacity="0.4"/>

  <!-- Downtown skyline (center-right) -->
  <rect x="520" y="270" width="50" height="125" rx="3" fill="#D8D0C8"/>
  <rect x="580" y="250" width="60" height="145" rx="3" fill="#E0D8CF"/>
  <rect x="650" y="280" width="45" height="115" rx="3" fill="#D8D0C8"/>
  <rect x="705" y="260" width="55" height="135" rx="3" fill="#E0D8CF"/>
  <!-- Windows -->
  <rect x="530" y="288" width="14" height="14" rx="2" fill="#E8F0E9"/>
  <rect x="530" y="312" width="14" height="14" rx="2" fill="#E8F0E9"/>
  <rect x="530" y="336" width="14" height="14" rx="2" fill="#E8F0E9"/>
  <rect x="592" y="268" width="16" height="16" rx="2" fill="#E8F0E9"/>
  <rect x="592" y="296" width="16" height="16" rx="2" fill="#E8F0E9"/>
  <rect x="592" y="324" width="16" height="16" rx="2" fill="#E8F0E9"/>
  <rect x="718" y="278" width="14" height="14" rx="2" fill="#E8F0E9"/>
  <rect x="718" y="302" width="14" height="14" rx="2" fill="#E8F0E9"/>
  <rect x="718" y="326" width="14" height="14" rx="2" fill="#E8F0E9"/>

  <!-- Tree -->
  <circle cx="870" cy="330" r="30" fill="#6B8F71" opacity="0.5"/>
  <circle cx="858" cy="318" r="22" fill="#4A6B50" opacity="0.4"/>
  <rect x="867" y="355" width="7" height="40" rx="3" fill="#4A6B50"/>

  <!-- Location pin -->
  <path d="M620 140 Q595 140 585 162 Q575 182 595 215 L620 250 L645 215 Q665 182 655 162 Q645 140 620 140 Z" fill="#6B8F71" opacity="0.55"/>
  <circle cx="620" cy="172" r="14" fill="#FAF7F2"/>

  ${dots([[120,220,5,'#C4622D',0.4],[940,220,6,'#6B8F71',0.35],[440,185,4,'#C4622D',0.3]])}`, [150, 300, 260, 1050, 210, 230, 900, 490, 150]);
  },

  'walnut-creek': () => {
    // Mt Diablo + downtown + oak trees
    return wrap(`
  <rect x="0" y="395" width="1200" height="4" rx="2" fill="#D8D0C8" opacity="0.5"/>

  <!-- Mt Diablo -->
  <path d="M200 395 L420 220 L550 310 L680 195 L900 395 Z" fill="#6B8F71" opacity="0.18"/>
  <path d="M250 395 L440 245 L550 320 L680 215 L860 395 Z" fill="#4A6B50" opacity="0.12"/>
  <!-- Snow hint on peak -->
  <path d="M670 195 L680 195 L695 210" fill="#FAF7F2" opacity="0.3"/>

  <!-- Downtown buildings -->
  <rect x="460" y="295" width="50" height="100" rx="3" fill="#D8D0C8"/>
  <rect x="518" y="275" width="60" height="120" rx="3" fill="#E0D8CF"/>
  <rect x="586" y="300" width="45" height="95" rx="3" fill="#D8D0C8"/>
  <rect x="640" y="285" width="55" height="110" rx="3" fill="#E0D8CF"/>
  <!-- Windows -->
  <rect x="470" y="310" width="12" height="12" rx="2" fill="#E8F0E9"/>
  <rect x="470" y="332" width="12" height="12" rx="2" fill="#E8F0E9"/>
  <rect x="530" y="292" width="14" height="14" rx="2" fill="#E8F0E9"/>
  <rect x="530" y="318" width="14" height="14" rx="2" fill="#E8F0E9"/>
  <rect x="530" y="344" width="14" height="14" rx="2" fill="#E8F0E9"/>
  <rect x="652" y="302" width="12" height="12" rx="2" fill="#E8F0E9"/>
  <rect x="652" y="326" width="12" height="12" rx="2" fill="#E8F0E9"/>

  <!-- Oak tree 1 (left) -->
  <rect x="248" y="310" width="14" height="85" rx="4" fill="#8B5A2B"/>
  <circle cx="255" cy="278" r="40" fill="#6B8F71" opacity="0.55"/>
  <circle cx="240" cy="292" r="28" fill="#4A6B50" opacity="0.45"/>
  <circle cx="270" cy="286" r="30" fill="#6B8F71" opacity="0.48"/>
  <circle cx="255" cy="262" r="22" fill="#4A6B50" opacity="0.38"/>

  <!-- Oak tree 2 (right) -->
  <rect x="828" y="320" width="12" height="75" rx="3" fill="#8B5A2B"/>
  <circle cx="834" cy="292" r="32" fill="#4A6B50" opacity="0.5"/>
  <circle cx="822" cy="302" r="24" fill="#6B8F71" opacity="0.42"/>
  <circle cx="848" cy="298" r="22" fill="#4A6B50" opacity="0.4"/>

  <!-- Location pin -->
  <path d="M560 115 Q535 115 525 137 Q515 157 535 190 L560 225 L585 190 Q605 157 595 137 Q585 115 560 115 Z" fill="#4A6B50" opacity="0.55"/>
  <circle cx="560" cy="147" r="14" fill="#FAF7F2"/>

  ${dots([[180,200,5,'#C4622D',0.4],[920,210,6,'#6B8F71',0.35],[380,180,4,'#4A6B50',0.3]])}`, [140, 290, 260, 1060, 210, 230, 920, 490, 150]);
  },

  'marin': () => {
    // Rolling hills + coast + house + cypress trees
    return wrap(`
  <rect x="0" y="395" width="1200" height="4" rx="2" fill="#D8D0C8" opacity="0.5"/>

  <!-- Rolling coastal hills -->
  <path d="M0 370 Q200 290 450 340 Q650 270 850 330 Q1050 280 1200 350 L1200 400 L0 400 Z" fill="#B5D4BB" opacity="0.22"/>
  <path d="M0 380 Q250 310 500 355 Q700 295 900 345 Q1100 300 1200 365 L1200 400 L0 400 Z" fill="#6B8F71" opacity="0.12"/>

  <!-- Ocean/bay water -->
  <path d="M0 395 Q200 388 400 393 Q600 387 800 393 Q1000 388 1200 395 L1200 560 L0 560 Z" fill="#B5D4BB" opacity="0.1"/>
  <!-- Waves -->
  <path d="M100 402 Q150 398 200 402 Q250 398 300 402" stroke="#B5D4BB" stroke-width="2" fill="none" opacity="0.25"/>
  <path d="M500 405 Q550 400 600 405 Q650 400 700 405" stroke="#B5D4BB" stroke-width="2" fill="none" opacity="0.2"/>

  <!-- Coastal house (center) -->
  <rect x="480" y="305" width="100" height="85" rx="4" fill="#D8D0C8"/>
  <path d="M472 305 L530 260 L588 305" fill="#E0D8CF"/>
  <!-- Chimney -->
  <rect x="555" y="270" width="16" height="35" rx="2" fill="#D8D0C8"/>
  <rect x="508" y="340" width="24" height="50" rx="2" fill="#4A6B50" opacity="0.4"/>
  <rect x="540" y="320" width="16" height="16" rx="2" fill="#E8F0E9"/>
  <rect x="492" y="320" width="16" height="16" rx="2" fill="#E8F0E9"/>
  <!-- Door handle -->
  <circle cx="528" cy="368" r="3" fill="#4A6B50"/>

  <!-- Cypress tree 1 (left) -->
  <path d="M280 260 Q262 310 258 395 L302 395 Q298 310 280 260 Z" fill="#4A6B50" opacity="0.55"/>
  <path d="M280 270 Q268 310 265 388 L295 388 Q292 310 280 270 Z" fill="#6B8F71" opacity="0.38"/>

  <!-- Cypress tree 2 -->
  <path d="M350 275 Q338 315 335 395 L370 395 Q367 315 350 275 Z" fill="#4A6B50" opacity="0.5"/>
  <path d="M350 283 Q342 318 340 388 L365 388 Q362 318 350 283 Z" fill="#6B8F71" opacity="0.35"/>

  <!-- Cypress tree 3 (right) -->
  <path d="M780 270 Q765 310 762 395 L800 395 Q797 310 780 270 Z" fill="#4A6B50" opacity="0.5"/>
  <path d="M780 278 Q770 315 768 388 L794 388 Q790 315 780 278 Z" fill="#6B8F71" opacity="0.35"/>

  <!-- Sailboat on water -->
  <path d="M900 380 L910 355 L910 380 Z" fill="#FAF7F2" opacity="0.4"/>
  <path d="M910 355 L920 375 L910 380 Z" fill="#E0D8CF" opacity="0.35"/>
  <line x1="910" y1="355" x2="910" y2="385" stroke="#D8D0C8" stroke-width="1.5"/>

  <!-- Location pin -->
  <path d="M530 150 Q505 150 495 172 Q485 192 505 225 L530 260 L555 225 Q575 192 565 172 Q555 150 530 150 Z" fill="#C4622D" opacity="0.55"/>
  <circle cx="530" cy="182" r="14" fill="#FAF7F2"/>

  ${dots([[180,220,5,'#C4622D',0.4],[950,210,6,'#6B8F71',0.35],[650,185,4,'#C4622D',0.3]])}`, [130, 290, 270, 1070, 200, 220, 900, 500, 155]);
  },
};

// ─── GENERATE ALL FILES ──────────────────────────────────────────────

const serviceSlugs = [
  'personal-chef-for-seniors', 'diabetic-meal-prep', 'kitchen-optimization-seniors',
  'meal-prep-for-seniors', 'adaptive-cooking', 'caregiver-meal-support',
  'post-surgery-meal-prep', 'weekly-meal-prep', 'low-sodium-cooking',
  'heart-healthy-meal-prep', 'renal-diet-meal-prep', 'soft-food-meal-prep',
  'gluten-free-meal-prep', 'anti-inflammatory-cooking', 'allergen-free-cooking',
  'vegetarian-meal-prep', 'holiday-meal-preparation', 'dementia-meal-support',
  'parkinsons-meal-prep', 'arthritis-friendly-cooking', 'stroke-recovery-meals',
  'cancer-nutrition-meals', 'in-home-cooking-lessons', 'caregiver-cooking-training',
  'kitchen-safety-assessment', 'wheelchair-accessible-kitchen', 'aging-in-place-kitchen',
  'senior-nutrition-planning', 'pantry-organization-seniors',
  'kitchen-accessibility-consulting', 'long-distance-family-meal-coordination',
  'post-hospital-meal-transition', 'nutritional-needs-assessment', 'senior-diet-consulting',
  'medical-diet-planning', 'nutrition-coaching-seniors', 'single-serving-meal-prep',
  'kitchen-decluttering',
];

const locationSlugs = [
  'san-jose', 'mountain-view', 'palo-alto', 'san-francisco', 'oakland',
  'sunnyvale', 'campbell', 'los-gatos', 'redwood-city', 'fremont',
  'san-mateo', 'walnut-creek', 'marin',
];

let sCount = 0;
let lCount = 0;
let totalSize = 0;

// Generate service SVGs
for (const slug of serviceSlugs) {
  const fn = serviceIllustrations[slug];
  if (!fn) {
    console.error(`Missing illustration for service: ${slug}`);
    continue;
  }
  const content = fn();
  // Vary background circle positions per slug using simple hash
  const h = [...slug].reduce((a, c) => a + c.charCodeAt(0), 0);
  const bgP = [
    100 + (h % 80), 250 + (h % 80), 240 + (h % 60),
    1020 + (h % 80), 190 + (h % 60), 210 + (h % 50),
    880 + (h % 80), 480 + (h % 60), 140 + (h % 40),
  ];
  const svg = wrap(content, bgP);
  const path = join(SERVICES_DIR, `${slug}.svg`);
  const size = Buffer.byteLength(svg);
  totalSize += size;
  writeFileSync(path, svg);
  console.log(`  ${slug}.svg — ${(size / 1024).toFixed(1)} KB`);
  sCount++;
}

// Generate location SVGs
for (const slug of locationSlugs) {
  const fn = locationIllustrations[slug];
  if (!fn) {
    console.error(`Missing illustration for location: ${slug}`);
    continue;
  }
  const svg = fn();
  const path = join(LOCATIONS_DIR, `${slug}.svg`);
  const size = Buffer.byteLength(svg);
  totalSize += size;
  writeFileSync(path, svg);
  console.log(`  ${slug}.svg — ${(size / 1024).toFixed(1)} KB`);
  lCount++;
}

console.log(`\nGenerated ${sCount} service SVGs in ${SERVICES_DIR}`);
console.log(`Generated ${lCount} location SVGs in ${LOCATIONS_DIR}`);
console.log(`Total: ${sCount + lCount} SVG files (${(totalSize / 1024).toFixed(1)} KB total)`);

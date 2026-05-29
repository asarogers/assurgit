"use client";

import { useState } from "react";

/**
 * Try .png (Sage's connect.py output), fall back to .svg (manual / generated),
 * fall back to _default.svg (the generic Bay Area hero).
 */
const SOURCES = [
  (slug: string) => `/images/locations/${slug}.png`,
  (slug: string) => `/images/locations/${slug}.svg`,
  () => `/images/locations/_default.svg`,
];

export default function LocationHeroImage({ slug, alt }: { slug: string; alt: string }) {
  const [idx, setIdx] = useState(0);
  const src = SOURCES[idx](slug);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={1200}
      height={560}
      className="w-full h-auto object-cover"
      loading="eager"
      fetchPriority="high"
      decoding="async"
      onError={() => {
        if (idx < SOURCES.length - 1) setIdx(idx + 1);
      }}
    />
  );
}

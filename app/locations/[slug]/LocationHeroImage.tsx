"use client";

import { useState } from "react";

export default function LocationHeroImage({ slug, alt }: { slug: string; alt: string }) {
  const [src, setSrc] = useState(`/images/locations/${slug}.svg`);
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
        if (!src.endsWith("_default.svg")) {
          setSrc("/images/locations/_default.svg");
        }
      }}
    />
  );
}

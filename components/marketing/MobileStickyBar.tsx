"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`
        fixed bottom-0 inset-x-0 z-50 md:hidden
        transition-transform duration-300 ease-in-out
        ${visible ? "translate-y-0" : "translate-y-full"}
      `}
    >
      <div className="bg-[#0a0f1e] border-t border-white/10 px-4 py-3 safe-area-pb">
        <Link
          href="/book"
          className="
            block w-full text-center
            bg-[#2563eb] hover:bg-[#1d4ed8]
            text-white font-bold text-sm
            rounded-xl py-3.5
            transition-all duration-200
            hover:-translate-y-0.5 glow-blue-btn
          "
        >
          Book a Free Call
        </Link>
      </div>
    </div>
  );
}

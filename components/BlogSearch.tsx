'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';

/* ============================================================
   BlogSearch
   A search input that writes ?q= to the URL, allowing the
   server component blog page to filter posts by query.
   ============================================================ */
export default function BlogSearch({ initialValue = '' }: { initialValue?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialValue);

  // Keep local state in sync if the user navigates back/forward
  useEffect(() => {
    setValue(searchParams.get('q') || '');
  }, [searchParams]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const q = e.target.value;
      setValue(q);
      const params = new URLSearchParams(searchParams.toString());
      if (q.trim()) {
        params.set('q', q.trim());
      } else {
        params.delete('q');
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="relative w-full sm:w-80 lg:w-96">
      {/* Search icon */}
      <span
        className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#5A5A5A]/60"
        aria-hidden="true"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="Search articles…"
        aria-label="Search blog articles"
        className={[
          'w-full rounded-full border border-[#E0D8CF] bg-white',
          'pl-9 pr-4 py-2 text-sm text-[#2C2C2C]',
          'placeholder:text-[#5A5A5A]/60',
          'focus:border-[#6B8F71] focus:outline-none focus:ring-2 focus:ring-[#6B8F71]/30',
          'transition-colors',
        ].join(' ')}
      />
    </div>
  );
}

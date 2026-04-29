'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  /** Map of category name → post count */
  categoryCounts?: Record<string, number>;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  categoryCounts = {},
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setCategory = useCallback(
    (cat: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (cat === 'All') {
        params.delete('category');
      } else {
        params.set('category', cat);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return (
    <div
      role="group"
      aria-label="Filter articles by category"
      className="flex flex-wrap gap-2.5"
    >
      {categories.map((cat) => {
        const isActive = cat === activeCategory;
        const count = categoryCounts[cat];
        return (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            aria-pressed={isActive}
            className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4622D] ${
              isActive
                ? 'bg-[#4A6B50] text-white shadow-sm'
                : 'bg-[#E8F0E9] text-[#4A6B50] hover:bg-[#6B8F71] hover:text-white'
            }`}
          >
            {cat}
            {count !== undefined && (
              <span
                className={`inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-xs font-bold leading-none ${
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'bg-[#4A6B50]/10 text-[#4A6B50]'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

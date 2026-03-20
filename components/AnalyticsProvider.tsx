'use client';

import { useEffect } from 'react';
import { captureUTM, Events } from '@/lib/analytics';

/**
 * Mount once in the root layout (inside <body>).
 *
 * Responsibilities:
 *  1. Capture UTM params from the URL into localStorage (first-touch attribution)
 *  2. Track scroll depth at 25 / 50 / 75 / 90% milestones via GA4
 */
export default function AnalyticsProvider() {
  useEffect(() => {
    captureUTM();

    const milestones = [25, 50, 75, 90];
    const fired = new Set<number>();

    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((window.scrollY / docHeight) * 100);
      for (const m of milestones) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          Events.scrollDepth(m);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}

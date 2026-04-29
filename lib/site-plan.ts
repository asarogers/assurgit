/**
 * Site plan loader — bridges the SEO pipeline to the Next.js build.
 *
 * The pipeline (/repo/agents/Atlas/workspace/tasks/serp-signals/emit_site_plan.py)
 * writes /repo/<client>/site-plan.json after each run. The template reads it
 * at *build time* to drive:
 *   - sitemap priorities (higher priority for target_now URLs)
 *   - homepage "featured services" (replaces hardcoded cards)
 *   - noindex for pages in the `exclude` / `orphans` buckets
 *
 * Everything here MUST fall back gracefully — if site-plan.json is missing,
 * malformed, or predates this template version, the site must still build.
 *
 * Do NOT import this in a component that runs on edge/runtime. This is a
 * build-time loader — `readFileSync` is fine here because Next.js executes
 * sitemap/metadata/page.tsx during `next build`.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

export type SitePlanLink = {
  url: string;
  keyword?: string;
  tier?: 'G' | 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  archetype?: string;
  opportunity?: number;
  action?: string;
  reason?: string;
};

export type SitePlan = {
  project: string;
  generated: string;
  scored_date: string;
  total_keywords: number;
  sitemaps: {
    priority: { filename: string; description: string; urls: SitePlanLink[] };
    longtail: { filename: string; description: string; urls: SitePlanLink[] };
  };
  orphans: { description: string; urls: SitePlanLink[] };
  exclude: { description: string; urls: SitePlanLink[] };
  internal_linking: {
    homepage: { description: string; links: SitePlanLink[] };
    hub:      { description: string; links: SitePlanLink[] };
    footer:   { description: string; links: SitePlanLink[] };
  };
  clusters: Record<string, unknown>;
  lastmod_schedule: Array<{ week: number; target_date: string; count: number; urls: string[] }>;
};

let _cached: SitePlan | null | undefined = undefined;

/**
 * Load the site plan for the current repo. Returns null if missing/invalid —
 * callers should branch on null and fall back to their hardcoded defaults.
 */
export function loadSitePlan(): SitePlan | null {
  if (_cached !== undefined) return _cached;
  try {
    const path = join(process.cwd(), 'site-plan.json');
    const raw = readFileSync(path, 'utf-8');
    const plan = JSON.parse(raw) as SitePlan;
    if (!plan?.sitemaps || !plan?.internal_linking) {
      _cached = null;
      return null;
    }
    _cached = plan;
    return plan;
  } catch {
    _cached = null;
    return null;
  }
}

/**
 * Extract the slug (last path segment) from any URL — "/services/foo-bar" → "foo-bar".
 */
export function urlToSlug(url: string): string {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1] ?? '';
}

/**
 * Set of slugs whose action is `target_now` (G/F tier, high opportunity).
 * Used by sitemap to boost priority and by homepage to feature them.
 */
export function priorityServiceSlugs(plan: SitePlan | null): Set<string> {
  if (!plan) return new Set();
  return new Set(
    plan.sitemaps.priority.urls
      .filter((u) => u.url.startsWith('/services/'))
      .map((u) => urlToSlug(u.url)),
  );
}

/**
 * Set of slugs to noindex (exclude + orphans). Fed into per-page generateMetadata.
 */
export function noindexSlugs(plan: SitePlan | null): Set<string> {
  if (!plan) return new Set();
  const excluded = plan.exclude?.urls?.map((u) => urlToSlug(u.url)) ?? [];
  const orphans  = plan.orphans?.urls?.map((u) => urlToSlug(u.url)) ?? [];
  return new Set([...excluded, ...orphans]);
}

/**
 * Homepage featured service links — top N from internal_linking.homepage.
 * Returns empty array if plan is missing; caller should fall back to its defaults.
 */
export function homepageFeaturedLinks(plan: SitePlan | null, max = 3): SitePlanLink[] {
  if (!plan) return [];
  return plan.internal_linking?.homepage?.links?.slice(0, max) ?? [];
}

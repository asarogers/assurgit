/**
 * lib/service-faqs.ts
 *
 * Per-service FAQ sets. Each slug maps to PAA-aligned questions specific to
 * that service. Falls back to SERVICE_FAQS from common-faqs.ts.
 */
import type { FAQ } from "@/lib/common-faqs";

export const SERVICE_FAQ_MAP: Record<string, FAQ[]> = {};

export function getServiceFAQs(slug: string): FAQ[] | null {
  return SERVICE_FAQ_MAP[slug] ?? null;
}

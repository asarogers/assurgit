import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://assurgit.com";
  const now = new Date();

  const forSlugs = [
    "attorneys",
    "business-coaches",
    "chiropractors",
    "consultants",
    "financial-advisors",
    "handyman-contractors",
    "loan-officers",
    "meal-prep-coaches",
    "mortgage-brokers",
    "personal-trainers",
    "real-estate-agents",
    "life-coaches",
    "fitness-coaches",
    "wellness-coaches",
    "nutritionists",
    "career-coaches",
    "insurance-agents",
    "cpas",
    "sales-coaches",
    "dentists",
    "therapists",
    "physical-therapists",
  ];

  const compareSlugs = [
    "assurgit-vs-heygen",
    "assurgit-vs-synthesia",
    "assurgit-vs-marketing-agency",
    "assurgit-vs-freelance-video-editor",
    "assurgit-vs-in-house-video-team",
    "done-for-you-vs-diy-video",
  ];

  const bestSlugs = [
    "done-for-you-ai-video-service",
    "ai-avatar-service-for-business",
    "ai-tools-for-loan-officers",
    "ai-tools-personal-brand",
    "video-content-service-for-coaches",
    "done-for-you-social-media-content-services",
    "heygen-alternatives",
    "video-content-services-real-estate-agents",
  ];

  const featureSlugs = [
    "ai-avatar",
    "voice-cloning",
    "ai-script-writing",
    "human-qc",
    "auto-publishing",
    "competitive-intelligence",
    "research-pipeline",
  ];

  return [
    // Core pages
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/local-seo`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },

    // Blog posts
    { url: `${base}/blog/best-ai-video-agency-for-coaches`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/ai-video-ads-pricing-2026`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/heygen-vs-custom-ai-avatars`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/done-for-you-ai-video-content`, lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/linkedin-video-strategy-for-business-owners`, lastModified: new Date("2026-03-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/how-to-get-clients-from-social-media-without-posting-every-day`, lastModified: new Date("2026-03-27"), changeFrequency: "monthly", priority: 0.7 },

    // Tools
    { url: `${base}/tools/ai-video-tools`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Use case pages (/for/)
    ...forSlugs.map((slug) => ({
      url: `${base}/for/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    // Comparison pages (/compare/)
    ...compareSlugs.map((slug) => ({
      url: `${base}/compare/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),

    // Best-of pages (/best/)
    ...bestSlugs.map((slug) => ({
      url: `${base}/best/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),

    // Feature pages (/features/)
    ...featureSlugs.map((slug) => ({
      url: `${base}/features/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

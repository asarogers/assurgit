import { cookies }  from "next/headers";
import { redirect }  from "next/navigation";
import { verifyOwnerSession } from "@/lib/auth";
import { getDb }     from "@/lib/db";
import { projects }  from "@/lib/db/schema";
import { scheduledPosts } from "@/lib/db/pg-schema";
import { socialAccounts } from "@/lib/db/social-schema";
import { desc, eq, gte } from "drizzle-orm";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { syncMetrics }        from "@/lib/social/sync-metrics";

const PERIODS = { "7": 7, "30": 30, "90": 90, "all": 365 * 10 } as const;

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const cookieStore = await cookies();
  const session     = cookieStore.get("owner_session")?.value;
  if (!session || !(await verifyOwnerSession(session))) redirect("/login");

  const { period: periodParam } = await searchParams;
  const periodDays = PERIODS[(periodParam as keyof typeof PERIODS) ?? "30"] ?? 30;
  const startTs    = Date.now() - periodDays * 24 * 60 * 60 * 1000;

  const db = getDb();

  // Sync metrics on page load — skips posts fetched within the last 8 hours
  try { await syncMetrics(); } catch { /* non-fatal */ }

  // All projects
  const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt));

  // All social accounts
  const allAccounts = await db.select().from(socialAccounts);

  // All scheduled posts joined with account info (for platform)
  const allPosts = await db
    .select({ post: scheduledPosts, account: socialAccounts })
    .from(scheduledPosts)
    .innerJoin(socialAccounts, eq(scheduledPosts.socialAccountId, socialAccounts.id))
    .orderBy(desc(scheduledPosts.createdAt));

  // ── Activity calendar: last 84 days ─────────────────────────────────
  const DAY = 24 * 60 * 60 * 1000;
  const today = new Date(); today.setHours(0,0,0,0);
  const activityDays = Array.from({ length: 84 }, (_, i) => {
    const d = new Date(today.getTime() - (83 - i) * DAY);
    return { date: d.toISOString().slice(0, 10), count: 0 };
  });
  const dayIndex = new Map(activityDays.map((d, i) => [d.date, i]));
  for (const { post } of allPosts) {
    if (post.status === "published" && post.publishedAt) {
      const key = new Date(post.publishedAt).toISOString().slice(0, 10);
      const i = dayIndex.get(key);
      if (i !== undefined) activityDays[i].count++;
    }
  }

  // Filter posts to current period for stats
  const periodPosts = allPosts.filter(({ post }) => post.createdAt >= startTs);
  const prevPeriodPosts = allPosts.filter(({ post }) =>
    post.createdAt >= startTs - periodDays * DAY && post.createdAt < startTs
  );

  const countBy = (posts: typeof allPosts, pred: (p: typeof allPosts[0]) => boolean) =>
    posts.filter(pred).length;

  // ── KPIs ─────────────────────────────────────────────────────────────
  const pub     = countBy(periodPosts, ({ post }) => post.status === "published");
  const failed  = countBy(periodPosts, ({ post }) => post.status === "failed");
  const sched   = countBy(periodPosts, ({ post }) => post.status === "scheduled");
  const draft   = countBy(periodPosts, ({ post }) => post.status === "draft");
  const prevPub = countBy(prevPeriodPosts, ({ post }) => post.status === "published");

  const kpis = {
    totalPublished:        pub,
    totalFailed:           failed,
    totalScheduled:        sched,
    totalDraft:            draft,
    totalConnectedAccounts: allAccounts.length,
    successRate:           pub + failed > 0 ? Math.round((pub / (pub + failed)) * 100) : 100,
    publishedThisPeriod:   pub,
    publishedPrevPeriod:   prevPub,
  };

  // ── Platform breakdown ───────────────────────────────────────────────
  const platformMap = new Map<string, { published: number; failed: number; scheduled: number; accounts: number }>();
  for (const { post, account } of periodPosts) {
    const p = account.platform;
    if (!platformMap.has(p)) platformMap.set(p, { published: 0, failed: 0, scheduled: 0, accounts: 0 });
    const entry = platformMap.get(p)!;
    if (post.status === "published") entry.published++;
    if (post.status === "failed")    entry.failed++;
    if (post.status === "scheduled") entry.scheduled++;
  }
  for (const account of allAccounts) {
    if (!platformMap.has(account.platform)) platformMap.set(account.platform, { published: 0, failed: 0, scheduled: 0, accounts: 0 });
    platformMap.get(account.platform)!.accounts++;
  }
  const platforms = [...platformMap.entries()]
    .map(([platform, stats]) => ({
      platform,
      ...stats,
      successRate: stats.published + stats.failed > 0
        ? Math.round((stats.published / (stats.published + stats.failed)) * 100)
        : 100,
    }))
    .sort((a, b) => b.published - a.published);

  // ── Per-project breakdown ───────────────────────────────────────────
  const projectPostMap = new Map<string, { published: number; failed: number; scheduled: number; lastPublishedAt: number | null; platforms: Set<string> }>();
  for (const p of allProjects) projectPostMap.set(p.id, { published: 0, failed: 0, scheduled: 0, lastPublishedAt: null, platforms: new Set() });

  for (const { post, account } of periodPosts) {
    const entry = projectPostMap.get(post.projectId);
    if (!entry) continue;
    entry.platforms.add(account.platform);
    if (post.status === "published") {
      entry.published++;
      if (!entry.lastPublishedAt || (post.publishedAt ?? 0) > entry.lastPublishedAt) {
        entry.lastPublishedAt = post.publishedAt ?? null;
      }
    }
    if (post.status === "failed")    entry.failed++;
    if (post.status === "scheduled") entry.scheduled++;
  }

  const projectStats = allProjects.map((project) => {
    const stats = projectPostMap.get(project.id)!;
    return {
      id:             project.id,
      name:           project.name,
      clientEmail:    project.clientEmail ?? null,
      platforms:      [...stats.platforms],
      published:      stats.published,
      failed:         stats.failed,
      scheduled:      stats.scheduled,
      successRate:    stats.published + stats.failed > 0
                        ? Math.round((stats.published / (stats.published + stats.failed)) * 100)
                        : 100,
      lastPublishedAt: stats.lastPublishedAt,
    };
  }).sort((a, b) => b.published - a.published);

  // ── Recent published posts ───────────────────────────────────────────
  const projectNameMap = new Map(allProjects.map((p) => [p.id, p.name]));
  const publishedPosts = allPosts.filter(({ post }) => post.status === "published");

  const recentPosts = publishedPosts
    .slice(0, 30)
    .map(({ post, account }) => {
      // Read from typed columns; fall back to legacy JSON blob for older rows
      let metrics: { impressions?: number; views?: number; likes?: number; comments?: number; upvotes?: number } | null = null;
      if (post.metricsFetchedAt) {
        metrics = {
          impressions: post.metricsImpressions ?? undefined,
          views:       post.metricsViews       ?? undefined,
          likes:       post.metricsLikes        ?? undefined,
          comments:    post.metricsComments     ?? undefined,
          upvotes:     post.metricsUpvotes      ?? undefined,
        };
      } else if (post.metrics) {
        try { metrics = JSON.parse(post.metrics); } catch {}
      }
      return {
        id:          post.id,
        platform:    account.platform,
        accountName: account.accountName,
        projectName: projectNameMap.get(post.projectId) ?? "Unknown",
        caption:     post.caption,
        title:       post.title,
        subreddit:   post.subreddit,
        publishedAt: post.publishedAt ?? post.updatedAt,
        mediaType:   post.mediaType,
        igMediaId:   post.igMediaId,
        metrics,
      };
    });

  // ── Video performance (all published posts with views data) ──────────
  const videoPosts = publishedPosts
    .map(({ post, account }) => {
      // Typed columns first; legacy JSON fallback for rows not yet re-synced
      let views: number | null    = post.metricsViews ?? post.metricsImpressions ?? null;
      let likes: number | null    = post.metricsLikes ?? null;
      let comments: number | null = post.metricsComments ?? null;
      if (views === null && post.metrics) {
        try {
          const m = JSON.parse(post.metrics);
          views    = m?.views ?? m?.impressions ?? null;
          likes    = m?.likes    ?? null;
          comments = m?.comments ?? null;
        } catch {}
      }
      return {
        id:          post.id,
        projectId:   post.projectId,
        projectName: projectNameMap.get(post.projectId) ?? "Unknown",
        platform:    account.platform,
        accountName: account.accountName,
        title:       post.title,
        caption:     post.caption,
        publishedAt: post.publishedAt ?? post.updatedAt,
        views,
        likes,
        comments,
      };
    })
    .filter((p) => p.views !== null)
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0));

  const clientList = allProjects.map((p) => ({ id: p.id, name: p.name }));

  return (
    <AnalyticsDashboard
      period={String(periodDays)}
      kpis={kpis}
      activityDays={activityDays}
      platforms={platforms}
      projectStats={projectStats}
      recentPosts={recentPosts}
      videoPosts={videoPosts}
      clientList={clientList}
    />
  );
}

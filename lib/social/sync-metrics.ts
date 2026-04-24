/**
 * Sync engagement metrics from social platforms into typed DB columns.
 *
 * Called directly from the analytics page (on demand) and optionally from
 * the cron route. Skips posts fetched within the last 8 hours so it never
 * hammers platform APIs on every page load.
 */

import { getDb }           from "@/lib/db";
import { scheduledPosts } from "@/lib/db/pg-schema";
import { socialAccounts } from "@/lib/db/social-schema";
import { getPostInsights } from "@/lib/social/instagram";
import { getVideoStats, refreshAccessToken as refreshYouTubeToken } from "@/lib/social/youtube";
import { getRedditPostStats } from "@/lib/social/reddit";
import { eq, and, isNotNull } from "drizzle-orm";

const EIGHT_HOURS = 8 * 60 * 60 * 1000;

export async function syncMetrics(opts: {
  /** Cloudflare env — needed to refresh YouTube tokens in Worker context */
  env?: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string };
} = {}): Promise<{ synced: number }> {
  const db  = getDb();
  const now = Date.now();

  const candidates = await db
    .select({ post: scheduledPosts, account: socialAccounts })
    .from(scheduledPosts)
    .innerJoin(socialAccounts, eq(scheduledPosts.socialAccountId, socialAccounts.id))
    .where(and(
      eq(scheduledPosts.status, "published"),
      isNotNull(scheduledPosts.igMediaId),
    ));

  let synced = 0;

  for (const { post, account } of candidates) {
    // Skip if we fetched metrics within the staleness window
    if (post.metricsFetchedAt && now - post.metricsFetchedAt < EIGHT_HOURS) continue;

    try {
      let update: Partial<typeof post> | null = null;

      if (account.platform === "instagram") {
        const m = await getPostInsights(post.igMediaId!, account.accessToken);
        if (m) {
          update = {
            metricsImpressions: m.impressions,
            metricsReach:       m.reach,
            metricsLikes:       m.likes,
            metricsComments:    m.comments,
            metricsShares:      m.shares,
            metricsSaved:       m.saved,
            metricsFetchedAt:   now,
          };
        }
      } else if (account.platform === "youtube" && account.refreshToken) {
        let token = account.accessToken;
        if (now > account.tokenExpiresAt - 60_000) {
          const r = await refreshYouTubeToken(
            account.refreshToken,
            opts.env?.GOOGLE_CLIENT_ID  ?? "",
            opts.env?.GOOGLE_CLIENT_SECRET ?? "",
          );
          token = r.accessToken;
          await db.update(socialAccounts)
            .set({ accessToken: token, tokenExpiresAt: now + r.expiresIn * 1000, updatedAt: now })
            .where(eq(socialAccounts.id, account.id));
        }
        const m = await getVideoStats(post.igMediaId!, token);
        if (m) {
          update = {
            metricsViews:    m.views,
            metricsLikes:    m.likes,
            metricsComments: m.comments,
            metricsFetchedAt: now,
          };
        }
      } else if (account.platform === "reddit") {
        const m = await getRedditPostStats(post.igMediaId!);
        if (m) {
          update = {
            metricsUpvotes:     m.upvotes,
            metricsComments:    m.comments,
            metricsUpvoteRatio: m.upvoteRatio,
            metricsFetchedAt:   now,
          };
        }
      }

      if (update) {
        await db.update(scheduledPosts)
          .set({ ...update, updatedAt: now })
          .where(eq(scheduledPosts.id, post.id));
        synced++;
      }
    } catch (err) {
      console.error(`Metrics sync failed for post ${post.id}:`, err);
    }
  }

  return { synced };
}

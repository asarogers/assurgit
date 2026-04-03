import { getDb } from "@/lib/db";
import { scheduledPosts, socialAccounts } from "@/lib/db/social-schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { getPostInsights } from "@/lib/social/instagram";
import { getVideoStats, refreshAccessToken as refreshYouTubeToken } from "@/lib/social/youtube";
import { getRedditPostStats } from "@/lib/social/reddit";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq, and, isNotNull } from "drizzle-orm";

export async function POST(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { env } = getCloudflareContext() as any;
  const db = getDb();
  const now = Date.now();

  // Find published posts with igMediaId that have no metrics yet (or fetched >6h ago)
  const candidates = await db
    .select({ post: scheduledPosts, account: socialAccounts })
    .from(scheduledPosts)
    .innerJoin(socialAccounts, eq(scheduledPosts.socialAccountId, socialAccounts.id))
    .where(and(
      eq(scheduledPosts.status, "published"),
      isNotNull(scheduledPosts.igMediaId),
    ));

  let synced = 0;
  const SIX_HOURS = 6 * 60 * 60 * 1000;

  for (const { post, account } of candidates) {
    // Skip if fetched recently
    if (post.metrics) {
      try {
        const m = JSON.parse(post.metrics);
        if (m.fetchedAt && now - m.fetchedAt < SIX_HOURS) continue;
      } catch {}
    }

    try {
      let metrics: Record<string, unknown> | null = null;

      if (account.platform === "instagram") {
        metrics = await getPostInsights(post.igMediaId!, account.accessToken);
      } else if (account.platform === "youtube" && account.refreshToken) {
        let token = account.accessToken;
        if (now > account.tokenExpiresAt - 60000) {
          const r = await refreshYouTubeToken(account.refreshToken, env.GOOGLE_CLIENT_ID ?? "", env.GOOGLE_CLIENT_SECRET ?? "");
          token = r.accessToken;
          await db.update(socialAccounts)
            .set({ accessToken: token, tokenExpiresAt: now + r.expiresIn * 1000, updatedAt: now })
            .where(eq(socialAccounts.id, account.id));
        }
        metrics = await getVideoStats(post.igMediaId!, token);
      } else if (account.platform === "reddit") {
        // Reddit post stats are public — no auth required
        metrics = await getRedditPostStats(post.igMediaId!);
      }

      if (metrics) {
        await db.update(scheduledPosts)
          .set({ metrics: JSON.stringify({ ...metrics, fetchedAt: now }), updatedAt: now })
          .where(eq(scheduledPosts.id, post.id));
        synced++;
      }
    } catch (err) {
      console.error(`Metrics sync failed for post ${post.id}:`, err);
    }
  }

  return Response.json({ ok: true, synced });
}

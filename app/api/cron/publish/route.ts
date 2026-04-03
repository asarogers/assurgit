import { getDb } from "@/lib/db";
import { scheduledPosts, socialAccounts } from "@/lib/db/social-schema";
import { createInstagramContainer, publishInstagramContainer } from "@/lib/social/instagram";
import { publishYouTubeVideo } from "@/lib/social/youtube";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq, and, lte, isNotNull } from "drizzle-orm";

async function publishRedditViaZernio(opts: {
  apiKey:    string;
  accountId: string;   // Zernio accountId stored on connect
  title:     string;
  body:      string;
  subreddit: string;
  mediaUrl?: string;
}): Promise<string | null> {
  const body: Record<string, unknown> = {
    title:   opts.title,
    content: opts.body || opts.title,
    platforms: [{
      platform:             "reddit",
      accountId:            opts.accountId,
      platformSpecificData: { subreddit: opts.subreddit, title: opts.title },
    }],
    publishNow: true,
  };

  if (opts.mediaUrl) {
    const isVideo = /\.(mp4|mov|webm)$/i.test(opts.mediaUrl);
    body.mediaItems = [{ type: isVideo ? "video" : "image", url: opts.mediaUrl }];
  }

  const res = await fetch("https://zernio.com/api/v1/posts", {
    method:  "POST",
    headers: { Authorization: `Bearer ${opts.apiKey}`, "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json() as any;
    throw new Error(err.message ?? err.error ?? `Zernio post failed (${res.status})`);
  }

  // Try to extract native Reddit post ID from Zernio response
  const data = await res.json() as any;
  const platformEntry = data?.platforms?.find?.((p: any) => p.platform === "reddit")
    ?? data?.posts?.find?.((p: any) => p.platform === "reddit");
  return platformEntry?.postId ?? platformEntry?.platformPostId ?? data?.postId ?? null;
}

async function runPublish(db: ReturnType<typeof getDb>, env: Record<string, string>) {
  const now = Date.now();

  const due = await db
    .select({ post: scheduledPosts, account: socialAccounts })
    .from(scheduledPosts)
    .innerJoin(socialAccounts, eq(scheduledPosts.socialAccountId, socialAccounts.id))
    .where(and(
      eq(scheduledPosts.status, "scheduled"),
      lte(scheduledPosts.scheduledFor, now),
    ));

  // ── Phase 1 & 2: Instagram — disabled (not in use yet) ──────────────────────
  // for (const { post, account } of due.filter(({ post, account }) =>
  //   account.platform === "instagram" && !post.igContainerId
  // )) { ... createInstagramContainer ... }
  //
  // const readyIg = await db.select()...where(instagram + igContainerId set)
  // for (const { post, account } of readyIg) { ... publishInstagramContainer ... }

  // ── Phase 3: YouTube — direct upload via YouTube Data API v3 ─────────────
  for (const { post, account } of due.filter(({ account }) => account.platform === "youtube")) {
    try {
      if (!post.mediaUrl) throw new Error("No video URL on this post");
      const videoId = await publishYouTubeVideo({
        accessToken:    account.accessToken,
        refreshToken:   account.refreshToken ?? "",
        clientId:       env.GOOGLE_CLIENT_ID    ?? "",
        clientSecret:   env.GOOGLE_CLIENT_SECRET ?? "",
        tokenExpiresAt: account.tokenExpiresAt,
        mediaUrl:       post.mediaUrl,
        title:          post.title ?? (post.caption.split("\n")[0].slice(0, 100) || "Untitled"),
        description:    post.caption,
        visibility:     (post.visibility as "public" | "unlisted" | "private") ?? "public",
      });
      await db.update(scheduledPosts)
        .set({ status: "published", publishedAt: Date.now(), igMediaId: videoId, updatedAt: Date.now() })
        .where(eq(scheduledPosts.id, post.id));
    } catch (err: any) {
      await db.update(scheduledPosts)
        .set({ status: "failed", errorMessage: err.message ?? "Unknown error", updatedAt: Date.now() })
        .where(eq(scheduledPosts.id, post.id));
    }
  }

  // ── Phase 4: TikTok — disabled (handled locally via post-tiktok.py) ─────────
  // for (const { post, account } of due.filter(({ account }) => account.platform === "tiktok")) {
  //   ... Zernio TikTok post ...
  // }

  // ── Phase 5: Reddit — disabled (handled locally via post-reddit.py) ──────────
  // for (const { post, account } of due.filter(({ account }) => account.platform === "reddit")) {
  //   ... Zernio Reddit post ...
  // }
}

export async function GET(req: Request) {
  const { env, ctx } = getCloudflareContext() as any;
  const cronSecret = (env.CRON_SECRET as string) ?? "";

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  ctx.waitUntil(runPublish(db, env));

  return Response.json({ ok: true });
}

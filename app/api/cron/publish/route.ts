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
}): Promise<void> {
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

  // ── Phase 1: Instagram — create container for posts that don't have one yet ──
  for (const { post, account } of due.filter(({ post, account }) =>
    account.platform === "instagram" && !post.igContainerId
  )) {
    try {
      const containerId = await createInstagramContainer(
        account.accountId,
        account.accessToken,
        post.caption,
        post.mediaUrl ?? "",
        post.mediaType as "IMAGE" | "VIDEO" | "REEL"
      );
      await db.update(scheduledPosts)
        .set({ igContainerId: containerId, updatedAt: Date.now() })
        .where(eq(scheduledPosts.id, post.id));
    } catch (err: any) {
      await db.update(scheduledPosts)
        .set({ status: "failed", errorMessage: err.message ?? "Unknown error", updatedAt: Date.now() })
        .where(eq(scheduledPosts.id, post.id));
    }
  }

  // ── Phase 2: Instagram — publish containers that are ready ────────────────
  const readyIg = await db
    .select({ post: scheduledPosts, account: socialAccounts })
    .from(scheduledPosts)
    .innerJoin(socialAccounts, eq(scheduledPosts.socialAccountId, socialAccounts.id))
    .where(and(
      eq(scheduledPosts.status, "scheduled"),
      isNotNull(scheduledPosts.igContainerId),
      eq(socialAccounts.platform, "instagram"),
    ));

  for (const { post, account } of readyIg) {
    try {
      const mediaId = await publishInstagramContainer(
        account.accountId,
        account.accessToken,
        post.igContainerId!
      );
      if (mediaId) {
        await db.update(scheduledPosts)
          .set({ status: "published", publishedAt: Date.now(), igMediaId: mediaId, updatedAt: Date.now() })
          .where(eq(scheduledPosts.id, post.id));
      }
      // if null, container not ready — will retry next cron run
    } catch (err: any) {
      await db.update(scheduledPosts)
        .set({ status: "failed", errorMessage: err.message ?? "Unknown error", updatedAt: Date.now() })
        .where(eq(scheduledPosts.id, post.id));
    }
  }

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

  // ── Phase 4: TikTok — publish via Zernio ─────────────────────────────────
  for (const { post, account } of due.filter(({ account }) => account.platform === "tiktok")) {
    try {
      if (!post.mediaUrl) throw new Error("No video URL on this post");
      const meta = post.metadata ? JSON.parse(post.metadata) : {};
      const ttBody: Record<string, unknown> = {
        content:  post.caption,
        platforms: [{
          platform:             "tiktok",
          accountId:            account.accessToken, // Zernio accountId
          platformSpecificData: {
            privacyLevel:            meta.privacyLevel            ?? "PUBLIC_TO_EVERYONE",
            allowComment:            meta.allowComment            ?? true,
            allowDuet:               meta.allowDuet               ?? true,
            allowStitch:             meta.allowStitch              ?? true,
            contentPreviewConfirmed: meta.contentPreviewConfirmed ?? true,
          },
        }],
        mediaItems: [{ type: "video", url: post.mediaUrl }],
        publishNow: true,
      };
      const ttRes = await fetch("https://zernio.com/api/v1/posts", {
        method:  "POST",
        headers: { Authorization: `Bearer ${env.ZERNIO_API_KEY ?? ""}`, "Content-Type": "application/json" },
        body:    JSON.stringify(ttBody),
      });
      if (!ttRes.ok) {
        const err = await ttRes.json() as any;
        throw new Error(err.message ?? err.error ?? `Zernio TikTok post failed (${ttRes.status})`);
      }
      await db.update(scheduledPosts)
        .set({ status: "published", publishedAt: Date.now(), updatedAt: Date.now() })
        .where(eq(scheduledPosts.id, post.id));
    } catch (err: any) {
      await db.update(scheduledPosts)
        .set({ status: "failed", errorMessage: err.message ?? "Unknown error", updatedAt: Date.now() })
        .where(eq(scheduledPosts.id, post.id));
    }
  }

  // ── Phase 5: Reddit — publish via Zernio ─────────────────────────────────
  for (const { post, account } of due.filter(({ account }) => account.platform === "reddit")) {
    try {
      if (!post.subreddit) throw new Error("No subreddit set on this post");
      await publishRedditViaZernio({
        apiKey:    env.ZERNIO_API_KEY ?? "",
        accountId: account.accessToken,  // Zernio accountId stored here on connect
        title:     post.title ?? (post.caption.split("\n")[0].slice(0, 300) || "Post"),
        body:      post.caption,
        subreddit: post.subreddit,
        mediaUrl:  post.mediaUrl ?? undefined,
      });
      await db.update(scheduledPosts)
        .set({ status: "published", publishedAt: Date.now(), updatedAt: Date.now() })
        .where(eq(scheduledPosts.id, post.id));
    } catch (err: any) {
      await db.update(scheduledPosts)
        .set({ status: "failed", errorMessage: err.message ?? "Unknown error", updatedAt: Date.now() })
        .where(eq(scheduledPosts.id, post.id));
    }
  }
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

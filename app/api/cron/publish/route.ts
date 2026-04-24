import { getPgDb } from "@/lib/db/pg";
import { getDb } from "@/lib/db";
import { scheduledPosts } from "@/lib/db/pg-schema";
import { socialAccounts } from "@/lib/db/social-schema";
import { eq, and, lte, inArray } from "drizzle-orm";

async function publishViaZernio(opts: {
  apiKey:     string;
  profileId:  string;
  accountId:  string;
  platform:   "tiktok" | "reddit";
  title:      string;
  body:       string;
  mediaUrl?:  string;
  subreddit?: string;
}): Promise<string | null> {
  const platformSpecificData: Record<string, unknown> = {};
  if (opts.platform === "reddit" && opts.subreddit) {
    platformSpecificData.subreddit = opts.subreddit;
    platformSpecificData.title     = opts.title;
  }

  const payload: Record<string, unknown> = {
    title:   opts.title,
    content: opts.body || opts.title,
    platforms: [{
      platform:             opts.platform,
      accountId:            opts.accountId,
      ...(Object.keys(platformSpecificData).length ? { platformSpecificData } : {}),
    }],
    publishNow: true,
  };

  if (opts.mediaUrl) {
    const isVideo = /\.(mp4|mov|webm)$/i.test(opts.mediaUrl);
    payload.mediaItems = [{ type: isVideo ? "video" : "image", url: opts.mediaUrl }];
  }

  const res = await fetch("https://zernio.com/api/v1/posts", {
    method:  "POST",
    headers: { Authorization: `Bearer ${opts.apiKey}`, "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json() as any;
    throw new Error(err.message ?? err.error ?? `Zernio post failed (${res.status})`);
  }

  const data = await res.json() as any;
  const entry = data?.platforms?.find?.((p: any) => p.platform === opts.platform)
    ?? data?.posts?.find?.((p: any) => p.platform === opts.platform);
  return entry?.postId ?? entry?.platformPostId ?? data?.postId ?? null;
}

async function runPublish(env: Record<string, string>) {
  const now  = Date.now();
  const pgDb = getPgDb();
  const d1Db = getDb();

  // Fetch due scheduled posts from PG
  const duePosts = await pgDb
    .select()
    .from(scheduledPosts)
    .where(and(
      eq(scheduledPosts.status, "scheduled"),
      lte(scheduledPosts.scheduledFor, now),
    ));

  if (duePosts.length === 0) return;

  // Fetch associated social accounts from D1
  const accountIds = [...new Set(duePosts.map((p) => p.socialAccountId))];
  const accounts   = await d1Db.select().from(socialAccounts).where(inArray(socialAccounts.id, accountIds));
  const accountMap = new Map(accounts.map((a) => [a.id, a]));

  const due = duePosts
    .map((post) => ({ post, account: accountMap.get(post.socialAccountId) }))
    .filter((x): x is { post: typeof duePosts[0]; account: NonNullable<typeof accounts[0]> } => !!x.account);

  // ── Phase 4: TikTok via Zernio ─────────────────────────────────────────────────
  for (const { post, account } of due.filter(({ account }) => account.platform === "tiktok")) {
    if (!post.mediaUrl) continue;
    try {
      await publishViaZernio({
        apiKey:    env.ZERNIO_API_KEY    as string,
        profileId: env.ZERNIO_PROFILE_ID as string,
        accountId: account.accountId,
        platform:  "tiktok",
        title:     post.title ?? post.caption.slice(0, 100),
        body:      post.caption,
        mediaUrl:  post.mediaUrl,
      });
      await pgDb.update(scheduledPosts)
        .set({ status: "published", publishedAt: Date.now() })
        .where(eq(scheduledPosts.id, post.id));
    } catch (err: any) {
      console.error(`TikTok publish failed for post ${post.id}:`, err.message);
      await pgDb.update(scheduledPosts)
        .set({ status: "failed", errorMessage: err.message })
        .where(eq(scheduledPosts.id, post.id));
    }
  }
}

export async function GET(req: Request) {
  // Support both Cloudflare Worker (env from context) and Node.js (process.env)
  let env: Record<string, string> = process.env as Record<string, string>;
  let waitUntil: ((p: Promise<unknown>) => void) | null = null;

  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = getCloudflareContext() as any;
    env = ctx.env;
    waitUntil = ctx.ctx?.waitUntil?.bind(ctx.ctx) ?? null;
  } catch {
    // Running in Node.js — use process.env
  }

  const cronSecret = env.CRON_SECRET ?? "";
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const work = runPublish(env);
  if (waitUntil) {
    waitUntil(work);
  } else {
    await work;
  }

  return Response.json({ ok: true });
}

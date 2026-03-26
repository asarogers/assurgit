import { getDb } from "@/lib/db";
import { scheduledPosts } from "@/lib/db/social-schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  if (!projectId) return Response.json({ error: "projectId required" }, { status: 400 });

  const db   = getDb();
  const posts = await db.query.scheduledPosts.findMany({
    where: (p, { eq }) => eq(p.projectId, projectId),
    orderBy: [desc(scheduledPosts.createdAt)],
  });
  return Response.json(posts);
}

export async function POST(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { projectId, socialAccountId, caption, title, subreddit, visibility, metadata, mediaUrl, mediaType, scheduledFor } =
    await req.json() as {
      projectId: string; socialAccountId: string; caption: string;
      title?: string; subreddit?: string; visibility?: "public" | "unlisted" | "private";
      metadata?: Record<string, unknown>;
      mediaUrl?: string; mediaType?: "IMAGE" | "VIDEO" | "REEL" | "SHORT"; scheduledFor?: number;
    };

  const db  = getDb();
  const now = Date.now();

  const post = {
    id:              nanoid(),
    projectId,
    socialAccountId,
    title:           title ?? null,
    caption,
    subreddit:       subreddit ?? null,
    visibility:      visibility ?? null,
    mediaUrl:        mediaUrl ?? null,
    mediaType:       mediaType ?? "IMAGE",
    scheduledFor:    scheduledFor ?? null,
    status:          (scheduledFor ? "scheduled" : "draft") as "scheduled" | "draft",
    publishedAt:     null,
    igContainerId:   null,
    igMediaId:       null,
    metadata:        metadata ? JSON.stringify(metadata) : null,
    errorMessage:    null,
    createdAt:       now,
    updatedAt:       now,
  };

  await db.insert(scheduledPosts).values(post);
  return Response.json(post, { status: 201 });
}

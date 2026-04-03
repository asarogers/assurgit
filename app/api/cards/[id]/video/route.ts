import { getDb } from "@/lib/db";
import { cards } from "@/lib/db/schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

const BUCKET_URL = "https://media.assurgit.com";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { id }      = await params;
  const isFinal     = req.headers.get("x-is-final") === "true";
  const contentType = req.headers.get("content-type") ?? "video/mp4";
  const ext         = contentType === "video/quicktime" ? "mov" : "mp4";

  const { env } = getCloudflareContext() as any;
  const bucket  = env.MEDIA_BUCKET as R2Bucket;
  if (!bucket) return Response.json({ error: "Storage not configured" }, { status: 500 });

  const suffix = isFinal ? "-final" : "";
  const key    = `cards/card-${id}${suffix}-${nanoid()}.${ext}`;
  const buffer = await req.arrayBuffer();

  await bucket.put(key, buffer, {
    httpMetadata: { contentType },
  });

  const fileUrl = `${BUCKET_URL}/${key}`;
  const db      = getDb();
  const field   = isFinal ? { finalVideoPath: fileUrl } : { videoPath: fileUrl };

  await db.update(cards)
    .set({ ...field, updatedAt: Date.now() })
    .where(eq(cards.id, id));

  return Response.json({ path: fileUrl });
}

// Keep POST for saving pre-uploaded paths (R2 direct upload fallback)
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { id }               = await params;
  const { isFinal, fileUrl } = await req.json() as { isFinal?: boolean; fileUrl: string };

  if (!fileUrl) return Response.json({ error: "No fileUrl provided" }, { status: 400 });

  const db    = getDb();
  const field = isFinal ? { finalVideoPath: fileUrl } : { videoPath: fileUrl };

  await db.update(cards)
    .set({ ...field, updatedAt: Date.now() })
    .where(eq(cards.id, id));

  return Response.json({ path: fileUrl });
}

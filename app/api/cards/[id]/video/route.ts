import { getPgDb } from "@/lib/db/pg";
import { cards } from "@/lib/db/pg-schema";
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
  const ext         = contentType.includes("quicktime") ? "mov" : "mp4";

  let env: any;
  try {
    env = (getCloudflareContext() as any).env;
  } catch {
    return Response.json({ error: "Runtime context unavailable" }, { status: 500 });
  }
  const bucket = env.MEDIA_BUCKET as R2Bucket;
  if (!bucket) return Response.json({ error: "Storage not configured" }, { status: 500 });

  const suffix = isFinal ? "-final" : "";
  const key    = `cards/card-${id}${suffix}-${nanoid()}.${ext}`;

  try {
    // Stream body directly to R2 — avoids buffering large files in Worker memory
    const body = req.body;
    if (!body) return Response.json({ error: "No file provided" }, { status: 400 });
    await bucket.put(key, body, { httpMetadata: { contentType } });
  } catch (err) {
    console.error("[video-upload]", err);
    return Response.json({ error: "Upload to storage failed" }, { status: 502 });
  }

  const fileUrl = `${BUCKET_URL}/${key}`;
  const db      = getPgDb();
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

  const db    = getPgDb();
  const field = isFinal ? { finalVideoPath: fileUrl } : { videoPath: fileUrl };

  await db.update(cards)
    .set({ ...field, updatedAt: Date.now() })
    .where(eq(cards.id, id));

  return Response.json({ path: fileUrl });
}

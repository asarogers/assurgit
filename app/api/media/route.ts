import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { nanoid } from "nanoid";

const BUCKET_URL = "https://media.assurgit.com";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg":      "jpg",
  "image/png":       "png",
  "image/webp":      "webp",
  "image/gif":       "gif",
  "video/mp4":       "mp4",
  "video/quicktime": "mov",
};

export async function POST(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const contentType = req.headers.get("content-type") ?? "";
  const ext         = ALLOWED_TYPES[contentType];
  if (!ext) return Response.json({ error: "Unsupported file type" }, { status: 400 });

  const { env } = getCloudflareContext() as any;
  const bucket  = env.MEDIA_BUCKET as R2Bucket;
  if (!bucket) return Response.json({ error: "Storage not configured" }, { status: 500 });

  const key    = `uploads/${nanoid()}.${ext}`;
  const buffer = await req.arrayBuffer();

  await bucket.put(key, buffer, {
    httpMetadata: { contentType },
  });

  return Response.json({ url: `${BUCKET_URL}/${key}`, key });
}

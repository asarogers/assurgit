import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { nanoid } from "nanoid";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg":  "jpg",
  "image/png":   "png",
  "image/webp":  "webp",
  "image/gif":   "gif",
  "video/mp4":   "mp4",
  "video/quicktime": "mov",
};

export async function POST(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const formData  = await req.formData();
  const file      = formData.get("file") as File | null;

  if (!file) return Response.json({ error: "No file provided" }, { status: 400 });

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) return Response.json({ error: "Unsupported file type" }, { status: 400 });

  const maxSize = file.type.startsWith("video") ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return Response.json({ error: `File too large (max ${file.type.startsWith("video") ? "100MB" : "10MB"})` }, { status: 400 });
  }

  const { env } = getCloudflareContext() as any;
  const bucket  = env.MEDIA_BUCKET as R2Bucket;
  if (!bucket) return Response.json({ error: "Storage not configured" }, { status: 500 });

  const key       = `uploads/${nanoid()}.${ext}`;
  const arrayBuf  = await file.arrayBuffer();

  await bucket.put(key, arrayBuf, {
    httpMetadata: { contentType: file.type },
  });

  const { env: cfEnv } = getCloudflareContext() as any;
  const bucketDomain = (cfEnv.MEDIA_BUCKET_URL as string) ?? "https://pub-9a712cc0ad0249308fdbbb201d6a185f.r2.dev";
  const publicUrl = `${bucketDomain}/${key}`;

  return Response.json({ url: publicUrl, key });
}

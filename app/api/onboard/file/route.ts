import { getDb } from "@/lib/db";
import { onboardingFiles } from "@/lib/db/schema";
import { validateReviewToken } from "@/lib/token";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { nanoid } from "nanoid";

const ALLOWED_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "text/plain": "txt",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "video/mp4": "mp4",
  "video/quicktime": "mov",
};

const MAX_SIZE = 100 * 1024 * 1024; // 100MB

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  if (!token) return Response.json({ error: "Token required" }, { status: 400 });

  const parsed = await validateReviewToken(token);
  if (!parsed) return Response.json({ error: "Invalid token" }, { status: 403 });

  const formData = await req.formData();
  const file     = formData.get("file") as File | null;
  const category = (formData.get("category") as string) || "other";

  if (!file) return Response.json({ error: "No file provided" }, { status: 400 });

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) return Response.json({ error: "Unsupported file type" }, { status: 400 });
  if (file.size > MAX_SIZE) return Response.json({ error: "File too large (max 100MB)" }, { status: 400 });

  const { env } = getCloudflareContext() as any;
  const bucket  = env.MEDIA_BUCKET as R2Bucket;
  if (!bucket) return Response.json({ error: "Storage not configured" }, { status: 500 });

  const key      = `onboarding/${parsed.projectId}/${nanoid()}.${ext}`;
  const arrayBuf = await file.arrayBuffer();

  await bucket.put(key, arrayBuf, {
    httpMetadata: { contentType: file.type },
  });

  const bucketUrl = (env.MEDIA_BUCKET_URL as string) ?? "";
  const fileUrl   = `${bucketUrl}/${key}`;

  const db  = getDb();
  const now = Date.now();
  const id  = nanoid();

  await db.insert(onboardingFiles).values({
    id,
    projectId: parsed.projectId,
    filename:  file.name,
    fileUrl,
    fileSize:  file.size,
    category,
    createdAt: now,
  });

  return Response.json({ id, fileUrl, filename: file.name, fileSize: file.size, category });
}

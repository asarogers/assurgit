import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function saveUploadedVideo(
  file: File,
  prefix: string
): Promise<string> {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const ext      = file.name.split(".").pop() ?? "mp4";
  const filename = `${prefix}-${Date.now()}.${ext}`;
  const filepath = path.join(uploadDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  return `/uploads/${filename}`;
}

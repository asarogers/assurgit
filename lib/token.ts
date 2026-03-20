import { createHmac, randomBytes } from "crypto";

const SECRET = process.env.TOKEN_SECRET ?? "fallback-token-secret-change-me";

export function generateReviewToken(projectId: string): string {
  const nonce = randomBytes(16).toString("hex");
  const payload = `${projectId}:${nonce}`;
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function validateReviewToken(token: string): { projectId: string } | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString();
    const lastColon = decoded.lastIndexOf(":");
    const payload = decoded.substring(0, lastColon);
    const sig = decoded.substring(lastColon + 1);
    const expected = createHmac("sha256", SECRET).update(payload).digest("hex");
    if (sig !== expected) return null;
    const projectId = payload.split(":")[0];
    return { projectId };
  } catch {
    return null;
  }
}

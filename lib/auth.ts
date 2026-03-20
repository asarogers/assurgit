import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET ?? "fallback-secret-change-me"
);

export async function createOwnerSession(): Promise<string> {
  return new SignJWT({ isOwner: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyOwnerSession(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload.isOwner === true;
  } catch {
    return false;
  }
}

export async function getOwnerFromRequest(req: Request): Promise<boolean> {
  const cookieHeader = req.headers.get("cookie") ?? "";
  const match = cookieHeader.match(/owner_session=([^;]+)/);
  if (!match) return false;
  return verifyOwnerSession(match[1]);
}

export async function requireOwner(req: Request): Promise<void> {
  const ok = await getOwnerFromRequest(req);
  if (!ok) throw new Error("UNAUTHORIZED");
}

export function unauthorizedResponse() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

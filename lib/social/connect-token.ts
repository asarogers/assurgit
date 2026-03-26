import { SignJWT, jwtVerify } from "jose";

const secret = () => new TextEncoder().encode(
  process.env.SESSION_SECRET ?? "fallback-secret-change-me"
);

/** 7-day token sent to clients so they can authorize social accounts. */
export async function signConnectToken(projectId: string): Promise<string> {
  return new SignJWT({ projectId, type: "social_connect" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifyConnectToken(
  token: string
): Promise<{ projectId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    if (payload.type !== "social_connect") return null;
    if (typeof payload.projectId !== "string") return null;
    return { projectId: payload.projectId };
  } catch {
    return null;
  }
}

import { SignJWT, jwtVerify } from "jose";

const secret = () => new TextEncoder().encode(
  process.env.SESSION_SECRET ?? "fallback-secret-change-me"
);

export async function signOAuthState(projectId: string): Promise<string> {
  return new SignJWT({ projectId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(secret());
}

export async function verifyOAuthState(state: string): Promise<{ projectId: string } | null> {
  try {
    const { payload } = await jwtVerify(state, secret());
    if (typeof payload.projectId !== "string") return null;
    return { projectId: payload.projectId };
  } catch {
    return null;
  }
}

import { SignJWT, jwtVerify } from "jose";

const secret = () => new TextEncoder().encode(
  process.env.SESSION_SECRET ?? "fallback-secret-change-me"
);

export async function signOAuthState(
  projectId: string,
  connectToken?: string   // present when the OAuth was initiated from the client connect portal
): Promise<string> {
  return new SignJWT({ projectId, ...(connectToken ? { connectToken } : {}) })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(secret());
}

export async function verifyOAuthState(
  state: string
): Promise<{ projectId: string; connectToken?: string } | null> {
  try {
    const { payload } = await jwtVerify(state, secret());
    if (typeof payload.projectId !== "string") return null;
    return {
      projectId:    payload.projectId,
      connectToken: typeof payload.connectToken === "string" ? payload.connectToken : undefined,
    };
  } catch {
    return null;
  }
}

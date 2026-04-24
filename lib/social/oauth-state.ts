import { SignJWT, jwtVerify } from "jose";

const secret = () => new TextEncoder().encode(
  process.env.SESSION_SECRET ?? "fallback-secret-change-me"
);

export async function signOAuthState(
  projectId: string,
  connectToken?: string,  // present when initiated from client connect portal
  clientId?: string       // present when project belongs to a client (shared credentials)
): Promise<string> {
  return new SignJWT({
    projectId,
    ...(connectToken ? { connectToken } : {}),
    ...(clientId     ? { clientId }     : {}),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(secret());
}

export async function verifyOAuthState(
  state: string
): Promise<{ projectId: string; connectToken?: string; clientId?: string } | null> {
  try {
    const { payload } = await jwtVerify(state, secret());
    if (typeof payload.projectId !== "string") return null;
    return {
      projectId:    payload.projectId,
      connectToken: typeof payload.connectToken === "string" ? payload.connectToken : undefined,
      clientId:     typeof payload.clientId     === "string" ? payload.clientId     : undefined,
    };
  } catch {
    return null;
  }
}

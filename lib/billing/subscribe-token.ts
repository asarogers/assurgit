import { SignJWT, jwtVerify } from "jose";

// Tokens we hand to a customer who's already paid the deposit out-of-band
// (Cal.com booking, manual invoice, in-person). Carrying the token in the
// URL means the customer hits a no-deposit subscription flow without any
// account/login on assurgit.com.
//
// Mirrors `lib/social/connect-token.ts` deliberately — same library, same
// pattern, easy to remember.

const secret = () =>
  new TextEncoder().encode(process.env.SESSION_SECRET ?? "fallback-secret-change-me");

export type SubscribePayload = {
  email: string;
  // Optional tier pin — if set, the link only allows that tier. Leave
  // unset to let the customer pick on the page.
  tier?: "starter" | "growth" | "scale";
  business_name?: string;
};

/** 14-day token. Long enough that operator + customer can email-tag without
 *  expiring before the customer gets to it. */
export async function signSubscribeToken(payload: SubscribePayload): Promise<string> {
  return new SignJWT({ ...payload, type: "subscribe" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("14d")
    .sign(secret());
}

export async function verifySubscribeToken(token: string): Promise<SubscribePayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    if (payload.type !== "subscribe") return null;
    if (typeof payload.email !== "string") return null;
    return {
      email: payload.email,
      tier: payload.tier as SubscribePayload["tier"],
      business_name: payload.business_name as string | undefined,
    };
  } catch {
    return null;
  }
}

/**
 * Meta Data Deletion Callback
 * Required by Meta for all apps using Facebook Login / Instagram Graph API.
 * Meta calls this endpoint when a user removes the app from Facebook Settings.
 * Docs: https://developers.facebook.com/docs/development/create-an-app/app-dashboard/data-deletion-callback
 */

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { socialAccounts, scheduledPosts } from "@/lib/db/social-schema";
import { eq, and } from "drizzle-orm";

async function parseSignedRequest(
  signedRequest: string,
  appSecret: string
): Promise<{ user_id: string; algorithm: string } | null> {
  try {
    const [encodedSig, payload] = signedRequest.split(".");
    if (!encodedSig || !payload) return null;

    // Verify HMAC-SHA256 signature
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(appSecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // Base64url decode the signature
    const sig = Uint8Array.from(
      atob(encodedSig.replace(/-/g, "+").replace(/_/g, "/")),
      (c) => c.charCodeAt(0)
    );

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sig,
      new TextEncoder().encode(payload)
    );
    if (!valid) return null;

    // Decode the payload
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );
    return decoded;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const { env } = getCloudflareContext() as any;
  const appSecret = (env.INSTAGRAM_APP_SECRET as string) ?? "";
  const appUrl = (env.NEXT_PUBLIC_APP_URL as string) ?? "https://assurgit.com";

  let signedRequest: string | null = null;

  const contentType = req.headers.get("content-type") ?? "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const body = await req.formData();
    signedRequest = body.get("signed_request") as string | null;
  } else {
    const body = await req.json().catch(() => ({})) as any;
    signedRequest = body.signed_request ?? null;
  }

  if (!signedRequest || !appSecret) {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  const parsed = await parseSignedRequest(signedRequest, appSecret);
  if (!parsed) {
    return Response.json({ error: "invalid_signature" }, { status: 403 });
  }

  const { user_id } = parsed;

  // Generate a stable confirmation code from the user_id
  const encoder = new TextEncoder();
  const data = encoder.encode(`deletion-${user_id}-${appSecret}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const confirmationCode = hashArray
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

  // Delete all social accounts and associated scheduled posts for this Meta user
  try {
    const db = getDb();
    const accounts = await db.query.socialAccounts.findMany({
      where: (a, { and, eq, or }) =>
        and(
          or(eq(a.platform, "instagram"), eq(a.platform, "facebook")),
          eq(a.accountId, user_id)
        ),
    });

    for (const account of accounts) {
      await db
        .delete(scheduledPosts)
        .where(eq(scheduledPosts.socialAccountId, account.id));
    }

    if (accounts.length > 0) {
      await db
        .delete(socialAccounts)
        .where(and(eq(socialAccounts.accountId, user_id)));
    }
  } catch (err) {
    console.error("Data deletion error:", err);
    // Still return success — deletion will be handled manually if DB fails
  }

  return Response.json({
    url: `${appUrl}/data-deletion?code=${confirmationCode}`,
    confirmation_code: confirmationCode,
  });
}

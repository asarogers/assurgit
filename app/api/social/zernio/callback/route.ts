import { getDb } from "@/lib/db";
import { socialAccounts } from "@/lib/db/social-schema";
import { verifyOAuthState } from "@/lib/social/oauth-state";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const state     = searchParams.get("state");
  const accountId = searchParams.get("accountId");
  const username  = searchParams.get("username");
  const platform  = searchParams.get("connected");
  const error     = searchParams.get("error");

  const { env } = getCloudflareContext() as any;
  const appUrl = (env.NEXT_PUBLIC_APP_URL as string) ?? "https://assurgit.com";

  if (error || !accountId || !platform || !state) {
    return Response.redirect(`${appUrl}/social?error=oauth_denied`);
  }

  const parsed = await verifyOAuthState(state);
  if (!parsed) return Response.redirect(`${appUrl}/social?error=invalid_state`);

  try {
    const db  = getDb();
    const now = Date.now();

    await db.delete(socialAccounts).where(
      and(
        eq(socialAccounts.projectId, parsed.projectId),
        eq(socialAccounts.platform, platform as any)
      )
    );

    await db.insert(socialAccounts).values({
      id:             nanoid(),
      projectId:      parsed.projectId,
      platform:       platform as any,
      accountId,
      accountName:    username ?? accountId,
      accountAvatar:  null,
      accessToken:    accountId, // Zernio accountId is the credential — posting uses Zernio API
      refreshToken:   null,
      tokenExpiresAt: now + 365 * 24 * 60 * 60 * 1000, // Zernio manages token refresh
      createdAt:      now,
      updatedAt:      now,
    });

    const dest = parsed.connectToken
      ? `${appUrl}/connect?token=${encodeURIComponent(parsed.connectToken)}&connected=1`
      : `${appUrl}/social?connected=1`;
    return Response.redirect(dest);
  } catch (err: any) {
    console.error("Zernio callback error:", err);
    const dest = parsed?.connectToken
      ? `${appUrl}/connect?token=${encodeURIComponent(parsed.connectToken)}&error=${encodeURIComponent(err.message ?? "unknown")}`
      : `${appUrl}/social?error=${encodeURIComponent(err.message ?? "unknown")}`;
    return Response.redirect(dest);
  }
}

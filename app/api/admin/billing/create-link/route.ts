import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { signSubscribeToken } from "@/lib/billing/subscribe-token";
import { sendSubscribeLink } from "@/lib/email";

// POST /api/admin/billing/create-link
//
// Owner-only. Body: { email, tier?, business_name?, send_email? }
// Returns: { url, expires_at }
//
// Generates a 14-day token-signed URL the operator can hand to a customer
// who paid the deposit out-of-band (Cal.com booking, manual invoice, etc.).
// When the customer opens the URL, they land on /subscribe/[token] and can
// complete a Stripe Checkout that bills the recurring tier only — no deposit.

export async function POST(req: Request) {
  try {
    await requireOwner(req);
  } catch {
    return unauthorizedResponse();
  }

  let body: { email?: string; tier?: string; business_name?: string; send_email?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }
  const tier = body.tier as "starter" | "growth" | "scale" | undefined;
  if (tier && !["starter", "growth", "scale"].includes(tier)) {
    return NextResponse.json({ error: `Invalid tier: ${tier}` }, { status: 400 });
  }

  const { env } = getCloudflareContext() as any;
  const appUrl = (env.NEXT_PUBLIC_APP_URL as string) ?? "https://assurgit.com";

  const token = await signSubscribeToken({
    email,
    tier,
    business_name: body.business_name?.trim() || undefined,
  });
  const url = `${appUrl}/subscribe/${token}`;

  // Send email opportunistically; failure to send doesn't fail the call so
  // the operator can still copy the URL manually.
  let emailSent = false;
  let emailError: string | null = null;
  if (body.send_email) {
    try {
      await sendSubscribeLink({
        to: email,
        businessName: body.business_name,
        subscribeUrl: url,
        tier,
        db: env.DB as D1Database,
      });
      emailSent = true;
    } catch (e: any) {
      emailError = e?.message ?? "Email send failed";
    }
  }

  // 14 days, matching the JWT expiration.
  const expiresAt = Date.now() + 14 * 24 * 60 * 60 * 1000;

  return NextResponse.json({
    url,
    expires_at: expiresAt,
    email_sent: emailSent,
    email_error: emailError,
  });
}

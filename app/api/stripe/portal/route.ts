import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getStripe } from "@/lib/stripe";

// POST /api/stripe/portal
//
// Body: { email: string }
//
// Creates a Stripe Customer Portal session so an existing customer can
// manage their subscription (update card, view invoices, cancel).
// Identifies the customer by their email. Since assurgit doesn't have
// per-user accounts, this is the auth model: the customer's email plus
// Stripe's portal flow (Stripe emails them a magic link if needed).

export async function POST(req: Request) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const { env } = getCloudflareContext() as any;
  const secretKey = env.STRIPE_SECRET_KEY as string | undefined;
  const appUrl = (env.NEXT_PUBLIC_APP_URL as string) ?? "https://assurgit.com";
  if (!secretKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = getStripe(secretKey);
  const customers = await stripe.customers.list({ email, limit: 1 });
  if (customers.data.length === 0) {
    // Don't reveal whether the email matches an existing subscription;
    // returns the same shape as success to discourage enumeration.
    return NextResponse.json(
      { error: "No subscription found for this email. Check your inbox for an account link from Stripe." },
      { status: 404 },
    );
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customers.data[0].id,
    return_url: `${appUrl}/`,
  });

  return NextResponse.json({ url: session.url });
}

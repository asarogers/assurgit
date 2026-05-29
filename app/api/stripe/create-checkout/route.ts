import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  getStripe,
  resolvePriceIds,
  TIERS,
  type Tier,
  type BillingPeriod,
} from "@/lib/stripe";
import { verifySubscribeToken } from "@/lib/billing/subscribe-token";
import { getOwnerFromRequest } from "@/lib/auth";

// POST /api/stripe/create-checkout
//
// Body:
//   { tier: 'starter'|'growth'|'scale',
//     billing_period: 'monthly'|'yearly',
//     email?: string,
//     subscribe_token?: string }   // optional — when present, must be valid;
//                                  // signals the deposit was paid out-of-band
//                                  // and should be skipped.
//
// Creates a Stripe Checkout Session.
//
//   Public flow (no token):  deposit (one-time) + recurring tier price
//                            on a single invoice; recurring on a 7-day trial
//                            so monthly billing starts on go-live.
//
//   Token flow (valid token OR owner-cookie present): recurring tier price
//                            only; trial still applies; no deposit charged.

export async function POST(req: Request) {
  let body: {
    tier?: string;
    billing_period?: string;
    email?: string;
    subscribe_token?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const tier = body.tier as Tier;
  const billingPeriod = (body.billing_period ?? "monthly") as BillingPeriod;

  if (!TIERS.includes(tier)) {
    return NextResponse.json(
      { error: `Invalid tier: ${tier}. Must be one of ${TIERS.join(", ")}.` },
      { status: 400 },
    );
  }
  if (!["monthly", "yearly"].includes(billingPeriod)) {
    return NextResponse.json(
      { error: `Invalid billing_period: ${billingPeriod}` },
      { status: 400 },
    );
  }

  const { env } = getCloudflareContext() as any;
  const secretKey = env.STRIPE_SECRET_KEY as string | undefined;
  const appUrl = (env.NEXT_PUBLIC_APP_URL as string) ?? "https://assurgit.com";
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured (missing STRIPE_SECRET_KEY)" },
      { status: 500 },
    );
  }

  const stripe = getStripe(secretKey);

  // Decide whether to skip the deposit. Allowed only via:
  //   (a) a valid subscribe_token whose tier (if pinned) matches, or
  //   (b) an authenticated owner cookie (admin testing without a token).
  let skipDeposit = false;
  let prefilledEmail: string | undefined = body.email?.trim() || undefined;

  if (body.subscribe_token) {
    const claims = await verifySubscribeToken(body.subscribe_token);
    if (!claims) {
      return NextResponse.json(
        { error: "Invalid or expired subscribe link. Ask us for a new one." },
        { status: 401 },
      );
    }
    if (claims.tier && claims.tier !== tier) {
      return NextResponse.json(
        { error: `This link is for ${claims.tier}, not ${tier}.` },
        { status: 403 },
      );
    }
    skipDeposit = true;
    prefilledEmail = prefilledEmail ?? claims.email;
  } else if (await getOwnerFromRequest(req)) {
    // Owner can also force skip_deposit for manual flows from /admin.
    // Anything coming from the public PricingSection sends no token and
    // no owner cookie, so deposit is required (the default).
    if (body.subscribe_token === "" /* no-op */) skipDeposit = true;
  }

  try {
    const { recurring, deposit } = await resolvePriceIds(stripe, tier, billingPeriod);

    const lineItems: Array<{ price: string; quantity: number }> = [
      { price: recurring, quantity: 1 },
    ];
    if (deposit && !skipDeposit) lineItems.push({ price: deposit, quantity: 1 });

    // Trial logic depends on flow:
    //
    //   Public deposit flow → 7-day trial. Customer pays the one-time
    //     deposit today; the monthly subscription doesn't begin billing
    //     until the site goes live (typically 1–2 weeks). Operator can end
    //     the trial early via stripe.subscriptions.update(id, { trial_end:
    //     'now' }) once the site is actually live, or extend it.
    //
    //   Token / skip-deposit flow → NO trial. The customer paid the
    //     deposit out-of-band already and has presumably been through the
    //     intake + build window before we sent them the activation link.
    //     The first month should bill immediately on activation.
    const trialPeriodDays = skipDeposit ? undefined : 7;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: lineItems,
      ...(prefilledEmail ? { customer_email: prefilledEmail } : {}),
      // Always collect billing address — needed for tax compliance later
      // and for the operations team to know which jurisdiction the customer
      // is in. Stripe handles validation.
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      // Keep the flow on the assurgit domain on success/cancel so analytics
      // (purchase event, GA4 conversion) can fire.
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
      // Persist tier/period on the session so the webhook can copy them onto
      // the subscription row without re-deriving from line items.
      metadata: {
        tier,
        billing_period: billingPeriod,
        deposit_skipped: skipDeposit ? "true" : "false",
      },
      subscription_data: {
        ...(trialPeriodDays !== undefined ? { trial_period_days: trialPeriodDays } : {}),
        metadata: {
          tier,
          billing_period: billingPeriod,
          deposit_skipped: skipDeposit ? "true" : "false",
        },
      },
      // Allow upgrades to use a coupon/promo code field at checkout — useful
      // for early-customer discounts without per-customer price overrides.
      allow_promotion_codes: true,
      // Require explicit ToS agreement before payment. Uses the Terms of
      // Service URL configured in Stripe Dashboard → Settings → Public
      // business information (currently https://assurgit.com/terms).
      consent_collection: {
        terms_of_service: "required",
      },
      custom_text: {
        terms_of_service_acceptance: {
          message:
            "I agree to the [Assurgit Terms of Service](https://assurgit.com/terms) and the [Privacy Policy](https://assurgit.com/privacy), including the deposit being non-refundable, the 7-day setup window before recurring billing begins, and (for Growth/Scale) a 3-month initial term with 30-day notice thereafter.",
        },
      },
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (e: any) {
    console.error("[stripe] create-checkout failed:", e);
    return NextResponse.json(
      { error: e?.message ?? "Stripe error" },
      { status: 500 },
    );
  }
}

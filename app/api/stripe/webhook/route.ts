import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getStripe, getCryptoProvider, type Tier, type BillingPeriod } from "@/lib/stripe";
import type Stripe from "stripe";

// POST /api/stripe/webhook
//
// Receives Stripe webhook events. Verifies the signature, persists the raw
// event for audit/replay, then applies the side-effect to our D1 tables.
// Idempotent: replaying the same Stripe event_id is a no-op.

export async function POST(req: Request) {
  const { env } = getCloudflareContext() as any;
  const secretKey = env.STRIPE_SECRET_KEY as string | undefined;
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET as string | undefined;
  const db = env.DB as D1Database | undefined;

  if (!secretKey || !webhookSecret || !db) {
    console.error("[stripe-webhook] missing env: SECRET_KEY/WEBHOOK_SECRET/DB");
    return new NextResponse("Server misconfigured", { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new NextResponse("Missing stripe-signature", { status: 400 });
  }
  const rawBody = await req.text();

  const stripe = getStripe(secretKey);
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      webhookSecret,
      undefined,
      getCryptoProvider(),
    );
  } catch (e: any) {
    console.error("[stripe-webhook] signature verification failed:", e?.message);
    return new NextResponse(`Invalid signature: ${e?.message ?? "unknown"}`, { status: 400 });
  }

  // Idempotency: if we've seen this event_id before, ack and skip.
  const existing = await db
    .prepare("SELECT id, processed_at FROM billing_events WHERE stripe_event_id = ?")
    .bind(event.id)
    .first<{ id: number; processed_at: number | null }>();

  if (existing?.processed_at) {
    return NextResponse.json({ received: true, deduped: true });
  }

  if (!existing) {
    await db
      .prepare(
        "INSERT INTO billing_events (stripe_event_id, event_type, payload_json, received_at) VALUES (?, ?, ?, ?)",
      )
      .bind(event.id, event.type, JSON.stringify(event), Date.now())
      .run();
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(stripe, db, event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await upsertSubscription(stripe, db, event.data.object as Stripe.Subscription);
        break;
      case "customer.subscription.deleted":
        await markSubscriptionCanceled(db, event.data.object as Stripe.Subscription);
        break;
      case "invoice.paid":
      case "invoice.payment_failed":
        // We could send Slack/email here. For now the subscription.updated
        // event that follows will reflect the resulting status.
        break;
      default:
        // Many event types arrive that we don't care about. Silently ack.
        break;
    }

    await db
      .prepare("UPDATE billing_events SET processed_at = ? WHERE stripe_event_id = ?")
      .bind(Date.now(), event.id)
      .run();
  } catch (e: any) {
    console.error(`[stripe-webhook] handler failed for ${event.type}:`, e);
    await db
      .prepare("UPDATE billing_events SET error = ? WHERE stripe_event_id = ?")
      .bind(String(e?.message ?? e).slice(0, 500), event.id)
      .run();
    // Return 500 so Stripe retries — handler is idempotent.
    return new NextResponse(`Handler error: ${e?.message ?? "unknown"}`, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// ─── handlers ─────────────────────────────────────────────────────────

async function handleCheckoutCompleted(
  stripe: Stripe,
  db: D1Database,
  session: Stripe.Checkout.Session,
) {
  // session.customer is set by Stripe even when we passed customer_email.
  const stripeCustomerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id;
  if (!stripeCustomerId) return;

  await upsertCustomer(stripe, db, stripeCustomerId);

  // The subscription may not be attached on the session object yet for
  // newly-created subs; fetch it explicitly so we land its real status.
  if (typeof session.subscription === "string") {
    const sub = await stripe.subscriptions.retrieve(session.subscription);
    await upsertSubscription(stripe, db, sub);
  } else if (session.subscription) {
    await upsertSubscription(stripe, db, session.subscription);
  }
}

async function upsertCustomer(stripe: Stripe, db: D1Database, stripeCustomerId: string) {
  const cus = await stripe.customers.retrieve(stripeCustomerId);
  if (cus.deleted) return;

  const now = Date.now();
  await db
    .prepare(
      `INSERT INTO customers (stripe_customer_id, email, name, business_name, phone, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(stripe_customer_id) DO UPDATE SET
         email = excluded.email,
         name  = excluded.name,
         business_name = excluded.business_name,
         phone = excluded.phone,
         updated_at = excluded.updated_at`,
    )
    .bind(
      stripeCustomerId,
      cus.email ?? "",
      cus.name ?? null,
      (cus.metadata?.business_name as string | undefined) ?? null,
      cus.phone ?? null,
      now,
      now,
    )
    .run();
}

async function upsertSubscription(stripe: Stripe, db: D1Database, sub: Stripe.Subscription) {
  const stripeCustomerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  await upsertCustomer(stripe, db, stripeCustomerId);

  const customer = await db
    .prepare("SELECT id FROM customers WHERE stripe_customer_id = ?")
    .bind(stripeCustomerId)
    .first<{ id: number }>();
  if (!customer) throw new Error("customer row not found after upsert — race?");

  const tier = (sub.metadata?.tier as Tier | undefined) ?? "starter";
  const billingPeriod =
    (sub.metadata?.billing_period as BillingPeriod | undefined) ?? "monthly";

  // 3-month initial term for Growth/Scale, computed from start date.
  const startSec = sub.start_date ?? Math.floor(Date.now() / 1000);
  const initialTermEndsAt =
    tier === "growth" || tier === "scale" ? (startSec + 90 * 24 * 60 * 60) * 1000 : null;

  // Deposit detection: if any line item on the latest invoice is a one-off,
  // we treat the deposit as paid. Cheap proxy for the actual payment flow.
  const depositPaid = await detectDepositPaid(stripe, sub);

  const now = Date.now();
  await db
    .prepare(
      `INSERT INTO subscriptions (
         customer_id, stripe_subscription_id, tier, billing_period,
         status, cancel_at_period_end, current_period_start, current_period_end,
         trial_end, deposit_paid, initial_term_ends_at, created_at, updated_at
       )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(stripe_subscription_id) DO UPDATE SET
         tier = excluded.tier,
         billing_period = excluded.billing_period,
         status = excluded.status,
         cancel_at_period_end = excluded.cancel_at_period_end,
         current_period_start = excluded.current_period_start,
         current_period_end = excluded.current_period_end,
         trial_end = excluded.trial_end,
         deposit_paid = excluded.deposit_paid,
         updated_at = excluded.updated_at`,
    )
    .bind(
      customer.id,
      sub.id,
      tier,
      billingPeriod,
      sub.status,
      sub.cancel_at_period_end ? 1 : 0,
      sub.current_period_start ? sub.current_period_start * 1000 : null,
      sub.current_period_end ? sub.current_period_end * 1000 : null,
      sub.trial_end ? sub.trial_end * 1000 : null,
      depositPaid ? 1 : 0,
      initialTermEndsAt,
      now,
      now,
    )
    .run();
}

async function detectDepositPaid(stripe: Stripe, sub: Stripe.Subscription): Promise<boolean> {
  if (!sub.latest_invoice) return false;
  const invoiceId =
    typeof sub.latest_invoice === "string" ? sub.latest_invoice : sub.latest_invoice.id;
  if (!invoiceId) return false;
  try {
    const invoice = await stripe.invoices.retrieve(invoiceId, { expand: ["lines.data.price"] });
    if (invoice.status !== "paid") return false;
    return invoice.lines.data.some((line: any) => {
      // Heuristic: a one-time line item (the deposit) has price.type === 'one_time'
      // OR no subscription_item attached. Either is a sufficient signal.
      const priceType = line.price?.type ?? line.pricing?.price_details?.type;
      return priceType === "one_time" || (line.amount > 0 && !line.subscription_item && !line.subscription);
    });
  } catch {
    return false;
  }
}

async function markSubscriptionCanceled(db: D1Database, sub: Stripe.Subscription) {
  await db
    .prepare(
      "UPDATE subscriptions SET status = ?, cancel_at_period_end = 0, updated_at = ? WHERE stripe_subscription_id = ?",
    )
    .bind(sub.status, Date.now(), sub.id)
    .run();
}

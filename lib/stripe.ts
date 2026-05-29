import Stripe from "stripe";

// Workers doesn't expose Node's http module, so we tell the SDK to use
// fetch (which Workers does have). We also swap in a SubtleCrypto-backed
// provider so webhook signature verification works without Node crypto.

let cached: Stripe | null = null;

export function getStripe(secretKey: string): Stripe {
  if (cached) return cached;
  cached = new Stripe(secretKey, {
    httpClient: Stripe.createFetchHttpClient(),
  });
  return cached;
}

// SubtleCrypto isn't available at module load on Workers — only inside a
// request. So we build the provider per-request rather than at import time.
export function getCryptoProvider() {
  return Stripe.createSubtleCryptoProvider();
}

// Tier + billing-period → Stripe lookup_keys we registered in the dashboard.
// Lookup keys are stable across test/live so the same code works in both.
export const PRICE_LOOKUPS = {
  starter: { monthly: "starter_monthly", yearly: "starter_annual", deposit: "starter_deposit" },
  growth:  { monthly: "growth_monthly",  yearly: "growth_annual",  deposit: "growth_deposit"  },
  scale:   { monthly: "scale_monthly",   yearly: "scale_annual",   deposit: "scale_deposit"   },
  pause:   { monthly: "pause_monthly",   yearly: null,             deposit: null              },
} as const;

export type Tier = keyof typeof PRICE_LOOKUPS;
export type BillingPeriod = "monthly" | "yearly";

export const TIERS: Tier[] = ["starter", "growth", "scale"];

// Growth/Scale require a 3-month initial commitment per OFFERINGS.txt.
// Starter is month-to-month from day one. Pause is its own animal.
export function initialTermMonths(tier: Tier): number {
  return tier === "growth" || tier === "scale" ? 3 : 0;
}

// Resolve a tier+period+(deposit?) to a real Stripe price ID by lookup_key.
// Done per request rather than baked into env vars so price-ID drift between
// test and live doesn't break anything.
export async function resolvePriceIds(
  stripe: Stripe,
  tier: Tier,
  billingPeriod: BillingPeriod,
): Promise<{ recurring: string; deposit: string | null }> {
  const lookups = PRICE_LOOKUPS[tier];
  const periodKey = lookups[billingPeriod];
  if (!periodKey) throw new Error(`No ${billingPeriod} price for tier ${tier}`);

  const lookupKeys: string[] = [periodKey];
  if (lookups.deposit) lookupKeys.push(lookups.deposit);

  const list = await stripe.prices.list({
    lookup_keys: lookupKeys,
    expand: ["data.product"],
    active: true,
    limit: 10,
  });

  const recurring = list.data.find((p) => p.lookup_key === periodKey);
  if (!recurring) throw new Error(`Stripe price with lookup_key=${periodKey} not found`);

  const deposit = lookups.deposit
    ? list.data.find((p) => p.lookup_key === lookups.deposit) ?? null
    : null;

  return { recurring: recurring.id, deposit: deposit?.id ?? null };
}

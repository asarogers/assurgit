import { redirect } from "next/navigation";

// /checkout used to be a mock card-form. Real checkout now happens on
// Stripe-hosted Checkout — clicking "Start Starter/Growth/Scale" on
// /pricing POSTs to /api/stripe/create-checkout and redirects to Stripe.
// Anyone landing here directly probably came from an old link, so we
// just bounce them to /pricing.

export const dynamic = "force-static";

export default function CheckoutPage() {
  redirect("/pricing");
}

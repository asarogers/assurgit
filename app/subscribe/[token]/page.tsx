import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import PricingPlans from "@/components/marketing/PricingPlans";
import { verifySubscribeToken } from "@/lib/billing/subscribe-token";

// Token-gated subscription flow — for customers who paid the deposit
// out-of-band (Cal.com booking, manual invoice, in-person). When the token
// is valid, the page renders the no-deposit pricing variant. The
// PricingPlans CTAs forward the same token to /api/stripe/create-checkout,
// which validates it server-side again and skips the deposit line item.
//
// Bad/expired tokens redirect to /pricing rather than 404 so a stale link
// always lands somewhere useful.

export const metadata: Metadata = {
  title: "Activate your Assurgit subscription",
  description: "Add your card to start your subscription. Deposit already paid.",
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ token: string }>;
}

export default async function SubscribeWithTokenPage({ params }: Props) {
  const { token } = await params;
  const claims = await verifySubscribeToken(token);
  if (!claims) {
    redirect("/pricing");
  }

  return (
    <>
      <Navbar />
      <main className="bg-zinc-950 min-h-[80vh] pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-2 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">
            Welcome back
          </p>
          {claims.business_name && (
            <p className="text-sm text-zinc-400 mb-1">
              Account: <span className="text-white font-semibold">{claims.business_name}</span>
            </p>
          )}
          <p className="text-sm text-zinc-500">
            Signed in as <span className="text-zinc-300">{claims.email}</span>
          </p>
        </div>
        <PricingPlans variant="no-deposit" subscribeToken={token} />
      </main>
      <Footer />
    </>
  );
}

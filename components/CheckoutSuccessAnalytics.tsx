"use client";

import { useEffect } from "react";
import { Events, trackEvent } from "@/lib/analytics";

// Fires the GA4 `purchase` event exactly once when the success page mounts.
// We can't know the dollar value without a round-trip to Stripe, so we send
// a placeholder and tier/period from query string. The webhook will record
// the authoritative dollar amount in our own DB.
export default function CheckoutSuccessAnalytics() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id") ?? "";

    // Stripe sets ga_session_id-like data via the success URL query param.
    trackEvent("purchase", {
      transaction_id: sessionId || `session_${Date.now()}`,
      currency: "USD",
      // Value left blank intentionally — the webhook backfills authoritative
      // revenue against this transaction_id later via Measurement Protocol
      // (Phase 2). For now the event itself counts as a conversion.
      value: 0,
    });

    // Also fire a friendlier `subscription_started` event so funnel reports
    // can distinguish purchases from add-on/one-off events later.
    trackEvent("subscription_started", {
      transaction_id: sessionId || `session_${Date.now()}`,
    });
  }, []);

  return null;
}

"use client";

import { useState } from "react";
import Link from "next/link";

// Operator-only tool. Generates a 14-day token URL the operator can hand
// to a customer who already paid the deposit (Cal.com booking, manual
// invoice, in-person). Optional auto-send via Resend.
//
// Auth is enforced server-side by /api/admin/billing/create-link
// (requireOwner). This page just relies on the same owner cookie.

type Tier = "" | "starter" | "growth" | "scale";

export default function AdminBillingPage() {
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [tier, setTier] = useState<Tier>("");
  const [sendEmail, setSendEmail] = useState(true);

  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<
    | { ok: true; url: string; expiresAt: number; emailSent: boolean; emailError: string | null }
    | { ok: false; error: string }
    | null
  >(null);
  const [copied, setCopied] = useState(false);

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setResult(null);
    setCopied(false);
    try {
      const res = await fetch("/api/admin/billing/create-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          tier: tier || undefined,
          business_name: businessName.trim() || undefined,
          send_email: sendEmail,
        }),
      });
      const data = (await res.json()) as {
        url?: string;
        expires_at?: number;
        email_sent?: boolean;
        email_error?: string | null;
        error?: string;
      };
      if (!res.ok || !data.url) {
        setResult({ ok: false, error: data?.error ?? `HTTP ${res.status}` });
        return;
      }
      setResult({
        ok: true,
        url: data.url,
        expiresAt: data.expires_at ?? 0,
        emailSent: !!data.email_sent,
        emailError: data.email_error ?? null,
      });
    } catch (e: any) {
      setResult({ ok: false, error: e?.message ?? "Network error" });
    } finally {
      setBusy(false);
    }
  }

  async function copyUrl() {
    if (!result?.ok) return;
    try {
      await navigator.clipboard.writeText(result.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable; user can select and copy manually */
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black mb-1">Subscribe link generator</h1>
          <p className="text-sm text-muted-foreground">
            Create a one-time URL for a customer who paid the deposit out-of-band.
            When they open it, they go straight to the no-deposit pricing modal.
          </p>
        </div>
        <Link
          href="/billing/email-template"
          className="shrink-0 text-xs font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-4"
        >
          Edit email template →
        </Link>
      </div>

      <form onSubmit={generate} className="space-y-5 mb-10 border border-border rounded-2xl p-6 bg-card">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">
            Customer email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="owner@example.com"
            className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Token is bound to this address. Customer's Stripe Checkout will pre-fill it.
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">
            Business name (optional)
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Acme Plumbing"
            className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">
            Pin to tier (optional)
          </label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value as Tier)}
            className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Let customer pick (any tier)</option>
            <option value="starter">Starter only</option>
            <option value="growth">Growth only</option>
            <option value="scale">Scale only</option>
          </select>
          <p className="text-xs text-muted-foreground mt-1">
            Pinning makes the customer can&apos;t pick a higher tier than the deposit they paid for.
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
          <input
            type="checkbox"
            checked={sendEmail}
            onChange={(e) => setSendEmail(e.target.checked)}
            className="h-4 w-4 rounded border-border"
          />
          <span>Email the link to the customer (via Resend)</span>
        </label>

        <button
          type="submit"
          disabled={busy || !email}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy ? "Generating…" : "Generate link"}
        </button>
      </form>

      {result?.ok && (
        <div className="rounded-2xl border border-emerald-700/40 bg-emerald-950/30 p-6">
          <div className="flex items-start gap-3 mb-4">
            <svg className="w-6 h-6 mt-0.5 flex-shrink-0 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h2 className="text-lg font-bold">Link generated</h2>
              <p className="text-sm text-muted-foreground">
                Expires{" "}
                {new Date(result.expiresAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                · {result.emailSent ? "Email sent ✓" : result.emailError ? `Email failed: ${result.emailError}` : "Email not sent"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-zinc-900 rounded-lg border border-zinc-800 px-3 py-2.5 mb-2">
            <code className="text-xs font-mono text-zinc-200 break-all flex-1">{result.url}</code>
          </div>
          <button
            onClick={copyUrl}
            className="px-3 py-1.5 rounded-md bg-zinc-100 text-zinc-900 hover:bg-white text-xs font-bold transition"
          >
            {copied ? "Copied ✓" : "Copy link"}
          </button>
        </div>
      )}

      {result && !result.ok && (
        <div className="rounded-2xl border border-red-700/40 bg-red-950/30 p-5 text-sm text-red-200">
          <strong>Error:</strong> {result.error}
        </div>
      )}
    </div>
  );
}

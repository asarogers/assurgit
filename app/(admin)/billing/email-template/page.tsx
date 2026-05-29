"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Editor for the subscribe-link email template. Values come from D1 via
// /api/admin/billing/email-template; sendSubscribeLink reads from the same
// row at send time, so changes here go live immediately (no deploy).

type Loaded = {
  key: string;
  subject_variants: string[];
  body_html: string;
  updated_at: number;
};

const PLACEHOLDERS = [
  { token: "{{businessName}}", note: "Customer's business name (or 'there' if blank)" },
  { token: "{{tier}}",         note: "Pinned tier label, e.g. 'Growth' (empty if not pinned)" },
  { token: "{{subscribeUrl}}", note: "The signed activation URL — must appear in body_html" },
];

export default function EmailTemplateEditor() {
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [saved, setSaved]       = useState<number | null>(null);

  const [subjectsText, setSubjectsText] = useState("");
  const [bodyHtml, setBodyHtml]         = useState("");
  const [previewBusiness, setPreviewBusiness] = useState("Studio Salon");
  const [previewTier, setPreviewTier]         = useState("Growth");
  const [showPreview, setShowPreview]         = useState(true);

  // Initial load
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/billing/email-template?key=subscribe_link");
        const data = (await res.json()) as Loaded & { error?: string };
        if (!res.ok) throw new Error(data?.error ?? `HTTP ${res.status}`);
        if (cancelled) return;
        setSubjectsText((data.subject_variants ?? []).join("\n"));
        setBodyHtml(data.body_html ?? "");
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load template");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function save() {
    setError(null);
    setSaved(null);
    const subjects = subjectsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    if (subjects.length === 0) {
      setError("Add at least one subject line.");
      return;
    }
    if (!bodyHtml.trim()) {
      setError("Body cannot be empty.");
      return;
    }
    try {
      const res = await fetch("/api/admin/billing/email-template", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "subscribe_link",
          subject_variants: subjects,
          body_html: bodyHtml,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; updated_at?: number; error?: string };
      if (!res.ok || !data.ok) throw new Error(data?.error ?? `HTTP ${res.status}`);
      setSaved(data.updated_at ?? Date.now());
    } catch (e: any) {
      setError(e?.message ?? "Save failed");
    }
  }

  function fillPreview(s: string) {
    return s
      .replaceAll("{{businessName}}", previewBusiness || "there")
      .replaceAll("{{tier}}", previewTier || "")
      .replaceAll("{{subscribeUrl}}", "https://assurgit.com/subscribe/EXAMPLE_TOKEN");
  }

  const subjectsArray = subjectsText.split("\n").map((s) => s.trim()).filter(Boolean);
  const previewSubject = subjectsArray.length > 0 ? fillPreview(subjectsArray[0]) : "(no subject yet)";
  const previewBody = fillPreview(bodyHtml);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <Link href="/billing" className="text-sm text-blue-400 hover:underline">← Back to billing</Link>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1">Email template — Subscribe link</h1>
        <p className="text-sm text-muted-foreground">
          Editable subject lines + HTML body for the email customers receive when you generate a
          subscribe link. Changes take effect immediately — no deploy needed.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Editor column */}
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">
                Subject lines (one per line — picked at random)
              </label>
              <textarea
                rows={4}
                value={subjectsText}
                onChange={(e) => setSubjectsText(e.target.value)}
                className="w-full font-mono text-sm px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="One subject per line"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">
                Body (HTML)
              </label>
              <textarea
                rows={20}
                value={bodyHtml}
                onChange={(e) => setBodyHtml(e.target.value)}
                className="w-full font-mono text-xs leading-relaxed px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="border border-border rounded-lg p-4 bg-card">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-muted-foreground">
                Placeholders
              </p>
              <ul className="text-xs space-y-1.5">
                {PLACEHOLDERS.map((p) => (
                  <li key={p.token}>
                    <code className="bg-zinc-900 text-blue-300 px-1.5 py-0.5 rounded">{p.token}</code>{" "}
                    <span className="text-muted-foreground">— {p.note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={save}
                disabled={loading}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition disabled:opacity-50"
              >
                Save
              </button>
              {saved && (
                <span className="text-sm text-emerald-400">
                  Saved {new Date(saved).toLocaleTimeString()}
                </span>
              )}
              {error && <span className="text-sm text-red-400">{error}</span>}
            </div>
          </div>

          {/* Preview column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Preview
              </p>
              <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showPreview}
                  onChange={(e) => setShowPreview(e.target.checked)}
                />
                Render HTML
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={previewBusiness}
                onChange={(e) => setPreviewBusiness(e.target.value)}
                placeholder="Business name"
                className="text-sm px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={previewTier}
                onChange={(e) => setPreviewTier(e.target.value)}
                placeholder="Tier (Starter | Growth | Scale)"
                className="text-sm px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-white text-zinc-900 rounded-lg border border-zinc-300 overflow-hidden">
              <div className="px-4 py-3 bg-zinc-100 border-b border-zinc-300 text-xs">
                <p className="text-zinc-500">From: <span className="text-zinc-900 font-medium">Ace at Assurgit &lt;hello@assurgit.com&gt;</span></p>
                <p className="text-zinc-500 mt-0.5">Subject: <span className="text-zinc-900 font-medium">{previewSubject}</span></p>
                {subjectsArray.length > 1 && (
                  <p className="text-zinc-400 mt-1.5 text-[11px]">
                    (showing first; one of {subjectsArray.length} picked at random per send)
                  </p>
                )}
              </div>
              {showPreview ? (
                <div
                  className="p-2 max-h-[640px] overflow-y-auto"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: previewBody }}
                />
              ) : (
                <pre className="p-4 text-[11px] font-mono whitespace-pre-wrap break-words max-h-[640px] overflow-y-auto">
                  {previewBody}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

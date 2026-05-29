import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";

// GET  /api/admin/billing/email-template?key=subscribe_link
// PUT  /api/admin/billing/email-template
//   { key: 'subscribe_link', subject_variants: string[], body_html: string }
//
// Owner-only. Reads/writes the editable email templates that
// `sendSubscribeLink` (and future emails) render at send time.

const VALID_KEYS = new Set(["subscribe_link"]);

export async function GET(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const url = new URL(req.url);
  const key = url.searchParams.get("key") ?? "subscribe_link";
  if (!VALID_KEYS.has(key)) {
    return NextResponse.json({ error: `Unknown template key: ${key}` }, { status: 400 });
  }

  const { env } = getCloudflareContext() as any;
  const db = env.DB as D1Database;

  const row = await db
    .prepare("SELECT key, subject_variants, body_html, updated_at FROM email_templates WHERE key = ?")
    .bind(key)
    .first<{ key: string; subject_variants: string; body_html: string; updated_at: number }>();

  if (!row) {
    return NextResponse.json({ error: "Template not found (run migration 0019)" }, { status: 404 });
  }

  let subjects: string[] = [];
  try {
    subjects = JSON.parse(row.subject_variants);
  } catch {
    subjects = [];
  }

  return NextResponse.json({
    key: row.key,
    subject_variants: subjects,
    body_html: row.body_html,
    updated_at: row.updated_at,
  });
}

export async function PUT(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  let body: { key?: string; subject_variants?: unknown; body_html?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const key = body.key ?? "subscribe_link";
  if (!VALID_KEYS.has(key)) {
    return NextResponse.json({ error: `Unknown template key: ${key}` }, { status: 400 });
  }

  if (!Array.isArray(body.subject_variants) || body.subject_variants.length === 0) {
    return NextResponse.json(
      { error: "subject_variants must be a non-empty array of strings" },
      { status: 400 },
    );
  }
  const subjects = (body.subject_variants as unknown[])
    .map((s) => String(s).trim())
    .filter((s) => s.length > 0);
  if (subjects.length === 0) {
    return NextResponse.json({ error: "At least one subject line is required" }, { status: 400 });
  }

  const html = typeof body.body_html === "string" ? body.body_html.trim() : "";
  if (!html) {
    return NextResponse.json({ error: "body_html cannot be empty" }, { status: 400 });
  }

  const { env } = getCloudflareContext() as any;
  const db = env.DB as D1Database;

  await db
    .prepare(
      `INSERT INTO email_templates (key, subject_variants, body_html, updated_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(key) DO UPDATE SET
         subject_variants = excluded.subject_variants,
         body_html        = excluded.body_html,
         updated_at       = excluded.updated_at`,
    )
    .bind(key, JSON.stringify(subjects), html, Date.now())
    .run();

  return NextResponse.json({ ok: true, updated_at: Date.now() });
}

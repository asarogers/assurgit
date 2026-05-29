import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");

export const ADMIN_EMAIL = "cyberasasoftware@gmail.com";

export async function sendReviewLink({
  to,
  projectName,
  reviewUrl,
  expiresAt,
}: {
  to: string;
  projectName: string;
  reviewUrl: string;
  expiresAt: number;
}) {
  const expireDate = new Date(expiresAt).toLocaleString("en-US", {
    weekday: "long",
    month:   "long",
    day:     "numeric",
    hour:    "numeric",
    minute:  "2-digit",
  });

  return resend.emails.send({
    from: "Assurgit <noreply@assurgit.com>",
    to,
    subject: `Review ready: ${projectName}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
        <h2 style="margin-bottom:8px">Your content is ready to review</h2>
        <p style="color:#555">Project: <strong>${projectName}</strong></p>
        <p style="color:#555">Please review and approve (or deny) each card before the deadline.</p>
        <a href="${reviewUrl}"
           style="display:inline-block;margin:24px 0;padding:12px 24px;background:#000;color:#fff;border-radius:6px;text-decoration:none;font-weight:600">
          Review Content →
        </a>
        <p style="color:#999;font-size:13px">This link expires on ${expireDate}.</p>
      </div>
    `,
  });
}

export async function sendSocialConnectEmail({
  to,
  projectName,
  connectUrl,
}: {
  to:          string;
  projectName: string;
  connectUrl:  string;
}) {
  return resend.emails.send({
    from:    "Assurgit <noreply@assurgit.com>",
    to,
    subject: `Connect your social accounts — ${projectName}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
        <h2 style="margin-bottom:8px">Connect your social accounts</h2>
        <p style="color:#555">You've been invited to connect your social accounts for the project <strong>${projectName}</strong>.</p>
        <p style="color:#555">This allows us to schedule and publish content on your behalf. You can disconnect at any time.</p>
        <a href="${connectUrl}"
           style="display:inline-block;margin:24px 0;padding:12px 24px;background:#000;color:#fff;border-radius:6px;text-decoration:none;font-weight:600">
          Connect Accounts →
        </a>
        <p style="color:#999;font-size:13px">This link expires in 7 days. If you didn't expect this email, you can safely ignore it.</p>
      </div>
    `,
  });
}

export async function sendApprovalNotification({
  projectName,
  clientEmail,
}: {
  projectName: string;
  clientEmail: string;
}) {
  return resend.emails.send({
    from:    "Assurgit <noreply@assurgit.com>",
    to:      ADMIN_EMAIL,
    subject: `✅ Client approved: ${projectName}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
        <h2 style="margin-bottom:8px">Client approved all transcripts</h2>
        <p style="color:#555">Project: <strong>${projectName}</strong></p>
        <p style="color:#555">Client: <strong>${clientEmail}</strong></p>
        <p style="color:#555">All transcripts have been approved and are ready for the next phase.</p>
      </div>
    `,
  });
}

export async function sendDenialNotification({
  projectName,
  clientEmail,
  cardPosition,
  deniesLeft,
}: {
  projectName: string;
  clientEmail: string;
  cardPosition: number;
  deniesLeft: number;
}) {
  return resend.emails.send({
    from:    "Assurgit <noreply@assurgit.com>",
    to:      ADMIN_EMAIL,
    subject: `❌ Client denied a transcript: ${projectName}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
        <h2 style="margin-bottom:8px">Client denied a transcript</h2>
        <p style="color:#555">Project: <strong>${projectName}</strong></p>
        <p style="color:#555">Client: <strong>${clientEmail}</strong></p>
        <p style="color:#555">Card: <strong>#${cardPosition}</strong></p>
        <p style="color:#555">Denials remaining for this client: <strong>${deniesLeft}</strong></p>
      </div>
    `,
  });
}

function row(label: string, value: string | undefined | null) {
  if (!value?.trim()) return "";
  return `<tr>
    <td style="padding:6px 12px 6px 0;color:#888;white-space:nowrap;vertical-align:top;font-size:13px">${label}</td>
    <td style="padding:6px 0;color:#111;font-size:13px">${value.replace(/\n/g, "<br>")}</td>
  </tr>`;
}

export async function sendOnboardingNotification({
  project,
  submission,
  files,
}: {
  project:    { name: string };
  submission: Record<string, string>;
  files:      Array<{ filename: string; fileUrl: string; category: string; fileSize: number | null }>;
}) {
  const fileSizeLabel = (bytes: number | null) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const fileRows = files.map(f =>
    `<li style="margin-bottom:6px">
      <a href="${f.fileUrl}" style="color:#2563eb;text-decoration:none;font-weight:500">${f.filename}</a>
      <span style="color:#888;font-size:12px"> · ${f.category}${f.fileSize ? ` · ${fileSizeLabel(f.fileSize)}` : ""}</span>
    </li>`
  ).join("");

  return resend.emails.send({
    from:    "Assurgit <noreply@assurgit.com>",
    to:      ADMIN_EMAIL,
    subject: `📋 Onboarding submitted: ${project.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <h2 style="margin-bottom:4px">New onboarding submission</h2>
        <p style="color:#555;margin-top:0">Project: <strong>${project.name}</strong></p>

        <h3 style="border-bottom:1px solid #eee;padding-bottom:6px">Business</h3>
        <table style="border-collapse:collapse;width:100%">
          ${row("Business Name", submission.businessName)}
          ${row("Website", submission.website)}
          ${row("What They Do", submission.whatYouDo)}
          ${row("Target Audience", submission.targetAudience)}
          ${row("CTA Goal", submission.ctaGoal)}
          ${row("Platforms", submission.platforms)}
        </table>

        <h3 style="border-bottom:1px solid #eee;padding-bottom:6px;margin-top:20px">Brand Voice</h3>
        <table style="border-collapse:collapse;width:100%">
          ${row("Style", submission.voiceStyle)}
          ${row("Examples They Love", submission.voiceExamples)}
          ${row("Avoid", submission.voiceAvoid)}
        </table>

        <h3 style="border-bottom:1px solid #eee;padding-bottom:6px;margin-top:20px">Social Profiles</h3>
        <table style="border-collapse:collapse;width:100%">
          ${row("Instagram", submission.linkInstagram)}
          ${row("TikTok", submission.linkTiktok)}
          ${row("LinkedIn", submission.linkLinkedin)}
          ${row("YouTube", submission.linkYoutube)}
          ${row("Other Links", submission.linkOther)}
        </table>

        ${submission.extraNotes?.trim() ? `
        <h3 style="border-bottom:1px solid #eee;padding-bottom:6px;margin-top:20px">Additional Notes</h3>
        <p style="color:#333;font-size:13px">${submission.extraNotes.replace(/\n/g, "<br>")}</p>
        ` : ""}

        ${files.length > 0 ? `
        <h3 style="border-bottom:1px solid #eee;padding-bottom:6px;margin-top:20px">Uploaded Files (${files.length})</h3>
        <ul style="padding-left:16px;margin:0">${fileRows}</ul>
        ` : "<p style='color:#888;font-size:13px'>No files uploaded.</p>"}
      </div>
    `,
  });
}

// Sent to a customer who's already paid the deposit out-of-band so they
// can subscribe at the agreed tier without re-paying it. Carries a
// short-lived token that maps to email + (optional) tier pin.
//
// Subject + body live in D1 (`email_templates` row keyed `subscribe_link`)
// and are editable from the /billing/email-template admin page. We pick
// one subject at random per send so the customer doesn't see the exact
// same subject twice.
//
// Placeholders supported in subject AND body:
//   {{businessName}}   {{tier}}   {{subscribeUrl}}

const FALLBACK_TEMPLATE = {
  subjects: [
    "Welcome aboard — let's get you found",
    "Welcome aboard — let's get you on the map",
    "Welcome aboard — let's get you booked",
  ],
  body: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#1a1a1a">
  <p style="margin:0 0 16px">Hi {{businessName}} team,</p>
  <p style="margin:0 0 16px">Thanks so much for the deposit — really excited to get started on your site!</p>
  <p style="margin:28px 0"><a href="{{subscribeUrl}}" style="display:inline-block;padding:14px 26px;background:#2563eb;color:#fff;border-radius:10px;text-decoration:none;font-weight:600">Activate subscription →</a></p>
</div>`,
};

function fillPlaceholders(
  template: string,
  vars: { businessName?: string; tier?: string; subscribeUrl?: string },
): string {
  return template
    .replace(/\{\{\s*businessName\s*\}\}/g, vars.businessName ?? "there")
    .replace(/\{\{\s*tier\s*\}\}/g, vars.tier ?? "")
    .replace(/\{\{\s*subscribeUrl\s*\}\}/g, vars.subscribeUrl ?? "#");
}

async function loadSubscribeLinkTemplate(
  db: D1Database | undefined,
): Promise<{ subjects: string[]; body: string }> {
  if (!db) return FALLBACK_TEMPLATE;
  try {
    const row = await db
      .prepare("SELECT subject_variants, body_html FROM email_templates WHERE key = ?")
      .bind("subscribe_link")
      .first<{ subject_variants: string; body_html: string }>();
    if (!row) return FALLBACK_TEMPLATE;
    let subjects: string[];
    try {
      subjects = JSON.parse(row.subject_variants);
      if (!Array.isArray(subjects) || subjects.length === 0) {
        subjects = FALLBACK_TEMPLATE.subjects;
      }
    } catch {
      subjects = FALLBACK_TEMPLATE.subjects;
    }
    return { subjects, body: row.body_html || FALLBACK_TEMPLATE.body };
  } catch {
    return FALLBACK_TEMPLATE;
  }
}

export async function sendSubscribeLink({
  to,
  businessName,
  subscribeUrl,
  tier,
  db,
}: {
  to: string;
  businessName?: string;
  subscribeUrl: string;
  tier?: "starter" | "growth" | "scale";
  db?: D1Database;
}) {
  const { subjects, body } = await loadSubscribeLinkTemplate(db);
  const subjectTpl = subjects[Math.floor(Math.random() * subjects.length)];

  const tierLabel = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) : "";
  const vars = {
    businessName: businessName?.trim() || "there",
    tier: tierLabel,
    subscribeUrl,
  };

  const subject = fillPlaceholders(subjectTpl, vars);
  const html = fillPlaceholders(body, vars);
  const text = htmlToText(html);

  // Deliverability-tuned headers:
  //   - Reply-To routes replies back to a real inbox (not the noreply-style alias)
  //   - List-Unsubscribe + List-Unsubscribe-Post satisfy Gmail/Yahoo bulk-sender
  //     requirements (Feb 2024+); without them, transactional-looking blasts get
  //     reputation-penalized even when DKIM/SPF/DMARC are clean.
  return resend.emails.send({
    from: "Ace at Assurgit <hello@assurgit.com>",
    to,
    replyTo: "hello@assurgit.com",
    subject,
    html,
    text,
    headers: {
      "List-Unsubscribe": "<mailto:hello@assurgit.com?subject=unsubscribe>",
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });
}

// Convert the rendered HTML into a reasonable plain-text equivalent.
// Most spam filters score multipart-with-text-alt lower than HTML-only.
// Heuristic: drop scripts/styles, convert <br>/<p>/headings to newlines,
// turn anchors into "label (url)", strip remaining tags, decode common
// entities, collapse whitespace.
function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href, label) =>
      `${String(label).replace(/<[^>]+>/g, "").trim()} (${href})`,
    )
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h[1-6]|li)>/gi, "\n\n")
    .replace(/<li[^>]*>/gi, "  • ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&rsquo;|&apos;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

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

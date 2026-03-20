import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    from:    "Content Approval <onboarding@resend.dev>",
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

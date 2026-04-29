import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/siteConfig";

interface ContactBody {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactBody;
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not set — skipping email");
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from =
      process.env.RESEND_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`;
    const to = process.env.CONTACT_FORM_TO_EMAIL || siteConfig.email;
    const firstName = name.split(" ")[0];

    const { error: notifyError } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New message from ${name} — ${siteConfig.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:8px 0; width:80px;"><strong>Name</strong></td><td style="padding:8px 0;">${name}</td></tr>
            <tr><td style="padding:8px 0;"><strong>Email</strong></td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;"><strong>Phone</strong></td><td style="padding:8px 0;">${phone || "Not provided"}</td></tr>
          </table>
          <div style="margin-top:16px; padding:16px; background:#f6f6f6; border-left:4px solid #333; border-radius:4px;">
            <p style="margin:0; white-space:pre-wrap;">${message}</p>
          </div>
          <p style="color:#888; font-size:12px; margin-top:24px;">Reply to this email to respond directly to ${firstName}.</p>
        </div>
      `,
    });

    if (notifyError) {
      console.error("Notification email failed:", notifyError);
      return NextResponse.json(
        { success: false, error: notifyError.message },
        { status: 500 }
      );
    }

    const { error: confirmError } = await resend.emails.send({
      from,
      to: email,
      subject: `Got it, ${firstName} — we'll be in touch soon`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2>Hi ${firstName}, we received your message!</h2>
          <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
          <p>If you'd like to skip the wait and book a time directly:</p>
          <p><a href="${siteConfig.url}/book" style="background:#111; color:#fff; padding:12px 24px; border-radius:6px; text-decoration:none;">Book a free consult</a></p>
          <p>Or call us at <a href="${siteConfig.phone.href}">${siteConfig.phone.display}</a>.</p>
          <hr />
          <p style="font-size:13px; color:#888;">— ${siteConfig.founder}<br />${siteConfig.name} · <a href="${siteConfig.url}">${siteConfig.url.replace("https://", "")}</a></p>
        </div>
      `,
    });

    if (confirmError) {
      console.warn("Confirmation email failed (domain likely not yet verified):", confirmError.message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

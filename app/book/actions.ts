"use server";

import { Resend } from "resend";
import { ADMIN_EMAIL } from "@/lib/email";

const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");

export type IntakeResult =
  | { ok: true; tier: "high-intent" | "warm" | "nurture" }
  | { ok: false; error: string };

export async function submitIntake(formData: FormData): Promise<IntakeResult> {
  const business = String(formData.get("business") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const tried = String(formData.get("tried") ?? "").trim();
  const deadline = String(formData.get("deadline") ?? "").trim();

  if (!business || !email || !tried) {
    return { ok: false, error: "Missing required fields." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  // Lead-scoring heuristic: deadline + platform-name in "tried" = high-intent.
  // Discount/free-language only = nurture. Otherwise warm.
  const triedLower = tried.toLowerCase();
  const namesPlatform = /\b(wix|squarespace|godaddy|wordpress|webflow|shopify|fiverr|upwork|freelancer|agency)\b/.test(triedLower);
  const wantsFree = /\b(free|cheap|discount|coupon|deal|promo)\b/.test(triedLower) && !namesPlatform;
  const tier: "high-intent" | "warm" | "nurture" =
    deadline && namesPlatform ? "high-intent" : wantsFree ? "nurture" : "warm";

  try {
    await resend.emails.send({
      from: "Assurgit <hi@assurgit.com>",
      to: ADMIN_EMAIL,
      subject: `[${tier.toUpperCase()}] New lead: ${business}`,
      text: [
        `Lead tier: ${tier}`,
        `Business: ${business}`,
        `Email: ${email}`,
        `Deadline: ${deadline || "(not provided)"}`,
        ``,
        `What they've already tried:`,
        tried,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[intake] resend failed", err);
    return { ok: false, error: "Couldn't send right now. Email hi@assurgit.com directly." };
  }

  return { ok: true, tier };
}

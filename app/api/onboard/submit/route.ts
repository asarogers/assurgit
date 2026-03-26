import { getDb } from "@/lib/db";
import { onboardingSubmissions, onboardingFiles, projects } from "@/lib/db/schema";
import { validateReviewToken } from "@/lib/token";
import { sendOnboardingNotification } from "@/lib/email";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  if (!token) return Response.json({ error: "Token required" }, { status: 400 });

  const parsed = await validateReviewToken(token);
  if (!parsed) return Response.json({ error: "Invalid token" }, { status: 403 });

  const body = await req.json() as Record<string, string>;
  const db   = getDb();
  const now  = Date.now();

  const existing = await db.query.onboardingSubmissions.findFirst({
    where: (s, { eq }) => eq(s.projectId, parsed.projectId),
  });

  const data = {
    projectId:      parsed.projectId,
    businessName:   body.businessName   ?? "",
    website:        body.website        ?? "",
    whatYouDo:      body.whatYouDo      ?? "",
    targetAudience: body.targetAudience ?? "",
    ctaGoal:        body.ctaGoal        ?? "",
    platforms:      body.platforms      ?? "",
    voiceStyle:     body.voiceStyle     ?? "",
    voiceExamples:  body.voiceExamples  ?? "",
    voiceAvoid:     body.voiceAvoid     ?? "",
    linkInstagram:  body.linkInstagram  ?? "",
    linkTiktok:     body.linkTiktok     ?? "",
    linkLinkedin:   body.linkLinkedin   ?? "",
    linkYoutube:    body.linkYoutube    ?? "",
    linkOther:      body.linkOther      ?? "",
    extraNotes:     body.extraNotes     ?? "",
    submittedAt:    now,
  };

  if (existing) {
    await db.update(onboardingSubmissions).set(data).where(eq(onboardingSubmissions.id, existing.id));
  } else {
    await db.insert(onboardingSubmissions).values({ id: nanoid(), createdAt: now, ...data });
  }

  const [project, files] = await Promise.all([
    db.query.projects.findFirst({ where: (p, { eq }) => eq(p.id, parsed.projectId) }),
    db.query.onboardingFiles.findMany({ where: (f, { eq }) => eq(f.projectId, parsed.projectId) }),
  ]);

  const notifData: Record<string, string> = {
    businessName: data.businessName, website: data.website, whatYouDo: data.whatYouDo,
    targetAudience: data.targetAudience, ctaGoal: data.ctaGoal, platforms: data.platforms,
    voiceStyle: data.voiceStyle, voiceExamples: data.voiceExamples, voiceAvoid: data.voiceAvoid,
    linkInstagram: data.linkInstagram, linkTiktok: data.linkTiktok, linkLinkedin: data.linkLinkedin,
    linkYoutube: data.linkYoutube, linkOther: data.linkOther, extraNotes: data.extraNotes,
  };
  sendOnboardingNotification({ project: project!, submission: notifData, files }).catch(() => {});

  return Response.json({ ok: true });
}

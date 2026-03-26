import { getDb } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { signConnectToken } from "@/lib/social/connect-token";
import { sendSocialConnectEmail } from "@/lib/email";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq } from "drizzle-orm";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { id } = await params;
  const db     = getDb();

  const project = await db.query.projects.findFirst({
    where: (p, { eq }) => eq(p.id, id),
  });
  if (!project) return Response.json({ error: "Not found" }, { status: 404 });

  const { env } = getCloudflareContext() as any;
  const appUrl  = (env.NEXT_PUBLIC_APP_URL as string) ?? "https://assurgit.com";

  // Optionally update client email if provided in body
  const body        = await req.json().catch(() => ({})) as { email?: string };
  const clientEmail = body.email ?? project.clientEmail;
  if (!clientEmail) return Response.json({ error: "No client email on file — provide one in the request body" }, { status: 400 });

  if (body.email && body.email !== project.clientEmail) {
    await db.update(projects).set({ clientEmail: body.email }).where(eq(projects.id, id));
  }

  const token     = await signConnectToken(id);
  const connectUrl = `${appUrl}/connect?token=${encodeURIComponent(token)}`;

  try {
    await sendSocialConnectEmail({ to: clientEmail, projectName: project.name, connectUrl });
  } catch (err) {
    console.error("Connect email failed:", err);
    // Return the URL even if email failed — admin can share it manually
  }

  return Response.json({ ok: true, connectUrl });
}

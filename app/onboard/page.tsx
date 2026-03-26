import type { Metadata } from "next";
import { validateReviewToken } from "@/lib/token";
import { getDb } from "@/lib/db";
import { OnboardClient } from "./OnboardClient";

export const metadata: Metadata = {
  title: "Client Onboarding — Assurgit",
  robots: { index: false, follow: false },
};

function ErrorPage({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-4xl mb-4">🔒</p>
        <h1 className="text-xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-gray-400">{message}</p>
      </div>
    </div>
  );
}

export default async function OnboardPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) return <ErrorPage message="No access token provided." />;

  const parsed = await validateReviewToken(token);
  if (!parsed) return <ErrorPage message="This link is invalid. Please contact your Assurgit team." />;

  const db = getDb();
  const [project, submission, files] = await Promise.all([
    db.query.projects.findFirst({ where: (p, { eq }) => eq(p.id, parsed.projectId) }),
    db.query.onboardingSubmissions.findFirst({ where: (s, { eq }) => eq(s.projectId, parsed.projectId) }),
    db.query.onboardingFiles.findMany({
      where: (f, { eq }) => eq(f.projectId, parsed.projectId),
      orderBy: (f, { asc }) => [asc(f.createdAt)],
    }),
  ]);

  if (!project) return <ErrorPage message="Project not found." />;

  return (
    <OnboardClient
      token={token}
      projectName={project.name}
      initialSubmission={submission ?? null}
      initialFiles={files}
    />
  );
}

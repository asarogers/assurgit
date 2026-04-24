import type { Metadata } from "next";
import { validateReviewToken } from "@/lib/token";
import { getDb } from "@/lib/db";
import { projects, onboardingSubmissions, onboardingFiles } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { OnboardClient } from "./OnboardClient";

export const metadata: Metadata = {
  title: "Client Onboarding — Assurgit",
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://assurgit.com/onboard',
  },
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
    db.select().from(projects).where(eq(projects.id, parsed.projectId)).limit(1).then((r) => r[0]),
    db.select().from(onboardingSubmissions).where(eq(onboardingSubmissions.projectId, parsed.projectId)).limit(1).then((r) => r[0]),
    db.select().from(onboardingFiles).where(eq(onboardingFiles.projectId, parsed.projectId)).orderBy(asc(onboardingFiles.createdAt)),
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

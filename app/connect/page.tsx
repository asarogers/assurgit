import type { Metadata } from "next";
import { verifyConnectToken } from "@/lib/social/connect-token";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://assurgit.com/connect',
  },
};
import { getDb } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { socialAccounts } from "@/lib/db/social-schema";
import { eq } from "drizzle-orm";
import { ConnectPortal } from "@/components/social/ConnectPortal";

interface Props {
  searchParams: Promise<{ token?: string; connected?: string; error?: string }>;
}

export default async function ConnectPage({ searchParams }: Props) {
  const { token, connected, error } = await searchParams;

  if (!token) {
    return <InvalidLink message="No authorization token provided." />;
  }

  const parsed = await verifyConnectToken(token);
  if (!parsed) {
    return <InvalidLink message="This link has expired or is invalid. Ask your manager to send a new one." />;
  }

  const db = getDb();

  const project = (await db.select().from(projects).where(eq(projects.id, parsed.projectId)).limit(1))[0];
  if (!project) {
    return <InvalidLink message="Project not found." />;
  }

  const accounts = project.clientId
    ? await db.select().from(socialAccounts).where(eq(socialAccounts.clientId, project.clientId))
    : await db.select().from(socialAccounts).where(eq(socialAccounts.projectId, parsed.projectId));

  return (
    <ConnectPortal
      token={token}
      projectId={parsed.projectId}
      projectName={project.name}
      connectedAccounts={accounts}
      flashConnected={connected === "1"}
      flashError={error ?? null}
    />
  );
}

function InvalidLink({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-sm text-center space-y-3">
        <p className="text-2xl">🔗</p>
        <h1 className="text-base font-semibold">Invalid Link</h1>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

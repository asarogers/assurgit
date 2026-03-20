import { ReviewClient } from "@/components/review/ReviewClient";

interface Props {
  searchParams: Promise<{ token?: string }>;
}

async function getSession(token: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const res  = await fetch(`${base}/api/review/session?token=${token}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ReviewPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-muted-foreground">Invalid review link.</p>
      </div>
    );
  }

  const data = await getSession(token);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-muted-foreground">
          This review link is invalid or has expired.
        </p>
      </div>
    );
  }

  const { project, session } = data;

  return (
    <ReviewClient
      token={token}
      projectName={project.name}
      phase={project.phase}
      cards={project.cards}
      session={session}
    />
  );
}

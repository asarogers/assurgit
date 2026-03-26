import { requireOwner, unauthorizedResponse } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { socialAccounts } from "@/lib/db/social-schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try { await requireOwner(req); } catch { return unauthorizedResponse(); }

  const { searchParams } = new URL(req.url);
  const q         = searchParams.get("q")?.trim();
  const accountId = searchParams.get("accountId")?.trim();
  if (!q) return Response.json([]);

  // Try authenticated request using the Reddit account's stored token
  let accessToken: string | null = null;
  if (accountId) {
    try {
      const db = getDb();
      const account = await db.query.socialAccounts.findFirst({
        where: (a, { and }) => and(eq(a.id, accountId), eq(a.platform, "reddit")),
      });
      accessToken = account?.accessToken ?? null;
    } catch {}
  }

  const headers: Record<string, string> = {
    "User-Agent": "assurgit/1.0 by assurgit",
  };

  let url: string;
  if (accessToken) {
    // Authenticated: use oauth.reddit.com
    url = `https://oauth.reddit.com/subreddits/search?q=${encodeURIComponent(q)}&limit=8&include_over_18=false&type=sr`;
    headers["Authorization"] = `Bearer ${accessToken}`;
  } else {
    // Fallback: public API
    url = `https://www.reddit.com/subreddits/search.json?q=${encodeURIComponent(q)}&limit=8&include_over_18=false`;
  }

  const res = await fetch(url, { headers });
  if (!res.ok) return Response.json([]);

  const json = await res.json() as any;
  const results = (json?.data?.children ?? []).map((child: any) => ({
    name:        child.data.display_name as string,
    title:       child.data.title as string,
    subscribers: (child.data.subscribers ?? 0) as number,
    description: ((child.data.public_description as string) || "").slice(0, 120),
  }));

  return Response.json(results);
}

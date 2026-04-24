import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import { drizzle as proxyDrizzle } from "drizzle-orm/sqlite-proxy";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as socialSchema    from "./social-schema";
import * as socialRelations from "./social-relations";

const SCHEMA = { ...socialSchema, ...socialRelations };

const D1_DB_ID   = "d67312d3-bac1-40ea-8445-1470668ef7e3";
const CF_ACCOUNT = "ff1652fb9eaa4d149d6f7ac54dc77b84";

export function getDb(): DrizzleD1Database<typeof SCHEMA> {
  // On Vercel: access D1 via the Cloudflare REST API
  if (process.env.VERCEL) {
    const token = process.env.CLOUDFLARE_API_TOKEN;
    if (!token) throw new Error("CLOUDFLARE_API_TOKEN is not set");

    return proxyDrizzle(
      async (sql, params, method) => {
        const res = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT}/d1/database/${D1_DB_ID}/query`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sql, params }),
          }
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const json = (await res.json()) as any;
        if (!json.success) {
          throw new Error(json.errors?.[0]?.message ?? "D1 HTTP query failed");
        }

        const result = json.result?.[0];
        if (!result?.success) {
          throw new Error("D1 query failed: " + (result?.error ?? "unknown"));
        }

        if (method === "run") return { rows: [] };

        const rows: unknown[] = result.results ?? [];
        if (rows.length === 0) return { rows: [] };

        const cols = Object.keys(rows[0] as object);
        return {
          rows: (rows as Record<string, unknown>[]).map((r) =>
            cols.map((c) => {
              const v = r[c];
              if (typeof v === "string") {
                const s = v.trim();
                if ((s.startsWith("[") && s.endsWith("]")) || (s.startsWith("{") && s.endsWith("}"))) {
                  try { return JSON.parse(s); } catch { /* not JSON */ }
                }
              }
              return v;
            })
          ),
        };
      },
      { schema: SCHEMA }
    ) as unknown as DrizzleD1Database<typeof SCHEMA>;
  }

  // Cloudflare Worker: use the D1 binding directly
  const { env } = getCloudflareContext();
  return drizzle(env.DB, { schema: SCHEMA });
}

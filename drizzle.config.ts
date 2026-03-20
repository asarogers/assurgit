import type { Config } from "drizzle-kit";

export default {
  schema:  "./lib/db/schema.ts",
  out:     "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: "./content-approval.db",
  },
} satisfies Config;

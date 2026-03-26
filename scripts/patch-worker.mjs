import { readFileSync, writeFileSync } from "fs";

const workerPath = ".open-next/worker.js";
const worker = readFileSync(workerPath, "utf8");

if (worker.includes("async scheduled(")) {
  console.log("Worker already patched, skipping.");
  process.exit(0);
}

const scheduledFn = `  async scheduled(event, env, ctx) {
    const appUrl = env.NEXT_PUBLIC_APP_URL ?? "https://assurgit.com";
    const cronSecret = env.CRON_SECRET ?? "";
    // Use SELF service binding to call own fetch handler directly (avoids 522 network loop)
    const target = env.SELF ?? { fetch: (r) => fetch(r) };
    ctx.waitUntil(
      target.fetch(new Request(\`\${appUrl}/api/cron/publish\`, {
        headers: { "Authorization": \`Bearer \${cronSecret}\` },
      })).then((r) => console.log("[cron] publish status:", r.status))
        .catch((err) => console.error("[cron] publish failed:", err))
    );
  },`;

// The worker ends with:  `    },\n};`
// We want to insert before the final `};`
const lastClose = worker.lastIndexOf("\n};");
if (lastClose === -1) {
  console.error("❌ Could not find closing }; in worker.js");
  process.exit(1);
}

const patched = worker.slice(0, lastClose) + `\n${scheduledFn}\n};`;

writeFileSync(workerPath, patched, "utf8");
console.log("✅ Worker patched with scheduled handler.");

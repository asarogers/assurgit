import { readFileSync, writeFileSync, existsSync } from "fs";

// ─── Patch 1: handler.mjs — remove @vercel/og dynamic import ─────────────────
// Next.js embeds an externalImport() switch with a case that dynamically imports
// @vercel/og. Wrangler sees that import() and bundles the WASM (1.4 MB) + edge JS
// (797 KB) into the worker even though we have no opengraph-image routes.
// We replace the case with a hard throw so the import() disappears from the bundle.
const handlerPath = ".open-next/server-functions/default/handler.mjs";
if (!existsSync(handlerPath)) {
  console.log("handler.mjs not found — skipping OG patch (newer adapter bundles directly to worker.js).");
} else {
  const handler = readFileSync(handlerPath, "utf8");

  const OG_IMPORT = `case"next/dist/compiled/@vercel/og/index.node.js":raw=await import("next/dist/compiled/@vercel/og/index.edge.js");break;`;
  const OG_STUB   = `case"next/dist/compiled/@vercel/og/index.node.js":throw new Error("OG image generation not available");`;

  const occurrences = (handler.match(new RegExp(OG_IMPORT.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
  const stubbed    = (handler.match(new RegExp(OG_STUB.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;

  if (occurrences === 0 && stubbed === 0) {
    console.warn("⚠️  handler.mjs OG import pattern not found — skipping OG patch.");
  } else if (occurrences === 0) {
    console.log(`handler.mjs OG patch already applied (${stubbed} occurrence(s)), skipping.`);
  } else {
    const patched = handler.replaceAll(OG_IMPORT, OG_STUB);
    writeFileSync(handlerPath, patched, "utf8");
    console.log(`✅ handler.mjs patched: replaced ${occurrences} @vercel/og import(s).`);
  }
}

// ─── Patch 2: worker.js — add scheduled() cron handler ───────────────────────
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

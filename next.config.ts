import type { NextConfig } from "next";
import path from "path";

// Only run Cloudflare dev tooling locally — not on Vercel (workerd binary requires GLIBC not available there)
if (!process.env.VERCEL) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
    initOpenNextCloudflareForDev();
  } catch {
    // Cloudflare dev tools not available in this environment
  }
}

const BUILD_DATE = new Date().toUTCString();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/uploads/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000" }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "Last-Modified", value: BUILD_DATE },
          { key: "Vary", value: "Accept-Encoding" },
        ],
      },
    ];
  },
  // Stub @vercel/og edge runtime — no opengraph-image routes in this app.
  // Prevents resvg.wasm, yoga.wasm, and index.edge.js from entering the worker bundle.
  turbopack: {
    resolveAlias: {
      "next/dist/compiled/@vercel/og/index.edge.js": path.resolve("./lib/og-stub.mjs"),
    },
  },

};

export default nextConfig;

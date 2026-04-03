import type { NextConfig } from "next";
import path from "path";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // Serve uploaded videos from /uploads
  async headers() {
    return [
      {
        source: "/uploads/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000" }],
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow large video uploads
  experimental: {
    serverActions: {
      bodySizeLimit: "500mb",
    },
  },
  // Serve uploaded videos from /uploads
  async headers() {
    return [
      {
        source: "/uploads/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000" }],
      },
    ];
  },
};

export default nextConfig;

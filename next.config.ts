import type { NextConfig } from "next";
import { getWhopEmbedCspValue } from "./src/lib/embed-headers";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // All routes — required for Whop Website Embed (Vercel may otherwise send X-Frame-Options: DENY)
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: getWhopEmbedCspValue(),
          },
          // Intentionally omit X-Frame-Options — use CSP frame-ancestors instead (see src/lib/embed-headers.ts)
        ],
      },
    ];
  },
};

export default nextConfig;

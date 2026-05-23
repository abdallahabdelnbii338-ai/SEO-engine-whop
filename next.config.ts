import type { NextConfig } from "next";

/** Allow Whop Website Embed (iframe). CSP frame-ancestors overrides X-Frame-Options in modern browsers. */
const frameAncestors = [
  "'self'",
  "https://whop.com",
  "https://*.whop.com",
].join(" ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors ${frameAncestors};`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

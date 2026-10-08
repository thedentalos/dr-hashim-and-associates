import type { NextConfig } from "next";

/**
 * Canonical URLs, `sitemap.xml` and the `Sitemap:` line in `robots.txt` all
 * derive from `SITE_URL`. When it is missing they do not fail — they quietly
 * disappear, and because the sitemap and robots file are generated at build
 * time, setting the variable afterwards cannot repair them.
 *
 * The guard for that lives in `app/sitemap.ts` rather than here: Next assigns
 * `process.env.NEXT_PHASE` inside the build runner, after this file has already
 * been evaluated, so a check here can never see the build phase.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  images: {
    // Every source image is a photograph, so AVIF is a consistent win over
    // WebP. The default 4-hour minimum cache TTL means browsers revalidate
    // optimized images several times a day for assets that never change.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;

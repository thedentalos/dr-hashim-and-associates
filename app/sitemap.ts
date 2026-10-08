import type { MetadataRoute } from "next";
import { doctors } from "./data";

/**
 * Canonical URLs, this sitemap and the `Sitemap:` line in robots.txt all derive
 * from `SITE_URL`, and all three are produced at build time. Without it the
 * sitemap silently becomes `[]` and the canonicals become relative, and setting
 * the variable after the build cannot repair either — so a production build
 * without it fails here rather than shipping a site with no canonical signal.
 *
 * The check lives here rather than in next.config.ts because Next assigns
 * `process.env.NEXT_PHASE` during the build, after the config has been loaded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.SITE_URL?.trim().replace(/\/$/, "");
  if (!siteUrl) {
    if (process.env.NEXT_PHASE === "phase-production-build") {
      throw new Error(
        "SITE_URL is not set. Canonical URLs, sitemap.xml and the robots.txt sitemap " +
        "line are all derived from it and generated at build time. Set SITE_URL to the " +
        "public origin (for example https://www.drhashim.pk) in the build environment, " +
        "then build again.",
      );
    }
    return [];
  }

  // Google ignores `priority` and largely ignores `changeFrequency`; it is
  // `lastModified` that drives recrawl scheduling, so every entry carries one.
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/team`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...doctors.map((doctor) => ({
      url: `${siteUrl}/team/${doctor.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${siteUrl}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/cases`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/reviews`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/book-appointment`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}

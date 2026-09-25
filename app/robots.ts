import type { MetadataRoute } from "next";

function productionUrl() {
  return process.env.SITE_URL?.trim().replace(/\/$/, "");
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = productionUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    ...(siteUrl ? { host: siteUrl, sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}

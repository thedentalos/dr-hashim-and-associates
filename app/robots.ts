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
      // No Disallow for /api/. The one route that lived there was removed, and
      // a block on a path that no longer exists only hides the 404 from Google:
      // Search Console reports it as "Blocked by robots.txt" for ever, because
      // the rule stops Google from ever discovering the page is gone. A 404 is
      // the correct signal. If an API route is added later, prefer a
      // `X-Robots-Tag: noindex` header on it — a robots block does not prevent
      // a URL being indexed if something links to it.
    },
    ...(siteUrl ? { host: siteUrl, sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}

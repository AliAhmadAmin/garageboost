import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://garageboost.co.uk";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/garage"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

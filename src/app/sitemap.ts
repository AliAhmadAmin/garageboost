import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://garageboost.co.uk";

  const staticPages = [
    "",
    "/about",
    "/contact",
    "/garages",
    "/features",
    "/pricing",
    "/blog",
    "/faq",
    "/privacy",
    "/terms",
  ];

  const routes = staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...routes, ...blogRoutes];
}

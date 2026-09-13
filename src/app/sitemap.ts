import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICE_SLUGS } from "@/lib/services";

/**
 * Routes that are currently redirected away (/before-after, /blog) are
 * deliberately absent: listing a URL that 307s is a wasted crawl. Add them back
 * to the list in the same change that removes their redirect.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: Array<{ path: string; priority: number; changeFrequency: "monthly" | "yearly" }> = [
    { path: "", priority: 1.0, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    ...SERVICE_SLUGS.map((slug) => ({
      path: `/services/${slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    { path: "/get-a-quote", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms-and-conditions", priority: 0.2, changeFrequency: "yearly" },
  ];

  return entries.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

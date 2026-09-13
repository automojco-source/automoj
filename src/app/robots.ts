import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The admin area and the API are also sent `X-Robots-Tag: noindex`
        // by next.config.ts — robots.txt only asks, the header enforces.
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}

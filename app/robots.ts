import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/seo.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Yandex powers ~21% of search in Uzbekistan — never block it
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SEO_CONFIG.url}/sitemap.xml`,
    host: SEO_CONFIG.url,
  };
}

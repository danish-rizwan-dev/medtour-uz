import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/seo.config";

const locales = ["ru", "uz", "en"];

const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/treatments", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/hospitals", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/consultation", priority: 0.9, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const currentDate = new Date().toISOString();

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${SEO_CONFIG.url}/${locale}${route.path}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            ru: `${SEO_CONFIG.url}/ru${route.path}`,
            uz: `${SEO_CONFIG.url}/uz${route.path}`,
            en: `${SEO_CONFIG.url}/en${route.path}`,
            "x-default": `${SEO_CONFIG.url}/ru${route.path}`,
          },
        },
      });
    }
  }

  return entries;
}

import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/seo.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SEO_CONFIG.siteName,
    short_name: "MedTourUZ",
    description: SEO_CONFIG.description,
    start_url: "/ru",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a6ebd",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

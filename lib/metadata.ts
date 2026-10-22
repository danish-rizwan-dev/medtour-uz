import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { routing } from "@/i18n/routing";

/**
 * Per-page SEO metadata with correct canonical + hreflang alternates.
 *
 * Usage in a page under app/[locale]/<path>/page.tsx:
 *   export async function generateMetadata({ params }): Promise<Metadata> {
 *     const { locale } = await params;
 *     const t = await getTranslations({ locale, namespace: "TreatmentsPage" });
 *     return pageMetadata(locale, "/treatments", t("title"), t("subtitle"));
 *   }
 *
 * Never set canonical in the [locale] layout — it would force every
 * subpage to claim it is a duplicate of the homepage.
 */
export function pageMetadata(
  locale: string,
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = `${SITE.url}/${locale}${path}`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${SITE.url}/${l}${path}`;
  }
  // x-default points to the primary (Russian) version
  languages["x-default"] = `${SITE.url}/${routing.defaultLocale}${path}`;

  const ogLocales: Record<string, string> = {
    ru: "ru_RU",
    uz: "uz_UZ",
    en: "en_US",
  };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: ogLocales[locale] ?? "ru_RU",
      type: "website",
      images: [
        {
          url: `${SITE.url}/images/hospitals/apollo-delhi.jpg`,
          width: 1280,
          height: 853,
          alt: "Indraprastha Apollo Hospitals, New Delhi",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE.url}/images/hospitals/apollo-delhi.jpg`],
    },
  };
}

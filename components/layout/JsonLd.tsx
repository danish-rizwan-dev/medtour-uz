import { useTranslations, useLocale } from "next-intl";
import { SITE } from "@/lib/site";

const localeMap: Record<string, string> = {
  ru: "ru-RU",
  uz: "uz-UZ",
  en: "en-US",
};

export default function JsonLd() {
  const t = useTranslations();
  const locale = useLocale();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: t("Metadata.title"),
        alternateName: ["MedTour Uzbekistan", "MedTourUZ"],
        url: `${SITE.url}/${locale}`,
        inLanguage: localeMap[locale] ?? "ru-RU",
      },
      {
        "@type": "MedicalOrganization",
        "@id": `${SITE.url}/#organization`,
        name: t("Metadata.title"),
        alternateName: ["MedTour Uzbekistan", "MedTourUZ"],
        url: `${SITE.url}/${locale}`,
        logo: `${SITE.url}/icon.svg`,
        image: `${SITE.url}/images/hospitals/apollo-delhi.jpg`,
        description: t("Metadata.description"),
        medicalSpecialty: [
          "Cardiovascular",
          "Oncologic",
          "Musculoskeletal",
          "Urologic",
          "NervousSystem",
        ],
        areaServed: { "@type": "Country", name: "Uzbekistan" },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: SITE.email,
            areaServed: "UZ",
            availableLanguage: ["Russian", "Uzbek", "English"],
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/${locale}/#faq`,
        mainEntity: [1, 2, 3, 4, 5, 6].map((i) => ({
          "@type": "Question",
          name: t(`FAQ.q${i}`),
          acceptedAnswer: { "@type": "Answer", text: t(`FAQ.a${i}`) },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

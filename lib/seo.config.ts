const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://medtouruz.com";

export const SEO_CONFIG = {
  defaultTitle: "MedTour Uzbekistan | Лечение в Индии для пациентов из Узбекистана",
  titleTemplate: "%s | MedTour Uzbekistan",
  description:
    "Организация лечения в Индии для пациентов из Узбекистана: кардиология, онкология, ортопедия, урология и нейрохирургия. Бесплатная второе мнение, визовая поддержка и координация на русском и узбекском языках.",
  siteName: "MedTour Uzbekistan",
  url: SITE_URL,
  ogImage: "/images/hospitals/apollo-delhi.jpg",
  keywords: [
    "лечение в Индии",
    "медицинский туризм Узбекистан",
    "лечение Индия цена",
    "операция в Индии",
    "второе медицинское мнение",
    "Hindistonda davolanish",
    "medical tourism India Uzbekistan",
    "affordable surgery India",
  ],
  authors: [{ name: "MedTour Uzbekistan", url: SITE_URL }],
};

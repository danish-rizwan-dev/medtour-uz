import type { Metadata, Viewport } from "next";
import { Montserrat, Literata } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/layout/JsonLd";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import "../globals.css";

// `--font-montserrat` is referenced by `--font-sans` in app/globals.css
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// Serif display face for the "institutional editorial" direction.
// Literata stands in for the mockup's Newsreader and, unlike Newsreader, ships Cyrillic,
// which the Russian-default site needs.
const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  style: ["normal", "italic"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0a6ebd",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Layout-level metadata provides site-wide defaults only.
 * Canonical + hreflang are set per page via `pageMetadata()` in
 * each page's own generateMetadata. Putting them here would force
 * every subpage to claim it is a duplicate of the homepage.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: t("title"),
      template: `%s | ${SITE.name}`,
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    applicationName: SITE.name,
    formatDetection: { email: false, address: false, telephone: false },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      siteName: SITE.name,
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enables static rendering of locale pages
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${montserrat.variable} ${literata.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <JsonLd />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

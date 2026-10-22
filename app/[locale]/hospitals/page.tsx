import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { hospitals } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HospitalsPage" });
  return pageMetadata(locale, "/hospitals", t("title"), t("subtitle"));
}

export default async function HospitalsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HospitalsContent locale={locale} />;
}

function HospitalsContent({ locale }: { locale: string }) {
  const t = useTranslations("HospitalsPage");
  const ts = useTranslations("HospitalsSection");
  const cityKey = locale === "ru" ? "cityRu" : locale === "uz" ? "cityUz" : "city";

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="pad py-16 text-center md:py-20">
          <Reveal>
            <h1 className="font-display mx-auto max-w-[24ch] text-[clamp(28px,4.4vw,56px)] font-light leading-[1.1] text-white">
              {t("title")}
            </h1>
            <p className="mx-auto mt-6 max-w-[58ch] text-[clamp(18px,1.4vw,19px)] leading-relaxed text-white/80">
              {t("subtitle")}
            </p>
          </Reveal>
        </div>
        <div className="relative h-[38vh] min-h-[260px] w-full">
          <Image
            src={hospitals[3].image}
            alt={`${hospitals[3].name}, ${hospitals[3][cityKey as "city"]}`}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="glass-dark absolute bottom-4 left-5 rounded-xl p-4 text-left md:left-12">
            <p className="text-[15px] font-semibold text-white">{hospitals[3].name}</p>
            <p className="mt-0.5 text-[14px] leading-snug text-white/70">
              {hospitals[3][cityKey as "city"]} · {hospitals[3].accreditation}
            </p>
          </div>
        </div>
      </section>

      {/* Hospital cards */}
      <section className="bg-parchment py-20 md:py-28">
        <div className="pad grid gap-6 md:grid-cols-2">
          {hospitals.map((h, i) => (
            <Reveal key={h.slug} delay={(i % 2) * 70}>
              <article className="tile group h-full rounded-2xl p-4">
                <div className="relative h-64 overflow-hidden rounded-xl">
                  <Image
                    src={h.image}
                    alt={`${h.name}: ${h[cityKey as "city"]}`}
                    width={1280}
                    height={853}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="glass-light absolute left-3 top-3 rounded-full px-3 py-1 text-[14px] font-semibold text-navy">
                    {h.accreditation}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="font-display text-[26px] font-normal leading-snug text-navy">{h.name}</h2>
                  <p className="mt-1 text-[15px] text-muted">{h[cityKey as "city"]}</p>

                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-body">
                    <span>
                      {t("factEstablished")}: <span className="font-semibold text-navy tabular-nums">{h.established}</span>
                    </span>
                    <span>
                      {t("factBeds")}: <span className="font-semibold text-navy tabular-nums">{h.beds}</span>
                    </span>
                    <span className="text-healing-dark">{t("factAccreditation")}</span>
                  </div>

                  <p className="mt-4 text-[16px] leading-relaxed text-body">{ts(h.summaryKey)}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How we select */}
      <section className="bg-parchment-subtle py-20 md:py-28">
        <div className="pad">
          <h2 className="font-display max-w-[22ch] text-[clamp(28px,3.4vw,44px)] font-light leading-[1.12] text-navy">
            {t("whyTitle")}
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i, idx) => (
              <Reveal key={i} delay={idx * 60}>
                <div className="tile h-full rounded-2xl p-7">
                  <p className="text-[16px] leading-relaxed text-body">{t(`why${i}`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 text-white md:py-28">
        <div className="pad grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display max-w-[24ch] text-[clamp(28px,3.4vw,44px)] font-light leading-[1.12] text-white">
              {t("ctaTitle")}
            </h2>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-white/75">{t("ctaText")}</p>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <Link href="/consultation" className="btn btn-cta">
              {t("ctaButton")} <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight, Tag } from "lucide-react";
import { hospitals } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import Reveal from "@/components/Reveal";

const specialties = ["cardiology", "oncology", "orthopedics", "urology", "neurosurgery"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TreatmentsPage" });
  return pageMetadata(locale, "/treatments", t("title"), t("subtitle"));
}

export default async function TreatmentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TreatmentsContent />;
}

function TreatmentsContent() {
  const t = useTranslations("TreatmentsPage");

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
            src={hospitals[0].image}
            alt={`${hospitals[0].name}, ${hospitals[0].city}`}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="glass-dark absolute bottom-4 left-5 rounded-xl p-4 text-left md:left-12">
            <p className="text-[15px] font-semibold text-white">{hospitals[0].name}</p>
            <p className="mt-0.5 text-[14px] leading-snug text-white/70">
              {hospitals[0].city} · {hospitals[0].accreditation}
            </p>
          </div>
        </div>
      </section>

      {/* Price notice */}
      <section className="bg-parchment-subtle">
        <div className="pad py-5">
          <p className="max-w-[80ch] text-[16px] leading-relaxed text-body">{t("priceNote")}</p>
        </div>
      </section>

      {/* Specialty sections */}
      {specialties.map((key, index) => (
        <section
          key={key}
          id={key}
          className={`py-20 md:py-28 ${index % 2 === 1 ? "bg-parchment-subtle" : "bg-parchment"}`}
        >
          <div className="pad grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <h2 className="font-display text-[clamp(28px,3.4vw,44px)] font-light leading-[1.12] text-navy">
                  {t(`${key}.name`)}
                </h2>
                <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-body">
                  {t(`${key}.about`)}
                </p>
                <figure className="mt-8">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={hospitals[index % hospitals.length].image}
                      alt={`${hospitals[index % hospitals.length].name}, ${hospitals[index % hospitals.length].city}`}
                      width={1280}
                      height={853}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-[14px] text-muted">
                    {hospitals[index % hospitals.length].name}, {hospitals[index % hospitals.length].city}
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            <div className="grid gap-5 lg:col-span-8 md:grid-cols-2">
              {/* Procedures */}
              <Reveal delay={index % 2 === 0 ? 0 : 60}>
                <div className="tile h-full rounded-2xl p-7">
                  <h3 className="text-[16px] font-semibold text-navy">{t("popularProcedures")}</h3>
                  <ul className="mt-5 space-y-3">
                    {(t.raw(`${key}.procedures`) as string[]).map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[16px] leading-relaxed text-body">
                        <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-healing" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Prices */}
              <Reveal delay={index % 2 === 0 ? 60 : 0}>
                <div className="tile h-full rounded-2xl p-7">
                  <h3 className="flex items-center gap-2 text-[16px] font-semibold text-navy">
                    <Tag size={16} className="text-cta" aria-hidden /> {t("indicativePrices")}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {(t.raw(`${key}.prices`) as { name: string; range: string }[]).map((r) => (
                      <li
                        key={r.name}
                        className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-parchment-subtle"
                      >
                        <span className="text-[16px] font-medium text-ink">{r.name}</span>
                        <span className="whitespace-nowrap font-display text-[17px] font-normal text-navy">
                          {r.range}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/consultation" className="btn btn-cta mt-7 w-full">
                    {t("requestQuote")} <ArrowRight size={16} aria-hidden />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

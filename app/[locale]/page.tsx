import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import { hospitals, doctors } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import Reveal from "@/components/Reveal";

const categoryKeys = [
  "cardiology",
  "oncology",
  "orthopedics",
  "urology",
  "neurosurgery",
] as const;

const faqKeys = [1, 2, 3, 4, 5, 6] as const;

/** Specialty → lowest "from" price, parsed from the first listed price range. */
function fromPrice(prices: { range: string }[]): string {
  const first = prices?.[0]?.range ?? "";
  const match = first.match(/\$\s?[\d,]+/);
  return match ? match[0].replace(/\s/g, "") : "";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return pageMetadata(locale, "", t("title"), t("description"));
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent locale={locale} />;
}

function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const tp = useTranslations("TreatmentsPage");
  const cityKey = locale === "ru" ? "cityRu" : locale === "uz" ? "cityUz" : "city";

  return (
    <>
      {/* ═══════════ 1 · HERO ═══════════ */}
      <section className="bg-navy text-white">
        <div className="pad grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[clamp(44px,7.5vw,108px)] font-light leading-[1.02] tracking-[-0.015em] text-white">
              <span className="mask-line">
                <span>{t("Hero.title")}</span>
              </span>
            </h1>
            <p className="fade-late font-display mt-3 max-w-[24ch] text-[clamp(22px,2.8vw,36px)] font-light italic leading-tight text-white/60">
              {t("Hero.titleHighlight")}
            </p>
            <p className="fade-late mt-7 max-w-[52ch] text-[clamp(18px,1.4vw,19px)] leading-relaxed text-white/80">
              {t("Hero.subtitle")}
            </p>
            <div className="fade-late mt-9 flex flex-col items-start gap-3 sm:flex-row">
              <Link href="/consultation" className="btn btn-cta">
                {t("Hero.ctaPrimary")}
                <ArrowUpRight size={17} aria-hidden />
              </Link>
              <a
                href={whatsappLink(`MedTourUZ: ${SITE.url}/${locale}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <span className="text-[#25D366]" aria-hidden>●</span>
                {t("Hero.ctaWhatsApp")}
              </a>
            </div>
            <p className="fade-late mt-8 text-[15px] text-white/55">
              {t("Hero.trust1")} · {t("Hero.trust2")} · {t("Hero.trust3")}
            </p>
          </div>

          <div className="fade-late lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={hospitals[0].image}
                alt={`${hospitals[0].name}, ${hospitals[0][cityKey as "city"]}`}
                width={1280}
                height={853}
                priority
                className="h-full w-full object-cover"
              />
              <div className="glass-dark absolute inset-x-3 bottom-3 rounded-xl p-4 text-left">
                <p className="text-[15px] font-semibold text-white">
                  {hospitals[0].name}
                </p>
                <p className="mt-0.5 text-[14px] leading-snug text-white/70">
                  {hospitals[0][cityKey as "city"]} · {hospitals[0].accreditation}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pad grid grid-cols-2 gap-4 pb-16 md:grid-cols-4 md:gap-6 lg:pb-20">
          {([1, 2, 3, 4] as const).map((n) => (
            <Reveal key={n} delay={(n - 1) * 70}>
              <div className="tile-dark h-full rounded-2xl p-6">
                <p className="font-display text-[clamp(30px,3vw,40px)] font-light leading-none text-white">
                  {t(`Hero.stat${n}Value`)}
                </p>
                <p className="mt-2 max-w-[20ch] text-[14px] leading-snug text-white/60">
                  {t(`Hero.stat${n}Label`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ 2 · SPECIALTIES ═══════════ */}
      <section className="bg-parchment py-24 md:py-32">
        <div className="pad">
          <SectionHead title={t("Specialties.title")} subtitle={t("Specialties.subtitle")} />
          <div className="mt-12">
            {categoryKeys.map((key, i) => {
              const prices = tp.raw(`${key}.prices`) as { name: string; range: string }[];
              return (
                <Reveal key={key} delay={i * 60}>
                  <Link
                    href="/treatments"
                    className="row-glass group flex flex-col gap-3 rounded-xl px-4 py-6 md:flex-row md:items-center md:gap-8 md:px-5"
                  >
                    <div className="md:w-[34%]">
                      <h3 className="font-display text-[26px] font-normal leading-tight text-navy transition-colors group-hover:text-cta-dark">
                        {t(`Specialties.${key}.name`)}
                      </h3>
                    </div>
                    <p className="text-[16px] leading-relaxed text-body md:w-[38%]">
                      {t(`Specialties.${key}.desc`)}
                    </p>
                    <div className="flex items-center justify-between md:w-[28%] md:justify-end md:gap-8">
                      <span className="font-display text-[19px] font-light text-navy">
                        {t("TreatmentsPage.fromLabel")} {fromPrice(prices)}
                      </span>
                      <span className="link-arrow text-[14px] text-muted group-hover:text-cta-dark">
                        {t("Specialties.allTreatments")}
                        <ArrowRight size={15} aria-hidden />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ 3 · WHY US ═══════════ */}
      <section className="bg-parchment-subtle py-24 md:py-32">
        <div className="pad">
          <SectionHead title={t("WhyUs.title")} subtitle={t("WhyUs.subtitle")} />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {([1, 2, 3, 4, 5, 6] as const).map((n, i) => (
              <Reveal key={n} delay={(i % 3) * 70}>
                <div className="tile h-full rounded-2xl p-7">
                  <h3 className="font-display mt-3 text-[20px] font-medium leading-snug text-navy">
                    {t(`WhyUs.i${n}.title`)}
                  </h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-body">
                    {t(`WhyUs.i${n}.desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 4 · PROCESS ═══════════ */}
      <section className="bg-parchment py-24 md:py-32">
        <div className="pad">
          <SectionHead title={t("Process.title")} subtitle={t("Process.subtitle")} />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {([1, 2, 3, 4, 5, 6] as const).map((n, i) => (
              <Reveal key={n} delay={(i % 3) * 70}>
                <li className="tile h-full rounded-2xl p-7">
                  <p className="text-[15px] font-semibold text-muted">
                    {t(`Process.zone${Math.min(3, Math.ceil(n / 2))}`)}
                  </p>
                  <h3 className="font-display mt-1.5 text-[20px] font-medium leading-snug text-navy">
                    {t(`Process.step${n}.title`)}
                  </h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-body">
                    {t(`Process.step${n}.desc`)}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12">
            <Link href="/how-it-works" className="link-arrow">
              {t("Process.allSteps")}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 5 · HOSPITALS ═══════════ */}
      <section className="bg-navy py-24 text-white md:py-32">
        <div className="pad">
          <SectionHead
            dark
            title={t("HospitalsSection.title")}
            subtitle={t("HospitalsSection.subtitle")}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {hospitals.map((h, i) => (
              <Reveal key={h.slug} delay={(i % 4) * 70}>
                <div className="tile-dark group h-full rounded-2xl p-4">
                  <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl">
                    <Image
                      src={h.image}
                      alt={`${h.name}, ${h[cityKey as "city"]}`}
                      width={1280}
                      height={853}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="glass-dark absolute right-2 top-2 rounded-full px-3 py-1 text-[14px] text-white">
                      {h[cityKey as "city"]}
                    </span>
                  </div>
                  <p className="text-[14px] text-[#5eead4]">
                    {h.accreditation} · {h.beds} {t("Facts.colBeds").toLowerCase()}
                  </p>
                  <h3 className="font-display mt-1.5 text-[20px] font-normal leading-snug text-white">
                    {h.name}
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-white/65">
                    {t(`HospitalsSection.${h.summaryKey}`)}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-[14px] text-white/60">
                    <span>{t("HospitalsSection.factEstablished")} {h.established}</span>
                    <Link href="/hospitals" className="link-arrow !text-white/70 hover:!text-white">
                      {t("HospitalsSection.allHospitals")}
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6 · FACTS ═══════════ */}
      <section className="bg-parchment py-24 md:py-32">
        <div className="pad">
          <SectionHead title={t("Facts.title")} subtitle={t("Facts.subtitle")} />
          <Reveal delay={90}>
            <div className="mt-12 hidden overflow-x-auto md:block">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="text-[15px] text-muted">
                    <th className="py-3 pr-4 font-medium">{t("Facts.colYear")}</th>
                    <th className="py-3 pr-4 font-medium">{t("Facts.colHospital")}</th>
                    <th className="py-3 pr-4 font-medium">{t("Facts.colDetails")}</th>
                    <th className="py-3 text-right font-medium">{t("Facts.colBeds")}</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map((h) => (
                    <tr key={h.slug} className="border-t border-parchment-border" /* taste-skill-ignore: real table row */>
                      <td className="py-4 pr-4 font-display text-[20px] font-light tabular-nums text-navy">
                        {h.established}
                      </td>
                      <td className="py-4 pr-4 text-[16px] font-medium text-navy">{h.name}</td>
                      <td className="py-4 pr-4 text-[16px] text-body">
                        {h[cityKey as "city"]} · {h.accreditation}
                      </td>
                      <td className="py-4 text-right font-display text-[20px] font-light tabular-nums text-navy">
                        {h.beds}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:hidden">
              {hospitals.map((h) => (
                <div key={h.slug} className="tile rounded-2xl p-5">
                  <p className="font-display text-[26px] font-light tabular-nums text-navy">{h.established}</p>
                  <p className="mt-1 text-[16px] font-medium text-navy">{h.name}</p>
                  <p className="text-[15px] text-body">
                    {h[cityKey as "city"]} · {h.accreditation} · {h.beds} {t("Facts.colBeds").toLowerCase()}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 7 · DOCTORS ═══════════ */}
      <section className="bg-parchment-subtle py-24 md:py-32">
        <div className="pad">
          <SectionHead title={t("Doctors.title")} subtitle={t("Doctors.subtitle")} />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {doctors.map((d, i) => (
              <Reveal key={d.slug} delay={i * 80}>
                <div className="tile flex h-full flex-col gap-7 rounded-2xl p-7 md:flex-row md:items-start">
                  <div className="w-full shrink-0 overflow-hidden rounded-xl md:w-44">
                    <div className="relative aspect-[3/4] bg-parchment">
                      <Image
                        src={d.image}
                        alt={d.name}
                        width={960}
                        height={1440}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-[15px] font-semibold text-muted">
                      {d[locale === "ru" ? "roleRu" : locale === "uz" ? "roleUz" : "role"]}
                    </p>
                    <h3 className="font-display mt-1.5 text-[26px] font-normal leading-tight text-navy">
                      {d.name}
                    </h3>
                    <p className="mt-1 text-[15px] font-medium text-muted">{d.hospital}</p>
                    <p className="mt-4 flex-1 text-[16px] leading-relaxed text-body">
                      {t(`Doctors.${d.factsKey}.facts`)}
                    </p>
                    <div className="mt-5">
                      <Link href="/consultation" className="link-arrow !text-[14px]">
                        {t("Hero.ctaPrimary")}
                        <ArrowRight size={15} aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-[15px] text-muted">{t("Doctors.note")}</p>
        </div>
      </section>

      {/* ═══════════ 8 · TESTIMONIALS ═══════════ */}
      <section className="bg-parchment py-24 md:py-32">
        <div className="pad">
          <SectionHead title={t("Testimonials.title")} subtitle={t("Testimonials.subtitle")} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {([1, 2, 3] as const).map((i) => {
              const [name, city] = t(`Testimonials.t${i}.name`).split(",");
              return (
                <Reveal key={i} delay={(i - 1) * 80}>
                  <div className="tile flex h-full flex-col justify-between rounded-2xl p-7">
                    <blockquote className="font-display text-[19px] font-light italic leading-relaxed text-navy">
                      «{t(`Testimonials.t${i}.text`)}»
                    </blockquote>
                    <div className="mt-6">
                      <p className="text-[15px] font-semibold text-navy">{name}</p>
                      <p className="mt-0.5 text-[14px] text-muted">{city?.trim()}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-8 text-[15px] text-muted">{t("Testimonials.note")}</p>
        </div>
      </section>

      {/* ═══════════ 9 · FAQ ═══════════ */}
      <section className="bg-parchment-subtle py-24 md:py-32">
        <div className="pad grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-display text-[clamp(28px,3.4vw,44px)] font-light leading-[1.1] text-navy">
              {t("FAQ.title")}
            </h2>
            <p className="mt-5 max-w-[40ch] text-[16px] leading-relaxed text-body">
              {t("TreatmentsPage.priceNote")}
            </p>
            <Link href="/consultation" className="btn btn-quiet mt-7">
              {t("Hero.ctaPrimary")}
            </Link>
          </div>
          <div className="lg:col-span-8">
            {faqKeys.map((i) => (
              <details key={i} className="group row-glass rounded-xl px-4 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                  <h3 className="font-display pr-4 text-[20px] font-normal leading-snug text-navy">
                    {t(`FAQ.q${i}`)}
                  </h3>
                  <span
                    className="shrink-0 text-[20px] font-light text-muted transition-transform duration-200 group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-body">{t(`FAQ.a${i}`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 10 · CTA ═══════════ */}
      <section className="relative isolate overflow-hidden bg-navy py-24 text-white md:py-32">
        <Image
          src={hospitals[2].image}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-navy/75" aria-hidden />
        <div className="pad relative">
          <div className="glass-light mx-auto max-w-3xl rounded-3xl px-8 py-14 text-center sm:px-12">
            <h2 className="font-display mx-auto max-w-[20ch] text-[clamp(28px,3.4vw,44px)] font-light leading-tight text-navy">
              {t("CTA.title")}
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-relaxed text-body">
              {t("CTA.subtitle")}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink(`MedTourUZ: ${SITE.url}/${locale}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa w-full sm:w-auto"
              >
                <span aria-hidden>●</span>
                {t("Hero.ctaWhatsApp")}
              </a>
              <a href={`tel:${SITE.phone}`} className="btn btn-quiet w-full sm:w-auto">
                {SITE.phoneDisplay}
              </a>
            </div>
            <p className="mt-9 text-[15px] text-muted">{t("CTA.subtitle2")}</p>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({
  title,
  subtitle,
  dark = false,
}: {
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <Reveal>
      <div className="max-w-4xl">
        <h2
          className={`font-display text-[clamp(25px,3.4vw,44px)] font-light leading-[1.12] tracking-[-0.005em] ${
            dark ? "text-white" : "text-navy"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-4 max-w-[62ch] text-[17px] leading-relaxed ${dark ? "text-white/65" : "text-body"}`}>
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
}

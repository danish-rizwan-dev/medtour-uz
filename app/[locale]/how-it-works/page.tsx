import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HowItWorksPage" });
  return pageMetadata(locale, "/how-it-works", t("title"), t("subtitle"));
}

export default async function HowItWorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HowItWorksContent />;
}

function HowItWorksContent() {
  const t = useTranslations("HowItWorksPage");

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="pad py-16 md:py-24">
          <h1 className="font-display max-w-[24ch] text-[clamp(28px,4.4vw,56px)] font-light leading-[1.1] text-white">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-[58ch] text-[clamp(17px,1.4vw,19px)] leading-relaxed text-white/80">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-parchment py-20 md:py-28">
        <div className="pad">
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {([1, 2, 3, 4, 5, 6] as const).map((step, i) => (
              <Reveal key={step} delay={(i % 3) * 70}>
                <li className="tile h-full rounded-2xl p-7">
                  <p className="font-display text-[38px] font-light leading-none text-cta">{step}</p>
                  <h2 className="font-display mt-4 text-[20px] font-medium leading-snug text-navy">
                    {t(`step${step}.title`)}
                  </h2>
                  <p className="mt-3 text-[16px] leading-relaxed text-body">{t(`step${step}.desc`)}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-parchment-subtle py-20 md:py-28">
        <div className="pad">
          <h2 className="font-display max-w-[22ch] text-[clamp(28px,3.4vw,44px)] font-light leading-[1.12] text-navy">
            {t("includedTitle")}
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i, idx) => (
              <Reveal key={i} delay={(idx % 3) * 60}>
                <div className="tile flex h-full items-start gap-3 rounded-2xl p-6">
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-healing" aria-hidden />
                  <p className="text-[16px] font-medium leading-snug text-ink">{t(`incl${i}`)}</p>
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

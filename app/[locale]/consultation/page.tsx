import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { MessageCircle, Phone, Mail, Check } from "lucide-react";
import ConsultationForm from "@/components/consultation/ConsultationForm";
import { SITE, whatsappLink } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ConsultationPage" });
  return pageMetadata(locale, "/consultation", t("title"), t("subtitle"));
}

export default async function ConsultationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ConsultationContent />;
}

function ConsultationContent() {
  const t = useTranslations("ConsultationPage");

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

      {/* Form + contact cards */}
      <section className="bg-parchment-subtle py-20 md:py-28">
        <div className="pad grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ConsultationForm />
          </div>

          <aside className="flex flex-col gap-6 lg:col-span-2">
            <div className="tile rounded-2xl p-7">
              <h2 className="font-display text-[20px] font-medium text-navy">{t("waTitle")}</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-body">{t("waText")}</p>
              <a
                href={whatsappLink("MedTourUZ")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa mt-6 w-full"
              >
                <MessageCircle size={18} aria-hidden /> {t("waButton")}
              </a>
            </div>

            <div className="tile rounded-2xl p-7">
              <h2 className="font-display text-[20px] font-medium text-navy">{t("callTitle")}</h2>
              <a
                href={`tel:${SITE.phone}`}
                className="mt-3 flex items-center gap-3 text-[20px] font-semibold text-brand transition-colors hover:text-cta-dark"
              >
                <Phone size={19} aria-hidden /> {SITE.phoneDisplay}
              </a>
              <h2 className="font-display mt-6 text-[20px] font-medium text-navy">{t("emailTitle")}</h2>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-3 flex items-center gap-3 text-[16px] font-semibold text-brand transition-colors hover:text-cta-dark"
              >
                <Mail size={19} aria-hidden /> {SITE.email}
              </a>
            </div>

            <div className="rounded-2xl bg-parchment p-7">
              <p className="flex items-start gap-2 text-[15px] leading-relaxed text-body">
                <Check size={17} className="mt-0.5 shrink-0 text-healing" aria-hidden /> {t("note")}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

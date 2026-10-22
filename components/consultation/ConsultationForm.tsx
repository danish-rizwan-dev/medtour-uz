"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Send, MessageCircle, CheckCircle2, RotateCcw } from "lucide-react";
import { whatsappLink } from "@/lib/site";

const treatmentKeys = ["cardiology", "oncology", "orthopedics", "urology", "neurosurgery"] as const;

export default function ConsultationForm() {
  const t = useTranslations("ConsultationPage");
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const phone = String(form.get("phone") ?? "");
    const treatment = String(form.get("treatment") ?? "");
    const lang = String(form.get("lang") ?? locale);
    const message = String(form.get("message") ?? "");

    const waText = [
      `MedTourUZ: ${t("formTitle")}`,
      `${t("name")}: ${name}`,
      `${t("phone")}: ${phone}`,
      `${t("treatment")}: ${treatment}`,
      `${t("language")}: ${lang}`,
      message ? `${t("message")}: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLink(waText), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="tile rounded-2xl p-10 text-center">
        <CheckCircle2 size={40} className="mx-auto text-healing" aria-hidden />
        <h2 className="font-display mt-5 text-[26px] font-normal text-navy">{t("successTitle")}</h2>
        <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-body">{t("successText")}</p>
        <a
          href={whatsappLink("MedTourUZ")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-wa mt-7"
        >
          <MessageCircle size={18} aria-hidden /> {t("waButton")}
        </a>
        <div className="mt-4">
          <button
            onClick={() => setSubmitted(false)}
            className="link-arrow !text-[15px] !text-brand"
          >
            <RotateCcw size={15} aria-hidden /> {t("successAnother")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-7 sm:p-10"
    >
      <h2 className="font-display text-[26px] font-normal text-navy">{t("formTitle")}</h2>

      <div className="mt-7 grid gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1.5 block text-[15px] font-semibold text-ink">
            {t("name")} <span className="text-cta">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            className="field"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-[15px] font-semibold text-ink">
            {t("phone")} <span className="text-cta">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t("phonePlaceholder")}
            className="field"
          />
        </div>

        {/* Treatment */}
        <div>
          <label htmlFor="treatment" className="mb-1.5 block text-[15px] font-semibold text-ink">
            {t("treatment")}
          </label>
          <select id="treatment" name="treatment" defaultValue="" className="field">
            <option value="">{t("treatmentPlaceholder")}</option>
            {treatmentKeys.map((key) => (
              <option key={key} value={t(`treatments.${key}`)}>
                {t(`treatments.${key}`)}
              </option>
            ))}
            <option value={t("treatmentUnknown")}>{t("treatmentUnknown")}</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-1.5 block text-[15px] font-semibold text-ink">{t("message")}</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder={t("messagePlaceholder")}
            className="field resize-none"
          />
        </div>

        {/* Language preference */}
        <fieldset>
          <legend className="mb-2 block text-[15px] font-semibold text-ink">{t("language")}</legend>
          <div className="flex flex-wrap gap-2">
            {([
              { code: "ru", label: t("langRu") },
              { code: "uz", label: t("langUz") },
              { code: "en", label: t("langEn") },
            ] as const).map((opt) => (
              <label key={opt.code} className="cursor-pointer">
                <input
                  type="radio"
                  name="lang"
                  value={opt.code}
                  defaultChecked={opt.code === locale}
                  className="peer sr-only"
                />
                <span className="inline-block rounded-full border border-navy/15 bg-white px-4 py-2 text-[15px] font-medium text-body transition-[background-color,color,border-color] duration-300 peer-checked:border-transparent peer-checked:bg-navy peer-checked:text-white hover:border-navy/35 hover:bg-white/80 hover:backdrop-blur">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Submit */}
        <button type="submit" className="btn btn-cta mt-2 w-full">
          <Send size={18} aria-hidden /> {t("submit")}
        </button>

        <p className="text-[14px] leading-relaxed text-muted">{t("note")}</p>
      </div>
    </form>
  );
}

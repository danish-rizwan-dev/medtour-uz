"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { ChevronDown, Check } from "lucide-react";

const languages = [
  { code: "ru", name: "Русский", symbol: "RU", flag: "🇷🇺" },
  { code: "uz", name: "O'zbekcha", symbol: "UZ", flag: "🇺🇿" },
  { code: "en", name: "English", symbol: "EN", flag: "🇬🇧" },
];

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === locale) ?? languages[0];

  function onSelect(nextLocale: string) {
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        aria-label="Select language"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`flex items-center gap-1.5 rounded-full px-3 py-2 transition-[background-color,color] duration-300 ${
          isOpen ? "bg-white/90 text-ink" : "bg-white/60 text-body hover:bg-white/85"
        } ${isPending ? "cursor-wait opacity-50" : "cursor-pointer"}`}
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="text-[14px] font-bold uppercase tracking-tight">{current.symbol}</span>
        <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className="glass-light absolute right-0 z-[100] mt-2 w-[190px] overflow-hidden rounded-2xl !bg-white/80 !shadow-[0_24px_48px_-24px_rgba(11,30,54,0.4)]" /* taste-skill-ignore: real dropdown menu */
        >
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onSelect(lang.code)}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-[15px] font-medium transition-colors ${
                  locale === lang.code
                    ? "bg-brand-light text-brand"
                    : "text-body hover:bg-white/80 hover:text-ink"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span> {lang.name}
                </span>
                {locale === lang.code && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

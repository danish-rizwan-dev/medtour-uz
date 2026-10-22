"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Menu, X, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { SITE, whatsappLink } from "@/lib/site";

const navItems = [
  { href: "/", key: "home" },
  { href: "/treatments", key: "treatments" },
  { href: "/hospitals", key: "hospitals" },
  { href: "/how-it-works", key: "howItWorks" },
] as const;

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-parchment/72 backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_28px_rgba(11,30,54,0.07)]" /* taste-skill-ignore: sticky bar */>
      <div className="pad flex min-h-16 items-center justify-between gap-6">
        {/* wordmark at the left margin */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setIsOpen(false)}
        >
          <Logo className="h-8 w-8" />
          <span className="flex flex-col leading-tight">
            <span className="text-[17px] font-bold tracking-tight text-ink">
              MedTour <span className="text-brand">Uzbekistan</span>
            </span>
            <span className="hidden text-[14px] font-medium text-muted sm:block">
              Treatment in India
            </span>
          </span>
        </Link>

        {/* links, one action at the right margin */}
        <div className="flex items-center gap-2">
          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link key={item.key} href={item.href} className="nav-link">
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2.5">
            <LanguageSwitcher />
            <Link href="/consultation" className="btn btn-cta hidden !min-h-10 !px-5 !py-2 !text-[14px] !font-bold md:inline-flex">
              {t("cta")}
            </Link>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink backdrop-blur transition-colors hover:bg-white lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t("closeMenu") : t("menu")}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav
          aria-label="Mobile navigation"
          className="bg-parchment/95 px-5 pb-6 pt-2 backdrop-blur-xl lg:hidden"
        >
          <div className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="nav-link !rounded-xl !px-3 !py-3 !text-[17px]"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/consultation"
              onClick={() => setIsOpen(false)}
              className="btn btn-cta mt-3 w-full"
            >
              {t("cta")}
            </Link>
            <a
              href={whatsappLink(`MedTourUZ: ${SITE.url}/${locale}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa mt-2 w-full"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

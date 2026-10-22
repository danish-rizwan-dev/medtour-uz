import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

const treatments = ["cardiology", "oncology", "orthopedics", "urology", "neurosurgery"] as const;

export default function Footer() {
  const t = useTranslations("Footer");
  const tp = useTranslations("TreatmentsPage");
  const n = useTranslations("Navbar");

  return (
    <footer className="bg-navy text-white">
      {/* the name returns at full width */}
      <div className="pad pt-20 pb-14">
        <p className="font-display text-[clamp(38px,7vw,100px)] font-light leading-none tracking-[-0.02em] text-white">
          MedTour Uzbekistan
        </p>
      </div>

      <div className="pad grid gap-12 pb-16 lg:grid-cols-12 lg:gap-16">
        {/* tagline */}
        <p className="max-w-[42ch] text-[16px] leading-relaxed text-white/70 lg:col-span-4">{t("tagline")}</p>

        <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3 lg:gap-10">
          {/* sections */}
          <nav aria-label={t("linksTitle")}>
            <h3 className="text-[16px] font-semibold text-white">{t("linksTitle")}</h3>
            <ul className="mt-4 space-y-1 text-[16px] text-white/70">
              {(
                [
                  ["/", n("home")],
                  ["/treatments", n("treatments")],
                  ["/hospitals", n("hospitals")],
                  ["/how-it-works", n("howItWorks")],
                  ["/consultation", n("consultation")],
                ] as const
              ).map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-block rounded-full px-3 -mx-3 py-1 transition-[background-color,color,backdrop-filter] duration-300 hover:bg-white/10 hover:text-white hover:backdrop-blur"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* treatments */}
          <nav aria-label={t("treatmentsTitle")}>
            <h3 className="text-[16px] font-semibold text-white">{t("treatmentsTitle")}</h3>
            <ul className="mt-4 space-y-1 text-[16px] text-white/70">
              {treatments.map((key) => (
                <li key={key}>
                  <Link
                    href="/treatments"
                    className="inline-block rounded-full px-3 -mx-3 py-1 transition-[background-color,color,backdrop-filter] duration-300 hover:bg-white/10 hover:text-white hover:backdrop-blur"
                  >
                    {tp(`${key}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <h3 className="text-[16px] font-semibold text-white">{t("contactTitle")}</h3>
            <ul className="mt-4 space-y-3 text-[16px] text-white/70">
              <li>
                <a
                  href={whatsappLink("MedTourUZ")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <MessageCircle size={16} className="text-wa" aria-hidden /> WhatsApp: {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Phone size={16} className="text-white/70" aria-hidden /> {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <Mail size={16} className="text-white/70" aria-hidden /> {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={16} className="text-white/70" aria-hidden /> Tashkent, Uzbekistan · Delhi, India
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* close */}
      <div className="pad space-y-3 pb-12">
        <p className="max-w-[80ch] text-[14px] leading-relaxed text-white/55">{t("disclaimer")}</p>
        <div className="flex flex-col gap-1 text-[14px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. {t("rights")}</p>
          <p>{t("photoCredits")}</p>
        </div>
      </div>
    </footer>
  );
}

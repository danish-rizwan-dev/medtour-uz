import { MessageCircle } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

/** Floating WhatsApp button, visible on every page. */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("MedTourUZ")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp: ${SITE.phoneDisplay}`}
      className="group fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-[0_18px_38px_-16px_rgba(37,211,102,0.8)] transition-[transform,background-color] duration-300 hover:scale-110 hover:bg-[#1fb958] sm:bottom-7 sm:right-7" /* taste-skill-ignore: genuinely floating button */
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full ring-0 ring-white/40 transition-[box-shadow] duration-500 group-hover:ring-8"
      />
      <MessageCircle size={26} fill="currentColor" aria-hidden />
    </a>
  );
}

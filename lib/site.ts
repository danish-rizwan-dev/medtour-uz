/**
 * Central place for site-wide contact details.
 *
 * ⚠️ REPLACE the placeholder values below with your real WhatsApp number,
 * phone number and email before going live.
 */
export const SITE = {
  name: "MedTour Uzbekistan",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://medtouruz.com",

  /** WhatsApp number in international format WITHOUT "+", e.g. "998901234567" */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "919667599785",

  /** Phone number shown on the site */
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 96675 99785",

  /** Phone number used in tel: links (digits only) */
  phone: process.env.NEXT_PUBLIC_PHONE || "919667599785",

  email: process.env.NEXT_PUBLIC_EMAIL || "info@medtouruz.com",
} as const;

/** Opens WhatsApp with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // Russian is the primary language for patients from Uzbekistan,
  // Uzbek (Latin script) and English are also supported.
  locales: ["ru", "uz", "en"],
  defaultLocale: "ru",
});

// Lightweight wrappers around Next.js' navigation APIs
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

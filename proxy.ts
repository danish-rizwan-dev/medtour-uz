import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Locale routing for medtouruz.com/{ru,uz,en}/...
 * Next.js 16 renamed `middleware.ts` → `proxy.ts`.
 * next-intl's middleware works here unchanged (default export).
 *
 * - /        → redirects to /ru (Russian = primary audience)
 * - /uz/...  → Uzbek (Latin script), /en/... → English
 * - Sets `x-default`-friendly locale detection via Accept-Language
 */
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, static files and metadata routes
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

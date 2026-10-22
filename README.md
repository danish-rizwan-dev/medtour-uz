# MedTour Uzbekistan 🇺🇿🇮🇳

Medical tourism website targeting patients from **Uzbekistan** who travel to **India** for treatment.

**Domain:** [medtouruz.com](https://medtouruz.com) · **Languages:** Russian (default) · Uzbek · English

Built with **Next.js 16** (App Router) + **Tailwind CSS 4** + **next-intl** — every page is pre-rendered as static HTML for maximum SEO performance.

---

## 🚀 Quick start

```bash
npm install
npm run dev      # development → http://localhost:3000/ru
npm run build    # production build
npm start        # serve the production build
```

The root URL `/` detects the visitor's language (Accept-Language header) and redirects to `/ru`, `/uz` or `/en`.

## 📁 Project structure

```
app/
  page.tsx                 → language detection redirect
  sitemap.ts robots.ts     → SEO files (all 15 URLs + hreflang)
  [locale]/                → ru | uz | en
    page.tsx               → Home (hero, specialties, why us, process, hospitals, doctors, FAQ)
    treatments/            → 5 specialties with procedures + indicative prices
    hospitals/             → 4 verified partner hospitals with photos & facts
    how-it-works/          → 6-step process + what's included
    consultation/          → request form + WhatsApp + contacts
messages/                  → ru.json · uz.json · en.json (all site text)
lib/
  data.ts                  → hospitals & doctors (facts verified via Wikipedia)
  site.ts                  → ⚠️ contact details — EDIT BEFORE LAUNCH
  metadata.ts              → per-page canonical + hreflang helper
  seo.config.ts            → site URL, default SEO texts
components/                → layout (Navbar, Footer, switcher, JsonLd) & sections
public/images/             → hospital & doctor photos (Wikimedia Commons, CC BY-SA)
```

## ✅ SEO checklist (already configured)

- ✅ Static HTML for all 15 pages (100/100 Lighthouse SEO achievable)
- ✅ Per-page **canonical** + **hreflang** (`ru`, `uz`, `en`, `x-default` → ru)
- ✅ `sitemap.xml` with language alternates · `robots.txt` · `manifest.webmanifest`
- ✅ **JSON-LD** structured data: `MedicalOrganization`, `WebSite`, `FAQPage`
- ✅ Semantic HTML, one `h1` per page, image `alt` texts, mobile-first
- ✅ Russian default — the primary search language in Uzbekistan
- ℹ️ After launch: submit sitemap to **Google Search Console** AND **Yandex.Webmaster** (≈21% of Uzbek searches run on Yandex), install Yandex.Metrica

## ⚠️ Before going live — replace placeholders

1. **`lib/site.ts` or `.env.local`** — real WhatsApp number, phone, email
2. **`messages/*.json` → `Testimonials`** — replace sample feedback with real patient reviews
3. **Prices** (`messages/*.json` → `TreatmentsPage`) — verify indicative ranges
4. **Photos** — current hospital/doctor photos are free-licensed (Wikimedia Commons, CC BY-SA, credited in the footer). Replace with your own or partner-supplied images when available.

## 🎨 Design tokens

| Role | Color |
|---|---|
| Primary (trust/medicine) | `#0A6EBD` blue |
| Deep sections | `#0F2C57` navy |
| Health/growth | `#1EB53A` green |
| CTA buttons | `#FF6B35` orange |
| WhatsApp | `#25D366` |

## 🌐 Deployment

Works on any Node host (Vercel, VPS, etc.). Set the `NEXT_PUBLIC_*` variables from `.env.local` in your hosting dashboard. After deploying, point DNS for `medtouruz.com` (+ `www`) to the host.

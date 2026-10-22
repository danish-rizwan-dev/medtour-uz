# Stitch Design Idea Prompt — MedTour Uzbekistan

Copy the block below and paste it into Google Stitch (or any AI UI designer).

---

## 🎨 Design brief

**Product:** "MedTour Uzbekistan" — a medical tourism website that helps patients from
Uzbekistan arrange treatment in Indian hospitals. Trilingual: Russian (default),
Uzbek (Latin script), English. Domain: medtouruz.com. 5 pages: Home, Treatments,
Hospitals, How It Works, Free Consultation (lead form → WhatsApp).

**Audience:** patients and their families in Uzbekistan, ages 35–65, comparing treatment
abroad. They are anxious, price-sensitive, and need to feel trust and clarity. UI must be
calm, professional, and readable — like a reputable clinic, not a startup landing page.

## Brand & color tokens

| Role | Hex | Usage |
|---|---|---|
| Trust blue | `#0A6EBD` | links, icons, secondary buttons, borders |
| Deep navy | `#0F2C57` | heroes, footer, dark section backgrounds |
| Dark blue | `#0B3C6E` | hovers on navy, secondary dark surfaces |
| Light blue tint | `#E8F2FC` | icon chips, soft backgrounds |
| Pale blue tint | `#F4F8FD` | alternating section backgrounds |
| Healing green | `#1EB53A` | success, checkmarks, "verified" badges |
| Dark green | `#158F2D` | green text on light backgrounds |
| CTA orange | `#FF6B35` | THE call-to-action color — primary buttons only |
| Dark orange | `#E85A26` | orange hover state |
| WhatsApp green | `#25D366` | WhatsApp button only |
| Ink | `#16283F` | headings |
| Body text | `#4A5A6E` | paragraphs |
| Page background | `#FFFFFF` | body |

**Rule:** orange is used ONLY for the main action button on a screen. Everything else is
blue, green, ink, or neutral gray.

## Typography

Single family: **Montserrat** (Google Fonts), weights 400/600/700/800.
- H1: 48–60px, extrabold (800), tight tracking, white on navy hero
- H2: 30–36px, extrabold, ink `#16283F`
- Card titles: 17–18px, bold
- Body: 14–16px, regular, line-height 1.7, color `#4A5A6E`
- No serif fonts, no second family, no ALL-CAPS paragraphs (caps only for tiny labels)

## Style direction — "clean medical-corporate"

- **Solid color blocks.** Heroes and CTA bands are one flat solid color (deep navy
  `#0F2C57`). No gradients anywhere — especially no gradient text.
- **NO glassmorphism.** No backdrop-blur panels, no translucent floating cards.
- **NO glow shadows.** No colored box-shadows (no blue/orange halos). Cards use a light
  neutral border (`1px #E5E7EB`) or a very subtle gray shadow. Buttons change color on
  hover, never scale up or glow.
- **NO decorative patterns.** No dot grids, no floating blobs, no 3D orbs.
- Generous whitespace: sections have ~96px vertical padding on desktop, 64px mobile.
- Cards: rounded-2xl (16px radius), white on tinted background, border or whisper shadow.
- Buttons: rounded-full pills, 14–16px bold label, flat fill.
- Icons: Lucide line icons, 22–24px, inside a tinted rounded square chip
  (e.g. blue icon on `#E8F2FC`).
- Photos: real hospital buildings and doctor portraits, rounded corners, dark caption
  bar at the bottom of hero images. Subtle image zoom on hover is fine.
- Mobile-first, responsive grid: 1 column mobile → 2 → 3/4 columns desktop.

## Pages & sections

**Home:** hero (solid navy, left: badge + H1 + subtitle + orange CTA + 3 trust bullets;
right: hospital photo with caption) → treatment specialties (5 cards + "all" card) →
why us (6 cards, green icon chips, on pale blue) → how it works (6 numbered steps) →
partner hospitals (4 photo cards on navy section) → featured doctors (2 portrait cards) →
patient testimonials (3 quote cards with orange stars) → FAQ (6 accordion items) →
final CTA band (solid navy, centered, orange button).

**Treatments:** hero + list of ~14 treatment categories (icon, title, description,
indicative price "from $X", link) + price-disclaimer note.

**Hospitals:** hero + 4 hospital cards (photo, name, city, year founded, bed count,
accreditation badges, link) + 2 famous doctor cards.

**How It Works:** hero + vertical 6-step timeline (numbered blue circles, connected line,
title + description per step) + CTA band.

**Consultation:** hero + intro + free-consultation benefit checklist (green checks) +
contact form (name, phone, treatment select, message; submit button opens WhatsApp with
prefilled text) + WhatsApp promo card + contacts.

**Shared:** sticky white navbar (logo left; Home/Treatments/Hospitals/How It Works links;
RU/UZ/EN switcher; orange "Free consultation" pill right) — footer on deep navy
(logo, quick links, languages, disclaimer "site is informational, not medical advice",
photo credits line).

**Content note:** real verified facts — Indraprastha Apollo Hospitals (1995, 695 beds),
Fortis Noida (2004, 400+ beds), Max Saket New Delhi (2006, 539 beds, JCI/NABH),
AIIMS Delhi (1956, 3600+ beds), Dr. Naresh Trehan, Dr. Ramakanta Panda.
Trust signals everywhere: "free consultation", "no payment before hospital confirmation",
"Russian-speaking coordinator", "visa & tickets help".

# Auto Moj — Current Site State & Knowledge Base
> **Document Version:** 1.0.0  
> **Last Updated:** September 2026  
> **Purpose:** Internal persistent memory & state reference for Auto Moj Accident Repair web application.

---

## 1. Executive Summary & Brand Identity

* **Trading Name:** Auto Moj Accident Repair (Short: `Auto Moj`)
* **Core Positioning:** Authentic, high-craft independent accident repair & bodyshop based in Watford, serving Watford and North West London. Shifted away from hyperbolic "atelier" luxury claims to grounded, legally sound craftsmanship (hand panel beating, PDR, oven paint, insurer coordination).
* **Official NAP (Name, Address, Phone):**
  * **Phone:** `020 7123 6946` (E.164: `+442071236946`)
  * **Email:** `info@automoj.co.uk`
  * **Address:** Advanced Specialist Logistics, Bushey & Oxhey Railway Yard, Pinner Road, Watford, WD19 4EA
  * **Canonical URL:** `https://automoj.co.uk` (or `NEXT_PUBLIC_SITE_URL`)
* **Single Source of Truth:** `src/lib/site.ts` (`SITE` object). All pages (contact, footer, metadata, schema.org) must consume data directly from this file.

---

## 2. Core Architecture & Tech Stack

* **Framework:** Next.js 15 (App Router, Turbopack, React 19)
* **Styling:** Tailwind CSS, Lucide React icons, Dark theme palette (`#080808` background, `#C5A880` gold accents, `#EDEDED` text).
* **Database & ORM:** Prisma ORM with dynamic client loader (`src/lib/prisma.ts`) so builds never fail if `npx prisma generate` has not run yet.
* **State & Multi-language:**
  * Bilingual support currently active via `src/context/LanguageContext.tsx` (`EN` and `FA` / Persian with `vazirmatn` font).
  * **Planned Pre-Launch Step:** Removal of Persian version to launch English-only for UK market compliance.

---

## 3. Key Recent Changes & Enhancements

### A. Centralized Site Configuration (`src/lib/site.ts`)
* Unified business details, working hours, postal formatting, Google Maps query generators, retention durations, and legal registration status.
* WhatsApp integration logic (`NEXT_PUBLIC_WHATSAPP_NUMBER`) handling disabled state (`"off"`), blank fallbacks, and number sanitization.

### B. SEO & Schema.org Local Business Engine
* **Structured Data:** `src/components/seo/LocalBusinessSchema.tsx` injects schema.org `AutoBodyShop` with exact NAP, opening hours, GBP currency, services offered, and map links. Excludes guessed lat/long and unverified reviews (strictly DMCC Act 2024 compliant).
* **Metadata:** Root layout (`src/app/layout.tsx`) updated with localized description and OpenGraph metadata targeting Watford & North West London.
* **Robots & Sitemap:**
  * `src/app/robots.ts`: Allows public pages, blocks `/admin/` and `/api/` (backed by `X-Robots-Tag: noindex` in `next.config.ts`).
  * `src/app/sitemap.ts`: Dynamic sitemap generated with strict exclusion of 307 redirect routes.

### C. Admin Dashboard & Back-Office Infrastructure
* **Elimination of Mock Data:** Removed fake stats ("1,248 leads", "£24.5k").
* **Safe Fallbacks:** `src/components/admin/NotConfigured.tsx` gracefully guides staff if `DATABASE_URL` is missing.
* **Quote Management:**
  * `/admin/quotes`: Comprehensive quote enquiries table with status pills and filter tabs.
  * `/admin/quotes/[id]`: Full quote detail view showing customer data, vehicle registration, preferred contact method, customer description, Server Actions for updating status (`QUOTE_STATUSES`), and internal staff notes (`AdminNote`).
* **Customer Registry:**
  * `/admin/customers`: Real customer list with linked vehicles, quote histories, and contact links.
* **Launch Readiness Tracker:**
  * `src/lib/launch-checks.ts` & `src/components/admin/LaunchReadiness.tsx`: Live dashboard widget monitoring DB connection, Resend lead notifications, Companies House registration details, WhatsApp line validity, phone line verification, and legal solicitor sign-off.

### D. Legal & UK Compliance Pages
* **Legal Shell:** `src/components/layout/LegalPage.tsx` providing clean, readable typography for statutory notices.
* **Privacy Policy (`/privacy-policy`):** UK GDPR & DPA 2018 compliant, explicitly stating 12-month retention for quotes and 6-year retention for job records (limitation period under Limitation Act 1980).
* **Terms & Conditions (`/terms-and-conditions`):** Consumer Rights Act 2015 compliant, covering quotes, authorisations, storage fees, lien rights, and dispute mechanisms.
* **Footer Overhaul (`src/components/layout/Footer.tsx`):** Removed unconsented placeholder newsletter input (PECR compliant); added workshop address, operating hours, direct phone/email, and conditional Companies Act 2006 disclosures (`hasLegalDetails()`).

### E. Service Catalog Rationalization (`src/lib/services.ts`)
Streamlined down to 4 clearly differentiated, genuine offerings:
1. `accident-repair` — Accident Repair & Bodyshop
2. `panel-beating` — Traditional Hand Panel Beating & Metal Shaping
3. `dent-repair` — Precision PDR Dent Removal
4. `car-paint` — Paint & Refinishing (in-house colour matching & low-bake spray oven)

### F. Routing & Redirect Strategy (`next.config.ts`)
* `307 Temporary Redirects` applied to:
  * `/before-after` & `/restorations` ➔ `/services` (under preparation)
  * `/blog` & `/blog/:slug` ➔ `/services` (offline until unique real articles and verified pricing replace placeholder content)
* Security headers configured (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Robots-Tag: noindex` for admin/API).

---

## 4. Current File Map & Key Modules

| Module / Path | Description |
| :--- | :--- |
| `src/lib/site.ts` | Single source of truth for NAP, legal entity, hours, retention, WhatsApp |
| `src/lib/services.ts` | Complete catalog of 4 active services with EN/FA copy |
| `src/lib/prisma.ts` | Safe dynamic Prisma client singleton with loose runtime fallbacks |
| `src/lib/admin-data.ts` | Server-only data queries and Server Actions for admin dashboard |
| `src/lib/launch-checks.ts` | Launch readiness rules and verification logic |
| `src/components/seo/LocalBusinessSchema.tsx` | Schema.org `AutoBodyShop` JSON-LD generator |
| `src/components/layout/LegalPage.tsx` | Standard layout wrapper for legal policies |
| `src/components/admin/LaunchReadiness.tsx` | Admin UI checklist component |
| `src/components/admin/NotConfigured.tsx` | Database setup guide for admin pages |
| `src/components/admin/StatusBadge.tsx` | Color-coded status badge for quotes |
| `src/app/admin/(dashboard)/quotes/` | Quotes index and individual quote detail manager |
| `src/app/admin/(dashboard)/customers/`| Customer and vehicle directory |
| `src/app/privacy-policy/page.tsx` | UK GDPR privacy notice |
| `src/app/terms-and-conditions/page.tsx`| UK consumer terms and workshop conditions |
| `src/app/robots.ts` & `sitemap.ts` | Search engine crawlers and indexing maps |

---

## 5. Outstanding Items Before Production Launch

1. **Database Connection:** Supply production PostgreSQL `DATABASE_URL` and execute `npx prisma db push`.
2. **Email Notifications:** Supply `RESEND_API_KEY`, `LEAD_NOTIFY_FROM`, and `LEAD_NOTIFY_TO`.
3. **Companies House Registration:** Update `SITE.legal` in `src/lib/site.ts` with registered company name, company number, and registered office.
4. **WhatsApp Business Verification:** Verify voice activation of `020 7123 6946` on WhatsApp Business app or supply dedicated mobile number.
5. **Persian Localization Sunset:** Remove `LanguageContext`, bilingual toggles, and RTL assets as the final pre-launch deployment step.
6. **Legal Review:** Final sign-off by UK commercial solicitor on terms and service copy.

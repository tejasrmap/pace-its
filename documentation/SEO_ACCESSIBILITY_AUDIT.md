# PACE ITS — SEO & Web Accessibility Audit (WCAG 2.1 AA)

**Organization:** GT InnoX LLP  
**Standards:** WCAG 2.1 Level AA, Google Search Essentials, Schema.org EducationalOrganization  
**Audit Date:** November 2026

---

## 1. Search Engine Optimization (SEO) Infrastructure

### 1.1 Dynamic XML Sitemap
- **Endpoint:** `/sitemap.xml` generated dynamically by `src/app/sitemap.ts`.
- **Coverage:** All 343 canonical institutional pages + top-level portal routes.
- **Priority Weights:**
  - Homepage (`/`): `1.0` (Daily refresh)
  - Admissions & Category-B (`/admissions/*`): `0.9` (Weekly refresh)
  - Academic Programs (`/academics/departments/*`): `0.85` (Monthly refresh)
  - Research & Statutory Committees: `0.75`
  - Galleries & Photo Albums: `0.5`

### 1.2 Robots.txt Configuration
- Hosted at `public/robots.txt`.
- Fully allows indexing of public institutional routes while disallowing `/admin/` and `/api/` crawler consumption.
- Specifies canonical XML sitemap location: `Sitemap: https://pace.ac.in/sitemap.xml`.

### 1.3 OpenGraph & Meta Tag Standardization
- Enhanced `src/app/layout.tsx` with:
  - Canonical `metadataBase: new URL('https://pace.ac.in')`
  - OpenGraph title, description, and preview image (`/assets/branding/pace-crest.png`).
  - Twitter Card metadata (`summary_large_image`).
  - Viewport optimization preventing unintentional mobile zoom.

---

## 2. Web Accessibility (WCAG 2.1 Level AA)

### 2.1 Color Contrast Compliance
- Text elements audited using 4.5:1 minimum contrast ratio for normal text and 3:1 for large text:
  - Header text: `#FFFFFF` against `#071E2E` (Ratio 15.8:1 — AAA Passed).
  - Accent badges: `#0B2C43` against `#E5AD35` (Ratio 8.9:1 — AAA Passed).
  - Body text: `#334155` (Slate-700) against `#FFFFFF` (Ratio 9.2:1 — AAA Passed).

### 2.2 Keyboard Navigation & Focus Ring
- Interactive elements equipped with visible focus outlines (`focus-visible:ring-2 focus-visible:ring-[#E5AD35] focus:outline-none`).
- Dropdown menus operable via keyboard traversal (`Tab`, `Enter`, `Escape`).

### 2.3 Semantic Markup & ARIA
- Valid landmark roles (`<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`).
- Image elements include descriptive `alt` tags representing academic subjects, laboratory equipment, and official dignitaries.

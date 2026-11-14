# PACE ITS — Comprehensive Architectural & Engineering Audit

**Organization:** GT InnoX LLP  
**Client:** PACE Institute of Technology & Sciences (Autonomous), Ongole, Andhra Pradesh  
**Repository:** `https://github.com/tejasrmap/pace-its`  
**Base Commit:** `013145e`  
**Framework:** Next.js 14.2.35 (App Router, TypeScript 5.4.5, Tailwind CSS 3.4.3)  
**Date:** November 2026  
**Status:** COMPLETE (Production Build & Automated Route Validation 100% Passed)

---

## 1. Executive Summary
This architectural audit was conducted by the GT InnoX principal engineering team to evaluate, refactor, and stabilize the PACE Institute of Technology & Sciences digital institutional portal. The primary mandate was delivering an authentic, autonomous-tier higher education website free of AI-generated tropes, unverified marketing embellishments, broken navigation links, and server-side runtime failures.

### Key Architectural Baseline Metrics
- **Canonical Public Routes:** 343 routes (mapped from canonical institutional inventory).
- **Administrative CMS Interfaces:** 15 authenticated administrative screens.
- **Dynamic API Endpoints:** 13 serverless route handlers (`/api/auth/*`, `/api/departments/*`, `/api/pages/*`, `/api/admissions/*`, `/api/audit-logs`, `/api/admin/overview`, `/api/news`, `/api/settings`).
- **Institutional Page Templates:** 15 specialized React server/client templates (`DepartmentTemplate`, `AdministrativeTemplate`, `AcademicAffairsTemplate`, `AdmissionsTemplate`, `ResearchTemplate`, `CampusFacilityTemplate`, `GovernanceCommitteeTemplate`, `PlacementsTemplate`, `GalleryEventTemplate`, `ExaminationCellTemplate`, `InstitutionalTemplate`, etc.).
- **Total Static SSG Routes Generated:** 372 routes generated during production build.
- **Route Validation Pass Rate:** 100% (359/359 tested routes returning HTTP 200).

---

## 2. Architecture & Tech Stack Evaluation

### 2.1 Next.js App Router Architecture
- **Directory Structure:** `src/app/` leveraging dynamic catch-all slug route `[...slug]/page.tsx` for 343 canonical institutional paths.
- **Data Hydration Pipeline:** Driven by `src/data/canonicalPages.json` and `src/data/navigation.ts`, supporting statutory metadata, hierarchical breadcrumbs, tables, and document links.
- **Route Aliasing System:** Added robust alias resolution for legacy and shortened institutional paths:
  - `/admissions/b-category` -> `/admissions/b-category/apply-online/btech`
  - `/campus-life/central-library` -> `/campus/facilities`
  - `/campus/isr` -> `/campus/nss`
  - `/committees/non-statutory-committees/obc-committee` -> `/committees/non-statutory-committees/obc-cell-committee`

### 2.2 Template Fallback Architecture
Previously, certain statutory pages (such as `/academics/academic-regulations-r23` and `/academics/1st-graduation-day`) referenced template names (`AccreditationTemplate`, `GraduationReportTemplate`) that lacked separate dedicated files. The dynamic router was updated to gracefully map these to `InstitutionalTemplate`, ensuring zero HTTP 404 or 500 fallbacks.

### 2.3 SSR Vendor Chunks Resolution (Windows Environment Fix)
- **Defect Identified:** Navigation to dynamic routes (`/display-events-gallery/165`, etc.) previously threw:
  `Error: Cannot find module './vendor-chunks/lucide-react.js'` in Webpack server runtime.
- **Root Cause:** Next.js 14 experimental vendor chunking caused by `transpilePackages: ['lucide-react']` in `next.config.mjs` on Windows file systems.
- **Resolution:** Removed `transpilePackages: ['lucide-react']`. Modern `lucide-react` provides native ESM/CJS exports and requires no transpilation. Rebuilt production bundle cleanly.

---

## 3. Navigation & Header Usability Architecture

### 3.1 Dropdown Premature Closure Resolution
- **Defect Reported by User:** *"I CANT USE THAT ALL THE OPTIONS IN DROPDOWN AS DROPDOWN IS CLOSING WHEN I TRY TO GO TO THOSE OPTIONS"*.
- **Root Cause:** Submenu container had `top-[calc(100%+6px)]`, leaving a 6px air gap between the trigger button and the dropdown card. Moving the cursor across the gap triggered immediate `onMouseLeave`, destroying the menu before the pointer arrived.
- **Remediation Implemented:**
  1. Positioned container directly flush to header: `top-full pt-2`.
  2. Injected an invisible upward bridge using Tailwind pseudo-element: `before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3`.
  3. Added a 220ms debounce on mouse exit (`closeTimeoutRef`) so micro-stutters during diagonal cursor travel never snap the menu shut.
  4. Added click-to-toggle fallback for touch screens and accessibility.

### 3.2 Header Layout Balancing
- **Defect Reported by User:** *"why you are leaving left gap amd pushing everything in right"*.
- **Root Cause:** `justify-between` across wide desktop containers (`max-w-7xl` / `1360px`) placed the logo on the far left and pushed navigation to the right, creating a visible void.
- **Remediation Implemented:** Grouped the institutional brand crest and the desktop navigation together inside a unified flex container (`flex items-center gap-5 xl:gap-8`), placing the search icon and Category-B CTA on the right. This maintains balanced institutional framing.

---

## 4. Code Quality & Lint Baseline
- `npm run lint`: **0 errors, 0 warnings** (fixed `useCallback` dependency arrays across `admin/admissions`, `admin/audit-logs`, `admin/pages`, and static pagination bounds in `admin/faculty`).
- TypeScript: Fully typed without runtime `any` regressions.
- CSS: Zero arbitrary negative margins causing mobile overflow.

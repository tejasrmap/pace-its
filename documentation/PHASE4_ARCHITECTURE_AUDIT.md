# PACE ITS — Phase 4 Backend, Database & Admin Architecture Audit

**Organization:** GT InnoX LLP  
**Client Project:** PACE Institute of Technology & Sciences  
**Website:** https://pace.ac.in/  
**Audit Baseline:** Next.js 14.2.35 frontend with 346 pre-rendered static routes (Phases 1, 2, 3 Complete)  
**Date:** 2026-11-14  

---

## 1. Existing System Inspection

1. **Framework & Dependencies:**
   - Next.js: `14.2.35` (App Router) — Stable, performant, supports static generation, dynamic server functions, and edge/node runtime.
   - React & React-DOM: `18.3.1`
   - Styling: Tailwind CSS `3.4.19`, custom Flame University design tokens (`#073B60`, `#052D49`, `#E9AC21`).
   - Animation: Framer Motion `11.18.2`.
   - Icons: Lucide React `0.460.0`.
   - Utility: `clsx`, `tailwind-merge`.
2. **Routing Architecture:**
   - `src/app/page.tsx`: Complete 24-section institutional homepage.
   - `src/app/[...slug]/page.tsx`: Universal dynamic catch-all route pre-rendering all 343 canonical routes via `generateStaticParams()`.
   - Specialized Templates:
     - `DepartmentTemplate.tsx`: All 13 Engineering & PG depts + 7 Polytechnic depts with tabbed navigation.
     - `AdminProfileTemplate.tsx`: Executive messages and biographies.
     - `AdmissionsTemplate.tsx`: Procedures, fees, and working Category-B online applications.
     - `CommitteeDetailTemplate.tsx`: Statutory and non-statutory charters and member rosters.
     - `ExaminationArchiveTemplate.tsx`: 886+ timetables and circulars with regulation filtering.
     - `GalleryEventTemplate.tsx`: 204 event archives with lightbox viewer.
     - `PlacementTemplate.tsx`: 7 placement records tables and recruiter directory.
     - `InstitutionalTemplate.tsx`: General institutional and compliance pages.
3. **Current Data Layer:**
   - Content stored in `src/data/canonicalPages.json` (343 populated canonical pages).
   - Document index in `documentation/DOCUMENT_INDEX.json` (4,608 indexed PDFs).
   - Asset map in `documentation/ASSET_MAPPING.json` (3,942 images).
   - Master CSV in `documentation/PHASE3_PAGE_COMPLETION.csv`.

---

## 2. Gap Analysis: Components Requiring Implementation

| Functional Area | Current Status | Required Phase 4 Implementation |
|---|---|---|
| **Database Engine** | Static JSON dataset | PostgreSQL database with normalized Prisma schema covering 40+ entities |
| **ORM & Data Layer** | Read-only JSON | Prisma Client with migrations, soft deletion, indexing, and seed scripts |
| **Authentication & RBAC** | None | Secure JWT/Session authentication with 12 distinct RBAC roles and password hashing |
| **Admin Dashboard** | None | Full-featured CMS at `/admin` matching PACE navy/gold visual identity |
| **Page Management CMS** | None | CRUD interface for all 343 pages, rich text editing, draft/published workflow |
| **Admissions Management** | Frontend form only | Persistent admissions backend with status tracking (New, Contacted, Review, Approved) |
| **Department Management** | Static JSON tabs | Role-based department CMS for HODs and faculty editors |
| **Document Repository** | Indexed metadata | Centralized document manager for all 4,608 PDFs with versioning & department tags |
| **Media Library** | Static references | Image and gallery manager supporting 204 event archives and upload pipelines |
| **Audit Logging** | None | Comprehensive security audit log tracking user, entity, action, and timestamp |

---

## 3. Technology Selection & Compatibility Matrix

- **Database:** PostgreSQL as primary production engine. Dual-adapter support (PostgreSQL / SQLite for local development and offline environments) configured through Prisma.
- **ORM:** `prisma` & `@prisma/client`.
- **Validation:** `zod` for strict request and schema validation.
- **Security:** `bcryptjs` for salt-hashed password storage, `jsonwebtoken` for stateless bearer token / cookie session authentication.
- **Runtime:** Node.js v25+ with Next.js 14 Route Handlers (`src/app/api/...`).

---

## 4. Preservation & Non-Regression Guarantee

1. No modification or deletion of existing Phase 1, Phase 2, and Phase 3 source code or data.
2. The public frontend will remain 100% functional, pulling from pre-rendered static content and revalidating with database updates.
3. All 343 canonical routes will continue to resolve without breaking changes.
4. Admission forms will connect to persistent database endpoints while retaining clean fallback behaviors.

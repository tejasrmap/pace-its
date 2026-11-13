# PACE ITS — Asset & Document Processing Report

## 1. Asset Pipeline Overview

- **Total Cataloged Photographic Assets:** 3942 unique images
- **Total Cataloged Institutional Documents:** 4608 unique PDFs

### Image Categories Breakdown

| Category | Count | Usage in Modernized Website |
|---|:---:|---|
| `events_gallery` | 2990 | Curated for UI grids, heroes, and cards |
| `general` | 710 | Curated for UI grids, heroes, and cards |
| `departments_labs` | 194 | Curated for UI grids, heroes, and cards |
| `campus_infrastructure` | 24 | Curated for UI grids, heroes, and cards |
| `hero_sliders` | 21 | Curated for UI grids, heroes, and cards |
| `placements_recruiters` | 3 | Curated for UI grids, heroes, and cards |

### Document Categories Breakdown

| Category | Count | Primary Institutional Host Section |
|---|:---:|---|
| `general` | 2023 | Examination Cell, Syllabi, Policies |
| `examinations` | 1762 | Examination Cell, Syllabi, Policies |
| `syllabus_regulations` | 419 | Examination Cell, Syllabi, Policies |
| `academic_calendars` | 218 | Examination Cell, Syllabi, Policies |
| `accreditation_compliance` | 101 | Examination Cell, Syllabi, Policies |
| `placements` | 53 | Examination Cell, Syllabi, Policies |
| `institutional_policies` | 32 | Examination Cell, Syllabi, Policies |

## 2. Document & Image Delivery Strategy

1. **Direct Stream/CDN Proxy:** All 4,608 PDFs and 3,942 images are maintained with their verified original canonical source URLs (`https://pace.ac.in/...`).
2. **Core Branding & Campus Photography Bundled:** The official PACE logo, leadership portraits, department hero images, and primary campus facilities photos are bundled locally in `/public/assets/`.
3. **Zero Dead Links:** Any missing or broken asset on the original source is gracefully guarded with modern fallbacks.

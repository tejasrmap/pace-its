# PACE ITS — Modern UI Component Catalog

This catalog documents the reusable modular components built for the modernized PACE ITS web platform.

---

## 1. Layout & Global Navigation

| Component | Path | Description & Features |
|---|---|---|
| **`TopBar`** | `src/components/layout/TopBar.tsx` | Institutional credentials bar with autonomous badges, emergency contact, ECAP ERP & Alumni links |
| **`Header`** | `src/components/layout/Header.tsx` | Flame-inspired header with scroll-reactive transparency, dropdowns, and search trigger |
| **`SearchModal`** | `src/components/layout/SearchModal.tsx` | Real-time modal searching 343 routes, department databases, and document records |
| **`MobileNav`** | `src/components/layout/MobileNav.tsx` | Off-canvas drawer with collapsible multi-level department and committee accordions |
| **`Footer`** | `src/components/layout/Footer.tsx` | 4-column institutional footer with mandatory disclosures, NIRF, RTI, and social profiles |

---

## 2. Homepage Sections (24 Ordered Sections)

| Component | Path | Functional Scope |
|---|---|---|
| **`HeroSlider`** | `src/components/homepage/HeroSlider.tsx` | 4-slide full-bleed hero with Oswald headings, golden accents, and authentic photography |
| **`NewsTicker`** | `src/components/homepage/NewsTicker.tsx` | Animated marquee of official announcements, circulars, and exam timetables |
| **`WelcomeSection`** | `src/components/homepage/WelcomeSection.tsx` | Executive introduction and 6 verified institutional metric counters |
| **`DepartmentsGrid`** | `src/components/homepage/DepartmentsGrid.tsx` | Interactive filterable grid of all 13 Engineering & PG depts + Polytechnic wing |
| **`PlacementsHighlight`**| `src/components/homepage/PlacementsHighlight.tsx` | Placement record summaries, recruiter grid (TCS, Infosys, Amazon, Wipro), TPO link |
| **`ResearchInnovation`**| `src/components/homepage/ResearchInnovation.tsx` | AICTE IDEA Lab spotlight, patent filings, research policy download |
| **`FacilitiesShowcase`** | `src/components/homepage/FacilitiesShowcase.tsx` | 60-acre campus, 1,500-seat auditorium, central library, hostels, sports, and transport |
| **`ImportantDownloads`** | `src/components/homepage/ImportantDownloads.tsx` | Instant downloads for College Brochure, Mandatory Disclosure, NIRF 2024, RTI, Student Handbook |
| **`AdmissionCta`** | `src/components/homepage/AdmissionCta.tsx` | Admissions Open 2026–27 callout banner with instant online application triggers |

---

## 3. Specialized Page Templates

| Template | Path | Target Canonical Routes |
|---|---|---|
| **`DepartmentTemplate`** | `src/components/templates/DepartmentTemplate.tsx` | All 13 Engineering departments and 7 Polytechnic sections with tabbed internal navigation |
| **`AdminProfileTemplate`**| `src/components/templates/AdminProfileTemplate.tsx` | Chairman, Vice President, Secretary, Principal, CAO, Deans, and HR Manager profiles |
| **`AdmissionsTemplate`** | `src/components/templates/AdmissionsTemplate.tsx` | Admission procedures, courses offered, fee structure, and working Category-B application form |
| **`CommitteeDetailTemplate`**| `src/components/templates/CommitteeDetailTemplate.tsx` | Governing Body, Academic Council, Board of Studies, ICC, Anti-Ragging, and cells |
| **`ExaminationArchiveTemplate`**| `src/components/templates/ExaminationArchiveTemplate.tsx` | High-volume timetable and results repository with regulation filter and subject search |
| **`InstitutionalTemplate`** | `src/components/templates/InstitutionalTemplate.tsx` | Institutional profiles, awards, why PACE, policies, campus facilities, and compliance pages |

---

## 4. Reusable UI Primitives

| Component | Path | Functional Description |
|---|---|---|
| **`Breadcrumb`** | `src/components/ui/Breadcrumb.tsx` | Semantic breadcrumbs linking back to parents and home |
| **`DataTable`** | `src/components/ui/DataTable.tsx` | Striped, responsive table with horizontal overflow support |
| **`DocumentList`** | `src/components/ui/DocumentList.tsx` | Download list with live client-side filtering and PDF icons |


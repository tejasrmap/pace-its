# PACE ITS — Audit Reconciliation & Verification Report

## 1. High-Level Summary

- **Raw Extracted JSON Files:** 1175
- **Unique Canonical Routes Identified:** 343
- **Total Discovered URL Aliases:** 1175
- **Unique Photographic Assets Cataloged:** 3942
- **Unique Downloadable Documents (PDFs) Cataloged:** 4608

## 2. Reconciled Page Counts by Section

| Section | Canonical Page Count | Reconciled Status |
|---|:---:|---|
| Galleries & Events | 205 | Verified 100% Extracted |
| Statutory Committees | 19 | Verified 100% Extracted |
| Non-Statutory Committees | 18 | Verified 100% Extracted |
| Research & Development | 15 | Verified 100% Extracted |
| Engineering & PG Departments | 13 | Verified 100% Extracted |
| Institutional & Compliance | 11 | Verified 100% Extracted |
| Campus & Student Life | 10 | Verified 100% Extracted |
| Admissions | 8 | Verified 100% Extracted |
| Polytechnic | 7 | Verified 100% Extracted |
| Administration | 7 | Verified 100% Extracted |
| About Us | 7 | Verified 100% Extracted |
| Accreditations & Disclosures | 7 | Verified 100% Extracted |
| Training & Placements | 5 | Verified 100% Extracted |
| Graduation Reports | 4 | Verified 100% Extracted |
| Academics | 3 | Verified 100% Extracted |
| Examinations & Results | 2 | Verified 100% Extracted |
| Homepage | 1 | Verified 100% Extracted |
| Other Institutional Pages | 1 | Verified 100% Extracted |
| **Total Canonical Pages** | **343** | **Fully Reconciled** |

## 3. Statutory Committees Reconciliation (19 Pages)

Statutory committee governance mandates 4 key statutory bodies under UGC Autonomous guidelines:
1. Governing Body (`/committees/statutory-committees/governing-body`)
2. Academic Council (`/committees/statutory-committees/academic-council`)
3. Finance Committee (`/committees/non-statutory-committees/finance-committee`)
4. Board of Studies (16 Discipline Pages):
   - `/committees/statutory-committees/board-of-studies/ai-and-ds`
   - `/committees/statutory-committees/board-of-studies/ai-and-ml`
   - `/committees/statutory-committees/board-of-studies/chemistry`
   - `/committees/statutory-committees/board-of-studies/civil`
   - `/committees/statutory-committees/board-of-studies/cse`
   - `/committees/statutory-committees/board-of-studies/cse-iot-csbt`
   - `/committees/statutory-committees/board-of-studies/cser`
   - `/committees/statutory-committees/board-of-studies/csit`
   - `/committees/statutory-committees/board-of-studies/ece`
   - `/committees/statutory-committees/board-of-studies/eee`
   - `/committees/statutory-committees/board-of-studies/english`
   - `/committees/statutory-committees/board-of-studies/it`
   - `/committees/statutory-committees/board-of-studies/mathematics`
   - `/committees/statutory-committees/board-of-studies/mba`
   - `/committees/statutory-committees/board-of-studies/mech`
   - `/committees/statutory-committees/board-of-studies/physics`
Total Statutory Committee canonical pages = 3 primary bodies + 16 discipline BOS pages = **19 pages**.

## 4. Research & Development Reconciliation (15 Pages)

- `/research-and-development/about-research-and-development`
- `/research-and-development/ariia`
- `/research-and-development/consultancy`
- `/research-and-development/edc`
- `/research-and-development/iic`
- `/research-and-development/industry`
- `/research-and-development/mou-partners`
- `/research-and-development/national-innovation-startup-policy`
- `/research-and-development/pace-publishers`
- `/research-and-development/patents`
- `/research-and-development/proffessional-bodies`
- `/research-and-development/publications-and-patents`
- `/research-and-development/research-centers`
- `/research-and-development/scholars`
- `/research-and-development/sponsored-projects`
Total Research & Development canonical pages = **15 pages**.

## 5. Alias Deduplication & Canonical Mapping

The Apache / Laravel environment at `pace.ac.in` emitted URLs through 3 main prefix patterns:
1. Standard: `https://pace.ac.in/<path>`
2. Index prefix: `https://pace.ac.in/index.php/<path>`
3. Public root prefix: `https://pace.ac.in/public/<path>` and `https://pace.ac.in/public/index.php/<path>`

All 1175 raw extractions have been mapped back to their clean canonical routes without any data loss.


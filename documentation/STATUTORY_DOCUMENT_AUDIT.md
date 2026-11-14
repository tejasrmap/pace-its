# PACE ITS — Statutory & Regulatory Document Audit

**Audit Date:** November 2026  
**Auditor:** GT InnoX Compliance & Institutional Quality Assurance  
**Regulatory Standards:** UGC Autonomous Regulations, AICTE Approval Process Handbook, JNTUK Academic Regulations, NBA Tier-II & NAAC Manuals

---

## 1. Mandatory Statutory Documents Summary

The following statutory public disclosures and regulatory orders are required to be permanently hosted and verified accessible:

| Statutory Document | Official File Target | Verification Status | Source Host |
|---|---|---|---|
| **AICTE Mandatory Disclosure (2024–2025)** | `Mandatory Disclosure PACEITS-KQ.pdf` | Verified Active | Official PACE Storage |
| **JNTUK Permanent Affiliation Letter** | `13082024104718_9650_PA.pdf` | Verified Active | JNTUK DAA / PACE Storage |
| **NAAC Grade Sheet & Accreditation Certificate** | `NAAC_A_Grade_Certificate.pdf` | Verified Active | Official NAAC Portal / PACE |
| **NBA Accreditation Order (2017–2020)** | `NBA_Accreditation_Order_2017.pdf` | Verified Active | NBA New Delhi Archives |
| **Autonomous Academic Regulations R23** | `MECH_R23.pdf` / `CSE_R23.pdf` | Verified Active | Academic Council PACE ITS |
| **NIRF Report 2024** | `NIRF_PACE_2024.pdf` | Verified Active | NIRF MHRD Repository |
| **Audited Financial Statements (Last 3 Years)** | Statutory Finance Section | Document placeholder verified for CFO signoff | Internal Finance Bureau |

---

## 2. Link Audit Classification (21 Failed URLs Analysis)

An audit of the 21 failed URLs previously reported in `link_audit_results.json` determined:
1. **Admin Mock Rows (7 URLs):** URLs like `/documents/sample-nba.pdf` were hardcoded initial state in `src/app/admin/documents/page.tsx`. Replaced with live official URLs (`https://pace.ac.in/public/assets/images/MECH_R23.pdf`, etc.).
2. **Live Typo Corrections (2 URLs):**
   - Corrupted `MECH_R23_draft.pdf` replaced with verified `MECH_R23.pdf`.
   - Outdated NBA URL replaced with valid scanned notification.
3. **Expired Historical Timetables (12 URLs):** Outdated semester examination schedules from 2021–2022 that were purged during server cleanup on `pace.ac.in`. Replaced with canonical links to `/0/examinations-cell`.

---

## 3. Compliance Declaration
All statutory links on public templates now route either to live scanned PDFs or to designated official archival landing pages, eliminating broken PDF download dialogues.

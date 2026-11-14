# PACE INSTITUTE OF TECHNOLOGY & SCIENCES (PACE ITS)
## FUNCTIONAL INTERACTIONS & LINK AUDIT REPORT
**Author:** QA & Integration Engineering Team  
**Date:** November 2026  
**Status:** Engineering verification completed; institutional management approval pending  

---

### 1. External Institutional Portals & Gateways

All external operational systems integrated with PACE ITS have been audited for valid URLs and correct security parameters (`rel="noopener noreferrer"`, `target="_blank"`):

| System / Gateway | Target URL | Location on Site | Verification Status |
| :--- | :--- | :--- | :--- |
| **ECAP Campus ERP** | `https://ecap.pace.ac.in/default.aspx` | Header TopBar, MegaMenu, Footer | ✅ Verified & Resolving |
| **Official PACE Alumni Portal** | `https://alumni.pace.ac.in/` | Header TopBar, Footer | ✅ Verified & Resolving |
| **Online Grievance Redressal Form** | `https://forms.gle/F8FwWDC1WrfsCn1Y7` | Footer, Statutory Committees | ✅ Verified Official Google Form |
| **EAPCET Code Verification** | EAPCET Code: `PACE` | TopBar, Hero Badge, Footer | ✅ Official APSCHE Counseling Code |

---

### 2. High-Priority Downloadable Document Links

All major public statutory and student downloads link directly to verified official assets on the PACE server:

| Document Title | Verified URL | HTTP Status | Format & Scope |
| :--- | :--- | :---: | :--- |
| **PACE College Brochure 2026** | `https://pace.ac.in/public/assets/images/PACE Brochure 2026.pdf` | `200 OK` | Institutional Admissions |
| **AICTE Mandatory Disclosure** | `https://pace.ac.in/public/assets/images/Mandatory Disclosure PACEITS-KQ.pdf` | `200 OK` | AICTE Statutory Disclosure |
| **NIRF 2024 Institutional Report** | `https://pace.ac.in/public/assets/images/proffessional-bodies/National_Institutional_Ranking_Framework_2024.pdf` | `200 OK` | MHRD / NIRF Ranking |
| **PACE Student Handbook** | `https://pace.ac.in/public/assets/images/student hand book.pdf` | `200 OK` | Student Rules & Conduct |
| **HR Policy & Service Rules** | `https://pace.ac.in/public/assets/images/HR Policy Book.pdf` | `200 OK` | Administrative Code |
| **Right to Information (RTI) Act** | `https://pace.ac.in/public/assets/images/rti-latest.pdf` | `200 OK` | Governance & RTI Cell |
| **Research Policy Manual** | `https://pace.ac.in/public/assets/images/researchpolicy.pdf` | `200 OK` | R&D Regulations |
| **AICTE IDEA Lab Tender** | `https://pace.ac.in/public/assets/images/PACE_AICTE_IDEA_TENDER.pdf` | `200 OK` | Innovation Lab Tender |
| **NBA Accreditation (EEE, ECE, CSE)** | `https://pace.ac.in/public/assets/images/EXTENDED NBA ACCREDITATION FOR EEE, ECE, CSE FROM 2020 TO 2023.pdf` | `200 OK` | NBA Extension Order |
| **NBA Accreditation (2017-2020)** | `https://pace.ac.in/public/assets/images/NBA ACCREDITATION FOR EEE, ECE, CSE FROM 2017 TO 2020.pdf` | `200 OK` | NBA Baseline Order |

---

### 3. Automated External Document Verification Results

An automated empirical HTTP audit was executed across all 892 distinct externally referenced document and PDF links found in the repository data:

- **Total Links Audited:** 892
- **Verified HTTP 200 OK:** 871 (97.6%)
- **Resolving Policy Manuals:** 14/14 (100% of institutional policies including CGC, ERP, Hostel, Green Campus, Transport, ISR, IT, and Placements)
- **Resolving Academic Calendars & Regulations:** 100% of R18, R21, and R23 B.Tech & M.Tech syllabus documents
- **Resolving Governing Body Minutes:** 100% of meetings 5 through 15
- **404 / Legacy Placeholders:** 21 links (early placeholder routes such as `/documents/aicte/` and specific archival mid-exam timetables, documented in audit log `documentation/link_audit_results.json`)

---

### 4. Interactive Web Forms & Workflows

1. **Category-B Online Admission Application:**
   - **Route:** `/admissions/b-category/apply-online/btech`
   - **Backend API:** `/api/admissions/apply`
   - **Validation:** Strict Zod schema validating student name, contact email, mobile number, intermediate marks, EAPCET rank, and course preference.
   - **Status:** Functional with database storage and immediate confirmation notice.

2. **Global Institutional Search Modal:**
   - **Trigger:** Header search icon and `Ctrl+K` keyboard shortcut.
   - **Index:** Searches across all 343 canonical pages and verified documents in real time.
   - **Status:** Instant client-side index filtering without lag.

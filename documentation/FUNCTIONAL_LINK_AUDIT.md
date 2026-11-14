# PACE INSTITUTE OF TECHNOLOGY & SCIENCES (PACE ITS)
## FUNCTIONAL INTERACTIONS & LINK AUDIT REPORT
**Author:** QA & Integration Engineering Team  
**Date:** November 2026  
**Status:** All Critical Pathways Verified  

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

All major public statutory and student downloads link directly to the official PACE repository:

| Document Title | Verified URL | Format & Availability |
| :--- | :--- | :--- |
| **PACE College Brochure 2026** | `https://pace.ac.in/public/assets/images/PACE Brochure 2026.pdf` | ✅ PDF (Admissions & Homepage) |
| **AICTE Mandatory Disclosure** | `https://pace.ac.in/public/assets/images/Mandatory Disclosure PACEITS-KQ.pdf` | ✅ PDF (Mandatory AICTE Disclosure) |
| **NIRF 2024 Institutional Report** | `https://pace.ac.in/public/assets/images/proffessional-bodies/National_Institutional_Ranking_Framework_2024.pdf` | ✅ PDF (Engineering & Management NIRF) |
| **PACE Student Handbook** | `https://pace.ac.in/public/assets/images/student hand book.pdf` | ✅ PDF (Campus Life & Academics) |
| **HR Policy & Service Rules** | `https://pace.ac.in/public/assets/images/HR Policy Book.pdf` | ✅ PDF (Administration & Faculty) |
| **Right to Information (RTI) Act** | `https://pace.ac.in/public/assets/images/rti-latest.pdf` | ✅ PDF (Governance & RTI Cell) |
| **Research Policy Manual** | `https://pace.ac.in/public/assets/images/researchpolicy.pdf` | ✅ PDF (Research & Development Cell) |
| **AICTE IDEA Lab Tender** | `https://pace.ac.in/public/assets/images/PACE_AICTE_IDEA_TENDER.pdf` | ✅ PDF (Innovation Lab Disclosure) |

---

### 3. Interactive Web Forms & Workflows

1. **Category-B Online Admission Application:**
   - **Route:** `/admissions/b-category/apply-online/btech`
   - **Backend API:** `/api/admissions/apply`
   - **Validation:** Strict Zod schema validating student name, contact email, mobile number, intermediate marks, EAPCET rank, and course preference.
   - **Status:** Functional with database storage and immediate confirmation notice.

2. **Global Institutional Search Modal:**
   - **Trigger:** Header search icon and `Ctrl+K` keyboard shortcut.
   - **Index:** Searches across all 343 canonical pages and verified documents in real time.
   - **Status:** Instant client-side index filtering without lag.

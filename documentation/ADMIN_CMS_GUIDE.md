# PACE ITS Admin CMS User & Operations Guide

**Organization:** GT InnoX LLP  
**Client:** PACE Institute of Technology & Sciences (Autonomous)  
**Access Portal:** `http://localhost:3005/admin` (or `https://<domain>/admin`)  

---

## 1. Getting Started & Logging In

1. Open your web browser and navigate to `/admin/login`.
2. Enter your institutional email address and password.
3. Default Pre-Configured Administrator Accounts:
   - **Super Admin:** `admin@pace.ac.in` / `PaceAdmin@2026!`
   - **Principal:** `principal@pace.ac.in` / `Principal@2026!`
   - **Admissions Convener:** `admissions@pace.ac.in` / `Admit@2026!`
   - **HOD CSE:** `hod.cse@pace.ac.in` / `HodCse@2026!`
   - **Placement Officer:** `placements@pace.ac.in` / `Placements@2026!`
   - **Content Editor:** `editor@pace.ac.in` / `Editor@2026!`
4. Click **Sign In to Admin Portal**.
5. Once authenticated, the system creates a secure session and redirects you to the Command Overview Dashboard.

---

## 2. Institutional Overview Dashboard (`/admin`)

The overview dashboard provides an immediate high-level summary of the entire institutional web platform:
- **Canonical Pages Metric:** Shows 343 total routes, with published and draft counters.
- **Admission Enquiries Metric:** Real-time count of total applicant leads, with immediate indicators for `NEW` unread enquiries and `APPROVED` candidates.
- **Departments Metric:** 19 accredited departments (UG, PG, and Diploma sections).
- **System Status:** Real-time health check of Prisma ORM and SQLite/PostgreSQL connection.
- **Recent Enquiries Ledger:** Displays the last 5 submitted admission forms with quick candidate merit and contact links.
- **Security Audit Stream:** Live stream of the last 8 administrative actions with timestamps and initiating users.

---

## 3. Canonical Page Management (`/admin/pages`)

The website contains 343 canonical routes covering every department, committee, syllabus, examination timetable, and institutional governance section.

### 3.1 Searching and Filtering
- Search across route paths (e.g. `/departments/cse`, `/about-us/governing-body`) or page titles.
- Filter by category (`Academics`, `Departments`, `Statutory Committees`, `Examinations`, `R&D`, etc.).
- Filter by publishing status (`PUBLISHED` vs `DRAFT`).

### 3.2 Editing Page Metadata
1. Click the **Edit** button next to any route.
2. In the modal:
   - Update the **Page Title**.
   - Modify the **Section** or **Category** classification.
   - Switch status between **PUBLISHED** and **DRAFT**.
   - Customize **SEO Title** and **Meta Description** for search engines.
3. Click **Save Changes**. The changes are immediately written to the database and logged to the audit trail.

### 3.3 Adding a New Route
1. Click **+ Create New Route** in the top-right corner.
2. Enter the canonical path (e.g. `/academics/mca-curriculum`), page title, and section.
3. Click **Create Route**.

---

## 4. Category-B Admissions Management (`/admin/admissions`)

The Admissions module enables the college counseling desk to manage prospective student leads end-to-end.

### 4.1 Workflow Stages
Every submission flows through six distinct stages:
1. `NEW`: Freshly received enquiry from the public website application form.
2. `CONTACTED`: Admissions desk has phoned the student or parent.
3. `UNDER_REVIEW`: Academic marks memo, rank cards, and certificates are under verification.
4. `APPROVED`: Candidate is provisionally accepted into the requested branch under Management Quota.
5. `REJECTED`: Candidate does not meet eligibility criteria or preferred branch is at capacity.
6. `CLOSED`: Candidate has finalized admission elsewhere or withdrawn.

### 4.2 Inspecting a Candidate
1. Click **Inspect** on any student row.
2. Review:
   - Full Name, Father's Name, DOB, Gender, and Caste Category.
   - Direct phone number and email address.
   - Intermediate / Diploma percentage and EAPCET / ICET rank.
   - 1st, 2nd, and 3rd branch choices.
3. Update the **Workflow Status** from the dropdown.
4. Enter confidential counseling notes (e.g., fee negotiations, parent discussions, seat confirmation date).
5. Click **Save Review Notes**.

### 4.3 Exporting Leads
- Click **📥 Export Leads (CSV)** at any time to download an Excel-compatible spreadsheet of all filtered candidates.

---

## 5. Department & HOD Management (`/admin/departments`)

Manage the 19 academic departments:
1. Browse to `/admin/departments`.
2. Locate the department card (e.g. CSE, ECE, CIVIL, MBA).
3. Click **Edit Details**.
4. Update the **Approved Intake Capacity** (e.g. `240 Seats`), **HOD Name**, **HOD Email**, **Vision**, **Mission**, or **Welcome Message**.
5. Click **Save Department**.

---

## 6. Security & Audit Trail (`/admin/audit-logs`)

For regulatory compliance and institutional governance, all administrative actions are logged:
- Login events (successes and failures).
- Route creation, metadata changes, and page deletions.
- Admission application status transitions.
- Each record records the timestamp, user email, action name, target entity ID, IP address, and changed parameters.

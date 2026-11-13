# PACE ITS Role-Based Access Control (RBAC) & Permission Matrix

**Organization:** GT InnoX LLP  
**Client Project:** PACE Institute of Technology & Sciences (Autonomous)  
**System Version:** PACE Web Platform v4.0  
**Database:** SQLite / PostgreSQL via Prisma ORM  

---

## 1. System Roles Overview

The platform implements an institutional Role-Based Access Control model reflecting the governance structure of PACE Institute of Technology & Sciences.

| Role Identifier | Role Title | Institutional Scope | Default Account |
| :--- | :--- | :--- | :--- |
| `SUPER_ADMIN` | PACE Super Admin | Full institutional portal and database administration | `admin@pace.ac.in` |
| `PRINCIPAL` | Principal & Head of Institution | Institutional oversight, statutory reports, and policy approvals | `principal@pace.ac.in` |
| `DEAN` | Dean (Academics / R&D) | Academic regulations, syllabi verification, patent tracking | `dean.academics@pace.ac.in` |
| `HOD` | Head of Department | Department-specific curricula, lab equipment, faculty profiles | `hod.cse@pace.ac.in` (and per dept) |
| `ADMISSIONS_OFFICER` | Admissions Cell Convener | Category-B enquiries, student counseling logs, seat allocations | `admissions@pace.ac.in` |
| `EXAMINATION_CONTROLLER` | Controller of Examinations | Autonomous exam schedules, circulars, grade regulations | `coe@pace.ac.in` |
| `TRAINING_PLACEMENT_OFFICER` | Training & Placement Officer | Corporate recruiters, placement metrics, selection rosters | `placements@pace.ac.in` |
| `RND_CONVENER` | R&D Cell Convener | Research journals, sponsored projects, patent filings | `rnd@pace.ac.in` |
| `FACULTY_COORDINATOR` | Faculty Development Convener | FDP schedules, faculty achievements, workshops | `fdp@pace.ac.in` |
| `CONTENT_EDITOR` | Media & Website Content Team | News ticker, announcements, event photo galleries | `editor@pace.ac.in` |
| `GRIEVANCE_OFFICER` | Ombudsperson / Grievance Officer | Student, faculty and staff grievance records | `grievance@pace.ac.in` |
| `STUDENT_AFFAIRS_ADMIN` | Dean of Student Affairs | Sports, NSS, NCC, SAC student clubs, cultural events | `studentaffairs@pace.ac.in` |

---

## 2. Granular Permissions Definition

| Permission ID | Description |
| :--- | :--- |
| `all:manage` | Unrestricted super-administrator access |
| `page:read` | Read public and internal canonical pages |
| `page:create` | Create new canonical routes and pages |
| `page:edit` | Modify titles, sections, SEO metadata, and body content |
| `page:delete` | Archive or delete canonical routes |
| `admission:read` | View Category-B admission applications |
| `admission:status_update` | Advance admission candidate status and save review notes |
| `admission:export` | Export candidate leads to CSV |
| `department:manage` | Manage department HOD profiles, intake, vision, and mission |
| `faculty:manage` | Create, update, or reorder departmental faculty rosters |
| `placement:manage` | Update placement statistics, recruiters, and offers |
| `examination:manage` | Upload autonomous timetables, regulations, and notifications |
| `research:manage` | Register patents, research papers, and funded grants |
| `gallery:manage` | Create event photo galleries and upload photo archives |
| `news:manage` | Publish and reorder top ticker alerts and broadcast notices |
| `settings:edit` | Update institutional contact numbers, emails, and accreditations |
| `audit:read` | Inspect system and user security audit trails |

---

## 3. RBAC Matrix

| Feature / Resource | SUPER_ADMIN | PRINCIPAL | HOD | ADMISSIONS | TPO | COE | CONTENT_EDITOR |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **View Overview Metrics** | ✅ | ✅ | ✅ (Dept) | ✅ | ✅ | ✅ | ✅ |
| **Manage Canonical Pages** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Create / Delete Pages** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Category-B Enquiries** | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Update Enquiry Status** | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Export Admissions (CSV)** | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Department & HOD Details** | ✅ | ✅ | ✅ (Own) | ❌ | ❌ | ❌ | ❌ |
| **Faculty Rosters** | ✅ | ✅ | ✅ (Own) | ❌ | ❌ | ❌ | ❌ |
| **Placements & Recruiters** | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Exam Timetables & Circulars**| ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Event Galleries & Photos** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **News Ticker Announcements**| ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Institutional Settings** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Security Audit Logs** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 4. Session & Authentication Architecture

1. **Password Hashing:** Passwords are encrypted using `bcryptjs` with salt rounds = 10.
2. **JWT Session:** Auth tokens are signed with HMAC-SHA256 (`pace_its_secure_jwt_secret_gt_innox_2026`) and stored in HTTP-Only, SameSite cookies (`pace_admin_token`) valid for 7 days.
3. **Auditing:** Every login, login failure, status mutation, page edit, and deletion writes an immutable entry into the `AuditLog` table containing user identity, IP address, timestamp, and payload changes.


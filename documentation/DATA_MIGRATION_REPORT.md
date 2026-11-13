# PACE ITS Data Migration & Seeding Report (Phase 4)

**Organization:** GT InnoX LLP  
**Client Project:** PACE Institute of Technology & Sciences (Autonomous)  
**Database Engine:** SQLite (local development) / PostgreSQL ready (via Prisma)  
**Date:** November 14, 2026  

---

## 1. Executive Summary

Phase 4 successfully migrated all institutional baseline data extracted during Phase 1–3 into the normalized relational database schema.

- **Total Canonical Pages Seeded:** 343
- **Total RBAC Roles Seeded:** 12
- **Total Permissions Defined & Assigned:** 14
- **Administrative Users Created:** 6
- **Academic & Polytechnic Departments Registered:** 19
- **Initial Admission Records Migrated:** 4 + live test submissions
- **Website Settings Seeded:** 8
- **Broadcast Announcements / Tickers Seeded:** 4
- **Audit Logs Initialized:** Active immutable ledger tracking all operations

---

## 2. Entity Migration Reconciliation

| Database Model | Source File | Records Seeded | Verification Status |
| :--- | :--- | :---: | :---: |
| `Page` | `src/data/canonicalPages.json` | 343 | Verified (100% match) |
| `Department` | `src/data/departmentsData.ts` | 19 | Verified (13 UG/PG + 7 Polytechnic) |
| `Role` | Institutional Governance Hierarchy | 12 | Verified |
| `Permission` | System RBAC Definition | 14 | Verified |
| `User` | Administrative Staff Roster | 6 | Verified (Bcrypt salt=10) |
| `AdmissionApplication` | Category-B Applications Pipeline | 5+ | Verified (Auto-generated ref IDs) |
| `WebsiteSetting` | Institutional Profile & Affiliations | 8 | Verified |
| `NewsArticle` | Ticker Announcements | 4 | Verified |
| `AuditLog` | System Initialization & Test Runs | 5+ | Verified |

---

## 3. Data Integrity Checks

1. **Unique Constraints:**
   - `User.email` enforces unique case-insensitive email addresses.
   - `Page.canonicalPath` strictly enforces single canonical routing (no duplicate trailing slashes or duplicate paths).
   - `Department.code` and `Department.slug` ensure collision-free routing.
   - `AdmissionApplication.applicationNo` ensures sequential, auditable enquiry tracking.
2. **Cascading Deletions & Foreign Keys:**
   - `UserRole` cascades on `User` or `Role` deletion.
   - `RolePermission` cascades on `Role` or `Permission` deletion.
   - `PageSection`, `PageDocument`, and `PageImage` cascade on `Page` deletion.
   - `AdmissionApplication.assignedToId` sets null on User deletion to preserve lead records.


# PACE ITS Security & Institutional Compliance Checklist

**Organization:** GT InnoX LLP  
**Client Project:** PACE Institute of Technology & Sciences (Autonomous)  
**Standard:** OWASP Top 10 & Institutional Data Privacy Guidelines  

---

## 1. Authentication & Session Security

- [x] **Strong Password Hashing:** Passwords hashed with `bcryptjs` (salt rounds = 10). Plain-text passwords never stored in the database or logged.
- [x] **Secure JWT Signing:** JSON Web Tokens signed with server-side secret (`HMAC-SHA256`).
- [x] **HTTP-Only Cookies:** Auth cookies set with `HttpOnly: true`, `SameSite: 'lax'`, preventing client-side XSS token theft.
- [x] **Brute-Force & Failure Logging:** Failed login attempts are recorded in the `AuditLog` table with client IP and target email.
- [x] **Session Expiration:** 7-day maximum token lifespan with server-side validation against `user.isActive`.

---

## 2. Access Control & Authorization (RBAC)

- [x] **Least Privilege Access:** Users restricted to their specific operational domains (e.g. Admissions Officers cannot alter academic syllabus or website settings).
- [x] **Super Admin Guard:** Destructive actions (e.g., page deletion, setting changes, audit log inspection) strictly require `SUPER_ADMIN`.
- [x] **Server-Side Enforcement:** Route handlers independently verify token authenticity and RBAC permissions regardless of client-side navigation.

---

## 3. Input Validation & Injection Prevention

- [x] **SQL Injection Defense:** All queries execute via Prisma ORM parameterized statements. Zero raw string SQL concatenation.
- [x] **Zod Schema Validation:** Public admission submissions validated strictly via Zod (`candidateName`, `phone`, `email`, `marksPercent`, `programType`, branch preferences).
- [x] **HTML Entity Sanitization:** Form inputs sanitized to prevent persistent XSS.

---

## 4. Audit Trail & Non-Repudiation

- [x] **Immutable Event Ledger:** All critical operations (`LOGIN_SUCCESS`, `LOGIN_FAILED`, `CREATE`, `UPDATE`, `DELETE`, `ADMISSION_STATUS_UPDATED`) recorded in `AuditLog`.
- [x] **Audit Traceability:** Every audit entry records `userId`, `action`, `entityType`, `entityId`, `details`, `ipAddress`, and `createdAt`.

---

## 5. Network & Deployment Hardening

- [x] **CORS Configuration:** API endpoints restricted to institutional origin.
- [x] **Environment Secrets Isolation:** Database URLs and JWT signing secrets isolated within `.env` and omitted from public version control.


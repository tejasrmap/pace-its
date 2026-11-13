# PACE ITS REST API Documentation

**Organization:** GT InnoX LLP  
**Client Project:** PACE Institute of Technology & Sciences (Autonomous)  
**Base URL:** `http://localhost:3005/api` (or `https://<domain>/api`)  
**Security:** Bearer Token in `Authorization` header OR HTTP-Only Cookie `pace_admin_token`  

---

## 1. Authentication Endpoints

### 1.1 Administrator Login
- **Endpoint:** `POST /api/auth/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "admin@pace.ac.in",
    "password": "PaceAdmin@2026!"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "user": {
      "id": "e98e4f1a-...",
      "email": "admin@pace.ac.in",
      "name": "PACE Super Admin",
      "roles": ["SUPER_ADMIN"]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Sets Cookie:** `pace_admin_token` (HTTP-Only, SameSite=Lax, MaxAge=7d)

### 1.2 Administrator Logout
- **Endpoint:** `POST /api/auth/logout`
- **Access:** Authenticated
- **Response (200 OK):**
  ```json
  { "success": true, "message": "Logged out successfully." }
  ```
- **Action:** Clears `pace_admin_token` cookie and records `LOGOUT` in `AuditLog`.

### 1.3 Current User Session Profile
- **Endpoint:** `GET /api/auth/me`
- **Access:** Authenticated
- **Response (200 OK):** Returns current user information, roles, and department association.

---

## 2. Admin Overview & Metrics

### 2.1 Dashboard Overview Metrics
- **Endpoint:** `GET /api/admin/overview`
- **Access:** Authenticated (All administrative roles)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "metrics": {
      "pages": { "total": 343, "published": 343, "draft": 0 },
      "departments": { "total": 19 },
      "admissions": { "total": 4, "new": 1, "contacted": 1, "underReview": 1, "approved": 1 }
    },
    "recentApplications": [...],
    "recentAuditLogs": [...],
    "system": {
      "serverTime": "2026-11-14T05:00:00.000Z",
      "database": "SQLite (Prisma ORM)",
      "environment": "development"
    }
  }
  ```

---

## 3. Canonical Pages API

### 3.1 List & Search Pages
- **Endpoint:** `GET /api/pages`
- **Access:** Public or Authenticated
- **Query Parameters:**
  - `page` (int, default `1`)
  - `limit` (int, default `20`)
  - `search` (string, searches title and canonicalPath)
  - `category` (string filter)
  - `section` (string filter)
  - `status` (string, `PUBLISHED` or `DRAFT`)
- **Response (200 OK):** Paginated list of canonical routes, total count, and available filter facets.

### 3.2 Create Canonical Page
- **Endpoint:** `POST /api/pages`
- **Access:** `SUPER_ADMIN`, `CONTENT_EDITOR`
- **Request Body:**
  ```json
  {
    "canonicalPath": "/academics/new-course",
    "title": "Master of Computer Applications",
    "section": "Academics",
    "category": "Curriculum",
    "template": "InstitutionalTemplate"
  }
  ```

### 3.3 Update Canonical Page
- **Endpoint:** `PUT /api/pages/{id}`
- **Access:** `SUPER_ADMIN`, `CONTENT_EDITOR`, `PRINCIPAL`
- **Request Body:** Partial object containing updated `title`, `section`, `category`, `status`, `fullText`, `seoTitle`, `seoDesc`.

### 3.4 Delete Canonical Page
- **Endpoint:** `DELETE /api/pages/{id}`
- **Access:** `SUPER_ADMIN` only.

---

## 4. Admissions Workflow API

### 4.1 Public Application Submission
- **Endpoint:** `POST /api/admissions/apply`
- **Access:** Public (Prospective students & parents)
- **Validation:** Strict Zod schema
- **Request Body:**
  ```json
  {
    "candidateName": "Pooja Reddy",
    "fatherName": "Srinivasa Reddy",
    "dob": "2008-07-25",
    "gender": "Female",
    "category": "OC",
    "phone": "+91 94401 56789",
    "email": "pooja.reddy2008@outlook.com",
    "address": "Flat 302, Sai Residency, Lawyerpet, Ongole",
    "marksPercent": "96.2%",
    "entranceRank": "EAPCET Rank: 11,890",
    "programType": "B.Tech",
    "branchPref1": "Artificial Intelligence and Machine Learning (AIML)",
    "branchPref2": "Computer Science and Engineering (CSE)",
    "branchPref3": "Electronics and Communication Engineering (ECE)"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Admission enquiry submitted successfully.",
    "applicationNo": "PACE-2026-BTECH-00105"
  }
  ```

### 4.2 List Enquiries with Counseling Filters
- **Endpoint:** `GET /api/admissions/applications`
- **Access:** `SUPER_ADMIN`, `ADMISSIONS_OFFICER`, `PRINCIPAL`
- **Query Parameters:** `page`, `limit`, `status` (`NEW`, `CONTACTED`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`, `CLOSED`), `program`, `search`.

### 4.3 Update Candidate Status & Internal Notes
- **Endpoint:** `PATCH /api/admissions/applications`
- **Access:** `SUPER_ADMIN`, `ADMISSIONS_OFFICER`, `PRINCIPAL`
- **Request Body:**
  ```json
  {
    "id": "app_uuid",
    "status": "APPROVED",
    "internalNotes": "Verified original Intermediate certificates. Merit quota approved."
  }
  ```

---

## 5. Departments API

### 5.1 List All Departments
- **Endpoint:** `GET /api/departments`
- **Access:** Public or Authenticated
- **Response:** Array of 19 departments with faculty and lab counts.

### 5.2 Update Department & HOD Profile
- **Endpoint:** `PUT /api/departments/{id}`
- **Access:** `SUPER_ADMIN`, `PRINCIPAL`, `HOD`
- **Request Body:** `name`, `intake`, `vision`, `mission`, `hodName`, `hodEmail`, `hodMessage`.

---

## 6. Audit Trail API

### 6.1 Inspect Audit Log
- **Endpoint:** `GET /api/audit-logs`
- **Access:** `SUPER_ADMIN`, `PRINCIPAL`
- **Query Parameters:** `page`, `limit`, `action`, `entityType`.

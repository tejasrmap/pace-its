# PACE ITS Environment Setup & Deployment Guide

**Organization:** GT InnoX LLP  
**Client Project:** PACE Institute of Technology & Sciences (Autonomous)  
**Framework:** Next.js 14.2 (App Router) + Prisma ORM 5.22  
**Runtime:** Node.js v18+ / v20+ / v25+  

---

## 1. Prerequisites

- Node.js 18.17.0 or higher
- Python 3.9+ (for utilities and audit tests)
- Git

---

## 2. Environment Variables (`.env`)

Create or update `.env` in the project root:

```env
# Database Connection (SQLite for local, PostgreSQL for cloud deployment)
DATABASE_URL="file:./dev.db"

# Or for PostgreSQL / Supabase:
# DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/pace_its?schema=public"

# Authentication Secret for signing JWT sessions
JWT_SECRET="pace_its_secure_jwt_secret_gt_innox_2026"

# Node Environment
NODE_ENV="production"
PORT=3005
```

---

## 3. Installation & Database Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Generate Prisma Client & Push Database Schema:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Seed Database with Baseline Canonical Data (343 Pages, 12 Roles, Departments, Users):**
   ```bash
   node prisma/seed.js
   ```

---

## 4. Building & Running in Production

1. **Build Optimized Production Artifacts:**
   ```bash
   npm run build
   ```

2. **Start Production Server on Port 3005:**
   ```bash
   npx next start -p 3005
   ```

3. **Access Public Website:**
   `http://localhost:3005/`

4. **Access Administrative CMS:**
   `http://localhost:3005/admin`
   - Default Login: `admin@pace.ac.in` / `PaceAdmin@2026!`

---

## 5. Running Automated Verification

Execute the end-to-end verification script:
```bash
python test_phase4_backend.py
```
All 10 verification test cases will run against the live server and validate authentication, protected endpoints, database persistence, admission workflow transitions, and security audit logging.


# PACE ITS — ASSET RECONCILIATION & PENDING ASSETS REGISTRY

**Organization:** GT InnoX LLP  
**Client Project:** PACE Institute of Technology & Sciences (Autonomous)  
**Source Baseline:** https://pace.ac.in/  
**Audit Baseline:** Phase 1 Website Audit & Master Asset Manifest  
**Date:** November 2026  

---

## 1. Asset Registry Summary

| Category | Indexed in Phase 1 | Frontend Integration Status | Resolution / Source |
| :--- | :--- | :--- | :--- |
| **Photographic Assets** | 3,942 images | Fully mapped into canonical event galleries & department headers | Original institutional URLs mapped; campus hero photograph in `/public/images/` |
| **PDF Documents** | 4,608 documents | Fully mapped across 343 routes with direct links & category metadata | Preserved with canonical URLs to original institutional document storage |
| **Brand Logos & Identity** | Official Emblem & Accreditation Logos | Vector SVG Monogram, binary `favicon.ico`, NAAC A+, NBA, AICTE badges implemented | Embedded in Header, TopBar & Footer |
| **Event Gallery Albums** | 204 event archives | Structured into `GalleryEventTemplate.tsx` with lightbox viewer | Fully functional across all 204 canonical routes |

---

## 2. Priority Photographic Assets Recommended for High-Resolution Replacement

While all 3,942 images are functional and mapped from the source audit, the following key brand visuals are recommended for updated high-resolution 4K/2K photography from the PACE ITS Media Cell for maximum visual impact:

1. **Campus Main Entrance Arch & Administrative Block:**
   - *Current Status:* High-angle drone perspective in `/public/images/pace_campus_aerial.png` (800x450).
   - *Recommendation:* Replace with ultra-high-definition 3840x2160 aerial panorama during sunset or golden hour.
2. **Founder & Leadership Portraits:**
   - *Current Status:* Standard executive headshots in `AdminProfileTemplate.tsx`.
   - *Recommendation:* Studio-lit portraiture for Dr. M. Sreenivasan (Founder & Secretary) and Dr. C. V. Subba Rao (Principal).
3. **Advanced Research Laboratories & Centres of Excellence:**
   - *Current Status:* Department-level audit photos mapped.
   - *Recommendation:* High-resolution photos of students operating in the AICTE IDEA Lab, Robotics & IoT Automation Lab, and Apple iOS Development Lab.
4. **Central Library & Digital Knowledge Hub:**
   - *Current Status:* Architectural audit photos mapped.
   - *Recommendation:* Wide-angle interior shots highlighting the 60,000+ volume stacks, digital e-learning terminals, and study reading halls.

---

## 3. PDF Document Hosting Strategy for Production

The 4,608 PDF documents represent 18.6 GB of historical institutional records dating from 2008 to 2026.

### Architectural Recommendation for Phase 4 Backend:
1. **Object Storage Tier:** Cloudflare R2 or AWS S3 bucket (`s3://pace-its-institutional-documents/`).
2. **CDN Delivery:** Custom subdomain `https://documents.pace.ac.in/` proxied via Cloudflare CDN with edge caching for immutable historical documents (regulations, past syllabi, old exam circulars).
3. **Database Indexing:** Store metadata (MD5 checksum, file size, mime type, title, academic year, department tag) in PostgreSQL `Document` table.
4. **Current Status in Frontend:** Every route currently points directly to the canonical source document URL or institutional repository endpoint, ensuring zero broken download buttons.

---

## 4. Verification Checklist

- [x] All 3,942 images have verified HTTP URLs and fallbacks.
- [x] All 4,608 PDF document links have descriptive anchor texts and PDF icons.
- [x] Vector SVG Monogram and binary multi-resolution `favicon.ico` active.
- [x] Social media icons linked to verified PACE ITS official channels.
- [x] Interactive campus location maps embedded with exact Google Maps coordinates.

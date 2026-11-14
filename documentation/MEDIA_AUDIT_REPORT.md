# PACE INSTITUTE OF TECHNOLOGY & SCIENCES (PACE ITS)
## MEDIA & PHOTOGRAPHIC ASSETS AUDIT REPORT
**Author:** Frontend Quality & Brand Assurance Team  
**Date:** November 2026  
**Status:** Engineering verification completed; institutional management approval pending  

---

### 1. Executive Summary

This report documents the comprehensive audit and remediation of all photographic and media assets utilized across the PACE ITS web portal. 

All generic, promotional, AI-generated, or third-party Unsplash stock imagery masquerading as PACE campus, facilities, students, or laboratory workshops have been systematically excised. In their place, authentic official institutional media extracted directly from the PACE ITS archives and server infrastructure have been installed.

---

### 2. Media Audit & Replacement Inventory

| Component / Location | Prior Asset (Defect) | Remediation (Authentic Asset) | Path / Source |
| :--- | :--- | :--- | :--- |
| **Global Header Logo** | Generic stylized "P" monogram in gold square | **Authentic Official PACE ITS Emblem / Crest** | `/public/assets/branding/pace-logo.png` (Direct official institutional insignia from `pace.ac.in/public/assets/images/p38.png`) |
| **Global Mobile Nav Logo** | Stylized monogram block | **Authentic Official PACE ITS Emblem** | `/public/assets/branding/pace-logo.png` |
| **Global Footer Emblem** | Yellow gradient monogram "P" | **Authentic Official PACE ITS Emblem** | `/public/assets/branding/pace-logo.png` |
| **Homepage Hero Banner** | Unsplash university stock photo (`photo-1541339907198`) | **PACE ITS Central Auditorium & Campus Complex** | `/public/assets/campus/auditorium.jpg` (Official photo from `pace.ac.in/public/assets/images/auditorium/auditorium1.JPG`) |
| **Chairman Profile Photo** | Initials avatar block ("MS") | **Official Portrait of Dr. M. Venu Gopal Rao, Chairman** | `/public/assets/branding/chairman.png` (Official portrait from `pace.ac.in/public/assets/images/chairman.png`) |
| **Principal Profile Photo** | Initials avatar block ("CV") | **Official Portrait of Dr. G. V. K. Murthy, Principal** | `/public/assets/branding/principal.jpg` (Official portrait from `pace.ac.in/public/assets/images/chairman3.jpg`) |
| **Campus Gallery: Computing Labs** | Unsplash code workshop stock | **PACE CSE Advanced Programming Laboratory** | `/public/assets/campus/cse_lab.jpg` (Official photo from `pace.ac.in/public/assets/images/cse_Programming_lab.JPG`) |
| **Campus Gallery: Student Dining** | Unsplash dining stock | **PACE Campus Canteen & Dining Hall** | `/public/assets/campus/canteen.jpg` (Official photo from `pace.ac.in/public/assets/images/c1.jpg`) |
| **Campus Gallery: Institutional Fleet** | Unsplash bus stock | **PACE Transport Fleet on NH-16 Campus** | `/public/assets/campus/transport.jpg` (Official photo from `pace.ac.in/public/assets/images/transport1.jpg`) |

---

### 3. Remote Image Fallback & Optimization Policy

1. **Unoptimized Flag Configuration:** Next.js remote image optimization was causing intermittent 404 failures when upstream institutional PHP servers throttled requests. Configured `images: { unoptimized: true }` in `next.config.mjs` to ensure 100% resilient image delivery without server crashes.
2. **Local Academic Asset Priority:** Key identity, campus, and leadership assets are hosted locally in `public/assets/`, preventing any external downtime from breaking the primary institutional pages.
3. **Canonical Event Galleries:** The 204 event gallery albums reference canonical event photos mapped from the official website archive. If an image is unavailable upstream, clean SVG placeholder fallbacks prevent broken visual boxes.


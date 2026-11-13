# PACE ITS — Modern Design System Specification
**Development Organization:** GT InnoX LLP  
**Reference Domain:** `https://pace.ac.in/`  
**Design Reference Inspiration:** Flame University Visual Composition  

---

## 1. Visual Identity & Color Palette

The design system merges prestigious academic gravitas with contemporary international digital aesthetics:

| Color Token | Hex Code | Role & Usage |
|---|:---:|---|
| **Primary Navy** | `#073B60` | Main institutional background, primary headings, navbars, cards |
| **Deep Navy** | `#052D49` | Editorial hero banners, top-tier leadership sections, dark footers |
| **Dark Background** | `#062C46` | Full-width contrast sections, research showcases |
| **Golden Accent** | `#E9AC21` | Call-to-action buttons, active badges, highlights, icons |
| **Secondary Gold** | `#F6C54A` | Hover states, glowing accents, badge text |
| **Pure White** | `#FFFFFF` | Card surfaces, typography on dark backgrounds |
| **Light Background** | `#F5F7F9` | Page canvas, alternating section backgrounds |
| **Body Text** | `#283746` | High-contrast readable body paragraphs |
| **Muted Text** | `#718096` | Subheadings, dates, metadata labels |
| **Border Tone** | `#E4E9EF` | Card outlines, dividers, structured table borders |

---

## 2. Typography Hierarchy

1. **Oswald (`font-condensed`)**:
   - Used for bold uppercase hero headlines, section headers, stats counters, and prominent CTA buttons.
   - Inspired by Flame University's condensed, editorial headline composition.
2. **Inter (`font-sans`)**:
   - Primary typeface for body paragraphs, subheadings, table records, and navigation links.
   - Exceptional legibility across desktop, tablet, and mobile displays.
3. **Playfair Display (`font-editorial`)**:
   - Reserved for leadership quotes, executive messages, and academic mission statements.

---

## 3. Header & Navigation Architecture

- **TopBar (`TopBar.tsx`)**:
  - Displays UGC Autonomous status, NAAC 'A' Grade, NBA accreditations, contact helpline, and quick portal links (ECAP ERP, Alumni, Grievance, Examinations).
- **Header (`Header.tsx`)**:
  - Transparent overlay atop the cinematic hero on initial load.
  - Smoothly transitions to solid `#073B60` with elevation shadow upon scrolling.
  - Left: Institutional logo, Autonomous crest, and official typography.
  - Center: Academics, Programs, Faculty, Careers, Visit, Apply dropdowns.
  - Right: Gold "APPLY NOW" button, search modal trigger, and mobile drawer toggle.
- **Search Modal (`SearchModal.tsx`)**:
  - Global search index across all 343 routes, departments, regulations, and circulars with instant keyboard navigation (ESC to close).
- **Mobile Drawer (`MobileNav.tsx`)**:
  - Responsive off-canvas drawer with collapsible multi-level accordions and quick admission contact actions.

---

## 4. Homepage Cinematic Hero System

- Full-viewport (70–85vh, minimum 650px) cinematic carousel.
- Left-aligned text composition: Golden category badge, massive uppercase Oswald headline, Playfair italic subhead, dual action CTAs.
- Right-aligned architectural and student photography inside a rounded elevation frame with floating real-time stats badge.
- Bottom horizontal timeline with golden progress indicators and manual slide controls.
- 4 verified institutional slides:
  1. *Shaping the Engineers & Leaders of Tomorrow*
  2. *Admissions Open for B.Tech, M.Tech & MBA (2026–27)*
  3. *Industry 4.0 Careers & Record Placements*
  4. *Advancing Patents & AICTE IDEA Lab*

---

## 5. UI Component Library

- **`DataTable.tsx`**: Mobile-responsive, zebra-striped data table for syllabus, fees, committee rosters, and regulations.
- **`DocumentList.tsx`**: Filterable, searchable document cards with download triggers and format badges.
- **`Breadcrumb.tsx`**: Structured breadcrumb navigation with schema.org compliance.
- **`DepartmentsGrid.tsx`**: Filterable cards for B.Tech, Postgraduate, and Diploma programs.
- **`PlacementsHighlight.tsx`**: Placement metric callouts (1200+ offers, 100% assistance) and marquee of 150+ recruiters.
- **`ResearchInnovation.tsx`**: Patent archives, AICTE IDEA Lab spotlight, and open-access PACE Publishers.


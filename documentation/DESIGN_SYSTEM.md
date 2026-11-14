# PACE ITS Design System & UI Specification

**Organization:** GT InnoX LLP  
**Client:** PACE Institute of Technology & Sciences (Autonomous)  
**Design Reference:** Vikas Institutions Nunna (Structure & Simplicity) + Flame University (Editorial & Photography)  
**Framework:** Next.js 14, Tailwind CSS, TypeScript  

---

## 1. Visual Identity & Palette

The design system establishes a restrained, high-contrast academic identity.

| Token Name | Hex Code | Utility Class | Semantic Purpose |
| :--- | :--- | :--- | :--- |
| **Primary Navy** | `#123D5A` | `bg-[#123D5A]`, `text-[#123D5A]` | Primary buttons, headers, section titles, card accents |
| **Deep Navy** | `#0B2C43` | `bg-[#0B2C43]`, `text-[#0B2C43]` | Global top bar, footer, dark hero banners, modal headers |
| **Accent Gold** | `#E5AD35` | `bg-[#E5AD35]`, `text-[#E5AD35]` | Academic badges, primary CTAs, active tab underlines, borders |
| **Gold Light** | `#F6C54A` | `bg-[#F6C54A]`, `text-[#F6C54A]` | Hover state for gold buttons, highlights |
| **Canvas Background** | `#F8FAFB` | `bg-[#F8FAFB]` | Default page background across all 343 canonical routes |
| **Light Surface** | `#F1F4F6` | `bg-[#F1F4F6]` | Alternating content sections, subtle card wells |
| **Main Text** | `#172B3A` | `text-[#172B3A]` | Primary headings and readable body text |
| **Secondary Text** | `#687783` | `text-[#687783]` | Captions, metadata, breadcrumb links, table subtitles |
| **Border Neutral** | `#E2E8F0` | `border-[#E2E8F0]` | Table borders, card dividers, input borders |
| **Card White** | `#FFFFFF` | `bg-white` | Information cards, data tables, modal dialogs |

---

## 2. Typography Scale

- **Font Family Primary:** `Inter`, `Manrope`, system-ui, sans-serif
- **Font Family Headings:** `Oswald`, `Impact`, sans-serif (Strong uppercase tracking)
- **Font Family Editorial:** `Playfair Display`, `Georgia`, serif (Leadership messages)

| Style | Classes | Example Usage |
| :--- | :--- | :--- |
| **Display 1** | `font-condensed text-4xl sm:text-5xl font-black uppercase tracking-tight` | Hero slides, primary page titles |
| **Display 2** | `font-condensed text-2xl sm:text-3xl font-extrabold uppercase tracking-tight` | Section headings, modal titles |
| **Section Eyebrow**| `font-sans text-xs font-bold uppercase tracking-wider text-[#E5AD35]` | Pre-headers, badges |
| **Card Heading** | `font-sans text-base font-bold text-slate-800` | Department cards, faculty names |
| **Body Large** | `font-sans text-base leading-relaxed text-[#172B3A]` | Introductory paragraphs |
| **Body Regular** | `font-sans text-sm leading-relaxed text-[#687783]` | Standard content, table cells |
| **Caption / Meta** | `font-sans text-xs text-[#687783]` | Timestamps, author names, circular IDs |

---

## 3. Core UI Component Library

Located in `src/components/ui/`:

1. **`Button`** (`Button.tsx`)
   - `variant`: `'primary'` (Navy `#123D5A`), `'gold'` (Accent `#E5AD35`), `'outline'`, `'ghost'`, `'danger'`.
   - `size`: `'sm'`, `'md'`, `'lg'`.
   - Supports `href` (internal Next.js `Link` or external `<a>`).
2. **`Badge`** (`Badge.tsx`)
   - `variant`: `'default'`, `'gold'`, `'success'`, `'warning'`, `'info'`, `'outline'`.
   - Supports leading icons (e.g., Award, CheckCircle, GraduationCap).
3. **`Card`** (`Card.tsx`)
   - Composite structure: `Card`, `CardHeader`, `CardContent`, `CardFooter`.
   - `hoverEffect`: Subtle lift and border accent transition.
4. **`SectionHeading`** (`SectionHeading.tsx`)
   - Eyebrow badge, uppercase bold title, descriptive subtitle, optional action slot.
   - `align`: `'left'` or `'center'`.
5. **`Container`** (`Container.tsx`)
   - Responsive width containment (`default` max-w-7xl, `narrow` max-w-5xl, `wide` max-w-[1400px]).
6. **`Tabs`** (`Tabs.tsx`)
   - Interactive tab switcher (`underline` or `pills` variant) with badge counters.
7. **`Accordion`** (`Accordion.tsx`)
   - Accessible collapsible drawers for BOS syllabi, examination regulations, and FAQs.
8. **`Modal`** (`Modal.tsx`)
   - Dialog overlay with escape key handling, body scroll locking, and accessible close button.
9. **`Skeleton`** & **`EmptyState`** (`Skeleton.tsx`, `EmptyState.tsx`)
   - Visual feedback for loading and empty records.
10. **`BackToTop`** (`BackToTop.tsx`)
    - Floating smooth-scroll button active after 400px of scrolling.

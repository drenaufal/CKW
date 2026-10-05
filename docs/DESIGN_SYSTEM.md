# Design Document & Visual Architecture (Design System)

## Project Name: PT. Cempaga Karya Wijaya (CKW) Enterprise Corporate Portal & Industrial CMS

---

### Document Information
- **Document Version:** 1.0.0
- **Status:** Approved / Design System Standard
- **Frameworks:** Tailwind CSS v4, Lucide Icons, CSS Custom Properties
- **Target Audience:** UI/UX Designers, Frontend Engineers, Brand Managers, and QA Engineers
- **Effective Date:** October 2026

---

## 1. Design Philosophy & Brand Identity

### 1.1 Brand Essence: "Quality in Every Grain"
The visual identity of **PT. Cempaga Karya Wijaya (CKW)** reflects the precision, scale, and high-purity mineral engineering of a modern industrial quartz sand processor. Unlike generic commercial websites, the aesthetic communicates:
- **Heavy Industrial Authority:** Deep oceanic navy blues representing maritime bulk logistics and high-capacity plant operations.
- **Mineral Precision & Quality:** Rich warm gold accents evoking high-value quartz minerals, solar photovoltaic purity, and premium manufacturing standards.
- **Laboratory Transparency:** Clean white and light slate gray surfaces providing high contrast for chemical assays, ASTM particle size distribution tables, and certified specifications.

### 1.2 Anti-Slop & Professionalism Discipline
- **Zero-Pill Overuse:** Buttons and card components use subtle, engineered rounded corners (`rounded-xl` or `rounded-lg`, 8–12px) rather than toy-like full pills (`rounded-full`), except for micro-status tags.
- **Strict Visual Hierarchy:** Generous whitespace, precise line-heights, and clear typographic distinction between executive headlines, body text, and tabular engineering metrics.
- **Real Engineering Imagery:** Authentic photography of wet beneficiation equipment, hydro-cyclones, rotary kilns, bulk maritime loading jetties, and laboratory assays.

---

## 2. Color Palette & Semantic Design Tokens

### 2.1 Primary Brand Colors

| Token Name | Hex Code | Tailwind Utility | Visual Role |
| :--- | :--- | :--- | :--- |
| **Brand Navy 950** | `#0a1128` | `bg-brand-navy-950` / `text-brand-navy-950` | Primary brand canvas, header background, sidebar surface, high-contrast dark text. |
| **Brand Navy 900** | `#111d4a` | `bg-brand-navy-900` / `border-brand-navy-900` | Secondary dark surface, dark card backgrounds, header borders, subtle dividers. |
| **Brand Navy 800** | `#1c2a63` | `bg-brand-navy-800` | Hover states on dark elements, active menu item backgrounds. |
| **Brand Gold 500** | `#d4af37` | `bg-brand-gold-500` / `text-brand-gold-500` | Primary brand accent, primary CTA buttons, featured badges, key highlight borders. |
| **Brand Gold 400** | `#e1be4d` | `bg-brand-gold-400` / `text-brand-gold-400` | Interactive hover state for gold elements, high-visibility icons on dark backdrops. |
| **Brand Gold 600** | `#b59325` | `text-brand-gold-600` | Darker gold for text on light backgrounds to ensure WCAG AA contrast. |
| **Brand Blue 600** | `#1e40af` | `bg-brand-blue-600` / `text-brand-blue-600` | Engineering & technical accent, section eyebrows, active filter badges. |
| **Brand Blue 50** | `#eff6ff` | `bg-brand-blue-50` | Background for technical tables and parameter highlighting. |

### 2.2 Neutral & Surface Spectrum

| Token Name | Hex Code | Tailwind Utility | Visual Role |
| :--- | :--- | :--- | :--- |
| **Neutral 900** | `#0f172a` | `text-neutral-900` | Primary body text on light backgrounds, table headings. |
| **Neutral 700** | `#334155` | `text-neutral-700` | Secondary body text, form field labels, specifications descriptions. |
| **Neutral 500** | `#64748b` | `text-neutral-500` | Subtitles, breadcrumbs, placeholder text, inactive icons. |
| **Neutral 200** | `#e2e8f0` | `border-neutral-200` | Primary container borders, table dividing lines, input field borders. |
| **Neutral 100** | `#f1f5f9` | `bg-neutral-100` | Secondary light backgrounds, filter bar background, table alternate row strips. |
| **Neutral 50** | `#f8fafc` | `bg-neutral-50` | Page body background, alternating section backgrounds. |
| **Pure White** | `#ffffff` | `bg-white` / `text-white` | Card surfaces, modal containers, light background canvas. |

### 2.3 Semantic Status Indicators

| Status | Background | Text / Icon | Border | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Success** | `bg-green-50` | `text-green-700` | `border-green-200` | Inquiry submitted, Zoho sync healthy, copy to clipboard confirmation. |
| **Warning** | `bg-amber-50` | `text-amber-800` | `border-amber-200` | Incomplete parameter notice, duplicate spec row warning. |
| **Error** | `bg-red-50` | `text-red-700` | `border-red-200` | Form validation failure, network retry alert, error boundary alert. |
| **Info / Tech** | `bg-blue-50` | `text-blue-700` | `border-blue-200` | ASTM test method reference, COA certification marker. |

---

## 3. Typography System

The typography pairs an authoritative, architectural display typeface with a clean, high-legibility geometric sans-serif for body copy and technical tables.

### 3.1 Typeface Families
- **Display Headings (`font-display`):** `Syne`, `Montserrat`, system-ui fallback. Used for executive hero headlines, section titles, and modal headers.
- **Body & Interface (`font-sans`):** `Plus Jakarta Sans`, `Inter`, -apple-system, sans-serif. Used for body paragraphs, button copy, navigation links, and form fields.
- **Engineering & Data (`font-mono`):** `JetBrains Mono`, `SFMono-Regular`, Menlo, monospace. Used for chemical formulas ($\text{SiO}_2$, $\text{Fe}_2\text{O}_3$), inquiry tracking codes, and mesh aperture dimensions.

### 3.2 Typographic Hierarchy & Scale

| Style Level | Font Family | Weight | Size (Desktop / Mobile) | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | Display | ExtraBold (800) | `48px` / `32px` (`text-3xl` to `text-5xl`) | `1.15` | `-0.02em` |
| **Section H2** | Display | Bold (700) | `36px` / `24px` (`text-2xl` to `text-4xl`) | `1.2` | `-0.015em` |
| **Card H3** | Display | Bold (700) | `20px` / `18px` (`text-lg` to `text-xl`) | `1.3` | `-0.01em` |
| **Section Eyebrow** | Sans | SemiBold (600) | `12px` / `11px` (`text-xs`) | `1.4` | `+0.18em` (Uppercase) |
| **Body Large** | Sans | Regular (400) | `18px` / `16px` (`text-base` to `text-lg`) | `1.6` | `normal` |
| **Body Standard** | Sans | Regular (400) | `14px` / `14px` (`text-sm`) | `1.55` | `normal` |
| **Micro Caption / Table** | Sans | Medium (500) | `12px` / `11px` (`text-xs`) | `1.4` | `normal` |
| **Engineering Metric** | Mono | Bold (700) | `14px` / `13px` (`text-sm` mono) | `1.2` | `normal` |

---

## 4. Layout Architecture & Spatial Grid

### 4.1 Master Shell Architecture
The public application utilizes an asymmetrical layout architecture designed for rapid discovery:

```
+-----------------------------------------------------------------------------------+
| Top Brand Bar: Logo + Company Name + Contact Quicklinks + Lang (ID/EN) + Menu Btn |
+-----------------------+-----------------------------------------------------------+
|                       | Page Header Breadcrumbs Banner                            |
| Collapsible Left      | (Category, Page Title, Context Badges, Quick CTA)         |
| Navigation Sidebar    +-----------------------------------------------------------+
| (Home, About,         |                                                           |
| Operations, Products, | Main Content Canvas (Dynamic route children)              |
| Industries,           |                                                           |
| Logistics, Contact,   | (Adjusts left padding: lg:pl-72 when open, lg:pl-0 closed)|
| Admin Access)         |                                                           |
|                       +-----------------------------------------------------------+
|                       | Comprehensive Corporate Footer                            |
+-----------------------+-----------------------------------------------------------+
```

### 4.2 Spacing & Grid Scale
- **Grid Container:** Standard max-width `max-w-7xl` (1280px) with responsive horizontal padding:
  - Mobile: `px-4` (16px)
  - Tablet: `px-6` (24px)
  - Desktop: `px-8` (32px)
- **Vertical Section Rhythm:**
  - Standard Sections: `py-16` to `py-24` (64px to 96px).
  - Compact Banner Zones: `py-8` to `py-12` (32px to 48px).
- **Component Padding:**
  - Cards: `p-6` (24px) standard; `p-4` (16px) on mobile.
  - Buttons: `px-5 py-2.5` (compact) or `px-6 py-3.5` (hero primary).
  - Form Inputs: `px-4 py-3` with generous target height $\ge 44\text{px}$ for touch accessibility.

---

## 5. Core Component Design Specifications

### 5.1 Header & Brand Bar
- **Height:** Sticky top, `h-[74px]` (mobile), `h-[82px]` (tablet), `h-[90px]` (desktop).
- **Background:** `bg-brand-navy-950` with subtle border `border-b border-brand-navy-900/90` and elevation shadow.
- **Logo Presentation:** High-definition vector emblem enclosed in a gold-accented protective container (`w-11 h-11` to `w-13 h-13`) alongside bold corporate typography (*PT. CEMPAGA KARYA WIJAYA*).
- **Menu Toggle Button:** 3-stripe hamburger button with high-contrast hover state and gold highlight when active.

### 5.2 Collapsible Sidebar Navigation
- **Dimensions:** Fixed width `w-72` (288px), stretching from header bottom to screen bottom (`top-[74px/90px]` to `bottom-0`).
- **Motion:** Hardware-accelerated CSS transform `transform: translateX(0)` vs `transform: translateX(-100%)` with `300ms cubic-bezier(0.4, 0, 0.2, 1)`.
- **Items:** Distinct icon-text pairs with subtle hover backgrounds (`hover:bg-brand-navy-900`) and active route indicator (gold left border or gold background highlight).

### 5.3 Breadcrumbs & Hero Subheaders
- **Structure:** Two-tiered layout with dark gradient or clean slate backdrop, displaying current route hierarchy, bold page title, category chip, and contextual action button.
- **Badges:** High-contrast pill badges highlighting operational scale (e.g., `KEMURNIAN TINGGI SIO2 ≥ 99.3%`, `KAPASITAS 50.000 MT/BULAN`).

### 5.4 Industrial Product Cards
- **Structure:**
  - Card container: `bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300`.
  - Image banner: 16:9 ratio with aspect fill, gradient overlay, and grade badge.
  - Chemical composition bar: Highlighting $\text{SiO}_2$ and $\text{Fe}_2\text{O}_3$ metrics with visual progress indicators.
  - Quick specs list: Grain size (AFS/Mesh), moisture content, and packaging options.
  - Dual action footer: "Lihat Spesifikasi Lab" (Secondary) and "Minta Penawaran" (Primary gold).

### 5.5 Interactive Technical Assay Modal
- **Overlay:** `bg-brand-navy-950/80` with background blur `backdrop-blur-sm`.
- **Dialog Box:** `max-w-3xl w-full rounded-2xl bg-white shadow-2xl border border-neutral-200`.
- **Tabbed Views:**
  1. *Chemical Assay:* Purity parameters, oxides breakdown ($\text{SiO}_2, \text{Fe}_2\text{O}_3, \text{Al}_2\text{O}_3, \text{TiO}_2$), test methods, and pass/fail thresholds.
  2. *Sieve Analysis (ASTM C-136):* Mesh size distribution table with aperture dimensions, typical retention %, and tolerance bounds.
  3. *Overview & Applications:* Recommended furnace types and industrial handling protocols.
- **Copy to Clipboard Utility:** Formatted plain-text specification output with instant green confirmation check icon.

### 5.6 Commercial RFQ & Contact Form
- **Form Layout:** Responsive two-column input grid with clear asterisk markers for mandatory fields.
- **Validation Styling:** Red border and alert icon for invalid inputs; green confirmation check on valid completion.
- **Success State:** High-visibility confirmation card displaying the generated Inquiry Tracking Code, WhatsApp follow-up bridge, and expected response time ($\le 24\text{ hours}$).

### 5.7 Admin CMS Interface
- **Theme:** Dark executive navigation sidebar with clean slate canvas for data management.
- **Data Tables:** Dense, scannable tabular grids with alternating row fills, status chips, quick-action icon buttons (Edit, Delete, Resend Zoho), and inline search.
- **Non-blocking Toasts:** Reactive notification banners at the top of the viewport replacing disruptive native browser alerts.

---

## 6. Accessibility & Responsiveness Guidelines

### 6.1 WCAG 2.1 AA Compliance
- **Color Contrast:** All body text maintains $\ge 4.5:1$ contrast ratio against backgrounds. Header text and large headings maintain $\ge 3.0:1$.
- **Interactive Targets:** All buttons, toggles, and navigation links feature minimum touch targets of $44\text{px} \times 44\text{px}$.
- **Focus Management:** Visible focus rings (`focus:ring-2 focus:ring-brand-gold-400 focus:outline-none`) across all keyboard-focusable elements.
- **Screen Reader Support:** Semantic HTML tags (`<header>`, `<aside>`, `<main>`, `<nav>`, `<footer>`) with explicit `aria-label` attributes on icon-only buttons.

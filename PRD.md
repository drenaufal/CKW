# Product Requirements Document (PRD)

## Project Name: PT. Cempaga Karya Wijaya (CKW) Enterprise Corporate Portal & Industrial CMS

---

### Document Information
- **Document Version:** 2.0.0
- **Status:** Approved / Production-Ready
- **Platform Framework:** Next.js , Tailwind CSS
- **Target Audience:** Executive Leadership, Commercial Sales Desk, Plant Operations, Technical Quality Assurance, Industrial Buyers, and Engineering Teams
- **Effective Date:** October 2026

---

## 1. Executive Summary & Strategic Vision

### 1.1 Company Background
**PT. Cempaga Karya Wijaya (CKW)** is a premier Indonesian industrial silica mineral processing and manufacturing enterprise headquartered in Rembang Regency, Central Java. Operating along the strategic Java Pantura National Highway corridor—within ±10 km of the deep-sea Port of Rembang—the company refines high-grade raw silica sand sourced from certified concessions in Central Kalimantan into high-purity industrial silica products ($\text{SiO}_2 \ge 99.3\%$, ultra-low iron $\text{Fe}_2\text{O}_3 \le 120\text{ ppm}$).

### 1.2 Product Vision
The digital corporate portal and Content Management System (CMS) functions as the single source of truth and primary commercial gateway for PT. Cempaga Karya Wijaya. It bridges international procurement standards with local manufacturing prowess by delivering:
1. **Interactive Technical Discovery:** Complete access to physical assays, chemical compositions, ASTM particle size distributions (PSD), and Certificate of Analysis (COA) data.
2. **Seamless Commercial Transactions:** Digital Request for Quotation (RFQ) processing, sample trial dispatch requests, and rapid multi-channel sales communication.
3. **Enterprise Zoho Integration:** Direct real-time synchronization with Zoho Workplace (Zoho Mail REST API, Zoho Cliq automated sales channel webhooks, and Zoho WorkDrive digital asset repository).
4. **Internal Operational Governance:** Comprehensive administrative control over bilingual catalog data, section copy, inquiry management, and immutable audit logs.

### 1.3 Key Strategic Differentiators
- **Scale:** 50,000 Metric Tons (MT) / month operational capacity.
- **Purity:** Premium float glass and solar photovoltaic (PV) grade quartz sand with $\text{SiO}_2 \ge 99.3\%$ and $\text{Fe}_2\text{O}_3 \le 0.020\%$.
- **Logistics Hub:** Multimodal dispatch via 300ft barges (7,500 DWT) at Rembang Port bulk jetty and heavy-duty dump trucks along the Pantura corridor.
- **Sustainability:** $\ge 90\%$ closed-loop process water recycling with zero liquid discharge into municipal waterways.

---

## 2. User Personas & Stakeholder Analysis

| Stakeholder Persona | Key Needs & Objectives | Core System Capabilities |
| :--- | :--- | :--- |
| **Industrial Procurement Director** *(Glass, Solar, Cement, Foundry)* | Evaluates monthly supply guarantees, commercial pricing tiers, Minimum Order Quantities (MOQ), and shipping lead times (FOB/CIF). | Product catalog, Logistics specification matrix, Commercial RFQ form with pre-selected product context, WhatsApp sales bridge. |
| **Plant Quality Assurance / Ceramic Engineer** | Requires exact chemical purity tolerances, AFS fineness numbers, sieve retention curves, and ASTM testing methods. | Interactive Technical Assay Modal, ASTM C-136 Sieve Analysis tables, One-click "Copy Spec Sheet" utility. |
| **International Commodity Trader / ASEAN Importer** | Needs foreign trade information: deep-sea port berth draft, loading rates (MT/day), export packing (1.0–1.5 MT Jumbo Bags), and English documentation. | Bilingual locale switcher (ID/EN), Port specifications, Incoterms reference, Currency & packing details. |
| **CKW Commercial Desk & Sales Operations** | Manages inbound RFQs, customer qualification, quote follow-ups, and negotiation notes. | Admin Inquiry Manager, Lead status workflow (New, Read, Contacted, Quoted, Closed), Zoho integration triggers. |
| **Corporate Content Administrator** | Updates company profile information, publishes new product grades, updates media assets, and audits system access. | Section Content Manager, Product Specification Builder, Media Library, Audit Log Viewer. |

---

## 3. Product Scope & Functional Requirements

### 3.1 Public Portal Functional Modules

#### 3.1.1 Responsive Shell & Navigation
- **Persistent Header:** Displays official company emblem, company name (*PT. Cempaga Karya Wijaya*), tagline (*Quality in Every Grain*), quick contact info (phone/email), and language switcher (ID/EN).
- **Collapsible Sidebar Menu:** Smooth slide-out left navigation drawer triggered by the hamburger icon. Supports keyboard accessibility (`Escape` key dismiss), overlay backdrop, and automatic active route indicators.
- **Breadcrumbs System:** Contextual header banner across all subpages detailing the current category, page title, summary badge, and quick action buttons.

#### 3.1.2 Public Routing Architecture
1. **Home (`/`):**
   - Executive hero section with dynamic key value propositions and dual CTAs ("Lihat Produk" & "Hubungi Sales").
   - Metric counters: 50.000 MT/Bulan, 99.3% SiO2 Purity, ±10 KM ke Pelabuhan, 9 Sektor Industri.
   - Company profile summary, featured silica grades preview, 7-stage refining overview, logistics snapshot, and competitive advantage pillars.
2. **About Us (`/about`):**
   - Corporate history, strategic location narrative in Rembang, geographic coordinates, and industrial hub advantages.
   - Corporate Vision & 6 Strategic Missions.
   - Corporate Core Values (BISA Framework: Berintegritas, Inovatif, Sinergis, Akuntabel).
   - Sustainability & ESG commitments: $\ge 90\%$ water recycling, dust suppression scrubbers, progressive mining land reclamation.
   - Legal certifications: IUP Operasi Produksi, standard operating procedures, and ISO 9001/14001 readiness.
3. **Operations & Facilities (`/operations`):**
   - 7-Stage Beneficiation Process:
     1. Raw Mineral Sourcing (Central Kalimantan via Sea Barge)
     2. Mechanical Blending & Homogenization
     3. Multi-Stage High-Pressure Hydro-Washing
     4. Attrition Scrubbing & Clay De-Sliming
     5. High-Intensity Wet Magnetic Separation (WHIMS)
     6. Fluidized Bed & Rotary Kiln Drying (<0.2% moisture)
     7. Vibratory Multi-Deck Grading Screens & Automated Bagging
   - Plant equipment showcase, on-site testing lab (XRF Spectrometry, Sieve shakers, Moisture analyzers), and custom formulation consultation.
4. **Products Catalog (`/products`):**
   - Interactive category filtering: All, Glass & Solar PV, Foundry & Metal Casting, Water Filtration, Construction & Mortar, Silica Flour.
   - Real-time search by keyword, grade name, application, or chemical marker.
   - Product cards displaying key chemical composition, grain size, packaging options, and status.
   - Technical Assay Modal triggered on demand with ASTM C-136 Sieve Analysis and copy-to-clipboard functionality.
5. **Industries Served (`/industries`):**
   - Deep-dive into 9 industrial sectors: Float & Container Glass, Solar Photovoltaic Glass, Automotive Foundry Casting, Industrial Water Filtration, Ready-Mix & Construction Mortar, Ceramics & Porcelain Tiles, Chemical & Sodium Silicate, Oil & Gas Frac Sand, and Epoxy Flooring.
   - Specific chemical and physical requirements per industry.
6. **Logistics & Supply Chain (`/logistics`):**
   - Multimodal shipping options: Inland heavy trucking (20-40 MT), Bulk sea barges (300ft / 5,000-7,500 MT), and Containerized export shipments.
   - Rembang Sea Jetty specifications: 8.5 m draft, 800-1,200 MT/hour loading conveyor rate.
   - Delivery terms and Incoterms support (FOB Port Rembang, CIF destination, Franco Pabrik).
7. **Contact & Commercial RFQ (`/contact`):**
   - Comprehensive RFQ form: Full name, company, email, phone, country, preselected product, quantity (MT), and technical message.
   - Live pre-selection link from product catalog (`/contact?product=Grade%20A`).
   - Submission handler generating an immutable Inquiry Code (e.g., `CKW-INQ-2026-XXXX`).
   - Integrated commercial FAQs (MOQ, sample policy, payment terms, delivery lead times, custom PSD tolerances).
   - Instant WhatsApp Sales link bridge with formatted international number.

---

### 3.2 Enterprise CMS Functional Modules (`/admin`)

#### 3.2.1 Authentication & Security
- Secure credentials validation for roles: `superadmin` and `editor`.
- Demo access assistance credentials with role-based feature gating.
- Safe, non-blocking local storage session management.
- Complete audit logging of all login, logout, and modification events.

#### 3.2.2 Admin Dashboard
- High-level KPIs: Total products published, total inquiries received, unread leads, active Zoho integrations, and recent audit logs.
- Quick status triage for inbound commercial inquiries.

#### 3.2.3 Section Content Manager
- Simultaneous bilingual (ID/EN) editing of headline copy, descriptions, badges, and metrics across all 7 corporate sections:
  1. Hero Banner
  2. About Company
  3. Location & Port Hub
  4. Logistics & Supply Chain
  5. Vision, Mission & Values
  6. Sustainability & ESG
  7. Contact Information & Office Details

#### 3.2.4 Product & Specification Manager
- Full CRUD operations for industrial silica products (Add, Edit, Publish/Draft, Sort, Delete).
- Integrated **Product Specification Editor**:
  - Chemical composition matrices ($\text{SiO}_2$, $\text{Fe}_2\text{O}_3$, $\text{Al}_2\text{O}_3$, $\text{TiO}_2$, $\text{LOI}$).
  - Physical properties (AFS grain fineness, Mohs hardness, specific gravity, bulk density, pH value).
  - Dynamic laboratory test parameter rows with custom test methods (ASTM / XRF / Gravimetric).
  - ASTM C-136 Sieve Analysis mesh distribution builder with typical retention and specification ranges.
  - Industry specification templates (Float Glass, Solar PV, Foundry, Filtration) for one-click parameter loading.

#### 3.2.5 Commercial Inquiries Manager
- Searchable and filterable inbox of customer RFQs.
- Status management pipeline: `NEW`, `READ`, `CONTACTED`, `QUOTED`, `CLOSED`.
- Internal commercial notes draft and storage.
- Manual Zoho webhook re-trigger action with reactive in-UI toast feedback.

#### 3.2.6 Zoho Workplace Suite Integration
- Configuration manager for Zoho Mail REST API, Zoho Cliq webhook alerts, and Zoho WorkDrive.
- Service diagnostic ping testing for Zoho Mail, Cliq, and WorkDrive.
- Live integration log viewer detailing HTTP status, payloads, and response timestamps.

#### 3.2.7 Media Library & Asset Manager
- Asset repository supporting images, COA PDFs, and logo vectors.
- Instant copy URL tool with safe clipboard handling.
- Asset tagging and metadata indexing.

#### 3.2.8 Audit Trail & System Log Viewer
- Immutable chronological record of all administrative actions: `UPDATE_SECTION`, `CREATE_PRODUCT`, `UPDATE_PRODUCT`, `DELETE_PRODUCT`, `UPDATE_INQUIRY`, `ZOHO_DISPATCH`, `ADMIN_LOGIN`.
- Search and filter by action type, entity, or actor.

---

## 4. Non-Functional Requirements (NFRs)

### 4.1 Performance & Responsiveness
- **First Contentful Paint (FCP):** $\le 0.8\text{ seconds}$ on standard 4G networks.
- **Largest Contentful Paint (LCP):** $\le 1.8\text{ seconds}$.
- **Cumulative Layout Shift (CLS):** $\le 0.05$.
- **Dev Server Startup Time:** $\le 1.0\text{ second}$ using Next.js Turbopack runner.
- **Adaptive Layout:** Responsive across viewports: Mobile ($320\text{px} - 639\text{px}$), Tablet ($640\text{px} - 1023\text{px}$), Desktop ($1024\text{px} - 1439\text{px}$), and Ultra-wide ($\ge 1440\text{px}$).

### 4.2 Security & Data Integrity
- **IFrame Sandboxing:** Resilient against restricted iframe environments where storage or clipboard access might be blocked.
- **XSS & Injection Protection:** Strict React JSX attribute escaping; form inputs sanitized before processing.
- **Secret Management:** Server-side environment variables isolated from browser-facing bundles (`process.env.GEMINI_API_KEY` without `NEXT_PUBLIC_`).
- **Dialog Safety:** Elimination of blocking browser dialogs (`window.alert`, `window.confirm`) in favor of reactive in-UI modals and toasts.

### 4.3 Reliability & Availability
- Defensive fallback mechanisms for local storage operations.
- Dedicated error boundaries (`error.tsx`, `global-error.tsx`) and 404 page (`not-found.tsx`).
- Health monitoring endpoint `/api/health` providing machine-readable JSON status.

---

## 5. Success Metrics & Key Performance Indicators (KPIs)
1. **Commercial Conversion:** $\ge 15\%$ increase in valid RFQ submissions through product-linked quote actions.
2. **Technical Self-Service:** $\ge 60\%$ reduction in repetitive sales phone calls for technical COA/assay data due to self-service spec sheets.
3. **Response Velocity:** Inbound RFQ notifications dispatched to sales engineers within $\le 5\text{ seconds}$ via Zoho Cliq webhook.
4. **Uptime:** $99.9\%$ web service availability with automated supervisor recovery.

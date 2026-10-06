# System Design Document (SDD) & Technical Architecture

## Project Name: PT. Cempaga Karya Wijaya (CKW) Enterprise Corporate Portal & Industrial CMS

---

### Document Information
- **Document Version:** 1.0.0
- **Status:** Approved / Production Architecture
- **Runtime Environment:** Node.js 20+ LTS, Next.js 16 (App Router), TypeScript 5.9, Linux Container
- **Port & Ingress:** Local port `3000`, Nginx reverse proxy `80/443`, Control Plane supervisor `8000`
- **Target Audience:** Systems Architects, Full-Stack Engineers, DevOps Engineers, and Security Auditors
- **Effective Date:** October 2026

---

## 1. System Overview & Architectural Topology

### 1.1 Architecture Blueprint
The application is architected as a high-performance, full-stack hybrid web platform leveraging Next.js App Router for server-side rendering (SSR), optimized static asset delivery, API route handlers, and client-side reactive state management.

```
                          [ Client Browser / IFrame Sandbox ]
                                          |
                                    HTTPS / WSS
                                          |
                              [ Nginx Ingress Proxy ]
                                          |
                               Reverse Proxy to Port 3000
                                          |
                  +-----------------------------------------------+
                  |             Next.js 16 Server Host            |
                  |                                               |
                  |  +--------------------+  +------------------+ |
                  |  | App Router UI      |  | API Handlers     | |
                  |  | - Server Layout    |  | - /api/health    | |
                  |  | - Public Pages     |  | - /api/inquiry   | |
                  |  | - Admin CMS Views  |  | - /api/zoho      | |
                  |  +---------+----------+  +--------+---------+ |
                  +------------|----------------------|-----------+
                               |                      |
             +-----------------+                      |
             |                                        |
  [ Client React Tree ]                               |
  - AppProvider (Context)                             |
  - AppShell (Dynamic Nav)                            |
  - DataStorage (Hybrid Storage Engine)               |
  - LocalStorage / Memory Fallback                    |
                                                      v
                                        [ External Enterprise SaaS ]
                                        - Zoho Mail REST API
                                        - Zoho Cliq Webhook Channel
                                        - Zoho WorkDrive Storage
```

### 1.2 Core Architectural Principles
1. **Zero-Flicker Hydration:** Strict server/client component boundaries ensuring HTML streams seamlessly while client components mount cleanly without attribute mismatch warnings.
2. **Resilient Local Persistence:** Complete client-side storage isolation with defensive `try/catch` wrappers ensuring operation inside sandboxed iframes.
3. **Reactive State Synchrony:** A centralized singleton data service that coordinates mutations between public catalog views and administrative CMS tables.
4. **Decoupled Enterprise Integrations:** Asynchronous webhook and REST API triggers for external Zoho services ensuring user interface responsiveness is never blocked by third-party latency.

---

## 2. Frontend Component & State Architecture

### 2.1 Component Hierarchy & Tree Structure

```
src/app/layout.tsx (Root Server Component)
│
└── AppProvider (src/context/AppContext.tsx)
    │
    └── AppShell (src/components/layout/AppShell.tsx)
        ├── Navbar (src/components/public/Navbar.tsx)
        │   ├── Persistent Top Header (Logo, Tagline, Lang, Menu Trigger)
        │   └── Collapsible Left Sidebar (Route Links, Admin Access)
        │
        ├── Main Canvas ({children})
        │   ├── Home Page (src/app/page.tsx)
        │   ├── About Page (src/app/about/page.tsx)
        │   ├── Operations Page (src/app/operations/page.tsx)
        │   ├── Products Page (src/app/products/page.tsx)
        │   ├── Industries Page (src/app/industries/page.tsx)
        │   ├── Logistics Page (src/app/logistics/page.tsx)
        │   ├── Contact Page (src/app/contact/page.tsx)
        │   └── Admin CMS (src/app/admin/page.tsx)
        │
        ├── Footer (src/components/public/Footer.tsx)
        └── ProductDetailModal (src/components/public/ProductDetailModal.tsx)
```

### 2.2 State Management Engine (`AppContext.tsx`)
The global state layer coordinates cross-cutting concerns:
- **`locale` (`'id' | 'en'`):** Drives all translation lookups via `t(locale, key)`. Persisted to storage with iframe error suppression.
- **`content` (`CompanyContent`):** Holds live copy, hero headlines, metrics, plant statistics, logistics parameters, and the active product catalog.
- **`inquiries` (`InquiryItem[]`):** Inbound commercial leads, contact form submissions, and customer negotiation notes.
- **`zohoLogs` (`ZohoIntegrationLog[]`):** Real-time ledger of outbound webhook payloads, timestamps, and delivery statuses.
- **`auditLogs` (`AuditLog[]`):** Immutable compliance log of all configuration changes and admin access.
- **`currentUser` (`AdminUser | null`):** Authentication session state for the administrative portal.

---

## 3. Data Storage & Persistence Layer

### 3.1 Data Storage Architecture (`DataStorageService`)
The application implements a resilient client-side database pattern encapsulated within `src/services/dataStorage.ts`.

```
+-------------------------------------------------------------+
|                     DataStorageService                      |
+-------------------------------------------------------------+
|  Private Memory Cache (In-Memory Mirrors of all entities)   |
|  - hero, about, location, operations, capacities, products  |
|  - inquiries, zohoConfig, zohoLogs, auditLogs               |
+-------------------------------------------------------------+
        |                                       ^
   saveToStorage()                         loadFromStorage()
   removeFromStorage()                         (Hydration)
        |                                       |
        v                                       |
+-------------------------------------------------------------+
|                Browser LocalStorage Engine                  |
|                Prefix: "ckw_portal_v1_"                     |
|  * Wrapped in Defensive Try/Catch Blocks                    |
|  * Falls back to In-Memory Defaults on Storage Blocks       |
+-------------------------------------------------------------+
```

### 3.2 Schema Entities & Relational Models

#### 3.2.1 Product Entity (`ProductItem`)
```typescript
interface ProductItem {
  id: number;
  name_id: string;
  name_en: string;
  slug: string;
  shortDescription_id: string;
  shortDescription_en: string;
  description_id: string;
  description_en: string;
  chemicalComposition_id: string;
  chemicalComposition_en: string;
  particleSize_id: string;
  particleSize_en: string;
  moistureContent_id: string;
  moistureContent_en: string;
  cleanliness_id: string;
  cleanliness_en: string;
  packagingRequirement_id: string;
  packagingRequirement_en: string;
  imageUrl: string;
  status: 'published' | 'draft';
  featured: boolean;
  sortOrder: number;
  assaySiO2?: string;
  assayFe2O3?: string;
  assayAl2O3?: string;
  assayTiO2?: string;
  assayLOI?: string;
  afsFineness?: string;
  mohsHardness?: string;
  specificGravity?: string;
  bulkDensity?: string;
  phValue?: string;
  certificateNotes_id?: string;
  certificateNotes_en?: string;
  specifications?: ProductSpecificationItem[];
  meshDistribution?: ProductMeshItem[];
}
```

#### 3.2.2 Commercial Inquiry Entity (`InquiryItem`)
```typescript
interface InquiryItem {
  id: number;
  inquiryCode: string; // Format: CKW-INQ-YYYY-XXXX
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  productName: string;
  quantity: string;
  message: string;
  status: 'NEW' | 'READ' | 'CONTACTED' | 'QUOTED' | 'CLOSED';
  createdAt: string;
  notes?: string;
  zohoSynced: boolean;
}
```

#### 3.2.3 Audit Log Entity (`AuditLog`)
```typescript
interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  entityType: string;
  entityId?: string | number;
  details: string;
}
```

---

## 4. API & Route Handler Specifications

### 4.1 Health Check API (`/api/health`)
- **Route:** `GET /api/health`
- **Purpose:** Used by container orchestration, load balancers, and monitoring agents to verify server readiness.
- **Response Format:**
  ```json
  {
    "status": "ok",
    "service": "PT. Cempaga Karya Wijaya",
    "framework": "Next.js",
    "timestamp": "2026-10-05T14:56:09.858Z"
  }
  ```
- **HTTP Status:** `200 OK`

### 4.2 Commercial Inquiry Ingestion (`/api/inquiry`)
- **Route:** `POST /api/inquiry`
- **Purpose:** Server-side ingestion of commercial requests for quotation and webhook forwarding.
- **Input Payload:** Validated JSON containing name, company, email, phone, product, and volume.
- **Processing:**
  1. Validates required fields and email syntax.
  2. Generates immutable inquiry code.
  3. Records audit log entry.
  4. Triggers asynchronous Zoho webhook dispatch.

---

## 5. Enterprise Integration Architecture (Zoho Workplace)

The system integrates directly with Zoho Workplace Suite to bridge digital customer inquiries with operational sales workflows:

```
[ Customer Submits RFQ ]
           │
           ▼
[ DataStorage.submitInquiry ]
           │
           ├────────────────────────────┬────────────────────────────┐
           ▼                            ▼                            ▼
[ 1. Zoho Mail REST API ]    [ 2. Zoho Cliq Webhook ]    [ 3. Zoho WorkDrive ]
- Auto-acknowledgment email  - Real-time channel alert   - Cloud document store
- Sales desk lead dispatch   - Sales team notification   - Batch COA & Spec PDFs
```

1. **Zoho Mail Integration:**
   - Pre-formatted transactional email dispatch to `sales@cempagakaryawijaya.com` with full commercial parameters.
   - Automated client receipt containing the unique Inquiry Tracking Code.
2. **Zoho Cliq Real-time Alerts:**
   - Incoming RFQs generate an instant interactive card in the internal sales channel `#ckw-leads`.
   - Displays prospective buyer company name, requested tonnage, and preselected silica grade.
3. **Zoho WorkDrive Digital Assets:**
   - Centralized cloud storage for high-resolution Certificate of Analysis (COA) scans, facility videos, and safety data sheets (MSDS).

---

## 6. Security Architecture & Threat Modeling

### 6.1 Sandbox & IFrame Resilience
- **Defensive Storage Operations:** In iframe environments with third-party cookie restrictions, storage APIs throw `SecurityError`. The application wraps all `localStorage` access in defensive blocks and defaults to in-memory state.
- **Asynchronous Clipboard Protection:** `navigator.clipboard.writeText()` calls are guarded against `NotAllowedError` when the iframe lacks document focus.
- **Elimination of Blocking Dialogs:** `window.alert` and `window.confirm` are blocked by modern iframe sandboxes. All user prompts use reactive non-blocking UI modals and toasts.

### 6.2 Data Validation & Injection Prevention
- **Strict Input Validation:** Email regex validation, length checks, and parameter sanitization on all client and server boundaries.
- **XSS Shielding:** Native React JSX auto-escaping ensures user-submitted messages cannot execute arbitrary scripts.
- **Admin Password Protection:** Role-based access control with session invalidation upon credential changes.

---

## 7. Performance & Optimization Architecture

### 7.1 Turbopack & Bundling Optimization
- **Next.js Turbopack:** Incremental compilation providing sub-second development restarts (`~598ms`).
- **Tree-Shaking:** Explicit named imports from `lucide-react` ensuring unused SVG glyphs are purged from production bundles.
- **Modular Code-Splitting:** Dynamic loading for administrative sub-modules (`ProductSpecificationEditor`, `ZohoWorkplaceSettings`, `MediaLibrary`).

### 7.2 Image Optimization Strategy
- **Next.js `<Image>` Engine:** High-performance responsive image resizing, WebP/AVIF transcoding, and lazy loading.
- **Remote Domain Allow-listing (`next.config.mjs`):** Allowed hosts configured for `images.unsplash.com`, `picsum.photos`, and `images.pexels.com`.
- **Referrer Policy:** `referrerPolicy="no-referrer"` configured across image tags to eliminate host hotlinking restrictions.

---

## 8. Reliability, Monitoring & Process Supervision

### 8.1 Process Supervision Architecture (`dev.mjs`)
To guarantee high availability and eliminate zombie processes across container restarts, the development server is managed by an intelligent supervisor:

```
[ Container Control Plane / Supervisor ]
                   │
                   ▼ (npm run dev)
           [ node dev.mjs ]
                   │
         - Parses port arguments
         - Filters out redundant flags
         - Spawns: npx next dev -p 3000 -H 0.0.0.0
         - Propagates SIGINT / SIGTERM signals cleanly
                   │
                   ▼
       [ Next.js 16 HTTP Server ]
```

### 8.2 Error Boundaries & Resiliency
- **`app/error.tsx`:** Catches segment-level React render errors and provides a non-destructive "Coba Muat Ulang" retry action.
- **`app/global-error.tsx`:** Root fallback catching fatal layout failures while rendering a clean recovery shell.
- **`app/not-found.tsx`:** Custom 404 page preserving navigation context and guiding users back to the home page.
- **Hydration Warning Suppression:** Root `<html>` and `<body>` tags feature `suppressHydrationWarning` to protect against browser extensions altering DOM attributes.

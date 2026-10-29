"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { dataStorage, ProductItem, InquiryItem, AuditLog, ZohoIntegrationLog, MaintenanceConfig } from "@/services/dataStorage";

export interface AdminUser {
  id?: number | string;
  username?: string;
  name: string;
  role: 'superadmin' | 'editor';
}

interface AppContextType {
  locale: "id" | "en";
  setLocale: (locale: "id" | "en") => void;
  products: ProductItem[];
  setProducts: (products: ProductItem[]) => void;
  inquiries: InquiryItem[];
  setInquiries: (inquiries: InquiryItem[]) => void;
  auditLogs: AuditLog[];
  setAuditLogs: (logs: AuditLog[]) => void;
  zohoLogs: ZohoIntegrationLog[];
  setZohoLogs: (logs: ZohoIntegrationLog[]) => void;
  currentUser: AdminUser | null;
  setCurrentUser: (user: AdminUser | null) => void;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  addInquiry: (inquiry: Omit<InquiryItem, 'id' | 'inquiryCode' | 'createdAt' | 'status' | 'zohoSynced'>) => Promise<string>;
  updateInquiryStatus: (id: number | string, status: InquiryItem['status'], notes?: string) => Promise<boolean>;
  maintenanceConfig: MaintenanceConfig;
  setMaintenanceConfig: (config: MaintenanceConfig) => Promise<boolean>;
  toggleMaintenanceMode: (enabled?: boolean) => Promise<boolean>;
  refreshInquiries: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  refreshAuditLogs: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultMaintenanceConfig: MaintenanceConfig = {
  enabled: false,
  title_id: "Portal Resmi Sedang Dalam Pemeliharaan Sistem",
  title_en: "Official Portal Under Scheduled Maintenance",
  message_id: "Kami sedang melakukan pemeliharaan infrastruktur digital terpadu dan sinkronisasi sistem katalog spesifikasi pasir silika PT. Cempaga Karya Wijaya untuk meningkatkan performa layanan. Untuk sementara, halaman informasi publik dinonaktifkan hingga proses pemeliharaan selesai.",
  message_en: "We are currently conducting scheduled infrastructure upgrades and system catalog optimizations for PT. Cempaga Karya Wijaya corporate portal. Public browsing is temporarily suspended while upgrades are finalized.",
  estimatedEnd: "± 1 - 2 Jam",
  contactEmail: "cempagakaryawijaya@gmail.com",
  contactPhone: "+62 823 1516 1767",
};

const defaultProducts: ProductItem[] = [
  {
    id: 1,
    name_id: "Pasir Silika Kaca Float & Otomotif",
    name_en: "Float & Automotive Glass Silica Sand",
    slug: "float-glass-silica",
    shortDescription_id: "Silika kemurnian ultra tinggi (SiO2 ≥ 99.3%, Fe2O3 ≤ 120 ppm) untuk industri kaca lembaran dan arsitektur.",
    shortDescription_en: "Ultra-high purity silica (SiO2 ≥ 99.3%, Fe2O3 ≤ 120 ppm) for flat architectural and automotive glass.",
    description_id: "Pasir silika kualitas prima dengan kadar besi yang sangat rendah dan pengawasan ukuran partikel presisi tinggi untuk menghasilkan kejernihan maksimal pada kaca apung.",
    description_en: "Premium grade silica sand with strictly controlled ultra-low iron levels and narrow grain distribution to deliver maximum light transmission and clarity in float glass.",
    chemicalComposition_id: "SiO2 ≥ 99.3%, Fe2O3 ≤ 0.020%, Al2O3 ≤ 0.20%, TiO2 ≤ 0.02%, LOI ≤ 0.15%",
    chemicalComposition_en: "SiO2 ≥ 99.3%, Fe2O3 ≤ 0.020%, Al2O3 ≤ 0.20%, TiO2 ≤ 0.02%, LOI ≤ 0.15%",
    particleSize_id: "Mesh 30 - 100 (0.15 mm - 0.60 mm)",
    particleSize_en: "Mesh 30 - 100 (0.15 mm - 0.60 mm)",
    moistureContent_id: "≤ 0.2% (Kering Kiln / Dry Kiln)",
    moistureContent_en: "≤ 0.2% (Dry Kiln)",
    cleanliness_id: "Bebas dari kontaminan lempung, organik, dan material asing",
    cleanliness_en: "Free of clay, organic matter, and foreign debris",
    packagingRequirement_id: "Jumbo Bag 1.0 - 1.5 MT atau Curah Tongkang / Truk",
    packagingRequirement_en: "Jumbo Bag 1.0 - 1.5 MT or Bulk Barge / Truck",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070",
    status: "published",
    featured: true,
    sortOrder: 1,
    assaySiO2: "99.45%",
    assayFe2O3: "0.012%",
    assayAl2O3: "0.14%",
    assayTiO2: "0.015%",
    assayLOI: "0.10%",
    afsFineness: "45-50",
    mohsHardness: "7.0",
    specificGravity: "2.65 g/cm³",
    bulkDensity: "1.55 - 1.60 MT/m³",
    phValue: "6.8 - 7.2",
  },
  {
    id: 2,
    name_id: "Pasir Silika Solar PV (Photovoltaic)",
    name_en: "Solar PV Photovoltaic Glass Silica",
    slug: "solar-pv-silica",
    shortDescription_id: "Grade kemurnian ekstrem dengan transmisi cahaya optimal untuk kaca pelindung panel surya.",
    shortDescription_en: "Extreme purity grade ensuring peak optical transmission for photovoltaic panel covers.",
    description_id: "Diproses secara khusus dengan pemisahan magnetik intensitas tinggi (WHIMS) untuk meminimalkan oksida logam penyerap energi matahari.",
    description_en: "Specially processed with high-intensity wet magnetic separation to eliminate light-absorbing metallic oxides for maximal solar efficiency.",
    chemicalComposition_id: "SiO2 ≥ 99.5%, Fe2O3 ≤ 0.010% (100 ppm), Al2O3 ≤ 0.15%, TiO2 ≤ 0.01%",
    chemicalComposition_en: "SiO2 ≥ 99.5%, Fe2O3 ≤ 0.010% (100 ppm), Al2O3 ≤ 0.15%, TiO2 ≤ 0.01%",
    particleSize_id: "Mesh 40 - 120 (0.125 mm - 0.425 mm)",
    particleSize_en: "Mesh 40 - 120 (0.125 mm - 0.425 mm)",
    moistureContent_id: "≤ 0.1%",
    moistureContent_en: "≤ 0.1%",
    cleanliness_id: "Tingkat pembersihan de-sliming ganda",
    cleanliness_en: "Dual stage de-sliming ultra-clean",
    packagingRequirement_id: "Jumbo Bag kedap udara 1.0 MT dengan liner PE",
    packagingRequirement_en: "Airtight 1.0 MT Jumbo Bag with PE liner",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-1200b7b44370?q=80&w=2072",
    status: "published",
    featured: true,
    sortOrder: 2,
    assaySiO2: "99.58%",
    assayFe2O3: "0.008%",
    assayAl2O3: "0.10%",
    assayTiO2: "0.008%",
    assayLOI: "0.08%",
    afsFineness: "50-55",
    mohsHardness: "7.0",
    specificGravity: "2.65 g/cm³",
    bulkDensity: "1.52 - 1.58 MT/m³",
    phValue: "7.0",
  },
  {
    id: 3,
    name_id: "Pasir Silika Pengecoran Logam (Foundry Grade)",
    name_en: "High Refractory Foundry Silica Sand",
    slug: "foundry-silica-sand",
    shortDescription_id: "Ketahanan panas tinggi (titik lebur > 1.700°C) dengan distribusi butir AFS terkontrol ketat untuk cetakan logam.",
    shortDescription_en: "High refractoriness (fusion point > 1,700°C) with strictly controlled AFS grain distribution for metal casting molds.",
    description_id: "Dirancang untuk industri pengecoran besi, baja, dan paduan non-ferrous dengan daya alir (*flowability*) dan permeabilitas gas optimal.",
    description_en: "Engineered for iron, steel, and non-ferrous foundries providing optimal flowability and gas permeability.",
    chemicalComposition_id: "SiO2 ≥ 99.0%, Fe2O3 ≤ 0.10%, Al2O3 ≤ 0.40%, CaO ≤ 0.05%",
    chemicalComposition_en: "SiO2 ≥ 99.0%, Fe2O3 ≤ 0.10%, Al2O3 ≤ 0.40%, CaO ≤ 0.05%",
    particleSize_id: "AFS 45 - 55 / Mesh 40 - 100",
    particleSize_en: "AFS 45 - 55 / Mesh 40 - 100",
    moistureContent_id: "≤ 0.1% (Kiln Dried)",
    moistureContent_en: "≤ 0.1% (Kiln Dried)",
    cleanliness_id: "Kadar lempung (Clay content) < 0.2%",
    cleanliness_en: "Clay content < 0.2%",
    packagingRequirement_id: "Jumbo Bag 1.0 MT atau Curah Truk",
    packagingRequirement_en: "Jumbo Bag 1.0 MT or Bulk Truck",
    imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=2070",
    status: "published",
    featured: true,
    sortOrder: 3,
    assaySiO2: "99.20%",
    assayFe2O3: "0.045%",
    assayAl2O3: "0.32%",
    assayTiO2: "0.02%",
    assayLOI: "0.12%",
    afsFineness: "50-52",
    mohsHardness: "7.0",
    specificGravity: "2.65 g/cm³",
    bulkDensity: "1.58 MT/m³",
    phValue: "7.1",
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<"id" | "en">("id");
  const [products, setProductsState] = useState<ProductItem[]>(defaultProducts);
  const [inquiries, setInquiriesState] = useState<InquiryItem[]>([]);
  const [auditLogs, setAuditLogsState] = useState<AuditLog[]>([]);
  const [zohoLogs, setZohoLogsState] = useState<ZohoIntegrationLog[]>([]);
  const [currentUser, setCurrentUserState] = useState<AdminUser | null>(null);
  const [maintenanceConfig, setMaintenanceConfigState] = useState<MaintenanceConfig>(defaultMaintenanceConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Initial Load: Ambil preferensi non-sensitif dari localStorage & sinkronkan data server
  useEffect(() => {
    // Bersihkan sesi client-side lama agar kebal dari manipulasi localStorage F12
    dataStorage.removeFromStorage("currentUser");

    // Load preferensi bahasa dari localStorage (Aman & Sesuai Best Practice)
    const savedLocale = dataStorage.loadFromStorage("locale", "id");
    setLocaleState(savedLocale);

    // Verifikasi sesi Admin via HttpOnly Cookie ke Server
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUserState(data.user);
        } else {
          setCurrentUserState(null);
        }
      })
      .catch(() => setCurrentUserState(null));

    // Sinkronkan status maintenance dari Server / MySQL
    fetch('/api/settings/maintenance')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data && typeof res.data.enabled === 'boolean') {
          setMaintenanceConfigState((prev) => ({ ...prev, ...res.data }));
        }
      })
      .catch(() => {});

    // Sinkronkan katalog produk dari Server / MySQL
    fetch('/api/products')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.products) && res.products.length > 0) {
          setProductsState(res.products);
        }
      })
      .catch(() => {});

    setIsLoaded(true);
  }, []);

  // 2. Jika Admin sedang terautentikasi, sinkronkan data Inquiry & Audit Logs dari Server
  const refreshInquiries = useCallback(async () => {
    try {
      const res = await fetch('/api/inquiry');
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiriesState(data.inquiries);
      }
    } catch {}
  }, []);

  const refreshAuditLogs = useCallback(async () => {
    try {
      const res = await fetch('/api/audit-logs');
      const data = await res.json();
      if (data.success && Array.isArray(data.logs)) {
        setAuditLogsState(data.logs);
      }
    } catch {}
  }, []);

  const refreshProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && Array.isArray(data.products)) {
        setProductsState(data.products);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (currentUser) {
      refreshInquiries();
      refreshAuditLogs();
    }
  }, [currentUser, refreshInquiries, refreshAuditLogs]);

  const setLocale = (newLocale: "id" | "en") => {
    setLocaleState(newLocale);
    dataStorage.saveToStorage("locale", newLocale);
  };

  const setProducts = (newProducts: ProductItem[]) => {
    setProductsState(newProducts);
  };

  const setInquiries = (newInquiries: InquiryItem[]) => {
    setInquiriesState(newInquiries);
  };

  const setAuditLogs = (newLogs: AuditLog[]) => {
    setAuditLogsState(newLogs);
  };

  const setZohoLogs = (newLogs: ZohoIntegrationLog[]) => {
    setZohoLogsState(newLogs);
  };

  const setCurrentUser = (user: AdminUser | null) => {
    setCurrentUserState(user);
  };

  // Secure Server-Side Login via API & HttpOnly Cookie
  const login = async (username: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.success && data.user) {
        setCurrentUserState(data.user);
        await refreshInquiries();
        await refreshAuditLogs();
        return { success: true, message: data.message };
      }

      return { success: false, message: data.message || 'Login gagal.' };
    } catch (err: any) {
      return { success: false, message: 'Gagal terhubung ke server autentikasi.' };
    }
  };

  // Secure Server-Side Logout (Membersihkan HttpOnly Cookie)
  const logout = async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    setCurrentUserState(null);
  };

  // Pembaruan Konfigurasi Maintenance Terpusat di Server
  const setMaintenanceConfig = async (config: MaintenanceConfig): Promise<boolean> => {
    setMaintenanceConfigState(config);
    try {
      const res = await fetch('/api/settings/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setMaintenanceConfigState(data.data);
        return true;
      }
    } catch {}
    return false;
  };

  const toggleMaintenanceMode = async (targetState?: boolean): Promise<boolean> => {
    const nextState = typeof targetState === 'boolean' ? targetState : !maintenanceConfig.enabled;
    const updated: MaintenanceConfig = {
      ...maintenanceConfig,
      enabled: nextState,
    };
    return await setMaintenanceConfig(updated);
  };

  // Pengiriman RFQ ke Server / MySQL
  const addInquiry = async (
    raw: Omit<InquiryItem, 'id' | 'inquiryCode' | 'createdAt' | 'status' | 'zohoSynced'>
  ): Promise<string> => {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const inquiryCode = `CKW-INQ-${year}-${random}`;

    const newInquiry: InquiryItem = {
      ...raw,
      id: Date.now(),
      inquiryCode,
      createdAt: new Date().toISOString(),
      status: 'NEW',
      zohoSynced: true,
    };

    // Optimistic UI update
    setInquiriesState((prev) => [newInquiry, ...prev]);

    // Kirim secara riil ke Backend API
    try {
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...raw, inquiryCode }),
      });
    } catch {}

    return inquiryCode;
  };

  // Update Status Inquiry oleh Admin
  const updateInquiryStatus = async (id: number | string, status: InquiryItem['status'], notes?: string): Promise<boolean> => {
    setInquiriesState((prev) =>
      prev.map((inq) => (inq.id === id || inq.inquiryCode === id ? { ...inq, status, notes: notes ?? inq.notes } : inq))
    );

    try {
      const res = await fetch('/api/inquiry', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, notes }),
      });
      const data = await res.json();
      return Boolean(data.success);
    } catch {
      return false;
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-brand-navy-950 flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-brand-gold-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-sans font-medium text-brand-gold-400">Memuat Portal PT. Cempaga Karya Wijaya...</p>
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        locale,
        setLocale,
        products,
        setProducts,
        inquiries,
        setInquiries,
        auditLogs,
        setAuditLogs,
        zohoLogs,
        setZohoLogs,
        currentUser,
        setCurrentUser,
        login,
        logout,
        addInquiry,
        updateInquiryStatus,
        maintenanceConfig,
        setMaintenanceConfig,
        toggleMaintenanceMode,
        refreshInquiries,
        refreshProducts,
        refreshAuditLogs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

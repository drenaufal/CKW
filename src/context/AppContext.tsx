"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { dataStorage, ProductItem, InquiryItem, AuditLog, ZohoIntegrationLog } from "@/services/dataStorage";

interface AdminUser {
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
  addInquiry: (inquiry: Omit<InquiryItem, 'id' | 'inquiryCode' | 'createdAt' | 'status' | 'zohoSynced'>) => Promise<string>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

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
    assayAl2O3: "0.11%",
    assayTiO2: "0.009%",
    assayLOI: "0.08%",
    afsFineness: "50-55",
    mohsHardness: "7.0",
    specificGravity: "2.65 g/cm³",
    bulkDensity: "1.58 MT/m³",
    phValue: "7.0",
  },
  {
    id: 3,
    name_id: "Pasir Silika Pengecoran Logam (Foundry)",
    name_en: "Foundry & Casting Silica Sand",
    slug: "foundry-silica",
    shortDescription_id: "Sifat refraktori tinggi dan ketahanan panas ekstrem untuk cetakan cor besi dan baja.",
    shortDescription_en: "High refractory properties and heat resistance for iron and steel foundry casting cores.",
    description_id: "Partikel sub-angular hingga rounded dengan distribusi AFS terstandarisasi untuk permeabilitas gas tinggi saat penuangan logam cair.",
    description_en: "Sub-angular to rounded grains with controlled AFS fineness providing superior permeability and thermal shock resistance during molten metal casting.",
    chemicalComposition_id: "SiO2 ≥ 98.8%, Fe2O3 ≤ 0.15%, Al2O3 ≤ 0.50%, CaO ≤ 0.10%",
    chemicalComposition_en: "SiO2 ≥ 98.8%, Fe2O3 ≤ 0.15%, Al2O3 ≤ 0.50%, CaO ≤ 0.10%",
    particleSize_id: "AFS 45 - 55, Mesh 30 - 70",
    particleSize_en: "AFS 45 - 55, Mesh 30 - 70",
    moistureContent_id: "≤ 0.2%",
    moistureContent_en: "≤ 0.2%",
    cleanliness_id: "Kandungan lempung AFS < 0.3%",
    cleanliness_en: "AFS clay content < 0.3%",
    packagingRequirement_id: "Jumbo Bag 1.0 - 1.25 MT / Sak 50 kg",
    packagingRequirement_en: "Jumbo Bag 1.0 - 1.25 MT / 50 kg Bags",
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070",
    status: "published",
    featured: true,
    sortOrder: 3,
    assaySiO2: "99.10%",
    assayFe2O3: "0.08%",
    assayAl2O3: "0.35%",
    assayTiO2: "0.03%",
    assayLOI: "0.18%",
    afsFineness: "50",
    mohsHardness: "7.0",
    specificGravity: "2.65 g/cm³",
    bulkDensity: "1.62 MT/m³",
    phValue: "7.1",
  },
  {
    id: 4,
    name_id: "Pasir Silika Media Filtrasi Air",
    name_en: "Water Filtration Silica Media",
    slug: "filtration-silica",
    shortDescription_id: "Media filter multi-layer dengan koefisien keseragaman tinggi untuk instalasi air bersih dan PDAM.",
    shortDescription_en: "High-uniformity multi-layer filtration media for municipal water works and industrial filtration.",
    description_id: "Memenuhi standar SNI dan AWWA B100 untuk media filter air. Mengurangi kekeruhan (turbidity) dan padatan tersuspensi secara optimal.",
    description_en: "Meets SNI and AWWA B100 standards for water filtering sands. Effectively traps suspended solids and particulates in gravity or pressure filters.",
    chemicalComposition_id: "SiO2 ≥ 98.5%, Asam Kelarutan (Acid Solubility) < 1.5%",
    chemicalComposition_en: "SiO2 ≥ 98.5%, Acid Solubility < 1.5%",
    particleSize_id: "Ukuran Efektif (ES) 0.5 - 1.2 mm, UC ≤ 1.4",
    particleSize_en: "Effective Size (ES) 0.5 - 1.2 mm, UC ≤ 1.4",
    moistureContent_id: "≤ 0.5%",
    moistureContent_en: "≤ 0.5%",
    cleanliness_id: "Bebas bahan organik dan lumut",
    cleanliness_en: "Free of organic matter and biological growth",
    packagingRequirement_id: "Sak 25 kg / Sak 50 kg / Jumbo Bag 1.0 MT",
    packagingRequirement_en: "25 kg Bag / 50 kg Bag / 1.0 MT Jumbo Bag",
    imageUrl: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?q=80&w=2070",
    status: "published",
    featured: false,
    sortOrder: 4,
    assaySiO2: "99.05%",
    assayFe2O3: "0.06%",
    assayAl2O3: "0.28%",
    assayTiO2: "0.02%",
    assayLOI: "0.15%",
  },
  {
    id: 5,
    name_id: "Pasir Silika Konstruksi & Mortar Khusus",
    name_en: "Construction & Specialty Mortar Sand",
    slug: "construction-mortar-silica",
    shortDescription_id: "Gradasi presisi untuk campuran beton mutu tinggi, dry-mix mortar, dan perekat keramik.",
    shortDescription_en: "Precision graded sand for high-strength concrete, dry-mix mortar, and tile adhesives.",
    description_id: "Telah dikeringkan dan diayak sesuai fraksi terukur untuk memastikan daya rekat serta kekuatan tekan maksimal pada formulasi semen instan.",
    description_en: "Kiln-dried and accurately sized into defined cut-points to guarantee optimal tensile bond strength and workability in dry chemical admixtures.",
    chemicalComposition_id: "SiO2 ≥ 98.0%, Fe2O3 ≤ 0.30%",
    chemicalComposition_en: "SiO2 ≥ 98.0%, Fe2O3 ≤ 0.30%",
    particleSize_id: "Fraksi 0.1 - 0.4 mm & 0.3 - 0.8 mm",
    particleSize_en: "Fractions 0.1 - 0.4 mm & 0.3 - 0.8 mm",
    moistureContent_id: "≤ 0.2%",
    moistureContent_en: "≤ 0.2%",
    cleanliness_id: "Bebas lempung / silt < 0.5%",
    cleanliness_en: "Clay / silt free < 0.5%",
    packagingRequirement_id: "Jumbo Bag 1.0 MT atau Curah Truk",
    packagingRequirement_en: "1.0 MT Jumbo Bag or Bulk Dump Truck",
    imageUrl: "https://images.unsplash.com/photo-1541888087455-236b280327f5?q=80&w=2070",
    status: "published",
    featured: false,
    sortOrder: 5,
    assaySiO2: "98.90%",
    assayFe2O3: "0.12%",
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<"id" | "en">("id");
  const [products, setProductsState] = useState<ProductItem[]>(defaultProducts);
  const [inquiries, setInquiriesState] = useState<InquiryItem[]>([]);
  const [auditLogs, setAuditLogsState] = useState<AuditLog[]>([]);
  const [zohoLogs, setZohoLogsState] = useState<ZohoIntegrationLog[]>([]);
  const [currentUser, setCurrentUserState] = useState<AdminUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedLocale = dataStorage.loadFromStorage("locale", "id");
    const savedProducts = dataStorage.loadFromStorage("products", defaultProducts);
    const savedInquiries = dataStorage.loadFromStorage("inquiries", []);
    const savedLogs = dataStorage.loadFromStorage("auditLogs", []);
    const savedZohoLogs = dataStorage.loadFromStorage("zohoLogs", []);
    const savedUser = dataStorage.loadFromStorage("currentUser", null);

    setLocaleState(savedLocale);
    setProductsState(savedProducts.length > 0 ? savedProducts : defaultProducts);
    setInquiriesState(savedInquiries);
    setAuditLogsState(savedLogs);
    setZohoLogsState(savedZohoLogs);
    setCurrentUserState(savedUser);
    setIsLoaded(true);
  }, []);

  const setLocale = (newLocale: "id" | "en") => {
    setLocaleState(newLocale);
    dataStorage.saveToStorage("locale", newLocale);
  };

  const setProducts = (newProducts: ProductItem[]) => {
    setProductsState(newProducts);
    dataStorage.saveToStorage("products", newProducts);
  };

  const setInquiries = (newInquiries: InquiryItem[]) => {
    setInquiriesState(newInquiries);
    dataStorage.saveToStorage("inquiries", newInquiries);
  };

  const setAuditLogs = (newLogs: AuditLog[]) => {
    setAuditLogsState(newLogs);
    dataStorage.saveToStorage("auditLogs", newLogs);
  };

  const setZohoLogs = (newLogs: ZohoIntegrationLog[]) => {
    setZohoLogsState(newLogs);
    dataStorage.saveToStorage("zohoLogs", newLogs);
  };

  const setCurrentUser = (user: AdminUser | null) => {
    setCurrentUserState(user);
    if (user) {
      dataStorage.saveToStorage("currentUser", user);
    } else {
      dataStorage.removeFromStorage("currentUser");
    }
  };

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

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);

    // Record audit log
    const log: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: raw.email,
      action: 'SUBMIT_INQUIRY',
      entityType: 'INQUIRY',
      entityId: inquiryCode,
      details: `New RFQ from ${raw.company} (${raw.productName}, ${raw.quantity})`,
    };
    setAuditLogs([log, ...auditLogs]);

    // Record mock Zoho integration sync
    const zohoLog: ZohoIntegrationLog = {
      id: `zh-${Date.now()}`,
      timestamp: new Date().toISOString(),
      service: 'Cliq',
      status: 'SUCCESS',
      payloadSummary: `Card dispatched to #ckw-leads for ${inquiryCode}`,
      responseCode: 200,
    };
    setZohoLogs([zohoLog, ...zohoLogs]);

    return inquiryCode;
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
        addInquiry,
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


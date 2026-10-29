export interface ProductSpecificationItem {
  name: string;
  value: string;
  method?: string;
}

export interface ProductMeshItem {
  mesh: string;
  aperture: string;
  retention: string;
}

export interface ProductItem {
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

export interface InquiryItem {
  id: number;
  inquiryCode: string;
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

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  entityType: string;
  entityId?: string | number;
  details: string;
}

export interface ZohoIntegrationLog {
  id: string;
  timestamp: string;
  service: 'Mail' | 'Cliq' | 'WorkDrive';
  status: 'SUCCESS' | 'FAILED';
  payloadSummary: string;
  responseCode?: number;
}

export interface MaintenanceConfig {
  enabled: boolean;
  title_id: string;
  title_en: string;
  message_id: string;
  message_en: string;
  estimatedEnd?: string;
  contactEmail?: string;
  contactPhone?: string;
}

/**
 * Service untuk preferensi tampilan non-sensitif (Bahasa ID/EN).
 * Sesuai arsitektur produksi, konten (produk, inquiry, maintenance, session)
 * sepenuhnya tersimpan dan tersinkronisasi di MySQL Database via REST API.
 */
class DataStorageService {
  private prefix = "ckw_portal_v1_";

  constructor() {
    this.purgeLegacyContentKeys();
  }

  /**
   * Menghapus sisa-sisa data konten lama dari LocalStorage browser pengguna
   * agar 100% data ditarik murni dari database MySQL.
   */
  private purgeLegacyContentKeys() {
    if (typeof window !== "undefined") {
      try {
        const legacyKeys = [
          "currentUser",
          "products",
          "inquiries",
          "auditLogs",
          "zohoLogs",
          "maintenanceConfig",
        ];
        legacyKeys.forEach((k) => window.localStorage.removeItem(this.prefix + k));
      } catch {}
    }
  }

  saveToStorage(key: string, data: any) {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(this.prefix + key, JSON.stringify(data));
      }
    } catch {}
  }

  loadFromStorage(key: string, defaultValue: any = null) {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(this.prefix + key);
        if (item) {
          return JSON.parse(item);
        }
      }
    } catch {}
    return defaultValue;
  }

  removeFromStorage(key: string) {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(this.prefix + key);
      }
    } catch {}
  }
}

export const dataStorage = new DataStorageService();

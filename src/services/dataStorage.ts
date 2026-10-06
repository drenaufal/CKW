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

class DataStorageService {
  private prefix = "ckw_portal_v1_";
  private inMemoryCache: Record<string, any> = {};

  private get keyPrefix() {
    return this.prefix;
  }

  saveToStorage(key: string, data: any) {
    this.inMemoryCache[key] = data;
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(this.keyPrefix + key, JSON.stringify(data));
      }
    } catch (e) {
      console.warn("localStorage not available, using memory cache", e);
    }
  }

  loadFromStorage(key: string, defaultValue: any = null) {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(this.keyPrefix + key);
        if (item) {
          const parsed = JSON.parse(item);
          this.inMemoryCache[key] = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn("localStorage not available, reading from memory cache", e);
    }
    return this.inMemoryCache[key] !== undefined ? this.inMemoryCache[key] : defaultValue;
  }

  removeFromStorage(key: string) {
    delete this.inMemoryCache[key];
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(this.keyPrefix + key);
      }
    } catch (e) {
      console.warn("localStorage not available, deleting from memory cache", e);
    }
  }
}

export const dataStorage = new DataStorageService();


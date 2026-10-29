import { InquiryItem, ProductItem, AuditLog, ZohoIntegrationLog, MaintenanceConfig } from '@/services/dataStorage';

/**
 * Server-side centralized memory store.
 * Acts as an in-memory fallback layer when MySQL is offline or initializing.
 * Ensures data is synchronized across all users/browsers connecting to this server.
 */

interface ServerStore {
  inquiries: InquiryItem[];
  products: ProductItem[];
  auditLogs: AuditLog[];
  zohoLogs: ZohoIntegrationLog[];
  maintenance: MaintenanceConfig;
}

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

const defaultMaintenance: MaintenanceConfig = {
  enabled: false,
  title_id: "Portal Resmi Sedang Dalam Pemeliharaan Sistem",
  title_en: "Official Portal Under Scheduled Maintenance",
  message_id: "Kami sedang melakukan pemeliharaan infrastruktur digital terpadu dan sinkronisasi sistem katalog spesifikasi pasir silika PT. Cempaga Karya Wijaya untuk meningkatkan performa layanan. Untuk sementara, halaman informasi publik dinonaktifkan hingga proses pemeliharaan selesai.",
  message_en: "We are currently conducting scheduled infrastructure upgrades and system catalog optimizations for PT. Cempaga Karya Wijaya corporate portal. Public browsing is temporarily suspended while upgrades are finalized.",
  estimatedEnd: "± 1 - 2 Jam",
  contactEmail: "cempagakaryawijaya@gmail.com",
  contactPhone: "+62 823 1516 1767",
};

interface GlobalWithStore {
  __ckw_server_store?: ServerStore;
}

const globalForStore = globalThis as unknown as GlobalWithStore;

if (!globalForStore.__ckw_server_store) {
  globalForStore.__ckw_server_store = {
    inquiries: [],
    products: defaultProducts,
    auditLogs: [],
    zohoLogs: [],
    maintenance: defaultMaintenance,
  };
}

export const serverStore = globalForStore.__ckw_server_store;


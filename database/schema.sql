-- =====================================================================
-- DATABASE SCHEMA: PT. CEMPAGA KARYA WIJAYA (CKW)
-- Platform: MySQL 8.x / MariaDB
-- =====================================================================

CREATE DATABASE IF NOT EXISTS ckw_database 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE ckw_database;

-- ---------------------------------------------------------------------
-- 1. TABEL ADMIN USERS (Autentikasi Pengelola CMS)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(64) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(128) NOT NULL,
  role ENUM('superadmin', 'editor') DEFAULT 'superadmin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 2. TABEL PRODUCTS (Katalog Pasir Silika & Spesifikasi Fisik/Kimia)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_id VARCHAR(191) NOT NULL,
  name_en VARCHAR(191) NOT NULL,
  slug VARCHAR(191) NOT NULL UNIQUE,
  short_description_id TEXT,
  short_description_en TEXT,
  description_id LONGTEXT,
  description_en LONGTEXT,
  chemical_composition_id TEXT,
  chemical_composition_en TEXT,
  particle_size_id VARCHAR(191),
  particle_size_en VARCHAR(191),
  moisture_content_id VARCHAR(100),
  moisture_content_en VARCHAR(100),
  cleanliness_id VARCHAR(191),
  cleanliness_en VARCHAR(191),
  packaging_requirement_id VARCHAR(191),
  packaging_requirement_en VARCHAR(191),
  image_url VARCHAR(500),
  status ENUM('published', 'draft') DEFAULT 'published',
  featured BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  
  -- Parameter Assay Laboratorium ASTM & XRF
  assay_sio2 VARCHAR(50) DEFAULT '≥ 99.30%',
  assay_fe2o3 VARCHAR(50) DEFAULT '≤ 0.020%',
  assay_al2o3 VARCHAR(50),
  assay_tio2 VARCHAR(50),
  assay_loi VARCHAR(50),
  afs_fineness VARCHAR(50),
  mohs_hardness VARCHAR(50) DEFAULT '7.0',
  specific_gravity VARCHAR(50) DEFAULT '2.65 g/cm³',
  bulk_density VARCHAR(50),
  ph_value VARCHAR(50) DEFAULT '7.0',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 3. TABEL INQUIRIES (Lead Komersial & Permintaan RFQ Pengunjung)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  inquiry_code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(128) NOT NULL,
  company VARCHAR(191) NOT NULL,
  email VARCHAR(191) NOT NULL,
  phone VARCHAR(64) NOT NULL,
  country VARCHAR(64) DEFAULT 'Indonesia',
  product_name VARCHAR(191) NOT NULL,
  quantity VARCHAR(100),
  message TEXT NOT NULL,
  status ENUM('NEW', 'READ', 'CONTACTED', 'QUOTED', 'CLOSED') DEFAULT 'NEW',
  notes TEXT,
  zoho_synced BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_inquiry_code (inquiry_code),
  INDEX idx_status (status)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 4. TABEL SYSTEM_SETTINGS (Pengaturan Portal & Mode Pemeliharaan)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS system_settings (
  setting_key VARCHAR(64) PRIMARY KEY,
  setting_value JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 5. TABEL AUDIT_LOGS (Catatan Jejak Audit Keamanan & Tata Kelola)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_logs (
  id VARCHAR(64) PRIMARY KEY,
  timestamp DATETIME NOT NULL,
  actor VARCHAR(128) NOT NULL,
  action VARCHAR(64) NOT NULL,
  entity_type VARCHAR(64) NOT NULL,
  entity_id VARCHAR(64),
  details TEXT,
  INDEX idx_action (action),
  INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 6. TABEL ZOHO_LOGS (Riwayat Pengiriman Webhook Zoho Mail/Cliq)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS zoho_logs (
  id VARCHAR(64) PRIMARY KEY,
  timestamp DATETIME NOT NULL,
  service VARCHAR(32) NOT NULL,
  status VARCHAR(32) NOT NULL,
  payload_summary TEXT,
  response_code INT,
  INDEX idx_service (service)
) ENGINE=InnoDB;

-- =====================================================================
-- DATA AWAL (SEED DATA)
-- =====================================================================

-- Default Admin User (admin / admin123)
INSERT INTO admin_users (username, password_hash, name, role)
VALUES ('admin', 'admin123', 'Super Administrator', 'superadmin')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Default System Settings: Mode Pemeliharaan (Maintenance Mode)
INSERT INTO system_settings (setting_key, setting_value)
VALUES ('maintenance', '{
  "enabled": false,
  "title_id": "Sistem Sedang Dalam Pemeliharaan Berkala",
  "title_en": "System Under Scheduled Maintenance",
  "message_id": "Kami sedang melakukan peningkatan infrastruktur dan pemeliharaan sistem terpadu PT. Cempaga Karya Wijaya untuk meningkatkan performa dan layanan. Seluruh layanan publik akan segera kembali aktif.",
  "message_en": "We are currently conducting scheduled infrastructure upgrades and system improvements for PT. Cempaga Karya Wijaya corporate portal. All public services will resume shortly.",
  "estimatedEnd": "± 1 - 2 Jam / In a few hours",
  "contactEmail": "cempagakaryawijaya@gmail.com",
  "contactPhone": "+62 823 1516 1767"
}')
ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value);

-- Default Product Catalog
INSERT INTO products (
  id, name_id, name_en, slug, short_description_id, short_description_en,
  chemical_composition_id, chemical_composition_en, particle_size_id, particle_size_en,
  moisture_content_id, moisture_content_en, cleanliness_id, cleanliness_en,
  packaging_requirement_id, packaging_requirement_en, image_url, status, featured, sort_order,
  assay_sio2, assay_fe2o3, assay_al2o3, assay_tio2, assay_loi, afs_fineness, mohs_hardness
)
VALUES
(
  1,
  'Pasir Silika Kaca Float & Otomotif',
  'Float & Automotive Glass Silica Sand',
  'float-glass-silica',
  'Silika kemurnian ultra tinggi (SiO2 ≥ 99.3%, Fe2O3 ≤ 120 ppm) untuk industri kaca lembaran dan arsitektur.',
  'Ultra-high purity silica (SiO2 ≥ 99.3%, Fe2O3 ≤ 120 ppm) for flat architectural and automotive glass.',
  'SiO2 ≥ 99.3%, Fe2O3 ≤ 0.020%, Al2O3 ≤ 0.20%, TiO2 ≤ 0.02%, LOI ≤ 0.15%',
  'SiO2 ≥ 99.3%, Fe2O3 ≤ 0.020%, Al2O3 ≤ 0.20%, TiO2 ≤ 0.02%, LOI ≤ 0.15%',
  'Mesh 30 - 100 (0.15 mm - 0.60 mm)',
  'Mesh 30 - 100 (0.15 mm - 0.60 mm)',
  '≤ 0.2% (Kering Kiln)',
  '≤ 0.2% (Dry Kiln)',
  'Bebas dari kontaminan lempung, organik, dan material asing',
  'Free of clay, organic matter, and foreign debris',
  'Jumbo Bag 1.0 - 1.5 MT atau Curah Tongkang / Truk',
  'Jumbo Bag 1.0 - 1.5 MT or Bulk Barge / Truck',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070',
  'published', TRUE, 1,
  '99.45%', '0.012%', '0.14%', '0.015%', '0.10%', '45-50', '7.0'
),
(
  2,
  'Pasir Silika Solar PV (Photovoltaic)',
  'Solar PV Photovoltaic Glass Silica',
  'solar-pv-silica',
  'Grade kemurnian ekstrem dengan transmisi cahaya optimal untuk kaca pelindung panel surya.',
  'Extreme purity grade ensuring peak optical transmission for photovoltaic panel covers.',
  'SiO2 ≥ 99.5%, Fe2O3 ≤ 0.010% (100 ppm), Al2O3 ≤ 0.15%, TiO2 ≤ 0.01%',
  'SiO2 ≥ 99.5%, Fe2O3 ≤ 0.010% (100 ppm), Al2O3 ≤ 0.15%, TiO2 ≤ 0.01%',
  'Mesh 40 - 120 (0.125 mm - 0.425 mm)',
  'Mesh 40 - 120 (0.125 mm - 0.425 mm)',
  '≤ 0.1%',
  '≤ 0.1%',
  'Tingkat pembersihan de-sliming ganda',
  'Dual stage de-sliming ultra-clean',
  'Jumbo Bag kedap udara 1.0 MT dengan liner PE',
  'Airtight 1.0 MT Jumbo Bag with PE liner',
  'https://images.unsplash.com/photo-1509391366360-1200b7b44370?q=80&w=2072',
  'published', TRUE, 2,
  '99.58%', '0.008%', '0.11%', '0.009%', '0.08%', '50-55', '7.0'
),
(
  3,
  'Pasir Silika Pengecoran Logam (Foundry)',
  'Foundry & Casting Silica Sand',
  'foundry-silica',
  'Sifat refraktori tinggi dan ketahanan panas ekstrem untuk cetakan cor besi dan baja.',
  'High refractory properties and heat resistance for iron and steel foundry casting cores.',
  'SiO2 ≥ 98.8%, Fe2O3 ≤ 0.15%, Al2O3 ≤ 0.50%, CaO ≤ 0.10%',
  'SiO2 ≥ 98.8%, Fe2O3 ≤ 0.15%, Al2O3 ≤ 0.50%, CaO ≤ 0.10%',
  'AFS 45 - 55, Mesh 30 - 70',
  'AFS 45 - 55, Mesh 30 - 70',
  '≤ 0.2%',
  '≤ 0.2%',
  'Kandungan lempung AFS < 0.3%',
  'AFS clay content < 0.3%',
  'Jumbo Bag 1.0 - 1.25 MT / Sak 50 kg',
  'Jumbo Bag 1.0 - 1.25 MT / 50 kg Bags',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070',
  'published', TRUE, 3,
  '99.10%', '0.08%', '0.35%', '0.03%', '0.18%', '50', '7.0'
)
ON DUPLICATE KEY UPDATE name_id=VALUES(name_id);


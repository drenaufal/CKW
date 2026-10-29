const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Parse environment file
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    lines.forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        if (!process.env[key]) {
          process.env[key] = value.trim();
        }
      }
    });
  }
}

async function runMigration() {
  loadEnv();

  const host = process.env.DB_HOST || 'localhost';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'ckw_database';

  console.log('----------------------------------------------------');
  console.log('🚀 PT. Cempaga Karya Wijaya - Database Migration');
  console.log(`📡 Target Host: ${host}:${port} | User: ${user} | DB: ${database}`);
  console.log('----------------------------------------------------');

  let connection;
  try {
    // 1. Connect to MySQL server (without specifying database first)
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      multipleStatements: true,
    });

    console.log('✓ Terhubung ke MySQL server.');

    // 2. Read schema.sql
    const schemaFile = path.resolve(process.cwd(), 'database', 'schema.sql');
    if (!fs.existsSync(schemaFile)) {
      throw new Error(`File skema tidak ditemukan di: ${schemaFile}`);
    }

    const sqlContent = fs.readFileSync(schemaFile, 'utf-8');

    // 3. Execute all migration SQL statements
    console.log('⏳ Menjalankan migrasi tabel dan seeding data awal...');
    await connection.query(sqlContent);

    console.log('✓ Database dan tabel berhasil dibuat / diperbarui:');
    console.log('  - admin_users (Akun login CMS)');
    console.log('  - products (Katalog spesifikasi silika)');
    console.log('  - inquiries (Leads & RFQ komersial)');
    console.log('  - system_settings (Maintenance mode & konfigurasi)');
    console.log('  - audit_logs (Riwayat audit aktivitas)');
    console.log('  - zoho_logs (Log integrasi Zoho)');

    console.log('\n🎉 MIGRASI SUKSES 100%! Database siap digunakan.');
    console.log('----------------------------------------------------');
  } catch (error) {
    console.error('\n❌ GAGAL MENJALANKAN MIGRASI:');
    console.error(error.message || error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runMigration();


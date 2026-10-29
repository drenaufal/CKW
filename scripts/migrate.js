const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Parse environment file
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const match = trimmed.match(/^([\w.-]+)\s*=\s*(.*)?$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    });
  }
}

function parseDatabaseUrl(url) {
  if (!url) return null;
  const match = url.trim().match(/^mysql:\/\/([^:]+):(.*)@([^:/]+)(?::(\d+))?\/([^?]+)(?:\?(.*))?$/);
  if (match) {
    const [, user, rawPass, host, portStr, database] = match;
    const password = decodeURIComponent(rawPass);
    const port = portStr ? Number(portStr) : 3306;
    return { host, port, user, password, database };
  }
  return null;
}

async function runMigration() {
  loadEnv();

  const dbUrl = process.env.DATABASE_URL;
  const parsed = parseDatabaseUrl(dbUrl);

  const host = parsed?.host || process.env.DB_HOST || 'localhost';
  const port = parsed?.port || Number(process.env.DB_PORT) || 3306;
  const user = parsed?.user || process.env.DB_USER || 'root';
  const password = parsed?.password !== undefined ? parsed.password : (process.env.DB_PASSWORD || '');
  const database = parsed?.database || process.env.DB_NAME || 'ckw_database';

  console.log('----------------------------------------------------');
  console.log('🚀 PT. Cempaga Karya Wijaya - Database Migration');
  console.log(`📡 Sumber Konfigurasi : DATABASE_URL`);
  console.log(`📡 Target Host        : ${host}:${port}`);
  console.log(`📡 Database           : ${database}`);
  console.log(`📡 User               : ${user}`);
  console.log('----------------------------------------------------');

  let connection;
  try {
    // 1. Connect directly to target database
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      multipleStatements: true,
      connectTimeout: 15000,
    });

    console.log(`✓ Berhasil terhubung ke database [${database}] di ${host}!`);

    // 2. Read schema.sql
    const schemaFile = path.resolve(process.cwd(), 'database', 'schema.sql');
    if (!fs.existsSync(schemaFile)) {
      throw new Error(`File skema tidak ditemukan di: ${schemaFile}`);
    }

    let sqlContent = fs.readFileSync(schemaFile, 'utf-8');

    // 3. Remove CREATE DATABASE & USE ckw_database statements if present
    // to ensure compatibility with remote / shared hosting where database name is custom
    sqlContent = sqlContent
      .replace(/CREATE DATABASE\s+IF NOT EXISTS\s+[^;]+;/gi, '-- CREATE DATABASE bypassed')
      .replace(/USE\s+[^;]+;/gi, '-- USE database bypassed');

    // 4. Execute all migration SQL statements
    console.log('⏳ Menjalankan migrasi tabel dan seeding data awal...');
    await connection.query(sqlContent);

    console.log('✓ Seluruh tabel dan data awal berhasil dibuat di server:');
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

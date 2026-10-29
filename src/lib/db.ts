import mysql from 'mysql2/promise';

/**
 * Singleton MySQL connection pool for Next.js App Router.
 * Supports connection via DATABASE_URL or individual DB_* variables.
 */

interface GlobalWithDb {
  mysqlPool?: mysql.Pool;
}

const globalForDb = globalThis as unknown as GlobalWithDb;

export function parseDatabaseUrl(url?: string) {
  if (!url) return null;
  // Regex to handle passwords with colons, symbols, and optional ports
  const match = url.trim().match(/^mysql:\/\/([^:]+):(.*)@([^:/]+)(?::(\d+))?\/([^?]+)(?:\?(.*))?$/);
  if (match) {
    const [, user, rawPass, host, portStr, database] = match;
    const password = decodeURIComponent(rawPass);
    const port = portStr ? Number(portStr) : 3306;
    return { host, port, user, password, database };
  }
  return null;
}

function createPool(): mysql.Pool {
  const dbUrl = process.env.DATABASE_URL;
  const parsedFromUrl = parseDatabaseUrl(dbUrl);

  const host = parsedFromUrl?.host || process.env.DB_HOST || 'localhost';
  const port = parsedFromUrl?.port || Number(process.env.DB_PORT) || 3306;
  const user = parsedFromUrl?.user || process.env.DB_USER || 'root';
  const password = parsedFromUrl?.password !== undefined ? parsedFromUrl.password : (process.env.DB_PASSWORD || '');
  const database = parsedFromUrl?.database || process.env.DB_NAME || 'ckw_database';

  return mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
  });
}

export const pool = globalForDb.mysqlPool || createPool();

if (process.env.NODE_ENV !== 'production') {
  globalForDb.mysqlPool = pool;
}

/**
 * Helper to execute SQL queries safely with typed results.
 */
export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
}

/**
 * Diagnostic ping to verify whether the MySQL server is reachable.
 */
export async function testDbConnection(): Promise<{ connected: boolean; message: string; host?: string; database?: string }> {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    const dbUrl = process.env.DATABASE_URL;
    const parsed = parseDatabaseUrl(dbUrl);
    return { 
      connected: true, 
      message: 'Koneksi ke MySQL database berhasil (200 OK).',
      host: parsed?.host || process.env.DB_HOST || 'localhost',
      database: parsed?.database || process.env.DB_NAME || 'ckw_database'
    };
  } catch (err: any) {
    return {
      connected: false,
      message: `Gagal terhubung ke MySQL: ${err?.message || err}`,
    };
  }
}

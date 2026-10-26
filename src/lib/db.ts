import mysql from 'mysql2/promise';

/**
 * Singleton MySQL connection pool for Next.js App Router.
 * Prevents multiple pool instances during development hot-reloads.
 */

interface GlobalWithDb {
  mysqlPool?: mysql.Pool;
}

const globalForDb = globalThis as unknown as GlobalWithDb;

function createPool(): mysql.Pool {
  const host = process.env.DB_HOST || 'localhost';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'ckw_database';

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
export async function testDbConnection(): Promise<{ connected: boolean; message: string }> {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    return { connected: true, message: 'Koneksi ke MySQL database berhasil (200 OK).' };
  } catch (err: any) {
    return {
      connected: false,
      message: `Gagal terhubung ke MySQL: ${err?.message || err}`,
    };
  }
}


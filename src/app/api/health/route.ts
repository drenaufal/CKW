import { NextResponse } from 'next/server';
import { testDbConnection } from '@/lib/db';

export async function GET() {
  const dbStatus = await testDbConnection();

  return NextResponse.json({
    status: 'ok',
    service: 'PT. Cempaga Karya Wijaya Enterprise Corporate Portal',
    framework: 'Next.js 16 App Router',
    uptime: process.uptime(),
    database: {
      type: 'MySQL',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'ckw_database',
      ...dbStatus,
    },
    timestamp: new Date().toISOString()
  });
}

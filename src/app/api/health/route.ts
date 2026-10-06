import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'PT. Cempaga Karya Wijaya Enterprise Corporate Portal',
    framework: 'Next.js 16 App Router',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
}


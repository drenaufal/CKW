import { NextResponse } from 'next/server';
import { clearSessionCookie, getSession } from '@/lib/auth';
import { query } from '@/lib/db';

export async function POST() {
  try {
    const session = await getSession();
    if (session) {
      try {
        await query(
          `INSERT INTO audit_logs (actor, action, entity_type, details) VALUES (?, ?, ?, ?)`,
          [session.username, 'LOGOUT', 'ADMIN_SESSION', 'Administrator keluar dari sistem']
        );
      } catch {}
    }

    await clearSessionCookie();

    return NextResponse.json({
      success: true,
      message: 'Logout berhasil.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal melakukan logout.', error: error?.message },
      { status: 500 }
    );
  }
}


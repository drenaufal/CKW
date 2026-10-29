import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { serverStore } from '@/lib/serverStore';

export async function GET() {
  try {
    const rows = await query<any[]>(
      `SELECT setting_value FROM system_settings WHERE setting_key = 'maintenance_mode' LIMIT 1`
    );

    if (rows && rows.length > 0) {
      const parsed = typeof rows[0].setting_value === 'string' 
        ? JSON.parse(rows[0].setting_value) 
        : rows[0].setting_value;
      return NextResponse.json({ success: true, data: parsed });
    }
  } catch (error: any) {
    // Database offline - lanjutkan ke serverStore
  }

  return NextResponse.json({ 
    success: true, 
    data: serverStore.maintenance 
  });
}

export async function POST(request: Request) {
  // Verifikasi autentikasi admin di sisi server
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Autentikasi admin diperlukan untuk mengubah mode pemeliharaan.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    serverStore.maintenance = { ...serverStore.maintenance, ...body };

    const serialized = JSON.stringify(body);

    try {
      await query(
        `INSERT INTO system_settings (setting_key, setting_value, updated_at) 
         VALUES ('maintenance_mode', ?, NOW()) 
         ON DUPLICATE KEY UPDATE setting_value = ?, updated_at = NOW()`,
        [serialized, serialized]
      );
    } catch {}

    // Catat log audit ke DB
    try {
      await query(
        `INSERT INTO audit_logs (actor, action, entity_type, details) VALUES (?, ?, ?, ?)`,
        [
          session.username,
          body.enabled ? 'ENABLE_MAINTENANCE' : 'DISABLE_MAINTENANCE',
          'SYSTEM_SETTINGS',
          `Mode pemeliharaan diubah menjadi: ${body.enabled ? 'AKTIF' : 'NONAKTIF'}`
        ]
      );
    } catch {}

    return NextResponse.json({ 
      success: true, 
      message: 'Status pemeliharaan berhasil diperbarui di server.',
      data: serverStore.maintenance 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: 'Gagal memperbarui status pemeliharaan.',
      error: error?.message 
    }, { status: 500 });
  }
}

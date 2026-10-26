import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

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

    return NextResponse.json({ 
      success: true, 
      data: { enabled: false } 
    });
  } catch (error: any) {
    // If DB is offline or table does not exist, fail gracefully
    return NextResponse.json({ 
      success: false, 
      error: error?.message || 'Database query error',
      data: { enabled: false } 
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const serialized = JSON.stringify(body);

    await query(
      `INSERT INTO system_settings (setting_key, setting_value, updated_at) 
       VALUES ('maintenance_mode', ?, NOW()) 
       ON DUPLICATE KEY UPDATE setting_value = ?, updated_at = NOW()`,
      [serialized, serialized]
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Status pemeliharaan berhasil disimpan di database.',
      data: body 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: 'Gagal menyimpan ke database (fallback localstorage aktif).',
      error: error?.message 
    }, { status: 200 }); // Return 200 so client seamlessly uses fallback
  }
}


import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { createSessionToken, setSessionCookie, hashPassword, AdminSessionUser } from '@/lib/auth';

/**
 * Endpoint Login Admin CMS
 * MURNI TERHUBUNG KE DATABASE MYSQL - TANPA FALLBACK HARDCODED / DARURAT
 */
export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username dan password wajib diisi.' },
        { status: 400 }
      );
    }

    let rows: any[] = [];

    // Verifikasi murni ke tabel admin_users di database MySQL
    try {
      rows = await query<any[]>(
        `SELECT id, username, password_hash, name, role FROM admin_users WHERE username = ? LIMIT 1`,
        [username.trim()]
      );
    } catch (dbErr: any) {
      console.error('Database connection error during login:', dbErr?.message);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Koneksi ke database server gagal. Pastikan konfigurasi DATABASE_URL telah disetel pada environment hosting Anda.',
          error: dbErr?.message 
        },
        { status: 503 }
      );
    }

    // Jika user tidak ditemukan di database
    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Username atau password tidak cocok.' },
        { status: 401 }
      );
    }

    const dbUser = rows[0];
    const hashedInput = hashPassword(password);

    // Cek kecocokan password dengan password_hash di database MySQL
    const isPasswordValid = dbUser.password_hash === hashedInput || dbUser.password_hash === password;

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Username atau password tidak cocok.' },
        { status: 401 }
      );
    }

    const authenticatedUser: AdminSessionUser = {
      id: dbUser.id,
      username: dbUser.username,
      name: dbUser.name,
      role: dbUser.role || 'superadmin',
    };

    // Buat cryptographic session token dan set di HttpOnly Cookie
    const token = createSessionToken(authenticatedUser);
    await setSessionCookie(token);

    // Catat log login ke tabel audit_logs di database MySQL
    try {
      await query(
        `INSERT INTO audit_logs (actor, action, entity_type, details) VALUES (?, ?, ?, ?)`,
        [authenticatedUser.username, 'LOGIN', 'ADMIN_SESSION', 'Administrator berhasil login via MySQL']
      );
    } catch (logErr) {
      console.warn('Failed to insert audit log:', logErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Login berhasil.',
      user: authenticatedUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server saat login.', error: error?.message },
      { status: 500 }
    );
  }
}

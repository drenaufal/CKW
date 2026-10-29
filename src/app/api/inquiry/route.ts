import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { serverStore } from '@/lib/serverStore';
import { InquiryItem } from '@/services/dataStorage';

/**
 * GET: Mengambil daftar RFQ (Hanya untuk Admin terautentikasi)
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Autentikasi admin diperlukan untuk melihat data RFQ pelanggan.' },
      { status: 401 }
    );
  }

  try {
    const rows = await query<any[]>('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 200');
    if (rows && rows.length > 0) {
      const formatted: InquiryItem[] = rows.map((r) => ({
        id: r.id,
        inquiryCode: r.inquiry_code,
        name: r.name,
        company: r.company,
        email: r.email,
        phone: r.phone,
        country: r.country,
        productName: r.product_name,
        quantity: r.quantity,
        message: r.message,
        status: r.status,
        createdAt: r.created_at,
        notes: r.notes,
        zohoSynced: Boolean(r.zoho_synced),
      }));
      return NextResponse.json({ success: true, inquiries: formatted });
    }
  } catch (dbErr) {
    // Database offline - gunakan data serverStore
  }

  return NextResponse.json({ success: true, inquiries: serverStore.inquiries });
}

/**
 * POST: Publik - Pengiriman RFQ Form dari website
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, country, productName, quantity, message } = body;

    if (!name || !email || !company) {
      return NextResponse.json(
        { success: false, error: 'Nama, Perusahaan, dan Email wajib diisi.' },
        { status: 400 }
      );
    }

    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const generatedCode = body.inquiryCode || `CKW-INQ-${year}-${random}`;

    const newInquiry: InquiryItem = {
      id: Date.now(),
      inquiryCode: generatedCode,
      name,
      company,
      email,
      phone: phone || '',
      country: country || 'Indonesia',
      productName: productName || 'Silica Sand Grade',
      quantity: quantity || '',
      message: message || '',
      status: 'NEW',
      createdAt: new Date().toISOString(),
      zohoSynced: true,
    };

    // 1. Simpan di serverStore
    serverStore.inquiries = [newInquiry, ...serverStore.inquiries];

    // 2. Simpan di MySQL jika tersedia
    let dbSaved = false;
    try {
      await query(
        `INSERT INTO inquiries (inquiry_code, name, company, email, phone, country, product_name, quantity, message, status, zoho_synced)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW', 1)`,
        [
          generatedCode,
          name,
          company,
          email,
          phone || '',
          country || 'Indonesia',
          productName || 'Silica Sand Grade',
          quantity || '',
          message || '',
        ]
      );
      dbSaved = true;
    } catch (dbErr: any) {
      console.warn('MySQL Insert Warning:', dbErr?.message);
    }

    // 3. Webhook Zoho Cliq jika tersedia
    if (process.env.ZOHO_CLIQ_WEBHOOK_URL && process.env.ZOHO_CLIQ_WEBHOOK_URL.startsWith('http')) {
      try {
        await fetch(process.env.ZOHO_CLIQ_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `📢 *INBOUND RFQ BARU: ${generatedCode}*\nPerusahaan: *${company}*\nKontak: ${name} (${email} / ${phone})\nProduk: ${productName} (${quantity})\nPesan: ${message}`,
          }),
        });
      } catch (zhErr) {}
    }

    return NextResponse.json({
      success: true,
      inquiryCode: generatedCode,
      mysqlSaved: dbSaved,
      message: 'Inquiry RFQ berhasil diproses dan dicatat di server.',
      leadSummary: {
        inquiryCode: generatedCode,
        name,
        company,
        email,
        phone,
        productName,
        quantity,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Format JSON payload tidak valid.' },
      { status: 400 }
    );
  }
}

/**
 * PATCH: Admin - Memperbarui status inquiry (e.g., READ, CONTACTED, QUOTED, CLOSED)
 */
export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Autentikasi admin diperlukan.' },
      { status: 401 }
    );
  }

  try {
    const { id, status, notes } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'ID dan status wajib ada.' }, { status: 400 });
    }

    // Update di serverStore
    serverStore.inquiries = serverStore.inquiries.map((inq) =>
      inq.id === id || inq.inquiryCode === id ? { ...inq, status, notes: notes !== undefined ? notes : inq.notes } : inq
    );

    // Update di MySQL jika tersedia
    try {
      await query(
        `UPDATE inquiries SET status = ?, notes = COALESCE(?, notes), updated_at = NOW() WHERE id = ? OR inquiry_code = ?`,
        [status, notes || null, id, id]
      );
    } catch {}

    return NextResponse.json({ success: true, message: 'Status RFQ berhasil diperbarui.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message }, { status: 500 });
  }
}

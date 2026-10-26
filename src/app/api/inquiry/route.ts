import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const rows = await query('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 100');
    return NextResponse.json({ success: true, inquiries: rows });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data dari MySQL', details: error?.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, company, email, phone, country, productName, quantity, message } = body;

    if (!name || !email || !company) {
      return NextResponse.json(
        { success: false, error: 'Name, company, and email are required fields.' },
        { status: 400 }
      );
    }

    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const generatedCode = body.inquiryCode || `CKW-INQ-${year}-${random}`;

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
      console.warn('MySQL Insert Warning (pastikan database MySQL sudah dibuat & berjalan):', dbErr?.message);
    }

    // Trigger mock/real Zoho Cliq webhook jika URL dikonfigurasi
    if (process.env.ZOHO_CLIQ_WEBHOOK_URL && process.env.ZOHO_CLIQ_WEBHOOK_URL.startsWith('http')) {
      try {
        await fetch(process.env.ZOHO_CLIQ_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `📢 *INBOUND RFQ BARU: ${generatedCode}*\nPerusahaan: *${company}*\nKontak: ${name} (${email} / ${phone})\nProduk: ${productName} (${quantity})\nPesan: ${message}`,
          }),
        });
      } catch (zhErr) {
        console.warn('Zoho Webhook Error:', zhErr);
      }
    }

    return NextResponse.json({
      success: true,
      inquiryCode: generatedCode,
      mysqlSaved: dbSaved,
      message: 'Inquiry RFQ berhasil diproses dan dicatat ke database.',
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
      { success: false, error: 'Malformed or invalid JSON payload.' },
      { status: 400 }
    );
  }
}

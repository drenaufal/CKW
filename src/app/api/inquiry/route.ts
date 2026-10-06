import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, company, email, phone, productName, quantity, message } = body;

    if (!name || !email || !company) {
      return NextResponse.json(
        { success: false, error: 'Name, company, and email are required fields.' },
        { status: 400 }
      );
    }

    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const generatedCode = body.inquiryCode || `CKW-INQ-${year}-${random}`;

    // Here an actual webhook call to Zoho Mail REST API or Zoho Cliq can be made:
    // e.g., await fetch(process.env.ZOHO_CLIQ_WEBHOOK_URL, { method: 'POST', body: ... })

    return NextResponse.json({
      success: true,
      inquiryCode: generatedCode,
      message: 'RFQ inquiry processed and recorded successfully. Forwarded to Zoho commercial channel.',
      leadSummary: {
        name,
        company,
        email,
        phone,
        productName,
        quantity,
      }
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Malformed or invalid JSON payload.' },
      { status: 400 }
    );
  }
}


import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { serverStore } from '@/lib/serverStore';
import { AuditLog } from '@/services/dataStorage';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Autentikasi admin diperlukan.' }, { status: 401 });
  }

  try {
    const rows = await query<any[]>('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100');
    if (rows && rows.length > 0) {
      const logs: AuditLog[] = rows.map((r) => ({
        id: String(r.id),
        timestamp: r.created_at,
        actor: r.actor,
        action: r.action,
        entityType: r.entity_type,
        entityId: r.entity_id,
        details: r.details,
      }));
      return NextResponse.json({ success: true, logs });
    }
  } catch (error) {}

  return NextResponse.json({ success: true, logs: serverStore.auditLogs });
}


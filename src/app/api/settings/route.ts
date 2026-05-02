import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAuthSession } from '@/lib/getSession';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET /api/settings - Public (uses admin client to bypass RLS)
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('settings')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: 'خطأ في الخادم' }, { status: 500 });
  }

  return NextResponse.json(
    { data },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, max-age=0, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    }
  );
}

// PUT /api/settings - Admin only
export async function PUT(request: NextRequest) {
  const session = await getAuthSession(request);
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  try {
    const body = await request.json();

    // Get all rows and use the first one
    const { data: rows } = await supabaseAdmin.from('settings').select('id');
    
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'غير موجود' }, { status: 404 });
    }

    const primaryId = rows[0].id;

    // Delete any duplicate rows
    if (rows.length > 1) {
      const duplicateIds = rows.slice(1).map(r => r.id);
      await supabaseAdmin.from('settings').delete().in('id', duplicateIds);
    }

    // Update the single remaining row
    const { data, error } = await supabaseAdmin
      .from('settings')
      .update({
        ...body,
        sham_cash_enabled: body.sham_cash_enabled === true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', primaryId)
      .select()
      .single();

    if (error) {
      console.error('Settings update error:', error);
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطأ في الخادم';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

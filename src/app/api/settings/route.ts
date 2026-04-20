import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { getAuthSession } from '@/lib/getSession';

export const dynamic = 'force-dynamic';

// GET /api/settings - Public
export async function GET() {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: 'خطأ في الخادم' }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// PUT /api/settings - Admin only
export async function PUT(request: NextRequest) {
  const session = await getAuthSession(request);
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  try {
    const body = await request.json();

    // Settings is a single-row table — update the first (only) row
    const { data: existing } = await supabaseAdmin
      .from('settings')
      .select('id')
      .single();

    if (!existing) {
      return NextResponse.json({ error: 'غير موجود' }, { status: 404 });
    }

    const { data, error } = await supabaseAdmin
      .from('settings')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطأ في الخادم';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

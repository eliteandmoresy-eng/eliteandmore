import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { getAuthSession } from '@/lib/getSession';

export const dynamic = 'force-dynamic';

// GET /api/banners - Public
// ?active=true → only active banners ordered by sort_order
// No param → all banners (for admin management)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('active') === 'true';

  let query = supabase
    .from('banners')
    .select('*')
    .order('sort_order', { ascending: true });

  if (activeOnly) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: 'خطأ في الخادم' }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// POST /api/banners - Admin only
export async function POST(request: NextRequest) {
  const session = await getAuthSession(request);
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  try {
    const body = await request.json();
    const { data, error } = await supabaseAdmin
      .from('banners')
      .insert(body)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطأ في الخادم';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

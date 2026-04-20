import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { getAuthSession } from '@/lib/getSession';

export const dynamic = 'force-dynamic';

// GET /api/governorates - Public
export async function GET() {
  const { data, error } = await supabase
    .from('governorates')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    return NextResponse.json({ error: 'خطأ في الخادم' }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// POST /api/governorates - Admin only
export async function POST(request: NextRequest) {
  const session = await getAuthSession(request);
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  try {
    const body = await request.json();
    const { data: governorate, error } = await supabaseAdmin
      .from('governorates')
      .insert(body)
      .select()
      .single();

    if (error) throw error;

    // Insert product_governorates rows for all existing products
    const { data: products } = await supabaseAdmin
      .from('products')
      .select('id');

    if (products?.length) {
      await supabaseAdmin.from('product_governorates').insert(
        products.map((p: { id: string }) => ({
          product_id: p.id,
          governorate_id: governorate.id,
          is_available: true,
        }))
      );
    }

    return NextResponse.json({ data: governorate }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطأ في الخادم';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

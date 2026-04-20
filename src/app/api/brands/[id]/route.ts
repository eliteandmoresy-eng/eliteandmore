import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { getAuthSession } from '@/lib/getSession';
import { deleteCloudinaryImage } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

// GET /api/brands/[id] - Public (id or slug)
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    let query = supabase.from('brands').select('*');
    query = isUuid ? query.eq('id', id) : query.eq('slug', id);

    const { data: brand, error } = await query.single();

    if (error || !brand) {
      return NextResponse.json({ error: 'غير موجود' }, { status: 404 });
    }

    // Include categories if brand has them
    let categories = null;
    if (brand.has_categories) {
      const { data: cats } = await supabase
        .from('categories')
        .select('*')
        .eq('brand_id', brand.id)
        .order('sort_order', { ascending: true });
      categories = cats;
    }

    return NextResponse.json({ data: { ...brand, categories } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطأ في الخادم';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT /api/brands/[id] - Admin only
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession(request);
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { id } = params;

  try {
    const body = await request.json();
    const { data, error } = await supabaseAdmin
      .from('brands')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'غير موجود' }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطأ في الخادم';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/brands/[id] - Admin only
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession(request);
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { id } = params;

  try {
    // Get brand for logo/cover URLs
    const { data: brand } = await supabaseAdmin
      .from('brands')
      .select('logo_url, cover_url')
      .eq('id', id)
      .single();

    // Get all product images for products in this brand
    const { data: products } = await supabaseAdmin
      .from('products')
      .select('id')
      .eq('brand_id', id);

    if (products?.length) {
      const productIds = products.map((p: { id: string }) => p.id);
      const { data: imageRows } = await supabaseAdmin
        .from('product_images')
        .select('url')
        .in('product_id', productIds);

      if (imageRows?.length) {
        await Promise.all(imageRows.map((img: { url: string }) => deleteCloudinaryImage(img.url)));
      }
    }

    // Delete brand logo and cover from Cloudinary
    if (brand?.logo_url) await deleteCloudinaryImage(brand.logo_url);
    if (brand?.cover_url) await deleteCloudinaryImage(brand.cover_url);

    // Delete brand (DB cascade handles products and related rows)
    const { error } = await supabaseAdmin.from('brands').delete().eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطأ في الخادم';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

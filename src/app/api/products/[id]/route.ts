import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { getAuthSession } from '@/lib/getSession';
import { deleteCloudinaryImage } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

const FULL_SELECT = `*,
  brand:brands(id,name,slug,logo_url),
  category:categories(id,name,slug),
  images:product_images(*),
  variants:product_variants(*),
  tags:product_tags(tag:tags(*)),
  governorates:product_governorates(governorate:governorates(*))`;

// GET /api/products/[id] - Public (id or slug)
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Try by UUID first, then by slug
    let query = supabase.from('products').select(FULL_SELECT);

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    if (isUuid) {
      query = query.eq('id', id);
    } else {
      query = query.eq('slug', id);
    }

    const { data, error } = await query.single();

    if (error || !data) {
      return NextResponse.json({ error: 'غير موجود' }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطأ في الخادم';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT /api/products/[id] - Admin only
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession(request);
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { id } = params;

  try {
    const body = await request.json();
    const { images, variants, tag_ids, governorates: govs, ...productData } = body;

    // Always ensure slug exists
    if (!productData.slug || productData.slug.trim().length < 2) {
      const { generateSlug } = await import('@/lib/utils');
      productData.slug = generateSlug(productData.name);
    }

    // Check for duplicate slugs (excluding current product)
    let slugCounter = 0;
    let finalSlug = productData.slug;
    while (true) {
      const { data: existing } = await supabaseAdmin
        .from('products')
        .select('id')
        .eq('slug', finalSlug)
        .neq('id', id)
        .single();
      if (!existing) break;
      slugCounter++;
      finalSlug = `${productData.slug}-${slugCounter}`;
    }
    productData.slug = finalSlug;

    // Update product
    const { data: product, error } = await supabaseAdmin
      .from('products')
      .update({ ...productData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error || !product) {
      return NextResponse.json({ error: 'غير موجود' }, { status: 404 });
    }

    // Replace images
    if (images !== undefined) {
      await supabaseAdmin.from('product_images').delete().eq('product_id', id);
      if (images.length) {
        await supabaseAdmin.from('product_images').insert(
          images.map((img: { url: string; is_primary?: boolean; sort_order?: number; variant_id?: string }, i: number) => ({
            product_id: id,
            url: typeof img === 'string' ? img : img.url,
            is_primary: typeof img === 'string' ? i === 0 : (img.is_primary ?? i === 0),
            sort_order: typeof img === 'string' ? i : (img.sort_order ?? i),
            variant_id: typeof img === 'string' ? null : (img.variant_id ?? null),
          }))
        );
      }
    }

    // Replace variants
    if (variants !== undefined) {
      await supabaseAdmin.from('product_variants').delete().eq('product_id', id);
      if (variants.length) {
        await supabaseAdmin.from('product_variants').insert(
          variants.map((v: { variant_type: string; name: string; value?: string; price_syp?: number; sort_order?: number }, i: number) => ({
            product_id: id,
            variant_type: v.variant_type,
            name: v.name,
            value: v.value ?? null,
            price_syp: v.price_syp ?? null,
            sort_order: v.sort_order ?? i,
          }))
        );
      }
    }

    // Replace tags
    if (tag_ids !== undefined) {
      await supabaseAdmin.from('product_tags').delete().eq('product_id', id);
      if (tag_ids.length) {
        await supabaseAdmin.from('product_tags').insert(
          tag_ids.map((tag_id: string) => ({ product_id: id, tag_id }))
        );
      }
    }

    // Replace governorates
    if (govs !== undefined) {
      await supabaseAdmin.from('product_governorates').delete().eq('product_id', id);
      if (govs.length) {
        await supabaseAdmin.from('product_governorates').insert(
          govs.map((g: { governorate_id: string; is_available?: boolean }) => ({
            product_id: id,
            governorate_id: g.governorate_id,
            is_available: g.is_available ?? true,
          }))
        );
      }
    }

    return NextResponse.json({ data: product });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطأ في الخادم';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/products/[id] - Admin only
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession(request);
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { id } = params;

  try {
    // Collect all image URLs before deletion
    const { data: imageRows } = await supabaseAdmin
      .from('product_images')
      .select('url')
      .eq('product_id', id);

    // Delete from Cloudinary
    if (imageRows?.length) {
      await Promise.all(imageRows.map((img: { url: string }) => deleteCloudinaryImage(img.url)));
    }

    // Delete product (cascades images, variants, tags, governorates)
    const { error } = await supabaseAdmin.from('products').delete().eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطأ في الخادم';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { getAuthSession } from '@/lib/getSession';

export const dynamic = 'force-dynamic';

// GET /api/products - Public
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const brandSlug = searchParams.get('brand');
  const categoryId = searchParams.get('category');
  const categorySlug = searchParams.get('category_slug');
  const tagSlug = searchParams.get('tag');
  const governorateId = searchParams.get('governorate');
  const search = searchParams.get('search');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const available = searchParams.get('available');
  const sort = searchParams.get('sort') || 'newest';

  try {
    const session = await getAuthSession();
    const isAdmin = !!session;
    const stockStatus = searchParams.get('stock'); // 'in_stock' or 'out_of_stock'

    let query = supabase
      .from('products')
      .select(
        `*,
        brand:brands(id,name,slug,logo_url),
        category:categories(id,name,slug),
        images:product_images(*),
        tags:product_tags(tag:tags(*)),
        governorates:product_governorates(*)`,
        { count: 'exact' }
      );

    if (!isAdmin) {
      query = query.eq('is_active', true);
    } else {
      // Admin can filter by is_active explicitly
      const isActive = searchParams.get('is_active');
      if (isActive) query = query.eq('is_active', isActive === 'true');
    }

    if (stockStatus) {
      query = query.eq('stock_status', stockStatus);
    }

    // Brand filter by slug
    if (brandSlug) {
      const { data: brand } = await supabase
        .from('brands')
        .select('id')
        .eq('slug', brandSlug)
        .single();
      if (brand) {
        query = query.eq('brand_id', brand.id);
      }
    }

    // Category filter by id or slug
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    } else if (categorySlug) {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();
      if (cat) {
        query = query.eq('category_id', cat.id);
      }
    }

    // Tag filter via subquery
    if (tagSlug) {
      const { data: tag } = await supabase
        .from('tags')
        .select('id')
        .eq('slug', tagSlug)
        .single();
      if (tag) {
        const { data: productTagRows } = await supabase
          .from('product_tags')
          .select('product_id')
          .eq('tag_id', tag.id);
        const productIds = (productTagRows || []).map((r: { product_id: string }) => r.product_id);
        query = query.in('id', productIds.length ? productIds : ['00000000-0000-0000-0000-000000000000']);
      }
    }

    // Governorate filter: product must be available in that governorate
    if (governorateId) {
      const { data: govRows } = await supabase
        .from('product_governorates')
        .select('product_id')
        .eq('governorate_id', governorateId)
        .eq('is_available', true);
      const productIds = (govRows || []).map((r: { product_id: string }) => r.product_id);
      query = query.in('id', productIds.length ? productIds : ['00000000-0000-0000-0000-000000000000']);
    }

    // Search
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    // Price range
    if (minPrice) {
      query = query.gte('price_syp', parseFloat(minPrice));
    }
    if (maxPrice) {
      query = query.lte('price_syp', parseFloat(maxPrice));
    }

    // Available (in_stock)
    if (available === 'true') {
      query = query.eq('stock_status', 'in_stock');
    }

    // Sorting
    switch (sort) {
      case 'oldest':
        query = query.order('created_at', { ascending: true });
        break;
      case 'price_asc':
        query = query.order('price_syp', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price_syp', { ascending: false });
        break;
      case 'name':
        query = query.order('name', { ascending: true });
        break;
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data, count, error } = await query;

    if (error) throw error;

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطأ في الخادم';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/products - Admin only
export async function POST(request: NextRequest) {
  const session = await getAuthSession(request);
  if (!session) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { images, variants, tag_ids, governorates: govs, ...productData } = body;

    // Ensure slug exists
    if (!productData.slug && productData.name) {
      const { generateSlug } = await import('@/lib/utils');
      productData.slug = generateSlug(productData.name);
    }

    // Insert product
    const { data: product, error } = await supabaseAdmin
      .from('products')
      .insert(productData)
      .select()
      .single();

    if (error) throw error;

    // Insert images
    if (images?.length) {
      await supabaseAdmin.from('product_images').insert(
        images.map((img: { url: string; is_primary?: boolean; sort_order?: number; variant_id?: string }, i: number) => ({
          product_id: product.id,
          url: img.url ?? img,
          is_primary: img.is_primary ?? i === 0,
          sort_order: img.sort_order ?? i,
          variant_id: img.variant_id ?? null,
        }))
      );
    }

    // Insert variants
    if (variants?.length) {
      await supabaseAdmin.from('product_variants').insert(
        variants.map((v: { variant_type: string; name: string; value?: string; price_syp?: number; sort_order?: number }, i: number) => ({
          product_id: product.id,
          variant_type: v.variant_type,
          name: v.name,
          value: v.value ?? null,
          price_syp: v.price_syp ?? null,
          sort_order: v.sort_order ?? i,
        }))
      );
    }

    // Insert tags
    if (tag_ids?.length) {
      await supabaseAdmin.from('product_tags').insert(
        tag_ids.map((tag_id: string) => ({ product_id: product.id, tag_id }))
      );
    }

    // Insert governorates
    if (govs?.length) {
      await supabaseAdmin.from('product_governorates').insert(
        govs.map((g: { governorate_id: string; is_available?: boolean }) => ({
          product_id: product.id,
          governorate_id: g.governorate_id,
          is_available: g.is_available ?? true,
        }))
      );
    }

    return NextResponse.json({ data: product }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطأ في الخادم';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

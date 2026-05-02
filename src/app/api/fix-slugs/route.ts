import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAuthSession } from '@/lib/getSession';
import { generateSlug } from '@/lib/utils';

export const dynamic = 'force-dynamic';

// GET /api/fix-slugs - Admin only: generates slugs for all products missing them
export async function GET(request: NextRequest) {
  const session = await getAuthSession(request);
  if (!session) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }

  try {
    // Get products with null/empty slugs OR slugs containing spaces
    const { data: products, error } = await supabaseAdmin
      .from('products')
      .select('id, name, slug')
      .or('slug.is.null,slug.eq.,slug.ilike."% %"');

    if (error) throw error;
    if (!products || products.length === 0) {
      return NextResponse.json({ message: 'جميع المنتجات تملك روابط صحيحة!', fixed: 0 });
    }

    // Generate and update slugs
    const updates = [];
    for (const product of products) {
      const newSlug = generateSlug(product.name);
      
      // Check for duplicates and make unique if needed
      let finalSlug = newSlug;
      let counter = 1;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { data: existing } = await supabaseAdmin
          .from('products')
          .select('id')
          .eq('slug', finalSlug)
          .neq('id', product.id)
          .single();

        if (!existing) break;
        finalSlug = `${newSlug}-${counter}`;
        counter++;
      }

      const { error: updateError } = await supabaseAdmin
        .from('products')
        .update({ slug: finalSlug })
        .eq('id', product.id);

      if (!updateError) {
        updates.push({ id: product.id, name: product.name, slug: finalSlug });
      }
    }

    return NextResponse.json({
      message: `تم إصلاح ${updates.length} منتج بنجاح!`,
      fixed: updates.length,
      products: updates,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطأ في الخادم';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

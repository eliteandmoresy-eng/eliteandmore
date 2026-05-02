import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Product } from '@/types';
import ProductPageClient from './ProductPageClient';
import { getAuthSession } from '@/lib/getSession';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const variations = Array.from(new Set([
    params.slug,
    decodedSlug,
    decodedSlug.replace(/-/g, ' '),
    decodedSlug.replace(/\s+/g, '-')
  ])).map(v => `slug.eq."${v}"`).join(',');

  const { data } = await supabase
    .from('products')
    .select('name, description')
    .or(variations)
    .single();
  return {
    title: data ? `${data.name} — Elite and More` : 'Elite and More',
    description: data?.description ?? undefined,
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const session = await getAuthSession();
  const isAdmin = !!session;

  // Build a highly resilient filter
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(params.slug);
  
  const filters = [
    `slug.eq."${params.slug}"`,
    `slug.eq."${decodedSlug}"`,
    `slug.eq."${decodedSlug.replace(/-/g, ' ')}"`,
    `slug.eq."${decodedSlug.replace(/\s+/g, '-')}"`
  ];

  if (isUuid) {
    filters.push(`id.eq."${params.slug}"`);
  }

  const variations = Array.from(new Set(filters)).join(',');

  let query = supabase
    .from('products')
    .select(`
      *,
      brand:brands(id,name,slug,logo_url),
      category:categories(id,name,slug),
      images:product_images(*),
      variants:product_variants(*),
      tags:product_tags(tag:tags(*)),
      governorates:product_governorates(*, governorate:governorates(*))
    `)
    .or(variations);

  if (!isAdmin) {
    query = query.eq('is_active', true);
  }

  const { data: product } = await query.single();

  if (!product) notFound();

  const { data: related } = await supabase
    .from('products')
    .select('*, images:product_images(*), brand:brands(id,name,slug,logo_url)')
    .eq('brand_id', product.brand_id)
    .neq('id', product.id)
    .eq('is_active', true)
    .limit(4);

  return (
    <ProductPageClient
      product={product as unknown as Product}
      relatedProducts={(related ?? []) as unknown as Product[]}
    />
  );
}

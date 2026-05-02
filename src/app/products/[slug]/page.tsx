import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const revalidate = 0;
export const dynamic = 'force-dynamic';
import { Product } from '@/types';
import ProductPageClient from './ProductPageClient';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data } = await supabase
    .from('products')
    .select('name, description')
    .eq('slug', params.slug)
    .single();
  return {
    title: data ? `${data.name} — Elite and More` : 'Elite and More',
    description: data?.description ?? undefined,
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { data: product } = await supabase
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
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single();

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

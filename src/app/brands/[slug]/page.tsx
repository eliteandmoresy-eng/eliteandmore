import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Category } from '@/types';
import BrandPageClient from './BrandPageClient';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data: brand } = await supabase
    .from('brands')
    .select('name, description')
    .eq('slug', params.slug)
    .single();
  return {
    title: brand ? `${brand.name} — Elite and More` : 'Elite and More',
    description: brand?.description ?? undefined,
  };
}

export default async function BrandPage({ params }: { params: { slug: string } }) {
  const { data: brand } = await supabase
    .from('brands')
    .select('*, categories:categories(*)')
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single();

  if (!brand) notFound();

  const categories = (brand.categories ?? []) as Category[];

  return <BrandPageClient brand={brand} categories={categories} />;
}

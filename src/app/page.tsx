import { supabase } from '@/lib/supabase';
import { Star } from 'lucide-react';
import { Brand, Banner, Tag, Category, Product } from '@/types';
import HeroBanner from '@/components/home/HeroBanner';
import FeaturesStrip from '@/components/home/FeaturesStrip';
import BrandsGrid from '@/components/home/BrandsGrid';
import TagSection from '@/components/home/TagSection';
import BrandProductsSection from '@/components/home/BrandProductsSection';
import ProductCard from '@/components/product/ProductCard';

export const revalidate = 60;

export default async function HomePage() {
  const [brandsResult, bannersResult, tagsResult] = await Promise.all([
    supabase.from('brands').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('banners').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('tags').select('*').eq('show_on_home', true).order('sort_order'),
  ]);

  const brands = (brandsResult.data ?? []) as Brand[];
  const banners = (bannersResult.data ?? []) as Banner[];
  const tags = (tagsResult.data ?? []) as Tag[];

  // Fetch brand products and categories in parallel
  const brandDataPromises = brands.map(async (brand) => {
    const [productsResult, categoriesResult] = await Promise.all([
      supabase
        .from('products')
        .select('*, images:product_images(*), brand:brands(id,name,slug,logo_url), category:categories(id,name,slug), tags:product_tags(tag:tags(id,name,slug,color))')
        .eq('brand_id', brand.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(8),
      brand.has_categories
        ? supabase.from('categories').select('*').eq('brand_id', brand.id).order('sort_order')
        : Promise.resolve({ data: [] as Category[] }),
    ]);

    const products = (productsResult.data ?? []) as unknown as Product[];
    const categories = (categoriesResult.data ?? []) as Category[];

    const productsByCategory: Record<string, Product[]> = {};
    categories.forEach((cat) => {
      productsByCategory[cat.id] = products.filter((p) => p.category_id === cat.id);
    });

    return { brand, products, categories, productsByCategory };
  });
  const brandData = await Promise.all(brandDataPromises);

  // Fetch tag products in parallel
  const tagDataPromises = tags.map(async (tag) => {
    const { data: ptRows } = await supabase
      .from('product_tags')
      .select('product_id')
      .eq('tag_id', tag.id)
      .limit(10);

    const ids = (ptRows ?? []).map((r: { product_id: string }) => r.product_id);
    if (ids.length === 0) return { tag, products: [] as Product[] };

    const { data: products } = await supabase
      .from('products')
      .select('*, images:product_images(*), brand:brands(id,name,slug,logo_url), tags:product_tags(tag:tags(id,name,slug,color))')
      .in('id', ids)
      .eq('is_active', true);

    return { tag, products: (products ?? []) as unknown as Product[] };
  });

  // Fetch Featured Products (MegaMart logic: Universal featured items)
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*, images:product_images(*), brand:brands(id,name,slug,logo_url), tags:product_tags(tag:tags(id,name,slug,color))')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('updated_at', { ascending: false })
    .limit(12);

  const tagData = await Promise.all(tagDataPromises);

  const activeBrandData = brandData.filter(({ products }) => products.length > 0);
  const activeTagData = tagData.filter(({ products }) => products.length > 0);

  return (
    <div className="min-h-screen bg-cream">

      {/* 1. Hero + Banners merged */}
      <HeroBanner banners={banners} />

      {/* 2. Features strip */}
      <FeaturesStrip />

      {/* 3. Brands grid */}
      {brands.length > 0 && (
        <section id="brands" className="py-4 md:py-6 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <BrandsGrid brands={brands} />
          </div>
        </section>
      )}

      {/* 4. Tag sections (جديد، الأكثر مبيعاً، إلخ) */}
      {activeTagData.length > 0 && (
        <div className="space-y-0">
          {activeTagData.map(({ tag, products }) => (
            <TagSection key={tag.id} tag={tag} products={products} />
          ))}
        </div>
      )}

      {/* 5. Brand product sections */}
      {activeBrandData.length > 0 && (
        <div className="bg-cream pb-12">
          {activeBrandData.map(({ brand, products, categories, productsByCategory }, idx) => (
            <div key={brand.id}>
              {idx > 0 && (
                <div className="max-w-4xl mx-auto px-12 py-10">
                  <div className="h-px bg-primary/10" />
                </div>
              )}
              <BrandProductsSection
                brand={brand}
                categories={categories}
                productsByCategory={productsByCategory as Record<string, Product[]>}
                allProducts={products}
              />
            </div>
          ))}
        </div>
      )}

      {/* 6. Featured Products Section (MegaMart inspired) */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-8 md:py-12 bg-white border-t border-elite-border/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8 md:mb-12 md:px-2">
              <div className="flex items-center gap-4">
                <div className="w-2 h-10 md:h-14 rounded-full bg-gold flex-shrink-0" />
                <div>
                  <span className="font-tajawal text-[10px] md:text-xs text-elite-muted uppercase tracking-widest font-bold block mb-1">مختاراتنا</span>
                  <h2 className="font-cairo font-black text-2xl md:text-4xl text-elite-text leading-none">
                    منتجاتنا المختارة لك
                  </h2>
                </div>
              </div>
              <p className="hidden lg:block font-tajawal text-sm text-elite-muted max-w-xs text-left">
                تشكيلة حصرية من أفضل المنتجات العالمية التي نثق بجودتها
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product as unknown as Product} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

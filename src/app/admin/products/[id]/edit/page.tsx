'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowRight, Box, CreditCard, LayoutGrid, Image as ImageIcon, Tags, MapPin, Settings, Save, Info, ExternalLink, Trash2 } from 'lucide-react';
import { productSchema } from '@/lib/validators';
import { formatUSD } from '@/lib/utils';
import { Brand, Category, ProductVariant } from '@/types';
import { useSettings } from '@/hooks/useSettings';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Switch from '@/components/ui/Switch';
import Button from '@/components/ui/Button';
import MultiImageUploader from '@/components/admin/MultiImageUploader';
import VariantEditor from '@/components/admin/VariantEditor';
import TagSelector from '@/components/admin/TagSelector';
import GovernorateAvailabilityEditor from '@/components/admin/GovernorateAvailabilityEditor';

type ProductFormData = z.infer<typeof productSchema>;

interface UploadedImage {
  url: string;
  is_primary: boolean;
  sort_order: number;
}

interface GovernorateAvailability {
  governorate_id: string;
  is_available: boolean;
}

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { settings } = useSettings();

  const [fetching, setFetching] = useState(true);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [governorates, setGovernorates] = useState<GovernorateAvailability[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      brand_id: '',
      category_id: null,
      name: '',
      slug: '',
      description: '',
      price_syp: 0,
      sale_enabled: false,
      sale_price_syp: null,
      stock_status: 'in_stock',
      is_featured: false,
      is_active: true,
      sort_order: 0,
    },
  });

  const brandId = watch('brand_id');
  const saleEnabled = watch('sale_enabled');
  const priceValue = watch('price_syp');
  const productName = watch('name');

  useEffect(() => {
    fetch('/api/brands?all=true')
      .then((r) => r.json())
      .then((d) => setBrands(d.data ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!brandId || brands.length === 0) return;
    const brand = brands.find((b) => b.id === brandId) ?? null;
    setSelectedBrand(brand);
    if (brand?.has_categories) {
      fetch(`/api/categories?brand_id=${brandId}`)
        .then((r) => r.json())
        .then((d) => setCategories(d.data ?? []))
        .catch(() => {});
    } else {
      setCategories([]);
    }
  }, [brandId, brands]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'فشل التحميل');
        const p = json.data;

        reset({
          brand_id: p.brand_id,
          category_id: p.category_id ?? null,
          name: p.name,
          slug: p.slug,
          description: p.description ?? '',
          price_syp: p.price_syp,
          sale_enabled: p.sale_enabled,
          sale_price_syp: p.sale_price_syp ?? null,
          stock_status: p.stock_status,
          is_featured: p.is_featured,
          is_active: p.is_active,
          sort_order: p.sort_order,
        });

        if (p.images) {
          setImages(
            p.images
              .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
              .map((img: { url: string; is_primary: boolean; sort_order: number }) => ({
                url: img.url,
                is_primary: img.is_primary,
                sort_order: img.sort_order,
              }))
          );
        }
        if (p.variants) setVariants(p.variants);
        if (p.tags) setTagIds(p.tags.map((t: { id: string }) => t.id));
        if (p.governorates) {
          setGovernorates(
            p.governorates.map((g: { governorate_id: string; is_available: boolean }) => ({
              governorate_id: g.governorate_id,
              is_available: g.is_available,
            }))
          );
        }
      } catch {
        toast.error('فشل تحميل بيانات المنتج');
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [id, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const body = {
        ...data,
        images,
        variants,
        tag_ids: tagIds,
        governorates,
      };
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'فشل الحفظ');
      toast.success('تم تحديث المنتج بنجاح');
      router.push('/admin/products');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل الحفظ');
    }
  };

  const brandOptions = brands.map((b) => ({ value: b.id, label: b.name }));
  const categoryOptions = [
    { value: '', label: 'بدون تصنيف' },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];
  const stockOptions = [
    { value: 'in_stock', label: 'متوفر' },
    { value: 'out_of_stock', label: 'غير متوفر' },
  ];

  const cardClass = 'bg-white rounded-[32px] shadow-soft p-6 md:p-8 border border-white/50 backdrop-blur-sm space-y-6';
  const sectionHeaderClass = 'flex items-center gap-3 mb-2';
  const sectionTitleClass = 'text-lg font-bold font-cairo text-elite-text leading-none';
  const sectionDescClass = 'text-xs text-elite-muted mb-4 block';

  if (fetching) {
    return (
      <div dir="rtl" className="max-w-4xl mx-auto space-y-8 pb-20 px-4 pt-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl animate-pulse" />
          <div className="space-y-2">
            <div className="h-8 w-48 bg-white rounded-xl animate-pulse" />
            <div className="h-4 w-32 bg-white rounded-lg animate-pulse" />
          </div>
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-[32px] shadow-soft p-8 space-y-6">
            <div className="h-6 w-32 bg-surface-dim rounded animate-pulse" />
            <div className="grid grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((__, j) => (
                <div key={j} className="h-12 bg-surface-dim rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div dir="rtl" className="font-tajawal max-w-4xl mx-auto pb-40 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pt-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/products" 
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-soft text-elite-muted hover:text-gold hover:scale-105 transition-all active:scale-95"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-cairo text-elite-text">تعديل المنتج</h1>
            <p className="text-sm text-elite-muted">تحديث بيانات ومنشور المنتج: {productName}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <Link 
             href={`/products/${watch('slug')}`}
             target="_blank"
             className="flex items-center gap-2 px-4 py-2.5 bg-primary/5 text-primary rounded-xl border border-primary/10 hover:bg-primary hover:text-white transition-all font-bold text-xs"
           >
              <ExternalLink className="w-4 h-4" />
              معاينة المتجر
           </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info */}
        <div className={cardClass}>
          <div className={sectionHeaderClass}>
            <div className="p-2 bg-primary/5 text-primary rounded-xl">
              <Box className="w-5 h-5" />
            </div>
            <h2 className={sectionTitleClass}>المعلومات الأساسية</h2>
          </div>
          <p className={sectionDescClass}>تحديث الاسم والوصف والتصنيفات للمنتج</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="اسم المنتج"
              placeholder="اسم المنتج..."
              required
              error={errors.name?.message}
              {...register('name')}
              className="bg-surface-dim/40 border-none rounded-2xl"
            />

            <input type="hidden" {...register('slug')} />

            <Controller
              name="brand_id"
              control={control}
              render={({ field }) => (
                <Select
                  label="البرند المصنّع"
                  required
                  options={brandOptions}
                  placeholder="اختر البرند"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={errors.brand_id?.message}
                  className="bg-surface-dim/40 border-none rounded-2xl"
                />
              )}
            />

            {selectedBrand?.has_categories && (
              <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                  <Select
                    label="التصنيف الداخلي"
                    options={categoryOptions}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value || null)}
                    error={errors.category_id?.message}
                    className="bg-surface-dim/40 border-none rounded-2xl"
                  />
                )}
              />
            )}
            
            <div className="md:col-span-2">
              <Textarea
                label="وصف المنتج التفصيلي"
                rows={5}
                error={errors.description?.message}
                {...register('description')}
                className="bg-surface-dim/40 border-none rounded-[28px] p-5"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className={cardClass}>
          <div className={sectionHeaderClass}>
            <div className="p-2 bg-gold/5 text-gold rounded-xl">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className={sectionTitleClass}>إعدادات السعر</h2>
          </div>
          <p className={sectionDescClass}>تحديث الأسعار والحملات الترويجية الجارية</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
             <div className="space-y-4">
                <Input
                  label="السعر الأصلي (ل.س)"
                  required
                  type="number"
                  error={errors.price_syp?.message}
                  {...register('price_syp', { valueAsNumber: true })}
                  className="bg-surface-dim/40 border-none rounded-2xl text-lg font-black text-primary"
                />

                {priceValue > 0 && settings.exchange_rate_syp && (
                  <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-xl border border-primary/10">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-bold text-elite-muted">
                      يعادل تقريباً: <span className="text-primary">{formatUSD(priceValue, settings.exchange_rate_syp)}</span>
                    </span>
                  </div>
                )}
             </div>

             <div className="space-y-4 p-5 rounded-3xl bg-surface-dim/30 border border-white/50">
                <div className="flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-sm font-bold text-elite-text">تفعيل سعر الخصم</span>
                   </div>
                   <Controller
                    name="sale_enabled"
                    control={control}
                    render={({ field }) => (
                      <Switch checked={field.value} onChange={field.onChange} />
                    )}
                  />
                </div>

                {saleEnabled && (
                  <div className="pt-2 animate-in fade-in slide-in-from-top-1">
                    <Input
                      label="سعر العرض (ل.س)"
                      type="number"
                      error={errors.sale_price_syp?.message}
                      {...register('sale_price_syp', { valueAsNumber: true })}
                      className="bg-white border-gold/30 rounded-2xl text-lg font-black text-gold"
                    />
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Images */}
        <div className={cardClass}>
          <div className={sectionHeaderClass}>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h2 className={sectionTitleClass}>معرض الصور</h2>
          </div>
          <MultiImageUploader images={images} onChange={setImages} />
        </div>

        {/* Variants & Tags Group */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={cardClass}>
              <div className={sectionHeaderClass}>
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <h2 className={sectionTitleClass}>المتغيرات</h2>
              </div>
              <VariantEditor variants={variants} onChange={setVariants} />
            </div>

            <div className={cardClass}>
              <div className={sectionHeaderClass}>
                <div className="p-2 bg-pink-50 text-pink-600 rounded-xl">
                  <Tags className="w-5 h-5" />
                </div>
                <h2 className={sectionTitleClass}>شارات التمييز</h2>
              </div>
              <TagSelector selectedTagIds={tagIds} onChange={setTagIds} />
            </div>
        </div>

        {/* Availability */}
        <div className={cardClass}>
          <div className={sectionHeaderClass}>
            <div className="p-2 bg-green-50 text-green-600 rounded-xl">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className={sectionTitleClass}>التوفر بالمحافظات</h2>
          </div>
          <GovernorateAvailabilityEditor value={governorates} onChange={setGovernorates} />
        </div>

        {/* Final Settings */}
        <div className={cardClass}>
          <div className={sectionHeaderClass}>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
              <Settings className="w-5 h-5" />
            </div>
            <h2 className={sectionTitleClass}>الإعدادات النهائية</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Controller
              name="stock_status"
              control={control}
              render={({ field }) => (
                <Select
                  label="حالة المخزون"
                  options={stockOptions}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="bg-surface-dim/40 border-none rounded-2xl"
                />
              )}
            />

            <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-dim/20 border border-white/50 h-[84px] md:mt-auto">
               <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-elite-text">منتج مميز</span>
               </div>
               <Controller
                name="is_featured"
                control={control}
                render={({ field }) => (
                  <Switch checked={field.value} onChange={field.onChange} />
                )}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-dim/20 border border-white/50 h-[84px] md:mt-auto">
               <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-elite-text">حالة العرض</span>
               </div>
               <Controller
                name="is_active"
                control={control}
                render={({ field }) => (
                  <Switch checked={field.value} onChange={field.onChange} />
                )}
              />
            </div>
          </div>
          
          <div className="max-w-xs pt-2">
            <Input
              label="ترتيب الظهور"
              type="number"
              error={errors.sort_order?.message}
              {...register('sort_order', { valueAsNumber: true })}
              className="bg-surface-dim/40 border-none rounded-2xl"
            />
          </div>
        </div>
      </form>

      {/* Modern Sticky Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 animate-in fade-in slide-in-from-bottom-5">
        <div className="bg-primary-dark/95 backdrop-blur-xl border border-white/10 p-4 rounded-[32px] shadow-2xl flex items-center justify-between">
           <div className="hidden md:flex items-center gap-4 px-4 border-r border-white/10 overflow-hidden">
             <div className="text-white">
                <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">تعديل المنتج الحالي</p>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                   <p className="text-xs font-bold truncate max-w-[200px]">{productName}</p>
                </div>
             </div>
           </div>
           
           <div className="flex items-center gap-3 w-full md:w-auto">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                className="bg-white/5 text-white hover:bg-white/10 rounded-2xl flex-1 md:flex-none border-white/5"
              >
                إلغاء
              </Button>
              <Button
                type="button"
                variant="gold"
                loading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className="rounded-2xl px-12 group flex-1 md:flex-none shadow-lg shadow-gold/20"
              >
                <Save className="w-4 h-4 mr-2" />
                حفظ التعديلات
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}


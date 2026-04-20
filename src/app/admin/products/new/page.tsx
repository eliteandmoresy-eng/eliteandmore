'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowRight, Box, CreditCard, LayoutGrid, Image as ImageIcon, Tags, MapPin, Settings, HelpCircle, Save, Info } from 'lucide-react';
import { productSchema } from '@/lib/validators';
import { generateSlug, formatUSD } from '@/lib/utils';
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

export default function NewProductPage() {
  const router = useRouter();
  const { settings } = useSettings();

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

  useEffect(() => {
    fetch('/api/brands?all=true')
      .then((r) => r.json())
      .then((d) => setBrands(d.data ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!brandId) {
      setCategories([]);
      setSelectedBrand(null);
      setValue('category_id', null);
      return;
    }
    const brand = brands.find((b) => b.id === brandId) ?? null;
    setSelectedBrand(brand);
    if (brand?.has_categories) {
      fetch(`/api/categories?brand_id=${brandId}`)
        .then((r) => r.json())
        .then((d) => setCategories(d.data ?? []))
        .catch(() => {});
    } else {
      setCategories([]);
      setValue('category_id', null);
    }
  }, [brandId, brands, setValue]);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue('name', val);
    setValue('slug', generateSlug(val));
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      const body = {
        ...data,
        images,
        variants,
        tag_ids: tagIds,
        governorates,
      };
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'فشل الحفظ');
      toast.success('تمت إضافة المنتج بنجاح');
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
            <h1 className="text-2xl md:text-3xl font-bold font-cairo text-elite-text">إضافة منتج جديد</h1>
            <p className="text-sm text-elite-muted">قم بتعبئة بيانات المنتج الأساسية والمتفرعة بعناية</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-xl border border-gold/20">
           <Info className="w-4 h-4" />
           <span className="text-[11px] font-bold">تأكد من اختيار البريند أولاً لإظهار التصنيفات</span>
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
          <p className={sectionDescClass}>الاسم والماركة والتصنيف التابع لهذا المنتج</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="اسم المنتج"
              placeholder="مثال: ساعة لوريكس إصدار محدود"
              required
              error={errors.name?.message}
              {...register('name')}
              onChange={onNameChange}
              className="bg-surface-dim/40 border-none rounded-2xl"
            />

            <Input
              label="رابط المنتج (Slug)"
              placeholder="product-name"
              required
              error={errors.slug?.message}
              {...register('slug')}
              dir="ltr"
              className="bg-surface-dim/40 border-none rounded-2xl"
            />

            <Controller
              name="brand_id"
              control={control}
              render={({ field }) => (
                <Select
                  label="البرند المصنّع"
                  required
                  options={brandOptions}
                  placeholder="اختر البرند أولاً"
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
                placeholder="اكتب هنا كافة تفاصيل وميزات المنتج..."
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
          <p className={sectionDescClass}>إدارة الأسعار والتخفيضات ومعدلات الصرف</p>

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
                      <span className="text-[10px] text-elite-muted">تفعيل إشارة العروض على المنتج</span>
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
                      placeholder="خصم..."
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
          <p className={sectionDescClass}>أضف صور المنتج، الصورة الأولى ستكون هي الغلاف الأساسي</p>
          <div className="rounded-3xl border-2 border-dashed border-elite-border/30 p-2">
            <MultiImageUploader images={images} onChange={setImages} />
          </div>
        </div>

        {/* Advanced Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Variants */}
            <div className={cardClass}>
              <div className={sectionHeaderClass}>
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <h2 className={sectionTitleClass}>المتغيرات (الألوان/المقاسات)</h2>
              </div>
              <VariantEditor variants={variants} onChange={setVariants} />
            </div>

            {/* Tags */}
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
            <h2 className={sectionTitleClass}>التوفر والشحن</h2>
          </div>
          <p className={sectionDescClass}>حدد المحافظات التي تتوفر فيها خدمة التوصيل لهذا المنتج</p>
          <GovernorateAvailabilityEditor value={governorates} onChange={setGovernorates} />
        </div>

        {/* Status & Sorting */}
        <div className={cardClass}>
          <div className={sectionHeaderClass}>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
              <Settings className="w-5 h-5" />
            </div>
            <h2 className={sectionTitleClass}>إعدادات الظهور والحالة</h2>
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
                  <span className="text-[9px] text-elite-muted">يظهر في قسم "المختارات"</span>
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
                  <span className="text-[9px] text-elite-muted">إخفاء/إظهار المنتج للزبائن</span>
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
                <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest leading-none mb-1">المنتج الآن</p>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-gold" />
                   <p className="text-xs font-bold truncate max-w-[150px]">{watch('name') || 'قيد الإنشاء...'}</p>
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
                إلغاء المعالجة
              </Button>
              <Button
                type="button"
                variant="gold"
                loading={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className="rounded-2xl px-12 group flex-1 md:flex-none shadow-lg shadow-gold/20"
              >
                <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                حفظ المنتج النهائي
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}


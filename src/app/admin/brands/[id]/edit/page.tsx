'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowRight, Image as ImageIcon, Layout, Settings2, Globe, FileText } from 'lucide-react';
import { brandSchema } from '@/lib/validators';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Switch from '@/components/ui/Switch';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import ImageUploader from '@/components/admin/ImageUploader';
import HelpTooltip from '@/components/admin/HelpTooltip';

type BrandFormData = z.infer<typeof brandSchema>;

export default function EditBrandPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [fetching, setFetching] = useState(true);
  const [brandsCount, setBrandsCount] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      logo_url: '',
      cover_url: '',
      has_categories: true,
      sort_order: 0,
      is_active: true,
    },
  });

  const logoUrl = watch('logo_url');
  const coverUrl = watch('cover_url');

  useEffect(() => {
    const load = async () => {
      try {
        // Fetch brands count for sort order
        const brandsRes = await fetch('/api/brands?all=true');
        const brandsData = await brandsRes.json();
        setBrandsCount(brandsData.data?.length || 10);

        const res = await fetch(`/api/brands/${id}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'فشل التحميل');
        const b = json.data;
        reset({
          name: b.name,
          slug: b.slug,
          description: b.description ?? '',
          logo_url: b.logo_url,
          cover_url: b.cover_url ?? '',
          has_categories: b.has_categories,
          sort_order: b.sort_order,
          is_active: b.is_active,
        });
      } catch {
        toast.error('فشل تحميل بيانات البرند');
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [id, reset]);

  const onSubmit = async (data: BrandFormData) => {
    try {
      const res = await fetch(`/api/brands/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'فشل الحفظ');
      toast.success('تم تحديث البرند بنجاح');
      router.push('/admin/brands');
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل الحفظ');
    }
  };

  if (fetching) {
    return (
      <div dir="rtl" className="max-w-4xl mx-auto space-y-6 pb-12 px-4">
        <div className="h-10 w-48 bg-surface-dim rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-[400px] bg-white rounded-3xl shadow-soft animate-pulse" />
          </div>
          <div className="space-y-6">
            <div className="h-[300px] bg-white rounded-3xl shadow-soft animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Create options for sort order
  const sortOptions = Array.from({ length: Math.max(brandsCount, 20) }, (_, i) => ({
    label: `المركز ${i + 1}`,
    value: i.toString(),
  }));

  return (
    <div dir="rtl" className="font-tajawal max-w-4xl mx-auto pb-12 px-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/brands" 
          className="group p-3 rounded-2xl bg-white shadow-soft hover:bg-gold hover:text-primary-dark transition-all duration-300"
        >
          <ArrowRight className="w-6 h-6 transition-transform group-hover:scale-110" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-cairo text-elite-text">تعديل البرند</h1>
          <p className="text-elite-muted text-sm mt-1">تحديث معلومات وهوية البرند في المتجر</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Section */}
          <div className="bg-white rounded-[32px] shadow-soft p-6 md:p-8 space-y-6 border border-white/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-gold/10 text-gold-dark">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold font-cairo">المعلومات الأساسية</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="اسم البرند"
                placeholder="أدخل اسم البرند"
                required
                error={errors.name?.message}
                {...register('name')}
                className="bg-surface-dim/50 border-none focus:ring-2 focus:ring-gold/30"
              />

              <input type="hidden" {...register('slug')} />
            </div>

            <Textarea
              label="الوصف"
              placeholder="اكتب وصفاً مختصراً عن البرند..."
              rows={4}
              error={errors.description?.message}
              {...register('description')}
              className="bg-surface-dim/50 border-none focus:ring-2 focus:ring-gold/30 min-h-[120px]"
            />
          </div>

          {/* Visual Identity Section */}
          <div className="bg-white rounded-[32px] shadow-soft p-6 md:p-8 space-y-6 border border-white/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-gold/10 text-gold-dark">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold font-cairo">الهوية البصرية</h2>
            </div>

            <div className="space-y-8">
              {/* Logo Upload */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-elite-text">
                    الشعار (Logo) <span className="text-red-500 mr-1">*</span>
                  </label>
                  <span className="text-[10px] text-elite-muted bg-surface-dim px-2 py-1 rounded-lg">يفضل أن يكون بخلفية شفافة PNG</span>
                </div>
                <Controller
                  name="logo_url"
                  control={control}
                  render={() => (
                    <ImageUploader
                      images={logoUrl ? [logoUrl] : []}
                      onImagesChange={(imgs) => {
                        setValue('logo_url', imgs[0] ?? '', { shouldValidate: true });
                      }}
                      maxImages={1}
                      folder="brands"
                    />
                  )}
                />
                {errors.logo_url && (
                  <p className="text-xs text-red-500 font-medium">{errors.logo_url.message}</p>
                )}
              </div>

              {/* Cover Upload */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-elite-text">صورة الغلاف (Cover)</label>
                  <span className="text-[10px] text-elite-muted bg-surface-dim px-2 py-1 rounded-lg">ستظهر في صفحة البرند الرئيسية</span>
                </div>
                <Controller
                  name="cover_url"
                  control={control}
                  render={() => (
                    <ImageUploader
                      images={coverUrl ? [coverUrl] : []}
                      onImagesChange={(imgs) => {
                        setValue('cover_url', imgs[0] ?? '', { shouldValidate: true });
                      }}
                      maxImages={1}
                      folder="brands"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-[32px] shadow-soft p-6 space-y-6 border border-white/50 sticky top-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-gold/10 text-gold-dark">
                <Settings2 className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold font-cairo">الإعدادات</h2>
            </div>

            <div className="space-y-6">
              {/* Sort Order as Select */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-elite-text">الترتيب في القائمة</label>
                  <HelpTooltip text="يحدد مكان ظهور البرند في قائمة البرندات" />
                </div>
                <Controller
                  name="sort_order"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={sortOptions}
                      value={field.value.toString()}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      className="bg-surface-dim/50 border-none"
                    />
                  )}
                />
              </div>

              <div className="h-px bg-elite-border/50" />

              {/* Switches */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-dim/30">
                  <div className="flex items-center gap-2">
                    <Layout className="w-4 h-4 text-elite-muted" />
                    <span className="text-sm font-medium">التصنيفات الداخلية</span>
                  </div>
                  <Controller
                    name="has_categories"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-dim/30">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-elite-muted" />
                    <span className="text-sm font-medium">حالة الظهور (فعال)</span>
                  </div>
                  <Controller
                    name="is_active"
                    control={control}
                    render={({ field }) => (
                      <Switch 
                        checked={field.value} 
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="gold" 
              full 
              loading={isSubmitting}
              className="py-4 rounded-2xl shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              حفظ التغييرات
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}


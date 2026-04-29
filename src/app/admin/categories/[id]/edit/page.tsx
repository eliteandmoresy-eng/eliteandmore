'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowRight } from 'lucide-react';
import { categorySchema } from '@/lib/validators';
import { Brand } from '@/types';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import ImageUploader from '@/components/admin/ImageUploader';

type CategoryFormData = z.infer<typeof categorySchema>;

export default function EditCategoryPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [fetching, setFetching] = useState(true);
  const [brands, setBrands] = useState<Brand[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      brand_id: '',
      name: '',
      slug: '',
      image_url: '',
      sort_order: 0,
    },
  });

  const imageUrl = watch('image_url');

  useEffect(() => {
    fetch('/api/brands?all=true')
      .then((r) => r.json())
      .then((d) => {
        const all: Brand[] = d.data ?? [];
        setBrands(all.filter((b) => b.has_categories));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/categories/${id}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'فشل التحميل');
        const c = json.data;
        reset({
          brand_id: c.brand_id,
          name: c.name,
          slug: c.slug,
          image_url: c.image_url ?? '',
          sort_order: c.sort_order,
        });
      } catch {
        toast.error('فشل تحميل بيانات التصنيف');
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [id, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'فشل الحفظ');
      toast.success('تم تحديث التصنيف');
      router.push('/admin/categories');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل الحفظ');
    }
  };

  const brandOptions = brands.map((b) => ({ value: b.id, label: b.name }));

  if (fetching) {
    return (
      <div dir="rtl" className="max-w-2xl mx-auto space-y-4 pb-6">
        <div className="h-8 w-48 bg-surface-dim rounded-xl animate-pulse" />
        <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 bg-surface-dim rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="font-tajawal max-w-2xl mx-auto pb-6">
      <div className="flex items-center gap-3 mb-5">
        <Link href="/admin/categories" className="p-2 rounded-xl hover:bg-surface-dim transition-colors text-elite-muted">
          <ArrowRight className="w-5 h-5" />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold font-cairo text-elite-text">تعديل التصنيف</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="bg-white rounded-2xl shadow-card p-4 md:p-6 space-y-5">
          <Input
            label="اسم التصنيف"
            required
            error={errors.name?.message}
            {...register('name')}
          />

          <input type="hidden" {...register('slug')} />

          <Controller
            name="brand_id"
            control={control}
            render={({ field }) => (
              <Select
                label="البرند"
                required
                options={brandOptions}
                placeholder="اختر البرند"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={errors.brand_id?.message}
              />
            )}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-elite-text">الصورة</label>
            <Controller
              name="image_url"
              control={control}
              render={() => (
                <ImageUploader
                  images={imageUrl ? [imageUrl] : []}
                  onImagesChange={(imgs) => setValue('image_url', imgs[0] ?? '')}
                  maxImages={1}
                  folder="categories"
                />
              )}
            />
          </div>

          <Input
            label="الترتيب"
            type="number"
            error={errors.sort_order?.message}
            {...register('sort_order', { valueAsNumber: true })}
          />
        </div>

        <Button type="submit" variant="gold" full loading={isSubmitting}>
          حفظ التعديلات
        </Button>
      </form>
    </div>
  );
}

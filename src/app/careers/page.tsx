'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Governorate } from '@/types';
import { cn } from '@/lib/utils';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Briefcase, User, Calendar, MapPin, Home, MessageCircle } from 'lucide-react';

const jobApplicationSchema = z.object({
  first_name: z.string().min(2, 'الاسم مطلوب'),
  last_name: z.string().min(2, 'الكنية مطلوبة'),
  age: z
    .string()
    .min(1, 'العمر مطلوب')
    .regex(/^[0-9\u0660-\u0669]+$/, 'يرجى إدخال أرقام فقط'),
  governorate_id: z.string().min(1, 'يرجى اختيار المحافظة'),
  address: z.string().min(5, 'يرجى كتابة العنوان بالتفصيل'),
  job_title: z.string().min(2, 'الوظيفة المطلوبة مطلوبة'),
});

type JobApplicationFormValues = z.infer<typeof jobApplicationSchema>;

export default function CareersPage() {
  const router = useRouter();
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState<Governorate | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<JobApplicationFormValues>({
    resolver: zodResolver(jobApplicationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    fetch('/api/governorates')
      .then((r) => r.json())
      .then((d) => setGovernorates(d.data ?? []));
  }, []);

  const handleGovernorateChange = (govId: string) => {
    const gov = governorates.find((g) => g.id === govId) ?? null;
    setSelectedGovernorate(gov);
    setValue('governorate_id', govId, { shouldValidate: true });
  };

  const onSubmit = async (data: JobApplicationFormValues) => {
    setSubmitting(true);
    try {
      const govName = selectedGovernorate?.name || '';
      const butterfly = String.fromCodePoint(0x1F98B);
      const person = String.fromCodePoint(0x1F464);
      const people = String.fromCodePoint(0x1F465);
      const cake = String.fromCodePoint(0x1F382);
      const pin = String.fromCodePoint(0x1F4CD);
      const house = String.fromCodePoint(0x1F3E0);
      const briefcase = String.fromCodePoint(0x1F4BC);

      const message = `${butterfly} *طلب توظيف جديد - Elite* ${butterfly}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `*بيانات المتقدم:*\n` +
        `${person} الاسم: ${data.first_name}\n` +
        `${people} الكنية: ${data.last_name}\n` +
        `${cake} العمر: ${data.age}\n` +
        `${pin} المحافظة: ${govName}\n` +
        `${house} السكن: ${data.address}\n` +
        `${briefcase} الوظيفة المطلوبة: ${data.job_title}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `شكراً لاهتمامكم بالانضمام إلى Elite and More ${butterfly}`;

      const whatsappLink = getWhatsAppLink(WHATSAPP_NUMBER, message);
      window.open(whatsappLink, '_blank');
      toast.success('تم إنشاء الطلب، يرجى إرساله عبر الواتساب');
      router.push('/');
    } catch (error) {
      toast.error('حدث خطأ أثناء إرسال الطلب');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-elite-bg min-h-screen pb-12">
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'طلب توظيف', href: '/careers' },
          ]}
        />
      </div>

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-gold/10 text-gold rounded-2xl mb-4">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="font-cairo font-black text-3xl text-elite-text mb-2">طلب توظيف</h1>
          <p className="font-tajawal text-elite-muted">يرجى تعبئة البيانات التالية للانضمام إلى فريقنا</p>
        </div>

        <div className="bg-white rounded-2xl border border-elite-border p-6 md:p-8 shadow-card">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="الاسم"
                required
                placeholder="أدخل اسمك"
                icon={<User className="w-4 h-4" />}
                error={errors.first_name?.message}
                {...register('first_name')}
              />

              <Input
                label="الكنية"
                required
                placeholder="أدخل كنيتك"
                icon={<User className="w-4 h-4" />}
                error={errors.last_name?.message}
                {...register('last_name')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="العمر"
                required
                placeholder="مثال: 25"
                icon={<Calendar className="w-4 h-4" />}
                error={errors.age?.message}
                {...register('age')}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-elite-text font-tajawal">
                  المحافظة <span className="text-[#EF4444] mr-1">*</span>
                </label>
                <div className="relative group">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-elite-muted/50 group-focus-within:text-gold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    value={selectedGovernorate?.id ?? ''}
                    onChange={(e) => handleGovernorateChange(e.target.value)}
                    className="w-full border border-elite-border rounded-xl pr-12 pl-4 py-2.5 text-sm font-tajawal text-elite-text bg-white focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="">اختر المحافظة</option>
                    {governorates.map((gov) => (
                      <option key={gov.id} value={gov.id}>
                        {gov.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.governorate_id && (
                  <p className="text-xs text-[#EF4444] font-tajawal">{errors.governorate_id.message}</p>
                )}
              </div>
            </div>

            <Input
              label="السكن / العنوان"
              required
              placeholder="مثال: دمشق - المزة - الشيخ سعد"
              icon={<Home className="w-4 h-4" />}
              error={errors.address?.message}
              {...register('address')}
            />

            <Input
              label="الوظيفة المطلوبة"
              required
              placeholder="مثال: موظف مبيعات، محاسب، إلخ"
              icon={<Briefcase className="w-4 h-4" />}
              error={errors.job_title?.message}
              {...register('job_title')}
            />

            <div className="mt-2">
              <Button
                type="submit"
                variant="gold"
                size="lg"
                full
                loading={submitting}
                disabled={!isValid || !selectedGovernorate}
                icon={<MessageCircle className="w-5 h-5" />}
              >
                إرسال الطلب عبر الواتساب
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

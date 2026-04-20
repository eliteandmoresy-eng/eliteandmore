'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/lib/validators';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from '@/components/ui/Logo';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-elite-border shadow-card p-8 flex flex-col gap-6">
          <div className="text-center">
            <h1 className="font-cairo font-black text-2xl text-elite-text">لوحة التحكم</h1>
            <p className="font-tajawal text-sm text-elite-muted mt-1">سجّل دخولك للمتابعة</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="البريد الإلكتروني"
              type="email"
              placeholder="admin@example.com"
              required
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="كلمة المرور"
              type="password"
              placeholder="••••••••"
              required
              error={errors.password?.message}
              {...register('password')}
            />

            <Button
              type="submit"
              variant="gold"
              size="lg"
              full
              loading={loading}
              icon={<LogIn className="w-5 h-5" />}
              className="mt-2"
            >
              دخول
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

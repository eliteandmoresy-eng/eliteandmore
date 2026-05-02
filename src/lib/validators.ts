import { z } from 'zod';

export const checkoutSchema = z.object({
  full_name: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  phone: z
    .string()
    .min(9, 'رقم الهاتف غير صحيح')
    .regex(/^(\+963|0)?9\d{8}$/, 'يجب أن يكون رقم سوري (09xxxxxxxx)'),
  governorate_id: z.string().uuid('يرجى اختيار المحافظة'),
  governorate_name: z.string(),
  address: z.string().min(10, 'يرجى كتابة العنوان بالتفصيل (10 أحرف على الأقل)'),
  notes: z.string().optional().default(''),
  payment_method: z.enum(['cod', 'sham_cash']),
});

export const brandSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  slug: z.string().min(2, 'الـ slug مطلوب').regex(/^[a-z0-9-]+$/, 'فقط أحرف إنجليزية صغيرة وأرقام وشرطة'),
  description: z.string().optional(),
  logo_url: z.string().url('رابط الشعار مطلوب'),
  cover_url: z.string().url().optional().or(z.literal('')),
  has_categories: z.boolean().default(true),
  sort_order: z.number().int().default(0),
  is_active: z.boolean().default(true),
});

export const categorySchema = z.object({
  brand_id: z.string().uuid('البرند مطلوب'),
  name: z.string().min(2, 'الاسم مطلوب'),
  slug: z.string().min(2, 'الـ slug مطلوب'),
  image_url: z.string().url().optional().or(z.literal('')),
  sort_order: z.number().int().default(0),
});

export const governorateSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  slug: z.string().min(2, 'الـ slug مطلوب'),
  shipping_cost: z.number().min(0, 'تكلفة الشحن يجب أن تكون 0 أو أكثر'),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

export const tagSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  slug: z.string().min(2, 'الـ slug مطلوب'),
  color: z.string().default('#6B2D8A'),
  show_on_home: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

export const productSchema = z.object({
  brand_id: z.string().uuid('البرند مطلوب'),
  category_id: z.string().uuid().nullable().optional(),
  name: z.string().min(2, 'الاسم مطلوب'),
  slug: z.string().min(2, 'الـ slug مطلوب'),
  description: z.string().optional(),
  price_syp: z.number().min(1, 'السعر مطلوب'),
  sale_enabled: z.boolean().default(false),
  sale_price_syp: z.number().nullable().optional(),
  stock_status: z.enum(['in_stock', 'out_of_stock']).default('in_stock'),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

export const bannerSchema = z.object({
  title: z.string().optional(),
  image_url: z.string().url('الصورة مطلوبة'),
  cloudinary_public_id: z.string().optional(),
  link_url: z.string().optional().or(z.literal('')),
  link_target: z.enum(['internal', 'external', 'none']).default('internal'),
  sort_order: z.number().int().default(0),
  is_active: z.boolean().default(true),
});

export const settingsSchema = z.object({
  exchange_rate_syp: z.number().min(1, 'سعر الصرف مطلوب'),
  free_shipping_threshold: z.number().nullable().optional(),
  whatsapp_number: z.string().min(5, 'رقم الواتساب مطلوب'),
  facebook_url: z.string().url().optional().or(z.literal('')),
  instagram_url: z.string().url().optional().or(z.literal('')),
  contact_phone: z.string().min(5),
  contact_address: z.string().optional(),
  working_hours: z.string().optional(),
  about_short: z.string().optional(),
  about_full: z.string().optional(),
  sham_cash_phone: z.string().optional(),
  sham_cash_account: z.string().optional(),
  sham_cash_barcode_url: z.string().optional(),
  sham_cash_enabled: z.boolean().default(false),
});

export const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

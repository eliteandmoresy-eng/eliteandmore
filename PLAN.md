# Elite and More — خطة تنفيذ المتجر الكاملة

> وثيقة تنفيذية حرفية. اتبع كل خطوة بالترتيب. لا تتخذ قرارات خارج ما هو مكتوب هنا. إن وُجد غموض: اسأل المستخدم قبل التنفيذ.

---

## 0. نظرة عامة

- **اسم الشركة:** Elite and More
- **الشعار:** "The Best In your Hands"
- **الهوية البصرية:** بنفسجي ملكي + ذهبي دافئ + أزرق سماوي فاتح + أبيض كريمي (مستخرجة من `1.jpg` و `2.jpg`).
- **اللغة:** عربية فقط (RTL).
- **المجال:** متجر منتجات تنظيف وعناية شخصية متعدد البرندات.
- **موقع المشروع:** `C:\Users\moham\Desktop\Elite\` (داخل نفس المجلد مباشرة).
- **الاستضافة:** Vercel (مجاني).
- **قاعدة البيانات:** Supabase (Postgres + Auth).
- **تخزين الصور:** Cloudinary (رفع + حذف فعلي عند الحذف من لوحة التحكم).
- **الطلبات:** عبر واتساب فقط — لا تُحفظ في قاعدة البيانات.

---

## 1. الهوية البصرية (Design Tokens)

### 1.1 الألوان — إلزامي استخدام هذه القيم فقط

```css
--color-primary:          #6B2D8A;  /* بنفسجي ملكي — خلفية اللوغو */
--color-primary-dark:     #4E1F66;  /* بنفسجي داكن — hover */
--color-primary-light:    #8B4DAB;  /* بنفسجي فاتح */
--color-primary-50:       #F5EEF9;
--color-primary-100:      #E5D4F0;
--color-primary-200:      #C9A5DD;
--color-primary-300:      #AD77CA;
--color-primary-400:      #914FB2;
--color-primary-500:      #6B2D8A;
--color-primary-600:      #5A2574;
--color-primary-700:      #4E1F66;
--color-primary-800:      #3A1750;
--color-primary-900:      #26103A;

--color-gold:             #D4AF37;  /* ذهبي الفراشة */
--color-gold-light:       #E3C867;  /* ذهبي فاتح */
--color-gold-dark:        #A8871F;  /* ذهبي داكن */

--color-sky:              #DDE8F3;  /* أزرق سماوي فاتح — خلفية البانر */
--color-sky-light:        #EEF4FA;
--color-sky-dark:         #B8CDE2;

--color-cream:            #FFFDF8;  /* أبيض كريمي — خلفية الصفحات */
--color-surface:          #FFFFFF;  /* أبيض نقي — الكروت */
--color-surface-dim:      #F7F3FA;  /* خلفية فاتحة بلمسة بنفسجية */

--color-text:             #2D1B3D;  /* نص أساسي */
--color-text-muted:       #6B5A7A;  /* نص ثانوي */
--color-border:           #E8DFF0;  /* حدود */

--color-success:          #10B981;
--color-danger:           #EF4444;
--color-warning:          #F59E0B;
--color-info:             #3B82F6;
```

### 1.2 الخطوط

- **الخط الأساسي:** `Tajawal` (من Google Fonts) — أوزان: 400, 500, 700, 900.
- **الخط الثانوي للشعارات/العناوين الكبيرة:** `Cairo` (من Google Fonts) — أوزان: 700, 900.
- اللاتيني (للأرقام والإنجليزية المختلطة): `Inter` — أوزان: 400, 600.

### 1.3 القياسات

- Border Radius: `8px` للأزرار، `16px` للكروت، `24px` للصور الكبيرة.
- Container max-width: `1280px`.
- Spacing scale: Tailwind الافتراضي.
- Shadow للكروت: `0 4px 20px rgba(107, 45, 138, 0.08)` (ظل بنفسجي خفيف).

### 1.4 الأنماط العامة

- الأزرار الأساسية: خلفية `--color-primary`، نص أبيض، hover إلى `--color-primary-dark`.
- الأزرار الذهبية (CTA بارزة): خلفية `--color-gold`، نص `--color-primary`، hover إلى `--color-gold-dark`.
- الكروت: خلفية بيضاء، حدود `1px solid --color-border`، shadow خفيف، radius 16px.
- الخلفية العامة للصفحات: `--color-cream`.
- شعار الفراشة الذهبي حاضر كعنصر زخرفي في الهيدر والفوتر.

---

## 2. هيكل المشروع النهائي

```
C:\Users\moham\Desktop\Elite\
├── 1.jpg                       ← موجود — يُنقل إلى public/images/hero-banner.jpg
├── 2.jpg                       ← موجود — يُنقل إلى public/images/logo.jpg
├── Brands/                     ← موجود — الصور تُرفع يدوياً من لوحة التحكم لاحقاً (مرجعي)
├── PLAN.md                     ← هذه الوثيقة
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── middleware.ts
├── .env.local                  ← يُنشأ مع placeholders
├── .env.example
├── .gitignore
├── supabase/
│   └── schema.sql              ← سكريبت إنشاء الجداول
├── public/
│   ├── images/
│   │   ├── hero-banner.jpg     ← من 1.jpg
│   │   ├── logo.jpg            ← من 2.jpg
│   │   └── logo.svg            ← يُنشأ لاحقاً (اختياري)
│   ├── favicon.ico
│   └── og-image.jpg
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx                          ← الصفحة الرئيسية
    │   ├── globals.css
    │   ├── not-found.tsx
    │   ├── loading.tsx
    │   ├── brands/
    │   │   └── [slug]/
    │   │       └── page.tsx                  ← صفحة برند
    │   ├── products/
    │   │   └── [slug]/
    │   │       └── page.tsx                  ← صفحة منتج
    │   ├── shop/
    │   │   └── page.tsx                      ← كل المنتجات + فلاتر
    │   ├── cart/
    │   │   └── page.tsx                      ← السلة
    │   ├── checkout/
    │   │   └── page.tsx                      ← نموذج البيانات + اختيار الدفع
    │   ├── favorites/
    │   │   └── page.tsx                      ← المفضلة
    │   ├── about/
    │   │   └── page.tsx                      ← من نحن
    │   ├── admin/
    │   │   ├── layout.tsx                    ← layout الأدمن مع Sidebar
    │   │   ├── page.tsx                      ← صفحة ترحيب بسيطة
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   ├── brands/
    │   │   │   ├── page.tsx                  ← قائمة البرندات
    │   │   │   ├── new/page.tsx
    │   │   │   └── [id]/edit/page.tsx
    │   │   ├── categories/
    │   │   │   ├── page.tsx
    │   │   │   ├── new/page.tsx
    │   │   │   └── [id]/edit/page.tsx
    │   │   ├── products/
    │   │   │   ├── page.tsx
    │   │   │   ├── new/page.tsx
    │   │   │   └── [id]/edit/page.tsx
    │   │   ├── governorates/
    │   │   │   ├── page.tsx
    │   │   │   ├── new/page.tsx
    │   │   │   └── [id]/edit/page.tsx
    │   │   ├── tags/
    │   │   │   ├── page.tsx
    │   │   │   ├── new/page.tsx
    │   │   │   └── [id]/edit/page.tsx
    │   │   ├── banners/
    │   │   │   └── page.tsx                  ← إدارة سلايدر الصور (CRUD في صفحة واحدة)
    │   │   └── settings/
    │   │       └── page.tsx
    │   └── api/
    │       ├── auth/
    │       │   └── [...nextauth]/route.ts
    │       ├── brands/
    │       │   ├── route.ts                  ← GET, POST
    │       │   └── [id]/route.ts             ← GET, PUT, DELETE
    │       ├── categories/
    │       │   ├── route.ts
    │       │   └── [id]/route.ts
    │       ├── products/
    │       │   ├── route.ts
    │       │   └── [id]/route.ts
    │       ├── governorates/
    │       │   ├── route.ts
    │       │   └── [id]/route.ts
    │       ├── tags/
    │       │   ├── route.ts
    │       │   └── [id]/route.ts
    │       ├── banners/
    │       │   ├── route.ts                  ← GET (public), POST (admin)
    │       │   └── [id]/route.ts             ← PUT, DELETE (admin)
    │       ├── settings/
    │       │   └── route.ts
    │       ├── images/
    │       │   ├── upload/route.ts
    │       │   └── delete/route.ts
    │       └── keep-alive/
    │           └── route.ts                  ← GET يُستدعى من cron خارجي لإبقاء مشروع Supabase نشطاً
    ├── components/
    │   ├── Providers.tsx
    │   ├── layout/
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── MobileMenu.tsx
    │   │   ├── FloatingWhatsApp.tsx
    │   │   └── TopAnnouncementBar.tsx
    │   ├── home/
    │   │   ├── HeroBanner.tsx
    │   │   ├── BannerSlider.tsx              ← سلايدر الصور الترويجية (يديره الأدمن)
    │   │   ├── AboutSection.tsx
    │   │   ├── BrandsGrid.tsx
    │   │   ├── TagSection.tsx
    │   │   ├── BrandProductsSection.tsx
    │   │   └── FeaturesStrip.tsx
    │   ├── product/
    │   │   ├── ProductCard.tsx
    │   │   ├── ProductGrid.tsx
    │   │   ├── ProductGallery.tsx
    │   │   ├── ProductInfo.tsx
    │   │   ├── VariantSelector.tsx
    │   │   ├── GovernorateAvailability.tsx
    │   │   ├── PriceDisplay.tsx
    │   │   └── RelatedProducts.tsx
    │   ├── brand/
    │   │   ├── BrandHeader.tsx
    │   │   ├── BrandCategoryTabs.tsx
    │   │   └── BrandCard.tsx
    │   ├── shop/
    │   │   ├── FilterSidebar.tsx
    │   │   ├── GovernorateFilter.tsx
    │   │   ├── SortDropdown.tsx
    │   │   └── ActiveFilters.tsx
    │   ├── cart/
    │   │   ├── CartDrawer.tsx
    │   │   ├── CartItem.tsx
    │   │   └── CartSummary.tsx
    │   ├── checkout/
    │   │   ├── CheckoutForm.tsx
    │   │   ├── PaymentMethodSelector.tsx
    │   │   └── ShamCashInstructions.tsx
    │   ├── favorites/
    │   │   └── FavoriteButton.tsx
    │   ├── admin/
    │   │   ├── AdminSidebar.tsx
    │   │   ├── AdminHeader.tsx
    │   │   ├── PageHeader.tsx
    │   │   ├── ImageUploader.tsx
    │   │   ├── MultiImageUploader.tsx
    │   │   ├── ConfirmDialog.tsx
    │   │   ├── DataTable.tsx
    │   │   ├── TagSelector.tsx
    │   │   ├── GovernorateAvailabilityEditor.tsx
    │   │   ├── VariantEditor.tsx
    │   │   ├── SalePriceToggle.tsx
    │   │   └── HelpTooltip.tsx
    │   └── ui/
    │       ├── Button.tsx
    │       ├── Input.tsx
    │       ├── Textarea.tsx
    │       ├── Select.tsx
    │       ├── Checkbox.tsx
    │       ├── Switch.tsx
    │       ├── Modal.tsx
    │       ├── Spinner.tsx
    │       ├── Skeleton.tsx
    │       ├── Badge.tsx
    │       ├── Breadcrumbs.tsx
    │       ├── EmptyState.tsx
    │       ├── Logo.tsx
    │       └── ButterflyIcon.tsx
    ├── lib/
    │   ├── supabase.ts             ← Client عادي + Admin
    │   ├── cloudinary.ts           ← رفع + حذف
    │   ├── auth.ts                 ← NextAuth config
    │   ├── getSession.ts
    │   ├── utils.ts                ← cn, formatPrice, formatSYP, formatUSD, generateSlug, …
    │   ├── whatsapp.ts             ← بناء رسالة الطلب + روابط wa.me
    │   ├── validators.ts           ← Zod schemas
    │   └── constants.ts            ← ثوابت (أسماء، حدود، إلخ)
    ├── store/
    │   ├── cartStore.ts            ← Zustand مع persist
    │   └── favoritesStore.ts       ← Zustand مع persist
    ├── hooks/
    │   ├── useCart.ts
    │   ├── useFavorites.ts
    │   ├── useSettings.ts
    │   └── useExchangeRate.ts
    └── types/
        ├── index.ts
        └── next-auth.d.ts
```

---

## 3. قاعدة البيانات (Supabase)

ملف: `supabase/schema.sql`. ينفّذه المستخدم يدوياً في Supabase SQL Editor بعد إنشاء المشروع.

### 3.1 الجداول

#### جدول `admins`
```sql
id            uuid primary key default gen_random_uuid()
email         text unique not null
password_hash text not null            -- bcrypt
name          text
created_at    timestamptz default now()
```

#### جدول `settings` (إعدادات عامة — صف واحد)
```sql
id                      uuid primary key default gen_random_uuid()
exchange_rate_syp       numeric not null default 15000    -- كم ليرة سورية = 1 دولار
free_shipping_threshold numeric                            -- مبلغ بالليرة (null = معطّل)
whatsapp_number         text not null default '+963936666950'
facebook_url            text default 'https://www.facebook.com/share/1CvRRr3Jrp/'
contact_phone           text default '+963936666950'
contact_address         text
working_hours           text default 'السبت - الخميس: 9:00 صباحاً - 9:00 مساءً | الجمعة: مغلق'
about_short             text                               -- نص "من نحن" المختصر (للصفحة الرئيسية)
about_full              text                               -- نص "من نحن" الكامل (لصفحة /about)
sham_cash_phone         text                               -- رقم هاتف حساب شام كاش
sham_cash_account       text                               -- كود/رقم حساب شام كاش
sham_cash_barcode_url   text                               -- رابط صورة الباركود (Cloudinary)
sham_cash_enabled       boolean default false              -- هل شام كاش مفعّل؟
site_logo_url           text                               -- شعار المتجر (افتراضي: /images/logo.jpg)
hero_banner_url         text                               -- بانر الهيرو (افتراضي: /images/hero-banner.jpg)
updated_at              timestamptz default now()
```

> **القاعدة:** يوجد صف واحد فقط في هذا الجدول. لوحة التحكم تعدّله فقط.

#### جدول `brands`
```sql
id              uuid primary key default gen_random_uuid()
name            text not null                        -- "NUK Clean"
slug            text unique not null                 -- "nuk-clean"
description     text                                  -- وصف البرند
logo_url        text not null                        -- شعار البرند (Cloudinary)
cover_url       text                                  -- بانر غلاف (Cloudinary)
has_categories  boolean default true                 -- هل لهذا البرند تصنيفات داخلية؟ يتحكّم الأدمن لكل برند على حدة
sort_order      int default 0
is_active       boolean default true
created_at      timestamptz default now()
```

> **ملاحظة حول `has_categories`:** بعض البرندات تُقسّم منتجاتها لأقسام (مثلاً: منظفات / معطرات / منعمات)، وأخرى منتجاتها مباشرة بدون تصنيفات. يختار الأدمن عند إنشاء البرند إذا كان سيستخدم تصنيفات داخلية أم لا. هذا الحقل يؤثر على:
> - إخفاء/إظهار حقل التصنيف في نموذج إضافة/تعديل المنتج.
> - إخفاء/إظهار `BrandCategoryTabs` في صفحة البرند وفي `BrandProductsSection` على الصفحة الرئيسية.
> - صفحة `/admin/categories` لا تعرض إلا البرندات التي `has_categories = true`.

#### جدول `categories` (تصنيفات داخل كل برند)
```sql
id            uuid primary key default gen_random_uuid()
brand_id      uuid references brands(id) on delete cascade
name          text not null                        -- "منظفات"، "معطرات"
slug          text not null
image_url     text
sort_order    int default 0
created_at    timestamptz default now()
unique (brand_id, slug)
```

#### جدول `tags` (الشارات — جديد، الأكثر مبيعاً، عرض، إلخ)
```sql
id            uuid primary key default gen_random_uuid()
name          text unique not null                 -- "جديد"
slug          text unique not null                 -- "new"
color         text default '#6B2D8A'               -- لون الشارة
show_on_home  boolean default true                 -- هل يظهر قسم في الرئيسية؟
sort_order    int default 0
created_at    timestamptz default now()
```

#### جدول `governorates`
```sql
id            uuid primary key default gen_random_uuid()
name          text unique not null                 -- "دمشق"
slug          text unique not null
shipping_cost numeric not null default 0           -- بالليرة السورية
is_active     boolean default true
sort_order    int default 0
created_at    timestamptz default now()
```

#### جدول `banners` (سلايدر الصور الترويجية في الصفحة الرئيسية)
```sql
id                    uuid primary key default gen_random_uuid()
title                 text                                  -- عنوان اختياري (alt text + tooltip)
image_url             text not null                         -- رابط Cloudinary
cloudinary_public_id  text                                  -- لحذف الصورة الفعلي من Cloudinary
link_url              text                                  -- رابط اختياري عند الضغط (مثلاً /brands/nuk-clean أو /shop?tag=sale)
link_target           text default 'internal'               -- 'internal' | 'external' | 'none'
sort_order            int default 0
is_active             boolean default true
created_at            timestamptz default now()
```

> **القاعدة:** السلايدر يعرض فقط البانرات `is_active = true` مرتبة حسب `sort_order` تصاعدياً. إذا لم يوجد أي بانر فعّال، القسم كله مخفيّ تلقائياً في الصفحة الرئيسية.

#### جدول `products`
```sql
id                uuid primary key default gen_random_uuid()
brand_id          uuid references brands(id) on delete cascade
category_id       uuid references categories(id) on delete set null
name              text not null
slug              text unique not null
description       text
price_syp         numeric not null                 -- السعر الأساسي بالليرة السورية
sale_enabled      boolean default false            -- هل التخفيض مفعّل؟
sale_price_syp    numeric                          -- سعر التخفيض بالليرة
stock_status      text default 'in_stock'          -- 'in_stock' | 'out_of_stock'
is_featured       boolean default false            -- مميّز للصفحة الرئيسية
is_active         boolean default true
sort_order        int default 0
created_at        timestamptz default now()
updated_at        timestamptz default now()
```

> **ملاحظة:** لا نخزن السعر بالدولار. يُحسب ديناميكياً من `settings.exchange_rate_syp`.

#### جدول `product_images`
```sql
id            uuid primary key default gen_random_uuid()
product_id    uuid references products(id) on delete cascade
url           text not null                        -- Cloudinary URL
variant_id    uuid references product_variants(id) on delete set null
sort_order    int default 0
is_primary    boolean default false
```

#### جدول `product_variants` (الحجم/اللون/الوزن — كلها في جدول واحد مرن)
```sql
id            uuid primary key default gen_random_uuid()
product_id    uuid references products(id) on delete cascade
variant_type  text not null                        -- 'size' | 'color' | 'weight' | 'scent'
name          text not null                        -- "500مل" أو "أحمر"
value         text                                  -- hex للون مثلاً
price_syp     numeric                               -- سعر خاص للمتغير (إن وُجد، وإلا يرث من المنتج)
sort_order    int default 0
```

#### جدول `product_tags` (Many-to-many بين المنتج والشارات)
```sql
product_id    uuid references products(id) on delete cascade
tag_id        uuid references tags(id) on delete cascade
primary key (product_id, tag_id)
```

#### جدول `product_governorates` (توفر المنتج بالمحافظات)
```sql
product_id      uuid references products(id) on delete cascade
governorate_id  uuid references governorates(id) on delete cascade
is_available    boolean default true
primary key (product_id, governorate_id)
```

> **القاعدة:** إذا لم يوجد سجل لمنتج+محافظة، يُعتبر المنتج **غير متوفر** في تلك المحافظة. عند إنشاء منتج جديد، يُنشأ سجل تلقائياً لكل محافظة فعّالة مع `is_available = true` (افتراضياً متوفر في الكل، والأدمن يعطّل ما يريد).

### 3.2 Row Level Security (RLS)

- كل الجداول: قراءة عامة (`select` لأي شخص).
- الكتابة (`insert/update/delete`): فقط عبر service_role key في الـ API routes (محمية بـ NextAuth session).

### 3.3 البيانات الابتدائية (Seed)

- صف واحد في `settings` بالقيم الافتراضية أعلاه.
- أدمن واحد افتراضي (تُضاف كلمة المرور يدوياً كـ bcrypt hash).
- **لا تُضاف برندات أو منتجات أو محافظات** — الأدمن يضيفها لاحقاً.

---

## 4. متغيرات البيئة (`.env.local`)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=                        # يولَّد بـ: openssl rand -base64 32

# Admin (الأول — يُستخدم لإنشاء الأدمن الأول عبر سكريبت)
INITIAL_ADMIN_EMAIL=admin@eliteandmore.sy
INITIAL_ADMIN_PASSWORD=ChangeMe_2026!

# Keep-alive (لمنع تعليق Supabase على الخطة المجانية — راجع قسم 8.4)
CRON_SECRET=                            # سلسلة عشوائية طويلة، يولَّد بـ: openssl rand -hex 32
```

ملف `.env.example` يُنشأ بنفس المفاتيح وقيم فارغة.

---

## 5. الصفحات العامة — التصميم والسلوك بالتفصيل

### 5.1 Layout الرئيسي (`src/app/layout.tsx`)

- اتجاه RTL، خط `Tajawal`، خلفية `--color-cream`.
- يحتوي: `<TopAnnouncementBar />`, `<Header />`, `{children}`, `<Footer />`, `<FloatingWhatsApp />`, `<Toaster />`.
- Metadata: title = "Elite and More - The Best In your Hands"، description من settings، og-image من settings.

### 5.2 TopAnnouncementBar

- شريط علوي نحيف (ارتفاع 36px).
- خلفية `--color-primary`، نص أبيض، font-size 13px.
- يعرض نص متحرك (marquee) بطيء: "شحن لكل المحافظات السورية • الدفع عند الاستلام متاح • دفع شام كاش متاح".
- قابل للإخفاء بزر × صغير (يُحفظ في localStorage).

### 5.3 Header

- ارتفاع 80px، خلفية بيضاء، حدود سفلية `1px solid --color-border`، sticky top.
- تخطيط (من اليمين إلى اليسار في RTL):
  1. **اللوغو** (يسار في RTL = بداية): صورة `logo.jpg` مع نص "Elite and More" بخط Cairo Bold. Link إلى `/`.
  2. **التنقل الرئيسي** (وسط): روابط: الرئيسية • المتجر • البرندات (dropdown يعرض كل البرندات) • من نحن.
  3. **الأدوات** (يمين في RTL = نهاية): شريط بحث صغير، زر المفضلة (مع badge بالعدد)، زر السلة (مع badge بالعدد).
- على الموبايل: قائمة همبرغر + لوغو + أيقونتا المفضلة والسلة.

### 5.4 Footer

- خلفية `--color-primary` (بنفسجي)، نص أبيض.
- 4 أعمدة على الديسكتوب، عمود واحد على الموبايل:
  1. **عن المتجر:** اللوغو + نص قصير + شعار "The Best In your Hands".
  2. **روابط سريعة:** الرئيسية، المتجر، البرندات، من نحن، المفضلة، السلة.
  3. **التواصل:** رقم الهاتف `+963 936 666 950`، رابط واتساب، العنوان (من settings)، ساعات العمل.
  4. **تابعنا:** زر فيسبوك (رابط: `https://www.facebook.com/share/1CvRRr3Jrp/`) — فقط فيسبوك حالياً.
- شريط سفلي نحيف: "© 2026 Elite and More. جميع الحقوق محفوظة.".

### 5.5 FloatingWhatsApp

- زر عائم في أسفل يسار الشاشة (fixed bottom-6 left-6).
- دائري 60px، خلفية خضراء `#25D366`، أيقونة واتساب بيضاء.
- تأثير نبض (pulse animation).
- عند الضغط: يفتح `https://wa.me/963936666950?text=مرحباً، أحتاج مساعدة من Elite and More`.
- يظهر tooltip على hover: "هل تحتاج مساعدة؟".

### 5.6 الصفحة الرئيسية (`src/app/page.tsx`)

ترتيب الأقسام من أعلى لأسفل:

#### 5.6.1 Hero Banner
- الصورة `public/images/hero-banner.jpg` (من `1.jpg`) بعرض كامل.
- ارتفاع على الديسكتوب: 500px، الموبايل: 300px.
- فوقها طبقة شفافة خفيفة + نص:
  - عنوان: "Elite and More" (بخط Cairo 64px، لون بنفسجي مع ظل خفيف).
  - شعار فرعي: "The Best In your Hands" (ذهبي 24px).
  - زرّان: "تسوّق الآن" (ذهبي → `/shop`)، "شاهد البرندات" (بنفسجي outline → `#brands`).

#### 5.6.2 BannerSlider (سلايدر الصور الترويجية — `<BannerSlider />`)

> يعرض صوراً ترويجية متعددة يضعها الأدمن من لوحة التحكم. يختلف عن الـ Hero الثابت — هذا سلايدر ديناميكي لعروض وإعلانات قابلة للتحديث.

**السلوك:**
- يستخدم **Swiper** مع `Autoplay` + `Pagination` + `EffectFade` (انتقال ناعم بتلاشٍ).
- Autoplay: كل **4500ms** (نفس Banias).
- Loop: مفعّل إذا عدد البانرات > 1.
- إذا بانر واحد فقط: بدون autoplay، بدون أسهم، بدون نقاط.
- إذا لا يوجد بانرات فعّالة: **القسم كله مخفيّ** (`return null`).

**التصميم:**
- Container: `max-w-7xl mx-auto px-3 md:px-4`.
- نسبة الصورة: `aspect-[2/1]` (عرض ضعف الارتفاع)، بحد أقصى `max-h-[500px]`.
- Border radius: `20px` (للحاوية كاملة).
- خلفية slide: `bg-sky-light` (`#EEF4FA`) — إن لم تغطي الصورة كامل الإطار.
- الصورة: `object-contain` (لا تُقصّ).
- طبقة gradient خفيفة في الأسفل: `bg-gradient-to-t from-black/25 to-transparent` ارتفاع 64px.

**Pagination (نقاط التنقل):**
- موضع: `bottom: 12px` داخل السلايدر.
- النقاط الافتراضية: دائرية `6x6px`، `rgba(255,255,255,0.55)`.
- النقطة النشطة: مستطيلة `22x6px`، لون `--color-gold` (`#D4AF37`) — عنصر ذهبي يطابق الهوية.

**أسهم التنقل:**
- تظهر **فقط على hover** وعند وجود بانرات متعددة.
- دائرية `40x40px`، خلفية `bg-white/80 backdrop-blur-sm`، ظل، حد `border-white/60`.
- يمين: سهم للسابق (في RTL)، يسار: سهم للتالي.
- hover: خلفية بيضاء كاملة + لون السهم يتحول إلى `--color-primary`.
- active: `scale-90`.

**سلوك الضغط على الصورة:**
- إذا البانر له `link_url`:
  - `link_target = 'internal'`: Next.js `<Link>` داخلي.
  - `link_target = 'external'`: `<a target="_blank" rel="noopener noreferrer">`.
  - `link_target = 'none'`: الصورة غير قابلة للضغط.
- إذا `link_url = null`: غير قابلة للضغط.

**موضعه في الصفحة الرئيسية:**
- **بعد** Hero Banner مباشرة.
- **قبل** FeaturesStrip.
- margin-top: `16px` عن الـ Hero.

**API:** يجلب البانرات في Server Component عبر `GET /api/banners?active=true`، ويمرّرها للمكوّن الـ Client.

#### 5.6.3 FeaturesStrip
- شريط أفقي بـ 4 ميزات بأيقونات:
  1. 🚚 شحن لكل المحافظات
  2. 💳 الدفع عند الاستلام
  3. ⭐ منتجات أصلية 100%
  4. 📞 دعم عبر واتساب
- خلفية `--color-surface-dim`، padding 24px، بدون حدود.

#### 5.6.4 AboutSection (من نحن - مختصر)
- عمودان: يمين فيه `logo.jpg` (اللوغو المربع)، يسار فيه نص `about_short` من settings + زر "اقرأ المزيد" → `/about`.
- خلفية بيضاء، padding 80px عمودي.

#### 5.6.5 BrandsGrid
- عنوان: "برنداتنا" + خط ذهبي قصير تحته.
- شبكة 4 أعمدة على الديسكتوب، 2 على الموبايل.
- كل كرت برند:
  - شعار البرند (160x160 مربع) على خلفية `cover_url` إن وُجد، وإلا خلفية بنفسجية فاتحة.
  - اسم البرند تحت الصورة.
  - hover: رفع خفيف + ظل بنفسجي.
  - Link → `/brands/[slug]`.

#### 5.6.6 TagSection (لكل شارة عليها `show_on_home = true`)
- قسم منفصل لكل شارة (مثلاً: جديد، الأكثر مبيعاً، عروض...).
- رأس القسم: اسم الشارة + زر "عرض الكل" → `/shop?tag=[slug]`.
- شبكة منتجات (carousel على الموبايل، 4 أعمدة على الديسكتوب).
- يعرض 8 منتجات أحدث بهذه الشارة.

#### 5.6.7 BrandProductsSection (لكل برند)
- قسم منفصل لكل برند فعّال.
- رأس القسم: شعار البرند + اسمه + زر "عرض كل منتجات [البرند]" → `/brands/[slug]`.
- **السلوك مشروط بـ `brand.has_categories`:**
  - **إذا `has_categories = true`:** تبويبات (Tabs) باسم تصنيفات البرند + تبويب "الكل".
    - تبويب "الكل": يعرض آخر 8 منتجات من البرند (مرتبة حسب `created_at` تنازلياً).
    - كل تبويب تصنيف: يعرض آخر 8 منتجات من ذلك التصنيف.
  - **إذا `has_categories = false`:** بدون تبويبات إطلاقاً. يعرض مباشرة شبكة بآخر 8 منتجات من البرند (مرتبة حسب `created_at` تنازلياً).

### 5.7 صفحة المتجر (`src/app/shop/page.tsx`)

- Breadcrumbs: الرئيسية > المتجر.
- Layout: Sidebar يمين (250px) + محتوى.
- **Sidebar (الفلاتر):**
  - البحث بالاسم (input).
  - فلتر السعر: سلايدر من-إلى (بالليرة السورية).
  - فلتر البرند: Checkboxes.
  - فلتر التصنيف: Checkboxes (تظهر تصنيفات البرندات المختارة فقط).
  - فلتر "المتوفر فقط" (Switch).
- **فوق الشبكة:**
  - **GovernorateFilter:** Dropdown منفصل لاختيار المحافظة (بارز بلون بنفسجي). عند اختيار محافظة، يُخفى المنتجات غير المتوفرة فيها.
  - SortDropdown: الأحدث، الأقدم، السعر من الأعلى، السعر من الأدنى، الاسم أ-ي.
  - عدد النتائج.
- **شبكة المنتجات:** 4 أعمدة ديسكتوب، 2 موبايل. Pagination 24 منتج/صفحة.

### 5.8 صفحة البرند (`src/app/brands/[slug]/page.tsx`)

- **BrandHeader:**
  - صورة غلاف البرند (cover_url) بعرض كامل ارتفاع 300px. إن لم توجد، gradient بنفسجي-ذهبي.
  - شعار البرند (120x120 دائري) يتراكب جزئياً على الغلاف.
  - اسم البرند (Cairo 40px) + وصفه.
- **BrandCategoryTabs:** يُعرض **فقط إذا `brand.has_categories = true`**. تبويبات لتصنيفات البرند + تبويب "الكل". إذا `has_categories = false` لا يُعرض المكوّن أبداً.
- شبكة المنتجات (مع نفس فلاتر المتجر مبسّطة: السعر، البحث، المحافظة).

### 5.9 صفحة المنتج (`src/app/products/[slug]/page.tsx`)

- Breadcrumbs: الرئيسية > [البرند] > [التصنيف] > [المنتج].
- Layout: عمودان (صورة يسار 50%، معلومات يمين 50% في RTL).

#### 5.9.1 ProductGallery (الصور)
- صورة كبيرة (max 600x600).
- Thumbnails تحتها.
- Zoom on hover.
- Swiper على الموبايل.

#### 5.9.2 ProductInfo
1. **الشارات** (tags) أعلى: badges ملوّنة.
2. **اسم المنتج** (Cairo 28px).
3. **السعر:**
   - إذا `sale_enabled = true`:
     - السعر القديم مشطوب: `45,000 ل.س` (رمادي).
     - السعر الجديد بارز: `32,000 ل.س` (بنفسجي 32px).
     - ما يعادله بالدولار: `≈ 3.20 $` (رمادي أصغر).
     - شارة خصم: "-29%" (ذهبي).
   - إذا لا تخفيض: `45,000 ل.س  ≈  4.50 $`.
4. **الوصف:** نص مع فواصل أسطر.
5. **VariantSelector:** أزرار اختيار للمتغيرات (مجموعة لكل `variant_type`). عند اختيار متغير بسعر مختلف، السعر أعلاه يُحدَّث.
6. **GovernorateAvailability:**
   - عنوان: "اختر محافظتك".
   - Grid أزرار صغيرة لكل محافظة فعّالة.
   - إذا المنتج **متوفر** في المحافظة: زر قابل للضغط بلون بنفسجي فاتح، عند الاختيار يصبح بنفسجي داكن.
   - إذا **غير متوفر**: زر رمادي معطّل مع نص صغير تحته: "(غير متوفر حالياً)".
   - رسالة أسفل: "تكلفة الشحن إلى [المحافظة]: [X] ل.س" (تُجلب من `governorates.shipping_cost`).
7. **الكمية:** زرّان + و - مع عدد.
8. **أزرار CTA:**
   - "أضف إلى السلة" (بنفسجي بعرض كامل، معطّل إذا لم تُختر محافظة متوفرة، أو متغير مطلوب لم يُختر).
   - "أضف إلى المفضلة" (ذهبي outline، أيقونة قلب).
9. **FavoriteButton** (قلب صغير في زاوية الصورة).

#### 5.9.3 RelatedProducts
- قسم أسفل: "منتجات مشابهة" — آخر 4 منتجات من نفس البرند أو التصنيف.

### 5.10 صفحة السلة (`src/app/cart/page.tsx`)

- عنوان: "سلة التسوق".
- إذا فارغة: EmptyState مع زر "تسوّق الآن".
- جدول عناصر:
  - صورة، اسم، متغير مختار، سعر الوحدة (ل.س + $)، كمية (+/-)، الإجمالي، زر حذف.
- **CartSummary** (يمين على الديسكتوب، أسفل على الموبايل):
  - مجموع المنتجات (ل.س + $).
  - يعرض: "اختر محافظتك في صفحة إتمام الطلب لحساب الشحن".
  - زر "متابعة إلى إتمام الطلب" (بنفسجي كبير) → `/checkout`.
  - زر "متابعة التسوق" (outline) → `/shop`.

### 5.11 صفحة إتمام الطلب (`src/app/checkout/page.tsx`)

- Layout: عمودان (نموذج 60% + ملخص 40%).

#### 5.11.1 CheckoutForm (النموذج)
حقول مطلوبة (مع Zod validation):
1. **الاسم الكامل** *
2. **رقم الهاتف** * (تحقق من صيغة سورية: يبدأ بـ `09` أو `+963`).
3. **المحافظة** * (Dropdown من الـ governorates الفعّالة).
   - عند الاختيار، يتحقق أن **كل المنتجات** في السلة متوفرة في هذه المحافظة.
   - إذا منتج غير متوفر: تحذير أحمر "المنتج X غير متوفر في هذه المحافظة، يرجى إزالته من السلة أو تغيير المحافظة".
4. **العنوان بالتفصيل** * (textarea: المنطقة، الشارع، رقم البناء...).
5. **ملاحظات إضافية** (اختياري).
6. **طريقة الدفع** * (radio buttons):
   - ○ الدفع عند الاستلام
   - ○ شام كاش (يظهر فقط إذا `settings.sham_cash_enabled = true`)

#### 5.11.2 PaymentMethodSelector
- عند اختيار "شام كاش" يظهر مربع معلومات (`<ShamCashInstructions />`):
  - باركود شام كاش (صورة من `settings.sham_cash_barcode_url`).
  - "رقم الحساب: [sham_cash_account]" مع زر نسخ.
  - "رقم الهاتف: [sham_cash_phone]" مع زر نسخ.
  - نص توضيحي:
    > بعد إرسال طلبك عبر واتساب، يرجى تحويل مبلغ الطلب إلى الحساب أعلاه عبر تطبيق شام كاش. يمكنك أيضاً طلب التفاصيل عبر واتساب بعد إتمام الطلب.

#### 5.11.3 CartSummary في Checkout
- قائمة المنتجات مختصرة.
- مجموع المنتجات (ل.س + $).
- تكلفة الشحن (تُحسب بناءً على المحافظة المختارة).
- **إذا** مجموع المنتجات ≥ `settings.free_shipping_threshold` → الشحن = 0 مع نص أخضر "🎉 شحن مجاني!".
- الإجمالي النهائي (ل.س + $).
- زر CTA كبير: **"إرسال الطلب عبر واتساب"** (أخضر بأيقونة واتساب).

#### 5.11.4 سلوك زر "إرسال الطلب"
1. يتحقق من صحة النموذج (Zod).
2. يتحقق من توفر كل المنتجات بالمحافظة المختارة.
3. يبني رسالة واتساب (انظر 5.11.5).
4. يفتح `https://wa.me/{whatsapp_number}?text={encoded_message}` في تبويب جديد.
5. يمسح السلة من الـ store (بعد فتح الرابط).
6. يوجّه إلى `/` مع toast: "تم إرسال طلبك! سيتواصل معك فريقنا قريباً عبر واتساب.".
7. **لا يُحفظ الطلب في قاعدة البيانات** (شرط المستخدم).

#### 5.11.5 صيغة رسالة الواتساب (من `lib/whatsapp.ts`)

```
🦋 *طلب جديد - Elite and More* 🦋

━━━━━━━━━━━━━━━━━━━━━━
*بيانات الزبون:*
👤 الاسم: {name}
📞 الهاتف: {phone}
📍 المحافظة: {governorate_name}
🏠 العنوان: {address}
{notes ? `📝 ملاحظات: ${notes}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━
*المنتجات:*
{foreach item:
  ▪️ {item.name}
     {item.variants ? `- ${item.variants}` : ''}
     الكمية: {item.quantity}
     السعر: {item.price} ل.س × {item.quantity} = {item.subtotal} ل.س
}
━━━━━━━━━━━━━━━━━━━━━━
*الحساب:*
💰 مجموع المنتجات: {subtotal} ل.س (≈ {subtotal_usd} $)
🚚 تكلفة الشحن: {shipping} ل.س
{free_shipping ? '✅ شحن مجاني!' : ''}
💵 *الإجمالي: {total} ل.س (≈ {total_usd} $)*

💳 طريقة الدفع: {payment_method}
{if shamcash: `\n📲 سيتم إرسال المبلغ عبر شام كاش.`}
━━━━━━━━━━━━━━━━━━━━━━
شكراً لثقتكم بـ Elite and More 🦋
```

### 5.12 صفحة المفضلة (`src/app/favorites/page.tsx`)

- تقرأ من `favoritesStore` (Zustand + localStorage).
- عنوان: "منتجاتي المفضلة".
- إذا فارغة: EmptyState + زر تسوّق.
- شبكة ProductCards كالعادة.
- **ملاحظة للمستخدم في أعلى الصفحة (مربع info):**
  > المنتجات المفضلة محفوظة في متصفحك الحالي فقط. إذا بدّلت الجهاز أو مسحت بيانات المتصفح، ستُفقد.

### 5.13 صفحة من نحن (`src/app/about/page.tsx`)

- Hero مصغّر: خلفية بنفسجية + اللوغو + "من نحن".
- محتوى: `settings.about_full` (رتشن نص بفواصل أسطر).
- قسم "برنداتنا": صف شعارات البرندات (صغيرة، أبيض وأسود تتلون عند hover).
- قسم "تواصل معنا": رقم + واتساب + فيسبوك + عنوان + ساعات.

#### 5.13.1 النص الذي أكتبه لـ `about_full` (يُحفظ كـ seed في settings):

```
مرحباً بك في Elite and More — وجهتك المفضلة لمنتجات التنظيف والعناية الأصلية في سوريا.

نحن في Elite and More نؤمن أن الجودة ليست خياراً، بل معياراً. نعمل على اختيار أفضل البرندات العالمية والمحلية بعناية فائقة، ونوصلها إليك بأسعار عادلة وخدمة موثوقة في كل المحافظات السورية.

شعارنا "The Best In your Hands" ليس مجرد كلمات — بل وعد نلتزم به في كل منتج نقدّمه لك.

*برنداتنا*
نفتخر بشراكتنا مع نخبة من البرندات الرائدة: BESTON، banat، PRESTIGE، Millia، Vizon، ActiveX Clean، وNUK Clean — كل واحد منها تم اختياره ليقدم لك الأفضل في مجاله.

*لماذا Elite and More؟*
• منتجات أصلية 100%
• توصيل لكل المحافظات السورية
• دعم مباشر عبر واتساب
• خيارات دفع متعددة (كاش عند الاستلام أو شام كاش)
• أسعار شفافة بالليرة السورية والدولار

نحن هنا لخدمتك. شكراً لثقتك بنا.
```

النص القصير `about_short` (للصفحة الرئيسية):

```
Elite and More وجهتك المفضلة لمنتجات التنظيف والعناية الأصلية في سوريا. نختار أفضل البرندات ونوصلها إليك بأسعار عادلة في كل المحافظات. "The Best In your Hands" — وعد نلتزم به.
```

---

## 6. لوحة التحكم (Admin Panel) — بالتفصيل

### 6.1 تسجيل الدخول (`/admin/login`)

- صفحة مستقلة بدون Header/Footer العام.
- خلفية بنفسجية كاملة مع لوغو الفراشة كبيراً.
- نموذج في كرت أبيض في المنتصف:
  - إيميل
  - كلمة مرور
  - زر "تسجيل الدخول" (ذهبي).
- بعد نجاح: redirect إلى `/admin`.
- يستخدم NextAuth Credentials provider + bcrypt للتحقق من `admins` table.

### 6.2 Admin Layout

- Sidebar على اليمين (في RTL) — ثابت 260px:
  - أعلى: لوغو صغير + "لوحة التحكم".
  - قائمة:
    - 📊 الرئيسية (/admin)
    - 🏷️ البرندات (/admin/brands)
    - 📂 التصنيفات (/admin/categories)
    - 📦 المنتجات (/admin/products)
    - 🏛️ المحافظات (/admin/governorates)
    - ⭐ الشارات (/admin/tags)
    - 🖼️ سلايدر الصور (/admin/banners)
    - ⚙️ الإعدادات (/admin/settings)
  - أسفل: اسم الأدمن + زر "تسجيل خروج".
- Main Area: padding 32px، خلفية `--color-surface-dim`.

### 6.3 الرئيسية (`/admin`)

صفحة بسيطة (بدون إحصائيات حسب طلب المستخدم):
- رسالة ترحيب: "مرحباً [اسم الأدمن] 👋".
- 7 كروت اختصار كبيرة بأيقونات تقود لكل قسم (برندات، تصنيفات، منتجات، محافظات، شارات، سلايدر الصور، إعدادات).
- نص صغير: "استخدم القائمة الجانبية لإدارة متجرك".

### 6.4 البرندات (`/admin/brands`)

#### قائمة البرندات
- زر "+ إضافة برند جديد" أعلى.
- جدول: الشعار | الاسم | التصنيفات | المنتجات | الحالة | الترتيب | إجراءات (تعديل / حذف).
- زر حذف يفتح ConfirmDialog: "هل أنت متأكد؟ سيتم حذف البرند وكل تصنيفاته ومنتجاته وصورهم من Cloudinary نهائياً."

#### إضافة/تعديل برند (`/admin/brands/new` أو `/[id]/edit`)
حقول:
- اسم البرند * (يولّد slug تلقائياً عند التعديل عليه يدوياً).
- Slug *.
- الوصف (textarea).
- الشعار * (ImageUploader واحد).
- صورة الغلاف (ImageUploader اختياري).
- **تفعيل التصنيفات الداخلية** — Switch (افتراضياً مفعّل) مع HelpTooltip:
  > *متى تُفعّل هذا الخيار؟*
  > إذا كان هذا البرند يحتوي على عدة أقسام داخلية (مثل: منظفات، معطرات، منعمات)، اترك الخيار مفعّلاً وستتمكن من إضافة تصنيفات له من صفحة "التصنيفات".
  > إذا كانت منتجات البرند مباشرة بدون تصنيفات داخلية، عطّل هذا الخيار — عندها لن يظهر حقل التصنيف عند إضافة منتج لهذا البرند، ولن تظهر تبويبات التصنيفات في صفحة البرند على الموقع.
- الترتيب (رقم).
- فعّال (Switch).
- زر "حفظ".

> **تحذير عند التعديل:** إذا كان البرند عليه تصنيفات موجودة وحاول الأدمن تعطيل `has_categories`، يظهر ConfirmDialog:
> "البرند [الاسم] يحتوي على N تصنيف. عند تعطيل التصنيفات الداخلية، ستبقى التصنيفات في القاعدة لكن لن تظهر في الموقع ولن تُستخدم في المنتجات الجديدة. المنتجات الحالية ستفقد ارتباطها بالتصنيف (سيصبح `category_id = null`). هل تريد المتابعة؟"

### 6.5 التصنيفات (`/admin/categories`)

#### قائمة التصنيفات
- فلتر: البرند (Dropdown) — **يعرض فقط البرندات التي `has_categories = true`**.
- زر "+ إضافة تصنيف" — **معطّل مع Tooltip** إذا لم يوجد أي برند مفعّل التصنيفات:
  > لا يوجد برند مُفعّل عليه خيار "التصنيفات الداخلية". فعّل الخيار من صفحة البرندات أولاً، أو لا تحتاج لإضافة تصنيفات إذا كانت منتجاتك مباشرة بلا تصنيفات.
- جدول: الصورة | الاسم | البرند | المنتجات | الترتيب | إجراءات.

#### إضافة/تعديل
- اسم *.
- Slug *.
- البرند * (Dropdown) — **يعرض فقط البرندات التي `has_categories = true`**.
- صورة (ImageUploader).
- الترتيب.

### 6.6 المحافظات (`/admin/governorates`)

#### قائمة
- زر "+ إضافة محافظة".
- جدول: الاسم | تكلفة الشحن (ل.س) | الحالة | الترتيب | إجراءات.

#### إضافة/تعديل
- اسم *.
- Slug *.
- تكلفة الشحن * (رقم بالليرة).
- فعّال (Switch).
- الترتيب.

> **ملاحظة:** عند إضافة محافظة جديدة، يُنشأ سجل في `product_governorates` لكل منتج موجود (`is_available = true` افتراضياً).

### 6.7 الشارات (`/admin/tags`)

#### قائمة
- زر "+ إضافة شارة".
- جدول: الاسم | اللون (دائرة صغيرة) | عرض في الرئيسية | الترتيب | إجراءات.

#### إضافة/تعديل
- الاسم * (مثل: جديد، الأكثر مبيعاً، عرض، حصري، نفد).
- Slug *.
- اللون (color picker).
- Switch: "عرض قسم في الصفحة الرئيسية".
- الترتيب.

### 6.8 سلايدر الصور (`/admin/banners`)

صفحة واحدة فقط (بدون `/new` و `/[id]/edit`) — كل العمليات في صفحة واحدة بنمط Banias (Modal لإضافة/تعديل).

#### الواجهة
- رأس الصفحة: `<PageHeader />` بعنوان "إدارة سلايدر الصور" + نص فرعي مساعد:
  > هذه الصور تظهر في سلايدر متحرك في أعلى الصفحة الرئيسية (تحت البانر الثابت). يمكنك إضافة عدة صور ترويجية وستتبدّل تلقائياً.
- زر "+ إضافة صورة جديدة" (بنفسجي، أعلى يسار).
- نص توضيحي أسفل الزر:
  > 📌 **نصيحة:** استخدم صوراً بنسبة 2:1 (مثلاً 1600×800 بكسل) للحصول على أفضل عرض. الحد الأقصى الموصى به: 5 صور.

#### عرض البانرات (شبكة)
- Grid 2 أعمدة على الديسكتوب، عمود واحد على الموبايل.
- كل كرت:
  - الصورة بنسبة `aspect-[2/1]` مع `object-cover` + Border radius 16px.
  - إذا معطّل: طبقة سوداء نصف شفافة + شارة حمراء "معطّل" في الوسط.
  - أسفل الصورة (padding 12px):
    - يسار: العنوان (إن وُجد) + "ترتيب: N" تحته.
    - يمين: مجموعة أزرار:
      - زر تبديل التفعيل (أخضر إذا مفعّل / رمادي إذا معطّل).
      - زر تعديل (أيقونة قلم، أزرق).
      - زر حذف (أيقونة سلة، أحمر).

#### نموذج الإضافة/التعديل (Modal)
- Overlay أسود شفاف 50%.
- Modal مركزي، أبيض، radius 16px، max-width 500px.
- العنوان: "إضافة صورة جديدة" أو "تعديل الصورة".
- الحقول:
  1. **العنوان** (اختياري) — نص حر. يُستخدم كـ `alt` للصورة وعنوان tooltip.
  2. **الصورة** * — `<ImageUploader>`:
     - معاينة مباشرة قبل الرفع.
     - عند التعديل: تُعرض الصورة الحالية. إذا رفع صورة جديدة، تُحذف القديمة من Cloudinary تلقائياً عند الحفظ.
  3. **رابط الانتقال عند الضغط** (اختياري) — input نصي.
     - HelpTooltip:
       > عند ضغط الزبون على الصورة، يُنقل إلى هذا الرابط. يمكنك استخدام رابط داخلي مثل `/brands/nuk-clean` أو `/shop?tag=sale`، أو رابط خارجي كامل مثل `https://...`. اتركه فارغاً لتعطيل الضغط.
  4. **نوع الرابط** — Radio buttons (يظهر فقط إذا الحقل 3 معبّأ):
     - ○ داخلي (نفس النافذة) — افتراضي
     - ○ خارجي (نافذة جديدة)
     - ○ بدون رابط (غير قابل للضغط)
  5. **الترتيب** — رقم (الأقل يظهر أولاً).
  6. **مفعّل** — Checkbox (افتراضياً مفعّل).
- زر الحفظ في الأسفل: ذهبي بعرض كامل، يعرض "جاري الرفع..." أثناء الحفظ.
- زر × في أعلى يمين الـ Modal لإغلاقه.

#### السلوك
- **الحذف:** يفتح ConfirmDialog:
  > هل أنت متأكد من حذف هذه الصورة؟ سيتم حذف الصورة نهائياً من Cloudinary.
  عند التأكيد: احذف من Cloudinary أولاً، ثم من DB، ثم أعد تحميل القائمة.
- **التبديل (فعّال/معطّل):** تحديث فوري في DB بدون تأكيد، مع toast قصير.
- **الترتيب:** يُحدَّث من حقل الترتيب في نموذج التعديل. لا drag-and-drop في هذه المرحلة.

### 6.9 المنتجات (`/admin/products`)

#### قائمة
- فلاتر: البرند، التصنيف، الحالة.
- بحث بالاسم.
- زر "+ إضافة منتج".
- جدول: الصورة | الاسم | البرند | التصنيف | السعر | العرض (sale) | الشارات | الحالة | إجراءات.

#### إضافة/تعديل منتج (`/admin/products/new` أو `/[id]/edit`)

نموذج كبير مقسّم لأقسام:

**القسم 1 — معلومات أساسية**
- اسم المنتج *.
- Slug *.
- البرند * (Dropdown).
- التصنيف — **مشروط بـ `has_categories` للبرند المختار:**
  - إذا البرند المختار `has_categories = true`: يظهر Dropdown للتصنيفات (مفلتر حسب البرند) — **حقل إلزامي `*`**.
  - إذا البرند المختار `has_categories = false`: الحقل **مخفي تماماً** ويُرسل `category_id = null` عند الحفظ.
  - إذا لم يُختر برند بعد: الحقل معطّل مع placeholder: "اختر البرند أولاً".
  - عند تغيير البرند بعد اختيار تصنيف: إذا البرند الجديد `has_categories = false` يُمسح التصنيف، وإذا `has_categories = true` يُفرّغ التصنيف ويُعاد ملء الخيارات.
- الوصف (textarea كبير).

**القسم 2 — السعر**
- السعر الأساسي بالليرة السورية * (رقم).
- **تفعيل التخفيض** — Switch مع HelpTooltip:
  > *ما هو التخفيض؟*
  > عند تفعيل هذه الخاصية، يظهر للزبون السعر القديم مشطوباً بجانب السعر الجديد المخفّض، مع شارة توضح نسبة الخصم. مفيد للعروض الترويجية ومواسم التخفيضات.
- **إذا مفعّل:** حقل "سعر التخفيض" * (يجب أن يكون أقل من السعر الأساسي).
- تحت الحقول: **معاينة مباشرة للسعر بالدولار** (يُحسب من exchange_rate الحالي من settings).
  - مثلاً: "السعر: 45,000 ل.س ≈ 3.00 $ (بسعر صرف 15,000 ل.س / 1 $)".

**القسم 3 — الصور**
- MultiImageUploader (يسمح برفع عدة صور).
- تحديد الصورة الأساسية (نجمة ⭐).
- إعادة ترتيب بالسحب.

**القسم 4 — المتغيرات (اختياري)**
- VariantEditor: يضيف صفوفاً.
  - كل صف: نوع (Dropdown: الحجم / اللون / الوزن / الرائحة)، الاسم (مثل "500مل")، القيمة (hex إذا لون)، سعر خاص (اختياري، يرث من السعر الأساسي).
- زر "+ إضافة متغير".

**القسم 5 — الشارات**
- TagSelector: Multi-select من الشارات الموجودة.

**القسم 6 — التوفر بالمحافظات**
- GovernorateAvailabilityEditor:
  - جدول لكل محافظة فعّالة: الاسم | Switch (متوفر/غير متوفر).
  - أزرار سريعة: "اختيار الكل" / "إلغاء الكل".
- نص توضيحي: "عطّل الزر للمحافظات التي لا يتوفر فيها هذا المنتج حالياً. سيظهر للزبون في صفحة المنتج أن المنتج غير متوفر في تلك المحافظة.".

**القسم 7 — خيارات إضافية**
- حالة المخزون (Dropdown: متوفر / غير متوفر).
- مميّز في الصفحة الرئيسية (Switch).
- فعّال (Switch).
- الترتيب.

**زر "حفظ"** في أسفل يمين (sticky).

### 6.10 الإعدادات (`/admin/settings`)

صفحة مقسّمة لأقسام (Tabs):

**Tab 1 — عام**
- شعار المتجر (ImageUploader).
- بانر الهيرو (ImageUploader).
- رقم الواتساب للطلبات والمساعدة *.
- رابط فيسبوك.
- رقم التواصل.
- العنوان.
- ساعات العمل.

**Tab 2 — المالية**
- سعر صرف الدولار * (رقم: كم ليرة = 1 دولار). HelpTooltip:
  > يُستخدم هذا السعر لحساب معادل كل المنتجات بالدولار. حدّثه كلما تغيّر سعر السوق.
- عتبة الشحن المجاني (رقم بالليرة، اتركه فارغاً للتعطيل). HelpTooltip:
  > إذا تجاوز مجموع طلب الزبون هذا المبلغ، يصبح الشحن مجانياً تلقائياً. اتركه فارغاً لتعطيل هذه الميزة.

**Tab 3 — شام كاش**
- تفعيل دفع شام كاش (Switch). HelpTooltip:
  > عند التفعيل، يصبح "شام كاش" خياراً متاحاً للزبون في صفحة إتمام الطلب.
- رقم هاتف حساب شام كاش.
- كود/رقم حساب شام كاش.
- صورة الباركود (ImageUploader).

**Tab 4 — نصوص الموقع**
- نص "من نحن" المختصر (textarea — يظهر في الرئيسية).
- نص "من نحن" الكامل (textarea كبير — يظهر في /about).

**زر "حفظ التغييرات"** في أسفل كل Tab.

---

## 7. المكوّنات الحرجة — تفاصيل سلوكية

### 7.1 `PriceDisplay.tsx`

Props: `{ priceSYP: number, salePriceSYP?: number, saleEnabled: boolean, size?: 'sm'|'md'|'lg' }`

- يستقبل exchange_rate من hook `useExchangeRate()` (يقرأ من settings مرة واحدة عبر SWR/React Query أو من context).
- إذا `saleEnabled && salePriceSYP`:
  - عرض سعر قديم مشطوب: `{priceSYP} ل.س`.
  - عرض سعر جديد: `{salePriceSYP} ل.س`.
  - عرض دولار: `≈ {salePriceSYP / rate} $`.
  - شارة خصم: `-{round((priceSYP - salePriceSYP) / priceSYP * 100)}%`.
- وإلا:
  - `{priceSYP} ل.س  ≈  {priceSYP / rate} $`.

### 7.2 `FavoriteButton.tsx`

- يقرأ ويكتب في `favoritesStore` (Zustand + persist).
- يخزّن: `product_id` فقط.
- أيقونة قلب: فارغ إذا غير مفضل، ممتلئ بنفسجي إذا مفضّل.
- toast عند الإضافة/الإزالة.

### 7.3 `GovernorateAvailability.tsx` (في صفحة المنتج)

Props: `{ productId: string }`

- يجلب governorates الفعّالة + `product_governorates` للمنتج.
- Grid أزرار:
  - متوفر: `bg-primary-100 hover:bg-primary-200 cursor-pointer`.
  - غير متوفر: `bg-gray-100 text-gray-400 cursor-not-allowed` + نص "(غير متوفر حالياً)".
  - مختار: `bg-primary text-white`.
- عند الاختيار: يخزن في state محلي + يمرّر إلى parent (ProductInfo) لتمكين زر السلة.

### 7.4 `whatsapp.ts`

```ts
export function buildOrderMessage(order: OrderData): string { ... }
export function getWhatsAppLink(phone: string, message: string): string {
  const cleaned = phone.replace(/\D/g, '');
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}
```

### 7.5 `ImageUploader.tsx` و `MultiImageUploader.tsx`

- يستخدم react-dropzone.
- يرفع مباشرة إلى `/api/images/upload` (يرد URL من Cloudinary).
- عند الحذف: يستدعي `/api/images/delete` قبل إزالة الرابط من الـ state.
- معاينة صور + شريط تقدم.

---

## 8. API Routes — قائمة حرفية

كل route محمي بـ session check ما عدا GETs العامة.

### 8.1 Public
- `GET /api/brands` → قائمة البرندات الفعّالة.
- `GET /api/brands/[id]` → برند مع تصنيفاته.
- `GET /api/products?brand=&category=&tag=&governorate=&search=&minPrice=&maxPrice=&sort=&page=` → منتجات.
- `GET /api/products/[id]` → منتج كامل مع الصور والمتغيرات والشارات والتوفر.
- `GET /api/categories?brand_id=` → تصنيفات.
- `GET /api/governorates` → محافظات فعّالة.
- `GET /api/tags` → شارات.
- `GET /api/banners?active=true` → البانرات الفعّالة مرتبة حسب `sort_order` تصاعدياً (للسلايدر في الصفحة الرئيسية).
- `GET /api/settings` → كل الإعدادات (الحقول العامة فقط، بدون sham_cash حتى لا تُكشف قبل التفعيل).

### 8.2 Admin (محمية)
- `POST /api/brands` — إضافة برند.
- `PUT /api/brands/[id]` — تعديل.
- `DELETE /api/brands/[id]` — حذف + حذف كل صور المنتجات والصور الشعار من Cloudinary.
- نفس الأنماط لـ: categories, products, governorates, tags, banners.
- `GET /api/banners` (بدون `?active=true`) — في سياق admin يرجع كل البانرات (فعّالة + معطّلة).
- `POST /api/banners` — إضافة بانر (مع `cloudinary_public_id`).
- `PUT /api/banners/[id]` — تعديل بانر (إذا تغيّرت الصورة: احذف القديمة من Cloudinary أولاً).
- `DELETE /api/banners/[id]` — حذف بانر (احذف الصورة من Cloudinary أولاً).
- `PUT /api/settings` — تحديث الإعدادات.
- `POST /api/images/upload` — رفع إلى Cloudinary (multipart).
- `POST /api/images/delete` — حذف من Cloudinary (body: url).

### 8.3 قاعدة الحذف مع الصور
- عند DELETE لأي كيان فيه صور (product, brand, category, tag, banner)، **قبل** حذف السجل من DB:
  1. اجمع كل روابط الصور المرتبطة.
  2. استدعِ `cloudinary.uploader.destroy(publicId)` لكل واحدة.
  3. بعد النجاح، احذف السجل من DB.
  4. في حالة فشل Cloudinary: سجّل الخطأ لكن أكمل الحذف من DB (تنبيه للأدمن بـ toast).

### 8.4 `GET /api/keep-alive` — إبقاء Supabase نشطاً

**المشكلة:** مشروع Supabase على الخطة المجانية يُعلَّق تلقائياً بعد 7 أيام من عدم النشاط (صفر طلبات DB). عند التعليق يتوقف الموقع عن العمل حتى يُعيد الأدمن تشغيل المشروع يدوياً.

**الحل:** endpoint بسيط يُستدعى دورياً من خدمة cron خارجية (مثل [cron-job.org](https://cron-job.org) أو GitHub Actions scheduled workflow) ويقوم باستعلام بسيط على DB لإعادة ضبط مؤقّت عدم النشاط.

**الفرق عن نسخة `my-skill`:** النسخة في `my-skill/src/app/api/keep-alive/route.ts` تكتفي بإرجاع `{status: 'ok'}` بدون ملامسة DB — هذا لا يمنع تعليق Supabase لأن Vercel فقط هو الذي يُحفَّز. **في هذا المشروع يجب أن يُنفّذ الـ endpoint استعلاماً فعلياً على DB.**

**التطبيق (`src/app/api/keep-alive/route.ts`):**
```ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // استعلام فعلي على DB لمنع التعليق التلقائي لـ Supabase
  const { error } = await supabaseAdmin
    .from('settings')
    .select('id')
    .limit(1);

  if (error) {
    return NextResponse.json({ status: 'error', error: error.message }, { status: 500 });
  }

  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
}
```

**متغيّر بيئة مطلوب:**
- `CRON_SECRET` — سلسلة عشوائية طويلة (32+ حرفاً). توضع في `.env.local` وفي Vercel.

**إعداد cron:**
- في cron-job.org أنشئ job يستدعي `https://elite-domain.vercel.app/api/keep-alive` كل 3–6 أيام مع Header: `Authorization: Bearer <CRON_SECRET>`.
- الهدف: ≤ 7 أيام بين كل استدعاء وآخر.

---

## 9. الـ Stores (Zustand)

### 9.1 `cartStore.ts`
```ts
type CartItem = {
  id: string;              // product_id_variantId hash
  product_id: string;
  variant_id?: string;
  name: string;
  brand_name: string;
  image: string;
  price_syp: number;       // سعر الوحدة النهائي (بعد التخفيض)
  quantity: number;
  variant_label?: string;  // مثلاً "500مل / أحمر"
};

state: {
  items: CartItem[];
  addItem, removeItem, updateQuantity, clear
}
persist key: 'elite-cart'
```

### 9.2 `favoritesStore.ts`
```ts
state: {
  ids: string[];
  toggle(id), has(id), clear
}
persist key: 'elite-favorites'
```

---

## 10. مخطط تدفق المستخدم (Flows)

### 10.1 تدفق الشراء الكامل
1. الزبون يدخل `/` → يرى Hero + برندات + أقسام شارات/برندات.
2. ينقر على منتج → `/products/[slug]`.
3. يختار متغير (إن وُجد) + محافظة متوفرة → زر "أضف للسلة" يُفعَّل.
4. يضيف للسلة → CartDrawer يظهر (optional) أو toast + يتابع.
5. يفتح `/cart` → يراجع → يضغط "متابعة لإتمام الطلب".
6. `/checkout` → يملأ البيانات → يختار المحافظة (نفسها من المنتج).
7. يختار طريقة الدفع (كاش أو شام كاش).
8. إذا شام كاش: يرى الباركود والأرقام.
9. يضغط "إرسال الطلب عبر واتساب" → يفتح واتساب برسالة جاهزة.
10. السلة تُمسح، toast نجاح، redirect إلى `/`.

### 10.2 تدفق الأدمن لإضافة منتج
1. `/admin/login` → login.
2. `/admin/brands` → يضيف برند (لوغو + غلاف + اسم).
3. `/admin/categories` → يضيف تصنيف مربوط بالبرند.
4. `/admin/governorates` → يضيف محافظات مع أسعار الشحن.
5. `/admin/tags` → يضيف شارات (جديد، عروض...).
6. `/admin/products/new` → يملأ كل الأقسام (صور، متغيرات، شارات، توفر بمحافظات) → حفظ.
7. المنتج يظهر فوراً في الموقع العام.

---

## 11. خطة التنفيذ بالترتيب — للـ Agent المنفّذ

> اتبع هذه الخطوات بالترتيب. لا تتخطى خطوة.

### المرحلة 1 — التهيئة (Setup)
1. انسخ كل محتوى `C:\Users\moham\Desktop\my-skill\` إلى `C:\Users\moham\Desktop\Elite\` (لا تنسخ `README.md`، احتفظ بـ `PLAN.md` في Elite).
2. أنشئ مجلد `public/images/` وانقل `1.jpg` إلى `public/images/hero-banner.jpg`، و `2.jpg` إلى `public/images/logo.jpg`.
3. **لا تحذف** مجلد `Brands/` (مرجعي للصور يدوياً لاحقاً).
4. أنشئ `.env.local` و `.env.example` بالمفاتيح في القسم 4 (قيم فارغة).
5. أنشئ `.gitignore` يتضمن: `node_modules`, `.next`, `.env.local`, `.env*.local`.
6. حدّث `package.json`: غيّر `name` إلى `"elite-and-more"`.
7. شغّل `npm install`.

### المرحلة 2 — الهوية البصرية
8. حدّث `tailwind.config.ts` بالألوان الكاملة من القسم 1.1.
9. حدّث `src/app/globals.css`:
   - import الخطوط من Google Fonts (Tajawal, Cairo, Inter).
   - CSS variables للألوان.
   - أنماط عامة (body, scrollbar, selection بلون بنفسجي).
10. أنشئ `src/components/ui/Logo.tsx` (يعرض `/images/logo.jpg` + نص "Elite and More").
11. أنشئ `src/components/ui/ButterflyIcon.tsx` (SVG فراشة بسيطة ذهبية كعنصر زخرفي).

### المرحلة 3 — قاعدة البيانات
12. أنشئ `supabase/schema.sql` بكل الجداول من القسم 3.
13. زوّد المستخدم بالتعليمات لتنفيذه على Supabase (تعليقات في أعلى الملف).
14. حدّث `src/types/index.ts` ليطابق الجداول الجديدة (Brand, Category, Tag, Governorate, Product, ProductVariant, ProductImage, Settings).

### المرحلة 4 — المصادقة
15. حدّث `src/lib/auth.ts` (NextAuth Credentials + bcrypt check مقابل `admins` table).
16. حدّث `middleware.ts` لحماية `/admin/*` عدا `/admin/login`.
17. أنشئ سكريبت `scripts/create-admin.ts` لإنشاء الأدمن الأول (`npm run create-admin`).

### المرحلة 5 — Layout و Components العامة
18. حدّث `src/app/layout.tsx` (RTL, خطوط, metadata, Providers).
19. أنشئ `src/components/layout/TopAnnouncementBar.tsx`.
20. أنشئ `src/components/layout/Header.tsx` (ديسكتوب + موبايل + dropdown برندات).
21. أنشئ `src/components/layout/MobileMenu.tsx`.
22. أنشئ `src/components/layout/Footer.tsx`.
23. أنشئ `src/components/layout/FloatingWhatsApp.tsx`.

### المرحلة 6 — مكوّنات UI الأساسية
24. أنشئ كل مكوّنات `src/components/ui/*` (Button, Input, Modal, Badge, Breadcrumbs, EmptyState, Spinner, Skeleton, Switch, Checkbox, Select, Textarea).

### المرحلة 7 — Stores و Hooks
25. أنشئ `src/store/cartStore.ts` و `src/store/favoritesStore.ts`.
26. أنشئ الـ hooks في `src/hooks/`.

### المرحلة 8 — API Routes
27. أنشئ كل endpoints في القسم 8، بما فيها `src/app/api/keep-alive/route.ts` (راجع 8.4) الذي يستعلم فعلياً على جدول `settings` لمنع تعليق Supabase على الخطة المجانية. أضف `CRON_SECRET` إلى `.env.local` و `.env.example`.

### المرحلة 9 — مكوّنات المنتج والصفحات العامة
28. أنشئ `ProductCard`, `ProductGrid`, `PriceDisplay`, `FavoriteButton`.
28.1 أنشئ `src/components/home/BannerSlider.tsx` (Swiper + Autoplay + EffectFade + Pagination مخصّصة بالذهبي، كما في 5.6.2).
29. أنشئ الصفحة الرئيسية `src/app/page.tsx` مع كل الأقسام من 5.6 (الترتيب: Hero → BannerSlider → Features → About → Brands → TagSections → BrandSections).
30. أنشئ `src/app/shop/page.tsx` + مكوّنات الفلترة.
31. أنشئ `src/app/brands/[slug]/page.tsx` + BrandHeader, BrandCategoryTabs.
32. أنشئ `src/app/products/[slug]/page.tsx` + كل مكوّناته (Gallery, Info, VariantSelector, GovernorateAvailability, RelatedProducts).
33. أنشئ `src/app/cart/page.tsx` + CartItem, CartSummary.
34. أنشئ `src/app/checkout/page.tsx` + CheckoutForm, PaymentMethodSelector, ShamCashInstructions.
35. أنشئ `src/app/favorites/page.tsx`.
36. أنشئ `src/app/about/page.tsx`.
37. أنشئ `src/app/not-found.tsx` و `loading.tsx`.

### المرحلة 10 — لوحة التحكم
38. أنشئ `src/app/admin/layout.tsx` + AdminSidebar, AdminHeader.
39. أنشئ `src/app/admin/login/page.tsx`.
40. أنشئ `src/app/admin/page.tsx` (ترحيب).
41. أنشئ كل صفحات CRUD بالترتيب:
    a. brands (list + new + edit)
    b. categories
    c. governorates
    d. tags
    e. banners (صفحة واحدة بـ Modal — كما في 6.8)
    f. products (أعقد واحدة — خذ وقتك)
    g. settings
42. أنشئ المكوّنات المساعدة: ImageUploader, MultiImageUploader, TagSelector, VariantEditor, GovernorateAvailabilityEditor, SalePriceToggle, HelpTooltip, ConfirmDialog, DataTable, PageHeader.

### المرحلة 11 — اختبار
43. شغّل `npm run dev`.
44. اختبر flow كامل: تسجيل دخول أدمن → إضافة محافظة → برند → تصنيف → شارة → منتج → إضافة 2-3 بانرات للسلايدر → إضافته للسلة → checkout → استلام رسالة واتساب.
45. اختبر حذف برند/منتج/بانر والتأكد من حذف الصور من Cloudinary.
45.1 اختبر السلايدر: بانر واحد (بدون أسهم/نقاط) → بانرات متعددة (autoplay + fade) → تعطيل كلها (القسم يختفي).
46. اختبر RTL على كل الصفحات.
47. اختبر الموبايل (Chrome DevTools responsive).

### المرحلة 12 — النشر
48. أنشئ حساب Supabase، نفّذ `schema.sql`، أنشئ admin أول.
49. أنشئ حساب Cloudinary.
50. ادفع إلى GitHub.
51. اربط بـ Vercel، ضع env vars، deploy.

---

## 12. قواعد إلزامية للـ Agent المنفّذ

1. **لا تخترع ميزات** غير موجودة في هذه الوثيقة.
2. **لا تستخدم ألواناً** خارج القسم 1.1.
3. **كل نص للمستخدم بالعربية** (placeholders, labels, errors, toasts, buttons).
4. **كل التواريخ** بصيغة `DD/MM/YYYY`.
5. **كل الأرقام** بالفصيلة الإنجليزية (`45,000` لا `٤٥،٠٠٠`).
6. **عند حذف أي سجل فيه صور**: احذف من Cloudinary **أولاً** ثم من DB.
7. **الطلبات لا تُحفظ في DB** — فقط رسالة واتساب.
8. **المفضلة في localStorage فقط** — لا حسابات زبائن.
9. **كل مكون جديد**: TypeScript + Props interface واضح.
10. **كل API route**: Zod validation للـ body + try/catch + رد عربي للأخطاء.
11. إذا غمض شيء غير مذكور هنا: **اسأل المستخدم**، لا تخمّن.
12. احترم الـ structure في القسم 2 حرفياً — لا تضف أو تحذف ملفات.

---

## 13. Checklist نهائية قبل التسليم

- [ ] كل الألوان المستخدمة من palette القسم 1.1.
- [ ] RTL يعمل في كل الصفحات.
- [ ] الخطوط Tajawal/Cairo محمّلة.
- [ ] الـ hero banner يعرض `1.jpg` كخلفية.
- [ ] اللوغو `2.jpg` يظهر في Header و Footer و About.
- [ ] سلايدر الصور يعمل (autoplay 4.5s، fade، نقاط ذهبية، يختفي بدون بانرات).
- [ ] الضغط على بانر يفتح الرابط المحدد (داخلي/خارجي/معطّل).
- [ ] الفراشة الذهبية موجودة كعنصر زخرفي في الهيدر والفوتر.
- [ ] زر واتساب العائم يعمل بالرقم `+963 936 666 950`.
- [ ] فيسبوك يشير إلى الرابط المحدد.
- [ ] السعر يظهر بالليرة + الدولار في كل مكان.
- [ ] التخفيض اختياري ويعرض النسبة عند التفعيل.
- [ ] المحافظات في صفحة المنتج تمنع الاختيار للمحافظات غير المتوفر فيها.
- [ ] الشحن المجاني يعمل عند تجاوز العتبة.
- [ ] شام كاش يظهر فقط إذا مفعّل من الإعدادات.
- [ ] رسالة الواتساب تحتوي كل التفاصيل كما في 5.11.5.
- [ ] حذف المنتج/البرند/البانر يحذف صوره من Cloudinary.
- [ ] المفضلة تُحفظ في localStorage.
- [ ] كل CRUD في لوحة التحكم يعمل.
- [ ] ساعات العمل والعنوان ورقم التواصل قابلة للتعديل من settings.

---

**نهاية الخطة.** اتبعها حرفياً. كل انحراف يُعتبر خطأً.

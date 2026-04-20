-- ================================================================
-- Elite and More — Supabase Schema
-- Run this in your Supabase SQL editor
-- ================================================================

-- Enable UUID extension (usually already enabled on Supabase)
create extension if not exists "uuid-ossp";

-- ================================================================
-- TABLES
-- ================================================================

-- admins
create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

-- settings (single row)
create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  exchange_rate_syp numeric not null default 15000,
  free_shipping_threshold numeric,
  whatsapp_number text not null default '+963936666950',
  facebook_url text not null default 'https://www.facebook.com/share/1CvRRr3Jrp/',
  contact_phone text not null default '+963936666950',
  contact_address text,
  working_hours text default 'السبت - الخميس: 9 صباحاً - 9 مساءً',
  about_short text,
  about_full text,
  sham_cash_phone text,
  sham_cash_account text,
  sham_cash_barcode_url text,
  sham_cash_enabled boolean default false,
  site_logo_url text,
  hero_banner_url text,
  updated_at timestamptz default now()
);

-- brands
create table if not exists brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  logo_url text not null,
  cover_url text,
  has_categories boolean default true,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- categories (optional, per brand)
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands(id) on delete cascade,
  name text not null,
  slug text not null,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now(),
  unique(brand_id, slug)
);

-- tags (badges: جديد، الأكثر مبيعاً، عرض، etc.)
create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  color text default '#6B2D8A',
  show_on_home boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- governorates
create table if not exists governorates (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  shipping_cost numeric not null default 0,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- banners (homepage slider)
create table if not exists banners (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  cloudinary_public_id text,
  link_url text,
  link_target text default 'internal' check (link_target in ('internal', 'external', 'none')),
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  name text not null,
  slug text unique not null,
  description text,
  price_syp numeric not null,
  sale_enabled boolean default false,
  sale_price_syp numeric,
  stock_status text default 'in_stock' check (stock_status in ('in_stock', 'out_of_stock')),
  is_featured boolean default false,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- product_images
create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  variant_id uuid,
  sort_order int default 0,
  is_primary boolean default false
);

-- product_variants
create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  variant_type text not null check (variant_type in ('size', 'color', 'weight', 'scent')),
  name text not null,
  value text,
  price_syp numeric,
  sort_order int default 0
);

-- product_tags (many-to-many)
create table if not exists product_tags (
  product_id uuid not null references products(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  primary key (product_id, tag_id)
);

-- product_governorates (per-product availability per governorate)
create table if not exists product_governorates (
  product_id uuid not null references products(id) on delete cascade,
  governorate_id uuid not null references governorates(id) on delete cascade,
  is_available boolean default true,
  primary key (product_id, governorate_id)
);

-- ================================================================
-- INDEXES
-- ================================================================
create index if not exists idx_products_brand_id on products(brand_id);
create index if not exists idx_products_category_id on products(category_id);
create index if not exists idx_products_is_active on products(is_active);
create index if not exists idx_products_slug on products(slug);
create index if not exists idx_products_created_at on products(created_at desc);
create index if not exists idx_brands_slug on brands(slug);
create index if not exists idx_brands_is_active on brands(is_active);
create index if not exists idx_categories_brand_id on categories(brand_id);
create index if not exists idx_product_images_product_id on product_images(product_id);
create index if not exists idx_product_variants_product_id on product_variants(product_id);
create index if not exists idx_product_tags_product_id on product_tags(product_id);
create index if not exists idx_product_tags_tag_id on product_tags(tag_id);
create index if not exists idx_product_governorates_product_id on product_governorates(product_id);
create index if not exists idx_product_governorates_governorate_id on product_governorates(governorate_id);

-- ================================================================
-- TRIGGERS (auto-update updated_at)
-- ================================================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_updated_at on products;
create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at_column();

drop trigger if exists settings_updated_at on settings;
create trigger settings_updated_at
  before update on settings
  for each row execute function update_updated_at_column();

-- ================================================================
-- ROW LEVEL SECURITY
-- ================================================================
alter table admins enable row level security;
alter table settings enable row level security;
alter table brands enable row level security;
alter table categories enable row level security;
alter table tags enable row level security;
alter table governorates enable row level security;
alter table banners enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;
alter table product_tags enable row level security;
alter table product_governorates enable row level security;

-- Public read (anon key — for storefront)
create policy "public_read_brands" on brands for select using (true);
create policy "public_read_categories" on categories for select using (true);
create policy "public_read_tags" on tags for select using (true);
create policy "public_read_governorates" on governorates for select using (true);
create policy "public_read_banners" on banners for select using (true);
create policy "public_read_products" on products for select using (true);
create policy "public_read_product_images" on product_images for select using (true);
create policy "public_read_product_variants" on product_variants for select using (true);
create policy "public_read_product_tags" on product_tags for select using (true);
create policy "public_read_product_governorates" on product_governorates for select using (true);
create policy "public_read_settings" on settings for select using (true);

-- Service role full access (used by supabaseAdmin with service_role key — bypasses RLS)
-- Note: service_role key bypasses RLS automatically, these policies are for completeness
create policy "service_all_admins" on admins using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_all_settings" on settings using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_all_brands" on brands using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_all_categories" on categories using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_all_tags" on tags using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_all_governorates" on governorates using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_all_banners" on banners using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_all_products" on products using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_all_product_images" on product_images using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_all_product_variants" on product_variants using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_all_product_tags" on product_tags using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service_all_product_governorates" on product_governorates using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

-- ================================================================
-- SEED DATA
-- ================================================================

-- Settings (single row)
insert into settings (
  whatsapp_number, facebook_url, contact_phone, working_hours,
  about_short, about_full, exchange_rate_syp
)
values (
  '+963936666950',
  'https://www.facebook.com/share/1CvRRr3Jrp/',
  '+963936666950',
  'السبت - الخميس: 9 صباحاً - 9 مساءً',
  'وجهتك الأولى لمنتجات التنظيف والعناية الأصلية في سوريا.',
  E'Elite and More شركة سورية رائدة في توزيع وبيع منتجات التنظيف والعناية المنزلية والشخصية عالية الجودة.\n\nنحن نؤمن بأن كل منزل يستحق أفضل المنتجات، ولهذا نختار بعناية براندات موثوقة ومجربة من الأسواق العالمية لتقديمها للمستهلك السوري بأسعار مناسبة.\n\nمنتجاتنا تشمل مواد التنظيف المنزلية، معطرات الجو والملابس، منتجات العناية الشخصية، ومنظفات متخصصة للمطابخ والحمامات.\n\nنسعى دائماً لتقديم تجربة تسوق مريحة وموثوقة مع خدمة توصيل لكل المحافظات السورية.',
  15000
)
on conflict do nothing;

-- Syrian governorates
insert into governorates (name, slug, shipping_cost, sort_order) values
  ('دمشق', 'damascus', 5000, 1),
  ('ريف دمشق', 'damascus-countryside', 7000, 2),
  ('حلب', 'aleppo', 8000, 3),
  ('حمص', 'homs', 7000, 4),
  ('حماة', 'hama', 7000, 5),
  ('اللاذقية', 'latakia', 8000, 6),
  ('طرطوس', 'tartus', 8000, 7),
  ('درعا', 'daraa', 7000, 8),
  ('السويداء', 'sweida', 7000, 9),
  ('القنيطرة', 'quneitra', 7000, 10),
  ('دير الزور', 'deir-ezzor', 10000, 11),
  ('الرقة', 'raqqa', 10000, 12),
  ('الحسكة', 'hasaka', 10000, 13),
  ('إدلب', 'idlib', 9000, 14)
on conflict (slug) do nothing;

-- Sample tags
insert into tags (name, slug, color, show_on_home, sort_order) values
  ('جديد', 'new', '#6B2D8A', true, 1),
  ('الأكثر مبيعاً', 'best-seller', '#D4AF37', true, 2),
  ('عرض خاص', 'sale', '#EF4444', true, 3),
  ('حصري', 'exclusive', '#4E1F66', false, 4)
on conflict (slug) do nothing;

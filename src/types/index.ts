// ========== Settings ==========
export interface SiteSettings {
  id: string;
  exchange_rate_syp: number;
  free_shipping_threshold: number | null;
  whatsapp_number: string;
  facebook_url: string;
  instagram_url: string | null;
  contact_phone: string;
  contact_address: string | null;
  working_hours: string;
  about_short: string | null;
  about_full: string | null;
  sham_cash_phone: string | null;
  sham_cash_account: string | null;
  sham_cash_barcode_url: string | null;
  sham_cash_enabled: boolean;
  site_logo_url: string | null;
  hero_banner_url: string | null;
  updated_at: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string;
  cover_url: string | null;
  has_categories: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  _count?: { products: number; categories: number };
}

export interface Category {
  id: string;
  brand_id: string;
  brand?: Brand;
  name: string;
  slug: string;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string;
  show_on_home: boolean;
  sort_order: number;
  created_at: string;
}

export interface Governorate {
  id: string;
  name: string;
  slug: string;
  shipping_cost: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  variant_type: 'size' | 'color' | 'weight' | 'scent';
  name: string;
  value: string | null;
  price_syp: number | null;
  sort_order: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  variant_id: string | null;
  sort_order: number;
  is_primary: boolean;
}

export interface ProductGovernorate {
  product_id: string;
  governorate_id: string;
  is_available: boolean;
  governorate?: Governorate;
}

export interface Product {
  id: string;
  brand_id: string;
  brand?: Brand;
  category_id: string | null;
  category?: Category;
  name: string;
  slug: string;
  description: string | null;
  price_syp: number;
  sale_enabled: boolean;
  sale_price_syp: number | null;
  stock_status: 'in_stock' | 'out_of_stock';
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  tags?: Tag[];
  governorates?: ProductGovernorate[];
}

export interface Banner {
  id: string;
  title: string | null;
  description?: string | null;
  image_url: string;
  cloudinary_public_id: string | null;
  link_url: string | null;
  link_target: 'internal' | 'external' | 'none';
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  product_slug: string;
  variant_id?: string;
  name: string;
  brand_name: string;
  brand_slug: string;
  image: string;
  price_syp: number;
  quantity: number;
  variant_label?: string;
  governorate?: string;
}

export interface CheckoutFormData {
  full_name: string;
  phone: string;
  governorate_id: string;
  governorate_name: string;
  address: string;
  notes: string;
  payment_method: 'cod' | 'sham_cash';
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductFilters {
  brand?: string;
  category?: string;
  tag?: string;
  governorate?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
  sort?: 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'name';
  page?: number;
  limit?: number;
}

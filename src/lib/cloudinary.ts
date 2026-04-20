import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Extract public_id from a Cloudinary URL and delete the image
export async function deleteCloudinaryImage(url: string): Promise<void> {
  if (!url || !url.includes('cloudinary')) return;
  try {
    const parts = url.split('/upload/');
    if (parts.length < 2) return;
    // Remove version prefix (v123456/) and file extension
    let publicId = parts[1].replace(/^v\d+\//, '').replace(/\.[^/.]+$/, '');
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error('[Cloudinary] Failed to delete image:', err);
  }
}

// Optimized image URL
export function getOptimizedUrl(url: string, width = 800, quality = 'auto'): string {
  if (!url || !url.includes('cloudinary')) return url;
  return url.replace('/upload/', `/upload/w_${width},q_${quality},f_auto/`);
}

export const CLOUDINARY_FOLDERS = {
  brands: 'elite/brands',
  products: 'elite/products',
  banners: 'elite/banners',
  settings: 'elite/settings',
};

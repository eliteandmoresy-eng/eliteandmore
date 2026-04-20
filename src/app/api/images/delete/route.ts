import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { getAuthSession } from '@/lib/getSession';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const session = await getAuthSession(request);
  if (!session) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }

  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: 'الرابط مطلوب' }, { status: 400 });
    }

    // Extract public_id from Cloudinary URL
    const parts = url.split('/upload/');
    if (parts.length < 2) {
      return NextResponse.json({ error: 'رابط غير صالح' }, { status: 400 });
    }

    const publicId = parts[1].replace(/\.[^/.]+$/, ''); // Remove extension
    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'فشل حذف الصورة' }, { status: 500 });
  }
}

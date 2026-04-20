import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAuthSession } from '@/lib/getSession';
import { deleteCloudinaryImage } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

// PUT /api/banners/[id] - Admin only
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession(request);
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { id } = params;

  try {
    const body = await request.json();

    // Fetch the existing banner to check if image changed
    const { data: existing } = await supabaseAdmin
      .from('banners')
      .select('image_url, cloudinary_public_id')
      .eq('id', id)
      .single();

    // If image_url changed, delete the old Cloudinary image
    if (existing && body.image_url && existing.image_url !== body.image_url) {
      await deleteCloudinaryImage(existing.image_url);
    }

    const { data, error } = await supabaseAdmin
      .from('banners')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'غير موجود' }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطأ في الخادم';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/banners/[id] - Admin only
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession(request);
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { id } = params;

  try {
    // Fetch image URL before deletion
    const { data: banner } = await supabaseAdmin
      .from('banners')
      .select('image_url')
      .eq('id', id)
      .single();

    if (banner?.image_url) {
      await deleteCloudinaryImage(banner.image_url);
    }

    const { error } = await supabaseAdmin.from('banners').delete().eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'خطأ في الخادم';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

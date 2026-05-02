import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    // 1. Try to add columns if they don't exist
    // Note: This is a hacky way to ensure columns exist using RPC or just checking fields
    // In a real world we'd use migrations, but for now we'll try to update a test row
    
    const { data: settings } = await supabaseAdmin.from('settings').select('*').single();
    
    if (!settings) return Response.json({ error: 'No settings found' });

    // Try to update with sham_cash_enabled to see if it works
    const { error: updateError } = await supabaseAdmin
      .from('settings')
      .update({ 
        sham_cash_enabled: settings.sham_cash_enabled ?? false 
      })
      .eq('id', settings.id);

    if (updateError && updateError.message.includes('column "sham_cash_enabled" does not exist')) {
      return Response.json({ 
        error: 'Column missing', 
        sql: 'ALTER TABLE settings ADD COLUMN sham_cash_enabled BOOLEAN DEFAULT false; ALTER TABLE settings ADD COLUMN sham_cash_phone TEXT; ALTER TABLE settings ADD COLUMN sham_cash_account TEXT; ALTER TABLE settings ADD COLUMN sham_cash_barcode_url TEXT;'
      });
    }

    return Response.json({ 
      status: 'success', 
      message: 'Columns verified or already exist',
      data: settings
    });
  } catch (err: any) {
    return Response.json({ error: err.message });
  }
}

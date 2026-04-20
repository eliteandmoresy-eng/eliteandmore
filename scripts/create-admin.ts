/**
 * Creates the initial admin user in the database.
 * Usage: npx ts-node --project tsconfig.json scripts/create-admin.ts
 *
 * Make sure .env.local is set up correctly before running.
 */

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// Load env manually for script context
const envPath = require('path').resolve(process.cwd(), '.env.local');
require('dotenv').config({ path: envPath });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceKey);

async function createAdmin() {
  const email = process.env.INITIAL_ADMIN_EMAIL || 'admin@eliteandmore.sy';
  const password = process.env.INITIAL_ADMIN_PASSWORD || 'ChangeMe_2026!';
  const name = 'Admin';

  console.log(`Creating admin: ${email}`);

  const passwordHash = await bcrypt.hash(password, 12);

  const { data, error } = await supabaseAdmin
    .from('admins')
    .upsert(
      { name, email, password_hash: passwordHash },
      { onConflict: 'email' }
    )
    .select('id, email, name')
    .single();

  if (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }

  console.log(`✅ Admin created: ${data.email} (id: ${data.id})`);
  console.log(`\n⚠️  Change the password after first login!`);
}

createAdmin().catch(console.error);

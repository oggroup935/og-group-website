// Supabase browser client for the SEPARATE `og-group` project.
//
// ⚠️ Use a dedicated Supabase project named `og-group`. Do NOT mix it with the
// existing app's project/database (separate tables, auth, and policies).
//
// Setup:
//   1) Create the `og-group` project at https://supabase.com
//   2) Run supabase/schema.sql in the project's SQL editor
//   3) Copy the project URL + anon key into .env.local (see .env.local.example)
//   4) Forms in lib/leads.ts will start writing automatically.
//
// If the env vars are absent, `supabase` is null and lib/leads.ts falls back to
// a simulated submission so the UI still works in dev/preview.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;

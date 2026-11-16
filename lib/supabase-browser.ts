"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/** Browser client for the admin dashboard. The publishable key is safe in the browser: row-level security decides what each user can see. */
export function supabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  if (!client) client = createClient(url, key, { auth: { persistSession: true, storageKey: "midad-admin" } });
  return client;
}

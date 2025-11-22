// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "[Supabase] Variáveis de ambiente faltando. Verifique VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY na Vercel."
  );
}

export const supabase = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string
);

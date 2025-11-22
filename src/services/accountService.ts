// src/services/accountService.ts
import { supabase } from "../lib/supabaseClient";
import type { Account } from "../types";

export async function getAccounts(userId: string): Promise<Account[]> {
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createAccount(userId: string, payload: {
  name: string;
  type: string;
  initial_balance: number;
}) {
  const { data, error } = await supabase
    .from("accounts")
    .insert({
      user_id: userId,
      ...payload,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Account;
}

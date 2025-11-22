// src/services/dashboardService.ts
import { supabase } from "../lib/supabaseClient";
import type { Account, Budget, Reminder } from "../types";
import type { Transaction } from "../types/transaction";

export async function getAccounts(userId: string): Promise<Account[]> {
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data ?? [];
}

export async function getTransactionsDoMes(
  userId: string,
  mesISO: string // ex: "2025-11"
): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .gte("date", `${mesISO}-01`)
    .lte("date", `${mesISO}-31`);

  if (error) throw error;
  return data ?? [];
}

export async function getBudgets(
  userId: string,
  mesISO: string
): Promise<Budget[]> {
  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", userId)
    .eq("month", mesISO); // ajuste se o campo tiver outro nome

  if (error) throw error;
  return data ?? [];
}

export async function getReminders(userId: string): Promise<Reminder[]> {
  const { data, error } = await supabase
    .from("reminders")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data ?? [];
}

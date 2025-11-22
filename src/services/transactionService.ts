// src/services/transactionService.ts
import { supabase } from "../lib/supabaseClient";
import type { Transaction } from "../types";

export async function getTransactions(userId: string): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createTransaction(
  userId: string,
  payload: {
    amount: number;
    type: "income" | "expense";
    date: string;
    description?: string;
  }
): Promise<Transaction> {
  const { data, error } = await supabase
    .from("transactions")
    .insert({
      user_id: userId,
      ...payload,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Transaction;
}

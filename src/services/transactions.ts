// src/services/transactions.ts
import { supabase } from "../lib/supabaseClient";
import type { Transaction } from "../types/transaction";

// Dados que a tela precisa enviar para criar uma nova transação
export type NewTransactionInput = {
  account_id: string;
  category_id: string;
  type: "expense" | "income";
  amount: number;
  date: string; // "2025-11-21"
  description?: string | null;
};

// Função para criar uma transação no Supabase
export async function createTransaction(
  input: NewTransactionInput,
  userId: string
): Promise<Transaction> {
  const { data, error } = await supabase
    .from("transactions")
    .insert({
      user_id: userId,
      account_id: input.account_id,
      category_id: input.category_id,
      type: input.type,
      amount: input.amount,
      date: input.date,
      description: input.description ?? null,
    })
    .select("*")
    .single();

  if (error) {
    console.error("Erro ao criar transação:", error);
    throw error;
  }

  // o Supabase devolve um objeto com os campos da tabela
  return data as Transaction;
}

// (Opcional) Função para listar transações do usuário logado
export async function listTransactions(userId: string): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) {
    console.error("Erro ao listar transações:", error);
    throw error;
  }

  return (data ?? []) as Transaction[];
}

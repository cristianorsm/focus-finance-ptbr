// src/types/transaction.ts

export interface Transaction {
  id: string;
  user_id: string;
  account_id: string;
  category_id: string;
  type: "expense" | "income";
  amount: number;
  date: string; // formato "2025-11-21"
  description: string | null;
  created_at: string;
}

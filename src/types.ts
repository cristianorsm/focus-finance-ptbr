// src/types.ts
export interface Account {
  id: string;
  user_id: string;
  name: string;
  type: string;
  initial_balance: number;
  created_at: string;
}

export interface Budget {
  id: string;
  user_id: string;
  category_id: string;
  amount: number; // limite do orçamento
  month: string; // ex: "2025-11"
  created_at?: string;
}

export interface Reminder {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  due_date: string; // data do lembrete
  done?: boolean;
  created_at?: string;
}

// src/types.ts
export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: "income" | "expense";
  date: string;          // ISO
  description: string | null;
  created_at: string;
}

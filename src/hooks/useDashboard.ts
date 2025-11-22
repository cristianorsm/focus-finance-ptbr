// src/hooks/useDashboard.ts
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getAccounts,
  getTransactionsDoMes,
  getBudgets,
  getReminders,
} from "../services/dashboardService";
import type { Account, Budget, Reminder } from "../types";
import type { Transaction } from "../types/transaction";

function formatCurrencyBRL(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// === Funções de cálculo ===
function calcularSaldo(accounts: Account[], transactions: Transaction[]) {
  // Exemplo: saldo das contas + fluxo do mês
  const saldoContas = accounts.reduce(
    (acc, conta) => acc + (conta.balance ?? 0),
    0
  );

  const deltaTransacoes = transactions.reduce((acc, t) => {
    if (t.type === "income") return acc + t.amount;
    if (t.type === "expense") return acc - t.amount;
    return acc;
  }, 0);

  return saldoContas + deltaTransacoes;
}

function calcularOrcamentoCategoria(
  budgets: Budget[],
  transactions: Transaction[],
  categoriaId: string
) {
  const budget = budgets.find((b) => b.category_id === categoriaId);
  const limite = budget?.amount ?? 0;

  const gasto = transactions
    .filter(
      (t) => t.category_id === categoriaId && t.type === "expense"
    )
    .reduce((acc, t) => acc + t.amount, 0);

  const restante = limite - gasto;
  const porcentagem = limite > 0 ? (gasto / limite) * 100 : 0;

  return { limite, gasto, restante, porcentagem };
}

// === Hook principal ===
export function useDashboard(mesAtualISO: string) {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    let isMounted = true;

    async function carregar() {
      try {
        setLoading(true);
        setError(null);

        const [accs, trans, buds, rems] = await Promise.all([
          getAccounts(user.id),
          getTransactionsDoMes(user.id, mesAtualISO),
          getBudgets(user.id, mesAtualISO),
          getReminders(user.id),
        ]);

        if (!isMounted) return;

        setAccounts(accs);
        setTransactions(trans);
        setBudgets(buds);
        setReminders(rems);
      } catch (err: any) {
        if (!isMounted) return;
        console.error(err);
        setError(err.message ?? "Erro ao carregar dashboard");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    carregar();

    return () => {
      isMounted = false;
    };
  }, [user, mesAtualISO]);

  const saldo = useMemo(
    () => calcularSaldo(accounts, transactions),
    [accounts, transactions]
  );

  const saldoFormatado = useMemo(
    () => formatCurrencyBRL(saldo),
    [saldo]
  );

  // Exemplo de função exposta pra usar em cards de categoria
  function getOrcamentoCategoria(categoriaId: string) {
    return calcularOrcamentoCategoria(
      budgets,
      transactions,
      categoriaId
    );
  }

  return {
    loading,
    error,
    accounts,
    transactions,
    budgets,
    reminders,
    saldo,
    saldoFormatado,
    getOrcamentoCategoria,
  };
}

// src/screens/TransactionsScreen.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getTransactions } from "../services/transactionService";
import type { Transaction } from "../types";

function SecaoTitulo({ titulo, subtitulo }: { titulo: string; subtitulo?: string }) {
  return (
    <div className="flex items-center justify-between mb-1">
      <h3 className="text-[11px] font-semibold text-slate-700">{titulo}</h3>
      {subtitulo && (
        <button className="text-[10px] text-emerald-600 font-medium">
          {subtitulo}
        </button>
      )}
    </div>
  );
}

function Cartao({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "w-full rounded-2xl bg-white shadow-sm px-3 py-2 mb-2 border border-emerald-50 " +
        className
      }
    >
      {children}
    </div>
  );
}

export default function TransactionsScreen() {
  const { user } = useAuth();
  const [transacoes, setTransacoes] = useState<Transaction[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      if (!user) return;
      try {
        setCarregando(true);
        setErro("");
        const data = await getTransactions(user.id);
        setTransacoes(data);
      } catch (e: any) {
        console.error(e);
        setErro("Erro ao carregar transações.");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [user]);

  function formatarValor(t: Transaction) {
    const sinal = t.type === "income" ? "+" : "-";
    const valor = t.amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return `${sinal} ${valor}`;
  }

  function formatarData(iso: string) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("pt-BR");
  }

  return (
    <div className="space-y-3 pb-4">
      <SecaoTitulo titulo="Transações" subtitulo="Filtros (futuro)" />
      <Cartao>
        <p className="text-[10px] text-slate-500 mb-2">
          Histórico de transações
        </p>

        {carregando && (
          <p className="text-[11px] text-slate-500">Carregando...</p>
        )}

        {erro && (
          <p className="text-[11px] text-red-600 mb-2">{erro}</p>
        )}

        {!carregando && !erro && transacoes.length === 0 && (
          <p className="text-[11px] text-slate-500">
            Nenhuma transação cadastrada ainda.
          </p>
        )}

        <div className="space-y-1 mt-1 max-height-72 overflow-y-auto">
          {transacoes.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between rounded-xl bg-emerald-50/40 px-2 py-[6px]"
            >
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-800">
                  {tx.description || (tx.type === "income" ? "Receita" : "Despesa")}
                </span>
                <span className="text-[10px] text-slate-500">
                  {formatarData(tx.date)}
                </span>
              </div>
              <span
                className={
                  "text-[11px] font-medium " +
                  (tx.type === "income" ? "text-emerald-700" : "text-slate-700")
                }
              >
                {formatarValor(tx)}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-1 text-[9px] text-slate-400">
          Filtros por data, categoria, valor e conta podem ser adicionados na
          próxima versão.
        </p>
      </Cartao>
    </div>
  );
}

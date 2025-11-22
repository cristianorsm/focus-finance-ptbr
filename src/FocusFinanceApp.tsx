import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";

import HomeScreen from "./screens/HomeScreen";
import BudgetScreen from "./screens/BudgetScreen";
import TransactionsScreen from "./screens/TransactionsScreen";
import RemindersScreen from "./screens/RemindersScreen";

import LogSpendFlow from "./screens/flows/LogSpendFlow";
import SetBillFlow from "./screens/flows/SetBillFlow";
import RecurringFlow from "./screens/flows/RecurringFlow";
import ReviewFlow from "./screens/flows/ReviewFlow";
import CelebrateFlow from "./screens/flows/CelebrateFlow";

/**
 * Este arquivo controla a navegação principal do app:
 * - Abas inferiores
 * - Fluxos do topo ("Registrar gasto", "Conta fixa", etc.)
 * - Moldura de celular e “Tela principal”
 */

export default function FocusFinanceApp() {
  const { user } = useAuth();

  const [aba, setAba] = useState<"home" | "budget" | "transactions" | "reminders">("home");
  const [flow, setFlow] = useState<
    "none" | "logSpend" | "setBill" | "recurring" | "review" | "celebrate"
  >("none");

  // Se não estiver logado, só o AuthProvider resolve isso
  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* Moldura */}
      <div className="relative w-[360px] h-[720px] bg-emerald-50 rounded-[40px] shadow-xl overflow-hidden border border-emerald-100 flex flex-col">

        {/* Seção do fluxo */}
        {flow !== "none" ? (
          <FlowContainer flow={flow} onClose={() => setFlow("none")} />
        ) : (
          <>
            <Header onOpenFlow={setFlow} />
            <main className="flex-1 overflow-y-auto px-4 pb-4">
              {aba === "home" && <HomeScreen onOpenFlow={setFlow} />}
              {aba === "budget" && <BudgetScreen />}
              {aba === "transactions" && <TransactionsScreen />}
              {aba === "reminders" && <RemindersScreen />}
            </main>
            <BottomNav aba={aba} onChange={setAba} />
          </>
        )}

      </div>
    </div>
  );
}

/* ------- Header -------- */
function Header({ onOpenFlow }: { onOpenFlow: (f: any) => void }) {
  return (
    <header className="pt-6 pb-3 px-4 bg-emerald-50 flex items-center justify-between">
      <div>
        <p className="text-[10px] uppercase tracking-[0.16em] text-emerald-600 font-semibold">
          Focus Finance
        </p>
        <h2 className="text-sm font-semibold text-slate-900">Painel geral</h2>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onOpenFlow("logSpend")}
          className="h-7 w-7 rounded-full bg-white shadow flex items-center justify-center text-emerald-500 text-lg leading-none"
        >
          +
        </button>
      </div>
    </header>
  );
}

/* ------- Navegação inferior -------- */
function BottomNav({
  aba,
  onChange,
}: {
  aba: string;
  onChange: (a: any) => void;
}) {
  const nav = [
    { id: "home", label: "Início" },
    { id: "budget", label: "Orçamento" },
    { id: "transactions", label: "Transações" },
    { id: "reminders", label: "Lembretes" },
  ];

  return (
    <nav className="h-14 bg-white border-t border-emerald-100 flex items-center justify-around">
      {nav.map((n) => (
        <button
          key={n.id}
          onClick={() => onChange(n.id)}
          className={
            "flex flex-col items-center justify-center px-2 " +
            (aba === n.id ? "text-emerald-600" : "text-slate-400")
          }
        >
          <span
            className={
              "text-[10px] font-medium " +
              (aba === n.id ? "bg-emerald-50 px-3 py-[4px] rounded-full" : "")
            }
          >
            {n.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

/* ------- container de fluxo ------- */
function FlowContainer({
  flow,
  onClose,
}: {
  flow: string;
  onClose: () => void;
}) {
  const map: any = {
    logSpend: <LogSpendFlow onClose={onClose} />,
    setBill: <SetBillFlow onClose={onClose} />,
    recurring: <RecurringFlow onClose={onClose} />,
    review: <ReviewFlow onClose={onClose} />,
    celebrate: <CelebrateFlow onClose={onClose} />,
  };

  return <div className="flex-1 overflow-y-auto">{map[flow]}</div>;
}

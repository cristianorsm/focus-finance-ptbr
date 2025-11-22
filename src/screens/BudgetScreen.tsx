// src/screens/BudgetScreen.tsx
function SecaoTitulo({ titulo }: { titulo: string }) {
  return (
    <div className="flex items-center justify-between mb-1">
      <h3 className="text-[11px] font-semibold text-slate-700">{titulo}</h3>
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

export default function BudgetScreen() {
  const categorias = [
    { nome: "Mercado", usado: 320, total: 600 },
    { nome: "Comer fora", usado: 180, total: 400 },
    { nome: "Transporte", usado: 90, total: 250 },
    { nome: "Saúde & bem-estar", usado: 60, total: 300 },
  ];

  return (
    <div className="space-y-3 pb-4">
      <SecaoTitulo titulo="Orçamento" />

      <Cartao>
        <p className="text-[11px] text-slate-500">
          Total mensal • Restante (exemplo)
        </p>
        <p className="text-base font-semibold text-slate-900">
          R$ 4.000,00 • Restam R$ 2.350,00
        </p>
      </Cartao>

      {categorias.map((c) => {
        const pct = Math.min(100, Math.round((c.usado / c.total) * 100));
        return (
          <Cartao key={c.nome}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-slate-800">{c.nome}</span>
              <span className="text-[11px] text-slate-600">
                R$ {c.usado} de R$ {c.total}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-emerald-50 overflow-hidden">
              <div
                className="h-2 bg-emerald-400 rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
          </Cartao>
        );
      })}

      <button className="w-full py-2 text-[11px] font-medium rounded-2xl bg-white border border-emerald-100 shadow-sm text-emerald-700">
        Adicionar categoria (futuro)
      </button>
    </div>
  );
}

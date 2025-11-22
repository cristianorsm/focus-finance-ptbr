// src/screens/RemindersScreen.tsx
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

function LinhaSimples({ titulo, descricao }: { titulo: string; descricao?: string }) {
  return (
    <div className="flex items-center justify-between py-[6px]">
      <div>
        <p className="text-[11px] text-slate-800">{titulo}</p>
        {descricao && (
          <p className="text-[10px] text-slate-500">{descricao}</p>
        )}
      </div>
      <span className="text-[10px] text-slate-400">›</span>
    </div>
  );
}

export default function RemindersScreen() {
  return (
    <div className="space-y-3 pb-4">
      <SecaoTitulo titulo="Lembretes" />

      <Cartao>
        <LinhaSimples
          titulo="Próximo vencimento"
          descricao="Conta de luz em 3 dias"
        />
      </Cartao>

      <Cartao>
        <LinhaSimples
          titulo="Notificar 2 dias antes"
          descricao="Padrão para novas contas"
        />
        <LinhaSimples
          titulo="Empurrões positivos"
          descricao="Lembrar no dia do salário"
        />
      </Cartao>

      <button className="w-full py-2 text-[11px] font-medium rounded-2xl bg-white border border-emerald-100 shadow-sm text-emerald-700">
        Criar novo lembrete (futuro)
      </button>
    </div>
  );
}

export default function RecurringFlow({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-4">
      <button onClick={onClose} className="text-[10px] text-emerald-600 mb-3">
        ← Voltar
      </button>

      <h3 className="text-[12px] font-semibold text-slate-700 mb-2">
        Recorrência
      </h3>

      <p className="text-[11px] text-slate-600">
        Aqui você poderá configurar gastos ou receitas automáticas.
        (Funcionalidade futura com Supabase)
      </p>
    </div>
  );
}

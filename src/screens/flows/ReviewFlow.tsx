export default function ReviewFlow({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-4">
      <button onClick={onClose} className="text-[10px] text-emerald-600 mb-3">
        ← Voltar
      </button>

      <h3 className="text-[12px] font-semibold text-slate-700 mb-2">
        Revisar recorrência
      </h3>

      <p className="text-[11px] text-slate-600">
        Tela de revisão de transações recorrentes.
      </p>
    </div>
  );
}

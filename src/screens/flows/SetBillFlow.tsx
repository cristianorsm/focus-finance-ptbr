export default function SetBillFlow({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-4">
      <button onClick={onClose} className="text-[10px] text-emerald-600 mb-3">
        ← Voltar
      </button>

      <h3 className="text-[12px] font-semibold text-slate-700 mb-2">
        Cadastro de conta fixa
      </h3>

      <p className="text-[11px] text-slate-600">
        Aqui você poderá cadastrar contas recorrentes como luz, água, internet…
        (Funcionalidade será conectada ao Supabase depois)
      </p>
    </div>
  );
}

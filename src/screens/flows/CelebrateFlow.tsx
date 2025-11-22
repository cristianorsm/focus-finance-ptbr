export default function CelebrateFlow({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-4 text-center">
      <button onClick={onClose} className="text-[10px] text-emerald-600 mb-3">
        ← Voltar
      </button>

      <h3 className="text-[12px] font-semibold text-emerald-700 mb-2">
        Parabéns! 🎉
      </h3>

      <p className="text-[11px] text-slate-700">
        Você está mantendo uma evolução excelente nos gastos!
      </p>
    </div>
  );
}

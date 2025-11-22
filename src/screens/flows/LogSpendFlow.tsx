import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { createTransaction } from "../../services/transactionService";


function SecaoTitulo({ titulo }: { titulo: string }) {
  return (
    <h3 className="text-[12px] font-semibold text-slate-700 mb-2">
      {titulo}
    </h3>
  );
}

function Cartao({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-3 mb-2">
      {children}
    </div>
  );
}

function Botao({
  label,
  onClick,
  tipo = "primary",
}: {
  label: string;
  onClick?: () => void;
  tipo?: "primary" | "secondary";
}) {
  return (
    <button
      onClick={onClick}
      className={
        "w-full text-[11px] font-semibold py-2 rounded-2xl mt-2 " +
        (tipo === "primary"
          ? "bg-emerald-500 text-slate-900 hover:bg-emerald-400"
          : "bg-white border border-emerald-100 text-emerald-700 hover:bg-emerald-50")
      }
    >
      {label}
    </button>
  );
}

export default function LogSpendFlow({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();

  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));
  const [tipo, setTipo] = useState<"expense" | "income">("expense");

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");

  async function salvar() {
    try {
      setErro("");
      setOk("");

      if (!user) {
        setErro("Usuário não autenticado.");
        return;
      }

      if (!valor.trim()) {
        setErro("Informe o valor.");
        return;
      }

      const limpo = valor
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".")
        .trim();

      const num = Number(limpo);

      if (isNaN(num) || num <= 0) {
        setErro("Valor inválido.");
        return;
      }

      setLoading(true);

      await createTransaction(user.id, {
        amount: num,
        description: descricao,
        date: data,
        type: tipo,
      });

      setOk("Transação salva com sucesso!");
      setValor("");
      setDescricao("");

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (e: any) {
      setErro(e.message ?? "Erro ao salvar transação");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 space-y-3">
      <button onClick={onClose} className="text-[10px] text-emerald-600 mb-1">
        ← Voltar
      </button>

      <SecaoTitulo titulo="Registrar gasto" />

      <Cartao>
        {/* Valor */}
        <div className="flex justify-between items-center py-2 border-b border-emerald-50">
          <span className="text-[10px] text-slate-500">Valor</span>
          <input
            className="text-[11px] text-right bg-transparent outline-none text-slate-800"
            placeholder="R$ 0,00"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>

        {/* Tipo */}
        <div className="flex justify-between items-center py-2 border-b border-emerald-50">
          <span className="text-[10px] text-slate-500">Tipo</span>
          <select
            className="text-[11px] text-slate-800 bg-transparent outline-none"
            value={tipo}
            onChange={(e) =>
              setTipo(e.target.value as "expense" | "income")
            }
          >
            <option value="expense">Despesa</option>
            <option value="income">Receita</option>
          </select>
        </div>

        {/* Data */}
        <div className="flex justify-between items-center py-2 border-b border-emerald-50">
          <span className="text-[10px] text-slate-500">Data</span>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="text-[11px] text-slate-800 bg-transparent outline-none"
          />
        </div>

        {/* Descrição */}
        <div className="flex justify-between items-center py-2">
          <span className="text-[10px] text-slate-500">Descrição</span>
          <input
            className="text-[11px] text-right bg-transparent outline-none text-slate-800"
            placeholder="ex.: Mercado"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        {/* Mensagens */}
        {erro && <p className="text-[10px] text-red-600">{erro}</p>}
        {ok && <p className="text-[10px] text-emerald-600">{ok}</p>}

        <Botao label={loading ? "Salvando..." : "Salvar"} onClick={salvar} />
      </Cartao>
    </div>
  );
}

// src/screens/HomeScreen.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getTransactions } from "../services/transactionService";
import type { Transaction } from "../types";

interface HomeScreenProps {
  onOpenFlow: (flow: "logSpend" | "setBill" | "recurring" | "review" | "celebrate") => void;
}

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

export default function HomeScreen({ onOpenFlow }: HomeScreenProps) {
  const { user } = useAuth();
  const [transacoes, setTransacoes] = useState<Transaction[]>([]);
  const [carregandoTx, setCarregandoTx] = useState(true);

  useEffect(() => {
    async function carregar() {
      if (!user) return;
      try {
        setCarregandoTx(true);
        const data = await getTransactions(user.id);
        setTransacoes(data.slice(0, 5)); // últimas 5
      } catch (e) {
        console.error(e);
      } finally {
        setCarregandoTx(false);
      }
    }
    carregar();
  }, [user]);

  // Por enquanto, saldo e orçamentos são mockados
  const saldoDisponivel = 2350;

  return (
    <div className="space-y-3 pb-4">
      {/* Saldo + orçamentos */}
      <section>
        <SecaoTitulo titulo="Home (Painel)" />
        <Cartao>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-500">
                Saldo + disponível neste mês
              </p>
              <p className="text-base font-semibold text-slate-900">
                {saldoDisponivel.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
            <button className="px-2 py-1 text-[10px] rounded-full bg-emerald-100 text-emerald-700 font-medium">
              Ver orçamento
            </button>
          </div>
        </Cartao>

        <div className="grid grid-cols-2 gap-2">
          <Cartao>
            <p className="text-[10px] text-slate-500">Orçamento • Mercado</p>
            <p className="text-[11px] font-semibold text-slate-800">
              R$ 320 de R$ 600
            </p>
          </Cartao>
          <Cartao>
            <p className="text-[10px] text-slate-500">
              Orçamento • Comer fora
            </p>
            <p className="text-[11px] font-semibold text-slate-800">
              R$ 180 de R$ 400
            </p>
          </Cartao>
          <Cartao>
            <p className="text-[10px] text-slate-500">Orçamento • Transporte</p>
            <p className="text-[11px] font-semibold text-slate-800">
              R$ 90 de R$ 250
            </p>
          </Cartao>
          <Cartao>
            <p className="text-[10px] text-slate-500">
              Orçamento • Saúde &amp; bem-estar
            </p>
            <p className="text-[11px] font-semibold text-slate-800">
              R$ 60 de R$ 300
            </p>
          </Cartao>
        </div>

        <Cartao className="bg-emerald-100/70 border-emerald-100">
          <p className="text-[10px] font-medium text-emerald-900">
            Você economizou R$ 50 na última semana. 🎉
          </p>
        </Cartao>
      </section>

      {/* Ações rápidas */}
      <section>
        <SecaoTitulo titulo="Ações rápidas" subtitulo="Editar" />
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpenFlow("logSpend")}
            className="text-[11px] font-medium rounded-2xl bg-white shadow-sm border border-emerald-50 px-3 py-2 text-left hover:bg-emerald-50"
          >
            Registrar gasto
          </button>
          <button
            onClick={() => onOpenFlow("setBill")}
            className="text-[11px] font-medium rounded-2xl bg-white shadow-sm border border-emerald-50 px-3 py-2 text-left hover:bg-emerald-50"
          >
            Conta fixa
          </button>
          <button
            onClick={() => onOpenFlow("recurring")}
            className="text-[11px] font-medium rounded-2xl bg-white shadow-sm border border-emerald-50 px-3 py-2 text-left hover:bg-emerald-50"
          >
            Recorrente
          </button>
          <button className="text-[11px] font-medium rounded-2xl bg-white shadow-sm border border-emerald-50 px-3 py-2 text-left hover:bg-emerald-50">
            Novo objetivo
          </button>
        </div>
      </section>

      {/* Transações recentes - reais */}
      <section>
        <SecaoTitulo titulo="Transações recentes" subtitulo="Ver todas" />
        <Cartao>
          {carregandoTx ? (
            <p className="text-[11px] text-slate-500">Carregando...</p>
          ) : transacoes.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              Nenhuma transação cadastrada ainda.
            </p>
          ) : (
            <div className="space-y-[2px] mt-1">
              {transacoes.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-xl bg-emerald-50/40 px-2 py-[6px]"
                >
                  <div className="flex flex-col">
                    <span className="text-[11px] text-slate-800">
                      {t.description || (t.type === "income" ? "Receita" : "Despesa")}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(t.date).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <span
                    className={
                      "text-[11px] font-medium " +
                      (t.type === "income" ? "text-emerald-700" : "text-slate-700")
                    }
                  >
                    {(t.type === "income" ? "+ " : "- ") +
                      t.amount.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Cartao>
      </section>

      {/* Lembretes (mock por enquanto) */}
      <section>
        <SecaoTitulo titulo="Lembretes" subtitulo="Gerenciar" />
        <Cartao>
          <LinhaSimples
            titulo="Conta de luz"
            descricao="Vence em 3 dias"
          />
          <LinhaSimples
            titulo="Internet"
            descricao="Vence em 7 dias"
          />
        </Cartao>
      </section>

      {/* Recorrências e sequência (mock) */}
      <section>
        <SecaoTitulo
          titulo="Recorrências • Revisar & confirmar"
        />
        <Cartao>
          <LinhaSimples
            titulo="Assinatura Netflix"
            descricao="Todo mês • R$ 55,00"
          />
          <button
            onClick={() => onOpenFlow("review")}
            className="mt-2 w-full text-[11px] font-medium text-emerald-700"
          >
            Revisar detalhe da recorrência
          </button>
        </Cartao>
      </section>

      <section>
        <SecaoTitulo titulo="Celebre sua sequência" />
        <Cartao>
          <p className="text-[11px] text-slate-700 mb-1">
            Você está em uma sequência de 3 semanas gastando menos do que a média. Continue assim! 💪
          </p>
          <button
            onClick={() => onOpenFlow("celebrate")}
            className="mt-1 px-3 py-1 rounded-full bg-emerald-500 text-[11px] font-semibold text-slate-900 shadow hover:bg-emerald-400"
          >
            Ver detalhes da sequência
          </button>
        </Cartao>
      </section>
    </div>
  );
}

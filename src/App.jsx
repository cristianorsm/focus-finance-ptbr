
import React, { useMemo, useState } from "react";

/**
 * Focus Finance — Protótipo em React + Tailwind (pt‑BR)
 * Telas: Início, Lançar gasto, Orçamento, Transações, Lembretes,
 * Definir conta, Recorrência, Revisar & Confirmar
 */

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 ${className}`}>{children}</div>
);

const SectionTitle = ({ children, right }) => (
  <div className="flex items-center justify-between px-4 pt-4 pb-2">
    <h3 className="text-slate-800 font-semibold tracking-tight">{children}</h3>
    {right}
  </div>
);

const Row = ({ children, className = "" }) => (
  <div className={`px-4 py-3 flex items-center justify-between ${className}`}>{children}</div>
);

const Chip = ({ children, intent = "default" }) => {
  const styles = {
    default: "bg-slate-100 text-slate-700",
    green: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
    gray: "bg-slate-50 text-slate-600 ring-1 ring-slate-100",
    blue: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
  }[intent];
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full ${styles}`}>{children}</span>
  );
};

const Progress = ({ value }) => (
  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
    <div
      className="h-2 bg-emerald-500 rounded-full transition-all"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

const SCREENS = {
  HOME: "HOME",
  LOG: "LOG",
  BUDGET: "BUDGET",
  TX: "TX",
  REMIND: "REMIND",
  BILL: "BILL",
  RECUR: "RECUR",
  REVIEW: "REVIEW",
};

const budgetChips = [
  { id: "groceries", title: "Mercado", spent: 180, limit: 400 },
  { id: "eatingout", title: "Refeições fora", spent: 92, limit: 250 },
  { id: "transport", title: "Transporte", spent: 60, limit: 150 },
  { id: "health", title: "Saúde", spent: 40, limit: 200 },
];

const txRecent = [
  { id: 1, label: "Mercado Fresh", amt: -32.4, tag: "Esta semana" },
  { id: 2, label: "Cartão Metro", amt: -15, tag: "Esta semana" },
  { id: 3, label: "Salário", amt: 1800, tag: "Este mês" },
];

function HomeDashboard({ onGo }) {
  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between px-1">
        <h1 className="text-lg font-semibold text-slate-800">Focus Finance</h1>
        <div className="flex gap-2 text-slate-500">
          <button className="p-2 hover:text-slate-700" aria-label="Sincronizar">⟳</button>
          <button className="p-2 hover:text-slate-700" aria-label="Perfil">🙂</button>
        </div>
      </header>

      <Card>
        <Row className="items-start gap-3">
          <div>
            <div className="text-sm text-slate-600">Saldo + Disponível este mês</div>
            <div className="text-2xl font-semibold text-slate-900">R$ 2.480,00</div>
          </div>
          <button
            onClick={() => onGo(SCREENS.BUDGET)}
            className="ml-auto text-xs px-2.5 py-1 rounded-full bg-slate-50 text-slate-700 hover:bg-slate-100"
          >
            Toque para abrir Orçamento
          </button>
        </Row>

        <div className="grid grid-cols-2 gap-3 px-4 pb-4">
          {budgetChips.map((b) => {
            const pct = Math.round((b.spent / b.limit) * 100);
            return (
              <div key={b.id} className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-600 flex items-center justify-between">
                  <span>{b.title}</span>
                  <span className="font-medium text-slate-700">R$ {b.spent.toFixed(0)}</span>
                </div>
                <div className="mt-2">
                  <Progress value={pct} />
                </div>
              </div>
            );
          })}
        </div>

        <Row>
          <div className="text-sm text-slate-600">
            <strong className="text-slate-800">Afirmação:</strong> Você economizou R$ 50 na última semana.
          </div>
          <Chip intent="gray">Informativo</Chip>
        </Row>
      </Card>

      <Card>
        <SectionTitle right={<button className="text-sm text-emerald-700" onClick={() => onGo(SCREENS.HOME)}>Editar</button>}>
          Ações rápidas
        </SectionTitle>
        <div className="grid grid-cols-2 gap-3 px-4 pb-4">
          <button onClick={() => onGo(SCREENS.LOG)} className="btn-soft">Lançar gasto</button>
          <button onClick={() => onGo(SCREENS.BILL)} className="btn-soft">Definir conta</button>
          <button onClick={() => onGo(SCREENS.RECUR)} className="btn-soft">Recorrência</button>
          <button onClick={() => onGo(SCREENS.BUDGET)} className="btn-soft">Nova meta</button>
        </div>
      </Card>

      <Card>
        <SectionTitle right={<button onClick={() => onGo(SCREENS.TX)} className="text-sm text-emerald-700">Ver tudo</button>}>
          Transações recentes
        </SectionTitle>
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto">
          <Chip intent="gray">Esta semana</Chip>
          <Chip intent="gray">Mercado</Chip>
          <Chip intent="gray">Acima de R$ 20</Chip>
        </div>
        <div className="divide-y">
          {txRecent.map((t) => (
            <Row key={t.id}>
              <div className="text-slate-700">{t.label}</div>
              <div className={`font-medium ${t.amt < 0 ? "text-slate-700" : "text-emerald-600"}`}>
                {t.amt < 0 ? "-" : "+"} R$ {Math.abs(t.amt).toFixed(2)}
              </div>
            </Row>
          ))}
        </div>
        <Row>
          <button onClick={() => onGo(SCREENS.TX)} className="text-sm text-emerald-700">Adicionar transação</button>
        </Row>
      </Card>
    </div>
  );
}

function LogSpend({ onBack, onNext }) {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Refeições fora");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const canSave = amount > 0;

  return (
    <div className="space-y-4">
      <header className="px-1 flex items-center gap-3">
        <button onClick={onBack} className="p-2">←</button>
        <h2 className="text-lg font-semibold text-slate-800">Lançar gasto</h2>
      </header>

      <Card>
        <SectionTitle>Próximo passo</SectionTitle>
        <div className="px-4 pb-4 space-y-3">
          <label className="block">
            <div className="text-xs text-slate-500 mb-1">Valor</div>
            <input type="number" min="0" value={amount} onChange={(e)=>setAmount(parseFloat(e.target.value||"0"))} className="input" />
          </label>
          <label className="block">
            <div className="text-xs text-slate-500 mb-1">Categoria</div>
            <select value={category} onChange={(e)=>setCategory(e.target.value)} className="input">
              <option>Refeições fora</option>
              <option>Mercado</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label className="block">
            <div className="text-xs text-slate-500 mb-1">Data</div>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="input" />
          </label>
          <label className="block">
            <div className="text-xs text-slate-500 mb-1">Pagamento</div>
            <select className="input">
              <option>Cartão</option>
              <option>Dinheiro</option>
              <option>Conta bancária</option>
            </select>
          </label>
          <label className="block">
            <div className="text-xs text-slate-500 mb-1">Nota</div>
            <input placeholder="Ex.: Almoço com Sam" className="input" />
          </label>
        </div>
        <div className="px-4 pb-4 grid grid-cols-2 gap-3">
          <button disabled={!canSave} onClick={onNext} className="btn-primary disabled:opacity-50">Salvar despesa</button>
          <button onClick={onBack} className="btn-outline">Salvar & comemorar</button>
        </div>
      </Card>
    </div>
  );
}

function BudgetOverview({ onBack }) {
  return (
    <div className="space-y-4">
      <header className="px-1 flex items-center gap-3">
        <button onClick={onBack} className="p-2">←</button>
        <h2 className="text-lg font-semibold text-slate-800">Orçamento</h2>
      </header>
      <Card>
        <SectionTitle>Resumo mensal</SectionTitle>
        <div className="px-4 pb-4 space-y-3">
          <Row>
            <div className="text-slate-600">Total do mês</div>
            <div className="font-semibold">R$ 4.200 • Restante R$ 2.400</div>
          </Row>
          <div className="grid gap-3">
            {budgetChips.map((b) => (
              <div key={b.id} className="bg-slate-50 p-3 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-700">{b.title}</div>
                  <div className="text-slate-700 font-medium">R$ {b.spent} / {b.limit}</div>
                </div>
                <div className="mt-2"><Progress value={(b.spent/b.limit)*100} /></div>
              </div>
            ))}
          </div>
          <button className="btn-soft w-full">Adicionar categoria</button>
        </div>
      </Card>
    </div>
  );
}

function TransactionsView({ onBack }) {
  return (
    <div className="space-y-4">
      <header className="px-1 flex items-center gap-3">
        <button onClick={onBack} className="p-2">←</button>
        <h2 className="text-lg font-semibold text-slate-800">Transações</h2>
      </header>
      <Card>
        <SectionTitle right={<Chip intent="gray">Filtros</Chip>}>Buscar / Filtros</SectionTitle>
        <div className="px-4 pb-4 space-y-2">
          <input placeholder="Pesquisar" className="input" />
          <div className="grid grid-cols-2 gap-2">
            <button className="btn-outline">Agendar</button>
            <button className="btn-outline">Categoria</button>
          </div>
        </div>
      </Card>
      <Card>
        <SectionTitle>Lista</SectionTitle>
        <div className="divide-y">
          {txRecent.map((t)=> (
            <Row key={t.id}>
              <div className="text-slate-700">{t.label}</div>
              <div className={`font-medium ${t.amt < 0 ? "text-slate-700" : "text-emerald-600"}`}>
                {t.amt < 0 ? "-" : "+"} R$ {Math.abs(t.amt).toFixed(2)}
              </div>
            </Row>
          ))}
        </div>
        <Row>
          <button className="text-sm text-emerald-700">Adicionar transação</button>
        </Row>
      </Card>
    </div>
  );
}

function RemindersScreen({ onBack, onNext }) {
  return (
    <div className="space-y-4">
      <header className="px-1 flex items-center gap-3">
        <button onClick={onBack} className="p-2">←</button>
        <h2 className="text-lg font-semibold text-slate-800">Lembretes</h2>
      </header>
      <Card>
        <SectionTitle>Próxima cobrança</SectionTitle>
        <div className="px-4 pb-4 space-y-2">
          <Row>
            <div className="text-slate-700">Conta de energia</div>
            <Chip intent="green">Ativo</Chip>
          </Row>
          <Row>
            <div className="text-slate-700">Internet</div>
            <Chip intent="gray">Pausado</Chip>
          </Row>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={onNext} className="btn-primary">Criar lembrete</button>
        <button onClick={onBack} className="btn-outline">Ajustar nudges</button>
      </div>
    </div>
  );
}

function SetBill({ onBack, onNext }) {
  return (
    <div className="space-y-4">
      <header className="px-1 flex items-center gap-3">
        <button onClick={onBack} className="p-2">←</button>
        <h2 className="text-lg font-semibold text-slate-800">Definir conta</h2>
      </header>
      <Card>
        <SectionTitle>Próximo passo</SectionTitle>
        <div className="px-4 pb-4 space-y-3">
          <label className="block">
            <div className="text-xs text-slate-500 mb-1">Estabelecimento</div>
            <input placeholder="ex.: Netflix" className="input" />
          </label>
          <label className="block">
            <div className="text-xs text-slate-500 mb-1">Valor</div>
            <input type="number" className="input" defaultValue={0} />
          </label>
          <label className="block">
            <div className="text-xs text-slate-500 mb-1">Categoria</div>
            <select className="input">
              <option>Assinaturas</option>
              <option>Serviços</option>
              <option>Transporte</option>
            </select>
          </label>
          <label className="block">
            <div className="text-xs text-slate-500 mb-1">Pagar com</div>
            <select className="input">
              <option>Cartão</option>
              <option>Conta bancária</option>
            </select>
          </label>
          <label className="block">
            <div className="text-xs text-slate-500 mb-1">Próximo vencimento</div>
            <input type="date" className="input" />
          </label>
          <div className="flex gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" className="accent-emerald-600" /> Habilitar auto‑pagamento
            </label>
          </div>
        </div>
        <div className="px-4 pb-4 grid grid-cols-2 gap-3">
          <button onClick={onNext} className="btn-primary">Salvar</button>
          <button onClick={onBack} className="btn-outline">Salvar & ativar</button>
        </div>
      </Card>
    </div>
  );
}

function RecurringSetup({ onBack, onNext }) {
  return (
    <div className="space-y-4">
      <header className="px-1 flex items-center gap-3">
        <button onClick={onBack} className="p-2">←</button>
        <h2 className="text-lg font-semibold text-slate-800">Recorrência</h2>
      </header>
      <Card>
        <SectionTitle>Definir recorrência</SectionTitle>
        <div className="px-4 pb-4 space-y-3">
          <label className="block">
            <div className="text-xs text-slate-500 mb-1">Frequência</div>
            <select className="input">
              <option>Mensal</option>
              <option>Semanal</option>
              <option>Quinzenal</option>
              <option>Personalizado</option>
            </select>
          </label>
          <label className="block">
            <div className="text-xs text-slate-500 mb-1">Próxima data</div>
            <input type="date" className="input" />
          </label>
          <label className="block">
            <div className="text-xs text-slate-500 mb-1">Hora</div>
            <input type="time" className="input" defaultValue="08:00" />
          </label>
          <label className="block">
            <div className="text-xs text-slate-500 mb-1">Pular finais de semana</div>
            <select className="input">
              <option>Sim</option>
              <option>Não</option>
            </select>
          </label>
          <label className="block">
            <div className="text-xs text-slate-500 mb-1">Termina em</div>
            <select className="input">
              <option>Sem término</option>
              <option>12 ciclos</option>
              <option>Data específica</option>
            </select>
          </label>
        </div>
        <div className="px-4 pb-4 grid grid-cols-2 gap-3">
          <button onClick={onNext} className="btn-primary">Prévia & confirmar</button>
          <button onClick={onBack} className="btn-outline">Voltar</button>
        </div>
      </Card>
    </div>
  );
}

function ReviewConfirm({ onBack, onDone }) {
  return (
    <div className="space-y-4">
      <header className="px-1 flex items-center gap-3">
        <button onClick={onBack} className="p-2">←</button>
        <h2 className="text-lg font-semibold text-slate-800">Revisar & Confirmar</h2>
      </header>

      <Card>
        <SectionTitle>Resumo da recorrência</SectionTitle>
        <div className="px-4 pb-4 space-y-3">
          <Row><div>Frequência</div><div className="font-medium">Mensal</div></Row>
          <Row><div>Conta</div><div className="font-medium">Cartão final • 1234</div></Row>
          <Row><div>Categoria</div><div className="font-medium">Assinaturas</div></Row>
          <Row><div>Próximo vencimento</div><div className="font-medium">25/09</div></Row>
          <Row><div>Opções mensais</div><div className="font-medium">Pular finais de semana</div></Row>
        </div>
        <div className="px-4 pb-4 grid grid-cols-2 gap-3">
          <button onClick={onDone} className="btn-primary">Confirmar & criar</button>
          <button onClick={onBack} className="btn-outline">Voltar</button>
        </div>
      </Card>

      <Card>
        <SectionTitle>Celebrar sequência</SectionTitle>
        <div className="px-4 pb-4 space-y-3">
          <div className="text-sm text-slate-700">🎉 Ótima sequência! Você economizou mais que no mês passado.</div>
          <div className="grid grid-cols-2 gap-3">
            <button className="btn-outline">Compartilhar</button>
            <button className="btn-soft">Concluir</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const go = (s) => setScreen(s);

  const Main = useMemo(() => {
    switch (screen) {
      case SCREENS.LOG:
        return <LogSpend onBack={() => go(SCREENS.HOME)} onNext={() => go(SCREENS.REVIEW)} />;
      case SCREENS.BUDGET:
        return <BudgetOverview onBack={() => go(SCREENS.HOME)} />;
      case SCREENS.TX:
        return <TransactionsView onBack={() => go(SCREENS.HOME)} />;
      case SCREENS.REMIND:
        return <RemindersScreen onBack={() => go(SCREENS.HOME)} onNext={() => go(SCREENS.BILL)} />;
      case SCREENS.BILL:
        return <SetBill onBack={() => go(SCREENS.REMIND)} onNext={() => go(SCREENS.RECUR)} />;
      case SCREENS.RECUR:
        return <RecurringSetup onBack={() => go(SCREENS.BILL)} onNext={() => go(SCREENS.REVIEW)} />;
      case SCREENS.REVIEW:
        return <ReviewConfirm onBack={() => go(SCREENS.RECUR)} onDone={() => go(SCREENS.HOME)} />;
      default:
        return <HomeDashboard onGo={go} />;
    }
  }, [screen]);

  return (
    <div className="min-h-[100dvh] w-full bg-slate-50">
      <div className="mx-auto max-w-md px-3 pt-3 pb-24">
        {Main}
      </div>

      <TabBar current={screen} onGo={go} />
    </div>
  );
}

// Navegação inferior após export default (para evitar hoisting confuso)
function TabBar({ current, onGo }) {
  const tabs = [
    { id: SCREENS.HOME, label: "Início" },
    { id: SCREENS.BUDGET, label: "Orçamento" },
    { id: SCREENS.TX, label: "Transações" },
    { id: SCREENS.REMIND, label: "Lembretes" },
  ];
  return (
    <nav className="fixed bottom-3 inset-x-0 flex justify-center">
      <div className="bg-white/90 backdrop-blur border border-slate-200 shadow-xl rounded-2xl p-1 flex gap-1 max-w-md w-[92%]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onGo(t.id)}
            className={`flex-1 py-2 text-sm rounded-xl ${current === t.id ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

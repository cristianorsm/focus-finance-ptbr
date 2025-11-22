// src/features/transactions/RegisterExpenseForm.tsx
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { createTransaction } from "../../services/transactions";

export function RegisterExpenseForm() {
  const { user } = useAuth();

  const [accountId, setAccountId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [description, setDescription] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!user) {
    return <p>Você precisa estar logado para registrar um gasto.</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);

    try {
      await createTransaction(
        {
          account_id: accountId,
          category_id: categoryId,
          type: "expense",
          amount: Number(amount),
          date,
          description: description || null,
        },
        user.id
      );

      setSuccessMsg("Gasto registrado com sucesso!");
      setAmount("");
      setDescription("");
    } catch (error: any) {
      setErrorMsg(error.message ?? "Erro ao registrar gasto");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="accountId">Conta</label>
        <input
          id="accountId"
          name="accountId"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          placeholder="ID ou nome da conta"
        />
      </div>

      <div>
        <label htmlFor="categoryId">Categoria</label>
        <input
          id="categoryId"
          name="categoryId"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          placeholder="Ex: Alimentação, Transporte..."
        />
      </div>

      <div>
        <label htmlFor="amount">Valor do gasto</label>
        <input
          id="amount"
          name="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0,00"
          step="0.01"
        />
      </div>

      <div>
        <label htmlFor="date">Data do gasto</label>
        <input
          id="date"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="description">Descrição (opcional)</label>
        <input
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Almoço com cliente, Uber..."
        />
      </div>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Salvando..." : "Registrar gasto"}
      </button>
    </form>
  );
}

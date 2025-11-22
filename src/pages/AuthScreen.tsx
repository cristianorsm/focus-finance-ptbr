import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [modo, setModo] = useState<"login" | "signup">("login");

  async function handleSubmit() {
    try {
      setError("");
      if (!email || !senha) {
        setError("Preencha todos os campos");
        return;
      }

      if (modo === "login") {
        await signIn(email, senha);
      } else {
        await signUp(email, senha);
      }
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="w-full max-w-xs p-6 bg-emerald-50 rounded-3xl shadow-xl">
        <h1 className="text-xl font-bold text-center text-slate-900 mb-4">
          {modo === "login" ? "Entrar no Focus Finance" : "Criar conta"}
        </h1>

        <input
          className="w-full mb-2 px-3 py-2 rounded-xl border border-emerald-200 text-sm"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-2 px-3 py-2 rounded-xl border border-emerald-200 text-sm"
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {error && <p className="text-red-600 text-xs mb-2">{error}</p>}

        <button
          className="w-full bg-emerald-500 py-2 rounded-xl text-slate-900 font-semibold mt-2"
          onClick={handleSubmit}
        >
          {modo === "login" ? "Entrar" : "Criar conta"}
        </button>

        <button
          className="w-full text-emerald-700 text-xs mt-4"
          onClick={() => setModo(modo === "login" ? "signup" : "login")}
        >
          {modo === "login"
            ? "Não tem conta? Criar agora"
            : "Já tem conta? Entrar"}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type LoginData = {
  email: string;
  senha: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data: LoginData) => {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:3030/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          senha: data.senha, 
        }),
      })

      if (!res.ok){
        // alert("Erro ao conectar com o servidor")
        throw new Error("Credenciais inválidas")
      };
      
      const menssage = (await res.json());
      window.sessionStorage.setItem("userAdmin", menssage.administrador);
      window.sessionStorage.setItem("userId", menssage.id);
      // alert(window.sessionStorage.getItem("userAdmin") === "true" ? "Login realizado como Administrador" : "Login realizado como Usuário comum");
      // Simulate redirect on success
      router.push("/home")  ;
    } catch (err: any) {
      setErrorMsg(err.message);
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "O email é obrigatório" })}
              className="mt-1 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-2"
              placeholder="voce@exemplo.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              {...register("senha", { required: "A senha é obrigatória" })}
              className="mt-1 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-2"
              placeholder="••••••••"
            />
            {errors.senha && (
              <p className="text-sm text-red-500 mt-1">{errors.senha.message}</p>
            )}
          </div>

          {errorMsg && (
            <p className="text-center text-sm text-red-500">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

      </div>
    </div>
  );
}
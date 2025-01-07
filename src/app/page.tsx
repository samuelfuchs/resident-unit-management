"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { mockUsers } from "@/mocks/users";

const LoginPage: React.FC = () => {
  const { login, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = login(email, password);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("E-mail ou senha inválidos");
      }
    } catch (err) {
      setError("Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const autofillUser = (userEmail: string) => {
    setEmail(userEmail);
    setPassword("password123");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Roger Residência</h1>
          <p className="text-gray-600 mt-2">
            Insira suas credenciais para acessar o sistema
          </p>
        </div>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Digite seu e-mail"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold mb-2">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Digite sua senha"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                title={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Acessar"
            )}
          </button>
        </form>
      </div>

      <div className="w-full max-w-md mt-6">
        <h2 className="text-lg font-semibold mb-2">Usuários Mock</h2>
        <div className="grid grid-cols-1 gap-2">
          {mockUsers.map((mockUser) => (
            <div
              key={mockUser.id}
              className="flex justify-between items-center bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              {/* User Info */}
              <span>
                {mockUser.name} {mockUser.lastName} ({mockUser.role})
              </span>

              <button
                onClick={() => {
                  setEmail(mockUser.email);
                  setPassword("password123");

                  setLoading(true);
                  setTimeout(() => {
                    const form = document.querySelector("form");
                    if (form) {
                      form.dispatchEvent(
                        new Event("submit", { cancelable: true, bubbles: true })
                      );
                    }
                  }, 100);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Entrar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
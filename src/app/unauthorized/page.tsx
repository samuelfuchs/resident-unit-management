"use client";

import React from "react";
import { useRouter } from "next/navigation";

const UnauthorizedPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-red-500">Acesso Negado</h1>
      <p className="text-gray-600 mt-2">
        Você não tem permissão para acessar esta página.
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Voltar para o início
      </button>
    </div>
  );
};

export default UnauthorizedPage;

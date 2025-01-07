"use client";

import React from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "@/components/Header";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <p className="text-center mt-6">Carregando...</p>;

  return (
    <div>
      <Header />
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-6">Perfil do Usuário</h2>
        <div className="bg-white p-6 rounded shadow-md space-y-6">
          <div>
            <p className="text-gray-600 font-semibold">Nome Completo:</p>
            <p className="text-lg">
              {user.name} {user.lastName}
            </p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">E-mail:</p>
            <p className="text-lg">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Função:</p>
            <p className="text-lg capitalize">{user.role}</p>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => alert("Feature not implemented yet!")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Editar Perfil
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;

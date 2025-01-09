"use client";

import React from "react";
import { useAuth } from "../../context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import { RoleTranslations } from "@/utils/roleTranslations";

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const stats = [
    { label: "Residents", value: 120 },
    { label: "Units", value: 45 },
    { label: "Active Users", value: 112 },
    { label: "Pending Requests", value: 8 },
  ];

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-6 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800">
              Bem-vindo(a), {user?.name}!
            </h1>
            <p className="text-gray-600 mt-2">
              Função:{" "}
              <span className="capitalize">
                {RoleTranslations[user?.role as keyof typeof RoleTranslations]}
              </span>
            </p>
            <p className="mt-4 text-gray-600">
              Hoje é{" "}
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              .
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-blue-500 text-white p-4 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold">{stat.value}</h2>
                <p className="mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Ações Rápidas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => alert("Navigate to Residents")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Gerenciar Residentes
              </button>
              <button
                onClick={() => alert("Navigate to Units")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Gerenciar Unidades
              </button>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default DashboardPage;
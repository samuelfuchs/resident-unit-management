"use client";

import React from "react";
import { useAuth } from "../../context/AuthContext";
import { RoleTranslations } from "@/utils/roleTranslations";
import AuthLayout from "@/components/AuthLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <p className="text-center mt-6">Carregando...</p>;

  const getInitials = (name: string, lastName: string): string => {
    return `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AuthLayout>
        <div className="bg-gray-100">
          <main className="mx-auto p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={`${user.name} ${user.lastName}`}
                    className="h-20 w-20 rounded-full shadow-lg"
                  />
                ) : (
                  <div className="h-20 w-20 bg-gray-300 rounded-full shadow-lg flex items-center justify-center">
                    <span className="text-gray-500 text-2xl font-bold">
                      {getInitials(user.name, user.lastName)}
                    </span>
                  </div>
                )}
                <div className="ml-6">
                  <h2 className="text-2xl font-bold">
                    {user.name} {user.lastName}
                  </h2>
                  <p className="text-gray-500 mt-2">
                    {RoleTranslations[user.role]}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border-b pb-2">
                  <p className="text-gray-600 font-semibold">E-mail:</p>
                  <p className="text-gray-800">{user.email}</p>
                </div>

                <div className="border-b pb-2">
                  <p className="text-gray-600 font-semibold">Telefone:</p>
                  <p className="text-gray-800">
                    {user.phone || "Não informado"}
                  </p>
                </div>

                <div className="border-b pb-2">
                  <p className="text-gray-600 font-semibold">Endereço:</p>
                  <p className="text-gray-800">
                    {user.address || "Não informado"}
                  </p>
                </div>

                <div className="border-b pb-2">
                  <p className="text-gray-600 font-semibold">Unidade:</p>
                  <p className="text-gray-800">
                    {user.unitNumber || "Não aplicável"}
                  </p>
                </div>

                <div className="border-b pb-2">
                  <p className="text-gray-600 font-semibold">Criado em:</p>
                  <p className="text-gray-800">
                    {user.createdAt || "Não informado"}
                  </p>
                </div>

                {user.emergencyContact && (
                  <div className="border-b pb-2">
                    <p className="text-gray-600 font-semibold">
                      Contato de Emergência:
                    </p>
                    <p className="text-gray-800">
                      {user.emergencyContact.name} -{" "}
                      {user.emergencyContact.phone} (
                      {user.emergencyContact.relationship})
                    </p>
                  </div>
                )}

                <div className="border-b pb-2">
                  <p className="text-gray-600 font-semibold">Status:</p>
                  <p className="text-gray-800 capitalize">
                    {user.status || "Ativo"}
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => alert("Feature not implemented yet!")}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  Editar Perfil
                </button>
              </div>
            </div>
          </main>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default ProfilePage;
"use client";

import React from "react";
import { mockResidents } from "@/mocks/residents";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";

const ResidentsPage: React.FC = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AuthLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Perfis de Residentes</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockResidents.map((resident) => (
              <div key={resident.id} className="bg-white p-4 shadow rounded-lg">
                <div className="flex items-center mb-4">
                  {resident.profilePicture ? (
                    <img
                      src={resident.profilePicture}
                      alt={`${resident.name} ${resident.lastName}`}
                      className="h-12 w-12 rounded-full shadow"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 font-bold">
                        {resident.name.charAt(0)}
                        {resident.lastName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="ml-4">
                    <p className="font-bold">{`${resident.name} ${resident.lastName}`}</p>
                    <p className="text-sm text-gray-500">{resident.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Telefone:</span>{" "}
                  {resident.phone}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">E-mail:</span>{" "}
                  {resident.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Unidade:</span>{" "}
                  {resident.unitId}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default ResidentsPage;

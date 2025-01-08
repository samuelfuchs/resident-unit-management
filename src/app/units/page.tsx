"use client";

import React from "react";
import { mockUnits } from "@/mocks/units";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";

const UnitsPage: React.FC = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AuthLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Detalhes das Unidades</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockUnits.map((unit) => (
              <div key={unit.id} className="bg-white p-4 shadow rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Número:</span> {unit.number}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Andar:</span> {unit.floor}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Área:</span>{" "}
                  {unit.squareFootage} sqft
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Tipo:</span> {unit.type}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Estacionamentos:</span>{" "}
                  {unit.parkingSpots.join(", ")}
                </p>
                <a
                  href={unit.leaseAgreement}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Ver contrato
                </a>
              </div>
            ))}
          </div>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default UnitsPage;

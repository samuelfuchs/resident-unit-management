"use client";

import React from "react";
import { mockUnits } from "@/mocks/units";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table from "@/components/Table";

const UnitsPage: React.FC = () => {
  const columns = [
    { header: "Unit Number", accessor: "number" },
    { header: "Floor", accessor: "floor" },
    { header: "Square Footage", accessor: "squareFootage" },
    { header: "Type", accessor: "type" },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin", "receptionist"]}>
      <AuthLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Detalhes das Unidades</h1>
          <Table
            data={mockUnits}
            columns={columns}
            actions={(row) => (
              <a href="#" className="text-indigo-600 hover:text-indigo-900">
                Edit
              </a>
            )}
          />
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default UnitsPage;
"use client";

import React, { useState } from "react";
import { mockResidents } from "@/mocks/residents";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import Pagination from "@/components/Pagination";
import { TrashIcon, EyeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

const ResidentsPage: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(mockResidents.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedResidents = mockResidents.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const columns: Column<User>[] = [
    { header: "Nome", accessor: "name" },
    { header: "E-mail", accessor: "email" },
    { header: "Função", accessor: "role" },
  ];

  const handleDelete = (id: string) => {
    console.log("Deleted resident with ID:", id);
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AuthLayout>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Perfis de Residentes</h1>
            <button
              onClick={() => router.push("/residents/new")}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Novo Residente
            </button>
          </div>

          <Table
            data={paginatedResidents}
            columns={columns}
            actions={(row) => (
              <div className="flex space-x-2">
                <button
                  onClick={() => router.push(`/residents/${row.id}`)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default ResidentsPage;
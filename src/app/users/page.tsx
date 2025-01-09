"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { User } from "@/types/user";
import { mockUsers } from "@/mocks/users";
import { TrashIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const UsersPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filteredUsers = mockUsers.filter((user) =>
    `${user.name} ${user.lastName} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const columns: Column<User>[] = [
    { header: "Nome", accessor: "name" },
    { header: "Sobrenome", accessor: "lastName" },
    { header: "E-mail", accessor: "email" },
    {
      header: "Função",
      accessor: "role",
      render: (value) => value.toUpperCase(),
    },
  ];

  const handleDelete = (id: string) => {
    console.log("Deleted user with ID:", id);
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AuthLayout>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Usuários</h1>
            <button
              onClick={() => router.push("/users/new")}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Novo Usuário
            </button>
          </div>
          <SearchBar
            onSearch={(query) => setSearchTerm(query)}
            placeholder="Buscar por nome, e-mail ou função..."
          />
          <Table
            data={paginatedUsers}
            columns={columns}
            actions={(row) => (
              <div className="flex space-x-2">
                <button
                  onClick={() => router.push(`/users/${row.id}`)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => router.push(`/users/${row.id}/edit`)}
                  className="text-green-500 hover:text-green-600"
                >
                  <PencilIcon className="h-5 w-5" />
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
            onPageChange={setCurrentPage}
          />
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default UsersPage;

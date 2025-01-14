"use client";

import React, { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { User } from "@/types/user";
import { TrashIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { fetchUsers } from "@/api/users";

const UsersPage: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const rowsPerPage = 10;

  const fetchAndSetUsers = async () => {
    console.log("feching users");
    setLoading(true);
    try {
      const { users, totalPages } = await fetchUsers({
        search: searchTerm,
        page: currentPage,
        limit: rowsPerPage,
      });
      setUsers(users);
      console.log("users", users);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetUsers();
  }, [searchTerm, currentPage]);

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

  const handleDelete = async (id: string) => {
    try {
      console.log("deleting user...", id);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <ProtectedRoute>
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
          {loading ? (
            <p className="text-center">Carregando...</p>
          ) : (
            <>
              <Table
                data={users}
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
            </>
          )}
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default UsersPage;

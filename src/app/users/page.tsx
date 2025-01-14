"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { User } from "@/types/user";
import { TrashIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { deleteUser, fetchUsers } from "@/api/users";
import Modal from "@/components/Modal";
import { debounce } from "@/utils/debounce";
import Loader from "@/components/Loader";

const UsersPage: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  console.log("loading", loading);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("null");
  const [selectedUserName, setSelectedUserName] = useState<string>("");

  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const rowsPerPage = 10;

  // const fetchAndSetUsers = async () => {
  //   console.log("feching users");
  //   setLoading(true);
  //   try {
  //     const { users, totalPages } = await fetchUsers({
  //       search: searchTerm,
  //       page: currentPage,
  //       limit: rowsPerPage,
  //     });
  //     setUsers(users);
  //     console.log("users", users);
  //     setTotalPages(totalPages);
  //   } catch (error) {
  //     console.error("Failed to fetch users:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchAndSetUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { users, totalPages } = await fetchUsers({
        search: searchTerm,
        role: roleFilter,
        status: statusFilter,
        page: currentPage,
        limit: rowsPerPage,
        sortField,
        sortOrder,
      });
      setUsers(users);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, roleFilter, statusFilter, currentPage, sortField, sortOrder]);

  useEffect(() => {
    const debouncedFetch = debounce(fetchAndSetUsers, 300);
    debouncedFetch();
  }, [searchTerm, fetchAndSetUsers]);

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
      await deleteUser(id);
      fetchAndSetUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const openModal = (userId: string, userName: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId("");
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
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setRoleFilter("admin")}
              className={`px-4 py-2 rounded ${
                roleFilter === "admin"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setRoleFilter("receptionist")}
              className={`px-4 py-2 rounded ${
                roleFilter === "receptionist"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Receptionist
            </button>
            <button
              onClick={() => setRoleFilter("resident")}
              className={`px-4 py-2 rounded ${
                roleFilter === "resident"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Resident
            </button>
            <button
              onClick={() => setStatusFilter("active")}
              className={`px-4 py-2 rounded ${
                statusFilter === "active"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter("inactive")}
              className={`px-4 py-2 rounded ${
                statusFilter === "inactive"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Inactive
            </button>
            <button
              onClick={() => {
                setRoleFilter(null);
                setStatusFilter(null);
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Clear Filters
            </button>
          </div>
          <div className="flex space-x-4 mb-4">
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="createdAt">Created At</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="px-4 py-2 border rounded"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          {loading ? (
            <Loader message="Carregando..." />
          ) : (
            <>
              <Table
                data={users}
                columns={columns}
                actions={(row) => (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => router.push(`/users/${row._id}`)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => router.push(`/users/${row._id}/edit`)}
                      className="text-green-500 hover:text-green-600"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        openModal(row._id, `${row.name} ${row.lastName}`)
                      }
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

        <Modal
          type="warning"
          title="Confirmação de Exclusão"
          description={`Tem certeza que deseja excluir o usuário "${selectedUserName}"? Esta ação não pode ser desfeita.`}
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={() => handleDelete(selectedUserId)}
        />
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default UsersPage;

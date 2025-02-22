"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { User } from "@/types/user";
import {
  TrashIcon,
  EyeIcon,
  PencilIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { deleteUser, fetchUsers } from "@/api/users";
import Modal from "@/components/Modal";
import { debounce } from "@/utils/debounce";
import Loader from "@/components/Loader";
import SelectField from "@/components/SelectField";
import Button from "@/components/Button";
import UserFormModal from "@/components/UserFormModal";

const UsersPage: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("null");
  const [selectedUserName, setSelectedUserName] = useState<string>("");

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<User> | undefined>();
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">(
    "create"
  );

  const rowsPerPage = 10;

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

  const openCreateModal = () => {
    setEditingUser(undefined);
    setModalMode("create");
    setIsUserModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setModalMode("edit");
    setIsUserModalOpen(true);
  };

  const openViewModal = (user: User) => {
    setEditingUser(user);
    setModalMode("view");
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setEditingUser(undefined);
  };

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Users</h1>
            <Button onClick={openCreateModal} variant="primary">
              New User
            </Button>
          </div>
          <SearchBar
            onSearch={(query) => setSearchTerm(query)}
            placeholder="Search by name, email or role..."
            buttonText="Search"
            onButtonClick={() => fetchAndSetUsers()}
            loading={loading}
          />
          <div className="bg-white shadow-md rounded-lg mb-6">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-lg font-semibold">Advanced Filters</h2>
              <button
                onClick={() => setIsFilterVisible((prev) => !prev)}
                className="flex items-center text-sm text-blue-500 hover:text-blue-700"
              >
                {isFilterVisible ? "Hide Filters" : "Show Filters"}
                {isFilterVisible ? (
                  <ChevronUpIcon className="h-5 w-5 ml-1" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 ml-1" />
                )}
              </button>
            </div>
            {isFilterVisible && (
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <SelectField
                    id="roleFilter"
                    name="roleFilter"
                    label="Filtrar por Função"
                    value={roleFilter || ""}
                    onChange={(e) => setRoleFilter(e.target.value || undefined)}
                    options={[
                      { value: "", label: "Todas as Funções" },
                      { value: "admin", label: "Admin" },
                      { value: "receptionist", label: "Receptionist" },
                      { value: "resident", label: "Resident" },
                    ]}
                  />
                  <SelectField
                    id="statusFilter"
                    name="statusFilter"
                    label="Filtrar por Status"
                    value={statusFilter || ""}
                    onChange={(e) =>
                      setStatusFilter(e.target.value || undefined)
                    }
                    options={[
                      { value: "", label: "Todos os Status" },
                      { value: "active", label: "Ativo" },
                      { value: "inactive", label: "Inativo" },
                    ]}
                  />
                  <div className="flex items-end">
                    <Button
                      loading={loading}
                      onClick={() => {
                        setRoleFilter(undefined);
                        setStatusFilter(undefined);
                      }}
                      variant="secondary"
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                  <SelectField
                    id="sortField"
                    name="sortField"
                    label="Sort by"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                    options={[
                      { value: "createdAt", label: "Created At" },
                      { value: "name", label: "Name" },
                      { value: "email", label: "Email" },
                    ]}
                  />
                  <SelectField
                    id="sortOrder"
                    name="sortOrder"
                    label="Order"
                    value={sortOrder}
                    onChange={(e) =>
                      setSortOrder(e.target.value as "asc" | "desc")
                    }
                    options={[
                      { value: "asc", label: "Ascending" },
                      { value: "desc", label: "Descending" },
                    ]}
                  />
                </div>
              </div>
            )}
          </div>
          {loading ? (
            <Loader message="Loading..." />
          ) : (
            <>
              <Table
                data={users}
                columns={columns}
                actions={(row) => (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openViewModal(row)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => openEditModal(row)}
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
          title="Confirmation of Deletion"
          description={`Are you sure you want to delete the user "${selectedUserName}"? This action cannot be undone.`}
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={() => handleDelete(selectedUserId)}
        />
        <UserFormModal
          isOpen={isUserModalOpen}
          onClose={closeUserModal}
          onSubmitSuccess={fetchAndSetUsers}
          user={editingUser}
          mode={modalMode}
        />
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default UsersPage;

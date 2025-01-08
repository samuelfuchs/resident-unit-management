"use client";

import React, { useState } from "react";
import { mockResidents } from "@/mocks/residents";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";
import SearchBar from "@/components/SearchBar";
import { TrashIcon, EyeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

const ResidentsPage: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 10;

  const filteredResidents = mockResidents.filter((resident) => {
    const query = searchQuery.toLowerCase();
    return (
      resident.name.toLowerCase().includes(query) ||
      resident.email.toLowerCase().includes(query) ||
      (resident.unitNumber &&
        resident.unitNumber.toLowerCase().includes(query)) ||
      (resident.phone && resident.phone.includes(query))
    );
  });

  const totalPages = Math.ceil(filteredResidents.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedResidents = filteredResidents.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const columns: Column<User>[] = [
    { header: "Nome", accessor: "name" },
    { header: "E-mail", accessor: "email" },
    { header: "Telefone", accessor: "phone" },
    { header: "Unidade", accessor: "unitNumber" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (value === "active" ? "Ativo" : "Inativo"),
    },
    {
      header: "Família",
      accessor: "familyMembers",
      render: (value) => (value ? value.length : 0),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState<User | null>(null);

  const handleDeleteClick = (resident: User) => {
    setSelectedResident(resident);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleted resident with ID:", selectedResident?.id);

    setIsModalOpen(false);
    setIsSuccessModalOpen(true);

    setTimeout(() => {
      setIsSuccessModalOpen(false);
      setSelectedResident(null);
    }, 2000);
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

          <SearchBar
            placeholder="Buscar por nome, e-mail, telefone ou unidade..."
            onSearch={(query) => setSearchQuery(query)}
          />

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
                  onClick={() => handleDeleteClick(row)}
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

        <Modal
          type="warning"
          title="Confirmar Exclusão"
          description={`Tem certeza de que deseja excluir ${selectedResident?.name} ${selectedResident?.lastName}?`}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />

        <Modal
          type="success"
          title="Sucesso!"
          description="O residente foi excluído com sucesso."
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
        />
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default ResidentsPage;
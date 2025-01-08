"use client";

import React, { useState } from "react";
import { mockUnits } from "@/mocks/units";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";
import SearchBar from "@/components/SearchBar";
import { TrashIcon, EyeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Unit } from "@/types/unit";

const UnitsPage: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const rowsPerPage = 10;

  const filteredUnits = mockUnits.filter((unit) => {
    const query = searchQuery.toLowerCase();
    return (
      unit.number.toLowerCase().includes(query) ||
      unit.type.toLowerCase().includes(query) ||
      unit.floor.toString().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredUnits.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUnits = filteredUnits.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const columns: Column<Unit>[] = [
    { header: "Unidade", accessor: "number" },
    { header: "Andar", accessor: "floor" },
    { header: "Tamanho (m²)", accessor: "squareFootage" },
    { header: "Tipo", accessor: "type" },
    {
      header: "Estacionamento",
      accessor: "parkingSpots",
      render: (value) => (value ? value.length : 0),
    },
  ];

  const handleDeleteClick = (unit: Unit) => {
    setSelectedUnit(unit);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleted unit with ID:", selectedUnit?.id);

    setIsModalOpen(false);
    setIsSuccessModalOpen(true);

    setTimeout(() => {
      setIsSuccessModalOpen(false);
      setSelectedUnit(null);
    }, 2000);
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "receptionist"]}>
      <AuthLayout>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Detalhes das Unidades</h1>
            <button
              onClick={() => router.push("/units/new")}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nova Unidade
            </button>
          </div>

          <SearchBar
            placeholder="Buscar por unidade, tipo ou andar..."
            onSearch={(query) => setSearchQuery(query)}
          />

          <Table
            data={paginatedUnits}
            columns={columns}
            actions={(row) => (
              <div className="flex space-x-2">
                <button
                  onClick={() => router.push(`/units/${row.id}`)}
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
          description={`Tem certeza de que deseja excluir a unidade ${selectedUnit?.number}?`}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />

        <Modal
          type="success"
          title="Sucesso!"
          description="A unidade foi excluída com sucesso."
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
        />
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default UnitsPage;
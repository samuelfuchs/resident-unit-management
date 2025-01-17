"use client";

import React, { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal";
import SearchBar from "@/components/SearchBar";
import { TrashIcon, EyeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Unit } from "@/types/unit";
import { deleteUnit, fetchAllUnits } from "@/api/units";

const UnitsPage: React.FC = () => {
  const router = useRouter();
  const [units, setUnits] = useState<Unit[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const rowsPerPage = 10;

  const loadUnits = async () => {
    try {
      const response = await fetchAllUnits({
        search: searchQuery,
        page: currentPage,
        limit: rowsPerPage,
      });
      setUnits(response.units);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch units:", error);
    }
  };
  useEffect(() => {
    loadUnits();
  }, [searchQuery, currentPage]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleDeleteClick = (unit: Unit) => {
    setSelectedUnit(unit);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    console.log("selectedUnit.id", selectedUnit?.id);
    if (!selectedUnit) return;
    try {
      await deleteUnit(selectedUnit._id);
      console.log(`Unit ${selectedUnit.id} has been successfully deleted.`);

      // setIsSuccessModalOpen(false);
      setIsSuccessModalOpen(true);
      loadUnits();
    } catch (error) {
      console.error("Error deleting unit:", error);
    } finally {
      setSelectedUnit(null);
      setIsModalOpen(false);
    }
  };

  return (
    <ProtectedRoute>
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
            onSearch={handleSearch}
          />

          <Table
            data={units}
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
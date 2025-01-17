"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { Unit } from "@/types/unit";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { deleteUnit, fetchAllUnits } from "@/api/units";
import Modal from "@/components/Modal";
import { debounce } from "@/utils/debounce";
import Loader from "@/components/Loader";
import SelectField from "@/components/SelectField";
import Button from "@/components/Button";

const UnitsPage: React.FC = () => {
  const router = useRouter();
  const [units, setUnits] = useState<Unit[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [floorFilter, setFloorFilter] = useState<string | number | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const rowsPerPage = 10;

  const fetchAndSetUnits = useCallback(async () => {
    setLoading(true);
    try {
      const { units, totalPages } = await fetchAllUnits({
        search: searchTerm,
        type: typeFilter,
        floor: floorFilter,
        page: currentPage,
        limit: rowsPerPage,
        sortField,
        sortOrder,
      });
      setUnits(units);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Failed to fetch units:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, typeFilter, floorFilter, currentPage, sortField, sortOrder]);

  useEffect(() => {
    const debouncedFetch = debounce(fetchAndSetUnits, 300);
    debouncedFetch();
  }, [searchTerm, typeFilter, floorFilter, fetchAndSetUnits]);

  const handleDelete = async () => {
    if (!selectedUnit) return;
    try {
      await deleteUnit(selectedUnit.id);
      fetchAndSetUnits();
    } catch (error) {
      console.error("Failed to delete unit:", error);
    } finally {
      setIsModalOpen(false);
      setSelectedUnit(null);
    }
  };

  const columns: Column<Unit>[] = [
    { header: "Número", accessor: "number" },
    { header: "Andar", accessor: "floor" },
    { header: "Tamanho (m²)", accessor: "squareFootage" },
    { header: "Tipo", accessor: "type" },
    {
      header: "Estacionamento",
      accessor: "parkingSpots",
      render: (value) => (value ? value.length : 0),
    },
  ];

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Unidades</h1>
            <Button onClick={() => router.push("/units/new")} variant="primary">
              Nova Unidade
            </Button>
          </div>
          <SearchBar
            onSearch={(query) => setSearchTerm(query)}
            placeholder="Buscar por número, tipo ou andar..."
            buttonText="Buscar"
            onButtonClick={fetchAndSetUnits}
            loading={loading}
          />
          <div className="flex space-x-4 mb-4">
            <SelectField
              id="typeFilter"
              name="typeFilter"
              label="Filtrar por Tipo"
              value={typeFilter || ""}
              onChange={(e) => setTypeFilter(e.target.value || undefined)}
              options={[
                { value: "", label: "Todos os Tipos" },
                { value: "Residential", label: "Residencial" },
                { value: "Commercial", label: "Comercial" },
                { value: "House", label: "Casa" },
                { value: "Apartment", label: "Apartamento" },
                { value: "Office", label: "Escritório" },
              ]}
            />
            <input
              type="number"
              placeholder="Filtrar por Andar"
              value={floorFilter || ""}
              onChange={(e) =>
                setFloorFilter(
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
              className="border rounded px-4 py-2"
            />
          </div>
          <div className="flex space-x-4 mb-4">
            <SelectField
              id="sortField"
              name="sortField"
              label="Ordenar por"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              options={[
                { value: "createdAt", label: "Criado em" },
                { value: "number", label: "Número" },
                { value: "floor", label: "Andar" },
              ]}
            />
            <SelectField
              id="sortOrder"
              name="sortOrder"
              label="Ordem"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              options={[
                { value: "asc", label: "Crescente" },
                { value: "desc", label: "Decrescente" },
              ]}
            />
          </div>
          {loading ? (
            <Loader message="Carregando..." />
          ) : (
            <>
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
                      onClick={() => setSelectedUnit(row)}
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
          description={`Tem certeza que deseja excluir a unidade "${selectedUnit?.number}"? Esta ação não pode ser desfeita.`}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
        />
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default UnitsPage;
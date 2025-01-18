"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { Unit } from "@/types/unit";
import {
  TrashIcon,
  EyeIcon,
  PencilIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { deleteUnit, fetchAllUnits } from "@/api/units";
import Modal from "@/components/Modal";
import { debounce } from "@/utils/debounce";
import Loader from "@/components/Loader";
import SelectField from "@/components/SelectField";
import Button from "@/components/Button";
import UnitFormModal from "@/components/UnitFormModal";
import { fetchUsers } from "@/api/users";

const UnitsPage: React.FC = () => {
  const router = useRouter();
  const [units, setUnits] = useState<Unit[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [floorFilter, setFloorFilter] = useState<string | number | undefined>(
    undefined
  );
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isUnitFormModalOpen, setIsUnitFormModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Partial<Unit> | undefined>();
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">(
    "create"
  );
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
  }, [searchTerm, typeFilter, floorFilter, fetchAndSetUnits, fetchUsers]);

  const handleDelete = async () => {
    if (!selectedUnit) return;
    try {
      await deleteUnit(selectedUnit._id);
      fetchAndSetUnits();
    } catch (error) {
      console.error("Failed to delete unit:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedUnit(null);
    }
  };

  const openCreateModal = () => {
    setEditingUnit(undefined);
    setModalMode("create");
    setIsUnitFormModalOpen(true);
  };

  const openEditModal = (unit: Unit) => {
    setEditingUnit(unit);
    setModalMode("edit");
    setIsUnitFormModalOpen(true);
  };

  const closeUnitFormModal = () => {
    setIsUnitFormModalOpen(false);
    setEditingUnit(undefined);
  };

  const openViewModal = (unit: Unit) => {
    setEditingUnit(unit);
    setModalMode("view");
    setIsUnitFormModalOpen(true);
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
            <Button onClick={openCreateModal} variant="primary">
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

          <div className="bg-white shadow-md rounded-lg mb-6">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-lg font-semibold">Filtros avançados</h2>
              <button
                onClick={() => setIsFilterVisible((prev) => !prev)}
                className="flex items-center text-sm text-blue-500 hover:text-blue-700"
              >
                {isFilterVisible ? "Esconder Filtros" : "Mostrar Filtros"}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
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
                    onChange={(e) =>
                      setSortOrder(e.target.value as "asc" | "desc")
                    }
                    options={[
                      { value: "asc", label: "Crescente" },
                      { value: "desc", label: "Decrescente" },
                    ]}
                  />
                </div>
              </div>
            )}
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
                      onClick={() => {
                        setSelectedUnit(row);
                        setIsDeleteModalOpen(true);
                      }}
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
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
        <UnitFormModal
          isOpen={isUnitFormModalOpen}
          onClose={closeUnitFormModal}
          onSubmitSuccess={fetchAndSetUnits}
          unit={editingUnit}
          mode={modalMode}
        />
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default UnitsPage;
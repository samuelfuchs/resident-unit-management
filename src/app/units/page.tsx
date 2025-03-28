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
    { header: "Number", accessor: "number" },
    { header: "Floor", accessor: "floor" },
    { header: "Square Footage", accessor: "squareFootage" },
    { header: "Type", accessor: "type" },
    {
      header: "Parking Spots",
      accessor: "parkingSpots",
      render: (value) => (value ? value.length : 0),
    },
  ];

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Units
            </h1>
            <Button onClick={openCreateModal} variant="primary">
              New Unit
            </Button>
          </div>
          <SearchBar
            onSearch={(query) => setSearchTerm(query)}
            placeholder="Search by number, type or floor..."
            buttonText="Search"
            onButtonClick={fetchAndSetUnits}
            loading={loading}
          />

          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg mb-6">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-lg font-semibold dark:text-gray-200">
                Advanced Filters
              </h2>
              <button
                onClick={() => setIsFilterVisible((prev) => !prev)}
                className="flex items-center text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
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
                    id="typeFilter"
                    name="typeFilter"
                    label="Filter by Type"
                    value={typeFilter || ""}
                    onChange={(e) => setTypeFilter(e.target.value || undefined)}
                    options={[
                      { value: "", label: "All Types" },
                      { value: "Residential", label: "Residential" },
                      { value: "Commercial", label: "Commercial" },
                      { value: "House", label: "House" },
                      { value: "Apartment", label: "Apartment" },
                      { value: "Office", label: "Office" },
                    ]}
                  />
                  <input
                    type="number"
                    placeholder="Filter by Floor"
                    value={floorFilter || ""}
                    onChange={(e) =>
                      setFloorFilter(
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                    className="border rounded px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <SelectField
                    id="sortField"
                    name="sortField"
                    label="Sort by"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                    options={[
                      { value: "createdAt", label: "Created At" },
                      { value: "number", label: "Number" },
                      { value: "floor", label: "Floor" },
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
                data={units}
                columns={columns}
                actions={(row) => (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openViewModal(row)}
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => openEditModal(row)}
                      className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUnit(row);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
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
          description={`Are you sure you want to delete the unit "${selectedUnit?.number}"? This action cannot be undone.`}
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
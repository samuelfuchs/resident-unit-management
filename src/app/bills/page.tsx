"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import { Bill } from "@/types/bill";
import { formatCurrency } from "@/utils/formatters";
import Button from "@/components/Button";
import BillFormModal from "@/components/BillFormModal";
import { useUsers } from "@/hooks/useUsers";
import { fetchBillsByResidentId, getAllBills } from "@/api/bills";
import { useAuth } from "@/context/AuthContext";
import SelectField from "@/components/SelectField";
import Loader from "@/components/Loader";
import { debounce } from "@/utils/debounce";

const BillsPage: React.FC = () => {
  const { user } = useAuth();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [selectedResidentId, setSelectedResidentId] = useState<string>("");
  const { users } = useUsers();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const isAdmin = user?.role === "admin";

  const fetchBills = useCallback(async () => {
    if (!selectedResidentId && !isAdmin) {
      setBills([]);
      return;
    }

    setLoading(true);
    try {
      if (selectedResidentId) {
        const data = await fetchBillsByResidentId(selectedResidentId);
        setBills(data);
      } else {
        const response = await getAllBills({
          page: currentPage,
          limit: 10,
          sortBy,
          sortOrder,
        });
        setBills(response.bills);
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch bills:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedResidentId, currentPage, sortBy, sortOrder, isAdmin]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const residentOptions = [
    { value: "", label: "Show All Bills" },
    ...Object.values(users)
      .filter((user) => user.role === "resident")
      .map((user) => ({
        value: user._id,
        label: `${user.name} ${user.lastName}`,
      })),
  ];

  const columns: Column<Bill>[] = [
    {
      header: "Description",
      accessor: "description",
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (value) => formatCurrency(value),
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <span
          className={`capitalize ${
            value === "paid"
              ? "text-green-600"
              : value === "overdue"
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: "Created At",
      accessor: "createdAt",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    ...(isAdmin
      ? [
          {
            header: "Actions",
            accessor: "_id" as keyof Bill,
            render: (_: unknown, bill: Bill) => (
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setSelectedBill(bill);
                    setIsFormModalOpen(true);
                  }}
                  variant="secondary"
                  size="small"
                >
                  Edit
                </Button>
              </div>
            ),
          },
        ]
      : []),
  ];

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (!selectedResidentId && isAdmin) {
        setLoading(true);
        getAllBills({
          page: currentPage,
          limit: 10,
          sortBy,
          sortOrder,
          search: value,
        })
          .then((response) => {
            setBills(response.bills);
            setTotalPages(response.totalPages);
          })
          .catch((error) => {
            console.error("Failed to fetch bills:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, 300),
    [currentPage, sortBy, sortOrder, selectedResidentId, isAdmin]
  );

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Bills Management</h1>
            {isAdmin && (
              <Button onClick={() => setIsFormModalOpen(true)}>
                Create Bill
              </Button>
            )}
          </div>

          <div className="flex gap-4 items-end">
            <div className="w-full max-w-xs">
              <SelectField
                id="residentId"
                name="residentId"
                label="Select Resident"
                value={selectedResidentId}
                onChange={(e) => {
                  setSelectedResidentId(e.target.value);
                  setCurrentPage(1);
                }}
                options={residentOptions}
              />
            </div>

            {!selectedResidentId && isAdmin && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bills..."
                  className="px-4 py-2 pr-10 border rounded-md"
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    debouncedSearch(value);
                  }}
                />
                {searchTerm && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => {
                      setSearchTerm("");
                      debouncedSearch("");
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>

          {loading ? (
            <Loader message="Loading..." />
          ) : (
            <>
              <Table data={bills} columns={columns} />

              {!selectedResidentId && isAdmin && totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  <Button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    variant="secondary"
                  >
                    Previous
                  </Button>
                  <span className="py-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    variant="secondary"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}

          {isAdmin && (
            <BillFormModal
              isOpen={isFormModalOpen}
              onClose={() => {
                setIsFormModalOpen(false);
                setSelectedBill(null);
              }}
              onSubmitSuccess={() => {
                fetchBills();
                setIsFormModalOpen(false);
                setSelectedBill(null);
              }}
              bill={selectedBill}
            />
          )}
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default BillsPage;

"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import { Bill } from "@/types/payment";
import { formatCurrency } from "@/utils/formatters";
import Button from "@/components/Button";
import BillFormModal from "@/components/BillFormModal";
import { useUsers } from "@/hooks/useUsers";
import { fetchBillsByResidentId } from "@/api/bills";
import { useAuth } from "@/context/AuthContext";
import SelectField from "@/components/SelectField";
import Loader from "@/components/Loader";

const BillsPage: React.FC = () => {
  const { user } = useAuth();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [selectedResidentId, setSelectedResidentId] = useState<string>("");
  const { users } = useUsers();

  const isAdmin = user?.role === "admin";

  const fetchBills = useCallback(async () => {
    if (!selectedResidentId) {
      setBills([]);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchBillsByResidentId(selectedResidentId);
      setBills(data);
    } catch (error) {
      console.error("Failed to fetch bills:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedResidentId]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const residentOptions = Object.values(users)
    .filter((user) => user.role === "resident")
    .map((user) => ({
      value: user._id,
      label: `${user.name} ${user.lastName}`,
    }));

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

          <div className="w-full max-w-xs">
            <SelectField
              id="residentId"
              name="residentId"
              label="Select Resident"
              value={selectedResidentId}
              onChange={(e) => setSelectedResidentId(e.target.value)}
              options={residentOptions}
            />
          </div>

          {loading ? (
            <Loader message="Loading..." />
          ) : (
            <Table data={bills} columns={columns} />
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

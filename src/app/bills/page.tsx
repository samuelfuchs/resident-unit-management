"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import { Bill } from "@/types/payment";
import { formatCurrency } from "@/utils/formatters";
import Button from "@/components/Button";
// import BillFormModal from "@/components/BillFormModal";
import BillFormModal from "@/components/BillFormModal";
import { useUsers } from "@/hooks/useUsers";
import { fetchAllBills } from "@/api/bills";

const BillsPage: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const { users } = useUsers();

  const fetchBills = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllBills();
      setBills(data);
    } catch (error) {
      console.error("Failed to fetch bills:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const columns: Column<Bill>[] = [
    {
      header: "Resident",
      accessor: "residentId",
      render: (value) => {
        const user = users[value];
        return user ? `${user.name} ${user.lastName}` : value;
      },
    },
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
  ];

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Bills Management</h1>
            <Button onClick={() => setIsFormModalOpen(true)}>
              Create Bill
            </Button>
          </div>

          <Table data={bills} columns={columns} loading={loading} />

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
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default BillsPage;

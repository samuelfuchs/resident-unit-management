"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import { Bill } from "@/types/bill";
import { formatCurrency } from "@/utils/formatters";
import Button from "@/components/Button";
import { fetchResidentBills } from "@/api/bills";
import { PaymentFormModal } from "@/components/PaymentFormModal";
import { createResidentPaymentIntent } from "@/api/bills";

const MyBillsPage: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const fetchBills = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchResidentBills();
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

  const handlePayBill = async (bill: Bill) => {
    try {
      const response = await createResidentPaymentIntent({
        amount: bill.amount,
        description: bill.description,
        billId: bill._id,
      });
      setClientSecret(response.clientSecret);
      setSelectedBill(bill);
      setIsPaymentModalOpen(true);
    } catch (error) {
      console.error("Failed to create payment intent:", error);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setSelectedBill(null);
    setClientSecret(null);
    fetchBills();
  };

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
      header: "Actions",
      accessor: "id",
      render: (_, bill) => (
        <Button
          onClick={() => handlePayBill(bill)}
          disabled={bill.status === "paid"}
          variant={bill.status === "overdue" ? "danger" : "primary"}
        >
          Pay Now
        </Button>
      ),
    },
  ];

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Bills</h1>
          </div>

          <Table data={bills} columns={columns} />

          {selectedBill && clientSecret && (
            <PaymentFormModal
              isOpen={isPaymentModalOpen}
              onClose={() => {
                setIsPaymentModalOpen(false);
                setSelectedBill(null);
                setClientSecret(null);
              }}
              clientSecret={clientSecret}
              onPaymentSuccess={handlePaymentSuccess}
              amount={selectedBill.amount}
              description={selectedBill.description}
            />
          )}
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default MyBillsPage;

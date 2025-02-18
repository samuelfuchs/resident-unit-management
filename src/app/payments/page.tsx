"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import { PaymentIntent } from "@/types/payment";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Modal";
import { fetchPaymentHistory, cancelPaymentIntent } from "@/api/payments";
import Button from "@/components/Button";
import PaymentFormModal from "@/components/PaymentFormModal";
import { formatCurrency } from "@/utils/formatters";
import { useUsers } from "@/hooks/useUsers";

const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<PaymentIntent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentIntent | null>(
    null
  );
  const [isPaymentFormModalOpen, setIsPaymentFormModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<
    PaymentIntent | undefined
  >();
  const { users, loading: loadingUsers } = useUsers();

  const fetchAndSetPayments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPaymentHistory();
      setPayments(data);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndSetPayments();
  }, [fetchAndSetPayments]);

  const handleDelete = async () => {
    if (!selectedPayment) return;
    try {
      await cancelPaymentIntent(selectedPayment.id);
      await fetchAndSetPayments();
    } catch (error) {
      console.error("Failed to cancel payment:", error);
    }
  };

  const columns: Column<PaymentIntent>[] = [
    {
      header: "User",
      accessor: "metadata.userId" as any,
      render: (_, row) => {
        const userId = row.metadata?.userId;
        const user = users[userId];
        return user ? `${user.name} ${user.lastName}` : userId || "N/A";
      },
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (value) => formatCurrency(value / 100),
    },
    {
      header: "Description",
      accessor: "description",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <span
          className={`capitalize ${
            value === "succeeded"
              ? "text-green-600"
              : value === "canceled"
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {value.replace(/_/g, " ")}
        </span>
      ),
    },
    {
      header: "Created",
      accessor: "created",
      render: (value) => new Date(value * 1000).toLocaleDateString(),
    },
  ];

  const openCreateModal = () => {
    setEditingPayment(undefined);
    setIsPaymentFormModalOpen(true);
  };

  const openEditModal = (payment: PaymentIntent) => {
    setEditingPayment(payment);
    setIsPaymentFormModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Payments</h1>
            <Button onClick={openCreateModal} variant="primary">
              New Payment
            </Button>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <Table
              data={payments}
              columns={columns}
              actions={(row) => (
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(row)}
                    className="text-green-500 hover:text-green-600"
                    disabled={
                      row.status === "succeeded" || row.status === "canceled"
                    }
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPayment(row);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-500 hover:text-red-600"
                    disabled={
                      row.status === "succeeded" || row.status === "canceled"
                    }
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            />
          )}
        </div>

        <Modal
          type="warning"
          title="Cancel Payment"
          description={`Are you sure you want to cancel this payment of ${
            selectedPayment ? formatCurrency(selectedPayment.amount / 100) : ""
          }?`}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />

        <PaymentFormModal
          isOpen={isPaymentFormModalOpen}
          onClose={() => setIsPaymentFormModalOpen(false)}
          onSubmitSuccess={fetchAndSetPayments}
          payment={editingPayment}
        />
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default PaymentsPage;

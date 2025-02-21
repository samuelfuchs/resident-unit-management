"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import { Bill, PaymentIntent } from "@/types/payment";
import { fetchMyPayments, createResidentPaymentIntent } from "@/api/payments";
import { formatCurrency } from "@/utils/formatters";
import Button from "@/components/Button";
import FormModal from "@/components/FormModal";
import { StripeProvider } from "@/components/StripeProvider";
import PaymentForm from "@/components/PaymentForm";

const MyPaymentsPage: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentIntent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // You'll need to create these API endpoints
      const [billsData, paymentsData] = await Promise.all([
        fetchMyBills(),
        fetchMyPayments(),
      ]);
      setBills(billsData);
      setPaymentHistory(paymentsData.payments);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePayBill = async (bill: Bill) => {
    try {
      const response = await createResidentPaymentIntent({
        amount: bill.amount,
        description: bill.description,
        billId: bill.id, 
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
    fetchData();
  };

  const billColumns: Column<Bill>[] = [
    {
      header: "Description",
      accessor: "description",
    },
    {
      header: "Category",
      accessor: "category",
      render: (value) => value.charAt(0).toUpperCase() + value.slice(1),
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
          <div>
            <h2 className="text-xl font-bold mb-4">Pending Bills</h2>
            <Table
              data={bills.filter((b) => b.status !== "paid")}
              columns={billColumns}
            />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Payment History</h2>
            <Table data={paymentHistory} columns={paymentHistoryColumns} />
          </div>

          <FormModal
            isOpen={isPaymentModalOpen}
            onClose={() => {
              setIsPaymentModalOpen(false);
              setSelectedBill(null);
              setClientSecret(null);
            }}
            title={`Pay ${selectedBill?.description}`}
          >
            {clientSecret && (
              <StripeProvider clientSecret={clientSecret}>
                <PaymentForm
                  clientSecret={clientSecret}
                  onSuccess={handlePaymentSuccess}
                />
              </StripeProvider>
            )}
          </FormModal>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default MyPaymentsPage;

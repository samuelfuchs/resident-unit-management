"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Table, { Column } from "@/components/Table";
import { PaymentIntent } from "@/types/payment";
import { fetchMyPayments, createPaymentIntent } from "@/api/payments";
import { formatCurrency } from "@/utils/formatters";
import Button from "@/components/Button";
import FormModal from "@/components/FormModal";
import { StripeProvider } from "@/components/StripeProvider";
import PaymentForm from "@/components/PaymentForm";
import InputField from "@/components/InputField";
import { useAuth } from "@/context/AuthContext";


const MyPaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<PaymentIntent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<"form" | "stripe">("form");
  const { user } = useAuth();

  const fetchAndSetPayments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchMyPayments();
      setPayments(data.payments);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndSetPayments();
  }, [fetchAndSetPayments]);

  const handleInitiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const amountInCents = Math.round(parseFloat(amount));
      const response = await createPaymentIntent({
        amount: amountInCents,
        description,
        userId: user.id,
      });
      setClientSecret(response.clientSecret);
      setPaymentStep("stripe");
    } catch (error) {
      console.error("Failed to create payment intent:", error);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setPaymentStep("form");
    setAmount("");
    setDescription("");
    setClientSecret(null);
    fetchAndSetPayments();
  };

  const columns: Column<PaymentIntent>[] = [
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

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">My Payments</h1>
            <Button onClick={() => setIsPaymentModalOpen(true)}>
              Make a Payment
            </Button>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <Table data={payments} columns={columns} />
          )}

          <FormModal
            isOpen={isPaymentModalOpen}
            onClose={() => {
              setIsPaymentModalOpen(false);
              setPaymentStep("form");
              setClientSecret(null);
            }}
            title={
              paymentStep === "form" ? "Make a Payment" : "Payment Details"
            }
          >
            {paymentStep === "form" ? (
              <form onSubmit={handleInitiatePayment} className="space-y-4">
                <InputField
                  id="amount"
                  name="amount"
                  label="Amount (USD)"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                <InputField
                  id="description"
                  name="description"
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full">
                  Continue to Payment
                </Button>
              </form>
            ) : clientSecret ? (
              <StripeProvider>
                <PaymentForm
                  clientSecret={clientSecret}
                  onSuccess={handlePaymentSuccess}
                />
              </StripeProvider>
            ) : null}
          </FormModal>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default MyPaymentsPage;

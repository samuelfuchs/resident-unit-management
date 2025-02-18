"use client";

import React, { useState, useEffect } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { createPaymentIntent, updatePaymentIntent } from "@/api/payments";
import { PaymentIntent } from "@/types/payment";
import { fetchUsers } from "@/api/users";
import SelectField from "./SelectField";

interface PaymentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  payment?: PaymentIntent;
}

const PaymentFormModal: React.FC<PaymentFormModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  payment,
}) => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    userId: "",
  });
  const [users, setUsers] = useState<Array<{ value: string; label: string }>>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (payment) {
      setFormData({
        amount: (payment.amount / 100).toString(),
        description: payment.description,
        userId: payment.metadata.userId,
      });
    } else {
      setFormData({
        amount: "",
        description: "",
        userId: "",
      });
    }
  }, [payment]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { users: fetchedUsers } = await fetchUsers({});
        setUsers(
          fetchedUsers.map((user: any) => ({
            value: user._id,
            label: `${user.name} ${user.lastName}`,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    loadUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (payment) {
        await updatePaymentIntent(payment.id, {
          amount: (parseFloat(formData.amount) * 100).toString(),
          description: formData.description,
        });
      } else {
        await createPaymentIntent({
          amount: (parseFloat(formData.amount) * 100).toString(),
          userId: formData.userId,
          description: formData.description,
        });
      }
      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to submit payment:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-lg font-bold mb-4">
          {payment ? "Edit Payment" : "Create New Payment"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!payment && (
            <SelectField
              id="userId"
              name="userId"
              label="Resident"
              value={formData.userId}
              onChange={handleChange}
              options={users}
              required
            />
          )}

          <InputField
            id="amount"
            name="amount"
            label="Amount (USD)"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <InputField
            id="description"
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              {payment ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentFormModal;

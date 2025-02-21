"use client";

import React, { useState, useEffect } from "react";
import { Bill } from "@/types/payment";
import FormModal from "@/components/FormModal";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import { useUsers } from "@/hooks/useUsers";
import Button from "./Button";
import { createBill } from "@/api/bills";

interface BillFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  bill?: Bill | null;
}

const BillFormModal: React.FC<BillFormModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  bill,
}) => {
  const { users, loading: loadingUsers } = useUsers();
  const [formData, setFormData] = useState({
    residentId: "",
    amount: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    if (bill) {
      setFormData({
        residentId: bill.residentId,
        amount: (bill.amount / 100).toString(),
        description: bill.description,
        dueDate: new Date(bill.dueDate).toISOString().split("T")[0],
      });
    } else {
      setFormData({
        residentId: "",
        amount: "",
        description: "",
        dueDate: "",
      });
    }
  }, [bill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBill({
        residentId: formData.residentId,
        amount: parseFloat(formData.amount) * 100,
        description: formData.description,
        dueDate: formData.dueDate,
      });

      onSubmitSuccess();
    } catch (error) {
      console.error("Failed to submit bill:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const residentOptions = Object.values(users)
    .filter((user) => user.role === "resident")
    .map((user) => ({
      value: user._id,
      label: `${user.name} ${user.lastName}`,
    }));

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={bill ? "Edit Bill" : "Create New Bill"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <SelectField
          id="residentId"
          name="residentId"
          label="Resident"
          value={formData.residentId}
          onChange={handleChange}
          options={residentOptions}
          required
          disabled={loadingUsers}
        />

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

        <InputField
          id="dueDate"
          name="dueDate"
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{bill ? "Update Bill" : "Create Bill"}</Button>
        </div>
      </form>
    </FormModal>
  );
};

export default BillFormModal;

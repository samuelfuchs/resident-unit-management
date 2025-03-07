"use client";

import React, { useState, useEffect, useRef } from "react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import Button from "@/components/Button";
import { createUser, updateUser } from "@/api/users";
import { User } from "@/types/user";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  user?: Partial<User>;
  mode?: "view" | "edit" | "create";
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  user,
  mode = "create",
}) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    role: "resident",
    address: "",
    unitNumber: "",
    status: "active",
    password: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);

  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
  const isCreateMode = mode === "create";

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      !hasUnsavedChanges
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    if ((isViewMode || isCreateMode) && !hasUnsavedChanges) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isViewMode, isCreateMode, hasUnsavedChanges]);

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        role: "resident",
        address: "",
        unitNumber: "",
        status: "active",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user?._id) {
        await updateUser(user._id, formData);
      } else {
        await createUser(formData);
      }
      setHasUnsavedChanges(false);
      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6"
      >
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
          {isCreateMode && "Create New User"}
          {isEditMode && "Edit User"}
          {isViewMode && "View User"}
        </h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!isViewMode) {
              handleSubmit(e);
            }
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="name"
              name="name"
              label="Name"
              value={formData.name || ""}
              onChange={handleChange}
              disabled={isViewMode}
              required={!isViewMode}
            />
            <InputField
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formData.lastName || ""}
              onChange={handleChange}
              disabled={isViewMode}
              required={!isViewMode}
            />
          </div>
          <InputField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
            disabled={isViewMode}
            required={!isViewMode}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="phone"
              name="phone"
              label="Phone"
              value={formData.phone || ""}
              onChange={handleChange}
              disabled={isViewMode}
            />
            <SelectField
              id="role"
              name="role"
              label="Role"
              value={formData.role || "resident"}
              onChange={handleChange}
              options={[
                { value: "admin", label: "Admin" },
                { value: "receptionist", label: "Receptionist" },
                { value: "resident", label: "Resident" },
              ]}
              disabled={isViewMode}
            />
          </div>

          {isCreateMode && (
            <InputField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formData.password || ""}
              onChange={handleChange}
              required
            />
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>
              {isViewMode ? "Close" : "Cancel"}
            </Button>
            {!isViewMode && (
              <>
                <Button type="submit">
                  {isCreateMode ? "Create" : "Save"}
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;

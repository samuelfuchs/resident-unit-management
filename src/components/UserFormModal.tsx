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
  const modalRef = useRef<HTMLDivElement>(null);

  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
  const isCreateMode = mode === "create";

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isViewMode) return;
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isViewMode, onClose]);

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (user?._id) {
        await updateUser(user._id, formData);
      } else {
        await createUser(formData);
      }
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
        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6"
      >
        <h2 className="text-lg font-bold mb-4">
          {isCreateMode && "Criar Novo Usuário"}
          {isEditMode && "Editar Usuário"}
          {isViewMode && "Visualizar Usuário"}
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
          <InputField
            id="name"
            name="name"
            label="Nome"
            value={formData.name || ""}
            onChange={handleChange}
            disabled={isViewMode}
            required={!isViewMode}
          />
          <InputField
            id="lastName"
            name="lastName"
            label="Sobrenome"
            value={formData.lastName || ""}
            onChange={handleChange}
            disabled={isViewMode}
            required={!isViewMode}
          />
          <InputField
            id="email"
            name="email"
            label="E-mail"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
            disabled={isViewMode}
            required={!isViewMode}
          />
          <InputField
            id="phone"
            name="phone"
            label="Telefone"
            value={formData.phone || ""}
            onChange={handleChange}
            disabled={isViewMode}
          />
          <SelectField
            id="role"
            name="role"
            label="Função"
            value={formData.role || "resident"}
            onChange={handleChange}
            options={[
              { value: "admin", label: "Admin" },
              { value: "receptionist", label: "Recepcionista" },
              { value: "resident", label: "Residente" },
            ]}
            disabled={isViewMode}
          />
          {isCreateMode && (
            <InputField
              id="password"
              name="password"
              label="Senha"
              type="password"
              value={formData.password || ""}
              onChange={handleChange}
              required
            />
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>
              {isViewMode ? "Fechar" : "Cancelar"}
            </Button>
            {!isViewMode && (
              <>
                <Button type="submit">
                  {isCreateMode ? "Criar" : "Salvar"}
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

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import { User } from "@/types/user";

const ResidentFormPage: React.FC = () => {
  const router = useRouter();
  const [isNew, setIsNew] = useState(false);
  const [formData, setFormData] = useState<User>({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    unitNumber: "",
    createdAt: "",
    profilePicture: "",
    status: "active",
    role: "resident",
    emergencyContacts: [],
    familyMembers: [],
  });

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    if (id === "new") {
      setIsNew(true);
    } else {
      fetchResident(id);
    }
  }, []);

  const fetchResident = async (id: string | undefined) => {
    const mockResident: User = {
      id: id || "1",
      name: "João",
      lastName: "Silva",
      email: "joao.silva@email.com",
      phone: "555-1234",
      address: "Rua das Flores, 123",
      unitNumber: "101",
      createdAt: "2023-10-01",
      profilePicture: "",
      status: "active",
      role: "resident",
      emergencyContacts: [],
      familyMembers: [],
    };
    setFormData(mockResident);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNew) {
      console.log("Creating new resident:", formData);
    } else {
      console.log("Updating resident:", formData);
    }
    router.push("/residents");
  };

  const getInitials = (name: string, lastName: string): string => {
    return `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AuthLayout>
        <div className="bg-gray-100">
          <main className="mx-auto p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                {formData.profilePicture ? (
                  <img
                    src={formData.profilePicture}
                    alt={`${formData.name} ${formData.lastName}`}
                    className="h-20 w-20 rounded-full shadow-lg"
                  />
                ) : (
                  <div className="h-20 w-20 bg-gray-300 rounded-full shadow-lg flex items-center justify-center">
                    <span className="text-gray-500 text-2xl font-bold">
                      {getInitials(formData.name, formData.lastName)}
                    </span>
                  </div>
                )}
                <div className="ml-6">
                  <h2 className="text-2xl font-bold">
                    {isNew
                      ? "Novo Residente"
                      : `${formData.name} ${formData.lastName}`}
                  </h2>
                  <p className="text-gray-500 mt-2">
                    {isNew ? "Criação" : "Edição"}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Telefone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Endereço
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Unidade
                  </label>
                  <input
                    type="text"
                    name="unitNumber"
                    value={formData.unitNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {isNew ? "Criar" : "Salvar"}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default ResidentFormPage;
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import { User } from "@/types/user";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import InputField from "@/components/InputField";

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
    zipCode: 0,
    profilePicture: "",
    status: "active",
    role: "resident",
    emergencyContacts: [],
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
    <ProtectedRoute>
      <AuthLayout>
        <div className="bg-gray-100">
          <main className="mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">
              {isNew ? "Criar novo Residente" : "Editar Residente"}
            </h1>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex justify-between">
                <div className="col-span-full mb-4">
                  <label
                    htmlFor="photo"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Foto
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <UserCircleIcon
                      aria-hidden="true"
                      className="size-12 text-gray-300"
                    />
                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Mudar foto
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {isNew ? "Criar" : "Salvar"}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-4">
                <InputField
                  id="name"
                  name="name"
                  label="Nome"
                  placeholder="Digite apenas o primeiro nome"
                  value={formData.name}
                  onChange={handleChange}
                />

                <InputField
                  id="lastName"
                  name="lastName"
                  label="Sobrenome"
                  placeholder="Digite o sobrenome"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <InputField
                id="email"
                name="email"
                type="email"
                label="E-mail"
                placeholder="Digite o e-mail"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-4">
                <InputField
                  id="phone"
                  name="phone"
                  type="tel"
                  label="Telefone"
                  placeholder="Digite o telefone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <div className="sm:col-span-1">
                  <label
                    htmlFor="role"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Função
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="role"
                      name="role"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option>Admin</option>
                      <option>Recepção</option>
                      <option>Residente</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                </div>
                <InputField
                  id="unitNumber"
                  name="unitNumber"
                  label="Unidade"
                  placeholder="Digite o número da unidade"
                  value={formData.unitNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="border-b border-gray-900/10 pb-6 mb-4"></div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10">
                <InputField
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  label="CEP"
                  placeholder="Digite o CEP"
                  value={String(formData.zipCode)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, zipCode: parseInt(value) || 0 });
                  }}
                />
              </div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10">
                <InputField
                  id="address"
                  name="address"
                  label="Endereço"
                  placeholder="Digite o endereço"
                  value={formData.address}
                  onChange={handleChange}
                />
                <InputField
                  id="city"
                  name="city"
                  label="Cidade"
                  placeholder="Digite a cidade"
                  value={formData.city || ""}
                  onChange={handleChange}
                />
                <InputField
                  id="state"
                  name="state"
                  label="Estado"
                  placeholder="Digite o estado"
                  value={formData.state || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="border-b border-gray-900/10 pb-6 mb-4"></div>
              <div className="border-b border-gray-900/10 pb-6 mb-4">
                <label
                  htmlFor="emergency-contact"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Contato de Emergência
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <select
                    id="emergency-contact"
                    name="emergencyContact"
                    className="block w-full rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option defaultValue="" disabled selected>
                      Selecionar contato de emergência existente
                    </option>
                    <option value="1">Contato 1</option>
                    <option value="2">Contato 2</option>
                    <option value="3">Contato 3</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => console.log("Add new emergency contact")}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Adicionar Novo
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default ResidentFormPage;
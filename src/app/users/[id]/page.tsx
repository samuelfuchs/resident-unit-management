"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import { User } from "@/types/user";
import { createUser, updateUser } from "@/api/users";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import Button from "@/components/Button";

const UserFormPage: React.FC = () => {
  const router = useRouter();
  const [isNew, setIsNew] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({
    name: "",
    password: "",
    lastName: "",
    email: "",
    phone: "",
    role: "resident",
    address: "",
    unitNumber: "",
    status: "active",
  });

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    if (id === "new") {
      setIsNew(true);
    } else {
      fetchUser(id);
    }
  }, []);

  const fetchUser = async (id: string | undefined) => {
    // const user = mockUsers.find((user) => user.id === id);
    // if (user) {
    //   setFormData(user);
    // }
    try {
      if (!id) return;

      const response = await fetch(`/api/users/${id}`);
      const user = await response.json();
      if (user) {
        setFormData(user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (isNew) {
    //   console.log("Creating new user:", formData);
    // } else {
    //   console.log("Updating user:", formData);
    // }
    // router.push("/users");
    try {
      if (isNew) {
        await createUser(formData as User);
        console.log("User created successfully!");
      } else {
        await updateUser(formData._id as string, formData as User);
        console.log("User updated successfully!");
      }
      router.push("/users");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">
            {isNew ? "Criar Novo Usuário" : "Editar Usuário"}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <InputField
                  id="name"
                  name="name"
                  label="Nome"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="Digite o nome"
                  required
                />
                {/* <label className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                /> */}
              </div>
              <div>
                {/* <label className="block text-sm font-medium text-gray-700">
                  Sobrenome
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                /> */}
                <InputField
                  id="lastName"
                  name="lastName"
                  label="Sobrenome"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  placeholder="Digite o sobrenome"
                  required
                />
              </div>
            </div>
            <div>
              {/* <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              /> */}
              <div>
                <InputField
                  id="email"
                  name="email"
                  label="E-mail"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  placeholder="Digite o e-mail"
                  required
                />
              </div>
              {isNew && (
                <InputField
                  id="password"
                  name="password"
                  label="Senha"
                  type="password"
                  placeholder="Digite a senha"
                  value={formData.password || ""}
                  onChange={handleChange}
                />
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                {/* <label className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                /> */}
                <InputField
                  id="phone"
                  name="phone"
                  label="Telefone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  placeholder="Digite o telefone"
                />
              </div>
              <div>
                {/* <label className="block text-sm font-medium text-gray-700">
                  Unidade
                </label>
                <input
                  type="text"
                  name="unitNumber"
                  value={formData.unitNumber || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                /> */}
                <InputField
                  id="unitNumber"
                  name="unitNumber"
                  label="Unidade"
                  value={formData.unitNumber || ""}
                  onChange={handleChange}
                  placeholder="Digite a unidade"
                />
              </div>
            </div>
            <div>
              {/* <label className="block text-sm font-medium text-gray-700">
                Endereço
              </label>
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              /> */}
              <InputField
                id="address"
                name="address"
                label="Endereço"
                value={formData.address || ""}
                onChange={handleChange}
                placeholder="Digite o endereço"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                {/* <label className="block text-sm font-medium text-gray-700">
                  Função
                </label>
                <select
                  name="role"
                  value={formData.role || "resident"}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="admin">Admin</option>
                  <option value="receptionist">Recepcionista</option>
                  <option value="resident">Residente</option>
                </select> */}
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
                />
              </div>
              <div>
                {/* <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status || "active"}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select> */}
                <SelectField
                  id="status"
                  name="status"
                  label="Status"
                  value={formData.status || "active"}
                  onChange={handleChange}
                  options={[
                    { value: "active", label: "Ativo" },
                    { value: "inactive", label: "Inativo" },
                  ]}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">{isNew ? "Criar" : "Salvar"}</Button>
            </div>
          </form>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default UserFormPage;

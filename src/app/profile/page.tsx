"use client";

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { RoleTranslations } from "@/utils/roleTranslations";
import AuthLayout from "@/components/AuthLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  if (!user) return <p className="text-center mt-6">Loading...</p>;

  const getInitials = (name: string, lastName: string): string => {
    return `${name?.charAt(0).toUpperCase()}${lastName
      ?.charAt(0)
      .toUpperCase()}`;
  };

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="bg-gray-100">
          <main className="mx-auto p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {formData?.profilePicture ? (
                    <img
                      src={formData.profilePicture}
                      alt={`${formData?.name} ${formData?.lastName}`}
                      className="h-20 w-20 rounded-full shadow-lg"
                    />
                  ) : (
                    <div className="h-20 w-20 bg-gray-300 rounded-full shadow-lg flex items-center justify-center">
                      <span className="text-gray-500 text-2xl font-bold">
                        {getInitials(formData?.name, formData?.lastName)}
                      </span>
                    </div>
                  )}
                  <div className="ml-6">
                    <h2 className="text-2xl font-bold">
                      {formData?.name} {formData?.lastName}
                    </h2>
                    <p className="text-gray-500 mt-2">
                      {
                        RoleTranslations[
                          formData?.role as keyof typeof RoleTranslations
                        ]
                      }
                    </p>
                  </div>
                </div>

                <InputField
                  id="createdAt"
                  label="Created at"
                  name="createdAt"
                  onChange={() => {}}
                  value={formData?.createdAt || ""}
                  disabled
                />
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-4">
                <InputField
                  id="name"
                  name="name"
                  label="Name"
                  placeholder="Enter only the first name"
                  value={formData?.name}
                  onChange={() => {}}
                  disabled
                />
                <InputField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter only the last name"
                  value={formData?.lastName}
                  onChange={() => {}}
                  disabled
                />
              </div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-4">
                <InputField
                  id="email"
                  label="E-mail"
                  name="email"
                  value={formData?.email}
                  disabled={!isEditing}
                  onChange={() => {}}
                />
                <InputField
                  id="phone"
                  label="Phone"
                  name="phone"
                  value={formData?.phone || ""}
                  disabled={!isEditing}
                  onChange={() => {}}
                  placeholder="Not informed"
                />
                <InputField
                  id="address"
                  label="Address"
                  name="address"
                  value={formData?.address || ""}
                  disabled={!isEditing}
                  onChange={() => {}}
                  placeholder="Not informed"
                />
                <SelectField
                  id="unitNumber"
                  name="unitNumber"
                  label="Unidade"
                  value={formData?.unitNumber}
                  onChange={() => {}}
                  options={[
                    { value: "101", label: "Casa 01" },
                    { value: "102", label: "Apartamento 102" },
                    { value: "103", label: "Apartamento 103" },
                  ]}
                  placeholder="Selecione uma unidade"
                />
              </div>
              <div className="border-b border-gray-900/10 pb-6 mb-4"></div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10 mb-4"></div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10 mb-4">
                <InputField
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  label="CEP"
                  placeholder="Digite o CEP"
                  value={String(formData?.zipCode)}
                  onChange={() => {}}
                  disabled
                />
              </div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10">
                <InputField
                  id="address"
                  name="address"
                  label="Address"
                  placeholder="Digite o endereço"
                  value={formData?.address}
                  onChange={() => {}}
                  disabled
                />
                <InputField
                  id="city"
                  name="city"
                  label="City"
                  placeholder="Digite a cidade"
                  value={formData?.city || ""}
                  onChange={() => {}}
                  disabled
                />
                <InputField
                  id="state"
                  name="state"
                  label="State"
                  placeholder="Digite o estado"
                  value={formData?.state || ""}
                  onChange={() => {}}
                  disabled
                />
              </div>

              {formData?.emergencyContacts?.length > 0 && (
                <div className="mt-6">
                  <p className="text-gray-600 font-semibold">
                    Emergency Contacts:
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default ProfilePage;
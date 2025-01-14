"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import { Unit } from "@/types/unit";
import { mockUnits } from "@/mocks/units"; 

const UnitFormPage: React.FC = () => {
  const router = useRouter();
  const [isNew, setIsNew] = useState(false);
  const [formData, setFormData] = useState<Unit>({
    id: "",
    number: "",
    floor: 0,
    squareFootage: 0,
    type: "",
    parkingSpots: [],
  });

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    if (id === "new") {
      setIsNew(true);
    } else {
      fetchUnit(id);
    }
  }, []);

  const fetchUnit = (id: string | undefined) => {
    const unit = mockUnits.find((unit) => unit.id === id); // Replace with an API call in production.
    if (unit) setFormData(unit);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNew) {
      console.log("Creating new unit:", formData);
    } else {
      console.log("Updating unit:", formData);
    }
    router.push("/units");
  };

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="bg-gray-100">
          <main className="mx-auto p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold mb-6">
                {isNew ? "Criar Nova Unidade" : "Editar Unidade"}
              </h1>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Número da Unidade
                  </label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) =>
                      setFormData({ ...formData, number: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Andar
                  </label>
                  <input
                    type="number"
                    value={formData.floor}
                    onChange={(e) =>
                      setFormData({ ...formData, floor: +e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tamanho (m²)
                  </label>
                  <input
                    type="number"
                    value={formData.squareFootage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        squareFootage: +e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo
                  </label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Proprietário (ID)
                  </label>
                  {/* <input
                    type="text"
                    value={formData.owner}
                    onChange={(e) =>
                      setFormData({ ...formData, owner: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  /> */}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Vagas de Estacionamento (Separar por vírgulas)
                  </label>
                  <input
                    type="text"
                    value={formData.parkingSpots.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        parkingSpots: e.target.value
                          .split(",")
                          .map((s) => s.trim()),
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
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

export default UnitFormPage;

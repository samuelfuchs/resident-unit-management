"use client";

import React, { useState, useEffect, useRef } from "react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import Button from "@/components/Button";
import { createUnit, updateUnit } from "@/api/units";
import { User } from "@/types/user";
import AsyncSelect from "react-select/async";
import { fetchUsers } from "@/api/users";

export interface Unit {
  _id: string;
  number: string;
  floor?: number;
  squareFootage: number;
  type: UnitType;
  owner: User[];
  leaseAgreement?: string;
  parkingSpots?: string[];
  tenant?: User[] | null;
}

export enum UnitType {
  Residential = "Residential",
  Commercial = "Commercial",
  House = "House",
  Apartment = "Apartment",
  Office = "Office",
}

interface UnitFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  unit?: Partial<Unit>;
  mode?: "view" | "edit" | "create";
}

const UnitFormModal: React.FC<UnitFormModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  unit,
  mode = "create",
}) => {
  const [selectedOwners, setSelectedOwners] = useState<
    { value: string; label: string }[]
  >([]);
  console.log("unit", unit);

  const [selectedTenants, setSelectedTenants] = useState<
    { value: string; label: string }[]
  >([]);

  const [formData, setFormData] = useState<Partial<Unit>>({
    number: "",
    floor: 0,
    squareFootage: 0,
    type: UnitType.Residential,
    owner: [],
    parkingSpots: [],
    tenant: [],
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
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
  const fetchTenantOptions = async (inputValue: string) => {
    try {
      const { users } = await fetchUsers({
        search: inputValue,
        page: 1,
        limit: 10,
        sortField: "name",
        sortOrder: "asc",
      });
      return users.map((user: any) => ({
        value: user._id,
        label: `${user.name} ${user.lastName}`,
      }));
    } catch (error) {
      console.error("Failed to fetch tenant options:", error);
      return [];
    }
  };

  const fetchOwnerOptions = async (inputValue: string) => {
    try {
      const response = await fetchUsers({
        search: inputValue,
        page: 1,
        limit: 10,
        sortField: "name",
        sortOrder: "asc",
      });
      return response.users.map((user: any) => ({
        value: user._id,
        label: `${user.name} ${user.lastName}`,
      }));
    } catch (error) {
      console.error("Failed to fetch owner options:", error);
      return [];
    }
  };

  useEffect(() => {
    if (unit) {
      setFormData(unit);

      // Populate selectedOwners state
      if (unit.owner) {
        setSelectedOwners(
          unit.owner.map((user) => ({
            value: user._id,
            label: `${user.name} ${user.lastName}`,
          }))
        );
      }

      // Populate selectedTenants state
      if (unit.tenant) {
        setSelectedTenants(
          unit.tenant.map((user) => ({
            value: user._id,
            label: `${user.name} ${user.lastName}`,
          }))
        );
      }
    } else {
      setFormData({
        number: "",
        floor: 0,
        squareFootage: 0,
        type: UnitType.Residential,
        owner: [],
        parkingSpots: [],
        tenant: [],
      });
      setSelectedOwners([]);
      setSelectedTenants([]);
    }
  }, [unit]);

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
    if (unit) {
      setFormData(unit);
    } else {
      setFormData({
        number: "",
        floor: 0,
        squareFootage: 0,
        type: UnitType.Residential,
        owner: [],
        parkingSpots: [],
        tenant: [],
      });
    }
  }, [unit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      number: formData.number || "",
      floor: formData.floor || 0,
      squareFootage: formData.squareFootage || 0,
      type: formData.type || UnitType.Residential,
      owner: selectedOwners.map((owner) => owner.value),
      parkingSpots: formData.parkingSpots || [],
      tenant: selectedTenants.map((tenant) => tenant.value),
    };
    try {
      if (unit?._id) {
        await updateUnit(unit._id, payload);
      } else {
        await createUnit(payload);
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
        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6"
      >
        <h2 className="text-lg font-bold mb-4">
          {isCreateMode && "Criar Nova Unidade"}
          {isEditMode && "Editar Unidade"}
          {isViewMode && "Visualizar Unidade"}
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
            id="number"
            name="number"
            label="Número"
            value={formData.number || ""}
            onChange={handleChange}
            disabled={isViewMode}
            required={!isViewMode}
          />
          <InputField
            id="floor"
            name="floor"
            label="Andar"
            type="number"
            value={formData.floor?.toString() || ""}
            onChange={handleChange}
            disabled={isViewMode}
          />
          <InputField
            id="squareFootage"
            name="squareFootage"
            label="Tamanho (m²)"
            type="number"
            value={formData.squareFootage?.toString() || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                squareFootage: parseInt(e.target.value, 10) || 0,
              }))
            }
            disabled={isViewMode}
            required={!isViewMode}
          />
          <SelectField
            id="type"
            name="type"
            label="Tipo"
            value={formData.type || UnitType.Residential}
            onChange={handleChange}
            options={Object.values(UnitType).map((type) => ({
              value: type,
              label: type,
            }))}
            disabled={isViewMode}
          />

          <div>
            <label
              htmlFor="owner-select"
              className="block text-sm font-medium text-gray-700"
            >
              Proprietário
            </label>
            <AsyncSelect
              isMulti
              cacheOptions
              defaultOptions
              loadOptions={fetchOwnerOptions}
              value={selectedOwners}
              onChange={(newValue) => setSelectedOwners([...newValue])}
              isDisabled={isViewMode}
              placeholder="Search and select owners..."
            />
          </div>
          <div>
            <label
              htmlFor="tenant-select"
              className="block text-sm font-medium text-gray-700"
            >
              Inquilinos
            </label>
            <AsyncSelect
              isMulti
              cacheOptions
              defaultOptions
              loadOptions={fetchTenantOptions}
              value={selectedTenants}
              onChange={(newValue) => setSelectedTenants([...newValue])}
              isDisabled={isViewMode}
              placeholder="Search and select tenants..."
            />
          </div>
          <InputField
            id="parkingSpots"
            name="parkingSpots"
            label="Vagas de Estacionamento"
            value={(formData.parkingSpots || []).join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                parkingSpots: e.target.value
                  .split(",")
                  .map((spot) => spot.trim()),
              }))
            }
            disabled={isViewMode}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>
              {isViewMode ? "Fechar" : "Cancelar"}
            </Button>
            {!isViewMode && (
              <Button type="submit">{isCreateMode ? "Criar" : "Salvar"}</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnitFormModal;

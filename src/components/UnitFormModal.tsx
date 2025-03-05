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
  const modalRef = useRef<HTMLDivElement>(null);
  const isViewMode = mode === "view";
  const isCreateOrEditMode = mode === "create" || mode === "edit";

  useEffect(() => {
    if (unit) {
      setFormData(unit);
      setSelectedOwners(
        unit.owner?.map((user) => ({
          value: user._id,
          label: `${user.name} ${user.lastName}`,
        })) || []
      );
      setSelectedTenants(
        unit.tenant?.map((user) => ({
          value: user._id,
          label: `${user.name} ${user.lastName}`,
        })) || []
      );
    } else {
      resetForm();
    }
  }, [unit]);

  const resetForm = () => {
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
  };

  const isFormValid =
    formData.number &&
    formData.floor !== undefined &&
    formData.squareFootage !== undefined &&
    formData.type &&
    selectedOwners.length > 0;

  const fetchOptions = async (
    inputValue: string,
    roleFilter?: string
  ): Promise<{ value: string; label: string }[]> => {
    try {
      const { users } = await fetchUsers({
        search: inputValue,
        page: 1,
        limit: 10,
        sortField: "name",
        sortOrder: "asc",
        role: roleFilter,
      });
      return users.map((user: User) => ({
        value: user._id,
        label: `${user.name} ${user.lastName}`,
      }));
    } catch (error) {
      console.error("Failed to fetch options:", error);
      return [];
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
    const payload = {
      number: formData.number || "",
      floor: formData.floor ?? 0,
      squareFootage: formData.squareFootage ?? 0,
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
      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-6"
      >
        <h2 className="text-lg font-bold mb-4 dark:text-gray-200">
          {isCreateOrEditMode
            ? mode === "create"
              ? "Create New Unit"
              : "Edit Unit"
            : "View Unit"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="number"
              name="number"
              label="Number"
              value={formData.number || ""}
              onChange={handleChange}
              disabled={isViewMode}
              required={!isViewMode}
            />
            <InputField
              id="floor"
              name="floor"
              label="Floor"
              type="number"
              value={formData.floor?.toString() || ""}
              onChange={handleChange}
              disabled={isViewMode}
              required={!isViewMode}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="squareFootage"
              name="squareFootage"
              label="Size (m²)"
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
              label="Type"
              value={formData.type || UnitType.Residential}
              onChange={handleChange}
              options={Object.values(UnitType).map((type) => ({
                value: type,
                label: type,
              }))}
              disabled={isViewMode}
              required
            />
          </div>

          <div>
            <label
              htmlFor="owner-select"
              className="block text-sm font-medium mb-2 dark:text-gray-300"
            >
              Owner *
            </label>
            <AsyncSelect
              isMulti
              cacheOptions
              defaultOptions
              loadOptions={(input) => fetchOptions(input)}
              value={selectedOwners}
              onChange={(value) => setSelectedOwners([...value])}
              isDisabled={isViewMode}
              placeholder="Select the owners"
              className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
          </div>

          <div>
            <label
              htmlFor="tenant-select"
              className="block text-sm font-medium mb-2 dark:text-gray-300"
            >
              Tenants
            </label>
            <AsyncSelect
              isMulti
              cacheOptions
              defaultOptions
              loadOptions={(input) => fetchOptions(input)}
              value={selectedTenants}
              onChange={(value) => setSelectedTenants([...value])}
              isDisabled={isViewMode}
              placeholder="Select the tenants"
              className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
          </div>
          <InputField
            id="parkingSpots"
            name="parkingSpots"
            label="Parking Spots"
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
              {isViewMode ? "Close" : "Cancel"}
            </Button>
            {isCreateOrEditMode && (
              <Button type="submit" disabled={!isFormValid}>
                {mode === "create" ? "Create" : "Save"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnitFormModal;
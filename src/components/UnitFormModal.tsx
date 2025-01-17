"use client";

import React, { useState, useEffect, useRef } from "react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import Button from "@/components/Button";
import { createUnit, updateUnit } from "@/api/units";
import { Unit, UnitType } from "@/types/unit";
import { User } from "@/types/user";

interface UnitFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  unit?: Partial<Unit>;
  mode?: "view" | "edit" | "create";
  availableUsers: User[];
}

const UnitFormModal: React.FC<UnitFormModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  unit,
  mode = "create",
  availableUsers,
}) => {
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
      owner: (formData.owner || []).map((user: User) => user._id),
      parkingSpots: formData.parkingSpots || [],
      tenant: (formData.tenant || []).map((user: User) => user._id),
    };

    try {
      if (unit?.id) {
        await updateUnit(unit.id, payload);
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
            required={!isViewMode}
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
                squareFootage: parseInt(e.target.value, 10) || 0, // Parse back to number
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
          <SelectField
            id="owner"
            name="owner"
            label="Proprietário"
            value={(formData.owner || []).map((user: User) => user._id)}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                owner: Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                ) as unknown as User[],
              }))
            }
            options={availableUsers.map((user) => ({
              value: user._id,
              label: `${user.name} ${user.lastName}`,
            }))}
            disabled={isViewMode}
            isMulti
          />
          <SelectField
            id="tenant"
            name="tenant"
            label="Inquilino"
            value={(formData.tenant || []).map((user: User) => user._id)}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                tenant: Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                ) as unknown as User[],
              }))
            }
            options={availableUsers.map((user) => ({
              value: user._id,
              label: `${user.name} ${user.lastName}`,
            }))}
            disabled={isViewMode}
            isMulti
          />
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

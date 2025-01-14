"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import { Notification } from "@/types/notification";
import { useAuth } from "@/context/AuthContext";
import { mockNotifications } from "@/mocks/notifications";

const NotificationFormPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [notification, setNotification] = useState<Partial<Notification>>({
    title: "",
    message: "",
    type: "general",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();

    if (id && id !== "new") {
      setIsEditing(true);
      const existingNotification = mockNotifications.find(
        (notif) => notif.id === id
      );
      if (existingNotification) {
        setNotification(existingNotification);
      } else {
        router.push("/notifications");
      }
    }
  }, [router]);

  const handleInputChange = (
    field: keyof Notification,
    value: string | Partial<Notification["recipient"]>
  ) => {
    setNotification((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.role === "receptionist" && isEditing) {
      alert("Recepcionistas não podem editar notificações.");
      return;
    }
    if (isEditing) {
      console.log("Updated Notification:", notification);
    } else {
      console.log("Created Notification:", notification);
    }
    router.push("/notifications");
  };

  if (user?.role === "resident") {
    router.push("/unauthorized");
    return null;
  }

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">
            {isEditing ? "Editar Notificação" : "Criar Notificação"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                type="text"
                value={notification.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mensagem
              </label>
              <textarea
                value={notification.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Notificação
              </label>
              <select
                value={notification.type}
                onChange={(e) =>
                  handleInputChange(
                    "type",
                    e.target.value as Notification["type"]
                  )
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              >
                <option value="general">Geral</option>
                <option value="mail">Correio</option>
                <option value="critical">Crítica</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Destinatário
              </label>
              <input
                type="text"
                value={notification.recipient?.name || ""}
                onChange={(e) =>
                  handleInputChange("recipient", {
                    ...notification.recipient,
                    name: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Nome do destinatário"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push("/notifications")}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`px-4 py-2 text-white rounded ${
                  isEditing
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isEditing ? "Salvar Alterações" : "Criar Notificação"}
              </button>
            </div>
          </form>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default NotificationFormPage;

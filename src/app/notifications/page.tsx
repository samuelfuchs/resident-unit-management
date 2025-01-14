"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import Pagination from "@/components/Pagination";
import { mockNotifications } from "@/mocks/notifications";
import { translateNotificationType } from "@/utils/notificationTranslations";
import { Notification } from "@/types/notification";
import { useAuth } from "@/context/AuthContext";
import Modal from "@/components/Modal";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"received" | "sent">("received");

  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const [currentPageReceived, setCurrentPageReceived] = useState(1);
  const [currentPageSent, setCurrentPageSent] = useState(1);
  const rowsPerPage = 10;

  // const userNotifications = mockNotifications.filter(
  //   (notif) => notif.recipient.id === user?.id
  // );
  // const sentNotifications = mockNotifications.filter(
  //   (notif) => notif.sender.id === user?.id
  // );

  const paginate = (notifications: Notification[], page: number) => {
    const startIndex = (page - 1) * rowsPerPage;
    return notifications.slice(startIndex, startIndex + rowsPerPage);
  };

  // const paginatedReceived = paginate(userNotifications, currentPageReceived);
  // const paginatedSent = paginate(sentNotifications, currentPageSent);

  // const totalPagesReceived = Math.ceil(userNotifications.length / rowsPerPage);
  // const totalPagesSent = Math.ceil(sentNotifications.length / rowsPerPage);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  const typeStyles = {
    general: "bg-blue-100 text-blue-700",
    mail: "bg-green-100 text-green-700",
    critical: "bg-red-100 text-red-700",
  };

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-6">Notificações</h1>
            {user?.role !== "resident" && (
              <button
                onClick={() => router.push("/notifications/new")}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Nova Notificação
              </button>
            )}
          </div>

          <div className="mb-4 flex border-b">
            <button
              className={`px-4 py-2 ${
                activeTab === "received"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("received")}
            >
              Recebidas
            </button>
            {user?.role !== "resident" && (
              <button
                className={`px-4 py-2 ${
                  activeTab === "sent"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("sent")}
              >
                Enviadas
              </button>
            )}
          </div>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default NotificationsPage;
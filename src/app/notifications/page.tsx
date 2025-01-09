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

const NotificationsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"received" | "sent">("received");

  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const [currentPageReceived, setCurrentPageReceived] = useState(1);
  const [currentPageSent, setCurrentPageSent] = useState(1);
  const rowsPerPage = 10;

  const userNotifications = mockNotifications.filter(
    (notif) => notif.recipient.id === user?.id
  );
  const sentNotifications = mockNotifications.filter(
    (notif) => notif.sender.id === user?.id
  );

  const paginate = (notifications: Notification[], page: number) => {
    const startIndex = (page - 1) * rowsPerPage;
    return notifications.slice(startIndex, startIndex + rowsPerPage);
  };

  const paginatedReceived = paginate(userNotifications, currentPageReceived);
  const paginatedSent = paginate(sentNotifications, currentPageSent);

  const totalPagesReceived = Math.ceil(userNotifications.length / rowsPerPage);
  const totalPagesSent = Math.ceil(sentNotifications.length / rowsPerPage);

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
          <h1 className="text-2xl font-bold mb-6">Notificações</h1>
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

          <ul className="space-y-4">
            {(activeTab === "received" ? paginatedReceived : paginatedSent).map(
              (notif) => (
                <li
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer ${
                    notif.readAt ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <div className="truncate">
                    <h2 className="text-sm font-bold">{notif.title}</h2>
                    <p className="text-xs text-gray-600 truncate w-64">
                      {notif.message}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        typeStyles[notif.type]
                      }`}
                    >
                      {translateNotificationType(notif.type)}
                    </span>
                    <p className="text-xs text-gray-500">
                      {new Date(notif.createdAt).toLocaleString()}
                    </p>
                  </div>
                </li>
              )
            )}
          </ul>

          {selectedNotification && (
            <Modal
              type="success"
              title={selectedNotification.title}
              description={selectedNotification.message}
              isOpen={!!selectedNotification}
              onClose={closeModal}
            />
          )}

          {activeTab === "received" && userNotifications.length === 0 && (
            <p className="text-gray-500 text-center mt-4">
              Nenhuma notificação recebida.
            </p>
          )}
          {activeTab === "sent" &&
            user?.role !== "resident" &&
            sentNotifications.length === 0 && (
              <p className="text-gray-500 text-center mt-4">
                Nenhuma notificação enviada.
              </p>
            )}

          {activeTab === "received" &&
            userNotifications.length > rowsPerPage && (
              <Pagination
                currentPage={currentPageReceived}
                totalPages={totalPagesReceived}
                onPageChange={setCurrentPageReceived}
              />
            )}
          {activeTab === "sent" &&
            user?.role !== "resident" &&
            sentNotifications.length > rowsPerPage && (
              <Pagination
                currentPage={currentPageSent}
                totalPages={totalPagesSent}
                onPageChange={setCurrentPageSent}
              />
            )}
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default NotificationsPage;
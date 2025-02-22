"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthLayout from "@/components/AuthLayout";
import { RoleTranslations } from "@/utils/roleTranslations";
import Table, { Column } from "@/components/Table";
import {
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { fetchAdminDashboardStats } from "@/api/users";
import Loader from "@/components/Loader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { AdminDashboardStats } from "@/types/admin";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await fetchAdminDashboardStats();

        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      fetchStats();
    }
  }, [user?.role]);

  const renderRoleSpecificContent = () => {
    const data = [
      { info: "Reception Interphone", detail: "Dial 101" },
      {
        info: "WhatsApp",
        detail: "Contact Reception",
        link: "https://wa.me/555199999999",
      },
      { info: "Emergency", detail: "Dial 911" },
      { info: "Parking Assistance", detail: "Dial 104" },
    ];

    const columns: Column<(typeof data)[0]>[] = [
      { header: "Info", accessor: "info" },
      { header: "Details", accessor: "detail" },
    ];

    return (
      <Table
        data={data}
        columns={columns}
        actions={(row) => (
          <>
            {row.link ? (
              <a
                href={row.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
              </a>
            ) : (
              <button
                onClick={() => alert(`Calling: ${row.detail}`)}
                className="text-green-500 hover:text-green-700"
              >
                <PhoneIcon className="h-5 w-5" />
              </button>
            )}
          </>
        )}
      />
    );
  };

  return (
    <ProtectedRoute>
      <AuthLayout>
        <div className="p-6 space-y-6">
          <div className="pointer-events-none inset-x-0 bottom-0 pt-6 md:pt-0">
            <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-indigo-600 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
              <div>
                <p className="text-sm/6 text-white">
                  <strong className="font-semibold">
                    Welcome {user?.name}!
                  </strong>
                </p>
              </div>
              <span className="text-sm/6 text-white">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {user?.role === "admin" && (
            <StatsCards stats={stats} loading={loading} />
          )}

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800">
              Useful Information
            </h2>
            <div className="mt-4">{renderRoleSpecificContent()}</div>
          </div>
        </div>
      </AuthLayout>
    </ProtectedRoute>
  );
};

export default DashboardPage;

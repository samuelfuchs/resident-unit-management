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
} from "@heroicons/react/24/outline";
import { fetchAdminDashboardStats } from "@/api/users";
import Loader from "@/components/Loader";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<{ label: string; value: number }[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await fetchAdminDashboardStats();
        setStats([
          { label: "Total Users", value: data.totalUsers },
          { label: "Total Residents", value: data.totalResidents },
        ]);
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
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-2">
              Role:{" "}
              <span className="capitalize">
                {RoleTranslations[user?.role as keyof typeof RoleTranslations]}
              </span>
            </p>
            <p className="mt-4 text-gray-600">
              Today is{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long", 
                day: "numeric",
              })}
              .
            </p>
          </div>

          {user?.role === "admin" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                <Loader message="Loading data..." />
              ) : (
                stats?.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-blue-500 text-white p-4 rounded-lg shadow-md"
                  >
                    <h2 className="text-xl font-semibold">{stat.value}</h2>
                    <p className="mt-1 text-sm">{stat.label}</p>
                  </div>
                ))
              )}
            </div>
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

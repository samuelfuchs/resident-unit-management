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
  BanknotesIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import {
  fetchAdminDashboardStats,
  fetchResidentDashboardStats,
} from "@/api/users";
import Loader from "@/components/Loader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { AdminDashboardStats, ResidentDashboardStats } from "@/types/admin";
import Link from "next/link";
import Button from "@/components/Button";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [adminStats, setAdminStats] = useState<AdminDashboardStats | null>(
    null
  );
  const [residentStats, setResidentStats] =
    useState<ResidentDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        if (user?.role === "admin") {
          const data = await fetchAdminDashboardStats();
          setAdminStats(data);
        } else if (user?.role === "resident") {
          const data = await fetchResidentDashboardStats();
          setResidentStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role) {
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

  const renderResidentStats = () => {
    if (loading) return <Loader />;
    if (!residentStats) return null;

    return (
      <>
        {residentStats.latestBill && (
          <div
            className={`mt-6 bg-white shadow sm:rounded-lg ${
              residentStats.alerts.hasPendingBills ? "bg-red-50" : "bg-green-50"
            }`}
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:flex sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {residentStats.alerts.hasPendingBills
                      ? "You have a pending bill"
                      : "All Bills Paid"}
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>{residentStats.latestBill.description}</p>
                    <p className="mt-1">
                      Amount:{" "}
                      <span className="font-semibold">
                        ${residentStats.latestBill.amount.toLocaleString()}
                      </span>
                    </p>
                    <p className="mt-1">
                      Due Date:{" "}
                      {new Date(
                        residentStats.latestBill.dueDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:shrink-0 sm:items-center">
                  {residentStats.alerts.hasPendingBills && (
                    <Link
                      href="/my-bills"
                      className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
                    >
                      <ArrowRightIcon className="h-4 w-4" />
                      My Bills
                      <span className="sr-only"> My Bills</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
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
            <StatsCards stats={adminStats} loading={loading} />
          )}

          {user?.role === "resident" && renderResidentStats()}

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

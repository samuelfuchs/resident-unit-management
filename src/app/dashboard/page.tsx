"use client";

import React from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "@/components/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["admin", "receptionist", "resident"]}>
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
        <button
          onClick={logout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;

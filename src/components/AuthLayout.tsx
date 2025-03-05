"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="fixed inset-y-0 left-0 z-50 md:static md:flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 md:ml-64">
        <main className="pt-16 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AuthLayout;
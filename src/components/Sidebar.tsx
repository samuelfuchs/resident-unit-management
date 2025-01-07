"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { routes } from "@/config/routes";
import { ArrowLongUpIcon } from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="w-64 bg-blue-500 text-white flex flex-col min-h-screen">
      <div
        className="p-6 cursor-pointer text-xl font-bold transition-transform transform hover:scale-105"
        onClick={() => router.push("/dashboard")}
        title="Ir para o Dashboard"
      >
        Roger Residência
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          {routes
            .filter((route) => route.allowedRoles.includes(user?.role || ""))
            .map((route) => (
              <li key={route.path}>
                <button
                  onClick={() => router.push(route.path)}
                  className={`flex items-center w-full text-left p-2 rounded ${
                    pathname === route.path
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-600"
                  }`}
                >
                  <route.icon
                    className={`h-5 w-5 mr-3 ${
                      pathname === route.path ? "text-white" : "text-gray-300"
                    }`}
                  />
                  {route.label}
                </button>
              </li>
            ))}
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left p-2 hover:bg-red-600 rounded"
        >
          <ArrowLongUpIcon className="h-5 w-5 mr-3" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
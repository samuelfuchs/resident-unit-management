"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {
  UserCircleIcon,
  HomeIcon,
  CogIcon,
  ArrowLongUpIcon,
} from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navigateToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="w-64 bg-blue-500 text-white flex flex-col min-h-screen">
      <div
        className="p-6 cursor-pointer text-xl font-bold "
        onClick={navigateToDashboard}
        title="Ir para o Dashboard"
      >
        Roger Residência
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          <li>
            <button
              onClick={navigateToDashboard}
              className="flex items-center w-full text-left p-2 hover:bg-blue-600 rounded"
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/profile")}
              className="flex items-center w-full text-left p-2 hover:bg-blue-600 rounded"
            >
              <UserCircleIcon className="h-5 w-5 mr-3" />
              Perfil
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/settings")}
              className="flex items-center w-full text-left p-2 hover:bg-blue-600 rounded"
            >
              <CogIcon className="h-5 w-5 mr-3" />
              Configurações
            </button>
          </li>
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
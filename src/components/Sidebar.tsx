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

  return (
    <div className="w-64 bg-blue-500 text-white flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={`${user.name} ${user.lastName}`}
                className="h-12 w-12 rounded-full"
              />
            ) : (
              <span className="text-blue-500 font-bold">
                {user?.name.charAt(0).toUpperCase()}
                {user?.lastName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="font-bold">{user?.name}</p>
            <p className="text-sm text-gray-300">{user?.email}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 p-4">
          <li>
            <button
              onClick={() => router.push("/dashboard")}
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

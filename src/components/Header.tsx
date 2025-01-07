"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  ArrowRightEndOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { RoleTranslations } from "@/utils/roleTranslations";

const Header: React.FC = () => {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <header className="bg-blue-500 text-white px-6 py-4 shadow-md flex items-center justify-between">
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        Roger Residência
      </div>
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <span className="text-white font-semibold">
              {user.name} {user.lastName}{" "}
              <span className="text-gray-300">
                ({RoleTranslations[user.role]})
              </span>
            </span>

            <button
              onClick={handleProfileClick}
              className="flex items-center bg-gray-200 text-blue-500 px-3 py-2 rounded hover:bg-gray-300"
            >
              <UserCircleIcon className="h-5 w-5 mr-2" />
              Perfil
            </button>
          </>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-2" />
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;
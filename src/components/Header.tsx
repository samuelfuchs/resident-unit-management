"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import { RoleTranslations } from "@/utils/roleTranslations";

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="bg-blue-500 text-white px-6 py-4 shadow-md flex items-end justify-end fixed top-0 left-0 w-full z-10 md:relative md:z-auto">
      <div className="flex items-center space-x-4">
        {user && (
          <span className="text-white font-semibold">
            {user.name} {user.lastName}{" "}
            <span className="text-gray-300">
              ({RoleTranslations[user.role as keyof typeof RoleTranslations]})
            </span>
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/16/solid";

interface HeaderProps {
  title: string;
  links?: { label: string; href: string }[];
}

const Header: React.FC<HeaderProps> = ({ title, links = [] }) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="bg-blue-500 text-white px-6 py-4 shadow-md flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        {links.length > 0 && (
          <nav className="mt-2">
            <ul className="flex space-x-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Sair
        <ArrowRightEndOnRectangleIcon className="h-5 w-5 ml-2" />
      </button>
    </header>
  );
};

export default Header;

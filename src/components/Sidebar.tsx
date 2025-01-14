"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { routes } from "@/config/routes";
import {
  ArrowLongUpIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { mockNotifications } from "@/mocks/notifications";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (user) {
      // const unread = mockNotifications.filter(
      //   (notif) => notif.recipient.id === user.id && !notif.readAt
      // ).length;
      // setUnreadNotifications(unread);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center md:hidden">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 bg-blue-500 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 w-64 flex flex-col min-h-screen`}
      >
        <div
          className="p-6 cursor-pointer text-xl font-bold transition-transform transform hover:scale-105"
          onClick={() => {
            router.push("/dashboard");
            setIsSidebarOpen(false);
          }}
          title="Ir para o Dashboard"
        >
          Roger Residência
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 p-4">
            {routes
              .filter((route) => route.allowedRoles.includes(user?.role || ""))
              .map((route) => (
                <li key={route.path} className="relative">
                  <button
                    onClick={() => {
                      router.push(route.path);
                      setIsSidebarOpen(false);
                    }}
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
                    {route.path === "/notifications" &&
                      unreadNotifications > 0 && (
                        <span className="absolute right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {unreadNotifications}
                        </span>
                      )}
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

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
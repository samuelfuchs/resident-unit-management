"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { routes } from "@/config/routes";
import { ArrowLongUpIcon } from "@heroicons/react/24/outline";
import { mockNotifications } from "@/mocks/notifications";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    if (user) {
      const unread = mockNotifications.filter(
        (notif) => notif.recipient.id === user.id && !notif.readAt
      ).length;
      setUnreadNotifications(unread);
    }
  }, [user]);

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
              <li key={route.path} className="relative">
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
  );
};

export default Sidebar;
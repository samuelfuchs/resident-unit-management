"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { routes } from "@/config/routes";
import {
  ArrowLongUpIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { mockNotifications } from "@/mocks/notifications";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RoleTranslations } from "@/utils/roleTranslations";
import { useTheme } from "@/context/ThemeContext";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const { theme, toggleTheme } = useTheme();
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
      <div className="lg:bg-blue-500 text-white p-4 flex justify-between items-center md:hidden">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <div className="flex items-center gap-x-2">
              <Bars3Icon className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
              <span className="text-indigo-500 dark:text-indigo-400">
                Open Menu
              </span>
            </div>
          )}
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 bg-indigo-700 dark:bg-indigo-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 w-64 flex flex-col min-h-screen`}
      >
        <div
          className="p-6 cursor-pointer text-xl font-bold transition-transform transform dark:text-gray-200"
          onClick={() => {
            router.push("/dashboard");
            setIsSidebarOpen(false);
          }}
          title="Go to the Dashboard"
        >
          Unit Manager
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
                        ? "bg-blue-600 text-white dark:bg-indigo-500"
                        : "hover:bg-blue-600 dark:hover:bg-indigo-500"
                    }`}
                  >
                    <route.icon
                      className={`h-5 w-5 mr-3 ${
                        pathname === route.path
                          ? "text-white"
                          : "text-gray-300 dark:text-gray-400"
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
          <div className="relative">
            <button
              onClick={toggleTheme}
              className="flex items-center w-full text-left p-2 rounded transition hover:bg-blue-600 dark:hover:bg-indigo-500"
            >
              {theme === "dark" ? (
                <>
                  <SunIcon className="h-5 w-5 mr-3" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <MoonIcon className="h-5 w-5 mr-3" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left p-2 hover:bg-red-600 dark:hover:bg-red-500 rounded"
          >
            <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-3" />
            Logout
          </button>
          {user && (
            <div className="w-full">
              <a
                href="#"
                className="flex items-center gap-x-4 px-2 py-3 text-sm/6 font-semibold text-gray-900 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-indigo-500 rounded"
              >
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full bg-gray-50 dark:bg-gray-700"
                />
                <span className="sr-only">Your profile</span>
                <div className="flex flex-col">
                  <span
                    aria-hidden="true"
                    className="text-white dark:text-gray-200"
                  >
                    {user.name} {user.lastName}
                  </span>
                  <span className="text-gray-300 dark:text-gray-400 text-xs">
                    (
                    {
                      RoleTranslations[
                        user.role as keyof typeof RoleTranslations
                      ]
                    }
                    )
                  </span>
                </div>
              </a>
            </div>
          )}
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
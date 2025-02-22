"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { routesMap } from "@/config/routes";

export const ProtectedRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const allowedRoles = routesMap[pathname];

    if (!user) {
      router.push("/");
    } else if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.push("/unauthorized");
    }
  }, [user, router, pathname]);

  const allowedRoles = routesMap[pathname];

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

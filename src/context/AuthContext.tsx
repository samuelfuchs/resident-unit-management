"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType } from "@/types/auth";
import { User } from "@/types/user";
import { getMe } from "@/api/users";
import { doLogin } from "@/api/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("token");
    setIsUserLoading(true);
    if (!accessToken) {
      setIsUserLoading(false);
      return;
    }
    getMe()
      .then((result) => {
        console.log("result", result);
        setUser(result);
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  }, []);

  const login = async (email: string, password: string) => {
    const response = await doLogin(email, password);
    console.log("response login", response?.token);
    const token = response?.token;
    const user = response?.user;
    if (!token || !user) {
      return;
    }
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = (): void => {
    setUser(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
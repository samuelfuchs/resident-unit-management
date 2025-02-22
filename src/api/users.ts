import apiClient from "./index";
import { AdminDashboardStats } from "@/types/admin";

export const fetchUsers = async ({
  search = "",
  role,
  status,
  page = 1,
  limit = 10,
  sortField = "createdAt",
  sortOrder = "desc",
}: {
  search?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}) => {
  const response = await apiClient.get(`/users`, {
    params: {
      search,
      role,
      status,
      page,
      limit,
      sortField,
      sortOrder,
    },
  });
  return response.data;
};

export const createUser = async (userData: Record<string, any>) => {
  const response = await apiClient.post("/users", userData);
  return response.data;
};

export const updateUser = async (id: string, userData: Record<string, any>) => {
  const response = await apiClient.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await apiClient.delete(`/users/${id}`);
  console.log("@deleteUser response", response);
  return response.data;
};

export const getMe = async () => {
  const response = await apiClient.get("/users/me");
  return response.data;
};

export const fetchUserById = async (id: string) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const fetchAdminDashboardStats =
  async (): Promise<AdminDashboardStats> => {
    const response = await apiClient.get("/users/admin/stats");
    return response.data;
  };
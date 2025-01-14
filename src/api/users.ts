import apiClient from "./index";

export const fetchUsers = async () => {
  const response = await apiClient.get("/users");
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
  return response.data;
};

export const getMe = async () => {
  const response = await apiClient.get("/users/me");
  return response.data;
};

import { User } from "@/types/user";
import apiClient from "./index";

interface LoginResponse {
  token: string;
  user: User;
}

export const doLogin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
};

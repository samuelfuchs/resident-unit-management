import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5050/api",
  // baseURL: "https://resident-unit-management-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

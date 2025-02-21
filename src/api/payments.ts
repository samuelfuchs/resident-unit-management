import apiClient from "./index";
import {
  PaymentIntent,
  CreatePaymentIntentRequest,
  UpdatePaymentIntentRequest,
} from "@/types/payment";

export const fetchPaymentHistory = async () => {
  const response = await apiClient.get("/payments/payment-history");
  return response.data;
};

export const createPaymentIntent = async (data: CreatePaymentIntentRequest) => {
  const response = await apiClient.post(
    "/payments/create-payment-intent",
    data
  );
  return response.data;
};

export const updatePaymentIntent = async (
  id: string,
  data: { amount?: number; description?: string }
) => {
  const response = await apiClient.put(`/payments/update/${id}`, data);
  return response.data;
};

export const cancelPaymentIntent = async (id: string) => {
  const response = await apiClient.post(`/payments/cancel/${id}`);
  return response.data;
};

export const fetchMyPayments = async (limit: number = 10) => {
  const response = await apiClient.get(`/payments/my-payments?limit=${limit}`);
  return response.data;
};

export const createResidentPaymentIntent = async (data: {
  amount: number;
  description: string;
}) => {
  const response = await apiClient.post(
    "/payments/resident/create-payment-intent",
    data
  );
  return response.data;
};

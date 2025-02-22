import { Bill } from "@/types/bill";
import apiClient from "./index";

interface CreateBillData {
  residentId: string;
  amount: number;
  description: string;
  dueDate: string;
}

export const fetchAllBills = async (): Promise<Bill[]> => {
  const response = await apiClient.get("/bills");
  return response.data;
};

export const fetchBillsByResidentId = async (
  residentId: string
): Promise<Bill[]> => {
  const response = await apiClient.get(`/bills/resident/${residentId}`);
  return response.data;
};

export const fetchResidentBills = async (): Promise<Bill[]> => {
  const response = await apiClient.get("/bills/my-bills");
  return response.data;
};

export const createBill = async (data: CreateBillData): Promise<Bill> => {
  const response = await apiClient.post("/bills", data);
  return response.data;
};

export const updateBillStatus = async (
  billId: string,
  status: string,
  paymentIntentId?: string
): Promise<Bill> => {
  const response = await apiClient.patch(`/bills/${billId}/status`, {
    status,
    paymentIntentId,
  });
  return response.data;
};

export const createResidentPaymentIntent = async (data: {
  billId: string;
}): Promise<{ clientSecret: string }> => {
  const response = await apiClient.post("/payments/create-intent", data);
  return response.data;
};

interface GetBillsParams {
  page?: number;
  limit?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}

export const getAllBills = async (
  params: GetBillsParams = {}
): Promise<{
  bills: Bill[];
  totalBills: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}> => {
  const response = await apiClient.get("/bills", { params });
  return response.data;
};
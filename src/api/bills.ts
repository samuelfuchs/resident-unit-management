import apiClient from "./index";
import { Bill } from "@/types/payment";

interface CreateBillData {
  residentId: string;
  amount: number;
  description: string;
  dueDate: string;
}

interface BillsResponse {
  bills: Bill[];
  totalPages: number;
}

export const fetchAllBills = async (): Promise<Bill[]> => {
  const response = await apiClient.get("/bills");
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

export const getBillsByResidentId = async (
  residentId: string
): Promise<Bill[]> => {
  const response = await apiClient.get(`/bills/resident/${residentId}`);
  return response.data;
};

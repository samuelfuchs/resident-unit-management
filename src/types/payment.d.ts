export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  description: string;
  status: PaymentStatus;
  created: number;
  dueDate?: string;
  category?: "rent" | "maintenance" | "utility" | "other";
  metadata: {
    adminId: string;
    userId: string;
    billId?: string;
  };
  client_secret?: string;
}

export interface Bill {
  id: string;
  residentId: string;
  amount: number;
  description: string;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
  paymentIntentId?: string;
  createdAt: string;
  paidAt?: string;
  category?: "rent" | "maintenance" | "utility" | "other";
}

export type PaymentStatus =
  | "requires_payment_method"
  | "requires_confirmation"
  | "requires_action"
  | "processing"
  | "requires_capture"
  | "canceled"
  | "succeeded";

export interface CreatePaymentIntentRequest {
  amount: number;
  userId: string;
  description: string;
}

export interface UpdatePaymentIntentRequest {
  amount?: string;
  description?: string;
}

interface CreatePaymentIntentParams {
  amount: number;
  description: string;
  billId: string;
}

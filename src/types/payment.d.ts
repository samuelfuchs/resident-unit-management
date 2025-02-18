export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  description: string;
  status: PaymentStatus;
  created: number;
  metadata: {
    adminId: string;
    userId: string;
  };
  client_secret?: string;
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

export interface Bill {
  _id: string;
  residentId: string; 
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  description: string;
  category: "rent" | "utilities" | "maintenance" | "other";
  paidAt?: string;
  paidAmount?: number;
  createdAt?: string;
  updatedAt?: string;
  resident?: User;
  notes?: string;
  attachments?: string[]; 
} 
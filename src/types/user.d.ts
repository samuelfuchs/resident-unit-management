export interface User {
  _id: string;
  email: string;
  name: string;
  password?: string;
  lastName: string;
  role: "admin" | "receptionist" | "resident";
  phone: string;

  address?: string;
  zipCode?: number;
  city?: string;
  state?: string;
  unitNumber?: string;
  createdAt?: string;
  profilePicture?: string;
  status?: "active" | "inactive";

  emergencyContacts?: User[];
}

export interface ResidentDashboardStats {
  bills: {
    total: number;
    pending: number;
    upcoming: number;
    overdue: number;
    pendingAmount: number;
    paidThisMonth: number;
  };
  latestBill: {
    _id: string;
    amount: number;
    description: string;
    dueDate: string;
    status: string;
  };
  alerts: {
    hasPendingBills: boolean;
    hasOverdueBills: boolean;
    hasUpcomingBills: boolean;
  };
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalResidents: number;
  bills: {
    total: number;
    paid: number;
    unpaid: number;
    pendingAmount: number;
    revenue: number;
  };
}

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

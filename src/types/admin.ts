import { StaticImageData } from "next/image";

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

export interface DashboardStatCard {
  id: string;
  name: string;
  stat: string | number;
  icon: React.ComponentType<{ className?: string }>;
  change?: string;
  changeType?: "increase" | "decrease";
  color?: string;
  href?: string;
}

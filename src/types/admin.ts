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

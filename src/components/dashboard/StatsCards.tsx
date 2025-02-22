import {
  UsersIcon,
  CreditCardIcon,
  UserGroupIcon,
  BanknotesIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { DashboardStatCard } from "@/types/admin";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";
import { AdminDashboardStats } from "@/types/admin";
import Link from "next/link";

interface StatsCardsProps {
  stats: AdminDashboardStats | null;
  loading?: boolean;
}

export const StatsCards = ({ stats, loading }: StatsCardsProps) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  const statsCards: DashboardStatCard[] = [
    {
      id: "total-users",
      name: "Total Users",
      stat: stats?.totalUsers || 0,
      icon: UsersIcon,
      href: "/users",
    },
    {
      id: "total-residents",
      name: "Total Residents",
      stat: stats?.totalResidents || 0,
      icon: UserGroupIcon,
      change: "2.1%",
      changeType: "increase",
      href: "/users",
    },
    {
      id: "total-bills",
      name: "Revenue",
      stat: stats?.bills.revenue ? `$${stats?.bills.revenue},00` : "0",
      icon: CreditCardIcon,
      change: stats?.bills.total ? `${stats?.bills.total} paid` : "0",
      changeType: "increase",
      href: "/bills",
    },
    {
      id: "pending-amount",
      name: "Pending Amount",
      stat: `$${stats?.bills.pendingAmount || 0}`,
      icon: BanknotesIcon,
      href: "/bills",
    },
  ];

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat}
              </p>
              <p
                className={`
                  ${
                    item.changeType === "increase"
                      ? "text-green-600"
                      : "text-red-600"
                  } ml-2 flex items-baseline text-sm font-semibold
                `}
              >
                {item.changeType &&
                  (item.changeType === "increase" ? (
                    <ArrowUpIcon
                      className="h-5 w-5 shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="h-5 w-5 shrink-0 self-center text-red-500"
                      aria-hidden="true"
                    />
                  ))}
                <span className="sr-only">
                  {item.changeType === "increase" ? "Increased" : "Decreased"}{" "}
                  by
                </span>
                {item.change}
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    href={item.href || "#"}
                    className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                    View details
                    <span className="sr-only"> {item.name} stats</span>
                  </Link>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

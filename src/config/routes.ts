import {
  HomeIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  UsersIcon,
  BellIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

export const routes = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
    allowedRoles: ["admin", "receptionist", "resident"],
  },
  {
    path: "/users",
    label: "Users",
    icon: UsersIcon,
    allowedRoles: ["admin"],
  },
  {
    path: "/residents",
    label: "Residents",
    icon: UsersIcon,
    allowedRoles: ["receptionist"],
  },
  {
    path: "/units",
    label: "Units",
    icon: BuildingOfficeIcon,
    allowedRoles: ["admin", "receptionist"],
  },
  // {
  //   path: "/payments",
  //   label: "Payments",
  //   icon: CreditCardIcon,
  //   allowedRoles: ["admin", "receptionist"],
  // },
  // {
  //   path: "/my-payments",
  //   label: "My Payments",
  //   icon: CreditCardIcon,
  //   allowedRoles: ["resident"],
  // },
  {
    path: "/bills",
    label: "Bills",
    icon: CreditCardIcon,
    allowedRoles: ["admin", "receptionist"],
  },
  {
    path: "/my-bills",
    label: "My Bills",
    icon: CreditCardIcon,
    allowedRoles: ["resident"],
  },
  // {
  //   path: "/notifications",
  //   label: "Notifications",
  //   icon: BellIcon,
  //   allowedRoles: ["admin", "receptionist", "resident"],
  // },
  // {
  //   path: "/profile",
  //   label: "My Profile",
  //   icon: UserCircleIcon,
  //   allowedRoles: ["admin", "receptionist", "resident"],
  // },
];

export const routesMap = Object.fromEntries(
  routes.map((route) => [route.path, route.allowedRoles])
);
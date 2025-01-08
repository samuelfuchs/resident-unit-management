import {
  HomeIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const routes = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
    allowedRoles: ["admin", "receptionist", "resident"],
  },
  {
    path: "/residents",
    label: "Residentes",
    icon: UsersIcon,
    allowedRoles: ["admin", "receptionist"],
  },
  {
    path: "/units",
    label: "Unidades",
    icon: BuildingOfficeIcon,
    allowedRoles: ["admin", "receptionist"],
  },
  {
    path: "/profile",
    label: "Meu Perfil",
    icon: UserCircleIcon,
    allowedRoles: ["admin", "receptionist", "resident"],
  },
];

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
    path: "/users",
    label: "Usuários",
    icon: UsersIcon,
    allowedRoles: ["admin"],
  },
  {
    path: "/residents",
    label: "Residentes",
    icon: UsersIcon,
    allowedRoles: ["receptionist"],
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
import { HomeIcon, UserCircleIcon, CogIcon } from "@heroicons/react/24/outline";

export const routes = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
    allowedRoles: ["admin", "receptionist", "resident"],
  },
  {
    path: "/profile",
    label: "Perfil",
    icon: UserCircleIcon,
    allowedRoles: ["admin", "receptionist", "resident"],
  },
  {
    path: "/settings",
    label: "Configurações",
    icon: CogIcon,
    allowedRoles: ["admin"],
  },
];

// import { User } from "../types";
import { User } from "@/types/auth";

export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "João",
    lastName: "Silva",
    role: "admin",
  },
  {
    id: "2",
    email: "receptionist@example.com",
    name: "Maria",
    lastName: "Oliveira",
    role: "receptionist",
  },
  {
    id: "3",
    email: "resident@example.com",
    name: "Carlos",
    lastName: "Santos",
    role: "resident",
  },
];

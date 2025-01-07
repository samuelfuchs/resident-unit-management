export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  role: "admin" | "receptionist" | "resident";

  phone?: string;
  address?: string;
  unitNumber?: string;
  createdAt?: string;
  profilePicture?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  status?: "active" | "inactive";
}


export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

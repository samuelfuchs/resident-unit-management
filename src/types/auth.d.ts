export interface User {
  email: string;
  role: "admin" | "receptionist";
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

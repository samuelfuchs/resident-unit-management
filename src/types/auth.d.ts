export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  role: "admin" | "receptionist" | "resident";
}


export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

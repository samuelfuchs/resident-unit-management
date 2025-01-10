export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  role: "admin" | "receptionist" | "resident";
  phone: string;

  address?: string;
  zipCode?: number;
  city?: string;
  state?: string;
  unitNumber?: string;
  createdAt?: string;
  profilePicture?: string;
  status?: "active" | "inactive";

  emergencyContacts?: User[];
}

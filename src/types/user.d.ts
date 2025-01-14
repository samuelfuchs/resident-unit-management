export interface User {
  _id: string;
  email: string;
  name: string;
  password?: string;
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

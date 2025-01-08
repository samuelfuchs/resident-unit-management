// import { Resident } from "@/types";
import { Resident } from "@/types/resident";

export const mockResidents: Resident[] = [
  {
    id: "1",
    name: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    role: "tenant",
    unitId: "101",
    emergencyContact: {
      name: "Jane Doe",
      phone: "987-654-3210",
      relationship: "Spouse",
    },
    familyMembers: [
      { name: "Jane Doe", relationship: "Spouse" },
      { name: "Jimmy Doe", relationship: "Child", age: 10 },
    ],
  },
];

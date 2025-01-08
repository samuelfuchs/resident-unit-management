// import { Resident } from "@/types";
import { Resident } from "@/types/resident";

// export const mockResidents: Resident[] = [
//   {
//     id: "1",
//     name: "John",
//     lastName: "Doe",
//     email: "john.doe@example.com",
//     phone: "123-456-7890",
//     role: "tenant",
//     unitId: "101",
//     emergencyContact: {
//       name: "Jane Doe",
//       phone: "987-654-3210",
//       relationship: "Spouse",
//     },
//     familyMembers: [
//       { name: "Jane Doe", relationship: "Spouse" },
//       { name: "Jimmy Doe", relationship: "Child", age: 10 },
//     ],
//   },
// ];

export const generateMockResidents = (count: number) => {
  const residents = [];
  for (let i = 1; i <= count; i++) {
    residents.push({
      id: `res-${i}`,
      name: `Resident ${i}`,
      lastName: `Lastname ${i}`,
      email: `resident${i}@example.com`,
      phone: `555-010${i.toString().padStart(3, "0")}`,
      role: i % 2 === 0 ? "tenant" : "owner",
      unitId: `Unit ${Math.ceil(i / 10)}`, 
    });
  }
  return residents;
};

export const mockResidents = generateMockResidents(2000);
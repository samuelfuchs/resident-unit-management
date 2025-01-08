import { User } from "@/types/user";

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

export const generateMockResidents = (count: number): User[] => {
  const residents: User[] = [];
  for (let i = 1; i <= count; i++) {
    residents.push({
      id: `user-${i}`,
      name: `Residente ${i}`,
      lastName: `Lastname ${i}`,
      email: `resident${i}@example.com`,
      phone: `555-010${i.toString().padStart(3, "0")}`,
      role: "resident",
      unitNumber: `Unit ${Math.ceil(i / 10)}`,
      createdAt: new Date().toISOString(),
      // emergencyContact: {
      //   name: `Emergency Contact ${i}`,
      //   phone: `555-020${i.toString().padStart(3, "0")}`,
      //   relationship: "Friend",
      // },
      // familyMembers: [
      //   { name: `Family Member ${i}`, relationship: "Spouse" },
      //   { name: `Child ${i}`, relationship: "Child", age: 8 + (i % 3) },
      // ],
      // profilePicture: i % 5 === 0 ? null : `https://via.placeholder.com/150`,
      status: i % 3 === 0 ? "inactive" : "active",
    });
  }
  return residents;
};

export const mockResidents = generateMockResidents(2000);

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface FamilyMember {
  name: string;
  relationship: string;
  age?: number;
}

export interface Resident {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  profilePicture?: string;
  role: "tenant" | "owner";
  unitId: string;
  emergencyContact: EmergencyContact;
  familyMembers: FamilyMember[];
}

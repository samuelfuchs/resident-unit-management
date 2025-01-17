import { User } from "./user";

export interface Unit {
  id: string;
  number: string;
  floor?: number;
  squareFootage: number;
  type: UnitType;
  owner: User[];
  leaseAgreement?: string;
  parkingSpots?: string[];
  tenant?: User[] | null;
}

export enum UnitType {
  Residential = "Residential",
  Commercial = "Commercial",
  House = "House",
  Apartment = "Apartment",
  Office = "Office",
}
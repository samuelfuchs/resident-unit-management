import { User } from "./user";

export interface Unit {
  id: string;
  number: string;
  floor: number;
  squareFootage: number;
  type: string;
  owner?: User;
  leaseAgreement?: string;
  parkingSpots: string[];
}

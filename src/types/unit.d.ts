export interface Unit {
  id: string;
  number: string;
  floor: number;
  squareFootage: number;
  type: string;
  ownerId: string;
  leaseAgreement?: string;
  parkingSpots: string[];
}

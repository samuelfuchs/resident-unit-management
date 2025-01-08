import { Unit } from "@/types/unit";
import { mockResidents } from "@/mocks/residents";

const unitTypes = [
  "Studio",
  "1-bedroom",
  "2-bedroom",
  "3-bedroom",
  "Penthouse",
];

export const generateMockUnits = (count: number): Unit[] => {
  const units: Unit[] = [];
  for (let i = 1; i <= count; i++) {
    const floor = Math.ceil(i / 10);
    const type = unitTypes[Math.floor(Math.random() * unitTypes.length)];
    const squareFootage = 500 + Math.floor(Math.random() * 1000);
    const parkingCount = Math.floor(Math.random() * 3) + 1;
    const parkingSpots = Array.from(
      { length: parkingCount },
      (_, idx) => `P${i}-${idx + 1}`
    );
    const owner =
      mockResidents[Math.floor(Math.random() * mockResidents.length)];

    units.push({
      id: `${i}`,
      number: `${i}`,
      floor,
      squareFootage,
      type,
      owner,
      parkingSpots,
    });
  }
  return units;
};

export const mockUnits = generateMockUnits(50);
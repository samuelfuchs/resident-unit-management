import apiClient from "./index";

export const updateUnit = async (id: string, unitData: Record<string, any>) => {
  const response = await apiClient.put(`/units/${id}`, unitData);
  return response.data;
};

export const fetchAllUnits = async ({
  search = "",
  type,
  floor,
  page = 1,
  limit = 10,
  sortField = "createdAt",
  sortOrder = "desc",
}: {
  search?: string;
  type?: string;
  floor?: string | number;
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}) => {
  const response = await apiClient.get("/units", {
    params: {
      search,
      type,
      floor,
      page,
      limit,
      sortField,
      sortOrder,
    },
  });
  return response.data;
};

export const deleteUnit = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/units/${id}`);
    console.log(`Unit with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error(`Failed to delete unit with ID ${id}:`, error);
    throw error;
  }
};

export const createUnit = async (unitData: {
  number: string;
  floor: number;
  squareFootage: number;
  type: string;
  owner: string[];
  parkingSpots?: string[];
  tenant?: string[];
}) => {
  try {
    const response = await apiClient.post("/units", unitData);
    return response.data;
  } catch (error) {
    console.error("Error creating unit:", error);
    throw error || { error: "Unknown error occurred." };
  }
};
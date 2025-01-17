import apiClient from "./index";

export const updateUnit = async (id: string, unitData: Record<string, any>) => {
  const response = await apiClient.put(`/units/${id}`, unitData);
  return response.data;
};

export const fetchAllUnits = async ({
  search = "",
  page = 1,
  limit = 10,
  sortField = "number",
  sortOrder = "asc",
}: {
  search?: string;
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}) => {
  const response = await apiClient.get(`/units`, {
    params: {
      search,
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

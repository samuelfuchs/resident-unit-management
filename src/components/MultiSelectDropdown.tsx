import React, { useState, useEffect } from "react";
import Select from "react-select";
import { fetchUsers } from "@/api/users";

interface Props {
  selectedUsers: {
    value: string;
    label: string;
  }[];
  setSelectedUsers: React.Dispatch<
    React.SetStateAction<
      {
        value: string;
        label: string;
      }[]
    >
  >;
}

const MultiSelectDropdown = ({ selectedUsers, setSelectedUsers }: Props) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchUserOptions = async (search = "", page = 1) => {
    setLoading(true);
    try {
      const response = await fetchUsers({
        search,
        page,
        limit: 10,
        sortField: "name",
        sortOrder: "asc",
      });
      const newOptions = response.users.map((user: any) => ({
        value: user._id,
        label: `${user.name} ${user.lastName}`,
      }));
      setOptions((prev) =>
        page === 1 ? newOptions : [...prev, ...newOptions]
      );
      setHasMore(page < response.totalPages);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOptions(searchQuery, page);
  }, [searchQuery, page]);

  const handleInputChange = (query: any) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleScrollToBottom = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <Select
      isMulti
      options={options}
      value={selectedUsers}
      onChange={(newValue) => setSelectedUsers([...newValue])}
      onInputChange={handleInputChange}
      placeholder="Select users..."
      isLoading={loading}
      onMenuScrollToBottom={handleScrollToBottom}
      noOptionsMessage={() => (loading ? "Loading..." : "No options found")}
    />
  );
};

export default MultiSelectDropdown;

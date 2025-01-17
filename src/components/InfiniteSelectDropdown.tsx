import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchUsers } from "@/api/users";
import { User } from "@/types/user";
import Loader from "@/components/Loader";
import { debounce } from "@/utils/debounce";

interface InfiniteSelectDropdownProps {
  label: string;
  value: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
}

const InfiniteSelectDropdown: React.FC<InfiniteSelectDropdownProps> = ({
  label,
  value,
  onChange,
  disabled = false,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const deduplicateUsers = (newUsers: User[]) => {
    const existingIds = new Set(users.map((user) => user._id));
    return newUsers.filter((user) => !existingIds.has(user._id));
  };

  const fetchAndSetUsers = useCallback(
    async (page = 1, reset = false) => {
      if (loading || page > totalPages) return;

      setLoading(true);
      try {
        const { users: fetchedUsers, totalPages: total } = await fetchUsers({
          search: searchTerm,
          page,
          limit: 10,
          sortField: "createdAt",
          sortOrder: "desc",
        });

        setUsers((prev) =>
          reset ? fetchedUsers : [...prev, ...deduplicateUsers(fetchedUsers)]
        );
        setTotalPages(total);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, loading, totalPages]
  );

  // Debounce search to prevent excessive requests
  const debouncedFetch = useCallback(debounce(fetchAndSetUsers, 300), []);

  useEffect(() => {
    if (isDropdownOpen) {
      debouncedFetch(1, true); // Fetch first page and reset on dropdown open
    }
  }, [isDropdownOpen, searchTerm, debouncedFetch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page for new searches
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight && currentPage < totalPages) {
      setCurrentPage((prev) => {
        const nextPage = prev + 1;
        fetchAndSetUsers(nextPage);
        return nextPage;
      });
    }
  };

  const handleSelect = (userId: string) => {
    if (value.includes(userId)) {
      onChange(value.filter((id) => id !== userId));
    } else {
      onChange([...value, userId]);
    }
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full border px-4 py-2 rounded"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsDropdownOpen(true)}
          disabled={disabled}
        />
        {isDropdownOpen && (
          <div
            className="absolute z-10 w-full max-h-60 overflow-y-auto bg-white border rounded shadow"
            onScroll={handleScroll}
          >
            {users.map((user) => (
              <div
                key={user._id}
                className={`flex items-center px-4 py-2 cursor-pointer ${
                  value.includes(user._id) ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelect(user._id)}
              >
                {`${user.name} ${user.lastName}`}
              </div>
            ))}
            {loading && <Loader message="Carregando..." />}
            {!loading && users.length === 0 && (
              <div className="p-4 text-gray-500">No users found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteSelectDropdown;

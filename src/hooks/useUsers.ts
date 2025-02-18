import { useState, useEffect } from "react";
import { fetchUsers } from "@/api/users";
import { User } from "@/types/user";

export const useUsers = () => {
  const [users, setUsers] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { users: fetchedUsers } = await fetchUsers({});
        const usersMap = fetchedUsers.reduce(
          (acc: Record<string, User>, user: User) => {
            acc[user._id] = user;
            return acc;
          },
          {} as Record<string, User>
        );
        setUsers(usersMap);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  return { users, loading };
};

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles?: ("admin" | "receptionist" | "resident")[]; // Specify allowed roles
}> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
      router.push("/"); // Redirect to login or unauthorized page
    }
  }, [user, allowedRoles, router]);

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return null; // Prevent rendering while redirecting
  }

  return <>{children}</>;
};

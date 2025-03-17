import { useAuth } from "../hooks/useAuth";
import { redirect } from "@tanstack/react-router";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    redirect({
      to: "/login",
    });
  }

  return <>{children}</>;
};

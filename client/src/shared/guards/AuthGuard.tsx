import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { redirect } from "@tanstack/react-router";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      redirect({ to: "/login" });
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};

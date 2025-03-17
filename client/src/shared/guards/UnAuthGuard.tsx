import { useAuth } from "../hooks/useAuth";

export const UnAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};

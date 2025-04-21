import { useAuth } from "../hooks/useAuth";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};

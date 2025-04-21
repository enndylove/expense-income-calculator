import { useAuth } from "../hooks/useAuth";

export const UnAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};

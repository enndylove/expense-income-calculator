import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { AuthDecoderResult } from "../types/response/auth.type";

export type SuccessfulAuth = {
  isLoggedIn: true;
  isLoading: false;
  status: "success";
  data: AuthDecoderResult;
};

export type UseAuthResult =
  | {
      isLoggedIn: false;
      isLoading: false;
      status: "success";
      data: undefined;
    }
  | {
      isLoggedIn: false;
      isLoading: true;
      status: "pending";
      data: undefined;
    }
  | SuccessfulAuth;

export function useAuth() {
  const authQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get<AuthDecoderResult>("/auth");

      return res.data;
    },
  });

  const isLoggedIn =
    authQuery.status === "success" &&
    authQuery.data.id !== null &&
    authQuery.data.email !== null;

  return {
    isLoggedIn,
    isLoading: authQuery.status === "pending",
    status: authQuery.status,
    data: authQuery.data,
  } as UseAuthResult;
}

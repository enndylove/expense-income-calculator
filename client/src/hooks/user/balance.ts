import { useQuery } from "@tanstack/react-query";
import { getUserBalanceEndpoint } from "../../api/user/balance";

export function useUserBalanceQuery() {
  const q = useQuery({
    queryKey: ["user-balance"],
    queryFn: () => getUserBalanceEndpoint(),
  });

  return q;
}

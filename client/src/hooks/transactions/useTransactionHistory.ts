import { useQuery } from "@tanstack/react-query";
import { getTransactionHistory } from "@/api/dashboard/transactions";

export function useTransactionHistoryQuery(page: number, limit: number) {
  return useQuery({
    queryKey: ["transaction-history", page, limit],
    queryFn: () => getTransactionHistory(page, limit),
  });
}

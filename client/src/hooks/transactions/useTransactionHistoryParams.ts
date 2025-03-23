import { parseAsInteger, useQueryState } from "nuqs";
import { useSortQueryState } from "@/shared/hooks/useTableQueryStates";

export function useTransactionTableParams() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10),
  );
  const { sortingState, updateSorting } = useSortQueryState();

  return {
    page,
    setPage,
    limit,
    setLimit,
    sortingState,
    updateSorting,
  };
}

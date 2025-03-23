import { OnChangeFn, SortingState } from "@tanstack/react-table";
import { parseAsString, useQueryState } from "nuqs";

export function useSortQueryState() {
  const [sort, setSort] = useQueryState("sort", parseAsString);

  const sortingState = sort
    ? [
        {
          id: sort.split(".")[0],
          desc: sort.split(".")[1] === "desc",
        },
      ]
    : [];

  const updateSorting: OnChangeFn<SortingState> = (updaterOrValue) => {
    const newSorting =
      typeof updaterOrValue === "function"
        ? updaterOrValue([])
        : updaterOrValue;

    const firstSort = newSorting[0];
    if (firstSort) {
      setSort(`${firstSort.id}.${firstSort.desc ? "desc" : "asc"}`);
    } else {
      setSort(null);
    }
  };

  return {
    sort,
    sortingState,
    updateSorting,
  };
}

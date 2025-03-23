import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Pagination } from "@/components/pagination/pagination";
import { PaginationSkeleton } from "@/components/pagination/pagination-skeleton";
import { useTransactionHistoryQuery } from "@/hooks/transactions/useTransactionHistory";
import { useTransactionTableParams } from "@/hooks/transactions/useTransactionHistoryParams";
import { columns } from "./TransactionTableColumns";

export function TransactionTable() {
  const { page, setPage, limit, sortingState, updateSorting } =
    useTransactionTableParams();
  const { data, isLoading, isError } = useTransactionHistoryQuery(page, limit);

  if (isLoading) {
    return (
      <div className="mt-6 flex-1 flex flex-col gap-4">
        <div className="flex-1">
          <DataTableSkeleton columnCount={5} rowCount={limit} />
        </div>
        <PaginationSkeleton className="justify-start" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-md border p-6 text-center">
        <p className="text-red-500">
          Error loading transactions. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 flex-1 flex flex-col gap-4">
      <div className="flex-1">
        <DataTable
          columns={columns}
          data={data?.data ?? []}
          sorting={sortingState}
          onSortingChange={updateSorting}
        />
      </div>
      <Pagination
        className="justify-start"
        siblings={1}
        boundaries={1}
        page={page}
        pageCount={data?.meta.totalPages || 1}
        onPageChange={setPage}
      />
    </div>
  );
}

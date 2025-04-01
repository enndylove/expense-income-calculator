import type { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "@/shared/types/response/transactions.type";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  ArrowUpDown,
  FileText,
  Package,
  CreditCard,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center gap-2 text-gray-600 font-medium dark:text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>Date</span>
      </div>
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return (
        <div className="flex items-center gap-2 py-2">
          <div className="h-8 w-8 rounded-md bg-gray-200 flex items-center justify-center dark:bg-secondary">
            <Calendar className="h-4 w-4 text-gray-500 dark:text-zinc-400" />
          </div>
          <span className="text-gray-800 dark:text-zinc-200">
            {format(new Date(date), "MMM dd, yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "productType",
    header: () => (
      <div className="flex items-center gap-2 text-gray-600 font-medium dark:text-muted-foreground">
        <Package className="h-4 w-4" />
        <span>Product Type</span>
      </div>
    ),
    cell: ({ row }) => {
      const productType = row.getValue("productType") as string;
      return (
        <div className="flex items-center gap-2 py-2">
          <div className="h-8 w-8 rounded-md bg-gray-200 flex items-center justify-center dark:bg-zinc-800">
            <Package className="h-4 w-4 text-gray-500 dark:text-zinc-400" />
          </div>
          <span className="text-gray-800 dark:text-zinc-200">
            {productType}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "transactionType",
    header: () => (
      <div className="flex items-center gap-2 text-gray-600 font-medium dark:text-muted-foreground">
        <CreditCard className="h-4 w-4" />
        <span>Transaction Type</span>
      </div>
    ),
    cell: ({ row }) => {
      const type = row.getValue(
        "transactionType",
      ) as Transaction["transactionType"];

      const variants = {
        profit: (
          <Badge className="bg-emerald-200 text-emerald-600 border border-emerald-400 font-medium px-3 py-1 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800">
            Profit
          </Badge>
        ),
        cost: (
          <Badge className="bg-rose-200 text-rose-600 border border-rose-400 font-medium px-3 py-1 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-800">
            Cost
          </Badge>
        ),
        investments: (
          <Badge className="bg-blue-200 text-blue-600 border border-blue-400 font-medium px-3 py-1 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800">
            Investment
          </Badge>
        ),
      };

      return <div className="py-2">{variants[type]}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-gray-200 hover:text-gray-700 text-gray-600 font-medium dark:hover:bg-neutral-800 dark:hover:text-neutral-300 dark:text-muted-foreground"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const type = row.getValue(
        "transactionType",
      ) as Transaction["transactionType"];

      const colorClasses = {
        profit:
          "text-emerald-600 bg-emerald-200/40 dark:text-emerald-400 dark:bg-emerald-950/40",
        cost: "text-rose-600 bg-rose-200/40 dark:text-rose-400 dark:bg-rose-950/40",
        investments:
          "text-blue-600 bg-blue-200/40 dark:text-blue-400 dark:bg-blue-950/40",
      };

      return (
        <div className="py-2">
          <span
            className={`px-3 py-1.5 rounded-md font-medium ${colorClasses[type]}`}
          >
            {type === "profit" ? "+" : ""}${Math.abs(amount).toFixed(2)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "note",
    header: () => (
      <div className="flex items-center gap-2 text-gray-600 font-medium dark:text-muted-foreground">
        <FileText className="h-4 w-4" />
        <span>Note</span>
      </div>
    ),
    cell: ({ row }) => {
      const note = row.getValue("note") as string | undefined;
      return (
        <div className="max-w-xs truncate py-2 text-gray-700 dark:text-neutral-300">
          {note || (
            <span className="text-gray-400 dark:text-neutral-500">No note</span>
          )}
        </div>
      );
    },
  },
];

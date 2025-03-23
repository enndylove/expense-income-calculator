import type { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "@/shared/types/response/transactions.type";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {format(new Date(date), "MMM dd, yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "productType",
    header: "Product Type",
  },
  {
    accessorKey: "transactionType",
    header: "Transaction Type",
    cell: ({ row }) => {
      const type = row.getValue(
        "transactionType",
      ) as Transaction["transactionType"];
      const variants = {
        profit: <Badge className="bg-green-500">Profit</Badge>,
        cost: <Badge className="bg-red-500">Cost</Badge>,
        investments: <Badge className="bg-blue-500">Investment</Badge>,
      };
      return variants[type];
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
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

      return (
        <span
          className={
            type === "profit"
              ? "text-green-600"
              : type === "investments"
                ? "text-blue-600"
                : "text-red-600"
          }
        >
          {type === "profit" ? "+" : ""}${Math.abs(amount).toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: "note",
    header: "Note",
    cell: ({ row }) => {
      const note = row.getValue("note") as string | undefined;
      return <div className="max-w-xs truncate">{note || "-"}</div>;
    },
  },
];

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
      <div className="flex items-center gap-2 text-muted-foreground font-medium">
        <Calendar className="h-4 w-4" />
        <span>Date</span>
      </div>
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return (
        <div className="flex items-center gap-2 py-2">
          <div className="h-8 w-8 rounded-md bg-zinc-800 flex items-center justify-center">
            <Calendar className="h-4 w-4 text-zinc-400" />
          </div>
          <span className="text-zinc-200">
            {format(new Date(date), "MMM dd, yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "productType",
    header: () => (
      <div className="flex items-center gap-2 text-muted-foreground font-medium">
        <Package className="h-4 w-4" />
        <span>Product Type</span>
      </div>
    ),
    cell: ({ row }) => {
      const productType = row.getValue("productType") as string;
      return (
        <div className="flex items-center gap-2 py-2">
          <div className="h-8 w-8 rounded-md bg-zinc-800 flex items-center justify-center">
            <Package className="h-4 w-4 text-zinc-400" />
          </div>
          <span className="text-zinc-200">{productType}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "transactionType",
    header: () => (
      <div className="flex items-center gap-2 text-muted-foreground font-medium">
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
          <Badge className="bg-emerald-950 text-emerald-400 border border-emerald-800 font-medium px-3 py-1">
            Profit
          </Badge>
        ),
        cost: (
          <Badge className="bg-rose-950 text-rose-400 border border-rose-800 font-medium px-3 py-1">
            Cost
          </Badge>
        ),
        investments: (
          <Badge className="bg-blue-950 text-blue-400 border border-blue-800 font-medium px-3 py-1">
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
          className="p-0 hover:bg-neutral-800 hover:text-neutral-300 text-muted-foreground font-medium"
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
        profit: "text-emerald-400 bg-emerald-950/40",
        cost: "text-rose-400 bg-rose-950/40",
        investments: "text-blue-400 bg-blue-950/40",
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
      <div className="flex items-center gap-2 text-muted-foreground font-medium">
        <FileText className="h-4 w-4" />
        <span>Note</span>
      </div>
    ),
    cell: ({ row }) => {
      const note = row.getValue("note") as string | undefined;
      return (
        <div className="max-w-xs truncate py-2 text-neutral-300">
          {note || <span className="text-neutral-500">No note</span>}
        </div>
      );
    },
  },
];

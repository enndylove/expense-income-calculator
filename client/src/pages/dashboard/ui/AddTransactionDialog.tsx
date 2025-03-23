import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { TransactionForm } from "../components/TransactionForm";
import { useState } from "react";

export function AddTransactionDialog() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="flex items-center gap-2 cursor-pointer group">
          <Plus className="group-hover:stroke-white" color="black" size={16} />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Add new transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

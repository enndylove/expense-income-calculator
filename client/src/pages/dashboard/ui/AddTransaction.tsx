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

export function AddTransactionDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={"neutral"}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Plus color="black" size={16} />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Add new transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm />
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export function AddTransactionDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex items-center gap-2 cursor-pointer">
          <Plus size={16} />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add new transaction</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReceiptTextIcon } from "lucide-react";
import { useState } from "react";
import { ReceiptScanner } from "../components/ReceiptScaner";

export function ScannerDialog() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size={"icon"} className="flex items-center gap-2 cursor-pointer group">
          <ReceiptTextIcon className="group-hover:stroke-white" color="black" size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Scan receipt</DialogTitle>
        </DialogHeader>
        <ReceiptScanner onReceiptProcessed={() => { }} />
      </DialogContent>
    </Dialog>
  );
}

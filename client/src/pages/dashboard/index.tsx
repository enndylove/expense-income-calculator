import { Badge } from "@/components/ui/badge";
import { useUserBalanceQuery } from "@/hooks/user/balance";
import { AuthGuard } from "@/shared/guards/AuthGuard";
import { AddTransactionDialog } from "./ui/AddTransactionDialog";
import { TransactionTable } from "./components/TransactionTable";
import { ScannerDialog } from "./ui/ScannerDialog";

export function DashboardComponent() {
  const { data: userBalance } = useUserBalanceQuery();

  return (
    <AuthGuard>
      <div className="flex flex-col w-full mx-auto mt-5">
        <div className="flex flex-row gap-3 justify-between items-center">
          <h1 className="text-6xl flex items-center flex-row gap-4 font-semibold tracking-tighter">
            Balance
            <Badge
              className="text-xl w-fit tracking-normal"
              variant={"secondary"}
            >
              ${Number(userBalance?.balance).toFixed(2) || "0.00"}
            </Badge>
          </h1>
          <div className="flex flex-row gap-2">
            <ScannerDialog />
            <AddTransactionDialog />
          </div>
        </div>
        <div className="mt-6">
          <TransactionTable />
        </div>
      </div>
    </AuthGuard>
  );
}

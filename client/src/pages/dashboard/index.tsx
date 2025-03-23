import { Badge } from "@/components/ui/badge";
import { useUserBalanceQuery } from "@/hooks/user/balance";
// import { BackgroundGrid } from "@/shared/components/BackgroundGrid";
import { AuthGuard } from "@/shared/guards/AuthGuard";
import { AddTransactionDialog } from "./ui/AddTransactionDialog";
import { TransactionTable } from "./components/TransactionTable";

export function DashboardComponent() {
  const { data: userBalance } = useUserBalanceQuery();

  return (
    <AuthGuard>
      <div className="flex flex-col max-w-5xl w-full mx-auto mt-10">
        {/* <BackgroundGrid /> */}
        <div className="flex flex-row gap-3 justify-between items-center">
          <h1 className="text-6xl flex items-center flex-row gap-4 font-semibold tracking-tighter">
            Balance
            <Badge
              className="text-xl w-fit tracking-normal"
              variant={"secondary"}
            >
              ${userBalance?.balance}
            </Badge>
          </h1>

          <AddTransactionDialog />
        </div>
        <div className="mt-6">
          <TransactionTable />
        </div>
      </div>
    </AuthGuard>
  );
}

import { Badge } from "@/components/ui/badge";
import { useUserBalanceQuery } from "@/hooks/user/balance";
import { BackgroundGrid } from "@/shared/components/BackgroundGrid";
import { AuthGuard } from "@/shared/guards/AuthGuard";

export function DashboardComponent() {
  const { data: userBalance } = useUserBalanceQuery();

  return (
    <AuthGuard>
      <div className="flex flex-col max-w-4xl w-full mx-auto">
        <BackgroundGrid />
        <h1 className="text-6xl flex items-center flex-row gap-4 font-semibold tracking-tighter">
          Balance
          <Badge
            className="text-xl w-fit tracking-normal"
            variant={"secondary"}
          >
            ${userBalance?.balance}
          </Badge>
        </h1>
      </div>
    </AuthGuard>
  );
}

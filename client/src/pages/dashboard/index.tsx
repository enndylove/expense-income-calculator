import { BackgroundGrid } from "@/shared/components/BackgroundGrid";
import { AuthGuard } from "@/shared/guards/AuthGuard";

export function DashboardComponent() {
  return (
    <AuthGuard>
      <div className="flex flex-col max-w-4xl w-full mx-auto">
        <BackgroundGrid />
        <h1 className="text-4xl font-semibold tracking-tighter">Balance</h1>
      </div>
    </AuthGuard>
  );
}

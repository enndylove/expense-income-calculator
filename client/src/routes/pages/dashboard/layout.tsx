import { createRoute, Outlet, redirect } from "@tanstack/react-router";
import { rootRoute } from "@/routes/root";
import { DashboardHeader } from "@/shared/components/DashboardHeader";

export const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  beforeLoad: async ({ context }) => {
    if (!context.auth.isLoading && !context.auth.isLoggedIn) {
      throw redirect({
        to: "/login",
      });
    }
  },
  shouldReload: false,
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="bg-zinc-900 absolute overflow-hidden left-0 top-0 w-full h-full z-50">
      <DashboardHeader />
      <div className="flex-1 max-w-[95%] bg-background p-6 mt-5 w-full h-full m-auto rounded-4xl">
        <Outlet />
      </div>
    </div>
  );
}

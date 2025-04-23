import { createRoute, Outlet, redirect } from "@tanstack/react-router";
import { rootRouter } from "../root";

export const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRouter,
  path: "/dashboard",
  beforeLoad: async ({ context }) => {
    if (!context.auth.isLoading && !context.auth.isLoggedIn) {
      throw redirect({
        to: "/login",
      });
    }
  },
  shouldReload: false,
  component: RouterComponent,
});

function RouterComponent() {
  return (
    <div className="bg-[#f2f2f2] dark:bg-[#1f1f1f] relative">
      <div className="flex-1 overflow-auto p-6 w-full px-4 sm:px-6 lg:px-8 rounded-xl my-2 mr-2 bg-background">
        <div className="mx-auto max-w-7xl h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

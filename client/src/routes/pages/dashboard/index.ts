import { DashboardComponent } from "@/pages/dashboard";
import { rootRoute } from "@/routes/root";
import { createRoute } from "@tanstack/react-router";

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardComponent,
});

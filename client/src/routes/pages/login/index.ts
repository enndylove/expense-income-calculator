import { LoginComponent } from "@/pages/login";
import { rootRoute } from "@/routes/root";
import { createRoute, redirect } from "@tanstack/react-router";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  beforeLoad({ context }) {
    if (!context.auth.isLoading && context.auth.isLoggedIn) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  path: "/login",
  component: LoginComponent,
});

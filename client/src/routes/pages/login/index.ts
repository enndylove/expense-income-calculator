import { LoginComponent } from "@/pages/login";
import { rootRoute } from "@/routes/root";
import { createRoute } from "@tanstack/react-router";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginComponent,
});

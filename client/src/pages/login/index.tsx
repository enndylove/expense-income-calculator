import { Route } from "@/routes/__root";
import { createRoute } from "@tanstack/react-router";

export const loginRoute = createRoute({
  getParentRoute: () => Route,
  path: "/login",
  component: RouterComponent,
});

function RouterComponent() {
  return <>dssd</>;
}

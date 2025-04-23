import { createRouter } from "@tanstack/react-router";
import { queryClient, rootRoute } from "./root";
import { ErrorComponent } from "./error";

import { loginRoute } from "./pages/login";
import { rootRouter } from "./pages/root";
import { signUpRouter } from "./pages/sign-up";
import { profileRouter } from "./pages/profile";
import { dashboardLayoutRoute } from "./pages/dashboard/layout";
import { dashboardIndexRoute } from "./pages/dashboard";

const routeTree = rootRoute.addChildren([
  loginRoute,
  rootRouter,
  signUpRouter,
  profileRouter,
  dashboardLayoutRoute.addChildren([
    dashboardIndexRoute
  ]),
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultErrorComponent: ({ error }) => (
    <ErrorComponent error={error as Error} />
  ),
  notFoundMode: "fuzzy",
  defaultStaleTime: 10000,
  context: {
    queryClient,
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { router };

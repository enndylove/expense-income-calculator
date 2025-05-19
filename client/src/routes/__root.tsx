import { createRouter } from "@tanstack/react-router";
import { queryClient, rootRoute } from "./root";
import { ErrorComponent } from "./error";

import { loginRoute } from "./pages/login";
import { rootRouter } from "./pages/root";
import { signUpRouter } from "./pages/sign-up";
import { profileRouter } from "./pages/settings/profile";

import { dashboardLayoutRoute } from "./pages/dashboard/layout";
import { dashboardIndexRoute } from "./pages/dashboard";
import { dashboardProjectRoute } from "./pages/dashboard/index.$projectId";

import { settingsRouter } from "./pages/settings";
import { twoFARoute } from "./pages/2fa";

const routeTree = rootRoute.addChildren([
  loginRoute,
  rootRouter,
  signUpRouter,

  twoFARoute,

  dashboardLayoutRoute.addChildren([
    dashboardIndexRoute,
    dashboardProjectRoute,
    settingsRouter.addChildren([
      profileRouter,
    ])
  ]),
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultErrorComponent: ({ error }: { error: Error }) => (
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

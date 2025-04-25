import { SignUpComponent } from "@/pages/sign-up";
import { rootRoute } from "@/routes/root";
import { createRoute, redirect } from "@tanstack/react-router";

export const signUpRouter = createRoute({
  getParentRoute: () => rootRoute,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isLoading && context.auth.isLoggedIn) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  path: "/sign-up",
  component: SignUpComponent,
});

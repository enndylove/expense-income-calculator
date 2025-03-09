import { SignUpComponent } from "@/pages/sign-up";
import { rootRoute } from "@/routes/root";
import { createRoute } from "@tanstack/react-router";

export const signUpRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up",
  component: SignUpComponent,
});

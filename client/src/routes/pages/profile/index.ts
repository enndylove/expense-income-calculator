import { ProfilePage } from "@/pages/profile";
import { rootRoute } from "@/routes/root";
import { createRoute } from "@tanstack/react-router";

export const profileRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

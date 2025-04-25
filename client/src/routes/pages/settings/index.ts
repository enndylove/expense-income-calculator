import { ProfilePage } from "@/pages/profile";
import { createRoute } from "@tanstack/react-router";
import { dashboardLayoutRoute } from "../dashboard/layout";

export const settingsRouter = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "settings",
  component: ProfilePage,
});

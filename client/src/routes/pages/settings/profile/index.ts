import { createRoute } from "@tanstack/react-router";
import { settingsLayoutRoute } from "../layout";
import { ProfilePage } from "@/pages/settings/profile";

export const profileRouter = createRoute({
  getParentRoute: () => settingsLayoutRoute,
  path: "profile",
  component: ProfilePage,
});

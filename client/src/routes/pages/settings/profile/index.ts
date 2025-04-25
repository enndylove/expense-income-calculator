import { createRoute } from "@tanstack/react-router";
import { settingsRouter } from "..";

export const profileRouter = createRoute({
  getParentRoute: () => settingsRouter,
  path: "profile",
});

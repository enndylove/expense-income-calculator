import { createRoute } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "./layout"

export const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/",
})

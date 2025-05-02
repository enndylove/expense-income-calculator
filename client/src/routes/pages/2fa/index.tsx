import { TwoFAComponent } from "@/pages/2fa"
import { rootRoute } from "@/routes/root"
import { createRoute } from "@tanstack/react-router"

export const twoFARoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/2fa",
  component: TwoFAComponent,
})

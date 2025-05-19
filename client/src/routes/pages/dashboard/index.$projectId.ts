import { createRoute } from '@tanstack/react-router'
import { dashboardLayoutRoute } from './layout'
import { DashboardComponent } from '@/pages/dashboard'

export const dashboardProjectRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "$projectId",
  component: DashboardComponent,
})

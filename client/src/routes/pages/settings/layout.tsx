import { createRoute, Outlet } from "@tanstack/react-router";
import { SettingsSidebar } from "@/shared/components/settings/SettingsSidebar";
import { dashboardLayoutRoute } from "../dashboard/layout";

export const settingsLayoutRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "settings",
  component: SettingsLayout,
});

function SettingsLayout() {
  return (
    <div className="flex flex-row gap-2">
      <SettingsSidebar />
      <Outlet />
    </div>
  );
}

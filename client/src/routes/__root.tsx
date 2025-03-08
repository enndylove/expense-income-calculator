import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Header } from "shared/components/Header";
import { BackgroundGrid } from "shared/components/BackgroundGrid";
import { loginRoute } from "@/pages/login";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <BackgroundGrid />
      <hr />
      <div className="max-w-7xl m-auto">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});

export const router = Route.addChildren([loginRoute]);

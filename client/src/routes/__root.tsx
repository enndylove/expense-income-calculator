import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div>
      <header>{/* Your header content */}</header>
      <main>
        <Outlet />
      </main>
    </div>
  ),
});

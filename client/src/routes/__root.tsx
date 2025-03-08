import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Squares from '@react-bits/Squares/Squares'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="w-full h-full fixed -z-50 opacity-10">
        <Squares
          direction={"up"}
          speed={0}
          hoverFillColor={"#3e3e44"}
          borderColor={"#3e3e44"}
        />
      </div>
      <hr />
      <div className="max-w-7xl m-auto">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})

// import { useAuth } from "@/shared/hooks/useAuth";
import { BackgroundGrid } from "@/shared/components/BackgroundGrid";
import { Header } from "@/shared/components/Header";
import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

type MyRouterContext = {
  queryClient: typeof queryClient;
  // auth: ReturnType<typeof useAuth>;
};

const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-svh flex flex-col">
      <Header />
      <Outlet />
      {import.meta.env.MODE === "development" && (
        <TanStackRouterDevtools position="bottom-left" />
      )}
    </div>
  );
}

export { rootRoute };

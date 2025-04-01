import { useAuth } from "@/shared/hooks/useAuth";
import { Header } from "@/shared/components/Header";
import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ThemeProvider } from "@/shared/theme/theme-provider";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

type MyRouterContext = {
  queryClient: typeof queryClient;
  auth: ReturnType<typeof useAuth>;
};

const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider>
      <div className="min-h-svh flex flex-col">
        <Header />
        <main className="flex-1 bg-background">
          {/* This is where child routes will render */}
          <Outlet />
        </main>
        {import.meta.env.MODE === "development" && (
          <TanStackRouterDevtools position="bottom-left" />
        )}
      </div>
    </ThemeProvider>
  );
}

export { rootRoute };

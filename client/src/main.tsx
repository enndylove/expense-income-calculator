import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import "./index.css";

import { router } from "./routes/__root";
// import { useAuth } from "./shared/hooks/useAuth";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./routes/root";

function WithAuth() {
  // const auth = useAuth();

  return (
    <RouterProvider
      router={router}
      context={{
        queryClient,
        // auth,
      }}
    />
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <WithAuth />
      </NuqsAdapter>
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
);

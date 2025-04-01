"use client";

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

// Store the root in a variable that persists across HMR updates
let root: ReturnType<typeof createRoot>;

// Function to render the app
function renderApp() {
  const container = document.getElementById("root");

  if (!container) return;

  // For HMR in development
  if (import.meta.hot) {
    if (!(window as any).__APP_ROOT__) {
      // First time - create the root
      root = createRoot(container);
      (window as any).__APP_ROOT__ = root;
    } else {
      // On HMR updates - reuse the existing root
      root = (window as any).__APP_ROOT__;
    }
  } else {
    // In production, just create the root
    root = createRoot(container);
  }

  // Render to the root
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <WithAuth />
        </NuqsAdapter>
        <Toaster />
      </QueryClientProvider>
    </StrictMode>,
  );
}

// Initial render
renderApp();

// Handle HMR updates
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    // Re-render on HMR updates
    renderApp();
  });
}

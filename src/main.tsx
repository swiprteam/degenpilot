import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store/index.ts";


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Analytics/>
    <QueryClientProvider client={queryClient}>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
    </QueryClientProvider>
  </StrictMode>
);

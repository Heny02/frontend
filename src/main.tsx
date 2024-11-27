import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
);

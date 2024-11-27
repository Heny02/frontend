import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Pas de refetch automatique en revenant sur la page
      retry: 2, // Nombre de tentatives en cas d'échec
    },
  },
});

export default queryClient;

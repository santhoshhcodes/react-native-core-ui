import React from 'react';
import { QueryClient, QueryClientProvider as TanStackProvider } from '@tanstack/react-query';

// Configure global production data lifecycle parameters
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Automatically re-attempt failed requests twice before throwing error flags
      staleTime: 1000 * 60 * 3, // Consider cache memory "fresh" for 3 minutes
      gcTime: 1000 * 60 * 15, // Keep unused data in garbage collection memory for 15 minutes
      refetchOnWindowFocus: false, // Turn off aggressive web-focused refetching on mobile view mounts
      refetchOnReconnect: 'always', // Automatically re-sync database tables when connection restores
    },
    mutations: {
      retry: false, // Never auto-retry state modification mutations to prevent duplicate DB writes
    },
  },
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryClientProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <TanStackProvider client={queryClient}>
      {children}
    </TanStackProvider>
  );
};
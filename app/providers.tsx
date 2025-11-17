// app/providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { useState } from "react";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minuto por defecto
            gcTime: 5 * 60 * 1000, // 5 minutos garbage collection
            refetchOnWindowFocus: false, // Desactivar refetch al enfocar ventana
            retry: 1, // Un solo reintento en caso de error
          },
          mutations: {
            retry: 0, // No reintentar mutaciones fallidas automáticamente
          },
        },
      })
  );

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position='top-right'
          richColors
          closeButton
          toastOptions={{
            className: "font-sans",
            style: {
              background: "white",
              border: "1px solid #e5e5e5",
              borderRadius: "12px",
              boxShadow:
                "0 10px 15px rgba(0, 0, 0, 0.04), 0 4px 6px rgba(0, 0, 0, 0.05)",
            },
          }}
        />
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </SessionProvider>
  );
}

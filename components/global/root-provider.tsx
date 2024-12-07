"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";

import { ThemeProvider } from "@/components/global";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "@/redux/provider";

const queryClient = new QueryClient();

export const RootProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ReduxProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </ReduxProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

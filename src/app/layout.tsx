"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

"use client";

import type { Metadata } from "next";
import "./(ui)/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// export const metadata: Metadata = {
//   title: "Next.js maker",
//   description: "그냥",
// };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 5000,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="ko">
        <body>{children}</body>
      </html>
    </QueryClientProvider>
  );
}

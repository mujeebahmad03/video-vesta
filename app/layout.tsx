import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { RootProviders } from "@/components/global";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "VideoVista - Record and Share Videos with Unmatched Simplicity",
  description:
    "VideoVista is a powerful platform for creating and sharing professional-quality videos in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ClerkProvider({
    children: (
      <html lang="en" suppressHydrationWarning className="scroll-smooth">
        <body className={`${roboto.className} bg-[#171717] antialiased`}>
          <RootProviders>{children}</RootProviders>
        </body>
      </html>
    ),
  });
}

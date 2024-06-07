import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from 'sonner'
import { Inter } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextBoard",
  description: "Kanban board for Next.js",
};

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: "no",
    themeColor: "000000",
  };
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.className} h-dvh flex flex-col`}
    >
      <body className="flex flex-col grow text-zinc-200">
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

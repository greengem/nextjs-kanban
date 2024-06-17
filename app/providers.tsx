"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { UIProvider } from "@/contexts/UIContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider className="flex flex-col grow">
      <NextThemesProvider
        attribute="class"
        defaultTheme="purple"
        themes={[
          "red",
          "amber",
          "orange",
          "yellow",
          "lime",
          "green",
          "emerald",
          "teal",
          "cyan",
          "sky",
          "blue",
          "indigo",
          "violet",
          "purple",
          "fuchsia",
          "pink",
          "rose",
        ]}
      >
        <UIProvider>{children}</UIProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

// app/providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <HeroUIProvider> <NextThemesProvider attribute="class" defaultTheme="light">
        {children}
      </NextThemesProvider></HeroUIProvider>
    </SessionProvider>
  );
}

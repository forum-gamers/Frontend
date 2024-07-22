"use client";

import type { ChildrenProps } from "@/interfaces";
import { ThemeProvider } from "next-themes";

export default function AppThemeProvider({ children }: ChildrenProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}

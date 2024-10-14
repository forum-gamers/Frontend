"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { useCallback } from "react";
import useMount from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

export default function ThemeToggleBtn() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }, [resolvedTheme, setTheme]);

  const mounted = useMount();

  if (!mounted) return null;

  return (
    <motion.button
      id="dark-mode-switcher"
      aria-label="Toggle Theme"
      onClick={toggleTheme}
      className={cn(
        resolvedTheme === "light" ? "bg-white" : "bg-neutral-800",
        "rounded-xl p-2",
        "border dark:stroke-slate-950 stroke-gray-100",
        "hover:cursor-pointer"
      )}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {resolvedTheme === "light" ? (
        <SunIcon className="h-4 w-4 hover:opacity-75" />
      ) : (
        <MoonIcon className="h-4 w-4 hover:opacity-75" />
      )}
    </motion.button>
  );
}

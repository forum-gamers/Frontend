import SIDEBAR_MENUS from "@/constants/sidebar";
import { memo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-blue-500 lg:hidden">
      <nav className="flex justify-around items-center h-16r">
        {SIDEBAR_MENUS.map((el) => (
          <TooltipProvider key={el.title}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  prefetch
                  href={el.href}
                  className={cn(
                    "flex w-full hover:lg:rounded-lg hover:lg:py-2 hover:lg:px-4 hover:scale-105 lg:justify-start justify-center",
                    "px-4 py-2 rounded-lg lg:rounded-full lg:p-2 gap-2 text-neutral-300 dark:text-neutral-900 hover:text-neutral-400 dark:hover:text-neutral-950",
                    "hover:dark:text-black hover:gap-3 transition-all duration-300 hover:dark:bg-background hover:bg-background hover:font-bold"
                  )}
                >
                  {el.icon}
                </Link>
              </TooltipTrigger>
              <TooltipContent>{el.title}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
    </footer>
  );
}

export default memo(Footer);

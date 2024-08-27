import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { memo } from "react";

export interface Tab {
  name: string;
  href: string;
}

export interface TabPostProps {
  activeTab: string;
  tabs: Tab[];
}

function TabPost({ activeTab, tabs }: TabPostProps) {
  return (
    <CardHeader className="flex flex-row h-4 items-center justify-evenly gap-4 bg-white dark:bg-dark-theme-500 rounded-sm">
      {tabs.map((tab) => (
        <Button
          asChild
          key={tab.name}
          variant="ghost"
          className={cn(
            tab.name === activeTab &&
              "rounded-xl text-neutral-900 dark:text-neutral-300 underline dark:decoration-white underline-offset-8 decoration-dark-theme-500"
          )}
        >
          <Link prefetch href={tab.href} scroll={false}>
            {tab.name}
          </Link>
        </Button>
      ))}
    </CardHeader>
  );
}

export default memo(TabPost);

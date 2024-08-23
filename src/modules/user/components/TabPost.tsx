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
    <CardHeader className="flex flex-row items-center justify-evenly gap-4 bg-blue-300 dark:bg-blue-900 rounded-sm">
      {tabs.map((tab) => (
        <Button
          asChild
          key={tab.name}
          variant="ghost"
          className={cn(
            tab.name === activeTab &&
              "dark:bg-green-300 dark:text-blue-800 bg-blue-800 text-white"
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

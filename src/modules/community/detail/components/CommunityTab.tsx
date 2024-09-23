"use client";

import type { ChildrenProps } from "@/interfaces";
import { memo } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type CommunityTabValue = "/" | "/activities" | "/events";

export interface CommunityTabList {
  name: "Posts" | "Recent Activities" | "Upcoming Events";
  value: CommunityTabValue;
}

function CommunityTab({ children }: Readonly<ChildrenProps>) {
  const params = useParams();
  const pathname = usePathname() as string;

  const tabsList: CommunityTabList[] = [
    {
      value: "/",
      name: "Posts",
    },
    {
      value: "/events",
      name: "Upcoming Events",
    },
  ];

  return (
    <div className="mt-6 w-full grid grid-cols-1">
      <nav
        className={cn(
          "flex justify-evenly items-center h-12 mb-4",
          "bg-white dark:bg-[#202225] shadow-gray-200 dark:shadow-slate-950 dark:stroke-slate-950 stroke-gray-100",
          "rounded-sm shadow-sm"
        )}
      >
        {tabsList.map(({ name, value }) => (
          <Link
            key={value}
            href={`/community/${params?.id}${value}`}
            className={cn(
              "text-neutral-900 dark:text-neutral-300 px-3 py-2 rounded-md",
              `/community/${params?.id}${value}` === pathname ||
                `/community/${params?.id}${value}` === pathname + "/"
                ? "font-bold hover:opacity-75 bg-blue-500 border hover:bg-blue-600 transition-all duration-300 scale-[101%]"
                : "font-normal"
            )}
          >
            {name}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}

export default memo(CommunityTab);

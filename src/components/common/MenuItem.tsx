import type { SidebarMenu } from "@/constants/sidebar";
import Link from "next/link";
import { memo } from "react";

export interface MenuItemProps {
  menu: SidebarMenu;
  className?: string;
}

function MenuItem({ menu: { title, href, icon }, className }: MenuItemProps) {
  return (
    <Link
      aria-label={title}
      tabIndex={0}
      href={href}
      prefetch
      className="cursor-pointer"
    >
      <hgroup
        className={`flex hover:lg:rounded-lg hover:lg:py-2 hover:lg:px-4 hover:scale-105 justify-center px-4 py-2 rounded-lg lg:rounded-full lg:p-2 gap-2 text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 hover:dark:text-black hover:dark:lg:bg-background hover:lg:bg-background lg:hover:gap-3 lg:transition-all lg:duration-300 hover:dark:bg-background hover:bg-background ${className}`}
      >
        {icon}
        <p className="ml-1 animate-enter-left whitespace-nowrap text-sm delay-1000">
          {title}
        </p>
      </hgroup>
    </Link>
  );
}

export default memo(MenuItem);

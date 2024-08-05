import type { ReactNode } from "react";
import {
  HomeIcon,
  ChatBubbleLeftIcon,
  MagnifyingGlassCircleIcon,
  UsersIcon,
  BookmarkIcon,
} from "@/components/icons/HeroIconsSolid";

export interface SidebarMenu {
  title: string;
  href: string;
  icon: ReactNode;
}

const className = "h-4 w-4";

const SIDEBAR_MENUS: SidebarMenu[] = [
  {
    title: "Home",
    href: "/",
    icon: <HomeIcon className={className} />,
  },
  {
    title: "Search",
    href: "/search",
    icon: <MagnifyingGlassCircleIcon className={className} />,
  },
  {
    title: "Bookmark",
    href: "/bookmark",
    icon: <BookmarkIcon className={className} />,
  },
  {
    title: "Team",
    href: "/team",
    icon: <UsersIcon className={className} />,
  },
  {
    title: "Chat",
    href: "/chat",
    icon: <ChatBubbleLeftIcon className={className} />,
  },
];

export default SIDEBAR_MENUS;

import type { ReactNode } from "react";
import {
  HomeIcon,
  // ChatBubbleLeftIcon,
  // UsersIcon,
  BookmarkIcon,
} from "@/components/icons/HeroIconsSolid";

export interface SidebarMenu {
  title: string;
  href: string;
  icon: ReactNode;
}

const className = "h-6 w-6";

const SIDEBAR_MENUS: SidebarMenu[] = [
  {
    title: "Home",
    href: "/",
    icon: <HomeIcon className={className} />,
  },
  {
    title: "Bookmark",
    href: "/bookmark",
    icon: <BookmarkIcon className={className} />,
  },
  // {
  //   title: "Team",
  //   href: "/team",
  //   icon: <UsersIcon className={className} />,
  // },
  // {
  //   title: "Chat",
  //   href: "/chat",
  //   icon: <ChatBubbleLeftIcon className={className} />,
  // },
];

export default SIDEBAR_MENUS;

import type { ReactNode } from "react";
import {
  SwordsIcon,
  HomeIcon,
  UsersIcon,
  UserIcon,
  BookmarkIcon,
} from "lucide-react";

export interface SidebarMenu {
  title: string;
  href: string;
  icon: ReactNode;
}

const className = "h-6 w-6";

const SIDEBAR_MENUS: SidebarMenu[] = [
  {
    title: "Feed",
    href: "/feed",
    icon: <HomeIcon className={className} />,
  },
  {
    title: "Bookmark",
    href: "/bookmark",
    icon: <BookmarkIcon className={className} />,
  },
  {
    title: "Team",
    href: "/team",
    icon: <UserIcon className={className} />,
  },
  {
    title: "Community",
    href: "/community",
    icon: <UsersIcon className={className} />,
  },
  {
    title: "Tournament",
    href: "/tournament",
    icon: <SwordsIcon className={className} />,
  },
];

export default SIDEBAR_MENUS;

import SIDEBAR_MENUS from "@/constants/sidebar";
import { memo } from "react";
import MenuItem from "../components/common/MenuItem";

function Footer() {
  return (
    <footer className="fixed bottom-0 w-full lg:hidden h-12 bg-blue-300 dark:bg-blue-900 p-2">
      <nav className="flex justify-around items-center">
        {SIDEBAR_MENUS.map((el) => (
          <MenuItem
            menu={el}
            key={el.title}
            className="flex-shrink text-sm lg:text-base p-2"
          />
        ))}
      </nav>
    </footer>
  );
}

export default memo(Footer);

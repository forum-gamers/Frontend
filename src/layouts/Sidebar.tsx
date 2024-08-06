import MenuItem from "@/components/common/MenuItem";
import SIDEBAR_MENUS from "@/constants/sidebar";
import ProfileViewer from "@/modules/user/components/ProfileViewer";
import { memo, type HTMLAttributes } from "react";

export interface SidebarProps extends HTMLAttributes<HTMLElement> {}

function Sidebar({ className, ...rest }: SidebarProps) {
  return (
    <aside {...rest} id="sidebar" className={` ${!!className && className}`}>
      <section className="flex items-center h-64">
        <div className="fixed z-20 w-full bg-white p-5 shadow-sm dark:border-b dark:border-neutral-800 dark:bg-dark lg:relative lg:border-none lg:!bg-transparent lg:p-0 xl:shadow-none pb-0">
          <div className="flex items-start justify-between lg:flex-col lg:space-y-4">
            <div className="flex w-full flex-grow gap-4 lg:flex-col lg:gap-0.5 flex-col items-start">
              <ProfileViewer />
            </div>
          </div>
        </div>
      </section>
      <nav className="mb-6 mt-4 flex flex-col gap-3 border-t border-neutral-300 pt-4">
        {SIDEBAR_MENUS.map((el) => (
          <MenuItem key={el.title} menu={el} />
        ))}
      </nav>
    </aside>
  );
}

export default memo(Sidebar);

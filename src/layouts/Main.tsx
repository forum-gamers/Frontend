import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import type { ChildrenProps } from "@/interfaces";
import Sidebar from "./Sidebar";
import { memo, type ReactNode } from "react";

export interface MainLayoutProps extends ChildrenProps {
  readonly rightSection?: ReactNode;
}

function MainLayout({ children, rightSection }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-7xl mx-auto flex">
        <Sidebar
          id="left-sidebar"
          className="fixed bg-[#D6EFFF] dark:bg-[#001F3F] top-0 left-0 w-64 h-screen shadow-lg z-30 p-4 hidden lg:flex justify-start flex-col my-2 rounded-sm"
        />
        <section className="ml-60 p-4 w-3/5">{children}</section>
        {!!rightSection && (
          <aside
            id="right-sidebar"
            className="fixed bg-[#D6EFFF] dark:bg-[#001F3F] top-0 right-0 w-64 h-screen shadow-lg z-30 p-4 hidden lg:flex flex-col my-2 rounded-sm"
          >
            {rightSection}
          </aside>
        )}
      </main>
      <Footer />
    </>
  );
}

export default memo(MainLayout);

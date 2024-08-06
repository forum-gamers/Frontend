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
      <main className="flex flex-col w-full max-w-7xl mx-auto gap-8 ">
        <section className="flex mt-24">
          <Sidebar className="w-64 bg-background shadow-blue-300 dark:shadow-blue-900 shadow-lg p-4 hidden lg:flex justify-start flex-col rounded-sm " />

          <section className="ml-60 p-4 w-3/5">{children}</section>
          {!!rightSection && (
            <aside
              id="right-sidebar"
              className="fixed bg-[#D6EFFF] dark:bg-[#001F3F] top-0 right-0 w-64 h-screen shadow-lg z-30 p-4 hidden lg:flex flex-col my-2 rounded-sm"
            >
              {rightSection}
            </aside>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default memo(MainLayout);

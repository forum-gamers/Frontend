import Footer from "@/layouts/Footer";
import Navbar from "./Navbar";
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
      <main className="flex flex-col w-full max-w-7xl mx-auto gap-8">
        <section className="flex mt-24 justify-between">
          <Sidebar className="w-1/5 fixed bg-background left-4 shadow-blue-300 top-24 dark:shadow-blue-900 shadow-lg h-[75%] p-4 hidden lg:flex justify-start flex-col rounded-sm" />

          <section className="flex-grow mx-auto p-4 max-w-2xl">
            {children}
          </section>

          <aside
            id="right-sidebar"
            className="fixed shadow-blue-300 bg-background dark:shadow-blue-900 top-24 right-4 w-1/5 h-[75%] shadow-lg p-4 hidden lg:flex justify-start flex-col rounded-sm"
          >
            {!!rightSection && rightSection}
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default memo(MainLayout);

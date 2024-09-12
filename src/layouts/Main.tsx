import Footer from "@/layouts/Footer";
import Navbar from "./Navbar";
import type { ChildrenProps } from "@/interfaces";
import Sidebar from "./Sidebar";
import { memo, type ReactNode } from "react";
import type { UserAttributes } from "@/interfaces/model";
import InitPage from "./Init";

export interface MainLayoutProps extends ChildrenProps {
  readonly rightSection?: ReactNode;
  user: UserAttributes | null;
}

function MainLayout({ children, rightSection, user }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full max-w-7xl mx-auto gap-8">
        <section className="flex mt-24 justify-between">
          <Sidebar className="sm:w-1/5 lg:w-[23%] xl:w-1/4 fixed bg-white dark:bg-[#202225] left-4 xl:left-8 shadow-gray-200 top-32 dark:shadow-slate-950 dark:stroke-slate-950 stroke-gray-100  shadow-lg h-[75%] p-4 hidden lg:flex justify-start flex-col rounded-lg" />

          <main className="w-full lg:flex-grow mx-auto p-4 max-w-xl xl:max-w-2xl">
            <InitPage user={user}>{children}</InitPage>
          </main>

          <aside
            id="right-sidebar"
            className="fixed bg-white dark:bg-[#202225] shadow-gray-200 dark:shadow-slate-950 dark:stroke-slate-950 stroke-gray-100 top-32 right-4 xl:right-8 sm:w-1/5 lg:w-[23%] xl:w-1/4 h-[75%] shadow-lg p-4 hidden lg:flex justify-start flex-col rounded-lg"
          >
            {!!rightSection && rightSection}
          </aside>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default memo(MainLayout);

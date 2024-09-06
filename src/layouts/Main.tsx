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
          <Sidebar className="xl:w-1/5 sm:w-1/5 lg:w-1/6 fixed bg-light-theme-100 bg-gradient-to-r dark:bg-gradient-to-r dark:from-dark-theme-300 dark:to-dark-theme-500 from-light-theme-100 to-light-theme-200 dark:bg-dark-theme-300 left-4 shadow-blue-300 top-24 dark:shadow-blue-900 shadow-lg h-[75%] p-4 hidden lg:flex justify-start flex-col rounded-sm" />

          <InitPage user={user}>
            <main className="w-full lg:flex-grow mx-auto p-4 max-w-xl xl:max-w-2xl bg-light-theme-100 dark:bg-dark-theme-300 shadow-md shadow-blue-300 top-24 dark:shadow-blue-900 rounded-sm">
              {children}
            </main>
          </InitPage>

          <aside
            id="right-sidebar"
            className="fixed shadow-blue-300 bg-light-theme-100 bg-gradient-to-r dark:bg-gradient-to-br dark:from-dark-theme-300 dark:to-dark-theme-500 from-light-theme-100 to-light-theme-200 dark:bg-dark-theme-300 dark:shadow-blue-900 top-24 right-4 xl:w-1/5 sm:w-1/5 lg:w-1/6 h-[75%] shadow-lg p-4 hidden lg:flex justify-start flex-col rounded-sm"
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

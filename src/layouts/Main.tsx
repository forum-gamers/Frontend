import Footer from "@/layouts/Footer";
import Navbar from "./Navbar";
import type { ChildrenProps } from "@/interfaces";
import Sidebar from "./Sidebar";
import { memo, type ReactNode } from "react";
import type { UserAttributes } from "@/interfaces/model";
import InitPage from "./Init";
import { cn } from "@/lib/utils";

export interface MainLayoutProps extends ChildrenProps {
  readonly rightSection?: ReactNode;
  user: UserAttributes | null;
  visibleRightSection?: boolean;
}

function MainLayout({
  children,
  rightSection,
  user,
  visibleRightSection = true,
}: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <div
        className={cn(
          "flex flex-col w-full max-w-7xl",
          visibleRightSection && "mx-auto gap-8"
        )}
      >
        <section
          className={cn(
            "mt-24",
            visibleRightSection ? "justify-between flex" : "grid grid-cols-10"
          )}
        >
          <Sidebar
            className={cn(
              "bg-white dark:bg-gray-950 top-32 h-[75%] max-h-[75vh] p-4 rounded-lg",
              visibleRightSection
                ? "sm:w-1/5 lg:w-[23%] xl:w-1/4 fixed"
                : "lg:col-span-3 mt-8 w-[93.8%] sticky",
              "hidden lg:flex justify-start flex-col left-4 xl:left-8"
            )}
          />

          <main
            className={cn(
              visibleRightSection
                ? "lg:flex-grow max-w-xl xl:max-w-2xl mx-auto p-4 "
                : "lg:col-span-7",
              "w-full"
            )}
          >
            <InitPage user={user}>{children}</InitPage>
          </main>

          {visibleRightSection && (
            <aside
              id="right-sidebar"
              className={cn(
                "fixed top-32 right-4 xl:right-8 sm:w-1/5 lg:w-[23%] xl:w-1/4 h-[75%] p-4",
                "bg-white dark:bg-gray-950",
                "hidden lg:flex justify-start flex-col rounded-lg"
              )}
            >
              {!!rightSection && rightSection}
            </aside>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default memo(MainLayout);

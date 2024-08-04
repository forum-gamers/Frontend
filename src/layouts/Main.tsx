import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import type { ChildrenProps } from "@/interfaces";
import Sidebar from "./Sidebar";
import { memo } from "react";

function MainLayout({ children }: Readonly<ChildrenProps>) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col w-full max-w-7xl mx-auto gap-8 ">
        <section className="flex mt-20">
          <Sidebar className="w-64 bg-white shadow-lg p-4 hidden lg:flex justify-start flex-col rounded-sm " />
          <section className="ml-60 p-4 w-3/5">{children}</section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default memo(MainLayout);

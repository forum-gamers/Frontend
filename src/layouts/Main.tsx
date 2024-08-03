import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import type { ChildrenProps } from "@/interfaces";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }: Readonly<ChildrenProps>) {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-7xl mx-auto flex">
        <Sidebar className="fixed top-0 left-0 w-64 h-screen bg-white shadow-lg z-30 p-4 hidden lg:flex justify-start flex-col my-2 rounded-sm" />
        <section className="ml-60 p-4 w-3/5">{children}</section>
      </main>
      <Footer />
    </>
  );
}

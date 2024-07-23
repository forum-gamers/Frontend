import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { ChildrenProps } from "@/interfaces";

export default function MainLayout({ children }: Readonly<ChildrenProps>) {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-7xl mx-auto grid grid-cols-4 gap-5">
        <section className="col-span-2">{children}</section>
      </main>
      <Footer />
    </>
  );
}

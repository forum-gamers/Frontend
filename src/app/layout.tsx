import type { ChildrenProps } from "@/interfaces";
import RootLayout from "@/layouts/Root";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({ children }: Readonly<ChildrenProps>) {
  return <RootLayout>{children}</RootLayout>;
}

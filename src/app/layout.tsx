import type { ChildrenProps } from "@/interfaces";
import RootLayout from "@/layouts/Root";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forum Gamers",
};

export default function Layout({ children }: Readonly<ChildrenProps>) {
  return <RootLayout>{children}</RootLayout>;
}

export const experimental_ppr = true;

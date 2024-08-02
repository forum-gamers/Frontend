import { getServerSideSession } from "@/helpers/global";
import type { ChildrenProps } from "@/interfaces";
import MainLayout from "@/layouts/Main";
import { redirect } from "next/navigation";

export interface HomeLayoutProps extends ChildrenProps {}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  if (!(await getServerSideSession())) redirect("/login");

  return <MainLayout>{children}</MainLayout>;
}

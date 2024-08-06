import { getServerSideSession } from "@/helpers/global";
import type { ChildrenProps } from "@/interfaces";
import MainLayout from "@/layouts/Main";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export interface HomeLayoutProps extends ChildrenProps {
  readonly recomendation: ReactNode;
}

export default async function HomeLayout({
  children,
  recomendation,
}: HomeLayoutProps) {
  if (!(await getServerSideSession())) redirect("/login");

  return <MainLayout rightSection={recomendation}>{children}</MainLayout>;
}

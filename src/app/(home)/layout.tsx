import { getServerSideSession } from "@/helpers/global";
import type { ChildrenProps } from "@/interfaces";
import MainLayout from "@/layouts/Main";
import { getMe } from "@/modules/user/action";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export interface HomeLayoutProps extends ChildrenProps {
  readonly recomendation: ReactNode;
}

export default async function HomeLayout({
  children,
  recomendation,
}: HomeLayoutProps) {
  const [{ data }, session] = await Promise.all([
    getMe(),
    getServerSideSession(),
  ]);
  if (!session) redirect("/login");

  return (
    <MainLayout user={data} rightSection={recomendation}>
      {children}
    </MainLayout>
  );
}

import { getServerSideSession } from "@/helpers/global";
import type { PageProps } from "@/interfaces";
import Reset from "@/modules/reset-password/reset";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: PageProps) {
  const session = await getServerSideSession();
  if (!searchParams?.token && (!session || session?.user?.access_token))
    redirect("/");

  return (
    <Reset token={(searchParams?.token || session?.user?.access_token) ?? ""} />
  );
}

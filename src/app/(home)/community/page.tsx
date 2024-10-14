import { getServerSideSession } from "@/helpers/global";
import type { PageProps } from "@/interfaces";
import type { CommunityListAttributes } from "@/interfaces/model";
import CommunityPage from "@/modules/community";
import { getCommunities } from "@/modules/community/action";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: PageProps<null, { q?: string }>) {
  const [session, { data = [] }] = await Promise.all([
    getServerSideSession(),
    getCommunities({
      page: 1,
      limit: 10,
      q: searchParams?.q,
    }),
  ]);

  if (!session) redirect("/login");

  return (
    <CommunityPage
      session={session}
      initialDatas={data as CommunityListAttributes[]}
    />
  );
}

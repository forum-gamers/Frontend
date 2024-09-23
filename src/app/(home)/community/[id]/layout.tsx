import { getServerSideSession } from "@/helpers/global";
import type { ChildrenProps, PageProps } from "@/interfaces";
import {
  getCommunityById,
  getCommunityMember,
} from "@/modules/community/action";
import CommunityDetail from "@/modules/community/detail";
import InitPage from "@/modules/community/detail/components/Init";
import { notFound, redirect } from "next/navigation";

export type LayoutProps = Readonly<PageProps<{ id: string }> & ChildrenProps>;

export default async function Layout({
  params: { id },
  children,
}: LayoutProps) {
  const communityId = parseInt(id);
  if (isNaN(communityId)) redirect("/community");

  const [session, { data: members = [] }, { data = null }] = await Promise.all([
    getServerSideSession(),
    getCommunityMember(communityId, {
      page: 1,
      limit: 10,
    }),
    getCommunityById(communityId),
  ]);

  if (!data) notFound();
  if (!session) redirect("/login");

  return (
    <CommunityDetail session={session} members={members} data={data}>
      <InitPage data={data} />
      {children}
    </CommunityDetail>
  );
}

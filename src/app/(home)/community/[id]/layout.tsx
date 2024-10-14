import { LOGO_BLUE } from "@/components/images";
import { getServerSideSession } from "@/helpers/global";
import type { ChildrenProps, PageProps } from "@/interfaces";
import {
  getCommunityById,
  getCommunityMember,
} from "@/modules/community/action";
import CommunityDetail from "@/modules/community/detail";
import InitPage from "@/modules/community/detail/components/Init";
import type { Metadata } from "next";
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

export async function generateMetadata({
  params: { id },
}: PageProps<{ id: string }>): Promise<Metadata> {
  const communityId = parseInt(id);
  if (isNaN(communityId)) return {};

  const { error, data } = await getCommunityById(communityId);
  if (error || !data) return {};

  return {
    title: `Community - ${data.name}`,
    description: `Description - ${data.description}`,
    robots: {
      index: true,
      follow: true,
    },
    keywords: [data.name, ...(data?.description ?? "").split(" ")],
    creator: data.name,
    publisher: data.name,
    icons: data?.imageUrl || LOGO_BLUE.src,
  };
}
